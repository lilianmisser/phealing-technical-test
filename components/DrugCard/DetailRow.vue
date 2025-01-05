<script setup lang="ts">
defineProps<{
  title: string;
}>();
</script>

<template>
  <div class="flex flex-col">
    <span class="font-medium text-gray-600 mb-1">{{ title }}</span>
    <slot></slot>
  </div>
</template>
