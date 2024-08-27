import { EssayBody } from '@/types/types';
import { OpenAIStream } from '@/utils/essayStream';


export const runtime = 'edge'

const handler = async (req: Request): Promise<Response> => {
  try {
    const { topic, words, essayType, model, apiKey } =
      (await req.json()) as EssayBody;

    if (!apiKey) {
      return new Response('API key not found', { status: 500 });
    }

    const stream = await OpenAIStream(
      topic,
      essayType,
      words,
      model,
      apiKey,
    );

    return new Response(stream);
  } catch (error) {
    console.error(error);
    return new Response('Error', { status: 500 });
  }
};

export default handler;
