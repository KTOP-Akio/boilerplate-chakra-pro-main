import {
  getSession,
  getUserDetails,
  getSubscription,
  getActiveProductsWithPrices,
} from '@/app/supabase-server';
import PremiumGenerator from '@/components/dashboard/premium-generator';
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

  if (!subscription) {
    redirect('/dashboard/main');
  }
  return (
    <Providers>
      {subscription ? (
        <PremiumGenerator
          session={session}
          userDetails={userDetails}
          user={session?.user}
          products={products}
          subscription={subscription} 
        />
      ) : (
        <p>NICE TRY BUDDY</p>
      )}
    </Providers>
  );
}
