import {
  getSession,
  getSubscription,
  getActiveProductsWithPrices,
} from '@/app/supabase-server';
import Landing from '@/components/landing';
import { Providers } from '@/components/providers';

export default async function PricingPage() {
  const [session, products, subscription] = await Promise.all([
    getSession(),
    getActiveProductsWithPrices(),
    getSubscription(),
  ]).then();

  return (
    <Providers>
      {/* @ts-ignore */}
      <Landing
        session={session}
        user={session?.user}
        products={products}
        subscription={subscription}
      />
    </Providers>
  );
}
