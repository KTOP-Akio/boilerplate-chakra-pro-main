import imageLeft from '@/public/img/hero/left-image.png';
import imageRight from '@/public/img/hero/right-image.png';
import { Button, Image, Icon, Flex, Link, Text } from '@chakra-ui/react';
import React from 'react';
import { IoIosStar } from 'react-icons/io';
import { MdChevronRight } from 'react-icons/md';

export default function hero() {
  return (
    <Flex
      mx="auto"
      mt={{ base: '90px', lg: '114px' }}
      w="96vw"
      h={{
        base: '560px',
        md: '580px',
        lg: '580px',
        xl: '620px',
        '2xl': '84vh',
      }}
      overflow="hidden"
      alignItems="center"
      alignContent="center"
      position={'relative'}
      maxW="100%"
      direction={{ base: 'column' }}
      bg="var(--linear-3, radial-gradient(98.96% 75.83% at 50% 0%, #948FE8 0%, #363285 22.92%, #110D5B 42.71%, #050327 88.54%))"
      borderRadius={{ base: '20px', md: '30px' }}
    >
      <Flex h="100%" w="100%">
        <Flex
          maxW="100%"
          h="100%"
          direction="row"
          width="stretch"
          justifyContent="space-between"
          alignItems="center"
          alignContent="center"
          mb={{ base: '0px', md: '30px' }}
        >
          <Image
            position="absolute"
            left="0"
            display={{ base: 'none', xl: 'unset' }}
            src={imageLeft.src}
            alt=" "
            w={{ base: '90%', md: '100%', lg: '30%', xl: '30%' }}
          />
          <Flex direction="column" mx="auto" textAlign="center">
            <Text
              as="h1"
              color="white"
              zIndex="100"
              fontSize={{
                base: '32px',
                md: '44px',
                lg: '44px',
                xl: '44px',
                '2xl': '58px',
              }}
              lineHeight={{
                base: '40px',
                md: '54px',
                lg: '54px',
                xl: '54px',
                '2xl': '68px',
              }}
              w={{
                base: '90%',
                md: '80%',
                lg: '60%',
                xl: '50%',
                '2xl': '50%',
                '3xl': '50%',
              }}
              alignSelf="center"
              mb={{ base: '16px', md: '20px' }}
              fontWeight="700"
            >
              Launch your startup project 10X faster in a few moments
            </Text>
            <Text
              as="p"
              mb={{ base: '30px', md: '30px' }}
              color={'white'}
              alignSelf="center"
              fontSize={{ base: 'sm', md: 'md', '2xl': 'md' }}
              lineHeight={{ base: '24px', md: '30px' }}
              letterSpacing="0px"
              fontWeight="500"
              w={{
                base: '91%',
                md: '82%',
                lg: '62%',
                xl: '44%',
                '2xl': '41%',
                '3xl': '41%',
              }}
            >
              Create a professional website for your startup in no time with
              Horizon UI Boilerplate. Our comprehensive template will help you
              launch your project 10X faster, leaving you more time to focus on
              your business.
            </Text>
            <Link
              w={{ base: '300px', md: '340px' }}
              alignSelf="center"
              href="/dashboard/signin"
            >
              <Button
                variant="primary"
                py="24px"
                bg="linear-gradient(15.46deg, #4A25E1 26.3%, #7B5AFF 86.4%) !important"
                px="24px"
                fontSize="md"
                borderRadius="45px"
                w={{ base: '300px', md: '340px' }}
                h="70px"
              >
                Go to dashboard
                <Icon
                  as={MdChevronRight}
                  color="white"
                  mt="4px"
                  ms="2px"
                  h="16px"
                  w="16px"
                />
              </Button>
            </Link>
            <Flex
              align="center"
              direction="column"
              justifyContent={{ base: 'center', lg: 'center' }}
            >
              {' '}
              <Text
                as="h3"
                mt={{ base: '20px', md: '20px' }}
                mb="10px"
                color="white"
                alignSelf="center"
                fontSize="md"
                letterSpacing="0px"
                fontWeight={'500'}
              >
                Used by 80,000+ users monthly
              </Text>
              <Flex
                justify={{ base: 'center', md: 'start' }}
                alignItems="center"
              >
                <Icon as={IoIosStar} w="22px" h="22px" color="#F6AD55" />
                <Icon as={IoIosStar} w="22px" h="22px" color="#F6AD55" />
                <Icon as={IoIosStar} w="22px" h="22px" color="#F6AD55" />
                <Icon as={IoIosStar} w="22px" h="22px" color="#F6AD55" />
                <Icon
                  as={IoIosStar}
                  w="22px"
                  h="22px"
                  color="orange.300"
                  me="8px"
                />
                <Text color="white" mt="2px" fontWeight="bold" fontSize="lg">
                  4.9
                </Text>
              </Flex>
            </Flex>
          </Flex>

          <Image
            position="absolute"
            right="0"
            display={{ base: 'none', xl: 'unset' }}
            src={imageRight.src}
            alt=" "
            w={{ base: '90%', md: '100%', lg: '30%', xl: '30%' }}
          />
        </Flex>
      </Flex>
    </Flex>
  );
}
