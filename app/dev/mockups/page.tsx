import type { Metadata } from "next";
import { notFound } from "next/navigation";
import MockupsStudio from "./MockupsStudio";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Mockups",
  robots: { index: false, follow: false },
};

export default function MockupsPage() {
  if (process.env.NODE_ENV === "production") notFound();
  return <MockupsStudio />;
}
