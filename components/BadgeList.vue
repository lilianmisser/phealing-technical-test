<script setup lang="ts">
defineProps<{
  items: string[];
}>();

const defaultBadgeColor = "gray";
</script>

<template>
  <ul class="flex flex-wrap gap-1 mt-1">
    <li v-for="item in items" :key="item">
      <UBadge
        :color="defaultBadgeColor"
        variant="solid"
        :ui="{ rounded: 'rounded-full' }"
      >
        <span class="whitespace-nowrap">
          {{ item }}
        </span>
      </UBadge>
    </li>
  </ul>
</template>
