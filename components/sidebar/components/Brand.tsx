'use client';

import logo from '/public/logo-horizon-boilerplate.png';
import { HSeparator } from '@/components/separator/Separator';
import { Flex, Image, Link, Text } from '@chakra-ui/react';

export function SidebarBrand() {
  return (
    <Flex alignItems="center" flexDirection="column" ps="24px">
      <Link
        display={'flex'}
        alignItems="center"
        justifyContent={'center'}
        href="/"
        mb="34px"
      >
        <Image
          alt=" "
          w="36px"
          src={logo.src}
        />
        <Text
          ms="8px"
          me="10px"
          fontWeight="800"
          fontSize={'17px'}
          letterSpacing="-0.2px"
          color="#120F43"
        >
          Horizon UI Boilerplate
        </Text>
      </Link>
      <HSeparator mb="20px" w="310px" />
    </Flex>
  );
}

export default SidebarBrand;
