/*eslint-disable*/
'use client';

import { FooterWebsite } from '@/components/footer/FooterWebsite';
import Faq from '@/components/landing/faq';
import FeatureOne from '@/components/landing/feature-one';
import FeatureThree from '@/components/landing/feature-three';
import FeatureTwo from '@/components/landing/feature-two';
import FirstSection from '@/components/landing/first-section';
import Hero from '@/components/landing/hero';
import SecondSection from '@/components/landing/second-section';
import NavbarFixed from '@/components/navbar/NavbarFixed';
import { Database } from '@/types_db';
import { Box, Button, Flex, Image, Input, Link, Text } from '@chakra-ui/react';
import { Session, User } from '@supabase/supabase-js';

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

export default function Home(props: Props) {
  return (
    <>
      {/* @ts-ignore */}
      <NavbarFixed session={props.session} />
      <Flex
        direction="column"
        align="center"
        h="100%"
        minH="100vh"
        overflow="hidden"
        position="relative"
      >
        <Flex
          w="100%"
          direction="column"
          pb={{ base: '0px', md: '80px', lg: '80px', xl: '80px' }}
          position="relative"
          justifyContent="center"
          alignItems="center"
        >
          <Hero />
          <FirstSection />
          <SecondSection />
          <FeatureOne />
          <FeatureTwo />
          <FeatureThree />
          <Faq />
          <Flex
            direction={'column'}
            maxW="100%"
            mx="auto"
            mb={{ base: '60px', md: '60px' }}
          >
            <Text
              color="navy.700"
              fontWeight={'800'}
              fontSize="30px"
              mb="20px"
              textAlign={'center'}
            >
              Join our newsletter
            </Text>
            <Text
              fontWeight={'500'}
              fontSize={{ base: '15px', md: 'lg' }}
              color="gray.600"
              px={{ base: '10px', md: '0px' }}
              mb="30px"
              textAlign={'center'}
            >
              By subscribing, you'll be the first to know about the latest news
              and updates.
            </Text>
            <form
              id="form-fbcaaaec-e795-4419-b112-06934fd0051d"
              action="https://api.encharge.io/v1/forms/fbcaaaec-e795-4419-b112-06934fd0051d/submission/plain"
              method="POST"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexWrap: 'wrap',
              }}
            >
              <div className="sc-jzJRlG kfekry">
                <div className="encharge-form-group sc-jTzLTM frRvjZ form-group">
                  <Input
                    variant="main"
                    placeholder="Enter your email*"
                    me="14px"
                    h="100%"
                    isRequired={true}
                    w={{ base: '96%', md: '420px' }}
                    maxW="100%"
                    fontWeight="500"
                    _placeholder={{
                      color: 'gray.600',
                      fontWeight: '500',
                    }}
                    borderRadius="70px"
                    mb="0px !important"
                    type="email"
                    id="31b6ea2a-d9c7-4b42-9a01-7677838f07e9"
                    name="email"
                    className="encharge-form-input sc-kAzzGY kTMZCx form-control"
                  />
                </div>
              </div>
              <div className="sc-cSHVUG ebRkVm">
                <Button
                  py="20px"
                  px="40px"
                  fontSize="sm"
                  fontWeight={'600'}
                  variant="primary"
                  borderRadius="45px"
                  bg="linear-gradient(15.46deg, #4A25E1 26.3%, #7B5AFF 86.4%) !important"
                  w={{ base: '100%', md: '150px' }}
                  h="58px"
                  type="submit"
                  className="encharge-form-submit-button sc-gZMcBi ejYzxT btn btn-primary"
                >
                  Subscribe
                </Button>
              </div>
            </form>
          </Flex>
        </Flex>
        <FooterWebsite />
      </Flex>
    </>
  );
}
