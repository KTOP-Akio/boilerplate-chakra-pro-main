/*eslint-disable*/
'use client';

import Card from '@/components/card/Card';
import DashboardLayout from '@/components/layout';
import { Database } from '@/types_db';
import { postData } from '@/utils/helpers';
import { Badge, Button, Flex, Icon, Link, Text } from '@chakra-ui/react';
import { Session, User } from '@supabase/supabase-js';
import { redirect, useRouter } from 'next/navigation';
import { MdChevronRight } from 'react-icons/md';

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
  subscription: SubscriptionWithProduct | null | any;
  userDetails: { [x: string]: any } | null | any;
  updateName: any;
  updateEmail: any;
  updatePassword: any; 
}

export default function Settings(props: Props) {
  const router = useRouter();

  const redirectToCustomerPortal = async () => {
    try {
      const { url } = await postData({
        url: '/api/create-portal-link',
      });
      router.push(url);
    } catch (error) {
      if (error) return alert((error as Error).message);
    }
  };

  if (!props.session) {
    return redirect('/dashboard/signin');
  }

  return (
    <>
      <DashboardLayout
        session={props.session}
        userDetails={props.userDetails}
        user={props.session?.user}
        products={props.products}
        subscription={props.subscription}
        title="Subscription Page"
        description="Manage your subscriptions"
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
            <Card w="830px" maxW={{ base: '100%' }} h="min-content">
              <Card
                bg="linear-gradient(15deg, #4A25E1 26.3%, #7B5AFF 86.4%)"
                maxW={{ base: '100%' }}
                px={{ base: '20px', md: '40px', lg: '50px' }}
                py={{ base: '28px', md: '40px', lg: '50px' }}
                me={{ base: '0px', md: '20px' }}
                mb="16px"
              >
                <Badge
                  w="max-content"
                  mb="10px"
                  fontSize="sm"
                  bg="rgba(255,255,255,0.12)"
                  color="white"
                  fontWeight="bold"
                  borderRadius="8px"
                >
                  CURRENT PLAN
                </Badge>
                {props.subscription ? (
                  props.products?.map((product: any) => {
                    const price = product?.prices?.find(
                      (price: any) => price.id === props.subscription?.price_id,
                    );
                    // {props.subscription?.map((subscription:any) => {
                    //   const price = subscription?.prices?.find(
                    //     (user:any) => user.id === props?.userDetails.id,
                    //   );

                    if (price?.id === props.subscription.price_id)
                      return (
                        // IN CASE USER HAS PLAN
                        <Flex
                          justifyContent="space-between"
                          direction={{ base: 'column', md: 'row' }}
                        >
                          <Flex direction="column">
                            <Text
                              fontSize={{ base: '30px', md: '44px' }}
                              color="white"
                              fontWeight="800"
                            >
                              {product?.name
                                ? product.name?.toString()
                                : 'No plan active'}
                            </Text>
                            <Text
                              fontSize={{ base: 'sm', md: '20px' }}
                              color="white"
                              fontWeight="500"
                              mb={{ base: '20px', md: '0px' }}
                            >
                              {product?.name
                                ? `You are currently on ${product.name?.toString()}`
                                : "You don't have an active subscription."}
                            </Text>
                          </Flex>
                          <Flex direction="column">
                            <Text
                              fontSize={{ base: 'lg', md: '24px' }}
                              color="white"
                              textAlign={{ base: 'left', md: 'right' }}
                              fontWeight="800"
                              mb="10px"
                            >
                              $
                              {price?.unit_amount !== null
                                ? price?.unit_amount / 100
                                : '0'}
                              {price?.interval === 'year'
                                ? '/year'
                                : price?.interval === 'month'
                                ? '/month'
                                : 'error'}
                            </Text>
                            <Button
                              py="20px"
                              px="16px"
                              fontSize="sm"
                              variant="outline"
                              borderRadius="45px"
                              w={{ base: '100%', md: '266px' }}
                              h="54px"
                              onClick={redirectToCustomerPortal}
                            >
                              {props?.subscription
                                ? 'Manage your subscription'
                                : 'See pricing Plans'}
                              <Icon
                                as={MdChevronRight}
                                display={props?.subscription ? 'none' : 'unset'}
                                mt="2px"
                                h="16px"
                                w="16px"
                              />
                            </Button>
                          </Flex>
                        </Flex>
                      );
                  })
                ) : (
                  // IN CASE OF NOW PLAN
                  <Flex
                    justifyContent="space-between"
                    direction={{ base: 'column', md: 'row' }}
                  >
                    <Flex direction="column">
                      <Text
                        fontSize={{ base: '30px', md: '44px' }}
                        color="white"
                        fontWeight="800"
                      >
                        No plan active
                      </Text>
                      <Text
                        fontSize={{ base: 'sm', md: '20px' }}
                        color="white"
                        fontWeight="500"
                        mb={{ base: '20px', md: '0px' }}
                      >
                        You don't have an active subscription.
                      </Text>
                    </Flex>
                    <Flex direction="column">
                      <Text
                        fontSize={{ base: 'lg', md: '24px' }}
                        color="white"
                        textAlign={{ base: 'left', md: 'right' }}
                        fontWeight="800"
                        mb="10px"
                      >
                        $0/month
                      </Text>
                      <Link href="/pricing">
                        <Button
                          py="20px"
                          px="16px"
                          fontSize="sm"
                          variant="outline"
                          borderRadius="45px"
                          w={{ base: '100%', md: '190px' }}
                          h="54px"
                        >
                          See pricing Plans
                          <Icon
                            as={MdChevronRight}
                            mt="2px"
                            h="16px"
                            w="16px"
                          />
                        </Button>
                      </Link>
                    </Flex>
                  </Flex>
                )}
              </Card>
              <Flex
                direction={{ base: 'column', md: 'row' }}
                justifyContent="center"
              >
                <Text
                  textAlign={'center'}
                  fontWeight={'500'}
                  fontSize="sm"
                  alignSelf="center"
                  color="gray.500"
                  w={{ base: '70%', md: 'unset' }}
                  me="2px"
                >
                  Got a question regarding your subscription? Chat with us via{' '}
                </Text>
                <Link href="mailto:hello@horizon-ui.com">
                  <Text
                    textAlign={'center'}
                    fontWeight={'500'}
                    fontSize="sm"
                    textDecoration="underline"
                    color="gray.500"
                  >
                    hello@horizon-ui.com.
                  </Text>
                </Link>
              </Flex>
            </Card>
          </Flex>
        </Flex>
      </DashboardLayout>
    </>
  );
}
