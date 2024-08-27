/* eslint-disable */
'use client';

import logo from '/public/logo-horizon-boilerplate.png';
import {
  Image,
  Button,
  Flex,
  Icon,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { IoIosStar, IoMdTrophy } from 'react-icons/io';
import { IoMenuOutline } from 'react-icons/io5';
import { MdChevronRight, MdPrivacyTip } from 'react-icons/md';

export default function AdminNavbar(props) {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', changeNavbar);

    return () => {
      window.removeEventListener('scroll', changeNavbar);
    };
  });
  const { secondary, message, session } = props;

  // Here are all the props that may change depending on navbar's type or state.(secondary, variant, scrolled)
  let textColor = useColorModeValue('#120F43', 'white');
  let borderColor = useColorModeValue('gray.300', 'white');
  let navbarPosition = 'fixed';
  let navbarFilter = 'none';
  let navbarShadow = '45px 76px 113px 7px rgba(112, 144, 176, 0.08)';
  let navbarBorder = 'transparent';
  let paddingX = '15px';
  let gap = '0px';
  let navbarTop = '0px';
  let menuBg = useColorModeValue('white', 'navy.800');
  const changeNavbar = () => {
    if (window.scrollY > 1) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };
  return (
    <Flex
      position={navbarPosition}
      boxShadow={navbarShadow}
      bg="white"
      direction="column"
      borderColor={navbarBorder}
      filter={navbarFilter}
      backgroundPosition="center"
      backgroundSize="cover"
      zIndex="200"
      borderStyle="solid"
      alignItems={{ xl: 'center' }}
      display={secondary ? 'block' : 'flex'}
      justifyContent={{ xl: 'center' }}
      lineHeight="25.6px"
      mx="auto"
      left="50%"
      transform="translate(-50%,0px)"
      w="100%"
      top={navbarTop}
    >
      {/* Misc */}

      <Flex
        w="100%"
        display={{ base: 'none', lg: 'flex' }}
        bg="#F3F5FA"
        justifyContent="center"
      >
        <Flex
          w={{
            base: 'calc(100vw - 4%)',
            md: 'calc(100vw - 4%)',
            lg: '100vw',
            xl: 'calc(100vw - 250px)',
            '2xl': '1200px',
          }}
          px={{
            sm: paddingX,
            md: '10px',
            lg: '12px',
          }}
          py="4px"
          gap="40px"
          justifyContent="center"
        >
          <Flex direction="row" alignItems="center">
            <Icon
              me="6px"
              w="12px"
              h="12px"
              color="brand.500"
              as={MdPrivacyTip}
            />
            <Text fontSize="xs" fontWeight="500" h="100%" color="gray.500">
              Founded in EU. We respect your privacy.
            </Text>
          </Flex>
          <Flex direction="row" alignItems="center">
            <Icon me="1px" w="12px" h="12px" color="brand.500" as={IoIosStar} />
            <Icon me="1px" w="12px" h="12px" color="brand.500" as={IoIosStar} />
            <Icon me="1px" w="12px" h="12px" color="brand.500" as={IoIosStar} />
            <Icon me="1px" w="12px" h="12px" color="brand.500" as={IoIosStar} />
            <Icon me="6px" w="12px" h="12px" color="brand.500" as={IoIosStar} />
            <Text fontSize="xs" fontWeight="500" h="100%" color="gray.500">
              Loved by 80,000+ users worldwide
            </Text>
          </Flex>
          <Flex direction="row" alignItems="center">
            <Icon
              me="6px"
              w="12px"
              h="12px"
              color="brand.500"
              as={IoMdTrophy}
            />
            <Text fontSize="xs" fontWeight="500" h="100%" color="gray.500">
              #1 NextJS boilerplate & admin template


            </Text>
          </Flex>
        </Flex>
      </Flex>

      {/* Misc */}

      <Flex
        w={{
          base: 'calc(100vw - 4%)',
          md: 'calc(100vw - 4%)',
          lg: '100vw',
          xl: 'calc(100vw - 250px)',
          '2xl': '1200px',
        }}
        px={{
          sm: paddingX,
          md: '10px',
          lg: '12px',
        }}
        py="20px"
        ps={{
          xl: '12px',
        }}
        flexDirection={{
          sm: 'row',
          md: 'row',
        }}
        alignItems="center"
        justify="space-between"
        mb={gap}
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
        <Flex>
          <Link
            display={{ base: 'none', lg: 'block' }}
            href="/dashboard/signin"
            color="gray.600"
            fontSize="sm"
            fontWeight="500"
            letterSpacing="0px"
            me="30px"
            my="auto"
          >
            Generator
          </Link>
          <Link
            display={{ base: 'none', lg: 'block' }}
            href="/#features"
            color="gray.600"
            fontSize="sm"
            fontWeight="500"
            letterSpacing="0px"
            me="30px"
            my="auto"
          >
            Features
          </Link>
          <Link
            display={{ base: 'none', lg: 'block' }}
            href="/pricing"
            color="gray.600"
            fontSize="sm"
            fontWeight="500"
            letterSpacing="0px"
            me="30px"
            my="auto"
          >
            Pricing
          </Link>
          <Link
            display={{ base: 'none', lg: 'block' }}
            href="#faqs"
            color="gray.600"
            fontSize="sm"
            fontWeight="500"
            letterSpacing="0px"
            me="30px"
            my="auto"
          >
            FAQs
          </Link>
          <Menu>
            <MenuButton
              display={{ base: 'block', xl: 'none' }}
              p="0px !important"
              maxH="20px"
              maxW="20px"
              alignContent="end"
            >
              <Icon
                display={{ base: 'block', lg: 'none' }}
                as={IoMenuOutline}
                color={textColor}
                w="20px"
                h="20px"
                _hover={{ cursor: 'pointer' }}
              />
            </MenuButton>
            <MenuList
              p="0px"
              mt="10px"
              borderRadius="10px"
              border="1px solid"
              borderColor="#CBD5E0"
              bg={menuBg}
            >
              <Flex flexDirection="column" p="10px">
                <MenuItem
                  _hover={{ bg: 'none' }}
                  _focus={{ bg: 'none' }}
                  borderRadius="8px"
                  px="14px"
                >
                  <Link
                    href="/dashboard/signin"
                    color="gray.600"
                    fontSize="md"
                    fontWeight="500"
                    me="30px"
                    my="auto"
                  >
                    Generator
                  </Link>
                </MenuItem>
                <MenuItem
                  _hover={{ bg: 'none' }}
                  _focus={{ bg: 'none' }}
                  borderRadius="8px"
                  px="14px"
                >
                  <Link
                    href="/#features"
                    color="gray.600"
                    fontSize="md"
                    fontWeight="500"
                    me="30px"
                    my="auto"
                  >
                    Features
                  </Link>
                </MenuItem>
                <MenuItem
                  _hover={{ bg: 'none' }}
                  _focus={{ bg: 'none' }}
                  color="red.400"
                  borderRadius="8px"
                >
                  <Link
                    href="/pricing"
                    color="gray.600"
                    fontSize="md"
                    fontWeight="500"
                    me="30px"
                    my="auto"
                  >
                    Pricing
                  </Link>
                </MenuItem>
                <MenuItem
                  _hover={{ bg: 'none' }}
                  _focus={{ bg: 'none' }}
                  color="red.400"
                  borderRadius="8px"
                >
                  <Link
                    href="#faqs"
                    color="gray.600"
                    fontSize="md"
                    fontWeight="500"
                    me="30px"
                    my="auto"
                  >
                    FAQs
                  </Link>
                </MenuItem>
                <MenuItem
                  _hover={{ bg: 'none' }}
                  _focus={{ bg: 'none' }}
                  color="red.400"
                  borderRadius="8px"
                >
                  <Link
                    href="/dashboard/signin"
                    color={textColor}
                    fontSize="md"
                    fontWeight="600"
                    me="18px"
                    my="auto"
                    letterSpacing="0px"
                  >
                    Login
                  </Link>
                </MenuItem>
                <Button
                  variant="transparent"
                  border="1px solid"
                  borderColor={borderColor}
                  color={textColor}
                  fontSize="md"
                  borderRadius="45px"
                  bg="transparent"
                  my="auto"
                >
                  <Link href="/dashboard/signin">
                    Get started for Free
                    <Icon
                      as={MdChevronRight}
                      mt="3px"
                      ms="5px"
                      h="16px"
                      w="16px"
                    />
                  </Link>
                </Button>
              </Flex>
            </MenuList>
          </Menu>
        </Flex>
        <Flex display={{ base: 'none', lg: 'flex' }}>
          <Link
            href="/dashboard/signin"
            color={textColor}
            fontSize="sm"
            fontWeight="600"
            me="18px"
            letterSpacing="0px"
            my="auto"
          >
            Login
          </Link>

          <Link href="/dashboard/signin">
            <Button
              variant="transparent"
              border="1px solid"
              borderColor={borderColor}
              color={textColor}
              fontSize="sm"
              borderRadius="45px"
              px="18px"
              py="12px"
              bg="transparent"
              my="auto"
            >
              {' '}
              Get started for Free
              <Icon as={MdChevronRight} mt="3px" h="16px" w="16px" />
            </Button>
          </Link>
        </Flex>
      </Flex>
      {secondary ? <Text color="white">{message}</Text> : null}
    </Flex>
  );
}
