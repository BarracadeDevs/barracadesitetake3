'use client';

import { useState, useCallback } from 'react';
import { Copy, Check } from 'lucide-react';
import { cn } from '@/lib/cn';

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  className?: string;
}

export function CodeBlock({ code, filename, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(() => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [code]);

  return (
    <div className={cn('rounded-lg border border-white/[0.04] bg-[#080808] overflow-hidden', className)}>
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/[0.04]">
        {filename && <span className="text-[11px] text-neutral-600 font-mono">{filename}</span>}
        <button
          onClick={copy}
          className="flex items-center gap-1 text-[11px] text-neutral-700 hover:text-neutral-400 transition-colors"
        >
          {copied ? <Check className="h-3 w-3 text-emerald-700" /> : <Copy className="h-3 w-3" />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre className="px-4 py-4 overflow-x-auto">
        <code className="text-[12px] font-mono leading-[1.8] text-emerald-800">{code}</code>
      </pre>
    </div>
  );
}