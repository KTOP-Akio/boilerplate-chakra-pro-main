import {
  getSession,
  getSubscription,
  getActiveProductsWithPrices,
} from '@/app/supabase-server';
import Pricing from '@/components/pricing';
import { Providers } from '@/components/providers';

export default async function PricingPage() {
  const [session, products, subscription] = await Promise.all([
    getSession(),
    getActiveProductsWithPrices(),
    getSubscription(),
  ]);

  return (
    <Providers>
      <Pricing
        session={session}
        user={session?.user}
        products={products}
        subscription={subscription}
      />
    </Providers>
  );
}
