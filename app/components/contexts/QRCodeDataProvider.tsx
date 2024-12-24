"use client";

import { createContext, useContext, useReducer, useState } from "react";

import { QRCodeReducer } from "@/lib/qr-reducer";
import useGetQRCode from "@/hooks/use-get-qr-code";
import type {
  ErrorCorrectionLevelType,
  StateAndActionType,
} from "@/lib/qr-types";

type QRCodeDataContextProps = {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  qrCodeData: string;
  errorCorrectionOptions: {
    label: string;
    value: string;
  }[];
} & StateAndActionType;
const initialQRCodeDataContext: QRCodeDataContextProps = {
  text: "",
  setText: () => {},
  qrCodeData: "",
  errorCorrectionOptions: [],
  state: {
    errorCorrectionLevel: "H",
    type: "image/jpeg",
    quality: 0.3,
    margin: 1,
    width: 256,
    color: {
      dark: "#000000",
      light: "#FFFFFF",
    },
  },
  dispatch: () => {},
};
const QRCodeDataContext = createContext<QRCodeDataContextProps | null>(
  initialQRCodeDataContext,
);

export function QRCodeDataProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(QRCodeReducer, {
    errorCorrectionLevel: errorCorrectionOptions[3]
      .value as ErrorCorrectionLevelType,
    type: "image/jpeg",
    quality: 0.3,
    margin: 1,
    width: 256,
    color: {
      dark: "#000000",
      light: "#FFFFFF",
    },
  });
  const [text, setText] = useState("");
  const { qrCodeData } = useGetQRCode(text, state);

  return (
    <QRCodeDataContext.Provider
      value={{
        state,
        dispatch,
        text,
        setText,
        qrCodeData,
        errorCorrectionOptions,
      }}
    >
      {children}
    </QRCodeDataContext.Provider>
  );
}

export function useQRCodeData() {
  const ctx = useContext(QRCodeDataContext);
  if (!ctx) {
    throw new Error("useQRCodeData must be used within a QRCodeDataProvider");
  }
  return ctx;
}

const errorCorrectionOptions = [
  { value: "L", label: "Low" },
  { value: "M", label: "Medium" },
  { value: "Q", label: "Quartile" },
  { value: "H", label: "High" },
];
