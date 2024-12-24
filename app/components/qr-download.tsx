import { useQRCodeData } from "@/contexts/QRCodeDataProvider";

export default function QRDownload() {
  const { qrCodeData } = useQRCodeData();

  return qrCodeData ? (
    <a
      className="bg-gray-800 border-gray-700 border-solid rounded-md border-[1px] outline-none py-2 px-4"
      href={qrCodeData}
      download="qrcode.png"
    >
      Download QR Code
    </a>
  ) : null;
}
