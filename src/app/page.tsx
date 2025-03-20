import Image from "next/image";

import Footer from "../components/footer";
import DownloadSection from "@/components/download";

export default function Home() {
  return (
    <div>
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-0.5 p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
          <Image
            // className="dark:invert"
            src="/small-white.png"
            alt="HustleX logo"
            width={72}
            height={72}
            priority
          />
          <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
            <li className="mb-2 tracking-[-.01em]">
              Welcome to the HustleX experience.
            </li>
            <li className="tracking-[-.01em]">
              The website is under maintenance.
            </li>
          </ol>
        </main>
      </div>
      <DownloadSection />
      <Footer />
    </div>
  );
}
