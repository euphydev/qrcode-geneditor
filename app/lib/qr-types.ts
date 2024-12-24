// TODOS: size, color types
export type ErrorCorrectionLevelType = "L" | "M" | "Q" | "H";
export type OutputType = "image/png" | "image/jpeg" | "image/webp";

export type QRCodeReducerStateProps = {
  errorCorrectionLevel: ErrorCorrectionLevelType;
  type: OutputType;
  quality: number;
  margin: number;
  width: number;
  color: {
    dark: string;
    light: string;
  };
};

export type QRCodeReducerActionProps = {
  type:
    | "error-correction-level"
    | "output-type"
    | "quality"
    | "padding"
    | "size"
    | "fgColor"
    | "bgColor";
  payload: {
    value: ErrorCorrectionLevelType | OutputType | number | string;
  };
};

export type StateAndActionType = {
  state: QRCodeReducerStateProps;
  dispatch: React.Dispatch<QRCodeReducerActionProps>;
};
