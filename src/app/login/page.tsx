import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import { AuthForm } from '@/components/auth-form';

export default function LoginPage({
  searchParams,
}: {
  searchParams: { callbackUrl?: string };
}) {
  // FIXED BY AI: Fragments and JSX are balanced. No hooks used, so no 'use client' needed.
  return (
    <>
      <Nav />
      <main className="min-h-screen flex items-center pb-20">
        <div className="mx-auto max-w-6xl px-6 w-full pt-20">
          <AuthForm
            mode="login"
            callbackUrl={searchParams.callbackUrl || '/'}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
