"use client";
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import { ScrollReveal } from '@/components/scroll-reveal';
import { GlitchText } from '@/components/glitch-text';
import { Button } from '@/components/button';
import {
  Download,
  Monitor,
  Laptop,
  Terminal,
  Check,
  Copy,
  Shield,
  ArrowRight,
} from 'lucide-react';

const VERSION = '1.2.0';

type Platform = 'windows' | 'macos' | 'linux';

interface PlatformInfo {
  name: string;
  icon: typeof Monitor;
  filename: string;
  size: string;
  endpoint: string;
  instructions: string[];
}

const platforms: Record<Platform, PlatformInfo> = {
  windows: {
    name: 'Windows',
    icon: Monitor,
    filename: `Barracade-${VERSION}-Setup.exe`,
    size: '~85 MB',
    endpoint: '/api/download/windows',
    instructions: [
      'Download the .exe installer.',
      'Run the installer and follow the prompts.',
      'Launch Barracade from the Start menu.',
      'Enter your license key when prompted.',
    ],
  },
  macos: {
    name: 'macOS',
    icon: Laptop,
    filename: `Barracade-${VERSION}.dmg`,
    size: '~92 MB',
    endpoint: '/api/download/macos',
    instructions: [
      'Download the .dmg file.',
      'Open it and drag Barracade to Applications.',
      'Launch Barracade from Applications.',
      'Enter your license key when prompted.',
    ],
  },
  linux: {
    name: 'Linux',
    icon: Terminal,
    filename: `Barracade-${VERSION}.AppImage`,
    size: '~78 MB',
    endpoint: '/api/download/linux',
    instructions: [
      'Download the .AppImage file.',
      'Make it executable: chmod +x Barracade-*.AppImage',
      'Run the AppImage.',
      'Enter your license key when prompted.',
    ],
  },
};

const systemRequirements = [
  { label: 'Windows', value: 'Windows 10 or later (64-bit)' },
  { label: 'macOS', value: 'macOS 12 Monterey or later' },
  { label: 'Linux', value: 'Ubuntu 20.04+, Debian 11+, Fedora 36+, or equivalent' },
  { label: 'RAM', value: '4 GB minimum, 8 GB recommended' },
  { label: 'Storage', value: '500 MB free disk space' },
  { label: 'Network', value: 'Internet connection for license activation and scanning' },
];

function detectPlatform(): Platform {
  if (typeof window === 'undefined') return 'windows';
  const ua = navigator.userAgent.toLowerCase();
  if (ua.includes('mac')) return 'macos';
  if (ua.includes('linux')) return 'linux';
  return 'windows';
}

export default function DownloadPage() {
  const { data: session, status } = useSession();
  const [detected, setDetected] = useState<Platform>('windows');
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<Platform>('windows');

  useEffect(() => {
    const p = detectPlatform();
    setDetected(p);
    setActiveTab(p);
  }, []);

  // ...existing code for rendering download page...
  return <div>Download page content goes here.</div>;
}