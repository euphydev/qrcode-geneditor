import type {
  ErrorCorrectionLevelType,
  OutputType,
  QRCodeReducerStateProps,
  QRCodeReducerActionProps,
} from "@/lib/qr-types";

export function QRCodeReducer(
  state: QRCodeReducerStateProps,
  action: QRCodeReducerActionProps,
): QRCodeReducerStateProps {
  switch (action.type) {
    case "error-correction-level": {
      return {
        ...state,
        errorCorrectionLevel: action.payload.value as ErrorCorrectionLevelType,
      };
    }
    case "output-type": {
      return {
        ...state,
        type: action.payload.value as OutputType,
      };
    }
    case "quality": {
      return {
        ...state,
        quality: action.payload.value as number,
      };
    }
    case "padding": {
      return {
        ...state,
        margin: action.payload.value as number,
      };
    }
    case "size": {
      return {
        ...state,
        width: action.payload.value as number,
      };
    }
    case "fgColor": {
      return {
        ...state,
        color: {
          ...state.color,
          dark: action.payload.value as string,
        },
      };
    }
    case "bgColor": {
      return {
        ...state,
        color: {
          ...state.color,
          light: action.payload.value as string,
        },
      };
    }
    default: {
      return state;
    }
  }
}
