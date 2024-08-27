/*eslint-disable*/

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Flex,
  Text,
  Box,
  SimpleGrid,
  useColorModeValue,
} from '@chakra-ui/react';
import Link from 'next/link';

export default function Home() {
  const textColor = useColorModeValue('#120F43', 'white');
  return (
    <Box
      w="100%"
      pt={{ base: '90', md: '100px', xl: '140px' }}
      bg="linear-gradient(180deg, #F8FAFC 0%, rgba(255, 255, 255, 0) 47.33%)"
      id="faqs"
      bgSize="cover"
    >
      <Flex
        direction="column"
        mx="auto"
        mb="40px"
        maxW={{ base: '90%', lg: '62%' }}
        justify="center"
        textAlign="center"
      >
        <Text
          as="h3"
          textAlign={{ base: 'center', lg: 'center' }}
          fontWeight="700"
          letterSpacing="2px"
          color="brand.500"
          fontSize={{ base: 'xs', md: 'md' }}
          w="100%"
          mb="10px"
        >
          FREQUENTLY ASKED QUESTIONS
        </Text>
        <Text
          as="h2"
          mx="auto"
          color={textColor}
          fontWeight="800"
          fontSize={{ base: '30px', md: '38px', lg: '38px', xl: '38px' }}
          lineHeight={{ base: '38px', md: '50px', lg: '50px', xl: '50px' }}
          mb={{ base: '10px', md: '20px' }}
        >
          Frequently asked questions
        </Text>
        <Text
          mx="auto"
          color="gray.600"
          fontSize={{ base: 'md', md: 'md', xl: 'lg' }}
          fontWeight="500"
          letterSpacing="0px"
          lineHeight={{ base: '24px', md: '30px' }}
          mb="30px"
          maxW={{ base: '100%', md: '80%', lg: '60%' }}
        >
          Looking for something else? Chat with us via{' '}
          <Link href="mailto:hello@horizon-ui.com ">hello@horizon-ui.com</Link>{' '}
          and we will try our best to help you with your questions!
        </Text>
      </Flex>
      <Box
        w="100%"
        maxW={{ base: '100%', md: '80%', lg: '860px' }}
        mx="auto"
        mb="120px"
      >
        <Accordion allowMultiple>
          <AccordionItem borderTop="0px solid">
            <Text>
              <AccordionButton
                py="25px"
                _hover={{ bg: 'none' }}
                fontSize="md"
                letterSpacing="0px"
                fontWeight={'700'}
                color={textColor}
                _active={{ boxShadow: 'none' }}
                _focus={{ boxShadow: 'none' }}
              >
                <Flex as="h3" flex={1} textAlign="left">
                  What is Horizon UI Boilerplate?
                </Flex>
                <AccordionIcon />
              </AccordionButton>
            </Text>
            <AccordionPanel pb={4}>
              <SimpleGrid gap="40px" columns={1}>
                <Text
                  color="gray.600"
                  fontWeight={'500'}
                  fontSize="md"
                  letterSpacing="0px"
                >
                  This is an awesome example of how you can use our accordion
                  component for your FAQs section to provide clear, concise
                  answers while maintaining a clean and engaging user interface.
                  The intuitive design allows users to easily navigate through
                  common questions, expanding each section to find detailed
                  information without overwhelming them with text. It's an ideal
                  way to streamline your website's content and enhance user
                  experience, ensuring that visitors have quick access to the
                  answers they need.
                </Text>
              </SimpleGrid>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <Text>
              <AccordionButton
                py="25px"
                _hover={{ bg: 'none' }}
                fontSize="md"
                letterSpacing="0px"
                fontWeight={'700'}
                color={textColor}
                _active={{ boxShadow: 'none' }}
                _focus={{ boxShadow: 'none' }}
              >
                <Flex as="h3" flex={1} textAlign="left">
                  Is Horizon UI Boilerplate Free?
                </Flex>
                <AccordionIcon />
              </AccordionButton>
            </Text>
            <AccordionPanel pb={4}>
              <SimpleGrid gap="40px" columns={1}>
                <Text
                  color="gray.600"
                  fontWeight={'500'}
                  fontSize="md"
                  letterSpacing="0px"
                >
                  This is an awesome example of how you can use our accordion
                  component for your FAQs section to provide clear, concise
                  answers while maintaining a clean and engaging user interface.
                  The intuitive design allows users to easily navigate through
                  common questions, expanding each section to find detailed
                  information without overwhelming them with text. It's an ideal
                  way to streamline your website's content and enhance user
                  experience, ensuring that visitors have quick access to the
                  answers they need.
                </Text>
                <Text
                  color="gray.600"
                  fontWeight={'500'}
                  fontSize="md"
                  letterSpacing="0px"
                >
                  You can learn more on our{' '}
                  <Link href="/pricing">
                    <Text as="span" fontWeight={'bold'} color="brand.500">
                      Pricing Page.
                    </Text>
                  </Link>{' '}
                </Text>
              </SimpleGrid>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <Text>
              <AccordionButton
                py="25px"
                _hover={{ bg: 'none' }}
                fontSize="md"
                letterSpacing="0px"
                fontWeight={'700'}
                color={textColor}
                _active={{ boxShadow: 'none' }}
                _focus={{ boxShadow: 'none' }}
              >
                <Flex as="h3" flex={1} textAlign="left">
                  How does Horizon UI Boilerplate work?
                </Flex>
                <AccordionIcon />
              </AccordionButton>
            </Text>
            <AccordionPanel pb={4}>
              <SimpleGrid gap="40px" columns={1}>
                <Text
                  color="gray.600"
                  fontWeight={'500'}
                  fontSize="md"
                  letterSpacing="0px"
                >
                  This is an awesome example of how you can use our accordion
                  component for your FAQs section to provide clear, concise
                  answers while maintaining a clean and engaging user interface.
                  The intuitive design allows users to easily navigate through
                  common questions, expanding each section to find detailed
                  information without overwhelming them with text. It's an ideal
                  way to streamline your website's content and enhance user
                  experience, ensuring that visitors have quick access to the
                  answers they need.
                </Text>
              </SimpleGrid>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <Text>
              <AccordionButton
                py="25px"
                _hover={{ bg: 'none' }}
                fontSize="md"
                letterSpacing="0px"
                fontWeight={'700'}
                color={textColor}
                _active={{ boxShadow: 'none' }}
                _focus={{ boxShadow: 'none' }}
              >
                <Flex as="h3" flex={1} textAlign="left">
                  How can I use Horizon UI Boilerplate?
                </Flex>
                <AccordionIcon />
              </AccordionButton>
            </Text>
            <AccordionPanel pb={4}>
              <SimpleGrid gap="40px" columns={1}>
                <Text
                  color="gray.600"
                  fontWeight={'500'}
                  fontSize="md"
                  letterSpacing="0px"
                >
                  This is an awesome example of how you can use our accordion
                  component for your FAQs section to provide clear, concise
                  answers while maintaining a clean and engaging user interface.
                  The intuitive design allows users to easily navigate through
                  common questions, expanding each section to find detailed
                  information without overwhelming them with text. It's an ideal
                  way to streamline your website's content and enhance user
                  experience, ensuring that visitors have quick access to the
                  answers they need.
                </Text>
              </SimpleGrid>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <Text>
              <AccordionButton
                py="25px"
                _hover={{ bg: 'none' }}
                fontSize="md"
                letterSpacing="0px"
                fontWeight={'700'}
                color={textColor}
                _active={{ boxShadow: 'none' }}
                _focus={{ boxShadow: 'none' }}
              >
                <Flex as="h3" flex={1} textAlign="left">
                  Is Horizon UI Boilerplate suitable for all academic levels?
                </Flex>
                <AccordionIcon />
              </AccordionButton>
            </Text>
            <AccordionPanel pb={4}>
              <SimpleGrid gap="40px" columns={1}>
                <Text
                  color="gray.600"
                  fontWeight={'500'}
                  fontSize="md"
                  letterSpacing="0px"
                >
                 This is an awesome example of how you can use our accordion
                  component for your FAQs section to provide clear, concise
                  answers while maintaining a clean and engaging user interface.
                  The intuitive design allows users to easily navigate through
                  common questions, expanding each section to find detailed
                  information without overwhelming them with text. It's an ideal
                  way to streamline your website's content and enhance user
                  experience, ensuring that visitors have quick access to the
                  answers they need.
                </Text>
              </SimpleGrid>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <Text>
              <AccordionButton
                py="25px"
                _hover={{ bg: 'none' }}
                fontSize="md"
                letterSpacing="0px"
                fontWeight={'700'}
                color={textColor}
                _active={{ boxShadow: 'none' }}
                _focus={{ boxShadow: 'none' }}
              >
                <Flex as="h3" flex={1} textAlign="left">
                  Can I trust the quality of the essays generated by Essay
                  Builder AI?
                </Flex>
                <AccordionIcon />
              </AccordionButton>
            </Text>
            <AccordionPanel pb={4}>
              <SimpleGrid gap="40px" columns={1}>
                <Text
                  color="gray.600"
                  fontWeight={'500'}
                  fontSize="md"
                  letterSpacing="0px"
                >
                  This is an awesome example of how you can use our accordion
                  component for your FAQs section to provide clear, concise
                  answers while maintaining a clean and engaging user interface.
                  The intuitive design allows users to easily navigate through
                  common questions, expanding each section to find detailed
                  information without overwhelming them with text. It's an ideal
                  way to streamline your website's content and enhance user
                  experience, ensuring that visitors have quick access to the
                  answers they need.
                </Text>
              </SimpleGrid>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <Text>
              <AccordionButton
                py="25px"
                _hover={{ bg: 'none' }}
                fontSize="md"
                letterSpacing="0px"
                fontWeight={'700'}
                color={textColor}
                _active={{ boxShadow: 'none' }}
                _focus={{ boxShadow: 'none' }}
              >
                <Flex as="h3" flex={1} textAlign="left">
                  Is the content generated by Horizon UI Boilerplate plagiarism-free?
                </Flex>
                <AccordionIcon />
              </AccordionButton>
            </Text>
            <AccordionPanel pb={4}>
              <SimpleGrid gap="40px" columns={1}>
                <Text
                  color="gray.600"
                  fontWeight={'500'}
                  fontSize="md"
                  letterSpacing="0px"
                >
                  This is an awesome example of how you can use our accordion
                  component for your FAQs section to provide clear, concise
                  answers while maintaining a clean and engaging user interface.
                  The intuitive design allows users to easily navigate through
                  common questions, expanding each section to find detailed
                  information without overwhelming them with text. It's an ideal
                  way to streamline your website's content and enhance user
                  experience, ensuring that visitors have quick access to the
                  answers they need.
                </Text>
              </SimpleGrid>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>
    </Box>
  );
}
