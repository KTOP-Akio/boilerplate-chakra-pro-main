import { PremiumEssayBody } from '@/types/types';
import { OpenAIStream } from '@/utils/premiumEssayStream';


export const runtime = 'edge'

const handler = async (req: Request): Promise<Response> => {
  try {
    const { words, topic,  essayType, tone, citation,level,citations, model, apiKey } =
      (await req.json()) as PremiumEssayBody;
      
  let apiKeyFinal;
    if (apiKey) {
      apiKeyFinal = apiKey;
    } else {
      apiKeyFinal = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
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
      apiKeyFinal,
    );

    return new Response(stream);
  } catch (error) {
    console.error(error);
    return new Response('Error', { status: 500 });
  }
};

export default handler;
