import Link from "next/link";

export const LOGO_WIDTH = 120;
export const LOGO_HEIGHT = 45;
export const logoSizeClassName = "block h-[45px] w-[120px] shrink-0";

export default function Logo({
  href = "/",
  className = "",
  compact = false,
}: {
  href?: string;
  className?: string;
  /** Icon-mark only for the collapsed sidebar rail */
  compact?: boolean;
}) {
  if (compact) {
    return (
      <Link
        href={href}
        aria-label="Logo"
        className={`flex size-10 shrink-0 items-center justify-center ${className}`.trim()}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/logo-mark.png"
          alt=""
          width={40}
          height={40}
          className="size-10 object-contain"
        />
      </Link>
    );
  }

  return (
    <Link href={href} className={`${logoSizeClassName} ${className}`.trim()}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/assets/KASU.svg"
        alt="KASU"
        width={LOGO_WIDTH}
        height={LOGO_HEIGHT}
        className="h-full w-full object-contain object-left"
      />
    </Link>
  );
}