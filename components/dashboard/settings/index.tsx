/*eslint-disable*/
'use client';

// import ManageSubscriptionButton from './ManageSubscriptionButton';
import Card from '@/components/card/Card';
import DashboardLayout from '@/components/layout';
import { HSeparator } from '@/components/separator/Separator';
import { Database } from '@/types_db';
import {
  Button,
  Flex,
  FormLabel,
  Input,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { Session, User } from '@supabase/supabase-js';
import { redirect } from 'next/navigation';
import { useState } from 'react';

type Subscription = Database['public']['Tables']['subscriptions']['Row'];
type Product = Database['public']['Tables']['products']['Row'];
type Price = Database['public']['Tables']['prices']['Row'];
interface ProductWithPrices extends Product {
  prices: Price[];
}
interface PriceWithProduct extends Price {
  products: Product | null;
}
interface SubscriptionWithProduct extends Subscription {
  prices: PriceWithProduct | null;
}

interface Props {
  session: Session | null;
  user: User | null | undefined;
  products: ProductWithPrices[];
  subscription: SubscriptionWithProduct | null;
  userDetails: { [x: string]: any } | null;
  updateName: any;
  updateEmail: any;
  updatePassword: any; 
}

export default function Settings(props: Props) {
  const toast = useToast();
  // Input States
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [nameError, setNameError] = useState<{
    status: boolean;
    message: string;
  }>();
  const textColor = useColorModeValue('#120F43', 'white');
  const placeholderColor = useColorModeValue(
    { color: 'gray.500' },
    { color: 'whiteAlpha.600' },
  );
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.200');

  // -------------- Input Value Handler --------------

  const handleName = (Event: any) => {
    setName(Event.target.value);
  };
  const handleEmail = (Event: any) => {
    setEmail(Event.target.value);
  };
  const handleNameError = (error: { status: boolean; message: string }) => {
    setNameError(error);
  };

  const user = props.session?.user;

  if (!props.session) {
    return redirect('/dashboard/signin');
  }

  return (
    <>
      <DashboardLayout
        session={props.session}
        userDetails={props.userDetails}
        user={props.session?.user}
        products={props.products}
        subscription={props.subscription}
        title="Account Settings"
        description="Profile settings."
      >
        <Flex
          w="100%"
          direction="column"
          position="relative"
          mt={{ base: '70px', md: '0px', xl: '0px' }}
        >
          <Flex
            mx="auto"
            w={{ base: '100%', md: '100%', xl: '100%' }}
            maxW="100%"
            justify="center"
            direction={{ base: 'column', md: 'row' }}
          >
            <Card
              // minW={{ base: '100%' }}
              maxW={{ base: '100%' }}
              px={{ base: '10px', md: '20px', lg: '20px' }}
              py={{ base: '28px', md: '20px', lg: '30px' }}
              w="820px"
              h="min-content"
              me={{ base: '0px', md: '20px' }}
              mb={{ base: '20px', md: '0px' }}
            >
              <Text
                ps={{ base: '10px', md: '32px' }}
                fontSize={{ base: 'lg', md: '30px' }}
                color={textColor}
                fontWeight="800"
              >
                Account Settings
              </Text>
              <Text
                ps={{ base: '10px', md: '32px' }}
                fontSize={{ base: 'sm', md: 'md' }}
                color="gray.500"
                fontWeight="500"
                mb="30px"
              >
                Here you can change your account information
              </Text>
              <FormLabel
                px={{ base: '10px', md: '32px' }}
                display="flex"
                ms="10px"
                htmlFor={'name'}
                fontSize="md"
                color={textColor}
                letterSpacing="0px"
                fontWeight="bold"
                _hover={{ cursor: 'pointer' }}
                lineHeight="100%"
                mb="12px"
              >
                Your Name
                <Text
                  fontSize={'14px'}
                  color="gray.500"
                  fontWeight="500"
                  ms="4px"
                >
                  {' '}
                  (30 characters maximum)
                </Text>
              </FormLabel>
              <Flex
                direction={{ base: 'column', md: 'row' }}
                px={{ base: '10px', md: '32px' }}
                mb={{ base: '30px', md: '0px' }}
              >
                <Input
                  color={textColor}
                  border="1px solid"
                  borderRadius={'45px'}
                  borderColor={borderColor}
                  h="60px"
                  id="name"
                  fontWeight="500"
                  placeholder="Please enter your full name"
                  _placeholder={placeholderColor}
                  _focus={{ borderColor: 'none' }}
                  mb={{ base: '14px', md: '26px' }}
                  me="20px"
                  defaultValue={props.userDetails?.full_name ?? ''}
                  onChange={handleName}
                />
                <Button
                  py="20px"
                  px="16px"
                  fontSize="sm"
                  variant="primary"
                  borderRadius="45px"
                  h="54px"
                  _hover={{
                    boxShadow:
                      '0px 21px 27px -10px rgba(96, 60, 255, 0.48) !important',
                    bg: 'linear-gradient(15.46deg, #4A25E1 26.3%, #7B5AFF 86.4%) !important',
                    _disabled: {
                      bg: 'linear-gradient(15.46deg, #4A25E1 26.3%, #7B5AFF 86.4%)',
                    },
                  }}
                  minW="150px"
                  onClick={() => {
                    if (name?.length === undefined || name?.length === 0) {
                      props.updateName('User');
                      toast({
                        position: 'top',
                        render: () => (
                          <Flex
                            color="white"
                            p={3}
                            bg="orange.500"
                            borderRadius="14px"
                          >
                            You did not choose a name. Now your name is set to
                            "User".
                          </Flex>
                        ),
                      });
                    } else if (name?.length > 30) {
                      handleNameError({
                        status: true,
                        message: 'Your name is too long! Please adjust.',
                      });
                    } else {
                      handleNameError({ status: false, message: 'Success!' });
                      toast({
                        position: 'top',
                        render: () => (
                          <Flex
                            color="white"
                            p={3}
                            bg="green.500"
                            borderRadius="14px"
                          >
                            Success! Your name has been set!
                          </Flex>
                        ),
                      });
                      props.updateName(name);
                    }
                  }}
                >
                  Update name
                </Button>
                <HSeparator
                  bg="gray.200"
                  mt={{ base: '30px', md: '0px' }}
                  display={{ md: 'none' }}
                  alignSelf="center"
                  maxW="90%"
                />
              </Flex>
              <Text
                px={{ base: '10px', md: '36px' }}
                color="red"
                mb="20px"
                display={nameError?.status ? 'block' : 'none'}
              >
                {nameError?.message}
              </Text>
              <FormLabel
                px={{ base: '10px', md: '32px' }}
                display="flex"
                ms={{ base: '10px', md: '10px' }}
                htmlFor={'email'}
                fontSize="md"
                flexDirection={{ base: 'column', md: 'row' }}
                color={textColor}
                letterSpacing="0px"
                fontWeight="bold"
                _hover={{ cursor: 'pointer' }}
                lineHeight="100%"
                mb="12px"
              >
                Your Email
                <Text
                  fontSize={'14px'}
                  color="gray.500"
                  fontWeight="500"
                  ms={{ base: '0px', md: '4px' }}
                  mt={{ base: '6px', md: '0px' }}
                >
                  {' '}
                  (We will email you to verify the change)
                </Text>
              </FormLabel>
              <Flex
                direction={{ base: 'column', md: 'row' }}
                px={{ base: '10px', md: '32px' }}
              >
                <Input
                  color={textColor}
                  border="1px solid"
                  borderRadius={'45px'}
                  borderColor={borderColor}
                  h="60px"
                  id="email"
                  fontWeight="500"
                  placeholder="Please enter your email"
                  _placeholder={placeholderColor}
                  _focus={{ borderColor: 'none' }}
                  defaultValue={user ? user.email : ''}
                  mb={{ base: '14px', md: '26px' }}
                  me="20px"
                  onChange={handleEmail}
                />
                <Button
                  py="20px"
                  px="16px"
                  fontSize="sm"
                  variant="primary"
                  borderRadius="45px"
                  h="54px"
                  _hover={{
                    boxShadow:
                      '0px 21px 27px -10px rgba(96, 60, 255, 0.48) !important',
                    bg: 'linear-gradient(15.46deg, #4A25E1 26.3%, #7B5AFF 86.4%) !important',
                    _disabled: {
                      bg: 'linear-gradient(15.46deg, #4A25E1 26.3%, #7B5AFF 86.4%)',
                    },
                  }}
                  minW="150px"
                  onClick={() => {
                    props.updateEmail(email);
                    toast({
                      position: 'top',
                      render: () => (
                        <Flex
                          color="white"
                          p={3}
                          bg="green.500"
                          borderRadius="14px"
                        >
                          We've sent a confirmation link to your email address.
                          Please check it out!
                        </Flex>
                      ),
                    });
                  }}
                >
                  Update email
                </Button>
              </Flex>
            </Card>
          </Flex>
        </Flex>
      </DashboardLayout>
    </>
  );
}
