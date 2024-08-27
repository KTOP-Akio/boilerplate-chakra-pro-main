'use client';

// @ts-nocheck
import { FooterWebsite } from '../footer/FooterWebsite';
import Card from '@/components/card/Card';
import Faq from '@/components/landing/faq';
import InnerContent from '@/components/layout/innerContent';
import NavbarFixed from '@/components/navbar/NavbarFixed';
import { Database } from '@/types_db';
import { postData } from '@/utils/helpers';
import { getStripe } from '@/utils/stripe-client';
import {
  Badge,
  Button,
  Flex,
  Icon,
  Link,
  SimpleGrid,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { Session, User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import {
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
  FaCcAmex,
  FaCcApplePay,
} from 'react-icons/fa';
import {
  MdChevronRight,
  MdCheckCircle,
  MdAttachMoney,
  MdLock,
  MdOutlineDoDisturbOn,
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
}

export default function Pricing({
  session,
  user,
  products,
  subscription,
}: Props) {
  const router = useRouter();
  const [priceIdLoading, setPriceIdLoading] = useState<string>();
  const handleCheckout = async (price: Price) => {
    setPriceIdLoading(price.id);
    if (!user) {
      return router.push('/dashboard/signin');
    }
    if (subscription) {
      return router.push('/dashboard/subscription');
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
  const [version, setVersion] = useState('monthly');
  const textColor = useColorModeValue('#120F43', 'white');
  const brandColor = useColorModeValue('brand.500', 'white');
  const brandColorPrice = useColorModeValue('brand.500', 'white');
  const card = useColorModeValue('#fff', 'rgba(255, 255, 255, 0.05)');

  return (
    <Flex
      id="pricing"
      bgSize="cover"
      w="100%"
      direction={{ base: 'column' }}
      pt={{ base: '120px', md: '180px' }}
      overflow="hidden"
      position="relative"
    >
      <NavbarFixed session={session} />
      <InnerContent
        zIndex="1"
        maxW={{ base: '100%', md: '100%', xl: '1170px' }}
        pb={{ base: '60px', md: '100px' }}
      >
        {/* Title */}
        <Flex
          px={{ base: '20px', md: '0px' }}
          w="100%"
          mb="40px"
          direction={{ base: 'column' }}
        >
          <Flex
            direction="column"
            textAlign="start"
            px={{ base: '20px', md: '40px', xl: '0px' }}
            mb={{ base: '0px', lg: '30px' }}
            justify="center"
            align="center"
          >
            <Text
              as="h3"
              textAlign={{ base: 'center', lg: 'center' }}
              fontWeight="700"
              letterSpacing="2px"
              color={brandColorPrice}
              fontSize={{ base: 'xs', md: 'md' }}
              w="100%"
              mb="10px"
            >
              PRICING PLANS
            </Text>
            <Text
              as="h2"
              textAlign={{ base: 'center', lg: 'center' }}
              color={textColor}
              fontWeight="800"
              fontSize={{ base: '28px', md: '40px', lg: '40px', xl: '48px' }}
              lineHeight={{ base: '38px', md: '50px', lg: '50px', xl: '60px' }}
              w={{ base: '100%', md: '90%', lg: '80%', xl: '74%' }}
            >
              Create outstanding Essays for less than a Netflix subscription per
              month
            </Text>
          </Flex>
        </Flex>
        <SimpleGrid
          px={{ base: '20px', md: '0px' }}
          w="100%"
          columns={{ base: 1, lg: 3 }}
          gap="20px"
          mb="20px"
        >
          <Card
            borderRadius="16px"
            bg={card}
            maxW="377px"
            mx="auto"
            alignItems={{ base: 'start', lg: 'center' }}
            p={{ base: '16px', md: '26px' }}
            pt={{ base: '26px', md: '36px' }}
            flexDirection="column"
          >
            <Flex mb="20px" mx="auto">
              <Text
                fontSize="22px"
                letterSpacing="0px"
                textAlign="center"
                fontWeight="700"
                color={textColor}
              >
                Demo Plan
              </Text>
            </Flex>
            <Flex
              zIndex="1"
              px={{ base: '18px', md: '34px' }}
              pt="40px"
              pb="40px"
              borderRadius="16px"
              bg="#F3F5FA"
              mb="40px"
              direction="column"
              w="100%"
            >
              <Flex mb="30px" direction="row" justify="center">
                <Text
                  color="#120F43"
                  fontSize={{ base: '48px', md: '54px' }}
                  lineHeight="100%"
                  letterSpacing="0px"
                  fontWeight="extrabold"
                >
                  Free
                </Text>
              </Flex>
              <Link href="/dashboard/signin">
                <Button
                  py="20px"
                  px="16px"
                  fontSize="sm"  
                  variant="checkout" 
                  mx="auto"
                  borderRadius="45px"
                  w="100%"
                  h="54px"
                >
                  {subscription ? 'Manage' : 'Get started now'}
                  <Icon as={MdChevronRight} mt="2px" h="16px" w="16px" />
                </Button>
              </Link>
            </Flex>

            <Flex w={{ base: '100%', xl: '100%' }} direction="column">
              <Flex alignItems="center" mb="30px">
                <Icon
                  me="10px"
                  w="20px"
                  h="20px"
                  color={brandColor}
                  as={MdCheckCircle}
                />
                <Text
                  as="span"
                  fontSize={{ base: 'sm', lg: 'sm', xl: 'md' }}
                  fontWeight="600"
                  color={textColor}
                  letterSpacing="0px"
                >
                  Standard Essays
                </Text>
              </Flex>
              <Flex alignItems="center" mb="30px">
                <Icon
                  me="10px"
                  w="20px"
                  h="20px"
                  color={brandColor}
                  as={MdCheckCircle}
                />
                <Text
                  as="span"
                  fontSize={{ base: 'sm', lg: 'sm', xl: 'md' }}
                  fontWeight="600"
                  color={textColor}
                  letterSpacing="0px"
                >
                  Up to 4 Essay types
                </Text>
              </Flex>
              <Flex alignItems="center" mb="30px">
                <Icon
                  me="10px"
                  w="20px"
                  h="20px"
                  color={brandColor}
                  as={MdCheckCircle}
                />
                <Text
                  as="span"
                  fontSize={{ base: 'sm', lg: 'sm', xl: 'md' }}
                  fontWeight="600"
                  color={textColor}
                  letterSpacing="0px"
                >
                  Up to 300 words per Essay
                </Text>
              </Flex>
              <Flex alignItems="center" mb="30px">
                <Icon
                  me="10px"
                  w="20px"
                  h="20px"
                  color="gray.400"
                  as={MdOutlineDoDisturbOn}
                />
                <Text
                  as="span"
                  fontSize={{ base: 'sm', lg: 'sm', xl: 'md' }}
                  fontWeight="600"
                  color="gray.400"
                  letterSpacing="0px"
                >
                  Essay Tones (Academic, etc.)
                </Text>
              </Flex>
              <Flex alignItems="center" mb="30px">
                <Icon
                  me="10px"
                  w="20px"
                  h="20px"
                  color="gray.400"
                  as={MdOutlineDoDisturbOn}
                />
                <Text
                  as="span"
                  fontSize={{ base: 'sm', lg: 'sm', xl: 'md' }}
                  fontWeight="600"
                  color="gray.400"
                  letterSpacing="0px"
                >
                  Academic Citation formats (APA, etc)
                </Text>
              </Flex>
              <Flex alignItems="center" mb="30px">
                <Icon
                  me="10px"
                  w="20px"
                  h="20px"
                  color="gray.400"
                  as={MdOutlineDoDisturbOn}
                />
                <Text
                  as="span"
                  fontSize={{ base: 'sm', lg: 'sm', xl: 'md' }}
                  fontWeight="600"
                  color="gray.400"
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
                  color="gray.400"
                  as={MdOutlineDoDisturbOn}
                />
                <Text
                  as="span"
                  fontSize={{ base: 'sm', lg: 'sm', xl: 'md' }}
                  fontWeight="600"
                  color="gray.400"
                  letterSpacing="0px"
                >
                  Premium features
                </Text>
              </Flex>
              <Flex alignItems="center" mb="30px">
                <Icon
                  me="10px"
                  w="20px"
                  h="20px"
                  color="gray.400"
                  as={MdOutlineDoDisturbOn}
                />
                <Text
                  as="span"
                  fontSize={{ base: 'sm', lg: 'sm', xl: 'md' }}
                  fontWeight="600"
                  color="gray.400"
                  letterSpacing="0px"
                >
                  Priority Support
                </Text>
              </Flex>
            </Flex>
          </Card>
          {products.map((product) => {
            const price = product?.prices?.find(
              (price) => price.id === 'price_1P3gGXGx8VbJPRgzdEZODy8K',
            );
            if (product.id === 'prod_PtTCPDFZbburMa') {
              if (!price) return null;
              return (
                <Card
                  key={product.id}
                  borderRadius="16px"
                  bg="#120F43"
                  maxW="377px"
                  mx="auto"
                  alignItems={{ base: 'start', lg: 'center' }}
                  p={{ base: '16px', md: '26px' }}
                  pt={{ base: '26px', md: '36px' }}
                  flexDirection="column"
                >
                  {/* @ts-ignore-nextline */}
                  <Flex mb="20px" mx="auto">
                    <Text
                      fontSize="22px"
                      letterSpacing="0px"
                      textAlign="center"
                      fontWeight="700"
                      color="white"
                    >
                      {product.name?.toString()}
                    </Text>
                  </Flex>
                  <Flex
                    zIndex="1"
                    px={{ base: '18px', md: '34px' }}
                    pt="40px"
                    pb="40px"
                    borderRadius="16px"
                    bg="#120F43"
                    boxShadow="0px 8px 25px -4px rgba(255, 255, 255, 0.30) inset"
                    mb="40px"
                    direction="column"
                    w="100%"
                  >
                    <Flex mb="30px" direction="row" justify="center">
                      <Text
                        color="white"
                        fontSize={{ base: '48px', md: '54px' }}
                        lineHeight="100%"
                        letterSpacing="0px"
                        fontWeight="extrabold"
                      >
                        $
                        {price.unit_amount !== null
                          ? price.unit_amount / 100
                          : price.unit_amount}
                      </Text>
                      <Flex direction="column">
                        <Text
                          color="white"
                          letterSpacing="0px"
                          fontWeight="700"
                          fontSize="sm"
                          mt="auto"
                        >
                          {version !== 'yearly' ? '/month' : '/month'}
                        </Text>
                        {/* <Text
                          color="white"
                          letterSpacing="0px"
                          fontWeight="500"
                          fontSize="sm"
                          textDecoration="line-through"
                        >
                          {version !== 'yearly' ? 'reg. $24' : 'reg. $24'}
                        </Text> */}
                      </Flex>
                    </Flex>
                    <Button
                      py="20px"
                      px="16px"
                      fontSize="sm"
                      variant="checkoutDark" 
                      mx="auto"
                      borderRadius="45px"
                      w="100%"
                      h="54px"
                      onClick={() => handleCheckout(price)}
                    >
                      {subscription ? 'Manage' : 'Get started now'}
                      <Icon as={MdChevronRight} mt="2px" h="16px" w="16px" />
                    </Button>
                  </Flex>

                  {/* Features */}
                  <Flex w={{ base: '100%', xl: '100%' }} direction="column">
                    <Flex alignItems="center" mb="30px">
                      <Icon
                        me="10px"
                        w="20px"
                        h="20px"
                        color="white"
                        as={MdCheckCircle}
                      />
                      <Text
                        as="span"
                        fontSize={{ base: 'sm', lg: 'sm', xl: 'md' }}
                        fontWeight="600"
                        color="white"
                        letterSpacing="0px"
                      >
                        Unlimited Premium Essays / month
                      </Text>
                    </Flex>
                    <Flex alignItems="center" mb="30px">
                      <Icon
                        me="10px"
                        w="20px"
                        h="20px"
                        color="white"
                        as={MdCheckCircle}
                      />
                      <Text
                        as="span"
                        fontSize={{ base: 'sm', lg: 'sm', xl: 'md' }}
                        fontWeight="600"
                        color="white"
                        letterSpacing="0px"
                      >
                        Access to 12+ Essay types
                      </Text>
                    </Flex>
                    <Flex alignItems="center" mb="30px">
                      <Icon
                        me="10px"
                        w="20px"
                        h="20px"
                        color="white"
                        as={MdCheckCircle}
                      />
                      <Text
                        as="span"
                        fontSize={{ base: 'sm', lg: 'sm', xl: 'md' }}
                        fontWeight="600"
                        color="white"
                        letterSpacing="0px"
                      >
                        Up to 1500 words per Essay
                      </Text>
                    </Flex>
                    <Flex alignItems="center" mb="30px">
                      <Icon
                        me="10px"
                        w="20px"
                        h="20px"
                        color="white"
                        as={MdCheckCircle}
                      />
                      <Text
                        as="span"
                        fontSize={{ base: 'sm', lg: 'sm', xl: 'md' }}
                        fontWeight="600"
                        color="white"
                        letterSpacing="0px"
                      >
                        Academic Citation formats (APA, etc)
                      </Text>
                    </Flex>
                    <Flex alignItems="center" mb="30px">
                      <Icon
                        me="10px"
                        w="20px"
                        h="20px"
                        color="white"
                        as={MdCheckCircle}
                      />
                      <Text
                        as="span"
                        fontSize={{ base: 'sm', lg: 'sm', xl: 'md' }}
                        fontWeight="600"
                        color="white"
                        letterSpacing="0px"
                      >
                        Essay Tones (Academic, etc.)
                      </Text>
                    </Flex>
                    <Flex alignItems="center" mb="30px">
                      <Icon
                        me="10px"
                        w="20px"
                        h="20px"
                        color="white"
                        as={MdCheckCircle}
                      />
                      <Text
                        as="span"
                        fontSize={{ base: 'sm', lg: 'sm', xl: 'md' }}
                        fontWeight="600"
                        color="white"
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
                        color="white"
                        as={MdCheckCircle}
                      />
                      <Text
                        as="span"
                        fontSize={{ base: 'sm', lg: 'sm', xl: 'md' }}
                        fontWeight="600"
                        color="white"
                        letterSpacing="0px"
                      >
                        Exceptional Essays in seconds
                      </Text>
                    </Flex>
                    <Flex alignItems="center" mb="30px">
                      <Icon
                        me="10px"
                        w="20px"
                        h="20px"
                        color="white"
                        as={MdCheckCircle}
                      />
                      <Text
                        as="span"
                        fontSize={{ base: 'sm', lg: 'sm', xl: 'md' }}
                        fontWeight="600"
                        color="white"
                        letterSpacing="0px"
                      >
                        Easy-to-use Essay Generator
                      </Text>
                    </Flex>
                    <Flex alignItems="center" mb="30px">
                      <Icon
                        me="10px"
                        w="20px"
                        h="20px"
                        color="white"
                        as={MdCheckCircle}
                      />
                      <Text
                        as="span"
                        fontSize={{ base: 'sm', lg: 'sm', xl: 'md' }}
                        fontWeight="600"
                        color="white"
                        letterSpacing="0px"
                      >
                        Priority Support
                      </Text>
                    </Flex>
                  </Flex>
                </Card>
              );
            }
          })}
          {products.map((product) => {
            const price = product?.prices?.find(
              (price) => price.id === 'price_1P3gMyGx8VbJPRgzkoB6Fp8F',
            );
            if (product.id === 'prod_PtTJ6R3RnzmIPX') {
              if (!price) return null;
              return (
                <Card
                  key={product.id}
                  borderRadius="16px"
                  bg={card}
                  maxW="377px"
                  mx="auto"
                  alignItems={{ base: 'start', lg: 'center' }}
                  p={{ base: '16px', md: '26px' }}
                  pt={{ base: '26px', md: '36px' }}
                  flexDirection="column"
                >
                  <Flex mb="20px" mx="auto">
                    <Text
                      fontSize="22px"
                      letterSpacing="0px"
                      textAlign="center"
                      fontWeight="700"
                      color={textColor}
                    >
                      {product.name?.toString()}
                    </Text>
                    <Badge
                      display="flex"
                      bg="#F2EFFF"
                      alignItems="center"
                      borderRadius="99px"
                      px="6px"
                      pb="8px"
                      ms="10px"
                      textColor={brandColor}
                    >
                      Save 35%
                    </Badge>
                  </Flex>
                  <Flex
                    zIndex="1"
                    px={{ base: '18px', md: '34px' }}
                    pt="40px"
                    pb="40px"
                    borderRadius="16px"
                    bg="#F3F5FA"
                    mb="40px"
                    direction="column"
                    w="100%"
                  >
                    <Flex mb="30px" direction="row" justify="center">
                      <Text
                        color={'transparent'}
                        fontSize={{ base: '48px', md: '54px' }}
                        lineHeight="100%"
                        letterSpacing="0px"
                        fontWeight="extrabold"
                        bgGradient="linear-gradient(91deg, #3D1DFF 0%, #6147FF 22.40%, #D451FF 46.35%, #EC458D 75.00%, #FFCA8B 100%)"
                        bgClip="text"
                      >
                        $
                        {price.unit_amount !== null
                          ? price.unit_amount / 100
                          : price.unit_amount}
                      </Text>
                      <Flex direction="column" ms="8px">
                        <Text
                          color={textColor}
                          letterSpacing="0px"
                          fontWeight="700"
                          fontSize="sm"
                          mt="auto"
                        >
                          {version !== 'yearly' ? '/year' : '/year'}
                        </Text>
                        <Text
                          color={textColor}
                          letterSpacing="0px"
                          fontWeight="500"
                          textDecoration="line-through"
                          fontSize="sm"
                          mt="2px"
                        >
                          {version !== 'yearly' ? 'reg.$108' : 'reg.$108'}
                        </Text>
                      </Flex>
                    </Flex>
                    <Button
                      py="20px"
                      px="16px"
                      fontSize="sm"
                      variant="checkout"
                      mx="auto"
                      borderRadius="45px"
                      w="100%"
                      h="54px"
                      onClick={() => handleCheckout(price)}
                    >
                      {subscription ? 'Manage' : 'Get started now'}
                      <Icon as={MdChevronRight} mt="2px" h="16px" w="16px" />
                    </Button>
                  </Flex>

                  {/* Features */}
                  <Flex w={{ base: '100%', xl: '100%' }} direction="column">
                    <Flex alignItems="center" mb="30px">
                      <Icon
                        me="10px"
                        w="20px"
                        h="20px"
                        color={brandColor}
                        as={MdCheckCircle}
                      />
                      <Text
                        as="span"
                        fontSize={{ base: 'sm', lg: 'sm', xl: 'md' }}
                        fontWeight="600"
                        color={textColor}
                        letterSpacing="0px"
                      >
                        Unlimited Premium Essays / year
                      </Text>
                    </Flex>
                    <Flex alignItems="center" mb="30px">
                      <Icon
                        me="10px"
                        w="20px"
                        h="20px"
                        color={brandColor}
                        as={MdCheckCircle}
                      />
                      <Text
                        as="span"
                        fontSize={{ base: 'sm', lg: 'sm', xl: 'md' }}
                        fontWeight="600"
                        color={textColor}
                        letterSpacing="0px"
                      >
                        Access to 12+ Essay types
                      </Text>
                    </Flex>
                    <Flex alignItems="center" mb="30px">
                      <Icon
                        me="10px"
                        w="20px"
                        h="20px"
                        color={brandColor}
                        as={MdCheckCircle}
                      />
                      <Text
                        as="span"
                        fontSize={{ base: 'sm', lg: 'sm', xl: 'md' }}
                        fontWeight="600"
                        color={textColor}
                        letterSpacing="0px"
                      >
                        Up to 1500 words per Essay
                      </Text>
                    </Flex>
                    <Flex alignItems="center" mb="30px">
                      <Icon
                        me="10px"
                        w="20px"
                        h="20px"
                        color={brandColor}
                        as={MdCheckCircle}
                      />
                      <Text
                        as="span"
                        fontSize={{ base: 'sm', lg: 'sm', xl: 'md' }}
                        fontWeight="600"
                        color={textColor}
                        letterSpacing="0px"
                      >
                        Academic Citation formats (APA, etc)
                      </Text>
                    </Flex>
                    <Flex alignItems="center" mb="30px">
                      <Icon
                        me="10px"
                        w="20px"
                        h="20px"
                        color={brandColor}
                        as={MdCheckCircle}
                      />
                      <Text
                        as="span"
                        fontSize={{ base: 'sm', lg: 'sm', xl: 'md' }}
                        fontWeight="600"
                        color={textColor}
                        letterSpacing="0px"
                      >
                        Essay Tones (Academic, etc.)
                      </Text>
                    </Flex>
                    <Flex alignItems="center" mb="30px">
                      <Icon
                        me="10px"
                        w="20px"
                        h="20px"
                        color={brandColor}
                        as={MdCheckCircle}
                      />
                      <Text
                        as="span"
                        fontSize={{ base: 'sm', lg: 'sm', xl: 'md' }}
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
                        color={brandColor}
                        as={MdCheckCircle}
                      />
                      <Text
                        as="span"
                        fontSize={{ base: 'sm', lg: 'sm', xl: 'md' }}
                        fontWeight="600"
                        color={textColor}
                        letterSpacing="0px"
                      >
                        Exceptional Essays in seconds
                      </Text>
                    </Flex>
                    <Flex alignItems="center" mb="30px">
                      <Icon
                        me="10px"
                        w="20px"
                        h="20px"
                        color={brandColor}
                        as={MdCheckCircle}
                      />
                      <Text
                        as="span"
                        fontSize={{ base: 'sm', lg: 'sm', xl: 'md' }}
                        fontWeight="600"
                        color={textColor}
                        letterSpacing="0px"
                      >
                        Easy-to-use Essay Generator
                      </Text>
                    </Flex>
                    <Flex alignItems="center" mb="30px">
                      <Icon
                        me="10px"
                        w="20px"
                        h="20px"
                        color={brandColor}
                        as={MdCheckCircle}
                      />
                      <Text
                        as="span"
                        fontSize={{ base: 'sm', lg: 'sm', xl: 'md' }}
                        fontWeight="600"
                        color={textColor}
                        letterSpacing="0px"
                      >
                        Priority Support
                      </Text>
                    </Flex>
                  </Flex>
                </Card>
              );
            }
          })}
        </SimpleGrid>
        <Flex
          px={{ base: '20px', md: '0px' }}
          direction="column"
          alignItems="center"
          mt="30px"
        >
          <Flex alignItems="center" mb="20px">
            <Icon
              me="4px"
              w="24px"
              h="24px"
              color={textColor}
              as={MdAttachMoney}
            />
            <Text
              as="span"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              letterSpacing="0px"
            >
              7-Days money back
            </Text>
          </Flex>
          <Flex alignItems="center" mb="20px">
            <Icon me="4px" w="24px" h="24px" color={textColor} as={MdLock} />
            <Text
              as="span"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              letterSpacing="0px"
            >
              Secured AES-256 Encrypted payments powered by Stripe:
            </Text>
          </Flex>
          <Flex alignItems="center" mb="20px">
            <Icon me="10px" w="30px" h="30px" color={textColor} as={FaCcVisa} />
            <Icon
              me="10px"
              w="30px"
              h="30px"
              color={textColor}
              as={FaCcMastercard}
            />
            <Icon
              me="10px"
              w="30px"
              h="30px"
              color={textColor}
              as={FaCcPaypal}
            />
            <Icon
              me="10px"
              w="30px"
              h="30px"
              color={textColor}
              as={FaCcApplePay}
            />
            <Icon w="30px" h="30px" color={textColor} as={FaCcAmex} />
          </Flex>
        </Flex>
      </InnerContent>
      <Faq />
      <FooterWebsite />
    </Flex>
  );
}
