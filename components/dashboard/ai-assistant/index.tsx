'use client';

/*eslint-disable*/
import MessageBoxChat from '@/components/MessageBoxChat';
import DashboardLayout from '@/components/layout';
import Bg from '@/public/img/ai-chat/bg-image.png';
import { Database } from '@/types_db';
import {
  Button,
  Flex,
  Icon,
  Image,
  Input,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { Session, User } from '@supabase/supabase-js';
import endent from 'endent';
import { useState } from 'react';
import { MdAutoAwesome, MdEdit, MdPerson } from 'react-icons/md';

type Subscription = Database['public']['Tables']['subscriptions']['Row'];
type Product = Database['public']['Tables']['products']['Row'];
type Price = Database['public']['Tables']['prices']['Row'];
interface ProductWithPrices extends Product {
  prices: Price[];
}
interface PriceWithProduct extends Price {
  products: Product | null;
}
interface SubscriptionWithProduct extends Subscription {
  prices: PriceWithProduct | null;
}

interface Props {
  session: Session | null;
  user: User | null | undefined;
  products: ProductWithPrices[];
  subscription: SubscriptionWithProduct | null;
  userDetails: { [x: string]: any } | null; 
}
export default function Assistant(props: Props) {
  // *** If you use .env.local variable for your API key, method which we recommend, use the apiKey variable commented below
  // Input States
  const [inputMessage, setInputMessage] = useState<string>('');
  const [submitMessage, setSubmitMessage] = useState<string>('');
  // Loading state
  const [loading, setLoading] = useState<boolean>(false);
  const [open_ai_key, setOpenAIKey] = useState('');
  const [assistant_key, setAssistantKey] = useState('');
  const [assistant, setAssistant] = useState(Object);
  const [thread, setThread] = useState(Object);
  const [res_message, setResMessage] = useState(Object);
  const gray = useColorModeValue('gray.500', 'white');
  const brandColor = useColorModeValue('brand.500', 'white');
  const opacityBg = useColorModeValue('white', 'whiteAlpha.100');
  const gradientBg = useColorModeValue(
    'linear-gradient(180deg, #FBFBFF 0%, #CACAFF 100%)',
    'linear-gradient(180deg, rgba(255, 255, 255, 0.07) 0%, rgba(255, 255, 255, 0.31) 100%)',
  );

  const gradientBg2 = useColorModeValue(
    'linear-gradient(15.46deg, #4A25E1 26.3%, #7B5AFF 86.4%)',
    'linear-gradient(180deg, rgba(255, 255, 255, 0.07) 0%, rgba(255, 255, 255, 0.31) 100%)',
  );

  const shadow = useColorModeValue(
    '14px 27px 45px rgba(112, 144, 176, 0.2)',
    'unset',
  );
  const textColor = useColorModeValue('#120F43', 'white');
  const placeholderColor = useColorModeValue(
    { color: 'gray.500' },
    { color: 'whiteAlpha.600' },
  );
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.200');

  const createPrompt = (inputMessage: string) => {
    const data = (inputMessage: string) => {
      return endent` do me this: 
     ${inputMessage}
    `;
    };

    if (inputMessage) {
      return data(inputMessage);
    }
  };

  const getAssistant = async () => {
    const gptResponse = await fetch(
      'https://api.openai.com/v1/assistants/' +
        process.env.NEXT_PUBLIC_OPENAI_ASSISTANT_KEY,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
          'OpenAI-Beta': 'assistants=v1',
        },
      },
    );
    const assistant = await gptResponse.json();
    return assistant;
  };

  const createThread = async () => {
    const gptResponse = await fetch('https://api.openai.com/v1/threads', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
        'OpenAI-Beta': 'assistants=v1',
      },
    });
    const thread = await gptResponse.json();
    return thread;
  };

  const createMessage = async (thread_id: string) => {
    const prompt = createPrompt(inputMessage);
    const gptResponse = await fetch(
      'https://api.openai.com/v1/threads/' + thread_id + '/messages',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
          'OpenAI-Beta': 'assistants=v1',
        },
        body: JSON.stringify({
          role: 'user',
          // content: topic,
          content: prompt,
        }),
      },
    );

    const message = await gptResponse.json();
    return message;
  };

  const getMessage = async (thread_id: string, message_id: string) => {
    // https://api.openai.com/v1/threads/{thread_id}/messages/{message_id}

    const gptResponse = await fetch(
      'https://api.openai.com/v1/threads/' + thread_id + '/messages',
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
          'OpenAI-Beta': 'assistants=v1',
        },
      },
    );

    const message = await gptResponse.json();
    console.log('I get the message.');
    console.log(message);
    return message;
  };

  const runAssistant = async (thread_id: string, assistant_id: string) => {
    const gptResponse = await fetch(
      'https://api.openai.com/v1/threads/' + thread_id + '/runs',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
          'OpenAI-Beta': 'assistants=v1',
        },
        body: JSON.stringify({
          assistant_id: assistant_id,
        }),
      },
    );

    const run_res = await gptResponse.json();
    return run_res;
  };

  const getRunAssistant = async (run_id: string, thread_id: string) => {
    const gptResponse = await fetch(
      'https://api.openai.com/v1/threads/' + thread_id + '/runs/' + run_id,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
          'OpenAI-Beta': 'assistants=v1',
        },
      },
    );

    const run_res = await gptResponse.json();
    console.log('I get the status.');
    console.log(run_res);
    return run_res;
  };

  const deleteThread = async (thread_id: string) => {
    if (thread === undefined) {
      return;
    }
    const gptResponse = await fetch(
      'https://api.openai.com/v1/threads/' + thread_id,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
          'OpenAI-Beta': 'assistants=v1',
        },
      },
    );
    const thread_res = await gptResponse.json();
    console.log(thread_res);
    return thread_res;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    // save the keys in storage browser
    // @ts-ignore
    localStorage.setItem('open_ai_key', process.env.NEXT_PUBLIC_OPENAI_API_KEY);
    localStorage.setItem(
      'assistant_key',
      // @ts-ignore
      process.env.NEXT_PUBLIC_OPENAI_ASSISTANT_KEY,
    );

    const assistant_res = await getAssistant();
    setAssistant(assistant_res);
    const thread_res = await createThread();
    setThread(thread_res);

    const message = await createMessage(thread_res.id);
    let runAssistantResponse = await runAssistant(
      thread_res.id,
      assistant_res.id,
    );
    console.log(runAssistantResponse);

    while (runAssistantResponse.status !== 'completed') {
      runAssistantResponse = await getRunAssistant(
        runAssistantResponse.id,
        thread_res.id,
      );

      if (runAssistantResponse.status === 'completed') {
        console.log('Message is : ');
        const call_response = await getMessage(thread_res.id, message.id);
        setResMessage(call_response);
        console.log(await deleteThread(thread_res.id));
      } else {
        // sleep for 2 second
        await new Promise((r) => setTimeout(r, 2000));
      }
    }

    console.log(assistant);
    console.log(thread);
    console.log(message);
    console.log(runAssistantResponse);

    setSubmitMessage(inputMessage);
    setLoading(false);
  };

  // -------------- Copy Response --------------
  // const copyToClipboard = (text: string) => {
  //   const el = document.createElement('textarea');
  //   el.value = text;
  //   document.body.appendChild(el);
  //   el.select();
  //   document.execCommand('copy');
  //   document.body.removeChild(el);
  // };

  const handleChange = (Event: any) => {
    setInputMessage(Event.target.value);
  };

  return (
    <DashboardLayout
      session={props.session}
      userDetails={props.userDetails}
      user={props.session?.user}
      products={props.products}
      subscription={props.subscription}
      title="AI Generator"
      description="AI Generator"
    >
      <Flex
        position="relative"
        w="100%"
        direction="column"
        pt={{ base: '20px', md: 0 }}
      >
        <Image
          width={{ base: '340px', xl: '350px' }}
          src={Bg.src}
          position="absolute"
          left={{ base: '-20%', md: '35%', lg: '38%' }}
          top={{ base: '50%' }}
          zIndex="0"
          w="200px"
          transform="translate(0, -50%)"
          alt=" "
        />
        <Flex
          direction={'column'}
          mx="auto"
          minH={{ base: '75vh', xl: '85vh' }}
          w="full"
          maxW="1000px"
        >
          {/* Model Change */}
          <Flex
            w="100%"
            direction={'column'}
            mb={
              res_message?.data?.[0]?.content?.[0].text?.value ? '20px' : 'auto'
            }
          >
            <Text
              textAlign={'center'}
              fontSize="sm"
              fontWeight={'500'}
              color="secondaryGray.500"
            >
              Please make sure that you have set the environmental variable for
              the Assistant Key.
            </Text>
          </Flex>
          {/* Main Box */}
          <Flex
            mx="auto"
            w="100%"
            direction={'column'}
            display={
              res_message?.data?.[0]?.content?.[0].text?.value ? 'flex' : 'none'
            }
            mb="auto"
          >
            <Flex
              mb="10px"
              display={'flex'}
              w="100%"
              alignItems={'center'}
              justifyContent="center"
            >
              <Flex
                me="20px"
                h="40px"
                minH="40px"
                minW="40px"
                align="center"
                borderRadius="full"
                border="1px solid"
                borderColor={borderColor}
              >
                <Icon as={MdPerson} color={brandColor} h="20px" w="20px" />
              </Flex>
              <Flex
                zIndex={2}
                borderRadius="14px"
                w="100%"
                border="1px solid"
                borderColor={borderColor}
                p="20px"
                backdropFilter="blur(24px)"
              >
                <Text
                  color={textColor}
                  fontSize={{ base: 'sm', md: '16px' }}
                  fontWeight={'600'}
                >
                  {submitMessage}
                </Text>
                <Icon
                  as={MdEdit}
                  color={'gray.500'}
                  h="20px"
                  w="20px"
                  ms="auto"
                  cursor={'pointer'}
                />
              </Flex>
            </Flex>
            <Flex w="100%">
              <Flex
                me="20px"
                h="40px"
                minW="40px"
                align="center"
                justify={'center'}
                borderRadius="full"
                background={gradientBg2}
              >
                <Icon as={MdAutoAwesome} color={'white'} h="20px" w="20px" />
              </Flex>
              <MessageBoxChat
                output={res_message?.data?.[0]?.content?.[0].text?.value}
              />
            </Flex>
          </Flex>
          {/* Chat Input */}
          <Flex mt="20px" justifyContent={'flex-center'} mx="auto">
            <Input
              color={textColor}
              border="1px solid"
              borderRadius={'45px'}
              borderColor={borderColor}
              w={{ md: '100%', xl: '45vw' }}
              h="60px"
              id="email"
              fontSize={'sm'}
              fontWeight="500"
              placeholder="Type your message here..."
              _placeholder={placeholderColor}
              _focus={{ borderColor: 'none' }}
              mb={{ base: '14px', md: '16px' }}
              me="20px"
              onChange={handleChange}
            />
            <Button
              py="20px"
              px="16px"
              fontSize="sm"
              variant="primary"
              borderRadius="45px"
              h="54px"
              _hover={{
                boxShadow:
                  '0px 21px 27px -10px rgba(96, 60, 255, 0.48) !important',
                bg: 'linear-gradient(15.46deg, #4A25E1 26.3%, #7B5AFF 86.4%) !important',
                _disabled: {
                  bg: 'linear-gradient(15.46deg, #4A25E1 26.3%, #7B5AFF 86.4%)',
                },
              }}
              minW="150px"
              onClick={handleSubmit}
              isLoading={loading}
            >
              Submit
            </Button>
          </Flex>

          <Flex
            mt="10px"
            direction={{ base: 'column', md: 'row' }}
            justifyContent="center"
            alignItems={'center'}
          >
            <Text color={gray} textAlign="center" fontSize="xs">
              Free Research Preview. ChatGPT may produce inaccurate information
              about people, places, or facts. Consider checking important
              information.
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </DashboardLayout>
  );
}
