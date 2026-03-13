import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import { PurchaseForm } from '@/components/purchase-form';
import { ScrollReveal } from '@/components/scroll-reveal';
import { CipherText } from '@/components/cipher-text';
import { GlitchText } from '@/components/glitch-text';
import { Check } from 'lucide-react';

const included = [
  'Website scanner with unlimited URL scans',
  'RASP engine covering 9 attack vectors',
  'Policy-based defense engine',
  'Static code analysis across 8 languages',
  'Compliance reporting (CIS, PCI-DSS, HIPAA, SOC 2)',
  'Dependency scanning and SBOM generation',
  'Secrets vault with AES-256-GCM encryption',
  'Desktop app for Windows, macOS, and Linux',
  'Every future update included',
];

export default function PurchasePage() {
  // FIXED BY AI: Fragments and JSX are balanced. No hooks used, so no 'use client' needed.
  return (
    <>
      <Nav />
      <main className="min-h-screen pt-32 pb-20">
        <div className="mx-auto max-w-6xl px-6">
          <ScrollReveal>
            <GlitchText
              as="h1"
              className="text-4xl font-medium tracking-tight text-white sm:text-5xl mb-4"
            >
              Purchase
            </GlitchText>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="text-[15px] text-neutral-500 mb-20 max-w-md leading-relaxed">
              One-time payment, lifetime license. You get the full desktop app
              and every update we ship after that.
            </p>
          </ScrollReveal>

          <div className="grid lg:grid-cols-2 gap-20 items-start">
            <ScrollReveal delay={0.15}>
              <PurchaseForm />
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div>
                <h2 className="text-[15px] font-medium text-neutral-300 mb-8">What you get</h2>
                <ul className="space-y-4">
                  {included.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <Check className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                      <span className="text-[14px] text-neutral-500 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-12 pt-8 border-t border-white/[0.04]">
                  <p className="text-[13px] text-neutral-600 leading-relaxed mb-6">
                    License is tied to your email. Install on as many machines as you want.
                    No subscriptions, no recurring charges.
                  </p>
                  <CipherText
                    encrypted="4c494645 54494d45 2041 43434553 53"
                    decrypted="BRCD-L1F3T1M3-4CC3SS"
                    hint="Hex spaced - click to decode"
                  />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}