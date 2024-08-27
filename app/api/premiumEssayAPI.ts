import { PremiumEssayBody } from '@/types/types';
import { OpenAIStream } from '@/utils/premiumEssayStream';


export const runtime = 'edge'

const handler = async (req: Request): Promise<Response> => {
  try {
    const { words, topic,  essayType, tone, citation,level,citations, model, apiKey } =
      (await req.json()) as PremiumEssayBody;

    if (!apiKey) {
      return new Response('API key not found', { status: 500 });
    }

    const stream = await OpenAIStream(
      words,
      topic,
      essayType,
      tone,
      citation,
      level, 
      citations,
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
