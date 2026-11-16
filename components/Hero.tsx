import Image from "next/image";
export default function Hero() {
  return (
    <section className="bg-base-200">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-10 md:grid-cols-2 md:py-16">
        <div>
          <p className="text-sm font-medium text-primary">আজকের বাজার দর</p>
          <h1 className="mt-2 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">প্রয়োজনীয় পণ্যের দাম এক নজরে</h1>
          <p className="mt-4 max-w-md text-base-content/70">চাল, ডাল, তেল, সবজি, মাছ-মাংস — প্রতিদিনের বাজার দর, দাম বাড়া-কমার হিসাবসহ এক জায়গায়।</p>
          <a href="#সব-পণ্য" className="btn btn-primary mt-6">সব পণ্য দেখুন</a>
        </div>
        <div className="flex justify-center md:justify-end">
          <Image src="/bazar-hero.png" alt="সবজি ও ফলের ঝুড়ি" width={315} height={263} priority className="h-auto w-full max-w-sm" />
        </div>
      </div>
    </section>
  );
}
