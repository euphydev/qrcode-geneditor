import { useCallback } from "react";

import UserControlsHeader from "./header";
import ColorsInputs from "./colors-inputs";
import NumbersInputs from "./numbers-inputs";

import QRDropdown from "@/components/qr-dropdown";
import QRInput from "@/components/qr-input";
import Wrapper from "@/components/qr-wrapper";
import UnderConstruction from "@/components/under-construction";
import { useQRCodeData } from "@/contexts/QRCodeDataProvider";

import type { ErrorCorrectionLevelType, OutputType } from "@/lib/qr-types";

export default function UserControls() {
  const { text, setText, state, dispatch, errorCorrectionOptions } =
    useQRCodeData();

  const handleErrorCorrectionChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      dispatch({
        type: "error-correction-level",
        payload: {
          value: e.target.value as ErrorCorrectionLevelType,
        },
      });
    },
    [dispatch],
  );

  const handleOutputTypeChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      dispatch({
        type: "output-type",
        payload: {
          value: e.target.value as OutputType,
        },
      });
    },
    [dispatch],
  );

  return (
    <Wrapper title="QR Code Editor" text={text}>
      <UserControlsHeader />
      <QRInput
        className="bg-gray-800 border-gray-700 border-solid rounded-md border-[1px] outline-none p-2 w-72"
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text for QR code"
      />
      <QRDropdown
        title="Error Correction Level:"
        options={errorCorrectionOptions}
        value={state.errorCorrectionLevel}
        onChange={handleErrorCorrectionChange}
      />
      <QRDropdown
        title="Output Type:"
        options={[
          { label: "PNG", value: "image/png" },
          { label: "JPEG", value: "image/jpeg" },
          { label: "WEBP", value: "image/webp" },
        ]}
        value={state.type}
        onChange={handleOutputTypeChange}
      />
      <NumbersInputs />
      <ColorsInputs />
      <UnderConstruction content="=== under construction ===" />
    </Wrapper>
  );
}
