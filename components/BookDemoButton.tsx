import Link from "next/link";
import { BOOK_DEMO_HREF } from "@/lib/contact";

type BookDemoButtonProps = {
  className?: string;
};

export default function BookDemoButton({ className }: BookDemoButtonProps) {
  return (
    <Link
      href={BOOK_DEMO_HREF}
      className={
        className ??
        "inline-flex min-h-11 items-center justify-center rounded-full bg-[var(--gradient)] px-6 py-2.5 text-sm font-semibold text-white"
      }
    >
      Book a demo
    </Link>
  );
}
