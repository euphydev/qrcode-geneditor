import { QRCodeDataProvider } from "@/contexts/QRCodeDataProvider";
import QRPage from "@/components/qr-generator";

export default function Home() {
  return (
    <div className="grid items-center place-content-center">
      <QRCodeDataProvider>
        <QRPage />
      </QRCodeDataProvider>
    </div>
  );
}
