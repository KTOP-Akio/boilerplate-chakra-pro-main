'use client';

import { useSupabase } from '@/app/supabase-provider';
import { routes } from '@/components/routes';
import { SidebarResponsive } from '@/components/sidebar/Sidebar';
import {
  Avatar,
  Box,
  Button,
  Flex,
  Icon,
  Link,
  Menu,
  MenuButton,
  MenuList,
  useColorModeValue,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { MdOutlineLogout, MdHelpOutline } from 'react-icons/md';

export default function HeaderLinks(props: {
  userDetails: { [x: string]: any } | null;
  [x: string]: any;
}) {
  const { supabase } = useSupabase();
  const router = useRouter();
  // Chakra Color Mode
  const navbarIcon = useColorModeValue('gray.500', 'white');
  let menuBg = useColorModeValue('white', 'navy.800');
  const textColor = useColorModeValue('#120F43', 'white');
  const shadow = useColorModeValue(
    '14px 17px 40px 4px rgba(112, 144, 176, 0.18)',
    '0px 41px 75px #081132',
  );
  const buttonBg = useColorModeValue('transparent', 'navy.800');
  const hoverButton = useColorModeValue(
    { bg: 'gray.100' },
    { bg: 'whiteAlpha.100' },
  );
  const activeButton = useColorModeValue(
    { bg: 'gray.200' },
    { bg: 'whiteAlpha.200' },
  );
  return (
    <Flex
      zIndex="100"
      w={{ sm: '100%', md: 'auto' }}
      alignItems="center"
      flexDirection="row"
      bg={menuBg}
      flexWrap={'unset'}
      p="10px"
      pl="16px"
      borderRadius="30px"
      boxShadow={shadow}
    >
      <SidebarResponsive
        routes={routes}
        session={props.session}
        userDetails={props.userDetails}
        user={props.session?.user}
        products={props.products}
        subscription={props.subscription}
      />

      <Menu>
        <MenuButton p="0px" me="10px">
          <Icon
            mt="-5px"
            as={MdHelpOutline}
            color={navbarIcon}
            w="18px"
            h="18px"
          />
        </MenuButton>
        <MenuList
          boxShadow={shadow}
          p="20px"
          borderRadius="20px"
          bg={menuBg}
          border="none"
          mt="22px"
          minW={{ base: 'unset' }}
          maxW={{ base: '360px', md: 'unset' }}
        >
          {/* <Flex bgImage={navImage} borderRadius="16px" mb="28px" alt="" /> */}
          <Flex flexDirection="column" rowGap="10px">
            <Link w="100%" href="/pricing">
              <Button
                bg={buttonBg}
                border="1px solid"
                color={textColor}
                borderColor={useColorModeValue('gray.200', 'whiteAlpha.100')}
                fontSize="sm"
                borderRadius="45px"
                w="100%"
                minW="44px"
                h="44px"
                _placeholder={{ color: 'gray.500' }}
                _hover={hoverButton}
                _active={activeButton}
                _focus={activeButton}
              >
                Pricing Plans
              </Button>
            </Link>
            <Link w="100%" href="mailto:hello@horizon-ui.com">
              <Button
                bg={buttonBg}
                border="1px solid"
                color={textColor}
                borderColor={useColorModeValue('gray.200', 'whiteAlpha.100')}
                fontSize="sm"
                borderRadius="45px"
                w="100%"
                minW="44px"
                h="44px"
                _placeholder={{ color: 'gray.500' }}
                _hover={hoverButton}
                _active={activeButton}
                _focus={activeButton}
              >
                Help & Support
              </Button>
            </Link>
            <Link w="100%" href="/#faqs">
              <Button
                bg={buttonBg}
                border="1px solid"
                color={textColor}
                borderColor={useColorModeValue('gray.200', 'whiteAlpha.100')}
                fontSize="sm"
                borderRadius="45px"
                w="100%"
                minW="44px"
                h="44px"
                _placeholder={{ color: 'gray.500' }}
                _hover={hoverButton}
                _active={activeButton}
                _focus={activeButton}
              >
                FAQs & More
              </Button>
            </Link>
          </Flex>
        </MenuList>
      </Menu>

      <Box
        cursor="pointer"
        _hover={{ bg: 'none' }}
        _focus={{ bg: 'none' }}
        color="red.400"
        borderRadius="8px"
        me="10px"
        onClick={(e) => {
          e.preventDefault();
          supabase.auth.signOut();
          router.push('/');
        }}
      >
        {/* <Text> {`${props.userDetails?.avatar_url}`}</Text> */}
        <Icon
          mt="-5px"
          as={MdOutlineLogout}
          color={navbarIcon}
          w="20px"
          h="20px"
        />
      </Box>
      <Link w="100%" href="/dashboard/settings">
        <Avatar h="40px" w="40px" src={props.userDetails?.avatar_url} />
      </Link>
    </Flex>
  );
}
