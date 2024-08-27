'use client';

/*eslint-disable*/
import MessageBoxChat from '@/components/MessageBoxChat';
import DashboardLayout from '@/components/layout';
import Bg from '@/public/img/ai-chat/bg-image.png';
import { ChatBody } from '@/types/types';
import { Database } from '@/types_db';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  useColorModeValue,
  Box,
  Icon,
  Flex,
  Text,
  Input,
  Button,
  Image,
} from '@chakra-ui/react';
import { Session, User } from '@supabase/supabase-js';
import { useState } from 'react';
import { MdAutoAwesome, MdBolt, MdEdit, MdPerson } from 'react-icons/md';

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
export default function Chat(props: Props) {
  // *** If you use .env.local variable for your API key, method which we recommend, use the apiKey variable commented below
  // Input States
  const [inputOnSubmit, setInputOnSubmit] = useState<string>('');
  const [inputMessage, setInputMessage] = useState<string>('');
  // Response message
  const [outputCode, setOutputCode] = useState<string>('');
  // ChatGPT model
  const [model, setModel] = useState('gpt-3.5-turbo');
  // Loading state
  const [loading, setLoading] = useState<boolean>(false);
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

  // API Key
  const handleTranslate = async () => {
    const apiKey = localStorage.getItem('apiKey');
    setInputOnSubmit(inputMessage);

    // Chat post conditions(maximum number of characters, valid message etc.)
    const maxCodeLength = model === 'gpt-3.5-turbo' ? 700 : 700;

    if (!apiKey?.includes('sk-')) {
      alert('Please enter an API key.');
      return;
    }

    if (!inputMessage) {
      alert('Please enter your subject.');
      return;
    }

    if (inputMessage.length > maxCodeLength) {
      alert(
        `Please enter code less than ${maxCodeLength} characters. You are currently at ${inputMessage.length} characters.`,
      );
      return;
    }
    setOutputCode(' ');
    setLoading(true);
    const controller = new AbortController();
    const body: ChatBody = {
      inputMessage,
      model,
      apiKey,
    };

    // -------------- Fetch --------------
    const response = await fetch('/api/chatAPI', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      setLoading(false);
      if (response) {
        alert(
          'Something went wrong went fetching from the API. Make sure to use a valid API key.',
        );
      }
      return;
    }

    const data = response.body;

    if (!data) {
      setLoading(false);
      alert('Something went wrong');
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      setLoading(true);
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      setOutputCode((prevCode) => prevCode + chunkValue);
    }

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
      title="Essay Generator"
      description="Essay Generator"
    >
      <Flex
        w="100%"
        direction={'column'}
        pt={{ base: 5, md: 0 }}
        position="relative"
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
          mx="auto"
          w="100%"
          maxW="100%"
          direction="column"
          minH={{ base: '75vh', xl: '85vh' }}
        >
          {/* Model Change */}
          <Flex w="100%" direction={'column'} mb={outputCode ? '20px' : 'auto'}>
            <Flex
              mx="auto"
              mb="20px"
              w="max-content"
              borderRadius="60px"
              zIndex={2}
            >
              <Flex
                cursor={'pointer'}
                justifyContent="center"
                borderRadius="8px"
                align={'center'}
                py="16px"
                transitionDuration={'0.3s'}
                h="70px"
                w="174px"
                bg={model === 'gpt-3.5-turbo' ? opacityBg : 'transparent'}
                boxShadow={model === 'gpt-3.5-turbo' ? shadow : 'unset'}
                color={textColor}
                fontWeight="700"
                fontSize="18px"
                onClick={() => setModel('gpt-3.5-turbo')}
              >
                <Flex
                  me="10px"
                  w="39px"
                  h="39px"
                  justify={'center'}
                  alignItems="center"
                  borderRadius="full"
                  bg={gradientBg}
                >
                  <Icon
                    as={MdAutoAwesome}
                    color={brandColor}
                    h="20px"
                    w="20px"
                  />
                </Flex>
                GPT-3.5
              </Flex>
              <Flex
                cursor={'pointer'}
                justifyContent="center"
                borderRadius="8px"
                align={'center'}
                py="16px"
                transitionDuration={'0.3s'}
                h="70px"
                w="174px"
                bg={model === 'gpt-4-1106-preview' ? opacityBg : 'transparent'}
                boxShadow={model === 'gpt-4-1106-preview' ? shadow : 'unset'}
                color={textColor}
                fontWeight="700"
                fontSize="18px"
                onClick={() => setModel('gpt-4-1106-preview')}
              >
                <Flex
                  me="10px"
                  w="39px"
                  h="39px"
                  justify={'center'}
                  alignItems="center"
                  borderRadius="full"
                  bg={gradientBg}
                >
                  <Icon as={MdBolt} color={brandColor} h="20px" w="20px" />
                </Flex>
                GPT-4
              </Flex>
            </Flex>

            <Accordion zIndex={10} mx="auto" my="0px" color={gray} allowToggle>
              <AccordionItem border="none">
                <AccordionButton
                  borderBottom="0px solid"
                  maxW="max-content"
                  mx="auto"
                  _hover={{ border: '0px solid', bg: 'none' }}
                  _focus={{ border: '0px solid', bg: 'none' }}
                >
                  <Box textAlign={'center'}>
                    <Text
                      fontSize="sm"
                      fontWeight={'500'}
                      color="secondaryGray.500"
                    >
                      No plugins added
                    </Text>
                  </Box>
                  <AccordionIcon color="secondaryGray.500" />
                </AccordionButton>
                <AccordionPanel mx="auto" w="max-content" p="0px 0px 10px 0px">
                  <Text
                    fontSize="sm"
                    fontWeight={'500'}
                    color="secondaryGray.500"
                    textAlign={'center'}
                  >
                    This is a cool text example.
                  </Text>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Flex>
          {/* Main Box */}
          <Flex
            mx="auto"
            w="100%"
            direction={'column'}
            display={outputCode ? 'flex' : 'none'}
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
                justify={'center'}
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
                  {inputOnSubmit}
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
              <MessageBoxChat output={outputCode} />
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
              onClick={handleTranslate}
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
