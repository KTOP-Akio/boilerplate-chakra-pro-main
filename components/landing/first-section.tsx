import { HeroBg } from '@/components/icons/HeroBg';
import dashboard from '@/public/img/first-section/dashboard-world-greatest-section.png';
import left from '@/public/img/first-section/left-image-worlds-greatest.png';
import right from '@/public/img/first-section/right-image-worlds-greatest.png';
import nextjs from '@/public/img/hero/nextjs.png';
import openai from '@/public/img/hero/openai.png';
import stripe from '@/public/img/hero/stripe.png';
import supabase from '@/public/img/hero/supabase.png';
import chakra from '@/public/img/hero/chakra.png';
import userauth from '@/public/img/hero/user-auth.png';
import {
  Box,
  Icon,
  Flex,
  Image,
  Text,
  useColorModeValue,
  SimpleGrid,
} from '@chakra-ui/react';
import React from 'react';

export default function FirstSection() {
  const brandColorPrice = useColorModeValue('brand.500', 'white');
  const textColor = useColorModeValue('#120F43', 'white');
  return (
    <Flex
      zIndex="2"
      w="100%"
      direction={{ base: 'column' }}
      bgSize="cover"
      position="relative"
      pt={{ base: '90px', md: '100px', xl: '100px' }}
    >
      <SimpleGrid
        columns={{ base: 1, md: 3, xl: 6 }}
        w="100%"
        gap="16px"
        maxW="1170px"
        mx="auto"
        mb="86px"
      >
        <Flex
          direction="column"
          align="center"
          justify="center"
          border="1px solid"
          borderColor="secondaryGray.400"
          borderRadius="14px"
          py="39px"
        >
          <Image
            borderRadius="12px"
            mb="20px"
            src={nextjs.src}
            w="60px"
            h="60px"
            alt="nextjs logo"
          />
          <Text fontWeight="bold" color={textColor}>
            NextJS 14
          </Text>
        </Flex>
        <Flex
          direction="column"
          align="center"
          justify="center"
          border="1px solid"
          borderColor="secondaryGray.400"
          borderRadius="14px"
          py="39px"
        >
          <Image
            borderRadius="12px"
            mb="20px"
            src={stripe.src}
            w="60px"
            h="60px"
            alt="stripe logo"
          />
          <Text fontWeight="bold" color={textColor}>
            Stripe
          </Text>
        </Flex>
        <Flex
          direction="column"
          align="center"
          justify="center"
          border="1px solid"
          borderColor="secondaryGray.400"
          borderRadius="14px"
          py="39px"
        >
          <Image
            borderRadius="12px"
            mb="20px"
            src={supabase.src}
            w="60px"
            h="60px"
            alt="supabase logo"
          />
          <Text fontWeight="bold" color={textColor}>
            Supabase
          </Text>
        </Flex>
        <Flex
          direction="column"
          align="center"
          justify="center"
          border="1px solid"
          borderColor="secondaryGray.400"
          borderRadius="14px"
          py="39px"
        >
          <Image
            borderRadius="12px"
            mb="20px"
            src={chakra.src}
            w="60px"
            h="60px"
            alt="chakra ui logo"
          />
          <Text fontWeight="bold" color={textColor}>
            Chakra UI
          </Text>
        </Flex>
        <Flex
          direction="column"
          align="center"
          justify="center"
          border="1px solid"
          borderColor="secondaryGray.400"
          borderRadius="14px"
          py="39px"
        >
          <Image
            borderRadius="12px"
            mb="20px"
            src={openai.src}
            w="60px"
            h="60px"
            alt="openai logo"
          />
          <Text fontWeight="bold" color={textColor}>
            AI Integration
          </Text>
        </Flex>
        <Flex
          direction="column"
          align="center"
          justify="center"
          border="1px solid"
          borderColor="secondaryGray.400"
          borderRadius="14px"
          py="39px"
        >
          <Image
            borderRadius="12px"
            mb="20px"
            src={userauth.src}
            w="60px"
            h="60px"
            alt="auth0 logo"
          />
          <Text fontWeight="bold" color={textColor}>
            User Auth
          </Text>
        </Flex>
      </SimpleGrid>
      <Flex
        direction="column"
        px={{ base: '20px', md: '40px', xl: '0px' }}
        maxW="unset"
      >
        <Flex direction="column" width="stretch">
          <Flex
            direction="column"
            mx="auto"
            alignItems="center"
            textAlign="center"
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
              BEST AI NEXTJS BOILERPLATE
            </Text>
            <Text
              as="h2"
              textAlign={{ base: 'center' }}
              color={textColor}
              fontWeight="800"
              fontSize={{ base: '30px', md: '48px', lg: '48px', xl: '58px' }}
              lineHeight={{ base: '38px', md: '60px', lg: '60px', xl: '70px' }}
              mb={{ base: '20px', md: '30px' }}
              w={{ base: '100%', md: '80%', lg: '60%', xl: '50%' }}
              mx="auto"
            >
              Your All-in-One <br />
              Startup Boilerplate
            </Text>
            <Text
              color="gray.600"
              fontSize={{ base: 'sm', md: 'md', xl: 'lg' }}
              fontWeight="500"
              letterSpacing="0px"
              lineHeight={{ base: '24px', md: '30px' }}
              w={{
                base: '100%',
                md: '80%',
                lg: '80%',
                xl: '56%',
                '2xl': '54%',
              }}
            >
              Tap into the power of Artificial Intelligence for your startup
              needs with Horizon UI Boilerplate, the most complex NextJS
              boilerplate to launch your web app project in just a few moments.
            </Text>
          </Flex>
        </Flex>
        <Flex
          position={'relative'}
          justifyContent="center"
          mt={{ base: '16px', md: '10px', lg: '40px' }}
          maxW={{ base: '335px', md: '1170px' }}
          mx="auto"
        >
          <Icon
            as={HeroBg}
            position="absolute"
            mx="auto"
            w={{
              base: '500px',
              md: '750px',
              lg: '1000px',
              xl: '1800px',
            }}
            h={{
              base: '500px',
              md: '750px',
              lg: '1000px',
              xl: '820px',
            }}
            left="50%"
            transform="translate(-50%,0px)"
            top={{
              base: '-130px',
              md: '-90px',
              lg: '-100px',
              xl: '-80px',
            }}
          />
          <Image
            src={dashboard.src}
            zIndex={'1'}
            alt=""
            maxH="max-content"
            w="100%"
            maxW={{ base: '335px', md: '1170px' }}
            borderRadius="8px"
            boxShadow="0px 26.83487px 155.64224px -46.15597px #CBD5E0"
          />
          <Image
            zIndex={'1'}
            src={left.src}
            alt=""
            position={'absolute'}
            w={{ base: '62px', md: '122px', xl: '224px' }}
            left={{ base: '1px', md: '5px', lg: '10px', xl: '-20px' }}
            top={{ base: '33px', md: '75px', lg: '36px', xl: '45px' }}
            boxShadow="0px 10.1683px 61.0098px rgba(0, 0, 0, 0.05)"
            borderRadius="8px"
          />
          <Image
            src={right.src}
            alt=""
            position="absolute"
            right={{ base: '-16px', md: '-30px', lg: '-80px', xl: '-53px' }}
            top={{ base: '48px', md: '105px', lg: '44px', xl: '98px' }}
            w={{ base: '286px', md: '592px', lg: '806px', xl: '1026px' }}
            borderRadius="8px"
            zIndex={'1'}
          />
        </Flex>
      </Flex>
    </Flex>
  );
}
