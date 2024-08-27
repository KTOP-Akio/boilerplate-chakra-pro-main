import endent from 'endent';
import {
  createParser,
  ParsedEvent,
  ReconnectInterval,
} from 'eventsource-parser';

const createPrompt = (
  inputLanguage: string,
  outputLanguage: string,
  inputCode: string,
) => {
  const data = (inputCode: any, type: string) => {
    return endent`
      You are an expert programmer in all programming languages.
      You know very well algorithms. You will explain how the code works.
      The explanation must me in markdown format but not rendered, it must include all markdown characteristics.
      Do not include informations about console logs or print messages. Explain the following code ${type !== 'persona' && 'as I am a' + type}:

      ${inputCode}

    `;
  };

  switch (outputLanguage) {
    case 'persona':
      return data(inputCode, 'persona');
    case 'teacher':
      return data(inputCode, 'teacher');
    case '5':
      return data(inputCode, '5 years boy');
    case 'beginner':
      return data(inputCode, 'beginner programmer');
    case 'nasa':
      return data(inputCode, 'very intelligent PHD professor at MIT');
    case 'pizza-delivery-guy':
      return data(inputCode, 'pizza delivery guy');
    case 'bus-driver':
      return data(inputCode, 'bus driver');
    case 'magician':
      return data(inputCode, 'magician');
    case 'barista':
      return data(inputCode, 'barista');
    case 'doctor':
      return data(inputCode, 'doctor');
  }
};

export const OpenAIStream = async (
  inputLanguage: string,
  outputLanguage: string,
  inputCode: string,
  model: string,
  key: string,
) => {
  const prompt = createPrompt(inputLanguage, outputLanguage, inputCode);

  const system = { role: 'system', content: prompt };

  const res = await fetch(`https://api.openai.com/v1/chat/completions`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${key || process.env.OPENAI_API_KEY}`,
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
