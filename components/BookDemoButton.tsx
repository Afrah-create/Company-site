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
        "btn-cta inline-flex min-h-11 items-center justify-center rounded-full px-6 py-2.5 text-sm font-semibold transition-opacity hover:opacity-90"
      }
    >
      Book a demo
    </Link>
  );
}
