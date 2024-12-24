import { useEffect, useState } from "react";
import QRCode from "qrcode";

import useEffectEvent from "./use-effect-event";

import { QRCodeReducerStateProps } from "@/lib/qr-types";

export default function useGetQRCode(
  text: string,
  state: QRCodeReducerStateProps,
) {
  const [qrCodeData, setQrCodeData] = useState(text);

  const onGotQRCode = useEffectEvent(async () => {
    try {
      const qrData = await QRCode.toDataURL(text, { ...state });
      setQrCodeData(qrData);
    } catch (err) {
      console.error("Error generating QR code", err);
    }
  });

  useEffect(() => {
    if (text) {
      onGotQRCode();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    text,
    state.type,
    state.errorCorrectionLevel,
    state.margin,
    state.quality,
    state.width,
    state.color.dark,
    state.color.light,
  ]);

  return { qrCodeData, setQrCodeData };
}
