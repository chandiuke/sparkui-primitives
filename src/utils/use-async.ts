import * as React from "react";

export type AsyncStatus = "idle" | "loading" | "success" | "error";

export interface AsyncState<T> {
  data: T | null;
  status: AsyncStatus;
  error: Error | null;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  isIdle: boolean;
}

export interface UseAsyncOptions<T> {
  /** Initial data */
  initialData?: T;
  /** Auto-fetch on mount */
  immediate?: boolean;
  /** Callback on success */
  onSuccess?: (data: T) => void;
  /** Callback on error */
  onError?: (error: Error) => void;
}

export interface UseAsyncReturn<T, Args extends unknown[]> extends AsyncState<T> {
  /** Execute the async function */
  execute: (...args: Args) => Promise<T | null>;
  /** Reset to initial state */
  reset: () => void;
  /** Set data manually */
  setData: (data: T | null) => void;
}

/**
 * Hook for managing async operations with loading states
 * Useful for data fetching in Select, Command, etc.
 */
export function useAsync<T, Args extends unknown[] = []>(
  asyncFn: (...args: Args) => Promise<T>,
  options: UseAsyncOptions<T> = {}
): UseAsyncReturn<T, Args> {
  const { initialData = null, immediate = false, onSuccess, onError } = options;

  const [state, setState] = React.useState<AsyncState<T>>({
    data: initialData as T | null,
    status: "idle",
    error: null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    isIdle: true,
  });

  const mountedRef = React.useRef(true);

  React.useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const execute = React.useCallback(
    async (...args: Args): Promise<T | null> => {
      setState((prev) => ({
        ...prev,
        status: "loading",
        isLoading: true,
        isError: false,
        isSuccess: false,
        isIdle: false,
        error: null,
      }));

      try {
        const data = await asyncFn(...args);
        if (mountedRef.current) {
          setState({
            data,
            status: "success",
            error: null,
            isLoading: false,
            isError: false,
            isSuccess: true,
            isIdle: false,
          });
          onSuccess?.(data);
        }
        return data;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        if (mountedRef.current) {
          setState((prev) => ({
            ...prev,
            status: "error",
            error,
            isLoading: false,
            isError: true,
            isSuccess: false,
            isIdle: false,
          }));
          onError?.(error);
        }
        return null;
      }
    },
    [asyncFn, onSuccess, onError]
  );

  const reset = React.useCallback(() => {
    setState({
      data: initialData as T | null,
      status: "idle",
      error: null,
      isLoading: false,
      isError: false,
      isSuccess: false,
      isIdle: true,
    });
  }, [initialData]);

  const setData = React.useCallback((data: T | null) => {
    setState((prev) => ({ ...prev, data }));
  }, []);

  // Auto-execute on mount if immediate is true
  React.useEffect(() => {
    if (immediate) {
      execute(...([] as unknown as Args));
    }
  }, [immediate]); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    ...state,
    execute,
    reset,
    setData,
  };
}

/**
 * Hook for debounced async operations (useful for search)
 */
export function useDebouncedAsync<T, Args extends unknown[] = []>(
  asyncFn: (...args: Args) => Promise<T>,
  delay: number = 300,
  options: UseAsyncOptions<T> = {}
): UseAsyncReturn<T, Args> & { debouncedExecute: (...args: Args) => void } {
  const asyncState = useAsync(asyncFn, options);
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout>>();

  const debouncedExecute = React.useCallback(
    (...args: Args) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        asyncState.execute(...args);
      }, delay);
    },
    [asyncState.execute, delay]
  );

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    ...asyncState,
    debouncedExecute,
  };
}
