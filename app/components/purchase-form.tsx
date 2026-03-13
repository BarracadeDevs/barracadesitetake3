'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { ArrowRight, Download, Check } from 'lucide-react';
import Link from 'next/link';

type Step = 'purchase' | 'complete';

export const PurchaseForm = () => {
  const { data: session, status } = useSession();
  const [step, setStep] = useState<Step>('purchase');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handlePurchase(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Something went wrong');
      }

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        setStep('complete');
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

  if (step === 'complete') {
    return (
      <div className="text-center p-8">
        <Check className="mx-auto mb-4 text-emerald-500 w-12 h-12" />
        <h2 className="text-2xl font-bold mb-2 text-white">Purchase Complete!</h2>
        <p className="text-neutral-400 mb-4">Thank you for your purchase. Check your email for your download link.</p>
        <Link href="/download" className="text-emerald-400 hover:underline">Go to Downloads</Link>
      </div>
    );
  }

  return (
    <form onSubmit={handlePurchase} className="max-w-md mx-auto bg-black/40 p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-white">Purchase</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <button
        type="submit"
        className="w-full py-2 px-4 bg-emerald-700 hover:bg-emerald-600 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
        disabled={loading}
      >
        {loading ? 'Processing...' : <><ArrowRight className="w-4 h-4" /> Purchase Now</>}
      </button>
      <div className="mt-4 text-center">
        <span className="text-neutral-400">Already purchased?</span>{' '}
        <Link href="/download" className="text-emerald-400 hover:underline">Download here</Link>
      </div>
    </form>
  );
};

// Removed duplicate export
