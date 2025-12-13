import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ClassyShop",
  description: "Welcome to ClassyShop. Your one stop shop for all things.",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
      <section>{children}</section>
    </section>
  );
}
