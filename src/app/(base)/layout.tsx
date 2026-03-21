import Header from "@/components/header";
import "../globals.css";
import Footer from "@/components/footer";
import { Suspense } from "react";

export default function BaseLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="relative min-h-screen grow">
        <div className="z-50 absolute left-0 top-0 right-0">
          <Suspense fallback={<p>Loading header..</p>}>
            <Header />
          </Suspense>
        </div>
        <div className="z-0">{children}</div>
      </div>

      <Footer />
    </div>
  );
}
