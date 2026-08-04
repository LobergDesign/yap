import type { Ref } from 'vue';
import type { NuxtError } from '#app';

interface ParsedError {
  status: number;
  message: string;
  data: unknown;
}

/**
 * Routes fatal errors (500+, 404) to error.vue page
 * Logs other errors for debugging
 */
export const useErrorHandler = () => {
  const isDev = import.meta.dev;

  /**
   * Handle errors - show error page for fatal errors, log others
   */
  const handleError = (error: unknown): void => {
    const parsed = parseError(error);
    // Log all errors in development
    if (isDev) {
      console.error('[Error Handler]', {
        status: parsed.status,
        message: parsed.message,
        data: parsed.data,
      });
    }

    // Show error page for fatal errors
    if (shouldShowErrorPage(parsed.status)) {
      showError({
        status: parsed.status,
        statusText: parsed.message,
        data: parsed.data,
        fatal: true,
      });
    } else {
      // Just log non-fatal errors
      console.error('[Non-fatal error]', parsed.message);
    }
  };

  /**
   * Watch an error ref from useAsyncData and route it through handleError.
   *
   * `immediate` is required: useAsyncData resolves before the caller can
   * register a watcher, so on SSR the error is already set by then and a
   * non-immediate watcher would never fire.
   */
  const watchError = <T>(error: Ref<T>): void => {
    watch(
      error,
      (err) => {
        if (err) handleError(err);
      },
      { immediate: true }
    );
  };

  /**
   * Parse error into consistent format
   */
  const parseError = (error: unknown): ParsedError => {
    // Nuxt error format
    if (isNuxtError(error)) {
      return {
        status: error.status || 500,
        message: error.statusText || error.message || 'An error occurred',
        data: error.data,
      };
    }

    // Generic Error
    if (error instanceof Error) {
      return {
        status: 500,
        message: error.message,
        data: null,
      };
    }

    // Unknown error type
    return {
      status: 500,
      message: String(error),
      data: null,
    };
  };

  /**
   * Type guard for Nuxt errors
   */
  const isNuxtError = (error: unknown): error is NuxtError =>
    error !== null && typeof error === 'object' && 'status' in error;

  /**
   * Determine if error should show error.vue page
   * Show for: 404 (not found) and 500+ (server errors)
   */
  const shouldShowErrorPage = (status: number): boolean =>
    status === 404 || status >= 500;

  return {
    handleError,
    watchError,
  };
};
