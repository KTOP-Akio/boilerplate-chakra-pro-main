'use client';

import { useSupabase } from '@/app/supabase-provider';
import { getURL } from '@/utils/helpers';
import { Flex, Text, Link } from '@chakra-ui/react';
import { Auth } from '@supabase/auth-ui-react';

export default function AuthUI() {
  const { supabase } = useSupabase();
  const customTheme = {
    default: {
      colors: {
        brand: '#4A25E1',
        brandAccent: '#7B5AFF',
        brandButtonText: 'white',
        defaultButtonBackground: 'white',
        defaultButtonBackgroundHover: '#F7FAFC',
        defaultButtonBorder: '#E2E8F0',
        defaultButtonText: '#1B2559',
        dividerBackground: '#eaeaea',
        inputBackground: 'transparent',
        inputBorder: '#E2E8F0',
        inputBorderHover: '#CBD5E0',
        inputBorderFocus: '#CBD5E0',
        inputText: '#1B2559',
        inputLabelText: '#1B2559',
        inputPlaceholder: '#718096',
        messageText: '#1B2559',
        messageTextDanger: 'red',
        anchorTextColor: '#1B2559',
        anchorTextHoverColor: '#1B2559',
      },
      space: {
        spaceSmall: '4px',
        spaceMedium: '8px',
        spaceLarge: '16px',
        labelBottomMargin: '8px',
        anchorBottomMargin: '4px',
        emailInputSpacing: '4px',
        socialAuthSpacing: '4px',
        buttonPadding: '14px 14px',
        inputPadding: '14px 14px',
      },
      fontSizes: {
        baseBodySize: '13px',
        baseInputSize: '14px',
        baseLabelSize: '14px',
        baseButtonSize: '14px',
      },
      fonts: {
        bodyFontFamily: `Plus Jakarta Sans, sans-serif`,
        buttonFontFamily: `Plus Jakarta Sans, sans-serif`,
        inputFontFamily: `Plus Jakarta Sans, sans-serif`,
        labelFontFamily: `Plus Jakarta Sans, sans-serif`,
      },
      borderWidths: {
        buttonBorderWidth: '1px',
        inputBorderWidth: '1px',
      },
      radii: {
        borderRadiusButton: '14px',
        buttonBorderRadius: '45px',
        inputBorderRadius: '14px',
      },
    },
    dark: {
      colors: {
        brand: '#4A25E1',
        brandAccent: '#7B5AFF',
        brandButtonText: 'white',
        defaultButtonBackground: 'white',
        defaultButtonBackgroundHover: '#F7FAFC',
        defaultButtonBorder: '#E2E8F0',
        defaultButtonText: '#1B2559',
        dividerBackground: '#eaeaea',
        inputBackground: 'transparent',
        inputBorder: '#E2E8F0',
        inputBorderHover: '#CBD5E0',
        inputBorderFocus: '#CBD5E0',
        inputText: '#1B2559',
        inputLabelText: '#1B2559',
        inputPlaceholder: '#718096',
        messageText: '#1B2559',
        messageTextDanger: 'red',
        anchorTextColor: '#1B2559',
        anchorTextHoverColor: '#1B2559',
      },
      space: {
        spaceSmall: '4px',
        spaceMedium: '8px',
        spaceLarge: '16px',
        labelBottomMargin: '8px',
        anchorBottomMargin: '4px',
        emailInputSpacing: '4px',
        socialAuthSpacing: '4px',
        buttonPadding: '14px 14px',
        inputPadding: '14px 14px',
      },
      fontSizes: {
        baseBodySize: '13px',
        baseInputSize: '14px',
        baseLabelSize: '14px',
        baseButtonSize: '14px',
      },
      fonts: {
        bodyFontFamily: `Plus Jakarta Sans, sans-serif`,
        buttonFontFamily: `Plus Jakarta Sans, sans-serif`,
        inputFontFamily: `Plus Jakarta Sans, sans-serif`,
        labelFontFamily: `Plus Jakarta Sans, sans-serif`,
      },
      borderWidths: {
        buttonBorderWidth: '1px',
        inputBorderWidth: '1px',
      },
      radii: {
        borderRadiusButton: '14px',
        buttonBorderRadius: '45px',
        inputBorderRadius: '14px',
      },
    },
  };
  return (
    <Flex
      direction="column"
      mb="auto"
      my="auto"
      maxW={{ md: '100%', lg: '420px' }}
      mt={{ base: '30px', md: '70px', lg: 'auto' }}
      px={{ base: '20px', md: '0px' }}
    >
      <Text fontSize="32px" fontWeight="700" color="navy.700">
        Sign In
      </Text>
      <Text mt="10px" color="gray.500" fontWeight="400" fontSize="md" mb="10px">
        Enter your email and password to sign in!
      </Text>
      <Auth
        supabaseClient={supabase}
        providers={['google']}
        redirectTo={`${getURL()}/auth/callback`}
        appearance={{ theme: customTheme }}
      />
      <Flex justifyContent="center">
        <Text
          color="gray.400"
          textAlign="center"
          fontWeight="400"
          fontSize="xs"
          w="80%"
        >
          By creating an account or continuing by logging in, you agree to our
          <Link
            isExternal
            href="https://horizon-ui.notion.site/Terms-Conditions-6e79229d25ed48f48a481962bc6de3ee"
            ms="2px"
            color="gray.500"
            fontWeight="500"
          >
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link
            isExternal
            href="https://horizon-ui.notion.site/Privacy-Policy-8addde50aa8e408ca5c5f5811c38f971"
            ms="1px"
            color="gray.500"
            fontWeight="500"
          >
            Privacy Policy.
          </Link>{' '}
        </Text>
      </Flex>
    </Flex>
  );
}
