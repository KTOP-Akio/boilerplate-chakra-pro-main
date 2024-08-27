'use client';

/* eslint-disable */
import AdminNavbarLinks from './NavbarLinksAdmin';
import { isWindowAvailable } from '@/utils/navigation';
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Link,
  useColorModeValue,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';

export default function AdminNavbar(props: {
  logoText: string;
  brandText: string;

  userDetails: { [x: string]: any } | null;
  onOpen: (...args: any[]) => any;
  [x: string]: any;
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    isWindowAvailable() && window.addEventListener('scroll', changeNavbar);

    return () => {
      isWindowAvailable() && window.removeEventListener('scroll', changeNavbar);
    };
  });

  const { brandText, userDetails } = props;

  // Here are all the props that may change depending on navbar's type or state.(secondary, variant, scrolled)
  let mainText = useColorModeValue('#120F43', 'white');
  let secondaryText = useColorModeValue('gray.700', 'white');
  let navbarPosition = 'fixed' as const;
  let navbarFilter = 'none';
  let navbarBackdrop = 'blur(20px)';
  let navbarShadow = 'none';
  let navbarBg = useColorModeValue(
    'rgba(244, 247, 254, 0.2)',
    'rgba(11,20,55,0.5)',
  );
  let navbarBorder = 'transparent';
  let secondaryMargin = '0px';
  let gap = '0px';
  const changeNavbar = () => {
    if (isWindowAvailable() && window.scrollY > 1) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  return (
    <Box
      zIndex="100"
      position={navbarPosition}
      boxShadow={navbarShadow}
      bg={navbarBg}
      borderColor={navbarBorder}
      filter={navbarFilter}
      backdropFilter={navbarBackdrop}
      backgroundPosition="center"
      backgroundSize="cover"
      borderRadius="16px"
      borderWidth="1.5px"
      borderStyle="solid"
      transitionDelay="0s, 0s, 0s, 0s"
      transitionDuration=" 0.25s, 0.25s, 0.25s, 0s"
      transition-property="box-shadow, background-color, filter, border"
      transitionTimingFunction="linear, linear, linear, linear"
      alignItems={{ xl: 'center' }}
      display={'flex'}
      minH="75px"
      justifyContent={{ xl: 'center' }}
      lineHeight="25.6px"
      mx="auto"
      mt={secondaryMargin}
      pb="8px"
      right={{ base: '12px', md: '30px', lg: '30px', xl: '30px' }}
      ps={{
        base: '8px',
        md: '12px',
      }}
      pt="8px"
      top={{ base: '12px', md: '16px', xl: '18px' }}
      w={{
        base: 'calc(100vw - 8%)',
        md: 'calc(100vw - 8%)',
        lg: 'calc(100vw - 6%)',
        xl: 'calc(100vw - 350px)',
        '2xl': 'calc(100vw - 365px)',
      }}
    >
      <Flex
        w="100%"
        flexDirection={{
          base: 'row',
          md: 'row',
        }}
        alignItems={{ xl: 'center' }}
        mb={gap}
      >
        <Box>
          <Breadcrumb>
            <BreadcrumbItem
              color={secondaryText}
              fontSize={{ base: 'xs', md: 'sm' }}
              mb={{ base: '0px', md: '5px' }}
            >
              <BreadcrumbLink href="#" color={secondaryText}>
                Pages
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem
              color={secondaryText}
              fontSize={{ base: 'xs', md: 'sm' }}
            >
              <BreadcrumbLink href="#" color={secondaryText}>
                {brandText}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          {/* Here we create navbar brand, based on route name */}
          <Link
            color={mainText}
            href="#"
            bg="inherit"
            borderRadius="inherit"
            fontWeight="bold"
            fontSize={{ base: 'lg', md: '34px' }}
            p="0px"
            _hover={{ color: { mainText } }}
            _active={{
              bg: 'inherit',
              transform: 'none',
              borderColor: 'transparent',
            }}
            _focus={{
              boxShadow: 'none',
            }}
          >
            {brandText}
          </Link>
        </Box>
        <Box ms="auto" w={{ sm: '154px', md: 'unset' }}>
          <AdminNavbarLinks
            userDetails={userDetails}
            session={props.session}
            user={props.session?.user}
            products={props.products}
            subscription={props.subscription}
          />
        </Box>
      </Flex>
    </Box>
  );
}
