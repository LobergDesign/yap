<script setup lang="ts">
// Simple error testing page (only for development)
if (!import.meta.dev) {
  throw createError({ statusCode: 404 });
}

const { handleError } = useErrorHandler();

const trigger404 = () => {
  // Use handleError to route to error.vue
  handleError(
    createError({
      statusCode: 404,
      statusMessage: 'Test 404 - Page Not Found',
    })
  );
};

const trigger500 = () => {
  handleError(
    createError({
      statusCode: 500,
      statusMessage: 'Test 500 - Server Error',
    })
  );
};

const trigger503 = () => {
  handleError(
    createError({
      statusCode: 503,
      statusMessage: 'Test 503 - Service Unavailable',
    })
  );
};

const trigger400 = () => {
  handleError(
    createError({
      statusCode: 400,
      statusMessage: 'Test 400 - Bad Request (should just log)',
    })
  );
};
</script>

<template>
  <div style="padding: 2rem">
    <h1>Error Testing (Development Only)</h1>
    <p>Click buttons to test error handling:</p>

    <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 300px; margin-top: 2rem">
      <button @click="trigger404" style="padding: 1rem; background: #ef4444; color: white; border: none; border-radius: 0.5rem; cursor: pointer">
        Test 404 Error
      </button>

      <button @click="trigger500" style="padding: 1rem; background: #dc2626; color: white; border: none; border-radius: 0.5rem; cursor: pointer">
        Test 500 Error
      </button>

      <button @click="trigger503" style="padding: 1rem; background: #b91c1c; color: white; border: none; border-radius: 0.5rem; cursor: pointer">
        Test 503 Error
      </button>

      <button @click="trigger400" style="padding: 1rem; background: #f59e0b; color: white; border: none; border-radius: 0.5rem; cursor: pointer">
        Test 400 Error (logs only)
      </button>
    </div>

    <div style="margin-top: 2rem; padding: 1rem; background: #f3f4f6; border-radius: 0.5rem">
      <p><strong>Expected behavior:</strong></p>
      <ul>
        <li>404, 500, 503 → Shows error.vue page</li>
        <li>400 → Logs to console only</li>
      </ul>
    </div>
  </div>
</template>
