/**
 * Minimal error handler for portfolio app
 * Routes fatal errors (500+, 404) to error.vue page
 * Logs other errors for debugging
 */
export const useErrorHandler = () => {
  const isDev = import.meta.dev;

  /**
   * Handle errors - show error page for fatal errors, log others
   */
  const handleError = (error: unknown) => {
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
  const parseError = (error: unknown) => {
    // Nuxt error format
    if (error && typeof error === 'object' && 'statusCode' in error) {
      const err = error as {
        statusCode?: number;
        statusMessage?: string;
        message?: string;
        data?: unknown;
      };

      return {
        statusCode: err.statusCode || 500,
        message: err.statusMessage || err.message || 'An error occurred',
        data: err.data,
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
   * Determine if error should show error.vue page
   * Show for: 404 (not found) and 500+ (server errors)
   */
  const shouldShowErrorPage = (statusCode: number): boolean => {
    return statusCode === 404 || statusCode >= 500;
  };

  return {
    handleError,
  };
};
