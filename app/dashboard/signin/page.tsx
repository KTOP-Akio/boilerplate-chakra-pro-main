import AuthUI from './AuthUI';
import illustration from '/public/img/auth/auth.png';
import { getSession } from '@/app/supabase-server';
import DefaultAuth from '@/components/auth';
import { Providers } from '@/components/providers';
import { redirect } from 'next/navigation';

export default async function SignIn() {
  const session = await getSession();

  if (session) {
    return redirect('/dashboard/main');
  }

  return (
    <Providers>
      <DefaultAuth illustrationBackground={illustration?.src}>
        <AuthUI />
      </DefaultAuth>
    </Providers>
  );
}
