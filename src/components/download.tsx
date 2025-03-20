import Image from "next/image";

export default function DownloadSection() {
  const qrUrl = "https://yourdomain.com/download"; // Replace with actual domain

  return (
    <div className="bg-black text-white flex flex-col md:flex-row items-center justify-between px-60 border-t-1 border-neutral-900">
      {/* Left Side - Text and QR Code */}
      <div className="md:w-1/2 space-y-4">
        <h1 className="text-4xl md:text-5xl font-light">
          The best do <span className="italic font-bold">more.</span> <br /> The
          best get <span className="italic font-bold">more.</span>
        </h1>
        <p className="text-gray-400">
          Download HustleX and get rewarded for your grind.
        </p>
        <div className="w-20 h-20 p-2 border-neutral-400 border-1 rounded-r-sm">
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
              qrUrl
            )}&color=E6E6E6&bgcolor=000000`}
            alt="QR Code"
            width={200}
            height={200}
          />
        </div>
      </div>

      {/* Right Side - Phone Mockup */}
      <div className="md:w-1/2 flex justify-end">
        <Image
          src="/mockup-1.jpg" // Ensure the correct image exists in the public folder
          alt="App Preview"
          width={600}
          height={600}
        />
      </div>
    </div>
  );
}
