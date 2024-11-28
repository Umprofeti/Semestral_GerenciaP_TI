import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Hospital ZG",
  description: "Proyecto semestral de gerencia de proyectos",
  icons: {
    icon: "/favicon.ico",
  }
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="es">
      <body className="bg-[#f4f7f7] antialiased flex flex-col min-h-screen pb-20 md:pb-0"> {/* `pb-20` solo en móviles (debajo de `md`) */}
        <main className="flex-grow">
          {children}
        </main>
      </body>
    </html>
  );
}

