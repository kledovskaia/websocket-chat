<script setup>
  import Title from './Title.vue'
</script>

<template>
    <header>
    <img alt="Vue logo" class="logo" src="../assets/logo.svg" width="125" height="125" />
    <div class="wrapper">
      <Title>Websocket Chat</Title>
    </div>
  </header>
</template>

<style>
  header {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 2rem;
    padding-right: calc(var(--section-gap) / 2);
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
</style>