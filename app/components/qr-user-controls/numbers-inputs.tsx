import { useCallback } from "react";

import QRInput from "@/components/qr-input";
import { useQRCodeData } from "@/contexts/QRCodeDataProvider";

export default function NumbersInputs() {
  const { state, dispatch } = useQRCodeData();

  const handleQualityChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({
        type: "quality",
        payload: {
          value: Number(e.target.value) as number,
        },
      });
    },
    [dispatch],
  );

  const handlePaddingChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({
        type: "padding",
        payload: {
          value: Number(e.target.value) as number,
        },
      });
    },
    [dispatch],
  );

  const handleSizeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({
        type: "size",
        payload: {
          value: Number(e.target.value) as number,
        },
      });
    },
    [dispatch],
  );

  return (
    <>
      <QRInput
        className="bg-gray-800 border-gray-700 border-solid rounded-md border-[1px] outline-none p-2 w-20 ml-3"
        type="number"
        title="Quality (0-1):"
        value={state.quality}
        onChange={handleQualityChange}
        min="0"
        max="1"
        step="0.1"
      />
      <QRInput
        className="bg-gray-800 border-gray-700 border-solid rounded-md border-[1px] outline-none p-2 w-20 ml-3"
        type="number"
        title="Padding (Margin):"
        value={state.margin}
        onChange={handlePaddingChange}
        min="1"
      />
      <QRInput
        className="bg-gray-800 border-gray-700 border-solid rounded-md border-[1px] outline-none p-2 w-20 ml-3"
        type="number"
        title="Size (px):"
        value={state.width}
        onChange={handleSizeChange}
        min="1"
        step={20}
      />
    </>
  );
}
