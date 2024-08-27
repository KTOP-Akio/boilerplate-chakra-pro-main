import {
  getSession,
  getUserDetails,
  getSubscription,
  getActiveProductsWithPrices,
} from '@/app/supabase-server';
import Settings from '@/components/dashboard/settings';
import { Providers } from '@/components/providers';
import { Database } from '@/types_db';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function SettingsPage() {
  const [session, userDetails, products, subscription] = await Promise.all([
    getSession(),
    getUserDetails(),
    getActiveProductsWithPrices(),
    getSubscription(),
  ]);
  const updateName = async (name: string) => {
    'use server';

    const newName = name as string;
    const supabase = createServerActionClient<Database>({ cookies });
    const session = await getSession();
    const user = session?.user;
    const { error } = await supabase
      .from('users')
      .update({ full_name: newName })
      .eq('id', user?.id);
    if (error) {
      console.log(error);
    }
    revalidatePath('/dashboard/settings');
  };

  const updateEmail = async (email: string) => {
    'use server';

    const newEmail = email as string;
    const supabase = createServerActionClient<Database>({ cookies });
    const { error } = await supabase.auth.updateUser({ email: newEmail });
    if (error) {
      console.log(error);
    }
    revalidatePath('/dashboard/settings');
  };

  if (!session) {
    return redirect('/dashboard/settings');
  }

  const updatePassword = async (email: string) => {
    'use server';

    const newEmail = email as string;
    const supabase = createServerActionClient<Database>({ cookies });
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'https://example.com/update-password',
    });
    revalidatePath('/dashboard/settings');
  };

  return (
    <Providers>
      {/* @ts-ignore */}
      <Settings
        session={session}
        userDetails={userDetails}
        user={session?.user}
        products={products}
        subscription={subscription}
        updateName={updateName}
        updateEmail={updateEmail}
        updatePassword={updatePassword}
      />
    </Providers>
  );
}
