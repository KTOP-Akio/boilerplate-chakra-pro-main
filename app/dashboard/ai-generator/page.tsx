import {
  getSession,
  getUserDetails,
  getSubscription,
  getActiveProductsWithPrices,
} from '@/app/supabase-server';
import Generator from '@/components/dashboard/ai-generator';
import { Providers } from '@/components/providers';
import { redirect } from 'next/navigation';

export default async function Account() {
  const [session, userDetails, products, subscription] = await Promise.all([
    getSession(),
    getUserDetails(),
    getActiveProductsWithPrices(),
    getSubscription(),
  ]);

  console.log(userDetails);
  if (!session) {
    return redirect('/dashboard/signin');
  }

  return (
    <Providers>
      {/* @ts-ignore */}
      <Generator
        session={session}
        userDetails={userDetails}
        user={session?.user}
        products={products}
        subscription={subscription} 
      />
    </Providers>
  );
}
