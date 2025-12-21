<script setup lang="ts">
import type { NuxtError } from '#app';

const { error = { statusCode: 0, statusMessage: '', data: {} } } = defineProps({
  error: Object as () => NuxtError,
});

const isDev = import.meta.dev;

const errorMessages: Record<number, { title: string; message: string }> = {
  400: {
    title: 'Bad Request',
    message: 'The request could not be understood.',
  },
  401: {
    title: 'Authentication Required',
    message: 'Please log in to access this page.',
  },
  403: {
    title: 'Access Denied',
    message: 'You do not have permission to access this resource.',
  },
  404: {
    title: 'Page Not Found',
    message: "The page you're looking for doesn't exist.",
  },
  500: {
    title: 'Server Error',
    message: 'Something went wrong. Please try again later.',
  },
  503: {
    title: 'Service Unavailable',
    message: 'The service is temporarily unavailable.',
  },
  504: {
    title: 'Request Timeout',
    message: 'The request took too long.',
  },
};

/**
 * Get display error message based on status code
 * Defaults to generic message if code not mapped
 */
const displayError = computed(() => {
  const code = error?.statusCode || 500;
  return (
    errorMessages[code] || {
      title: 'An Error Occurred',
      message: error?.statusMessage || 'Please try again later.',
    }
  );
});

const handleClearError = () => clearError({ redirect: '/' });
</script>

<template>
  <div v-if="error">
    <h1>{{ error?.statusCode || 500 }} - {{ displayError.title }}</h1>
    <p>{{ displayError.message }}</p>

    <div v-if="isDev">
      <details>
        <summary>Technical Details (dev only)</summary>
        <p><strong>Message:</strong> {{ error?.statusMessage }}</p>
        <pre v-if="error?.data">{{ JSON.stringify(error.data, null, 2) }}</pre>
      </details>
    </div>

    <button @click="handleClearError">Go Home</button>
    <button @click="() => clearError()">Try Again</button>
  </div>
</template>
