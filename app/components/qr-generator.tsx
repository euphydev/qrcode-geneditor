"use client";

import QRImage from "./qr-image";
import UserControls from "./qr-user-controls";
import QRDownload from "./qr-download";

import { useQRCodeData } from "@/contexts/QRCodeDataProvider";

export default function QRPage() {
  const { text, qrCodeData } = useQRCodeData();

  return (
    <div className="flex flex-col md:flex-row text-center p-5 md:gap-12 h-screen">
      {text && (
        <section className="grid place-content-center gap-5 p-12">
          <QRImage
            className="h-64 w-64 object-cover mt-5"
            src={qrCodeData}
            alt="Generated QR Code"
            width={256}
            height={256}
          />
          <QRDownload />
        </section>
      )}
      <UserControls />
    </div>
  );
}
