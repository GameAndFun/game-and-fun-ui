<script setup lang="ts"></script>

<template>
  <nav>
    <RouterLink to="/">Go to Home</RouterLink>
    <RouterLink to="/about">Go to About</RouterLink>
  </nav>

  <router-view v-slot="{ Component, route }">
    <div :key="route.name">
      <component :is="Component" />
    </div>
  </router-view>
</template>

<style src="@/assets/styles/main.scss"></style>
