'use client';

import {
  renderThumb,
  renderTrack,
  renderView,
} from '@/components/scrollbar/Scrollbar';
import Content from '@/components/sidebar/components/Content';
import { IRoute } from '@/types/types';
import { isWindowAvailable } from '@/utils/navigation';
import {
  Box,
  Flex,
  Drawer,
  DrawerBody,
  Icon,
  useColorModeValue,
  DrawerOverlay,
  useDisclosure,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react';
import React, { PropsWithChildren } from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { IoMenuOutline } from 'react-icons/io5';

export interface SidebarProps extends PropsWithChildren {
  routes: IRoute[];
  [x: string]: any;
}

function Sidebar(props: SidebarProps) {
  const { routes, setApiKey } = props;
  let variantChange = '0.2s linear';
  let shadow = useColorModeValue(
    '14px 17px 40px 4px rgba(112, 144, 176, 0.08)',
    'unset',
  );
  let sidebarBg = useColorModeValue('white', 'navy.800');
  let sidebarRadius = '14px';
  let sidebarMargins = '0px';
  return (
    <Box display={{ base: 'none', xl: 'block' }} position="fixed" minH="100%">
      <Box
        bg={sidebarBg}
        transition={variantChange}
        w="285px"
        ms={{
          sm: '16px',
        }}
        my={{
          sm: '16px',
        }}
        h="calc(100vh - 32px)"
        m={sidebarMargins}
        borderRadius={sidebarRadius}
        minH="100%"
        
        overflowX="hidden"
        boxShadow={shadow}
      >
        <Scrollbars
          autoHide
          renderTrackVertical={renderTrack}
          renderThumbVertical={renderThumb}
          renderView={renderView}
        >
          <Content
            setApiKey={setApiKey}
            routes={routes}
            session={props.session}
            userDetails={props.userDetails}
            user={props.session?.user}
            products={props.products}
            subscription={props.subscription}
          />
        </Scrollbars>
      </Box>
    </Box>
  );
}

// -------------- Sidebar Function for Navbar burger --------------
export function SidebarResponsive(props: SidebarProps) {
  let sidebarBackgroundColor = useColorModeValue('white', 'navy.800');
  let menuColor = useColorModeValue('gray.400', 'white');
  //  SIDEBAR
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { routes } = props;
  return (
    <Flex display={{ sm: 'flex', xl: 'none' }} alignItems="center">
      <Flex w="max-content" h="max-content" onClick={onOpen}>
        <Icon
          as={IoMenuOutline}
          color={menuColor}
          my="auto"
          w="20px"
          h="20px"
          me="10px"
          _hover={{ cursor: 'pointer' }}
        />
      </Flex>
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        placement={
          isWindowAvailable() && document.documentElement.dir === 'rtl'
            ? 'right'
            : 'left'
        }
      >
        <DrawerOverlay />
        <DrawerContent
          w="285px"
          maxW="285px"
          ms={{
            sm: '16px',
          }}
          my={{
            sm: '16px',
          }}
          borderRadius="16px"
          bg={sidebarBackgroundColor}
        >
          <DrawerCloseButton
            zIndex="3"
            onClick={onClose}
            _focus={{ boxShadow: 'none' }}
            _hover={{ boxShadow: 'none' }}
          />
          <DrawerBody maxW="285px" px="0rem" pb="0">
            <Scrollbars
              autoHide
              renderTrackVertical={renderTrack}
              renderThumbVertical={renderThumb}
              renderView={renderView}
            >
              <Content
                routes={routes}
                session={props.session}
                userDetails={props.userDetails}
                user={props.session?.user}
                products={props.products}
                subscription={props.subscription}
              />
            </Scrollbars>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
}

export default Sidebar;
