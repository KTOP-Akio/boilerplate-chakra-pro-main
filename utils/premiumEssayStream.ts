import endent from 'endent';
import {
  createParser,
  ParsedEvent,
  ReconnectInterval,
} from 'eventsource-parser';

const createPrompt = (words:string,topic: string, essayType: string, tone:string, citation:string, level:string,citations:boolean) => {
  const data = (words:string,topic: any, essayType: string, tone:string, citation:string, level:string,citations:boolean) => {
    return endent`
      You are an expert formal essay writer and generator.
      You know very well all types of essays. Generate an ${essayType} essay about ${topic}, in ${words} words.
      The generated content must have at least ${words} words.
      The essay should be written on an ${tone} tone and be written for the ${level} academic level.
      Also, the citation format of the essay should be ${citation}.
      Throught the project, you ${citations ? "must" : "must not"} use citations, quoting books or famous people regarding the subject.
      The essay must be in markdown format but not rendered, it must include all markdown characteristics.The title must be bold, and there should be a &nbsp between every paragraph.
      Do not include informations about console logs or print messages.
    `;
  };

  if (essayType) {
    return data(words,topic,  essayType, tone, citation, level,citations);
  }
};

export const OpenAIStream = async (
  words:string,
  topic: string,
  essayType: string,
  tone: string,
  citation: string,
  level: string, 
  citations:boolean,
  model: string,
  key: string | undefined,
) => {
  const prompt = createPrompt(words, topic,  essayType, tone, citation, level, citations);

  const system = { role: 'system', content: prompt };

  const res = await fetch(`https://api.openai.com/v1/chat/completions`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${key || process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
    },
    method: 'POST',
    body: JSON.stringify({
      model,
      messages: [system],
      temperature: 0,
      stream: true,
    }),
  });

  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  if (res.status !== 200) {
    const statusText = res.statusText;
    const result = await res.body?.getReader().read();
    throw new Error(
      `OpenAI API returned an error: ${
        decoder.decode(result?.value) || statusText
      }`,
    );
  }

  const stream = new ReadableStream({
    async start(controller) {
      const onParse = (event: ParsedEvent | ReconnectInterval) => {
        if (event.type === 'event') {
          const data = event.data;

          if (data === '[DONE]') {
            controller.close();
            return;
          }

          try {
            const json = JSON.parse(data);
            const text = json.choices[0].delta.content;
            const queue = encoder.encode(text);
            controller.enqueue(queue);
          } catch (e) {
            controller.error(e);
          }
        }
      };

      const parser = createParser(onParse);

      for await (const chunk of res.body as any) {
        parser.feed(decoder.decode(chunk));
      }
    },
  });

  return stream;
};
