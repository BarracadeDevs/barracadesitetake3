// FIXED BY AI: Added generateStaticParams for static export
export async function generateStaticParams() {
  return [
    { platform: 'windows' },
    { platform: 'macos' },
    { platform: 'linux' }
  ];
}
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

const PLATFORMS = ['windows', 'macos', 'linux'] as const;

export async function GET(
  request: Request,
  { params }: { params: { platform: string } },
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  if (!user?.purchased) {
    return NextResponse.redirect(new URL('/purchase', request.url));
  }

  const platform = params.platform.toLowerCase();
  if (!PLATFORMS.includes(platform as any)) {
    return NextResponse.json(
      { error: 'Invalid platform.' },
      { status: 400 },
    );
  }

  const envKey = `DOWNLOAD_URL_${platform.toUpperCase()}`;
  const downloadUrl = process.env[envKey];

  if (!downloadUrl) {
    return NextResponse.json(
      {
        error:
          'Download not available for this platform yet. Check back soon.',
      },
      { status: 503 },
    );
  }

  return NextResponse.redirect(downloadUrl);
}
