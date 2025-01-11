import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Blog | Matheus Cavalcante",
  description: "Powered by Next.js",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${geistSans.variable} font-sans antialiased`}>
        <div className="min-h-screen flex flex-col">
          <header className="select-none h-20 flex items-center justify-between px-8 md:px-44 xl:px-96">
            <div>
              <Link href="/" className="h-20 flex items-center">
                <p className="font-semibold text-xl md:text-2xl">Matheus Cavalcante</p>
              </Link>
            </div>
            <div className="flex gap-2">
              {
                [
                  {
                    id: 1,
                    name: "Posts",
                    link: "/",
                  },
                  {
                    id: 2,
                    name: "Sobre",
                    link: "/about",
                  },
                ].map(item =>
                  <Link
                    key={item.id}
                    href={item.link}
                    className="text-sm md:text-base px-2 py-0.5 rounded-lg hover:bg-[--hover] hover:shadow hover:shadow-[--shadow] transition"
                  >{item.name}</Link>
                )
              }
            </div>
          </header>
          {children}
          <footer className="mt-auto h-24 text-xs grid place-content-center">
            {`© ${new Date().getFullYear()} · Matheus Cavalcante`}
          </footer>
        </div>
      </body>
    </html>
  );
}
