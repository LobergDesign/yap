<script lang="ts" setup>
const { data } = await useFrontpage();
</script>

<template>
  <div>
    <h1>(yap)</h1>

    <pre>
      {{ data }}
    </pre>
    <!-- <pre>

    error;  {{ error }}
    </pre>
    <pre>
    status:  {{ status }}
    </pre>
    <pre>
    pending:  {{ pending }}
    </pre> -->
  </div>
</template>

<style></style>
