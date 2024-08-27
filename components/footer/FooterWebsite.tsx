/*eslint-disable*/
'use client';

import logo from '/public/logo-horizon-boilerplate.png';
import { HSeparator } from '@/components/separator/Separator';
import { Flex, Link, Text, Image, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

export function FooterWebsite() {
  const textColorSecondary = useColorModeValue('gray.600', 'white');
  return (
    <Flex
      zIndex="3"
      flexDirection={{
        base: 'column',
      }}
      alignItems="center"
      justifyContent="space-between"
      position="relative"
      px={{ base: '20px', xl: '0px' }}
      pb="50px"
      bg="white"
    >
      <HSeparator
        mb="0px"
        mt={{ base: '0px', md: '100px', lg: '0px' }}
        maxW="1170px"
        mx="auto"
        bg="gray.200"
      />
      <Flex
        justifyContent="space-between"
        mt="50px"
        w={{ base: '100%', xl: '1170px' }}
        flexDirection={{
          base: 'column',
          lg: 'row',
        }}
        maxW={{ base: '100%', xl: '1170px' }}
        maxH="max-content"
        mx="auto"
      >
        <Link
          display={'flex'}
          alignItems="center"
          justifyContent={'center'}
          href="/"
        >
          <Image
            alt=" "
            w="36px"
            src={logo.src}
          />
          <Text ms="8px" me="10px" fontWeight="800" color="#120F43">
            Horizon UI Boilerplate
          </Text>
        </Link>
        <Flex
          direction={{ base: 'column', md: 'row' }}
          justifyItems="center"
          alignItems="center"
          textAlign={'center'}
          w={{ base: '100%', md: '100%', lg: '100%', xl: 'unset' }}
        >
          <Flex
            direction="column"
            justify={'center'}
            mx="auto"
            align="center"
            mb={{ base: '20px', lg: '0px' }}
          >
            <Flex my="auto" direction={{ base: 'column', md: 'row' }}>
              <Link
                isExternal={true}
                href="/pricing"
                fontSize="sm"
                color={textColorSecondary}
                fontWeight="500"
                letterSpacing="0px"
                me={{ base: '0px', md: '40px' }}
                mb={{ base: '20px', md: '0px' }}
              >
                Pricing
              </Link>
              <Link
                isExternal={true}
                href="/dashboard/settings"
                fontSize="sm"
                color={textColorSecondary}
                fontWeight="500"
                letterSpacing="0px"
                me={{ base: '0px', md: '40px' }}
                mb={{ base: '20px', md: '0px' }}
              >
                Account
              </Link>
              <Link
                isExternal={true}
                href="https://horizon-ui.notion.site/Refund-Policy-5d5fa25f7fac4978a0be6fcf3036c6ee"
                fontSize="sm"
                color={textColorSecondary}
                fontWeight="500"
                letterSpacing="0px"
                me={{ base: '0px', md: '40px' }}
                mb={{ base: '20px', md: '0px' }}
              >
                Refund Policy
              </Link>
              <Link
                isExternal={true}
                href="https://horizon-ui.notion.site/Privacy-Policy-8addde50aa8e408ca5c5f5811c38f971"
                fontSize="sm"
                color={textColorSecondary}
                fontWeight="500"
                letterSpacing="0px"
                me={{ base: '0px', md: '40px' }}
                mb={{ base: '20px', md: '0px' }}
              >
                Privacy Policy
              </Link>
              <Link
                isExternal={true}
                href="https://horizon-ui.notion.site/Terms-Conditions-6e79229d25ed48f48a481962bc6de3ee"
                fontSize="sm"
                color={textColorSecondary}
                fontWeight="500"
                letterSpacing="0px"
                me={{ base: '0px', md: '40px' }}
                mb={{ base: '20px', md: '0px' }}
              >
                Terms of service
              </Link>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Flex w="100%" maxW="1170px" px={{ base: '10px', md: '100px' }}>
        <Text
          lineHeight="180%"
          fontSize="sm"
          textAlign="center"
          color="gray.600"
          fontWeight="500"
          letterSpacing="0px"
          mt="40px"
          mb="40px"
        >
          <Text as="span" fontWeight={'700'}>
            Use it with caution:
          </Text>{' '}
          This tool can be helpful, but it is not a substitute for your own
          knowledge and understanding. Make sure to use it as a supplement to
          your own research and writing, rather than relying on it exclusively.
        </Text>
      </Flex>
    </Flex>
  );
}
