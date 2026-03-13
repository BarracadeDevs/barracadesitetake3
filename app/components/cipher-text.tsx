'use client';

import { useState, useCallback } from 'react';
import { cn } from '../lib/cn';

interface CipherTextProps {
  encrypted: string;
  decrypted: string;
  className?: string;
  hint?: string;
}

function scramble(text: string, progress: number): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
  return text
    .split('')
    .map((char, i) => {
      if (char === ' ') return ' ';
      if (i / text.length < progress) return text[i];
      return chars[Math.floor(Math.random() * chars.length)];
    })
    .join('');
}

export function CipherText({ encrypted, decrypted, className, hint }: CipherTextProps) {
  const [state, setState] = useState<'locked' | 'decrypting' | 'solved'>('locked');
  const [display, setDisplay] = useState(encrypted);

  const decrypt = useCallback(() => {
    if (state !== 'locked') return;
    setState('decrypting');

    const steps = 12;
    let step = 0;

    const interval = setInterval(() => {
      step++;
      const progress = step / steps;
      setDisplay(scramble(decrypted, progress));

      if (step >= steps) {
        clearInterval(interval);
        setDisplay(decrypted);
        setState('solved');
      }
    }, 50);
  }, [state, decrypted]);

  return (
    <button
      onClick={decrypt}
      className={cn(
        'group relative font-mono text-[11px] inline-flex items-center gap-1.5 transition-all duration-300',
        state === 'locked' && 'text-emerald-900/60 hover:text-emerald-700/80 cursor-pointer',
        state === 'decrypting' && 'text-emerald-600 cursor-wait',
        state === 'solved' && 'text-emerald-500 cursor-default',
        className,
      )}
      title={state === 'locked' ? (hint || 'Click to decrypt') : undefined}
    >
      {display}
      {state === 'locked' && hint && (
        <span className="ml-2 text-neutral-500">({hint})</span>
      )}
    </button>
  );
}