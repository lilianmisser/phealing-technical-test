<script setup lang="ts">
defineProps<{
  title: string;
  content?: string | string[];
}>();
</script>

<template>
  <div class="text-sm">
    <p class="font-medium text-gray-600">{{ title }}</p>
    <p v-if="content && !Array.isArray(content)">{{ content }}</p>
    <p v-if="content && Array.isArray(content)">{{ content.join(", ") }}</p>
    <slot v-else></slot>
  </div>
</template>
