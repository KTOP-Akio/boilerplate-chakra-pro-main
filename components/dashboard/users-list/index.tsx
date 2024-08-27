/*eslint-disable*/
'use client';

import Statistics from '@/components/dashboard/users-list/cards/Statistics';
import UserListTable from '@/components/dashboard/users-list/cards/UserListTable';
import DashboardLayout from '@/components/layout';
import { Database } from '@/types_db';
import { postData } from '@/utils/helpers';
import tableDataUserReports from '@/variables/tableDataUserReports';
import { Box, Flex, Grid, Icon, useColorModeValue } from '@chakra-ui/react';
import { Session, User } from '@supabase/supabase-js';
import { redirect, useRouter } from 'next/navigation';
import { MdOutlineGroup, MdOutlineGroupAdd, MdKey } from 'react-icons/md';
import { TbDatabase } from 'react-icons/tb';

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
  subscription: SubscriptionWithProduct | null | any;
  userDetails: { [x: string]: any } | null | any;
  updateName: any;
  updateEmail: any;
  updatePassword: any; 
}

export default function Settings(props: Props) {
  const router = useRouter();

  const redirectToCustomerPortal = async () => {
    try {
      const { url } = await postData({
        url: '/api/create-portal-link',
      });
      router.push(url);
    } catch (error) {
      if (error) return alert((error as Error).message);
    }
  };

  if (!props.session) {
    return redirect('/dashboard/signin');
  }

  const bg = useColorModeValue('secondaryGray.300', 'whiteAlpha.200');
  const brandColor = useColorModeValue('brand.500', 'white');

  return (
    <DashboardLayout
      session={props.session}
      userDetails={props.userDetails}
      user={props.session?.user}
      products={props.products}
      subscription={props.subscription}
      title="Subscription Page"
      description="Manage your subscriptions"
    >
      <Box mt="12px" h="100%" w="100%">
        <Grid
          mb="20px"
          gap="20px"
          gridTemplateColumns={{
            base: 'repeat(1, minmax(0, 1fr))',
            md: 'repeat(2, minmax(0, 1fr))',
            xl: 'repeat(4, minmax(0, 1fr))',
          }}
          borderRadius="14px"
        >
          {/* statistics */}
          <Statistics
            icon={
              <Flex
                h={'56px'}
                w={'56px'}
                justifyContent="center"
                alignItems={'center'}
                rounded="full"
                fontSize="36px"
                color={brandColor}
                bg={bg}
              >
                <Icon as={MdOutlineGroup} w="24px" h="24px" />
              </Flex>
            }
            title="Total Users"
            value="9,794"
          />
          <Statistics
            icon={
              <Flex
                h={'56px'}
                w={'56px'}
                justifyContent="center"
                alignItems={'center'}
                rounded="full"
                fontSize="36px"
                color={brandColor}
                bg={bg}
              >
                <Icon as={MdOutlineGroupAdd} w="24px" h="24px" />
              </Flex>
            }
            title="Users Today"
            value="379"
          />
          <Statistics
            icon={
              <Flex
                h={'56px'}
                w={'56px'}
                justifyContent="center"
                alignItems={'center'}
                rounded="full"
                fontSize="36px"
                color={brandColor}
                bg={bg}
              >
                <Icon as={TbDatabase} w="24px" h="24px" />
              </Flex>
            }
            title="REST Requests"
            value="270,307"
          />
          <Statistics
            icon={
              <Flex
                h={'56px'}
                w={'56px'}
                justifyContent="center"
                alignItems={'center'}
                rounded="full"
                fontSize="36px"
                color={brandColor}
                bg={bg}
              >
                <Icon as={MdKey} w="24px" h="24px" />
              </Flex>
            }
            title="Auth Requests"
            value="23,484"
          />
        </Grid>
        {/* Conversion and talbes*/}
        <Flex h="100%" w="100%" borderRadius="14px">
          <UserListTable tableData={tableDataUserReports} />
        </Flex>
      </Box>
    </DashboardLayout>
  );
}
