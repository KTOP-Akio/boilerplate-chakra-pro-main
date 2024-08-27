/*eslint-disable*/
'use client';

import MessageBox from '@/components/MessageBox';
import Card from '@/components/card/Card';
import DashboardLayout from '@/components/layout';
import modalImage from '@/public/Modal.png';
import { EssayBody, OpenAIModel } from '@/types/types';
import { Database } from '@/types_db';
import { postData } from '@/utils/helpers';
import { getStripe } from '@/utils/stripe-client';
import {
  Badge,
  Button,
  Flex,
  FormLabel,
  Icon,
  Image,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Select,
  Text,
  Textarea,
  useColorModeValue,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { Session, User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { IoIosStar } from 'react-icons/io';
import {
  MdCheckCircle,
  MdChevronRight,
  MdOutlineWorkspacePremium,
} from 'react-icons/md';

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
  const [priceIdLoading, setPriceIdLoading] = useState<string>();
  const [plan, setPlan] = useState({
    product: 'prod_PtTCPDFZbburMa',
    price: 'price_1P3gGXGx8VbJPRgzdEZODy8K',
  });
  const router = useRouter();
  const handleCheckout = async (price: Price) => {
    setPriceIdLoading(price.id);
    if (!props.user) {
      return router.push('/dashboard/signin');
    }
    try {
      const { sessionId } = await postData({
        url: '/api/create-checkout-session',
        // @ts-ignore
        data: { price },
      });

      const stripe = await getStripe();
      stripe?.redirectToCheckout({ sessionId });
    } catch (error) {
      return alert((error as Error)?.message);
    } finally {
      setPriceIdLoading(undefined);
    }
  }; 
  // Input States
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [words, setWords] = useState<'300' | '200'>('200');
  const [essayType, setEssayType] = useState<
    '' | 'Argumentative' | 'Classic' | 'Persuasive' | 'Critique'
  >('');
  const [topic, setTopic] = useState<string>('');
  // Response message
  const [outputCode, setOutputCode] = useState<string>('');
  // ChatGPT model
  const [model, setModel] = useState<OpenAIModel>('gpt-3.5-turbo');
  // Loading state
  const [loading, setLoading] = useState<boolean>(false);
  // API Key
  // const [apiKey, setApiKey] = useState<string>();
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

    // if (!apiKey?.includes('sk-') && !apiKey?.includes('sk-')) {
    //   alert('Please enter an API key.');
    //   return;
    // }

    if (!topic) {
      alert('Please enter your subject.');
      return;
    }
    if (!words) {
      alert('Please choose number of words.');
      return;
    }
    if (!essayType) {
      alert('Please choose a type of essay.');
      return;
    }
    if (topic.length > maxCodeLength) {
      alert(
        `Please enter code less than ${maxCodeLength} characters. You are currently at ${topic.length} characters.`,
      );
      return;
    }

    setLoading(true);
    setOutputCode('');

    const controller = new AbortController();

    const body: EssayBody = {
      topic,
      words,
      essayType,
      model,
    };

    // -------------- Fetch --------------
    const response = await fetch('/api/essayAPI', {
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
  const handleChange = (Event: any) => {
    setTopic(Event.target.value);
  };
  const handleChangeParagraphs = (Event: any) => {
    setWords(Event.target.value);
  };
  const handleChangeEssayType = (Event: any) => {
    setEssayType(Event.target.value);
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
              What your essay will be about?
            </Text>
            <Textarea
              border="1px solid"
              borderRadius={'10px'}
              borderColor={borderColor}
              p="15px 20px"
              mb="28px"
              minH="224px"
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
              htmlFor={'parag'}
              fontSize="md"
              color={textColor}
              letterSpacing="0px"
              fontWeight="bold"
              _hover={{ cursor: 'pointer' }}
            >
              Number of words
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
              onChange={handleChangeParagraphs}
            >
              <option value={'200'}>200</option>
              <option value={'300'}>300</option>
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
              <option value="Persuasive">Persuasive</option>
              <option value="Critique">Critique</option>
            </Select>{' '}
            {props.subscription ? (
              <Flex direction="column">
                <Text
                  ms="10px"
                  fontSize="md"
                  color={textColor}
                  letterSpacing="0px"
                  fontWeight="bold"
                  mb="12px"
                >
                  Looking for all features?
                </Text>

                <Link href="/dashboard/premium-essays">
                  <Flex
                    border="1px solid"
                    borderRadius={'14px'}
                    borderColor={borderColor}
                    py="14px"
                    mb="28px"
                    align="center"
                    px="16px"
                  >
                    <Flex
                      border="1px solid"
                      borderRadius="99px"
                      borderColor="secondaryGray.200"
                      p="10px"
                      h="max-content"
                    >
                      <Icon
                        color="brand.500"
                        as={MdOutlineWorkspacePremium}
                        h="20px"
                        w="20px"
                      />
                    </Flex>
                    <Text
                      ms="10px"
                      fontSize="md"
                      color={textColor}
                      letterSpacing="0px"
                      fontWeight="bold"
                    >
                      Try our Premium Essay Generator
                    </Text>
                    <Icon
                      color={textColor}
                      as={MdChevronRight}
                      h="20px"
                      w="20px"
                      ms="auto"
                      mb="-2px"
                      me="4px"
                    />
                  </Flex>
                </Link>
              </Flex>
            ) : (
              <Flex direction="column">
                <Text
                  ms="10px"
                  fontSize="md"
                  color={textColor}
                  letterSpacing="0px"
                  fontWeight="bold"
                  mb="12px"
                >
                  Looking for more features?
                </Text>
                <Flex
                  cursor="pointer"
                  onClick={() => {
                    onOpen();
                  }}
                  border="1px solid"
                  borderRadius={'14px'}
                  borderColor={borderColor}
                  py="14px"
                  mb="28px"
                  align="center"
                  px="16px"
                >
                  <Flex
                    border="1px solid"
                    borderRadius="99px"
                    borderColor="secondaryGray.200"
                    p="10px"
                    h="max-content"
                  >
                    <Icon
                      color="brand.500"
                      as={MdOutlineWorkspacePremium}
                      h="20px"
                      w="20px"
                    />
                  </Flex>
                  <Text
                    ms="10px"
                    fontSize="md"
                    color={textColor}
                    letterSpacing="0px"
                    fontWeight="bold"
                  >
                    Try our Premium Essay Generator
                  </Text>
                  <Icon
                    color={textColor}
                    as={MdChevronRight}
                    h="20px"
                    w="20px"
                    ms="auto"
                    mb="-2px"
                    me="4px"
                  />
                </Flex>
              </Flex>
            )}
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay bg="rgba(0, 0, 0, 0.85)" />
              <ModalContent
                mx="8px"
                bg="transparent"
                boxShadow="unset"
                maxW="unset"
                w="unset"
              >
                <ModalBody p="0px" position={'relative'}>
                  <Flex>
                    <Image
                      display={{ base: 'none', md: 'block' }}
                      zIndex="98"
                      borderLeftRadius="16px"
                      src={modalImage.src}
                      w="340px"
                      alt=" "
                    />
                    <Flex
                      bg="white"
                      borderLeftRadius={{ base: '16px', md: '0px' }}
                      borderRightRadius="16px"
                      direction={'column'}
                      px={{ base: '30px', md: '42px' }}
                      py="34px"
                      w={{ md: '412px', lg: '456px' }}
                      minW={{ md: '412px', lg: '456px' }}
                    >
                      <Text
                        fontSize="26px"
                        fontWeight={'800'}
                        color={textColor}
                        mb="12px"
                      >
                        Upgrade to Unlimited
                      </Text>
                      <Text
                        mb="24px"
                        fontWeight="500"
                        fontSize="md"
                        color="gray.500"
                      >
                        Get access to all features and generate premium and
                        exclusive essays with our unlimited plan!
                      </Text>
                      {/* Features */}
                      <Flex w={{ base: '100%', xl: '80%' }} direction="column">
                        <Flex alignItems="center" mb="20px">
                          <Icon
                            me="10px"
                            w="20px"
                            h="20px"
                            color={'green.500'}
                            as={MdCheckCircle}
                          />
                          <Text
                            as="span"
                            fontSize="sm"
                            fontWeight="600"
                            color={textColor}
                            letterSpacing="0px"
                          >
                            Access to 12+ Essay types
                          </Text>
                        </Flex>
                        <Flex alignItems="center" mb="20px">
                          <Icon
                            me="10px"
                            w="20px"
                            h="20px"
                            color={'green.500'}
                            as={MdCheckCircle}
                          />
                          <Text
                            as="span"
                            fontSize="sm"
                            fontWeight="600"
                            color={textColor}
                            letterSpacing="0px"
                          >
                            Up to 1500 words per Essay
                          </Text>
                        </Flex>
                        <Flex alignItems="center" mb="20px">
                          <Icon
                            me="10px"
                            w="20px"
                            h="20px"
                            color={'green.500'}
                            as={MdCheckCircle}
                          />
                          <Text
                            as="span"
                            fontSize="sm"
                            fontWeight="600"
                            color={textColor}
                            letterSpacing="0px"
                          >
                            Academic Citation formats (APA, etc.)
                          </Text>
                        </Flex>
                        <Flex alignItems="center" mb="20px">
                          <Icon
                            me="10px"
                            w="20px"
                            h="20px"
                            color={'green.500'}
                            as={MdCheckCircle}
                          />
                          <Text
                            as="span"
                            fontSize="sm"
                            fontWeight="600"
                            color={textColor}
                            letterSpacing="0px"
                          >
                            Academic Levels (Master, etc.)
                          </Text>
                        </Flex>
                        <Flex alignItems="center" mb="30px">
                          <Icon
                            me="10px"
                            w="20px"
                            h="20px"
                            color={'green.500'}
                            as={MdCheckCircle}
                          />
                          <Text
                            as="span"
                            fontSize="sm"
                            fontWeight="600"
                            color={textColor}
                            letterSpacing="0px"
                          >
                            Essay Tones (Academic, etc.)
                          </Text>
                        </Flex>
                      </Flex>
                      {/* YEARLY */}
                      <Flex
                        onClick={() =>
                          setPlan({
                            product: 'prod_PtTJ6R3RnzmIPX',
                            price: 'price_1P3gMyGx8VbJPRgzkoB6Fp8F',
                          })
                        }
                        transition="0.15s linear"
                        align="center"
                        position="relative"
                        border="1px solid"
                        borderColor={
                          plan.product === 'prod_PtTJ6R3RnzmIPX'
                            ? 'brand.500'
                            : borderColor
                        }
                        borderRadius="10px"
                        w="100%"
                        py="14px"
                        px="14px"
                        cursor="pointer"
                        mb="20px"
                      >
                        <Text
                          fontSize="sm"
                          fontWeight={'700'}
                          color="#120F43"
                          mb="2x"
                          ms="8px"
                          me="8px"
                        >
                          Yearly
                        </Text>
                        <Badge
                          display={{
                            base: 'flex',
                            lg: 'none',
                            xl: 'flex',
                          }}
                          colorScheme="green"
                          borderRadius="4px"
                          color="green.500"
                          textTransform={'none'}
                          letterSpacing="0px"
                          px="0px"
                          w="max-content"
                        >
                          Save 35%
                        </Badge>
                        <Text
                          display="flex"
                          ms="auto"
                          fontSize="md"
                          color={textColor}
                          letterSpacing="0px"
                          fontWeight="600"
                          lineHeight="100%"
                        >
                          $5.75
                          <Text
                            fontSize={'14px'}
                            color="gray.500"
                            fontWeight="500"
                            ms="4px"
                            as="span"
                          >
                            /month
                          </Text>
                        </Text>
                      </Flex>
                      {/* END YEARLY */}
                      {/* MONTHLY */}
                      <Flex
                        onClick={() =>
                          setPlan({
                            product: 'prod_PtTCPDFZbburMa',
                            price: 'price_1P3gGXGx8VbJPRgzdEZODy8K',
                          })
                        }
                        transition="0.15s linear"
                        align="center"
                        position="relative"
                        border="1px solid"
                        borderColor={
                          plan.product === 'prod_PtTCPDFZbburMa'
                            ? 'brand.500'
                            : borderColor
                        }
                        borderRadius="10px"
                        w="100%"
                        py="16px"
                        px="14px"
                        cursor="pointer"
                        mb="28px"
                      >
                        <Text
                          fontSize="sm"
                          fontWeight={'700'}
                          color="#120F43"
                          mb="2x"
                          ms="8px"
                          me="4px"
                        >
                          Monthly
                        </Text>
                        <Text
                          display="flex"
                          ms="auto"
                          fontSize="md"
                          color={textColor}
                          letterSpacing="0px"
                          fontWeight="600"
                          lineHeight="100%"
                        >
                          $9
                          <Text
                            fontSize={'14px'}
                            color="gray.500"
                            fontWeight="500"
                            ms="4px"
                            as="span"
                          >
                            /month
                          </Text>
                        </Text>
                      </Flex>
                      {/* END MONTHLY */}
                      {props.products.map((product: any) => {
                        const price = product?.prices?.find(
                          (price: any) => price.id === plan.price,
                        );
                        if (product.id === plan.product) {
                          if (!price) return null;
                          return (
                            <Button
                              key={product.id}
                              py="20px"
                              px="16px"
                              fontSize="sm"
                              variant="primary"
                              borderRadius="45px"
                              w={{ base: '100%' }}
                              h="54px"
                              mb="28px"
                              _hover={{
                                boxShadow:
                                  '0px 21px 27px -10px rgba(96, 60, 255, 0.48) !important',
                                bg: 'linear-gradient(15.46deg, #4A25E1 26.3%, #7B5AFF 86.4%) !important',
                                _disabled: {
                                  bg: 'linear-gradient(15.46deg, #4A25E1 26.3%, #7B5AFF 86.4%)',
                                },
                              }}
                              onClick={() => handleCheckout(price)}
                            >
                              Upgrade now
                              <Icon
                                as={MdChevronRight}
                                mt="2px"
                                h="16px"
                                w="16px"
                              />
                            </Button>
                          );
                        }
                      })}
                      <Text
                        fontSize="xs"
                        color="gray.500"
                        fontWeight={'500'}
                        mx="auto"
                        mb="5px"
                      >
                        Used by 80,000+ users monthly
                      </Text>
                      <Flex direction="row" alignItems="center" mx="auto">
                        <Icon
                          me="1px"
                          w="16px"
                          h="16px"
                          color="orange.500"
                          as={IoIosStar}
                        />
                        <Icon
                          me="1px"
                          w="16px"
                          h="16px"
                          color="orange.500"
                          as={IoIosStar}
                        />
                        <Icon
                          me="1px"
                          w="16px"
                          h="16px"
                          color="orange.500"
                          as={IoIosStar}
                        />
                        <Icon
                          me="1px"
                          w="16px"
                          h="16px"
                          color="orange.500"
                          as={IoIosStar}
                        />
                        <Icon
                          me="6px"
                          w="16px"
                          h="16px"
                          color="orange.500"
                          as={IoIosStar}
                        />
                        <Text
                          fontSize="sm"
                          fontWeight="800"
                          h="100%"
                          color={textColor}
                        >
                          4.9
                        </Text>
                      </Flex>
                    </Flex>
                  </Flex>
                </ModalBody>
                <ModalCloseButton
                  borderRadius="full"
                  color="#120F43"
                  bg="#F4F6FB !important"
                  _hover={{ bg: '#E9EDF6 !important' }}
                  _focus={{ bg: '#F4F6FB !important' }}
                  _active={{ bg: '#F4F6FB !important' }}
                  zIndex="99"
                />
              </ModalContent>
            </Modal>
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
  );
}
