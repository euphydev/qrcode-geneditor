// TEMPORARY: wait for official react useEffectEvent
import { useCallback, useRef } from "react";

type EffectEventHandler<T extends unknown[]> = (...args: T) => void;

export default function useEffectEvent<T extends unknown[]>(
  callback: EffectEventHandler<T>,
) {
  const callbackRef = useRef<EffectEventHandler<T> | null>(null);
  callbackRef.current = callback;

  const stableCallback = useCallback((...args: T) => {
    if (callbackRef.current) {
      return callbackRef.current(...args);
    }
  }, []);

  return stableCallback;
}
