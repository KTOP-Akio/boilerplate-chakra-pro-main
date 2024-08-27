import InnerContent from '@/components/layout/innerContent';
import image from '@/public/img/features/feature-one.png';
import {
  Flex,
  Link,
  Button,
  Icon,
  Image,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';
import { MdChevronRight } from 'react-icons/md';

export default function FeatureOne() {
  const textColor = useColorModeValue('#120F43', 'white');
  const textColorSecondary = useColorModeValue('gray.600', 'white');
  return (
    <Flex
      w="100%"
      direction={{ base: 'column' }}
      pt={{ base: '100px', md: '140px', lg: '140px' }}
      pb={{ base: '100px', md: '140px', lg: '140px' }}
      overflow="hidden"
      bgSize="cover"
      position="relative"
    >
      <InnerContent px={{ base: '20px', md: '40px', xl: '0px' }}>
        <Flex
          align={'center'}
          direction={{ base: 'column', lg: 'row' }}
          maxW="100%"
          justifyContent="space-between"
          columnGap="50px"
          alignItems={{ base: 'center', lg: 'unset' }}
        >
          <Flex
            direction="column"
            my="auto"
            maxW="100%"
            alignItems={{ base: 'center', lg: 'unset' }}
          >
            <Text
              as="h3"
              fontWeight="700"
              letterSpacing="2px"
              bg="brand.500"
              bgClip="text"
              fontSize={{ base: 'xs', md: 'md' }}
              textAlign={{ base: 'center', lg: 'left' }}
              w="100%"
              mb="10px"
            >
              YOUR STARTUP FEATURES
            </Text>
            <Text
              as="h2"
              fontWeight="800"
              color={textColor}
              fontSize={{ base: '30px', md: '40px', xl: '42px' }}
              lineHeight={{ base: '40px', md: '50px', lg: '52px' }}
              mb="20px"
              w={{ base: '100%', md: '80%', lg: '100%' }}
              textAlign={{ base: 'center', lg: 'left' }}
              maxW={{ base: '100%', md: 'unset' }}
            >
              Ready to use Web App
              <br />
              for your Startup project
            </Text>
            <Text
              color={textColorSecondary}
              textAlign={{ base: 'center', lg: 'left' }}
              fontSize={{ base: 'sm', md: 'md', xl: 'md' }}
              w={{ base: '94%', md: '94%', lg: '97%' }}
              lineHeight={{ base: '24px', md: '30px' }}
              fontWeight="500"
              letterSpacing="0px"
              mb="30px"
            >
              It’s so easy to beat your endless procrastination when you have
              all the necessary resources to get that project done and start to
              generate your startup’s first dollar in just a few days.
            </Text>
            <Flex
              align="center"
              direction={{ base: 'column', md: 'row' }}
              mb={{ md: '0px', lg: '30px' }}
              justifyContent={{ base: 'center', lg: 'unset' }}
            >
              <Link href="/dashboard/signin" me={{ base: '0px', md: '14px' }}>
                <Button
                  py="20px"
                  px="16px"
                  fontSize="sm"
                  variant="primary"
                  borderRadius="45px"
                  mb={{ base: '20px', md: '0px' }}
                  w={{ base: '335px', md: '230px' }}
                  h="54px"
                >
                  Get started now
                  <Icon as={MdChevronRight} mt="2px" h="16px" w="16px" />
                </Button>
              </Link>
              <Link href="/dashboard/signin">
                <Button
                  py="20px"
                  px="16px"
                  fontSize="sm"
                  variant="setup"
                  borderRadius="45px"
                  mb={{ base: '20px', md: '0px' }}
                  w={{ base: '335px', md: '160px' }}
                  h="54px"
                >
                  Try it for Free
                  <Icon as={MdChevronRight} mt="2px" h="16px" w="16px" />
                </Button>
              </Link>
            </Flex>
          </Flex>
          <Image
            alt=" "
            src={image.src}
            w={{ base: '100%', lg: '415px', xl: '575px' }}
            mt={{ base: '20px', md: '50px', lg: '0px' }}
          />
        </Flex>
      </InnerContent>
    </Flex>
  );
}
