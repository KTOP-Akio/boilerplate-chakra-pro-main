import { Flex } from '@chakra-ui/react';
import React from 'react';

export default function InnerContent(props) {
  const { children, ...rest } = props;
  return (
    <Flex
      direction={{ base: 'column' }}
      maxW={{ xl: '1170px' }}
      align="center"
      mx="auto"
      {...rest}
    >
      {children}
    </Flex>
  );
}
