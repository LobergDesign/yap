<template>
  <main class="container">
    <h1>Variable Font Hover Test</h1>

    <div class="font-grid">
      <!-- Google Font -->
      <div class="font-sample">
        <p class="nunito">
          Inside every person is a whole world. This is the greatest gift. And
          only some are generous enough to share theirs with us.
        </p>
        <p class="hover-text nunito">(yap)</p>
      </div>

      <!-- Local Font -->
      <div class="font-sample">
        <p class="zt-nature">
          Inside every person is a whole world. This is the greatest gift. And
          only some are generous enough to share theirs with us.
        </p>
        <p class="hover-text zt-nature">(yap)</p>
      </div>
    </div>
  </main>
</template>

<style scoped>
.container {
  min-height: 100dvh;
  display: grid;
  place-items: center;
  padding: 2rem;
}

h1 {
  font-size: 2rem;
  margin-bottom: 3rem;
}

.font-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 3rem;
  width: 100%;
  max-width: 1000px;
}

.font-sample {
  text-align: center;
}

.font-sample h2 {
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  color: #666;
}

.hover-text {
  font-size: clamp(2rem, 5vw, 4rem);
  cursor: pointer;
  transition: font-variation-settings 0.4s ease;
}
.nunito {
  font-family: 'Nunito Sans', sans-serif;
}
.zt-nature {
  font-family: 'ZT Nature Variable', sans-serif;
}
.hover-text.nunito {
  font-variation-settings: 'wght' 200;
}

.hover-text.nunito:hover {
  font-variation-settings: 'wght' 900;
}

.hover-text.zt-nature {
  font-variation-settings: 'wght' 200;
}

.hover-text.zt-nature:hover {
  font-variation-settings: 'wght' 900;
}
</style>
