'use client';

/* eslint-disable */
import NavLink from '@/components/link/NavLink';
import modalImage from '@/public/Modal.png';
import { IRoute } from '@/types/types';
import { Database } from '@/types_db';
import { postData } from '@/utils/helpers';
import { getStripe } from '@/utils/stripe-client';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Badge,
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  Image,
  List,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { usePathname, useRouter } from 'next/navigation';
import { PropsWithChildren, useCallback, useState } from 'react';
import { FaCircle } from 'react-icons/fa';
import { IoIosStar, IoMdAdd } from 'react-icons/io';
import { MdCheckCircle, MdChevronRight } from 'react-icons/md';

interface SidebarLinksProps extends PropsWithChildren {
  routes: IRoute[];
  [x: string]: any;
}
type Price = Database['public']['Tables']['prices']['Row'];

export function SidebarLinks(props: SidebarLinksProps) {
  const pathname = usePathname();
  const textColor = useColorModeValue('#120F43', 'white');
  let activeColor = useColorModeValue('#120F43', 'white');
  let inactiveColor = useColorModeValue('gray.500', 'gray.500');
  let borderColor = useColorModeValue('gray.200', 'whiteAlpha.300');
  let activeIcon = useColorModeValue('brand.500', 'white');
  let iconColor = useColorModeValue('#120F43', 'white');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [plan, setPlan] = useState({
    product: 'prod_PtTCPDFZbburMa',
    price: 'price_1P3gGXGx8VbJPRgzdEZODy8K',
  });
  const [priceIdLoading, setPriceIdLoading] = useState<string>();

  const { routes } = props;

  // verifies if routeName is the one active (in browser input)
  const activeRoute = useCallback(
    (route: string | { [x: string]: any }) => {
      let foundActive = 0;
      if (typeof route === 'string') {
        return pathname?.includes(route);
      } else if (route?.items) { 
        route.items.map((item: { [x: string]: any }) => {
          if (pathname?.includes(item.path)) foundActive = foundActive + 1;
        });
      }
      if (foundActive > 0) return true;
      else return false;
    },
    [pathname],
  );
  // this function creates the links and collapses that appear in the sidebar (left menu)
  const createLinks = (routes: IRoute[]) => {
    const router = useRouter();
    const handleCheckout = async (price: Price) => {
      setPriceIdLoading(price.id);
      if (!props.user) {
        return router.push('/dashboard/signin');
      }
      if (props.subscription) {
        return router.push('/dashboard/settings');
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
    return routes.map((route, key) => {
      if (route.collapse && !route.invisible) {
        return (
          <Accordion allowToggle
            defaultIndex={activeRoute(route) ? 0 : 1} key={key}>
            <AccordionItem border="none" mb="14px" key={key}>
              <AccordionButton
                display="flex"
                alignItems="center"
                mb="4px"
                justifyContent="center"
                _hover={{
                  bg: 'unset',
                }}
                _focus={{
                  boxShadow: 'none',
                }}
                borderRadius="8px"
                w="100%"
                py="0px"
                ms={0}
              >
                {route.icon ? (
                  <Flex align="center" justifyContent="space-between" w="100%">
                    <HStack
                      spacing={
                        activeRoute(route) ? '22px' : '26px'
                      }
                    >
                      <Flex
                        w="100%"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Box
                          color={
                            activeRoute(route)
                              ? activeIcon
                              : inactiveColor
                          }
                          me="12px"
                          mt="6px"
                        >
                          {route.icon}
                        </Box>
                        <Text
                          me="auto"
                          color={
                            activeRoute(route)
                              ? activeColor
                              : 'gray.500'
                          }
                          fontWeight="500"
                          letterSpacing="0px"
                          fontSize="sm"
                        >
                          {route.name}
                        </Text>
                      </Flex>
                    </HStack>
                    <AccordionIcon ms="auto" color={'gray.500'} />
                  </Flex>
                ) : (
                  <Flex pt="0px" pb="10px" alignItems="center" w="100%">
                    <HStack
                      spacing={
                        activeRoute(route.path.toLowerCase()) ? '22px' : '26px'
                      }
                      ps="32px"
                    >
                      <Text
                        me="auto"
                        color={
                          activeRoute(route.path.toLowerCase())
                            ? activeColor
                            : inactiveColor
                        }
                        fontWeight="500"
                        letterSpacing="0px"
                        fontSize="sm"
                      >
                        {route.name}
                      </Text>
                    </HStack>
                    <AccordionIcon ms="auto" color={'gray.500'} />
                  </Flex>
                )}
              </AccordionButton>
              <AccordionPanel py="0px" ps={'8px'}>
                <List>
                  {
                    route.icon && route.items
                      ? createLinks(route.items) // for bullet accordion links
                      : route.items
                      ? createAccordionLinks(route.items)
                      : '' // for non-bullet accordion links
                  }
                </List>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        );
      } else if (!route.invisible) {
        return (
          <Box key={key}>
            {route.icon ? (
              <Flex
                align="center"
                justifyContent="space-between"
                w="100%"
                maxW="100%"
                ps="17px"
                mb="0px"
              >
                <HStack
                  w="100%"
                  mb="14px"
                  spacing={
                    activeRoute(route.path.toLowerCase()) ? '22px' : '26px'
                  }
                >
                  {route.path.includes('premium') && !props.subscription ? (
                    <Flex w="100%">
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
                                  Get access to all features and generate
                                  premium and exclusive essays with our
                                  unlimited plan!
                                </Text>
                                {/* Features */}
                                <Flex
                                  w={{ base: '100%', xl: '80%' }}
                                  direction="column"
                                >
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
                                <Flex
                                  direction="row"
                                  alignItems="center"
                                  mx="auto"
                                >
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
                      <Flex
                        w="100%"
                        cursor={'pointer'}
                        onClick={() => onOpen()}
                      >
                        <Flex
                          w="100%"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <Box
                            color={
                              activeRoute(route.path.toLowerCase())
                                ? activeIcon
                                : inactiveColor
                            }
                            me="12px"
                            mt="6px"
                          >
                            {route.icon}
                          </Box>
                          <Text
                            me="auto"
                            color={
                              activeRoute(route.path.toLowerCase())
                                ? activeColor
                                : 'gray.500'
                            }
                            fontWeight={
                              activeRoute(route.path.toLowerCase())
                                ? '700'
                                : '500'
                            }
                            letterSpacing="0px"
                            fontSize="sm"
                          >
                            {route.name}
                          </Text>
                          {route.rightElement ? (
                            <Flex
                              border="1px solid"
                              borderColor={borderColor}
                              borderRadius="full"
                              w="34px"
                              h="34px"
                              justify={'center'}
                              align="center"
                              color={iconColor}
                              ms="auto"
                              me="10px"
                            >
                              <Icon
                                as={IoMdAdd}
                                width="20px"
                                height="20px"
                                color="inherit"
                              />
                            </Flex>
                          ) : null}
                          <Badge
                            display={{ base: 'flex', lg: 'none', xl: 'flex' }}
                            colorScheme="brand"
                            borderRadius="25px"
                            color="brand.500"
                            textTransform={'none'}
                            letterSpacing="0px"
                            px="8px"
                          >
                            PRO
                          </Badge>
                        </Flex>
                      </Flex>
                    </Flex>
                  ) : (
                    <NavLink
                      href={
                        route.layout ? route.layout + route.path : route.path
                      }
                      key={key}
                      styles={{ width: '100%' }}
                    >
                      <Flex
                        w="100%"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Box
                          color={
                            activeRoute(route.path.toLowerCase())
                              ? activeIcon
                              : inactiveColor
                          }
                          me="12px"
                          mt="6px"
                        >
                          {route.icon}
                        </Box>
                        <Text
                          me="auto"
                          color={
                            activeRoute(route.path.toLowerCase())
                              ? activeColor
                              : 'gray.500'
                          }
                          fontWeight={
                            activeRoute(route.path.toLowerCase())
                              ? '700'
                              : '500'
                          }
                          letterSpacing="0px"
                          fontSize="sm"
                        >
                          {route.name}
                        </Text>
                        {route.rightElement ? (
                          <Flex
                            border="1px solid"
                            borderColor={borderColor}
                            borderRadius="full"
                            w="34px"
                            h="34px"
                            justify={'center'}
                            align="center"
                            color={iconColor}
                            ms="auto"
                            me="10px"
                          >
                            <Icon
                              as={IoMdAdd}
                              width="20px"
                              height="20px"
                              color="inherit"
                            />
                          </Flex>
                        ) : null}
                      </Flex>
                    </NavLink>
                  )}
                </HStack>
              </Flex>
            ) : (
              <ListItem ms={0}>
                <Flex ps="32px" alignItems="center" mb="8px">
                  <NavLink
                    href={route.layout ? route.layout + route.path : route.path}
                    key={key}
                  >
                    <Text
                      color={
                        activeRoute(route.path.toLowerCase())
                          ? activeColor
                          : inactiveColor
                      }
                      fontWeight="500"
                      fontSize="xs"
                    >
                      {route.name}
                    </Text>
                  </NavLink>
                </Flex>
              </ListItem>
            )}
          </Box>
        );
      }
    });
  };
  // this function creates the links from the secondary accordions (for example auth -> sign-in -> default)
  const createAccordionLinks = (routes: IRoute[]) => {
    return routes.map((route: IRoute, key: number) => {
      return (
        <ListItem
          ms="28px"
          display="flex"
          alignItems="center"
          mb="10px"
          key={key}
        >
          <NavLink href={route.layout + route.path} key={key}>
            <Icon w="6px" h="6px" me="8px" as={FaCircle} color={activeIcon} />
            <Text
              color={
                activeRoute(route.path.toLowerCase())
                  ? activeColor
                  : inactiveColor
              }
              fontWeight={
                activeRoute(route.path.toLowerCase()) ? 'bold' : 'normal'
              }
              fontSize="sm"
            >
              {route.name}
            </Text>
          </NavLink>
        </ListItem>
      );
    });
  };
  //  BRAND
  return <>{createLinks(routes)}</>;
}

export default SidebarLinks;
