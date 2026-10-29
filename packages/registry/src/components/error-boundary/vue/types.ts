export interface ErrorFallbackProps {
  error: Error;
  reset: () => void;
}

export interface ErrorBoundaryProps {
  /** Called when a descendant throws. The second argument is Vue's error info. */
  onError?: (error: Error, info: string) => void;
  class?: string;
}
