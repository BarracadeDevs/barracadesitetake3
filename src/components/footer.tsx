import Link from 'next/link';
import Image from 'next/image';
import { CipherText } from '@/components/cipher-text';

export function Footer() {
  return (
    <footer className="border-t border-white/[0.04] bg-[#050505]">
      <div className="mx-auto max-w-6xl px-6 py-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Image src="/logo-icon.png" alt="" width={16} height={16} />
          <span className="text-[13px] text-neutral-600">Barracade</span>
        </div>
        <div className="flex gap-6">
          <Link href="/features" className="text-[12px] text-neutral-600 hover:text-neutral-400 transition-colors">Features</Link>
          <Link href="/purchase" className="text-[12px] text-neutral-600 hover:text-neutral-400 transition-colors">Purchase</Link>
          <Link href="https://app.barracade.dev/login" className="text-[12px] text-neutral-600 hover:text-neutral-400 transition-colors">Dashboard</Link>
        </div>
        <div className="flex items-center gap-4">
          <p className="text-[11px] text-neutral-700">&copy; {new Date().getFullYear()} Barracade</p>
          <CipherText
            encrypted="-- --- .-. ... ."
            decrypted="BRCD-M0RS3-C0D3"
            hint="Morse code - click to decode"
          />
        </div>
      </div>
    </footer>
  );
}
