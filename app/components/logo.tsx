// Barracade logo component
import Image from 'next/image';

export function Logo({ className = '', ...props }) {
  return (
    <Image
      src="/logo.png"
      alt="Barracade logo"
      width={160}
      height={60}
      className={className}
      priority
      {...props}
    />
  );
}
