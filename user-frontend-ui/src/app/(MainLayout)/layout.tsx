import Header from "@/components/shared/Header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ClassyShop",
  description: "Welcome to ClassyShop. Your one stop shop for all things.",
};

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
      <Header />
      <section>{children}</section>
    </section>
  );
}
