import type { NuxtError } from '#app';

interface ParsedError {
  statusCode: number;
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
        statusCode: parsed.statusCode,
        message: parsed.message,
        data: parsed.data,
      });
    }

    // Show error page for fatal errors
    if (shouldShowErrorPage(parsed.statusCode)) {
      showError({
        statusCode: parsed.statusCode,
        statusMessage: parsed.message,
        data: parsed.data,
        fatal: true,
      });
    } else {
      // Just log non-fatal errors
      console.error('[Non-fatal error]', parsed.message);
    }
  };

  /**
   * Parse error into consistent format
   */
  const parseError = (error: unknown): ParsedError => {
    // Nuxt error format
    if (isNuxtError(error)) {
      return {
        statusCode: error.statusCode || 500,
        message: error.statusMessage || error.message || 'An error occurred',
        data: error.data,
      };
    }

    // Generic Error
    if (error instanceof Error) {
      return {
        statusCode: 500,
        message: error.message,
        data: null,
      };
    }

    // Unknown error type
    return {
      statusCode: 500,
      message: String(error),
      data: null,
    };
  };

  /**
   * Type guard for Nuxt errors
   */
  const isNuxtError = (error: unknown): error is NuxtError =>
    error !== null && typeof error === 'object' && 'statusCode' in error;

  /**
   * Determine if error should show error.vue page
   * Show for: 404 (not found) and 500+ (server errors)
   */
  const shouldShowErrorPage = (statusCode: number): boolean =>
    statusCode === 404 || statusCode >= 500;

  return {
    handleError,
  };
};
