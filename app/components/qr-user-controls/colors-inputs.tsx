import { useCallback } from "react";

import QRInput from "@/components/qr-input";
import { useQRCodeData } from "@/contexts/QRCodeDataProvider";

export default function ColorsInputs() {
  const { state, dispatch } = useQRCodeData();

  const handleFgChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({
        type: "fgColor",
        payload: {
          value: e.target.value,
        },
      });
    },
    [dispatch],
  );

  const handleBgChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({
        type: "bgColor",
        payload: {
          value: e.target.value,
        },
      });
    },
    [dispatch],
  );

  return (
    <>
      <QRInput
        className="bg-gray-800 border-gray-700 border-solid rounded-md border-[1px] outline-none p-[2px] w-14 ml-3"
        type="color"
        title="Foreground Color (Dark):"
        value={state.color.dark}
        onChange={handleFgChange}
      />
      <QRInput
        className="bg-gray-800 border-gray-700 border-solid rounded-md border-[1px] outline-none p-[2px] w-14 ml-3 text-black"
        type="color"
        title="Background Color (Light):"
        value={state.color.light}
        onChange={handleBgChange}
      />
    </>
  );
}
