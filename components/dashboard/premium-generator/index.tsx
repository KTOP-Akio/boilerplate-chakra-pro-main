/*eslint-disable*/
'use client';

import MessageBox from '@/components/MessageBox';
import Card from '@/components/card/Card';
import DashboardLayout from '@/components/layout';
import { OpenAIModel, PremiumEssayBody } from '@/types/types';
import { Database } from '@/types_db';
import {
  Button,
  Flex,
  FormLabel,
  Select,
  Switch,
  Text,
  Textarea,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { Session, User } from '@supabase/supabase-js';
import { useState } from 'react';

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

export default function EssayGenerator(props: Props) { 
  // Input States
  const [words, setWords] = useState<string>('200-300');
  const [essayType, setEssayType] = useState<
    | ''
    | 'Argumentative'
    | 'Classic'
    | 'Persuasive'
    | 'Memoir'
    | 'Critique'
    | 'Compare/Contrast'
    | 'Narrative'
    | 'Descriptive'
    | 'Expository'
    | 'Cause and Effect'
    | 'Reflective'
    | 'Informative'
  >('');
  const [topic, setTopic] = useState<string>('');
  const [tone, setTone] = useState<string>('');
  const [citation, setCitation] = useState<string>('');
  const [citations, setCitations] = useState(false);
  const [level, setLevel] = useState<string>('');
  // Response message
  const [outputCode, setOutputCode] = useState<string>('');
  // ChatGPT model
  const [model, setModel] = useState<OpenAIModel>('gpt-3.5-turbo');
  // Loading state
  const [loading, setLoading] = useState<boolean>(false);
  // API Key
  // const [apiKey, setApiKey] = useState<any>();
  const textColor = useColorModeValue('#120F43', 'white');
  const placeholderColor = useColorModeValue(
    { color: 'gray.500' },
    { color: 'whiteAlpha.600' },
  );
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.200');
  const toast = useToast();

  // -------------- Main API Handler --------------
  const handleTranslate = async () => {
    const maxCodeLength = model === 'gpt-3.5-turbo' ? 700 : 700;

    // Chat post conditions(maximum number of characters, valid message etc.)

    if (!topic) {
      alert('Please enter your subject.');
      return;
    }
    if (!essayType) {
      alert('Please choose a type of essay');
      return;
    }
    if (!tone) {
      alert('Please choose a essay tone');
      return;
    }
    if (!citation) {
      alert('Please choose a citation format');
      return;
    }
    if (!level) {
      alert('Please choose an level');
      return;
    }
    if (topic.length > maxCodeLength) {
      alert(
        `Please enter a topic less than ${maxCodeLength} characters. You are currently at ${topic.length} characters.`,
      );
      return;
    }

    setLoading(true);
    setOutputCode('');

    const controller = new AbortController();

    const body: PremiumEssayBody = {
      words,
      topic,
      essayType,
      tone,
      citation,
      level,
      citations,
      model,
    };

    // -------------- Fetch --------------
    const response = await fetch('/api/premiumEssayAPI', {
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
    let code = '';

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);

      code += chunkValue;

      setOutputCode((prevCode) => prevCode + chunkValue);
    }

    setLoading(false);
    copyToClipboard(code);
  };

  // -------------- Copy Response --------------
  const copyToClipboard = (text: string) => {
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  };

  // *** Initializing apiKey with .env.local value
  // useEffect(() => {
  // ENV file verison
  //   const apiKeyENV = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
  //   if (apiKey === undefined || null) {
  //     setApiKey(apiKeyENV);
  //   }
  // }, []);

  // -------------- Input Value Handler --------------
  const handleChangeWords = (Event: any) => {
    setWords(Event.target.value);
  };
  const handleChange = (Event: any) => {
    setTopic(Event.target.value);
  };
  const handleChangeEssayType = (Event: any) => {
    setEssayType(Event.target.value);
  };
  const handleChangeEssayTone = (Event: any) => {
    setTone(Event.target.value);
  };
  const handleChangeCitation = (Event: any) => {
    setCitation(Event.target.value);
  };
  const handleChangeLevel = (Event: any) => {
    setLevel(Event.target.value);
  };
  const handleCitations = (Event: any) => {
    setCitations(!citations);
  };
  return (
    <>
      <DashboardLayout
        session={props.session}
        userDetails={props.userDetails}
        user={props.session?.user}
        products={props.products}
        subscription={props.subscription}
        title="Premium Generator"
        description="Premium Generator"
      >
        <Flex
          w="100%"
          direction="column"
          position="relative"
          mt={{ base: '70px', md: '0px', xl: '0px' }}
        >
          <Flex
            mx="auto"
            w={{ base: '100%', md: '100%', xl: '100%' }}
            maxW="100%"
            justify="center"
            direction={{ base: 'column', md: 'row' }}
          >
            <Card
              minW={{ base: '100%', md: '40%', xl: '476px' }}
              maxW={{ base: '100%', md: '40%', xl: '476px' }}
              h="min-content"
              me={{ base: '0px', md: '20px' }}
              mb={{ base: '20px', md: '0px' }}
            >
              <Text
                fontSize={'30px'}
                color={textColor}
                fontWeight="800"
                mb="10px"
              >
                Essay Topic
              </Text>
              <Text fontSize="md" color="gray.500" fontWeight="500" mb="30px">
                What your premium essay will be about?
              </Text>
              <Textarea
                border="1px solid"
                borderRadius={'10px'}
                borderColor={borderColor}
                p="15px 20px"
                mb="28px"
                minH="124px"
                fontWeight="500"
                _focus={{ borderColor: 'none' }}
                color={textColor}
                placeholder="Type here your topic..."
                _placeholder={placeholderColor}
                onChange={handleChange}
              />
              <FormLabel
                display="flex"
                ms="10px"
                htmlFor={'words'}
                fontSize="md"
                color={textColor}
                letterSpacing="0px"
                fontWeight="bold"
                _hover={{ cursor: 'pointer' }}
              >
                Number of Words
              </FormLabel>
              <Select
                border="1px solid"
                borderRadius={'10px'}
                borderColor={borderColor}
                h="60px"
                id="words"
                placeholder="Select option"
                _focus={{ borderColor: 'none' }}
                mb="28px"
                onChange={handleChangeWords}
              >
                <option value="200-300">200-300</option>
                <option value="300-400">300-400</option>
                <option value="400-500">400-500</option>
                <option value="500-600">500-600</option>
                <option value="700-900">700-900</option>
                <option value="1000-1500">1000-1500</option>
              </Select>
              <FormLabel
                display="flex"
                ms="10px"
                htmlFor={'type'}
                fontSize="md"
                color={textColor}
                letterSpacing="0px"
                fontWeight="bold"
                _hover={{ cursor: 'pointer' }}
              >
                Select your Essay type
              </FormLabel>
              <Select
                border="1px solid"
                borderRadius={'10px'}
                borderColor={borderColor}
                h="60px"
                id="type"
                placeholder="Select option"
                _focus={{ borderColor: 'none' }}
                mb="28px"
                onChange={handleChangeEssayType}
              >
                <option value="Argumentative">Argumentative</option>
                <option value="Classic">Classic</option>
                <option value="Compare/Contrast">Compare/Contrast</option>
                <option value="Persuasive">Persuasive</option>
                <option value="Critique">Critique</option>
                <option value="Memoir">Memoir</option>
                <option value="Narrative">Narrative</option>
                <option value="Descriptive">Descriptive</option>
                <option value="Expository">Expository</option>
                <option value="Cause and Effect">Cause and Effect</option>
                <option value="Reflective">Reflective</option>
                <option value="Informative">Informative</option>
              </Select>
              <FormLabel
                display="flex"
                ms="10px"
                htmlFor={'tone'}
                fontSize="md"
                color={textColor}
                letterSpacing="0px"
                fontWeight="bold"
                _hover={{ cursor: 'pointer' }}
              >
                Select your Essay Tone
              </FormLabel>
              <Select
                border="1px solid"
                borderRadius={'10px'}
                borderColor={borderColor}
                h="60px"
                id="tone"
                placeholder="Select option"
                _focus={{ borderColor: 'none' }}
                mb="28px"
                onChange={handleChangeEssayTone}
              >
                <option value="Academic">Academic</option>
                <option value="Sarcastic">Sarcastic</option>
                <option value="Informal">Informal</option>
                <option value="Assertive">Assertive</option>
                <option value="Friendly">Friendly</option>
                <option value="Humorous">Humorous</option>
                <option value="Formal">Formal</option>
              </Select>
              <FormLabel
                display="flex"
                ms="10px"
                htmlFor={'citation'}
                fontSize="md"
                color={textColor}
                letterSpacing="0px"
                fontWeight="bold"
                _hover={{ cursor: 'pointer' }}
              >
                Select your Citation Format
              </FormLabel>
              <Select
                border="1px solid"
                borderRadius={'10px'}
                borderColor={borderColor}
                h="60px"
                id="citation"
                placeholder="Select option"
                _focus={{ borderColor: 'none' }}
                mb="28px"
                onChange={handleChangeCitation}
              >
                <option value="Cambridge Style">Cambridge Style</option>
                <option value="Harvard Style">Harvard Style</option>
                <option value="MLA">MLA</option>
                <option value="Chicago Style">Chicago Style</option>
                <option value="APA">APA</option>
                <option value="AMA">AMA</option>
                <option value="Oxford Style">Oxford Style</option>
                <option value="IEEE">IEEE</option>
                <option value="CSE">CSE</option>
                <option value="Bluebook">Bluebook</option>
                <option value="Turabian">Turabian</option>
                <option value="Vancouver">Vancouver</option>
                <option value="ACS">ACS</option>
                <option value="NLM">NLM</option>
                <option value="AAA">AAA</option>
                <option value="ASA">ASA</option>
                <option value="APSA">APSA</option>
              </Select>
              <FormLabel
                display="flex"
                ms="10px"
                htmlFor={'level'}
                fontSize="md"
                color={textColor}
                letterSpacing="0px"
                fontWeight="bold"
                _hover={{ cursor: 'pointer' }}
              >
                Academic Level
              </FormLabel>
              <Select
                border="1px solid"
                borderRadius={'10px'}
                borderColor={borderColor}
                h="60px"
                id="level"
                placeholder="Select option"
                _focus={{ borderColor: 'none' }}
                mb="28px"
                onChange={handleChangeLevel}
              >
                <option value="High-School">High-School</option>
                <option value="Pre Final">Pre Final</option>
                <option value="Master">Master</option>
                <option value="Doctoral">Doctoral</option>
                <option value="Final Year">Final Year</option>
              </Select>
              <Flex
                mb="28px"
                align={{ base: 'unset', md: 'center' }}
                direction={{ base: 'column', md: 'row' }}
              >
                <FormLabel
                  display="flex"
                  ms="10px"
                  me={{ base: '0px', md: '20px' }}
                  mb={{ base: '10px', md: '0px' }}
                  htmlFor={'citations'}
                  fontSize="md"
                  color={textColor}
                  letterSpacing="0px"
                  fontWeight="bold"
                  _hover={{ cursor: 'pointer' }}
                >
                  Citations and refrences
                </FormLabel>
                <Switch
                  isChecked={citations}
                  onChange={handleCitations}
                  colorScheme="brandScheme"
                  id="citations"
                />
              </Flex>
              <Button
                py="20px"
                px="16px"
                fontSize="md"
                variant="primary"
                borderRadius="45px"
                w={{ base: '100%' }}
                h="54px"
                onClick={handleTranslate}
                isLoading={loading ? true : false}
                _hover={{
                  boxShadow:
                    '0px 21px 27px -10px rgba(96, 60, 255, 0.48) !important',
                  bg: 'linear-gradient(15.46deg, #4A25E1 26.3%, #7B5AFF 86.4%) !important',
                  _disabled: {
                    bg: 'linear-gradient(15.46deg, #4A25E1 26.3%, #7B5AFF 86.4%)',
                  },
                }}
              >
                Generate your Essay
              </Button>
            </Card>
            <Card maxW="100%" h="100%">
              <Text
                fontSize={'30px'}
                color={textColor}
                fontWeight="800"
                mb="10px"
              >
                AI Output
              </Text>
              <Text fontSize="md" color="gray.500" fontWeight="500" mb="30px">
                Enjoy your outstanding essay!
              </Text>
              <MessageBox output={outputCode} />
              <Button
                variant="transparent"
                border="1px solid"
                borderColor={borderColor}
                borderRadius="full"
                maxW="160px"
                ms="auto"
                fontSize="md"
                w={{ base: '300px', md: '420px' }}
                h="54px"
                onClick={() => {
                  if (outputCode) navigator.clipboard.writeText(outputCode);
                  toast({
                    title: outputCode
                      ? `Essay succesfully copied!`
                      : `Generate an essay first!`,
                    position: 'top',
                    status: outputCode ? 'success' : `error`,
                    isClosable: true,
                  });
                }}
              >
                Copy text
              </Button>
            </Card>
          </Flex>
        </Flex>
      </DashboardLayout>
    </>
  );
}
