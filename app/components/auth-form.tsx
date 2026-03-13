'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface AuthFormProps {
  mode: 'login' | 'signup';
  callbackUrl?: string;
}

export function AuthForm({ mode, callbackUrl = '/' }: AuthFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const inputClass =
    'w-full rounded-lg border border-white/[0.06] bg-white/[0.02] px-3.5 py-2.5 text-[14px] text-white placeholder:text-neutral-700 focus:outline-none focus:border-white/[0.12] transition-colors';

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (mode === 'signup') {
        if (password !== confirmPassword) {
          setError('Passwords do not match.');
          setLoading(false);
          return;
        }

        const res = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password }),
        });

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || 'Signup failed');
        }

        router.push(callbackUrl);
      } else {
        const result = await signIn('credentials', {
          redirect: false,
          email,
          password,
          callbackUrl,
        });

        if (result?.error) {
          setError(result.error);
        } else {
          router.push(callbackUrl);
        }
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Something went wrong');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-black/40 p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-white">{mode === 'login' ? 'Sign In' : 'Sign Up'}</h2>
      {mode === 'signup' && (
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          className={inputClass + ' mb-4'}
          required
        />
      )}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className={inputClass + ' mb-4'}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className={inputClass + ' mb-4'}
        required
      />
      {mode === 'signup' && (
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          className={inputClass + ' mb-4'}
          required
        />
      )}
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <button
        type="submit"
        className="w-full py-2 px-4 bg-emerald-700 hover:bg-emerald-600 text-white rounded-lg transition-colors"
        disabled={loading}
      >
        {loading ? 'Loading...' : mode === 'login' ? 'Sign In' : 'Sign Up'}
      </button>
      <div className="mt-4 text-center">
        {mode === 'login' ? (
          <>
            <span className="text-neutral-400">Don't have an account? </span>
            <Link href="/signup" className="text-emerald-400 hover:underline">Sign up</Link>
          </>
        ) : (
          <>
            <span className="text-neutral-400">Already have an account? </span>
            <Link href="/login" className="text-emerald-400 hover:underline">Sign in</Link>
          </>
        )}
      </div>
    </form>
  );
}

