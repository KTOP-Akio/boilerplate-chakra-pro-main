'use client';

import modalImage from '@/public/Modal.png';
import SidebarImage from '@/public/SidebarBadge.png';
import { Database } from '@/types_db';
import { postData } from '@/utils/helpers';
import { getStripe } from '@/utils/stripe-client';
import {
  Badge,
  Button,
  Flex,
  Icon,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { IoIosStar } from 'react-icons/io';
import { MdCheckCircle, MdChevronRight } from 'react-icons/md';

type Price = Database['public']['Tables']['prices']['Row'];
interface SidebarCard {
  [x: string]: any;
}
export default function SidebarCard(props: SidebarCard) {
  const [priceIdLoading, setPriceIdLoading] = useState<string>();
  const textColor = useColorModeValue('#120F43', 'white');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [plan, setPlan] = useState({
    product: 'prod_PtTCPDFZbburMa',
    price: 'price_1P3gGXGx8VbJPRgzdEZODy8K',
  });
  const borderColor = 'secondaryGray.200';
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

  if (props.subscription) {
    // -------------- PRO User Card --------------
    return (
      <Flex
        align="center"
        position="relative"
        border="1px solid"
        borderColor={borderColor}
        borderRadius="16px"
        w="100%"
        py="16px"
        px="14px"
      >
        <Image
          alt=" "
          src={SidebarImage.src}
          maxW="27px"
          me="10px"
        />
        <Flex direction="column" justify="center" w="100%">
          <Text
            fontSize="sm"
            fontWeight={'700'}
            color="#120F43"
            mb="2x"
          >
            PRO Member
          </Text>
          <Text fontWeight={'500'} fontSize="sm" color="gray.500">
            Unlimited plan active
          </Text>
        </Flex>
      </Flex>
    );
  } else {
    // -------------- Free User Card --------------
    return (
      <Flex
        justify="center"
        direction="column"
        align="center"
        position="relative"
        border="1px solid"
        borderColor={borderColor}
        borderRadius="16px"
        w="100%"
        py="20px"
        px="18px"
      >
        <Image
          alt=" "
          src={SidebarImage.src}
          maxW="54px"
        />
        <Flex direction="column" mb="12px" w="100%" pt="16px">
          <Text
            fontSize="lg"
            fontWeight={'700'}
            color="#120F43"
            mb="10px"
            textAlign={'center'}
          >
            Upgrade to Unlimited
          </Text>
          <Text
            textAlign={'center'}
            fontWeight={'500'}
            fontSize="sm"
            color="gray.500"
            mb="14px"
          >
            Generate premium Essays by upgrading to an unlimited plan!
          </Text>
        </Flex>
        <Button
          onClick={() => {
            onOpen();
          }}
          py="20px"
          px="16px"
          fontSize="sm"
          variant="primary"
          borderRadius="45px"
          w={{ base: '100%' }}
          h="54px"
          mb="14px"
          _hover={{
            boxShadow: '0px 21px 27px -10px rgba(96, 60, 255, 0.48) !important',
            bg: 'linear-gradient(15.46deg, #4A25E1 26.3%, #7B5AFF 86.4%) !important',
            _disabled: {
              bg: 'linear-gradient(15.46deg, #4A25E1 26.3%, #7B5AFF 86.4%)',
            },
          }}
        >
          Go unlimited for just $9
        </Button>
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
        <Text
          textAlign={'center'}
          fontWeight={'500'}
          fontSize="xs"
          color="gray.500"
        >
          Join 80,000+ users now
        </Text>
      </Flex>
    );
  }
}
