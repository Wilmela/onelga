import "../../globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Suspense } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="z-50 bg-app-dark-green relative">
        <Suspense fallback={<p>Loading header..</p>}>
          <Header />
        </Suspense>
      </div>
      <div className="grow z-0 min-h-screen">{children}</div>
      <Footer />
    </div>
  );
}
