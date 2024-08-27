// eslint-disabled

import { Icon, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { MdChevronRight } from 'react-icons/md';

export default function SecondSection() {
  const brandColorPrice = useColorModeValue('brand.500', 'white');
  const textColor = useColorModeValue('#120F43', 'white');
  return (
    <Flex
      id="features"
      zIndex="2"
      w="100%"
      direction={{ base: 'column' }}
      bgSize="cover"
      alignItems="center"
      position="relative"
      pt={{ base: '90px', md: '100px', xl: '140px' }}
    >
      <Flex
        direction="column"
        px={{ base: '0px', md: '40px', xl: '0px' }}
        maxW="1170px"
        justifyContent="center"
        alignItems="center"
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
              HOW IT WORKS
            </Text>
            <Text
              as="h2"
              textAlign={{ base: 'center' }}
              color={textColor}
              fontWeight="800"
              fontSize={{ base: '30px', md: '48px', lg: '48px', xl: '58px' }}
              lineHeight={{ base: '38px', md: '60px', lg: '60px', xl: '70px' }}
              mb={{ base: '20px', md: '30px' }}
              mx="auto"
            >
              How it works?
            </Text>
          </Flex>
        </Flex>
        <Flex
          w={{ base: '86%', md: '76%', lg: '100%' }}
          pt={{ base: '40px', md: '60px', xl: '60px' }}
          maxW="100%"
          flexDirection={{ base: 'column', lg: 'row' }}
          align={'center'}
          justify="center"
        >
          <Flex
            direction="column"
            me={{ base: '0px', lg: '32px' }}
            mb={{ base: '50px', lg: '0px' }}
          >
            <Text
              as="h3"
              color="navy.700"
              fontWeight={'800'}
              textAlign={{ base: 'center', md: 'left' }}
              fontSize="20px"
              mb="12px"
            >
              Step 1: This is an example
            </Text>
            <Text
              color="gray.600"
              fontWeight={'500'}
              fontSize={{ base: '15px', md: 'md' }}
              textAlign={{ base: 'center', md: 'left' }}
              lineHeight={{ base: '28px', md: '30px' }}
              w="98%"
            >
              This is where your first step paragraph goes. For the moment, this
              is just an example to see what it will look like.
            </Text>
          </Flex>
          <Flex
            justify="center"
            align="center"
            bg="white"
            boxShadow={'0px 10.83px 28px -2px rgba(203, 213, 224, 0.79)'}
            borderRadius="50px"
            display={{ base: 'none', lg: 'flex' }}
            me={{ base: '0px', lg: '32px' }}
            minW="38px"
            minH="38px"
          >
            <Icon
              w="23px"
              h="23px"
              color="#7B5AFF"
              bg="transparent"
              as={MdChevronRight}
            />
          </Flex>
          <Flex
            direction="column"
            me={{ base: '0px', lg: '20px' }}
            mb={{ base: '50px', lg: '0px' }}
          >
            <Text
              as="h3"
              color="navy.700"
              fontWeight={'800'}
              fontSize="20px"
              mb="12px"
              textAlign={{ base: 'center', md: 'left' }}
            >
              Step 2: This is another example
            </Text>
            <Text
              color="gray.600"
              fontWeight={'500'}
              fontSize={{ base: '15px', md: 'md' }}
              textAlign={{ base: 'center', md: 'left' }}
              lineHeight={{ base: '28px', md: '30px' }}
              w="98%"
            >
              This is where your second step paragraph goes. For the moment,
              this is just an example to see what it will look like.
            </Text>
          </Flex>
          <Flex
            justify="center"
            align="center"
            bg="white"
            boxShadow={'0px 10.83px 28px -2px rgba(203, 213, 224, 0.79)'}
            borderRadius="50px"
            display={{ base: 'none', lg: 'flex' }}
            me={{ base: '0px', lg: '32px' }}
            minW="38px"
            minH="38px"
          >
            <Icon
              w="23px"
              h="23px"
              color="#7B5AFF"
              bg="transparent"
              as={MdChevronRight}
            />
          </Flex>
          <Flex direction="column">
            <Text
              as="h3"
              color="navy.700"
              fontWeight={'800'}
              fontSize="20px"
              mb="12px"
              textAlign={{ base: 'center', md: 'left' }}
            >
              Step 3: This is an example too
            </Text>
            <Text
              color="gray.600"
              fontWeight={'500'}
              fontSize={{ base: '15px', md: 'md' }}
              textAlign={{ base: 'center', md: 'left' }}
              lineHeight={{ base: '28px', md: '30px' }}
            >
              This is where your third step paragraph goes. For the moment, this
              is just an example to see what it will look like.
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
