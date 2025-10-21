import { Tajawal } from "next/font/google";
import "@/styles/globals.css";
import StoreProvider from "@/providers/QueryProvider";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Toaster } from "@/components/ui/sonner";
import ScrollUp from "@/components/layout/scrollUp";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const TajawalSans = Tajawal({
  variable: "--font-Tajawal-sans",
  subsets: ["arabic"],
  weight: ["300", "400", "500", "700", "900"],
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function RootLayout({
  children,
  params,
}: Readonly<Props>) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      suppressHydrationWarning
    >
      <NextIntlClientProvider>
        <StoreProvider>
          <body className={`${TajawalSans.variable} antialiased`}>
            <Header />
            {children}
            <Footer />
            <ScrollUp />
            <Toaster />
          </body>
        </StoreProvider>
      </NextIntlClientProvider>
    </html>
  );
}
