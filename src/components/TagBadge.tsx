import Link from "next/link";

export default function TagBadge({
  tag,
  href,
}: {
  tag: string;
  href?: string;
}) {
  const className =
    "inline-flex items-center rounded-full border border-studio-border bg-studio-panel px-2.5 py-0.5 text-xs text-studio-muted hover:border-studio-accent/40 hover:text-studio-accent transition";
  if (href) {
    return (
      <Link href={href} className={className}>
        #{tag}
      </Link>
    );
  }
  return <span className={className}>#{tag}</span>;
}
