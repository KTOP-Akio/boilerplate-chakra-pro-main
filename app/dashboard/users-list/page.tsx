import {
  getSession,
  getUserDetails,
  getSubscription,
  getActiveProductsWithPrices,
} from '@/app/supabase-server';
import UsersList from '@/components/dashboard/users-list';
import { Providers } from '@/components/providers';
import { redirect } from 'next/navigation';

export default async function Account() {
  const [session, userDetails, products, subscription] = await Promise.all([
    getSession(),
    getUserDetails(),
    getActiveProductsWithPrices(),
    getSubscription(),
  ]);

  if (!session) {
    return redirect('/dashboard/signin');
  }
  return (
    <Providers>
      {/* @ts-ignore */}
      <UsersList
        session={session}
        userDetails={userDetails}
        user={session?.user}
        products={products}
        subscription={subscription}
      />
    </Providers>
  );
}
