'use client';

/*eslint-disable*/
import {
  Flex,
  Link,
  List,
  ListItem,
  useColorModeValue,
} from '@chakra-ui/react';

export default function Footer() {
  let textColor = useColorModeValue('gray.500', 'white');
  return (
    <Flex
      zIndex="3"
      flexDirection={{
        base: 'column',
        lg: 'row',
      }}
      alignItems="center"
      justifyContent="space-between"
      px={{ base: '30px', md: '0px' }}
      pb="30px"
    >
      <List
        display="flex"
        flexDirection={{
          base: 'row',
          md: 'row',
        }}
      >
        <ListItem
          me={{
            base: '16px',
            md: '44px',
          }}
        >
          <Link
            fontWeight="500"
            fontSize={{ base: '10px', md: 'sm' }}
            color={textColor}
            isExternal
            href="https://horizon-ui.notion.site/Terms-Conditions-6e79229d25ed48f48a481962bc6de3ee"
          >
            Terms & Conditions
          </Link>
        </ListItem>
        <ListItem
          me={{
            base: '16px',
            md: '44px',
          }}
        >
          <Link
            fontWeight="500"
            fontSize={{ base: '10px', md: 'sm' }}
            color={textColor}
            isExternal
            href="https://horizon-ui.notion.site/Privacy-Policy-8addde50aa8e408ca5c5f5811c38f971"
          >
            Privacy Policy
          </Link>
        </ListItem>
        <ListItem>
          <Link
            fontWeight="500"
            fontSize={{ base: '10px', md: 'sm' }}
            color={textColor}
            isExternal
            href="https://horizon-ui.notion.site/Refund-Policy-5d5fa25f7fac4978a0be6fcf3036c6ee"
          >
            Refund Policy
          </Link>
        </ListItem>
      </List>
    </Flex>
  );
}
