import type { Metadata } from "next";
import { DM_Sans } from "next/font/google"
import "./globals.css";
import MotionProvider from "./components/ui/MotionProvider";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: {
    default: "Kasu",
    template: "%s | Kasu",
  },
  description: "Kasu is an AI-powered marketing workspace.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`h-full ${dmSans.variable} antialiased`}
    >
      <body className="">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
