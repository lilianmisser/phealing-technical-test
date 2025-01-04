<script setup lang="ts">
import type { Drug } from "~/types/Drug";

const isSlideOverOpen = ref(false);

const openSlideOver = () => {
  isSlideOverOpen.value = true;
};

const closeSlideOver = () => {
  isSlideOverOpen.value = false;
};

defineProps<{ drug: Drug }>();
</script>

<template>
  <UCard class="h-64">
    <template #header>
      <div class="flex items-center gap-2">
        <span class="font-bold text-lg truncate">{{ drug.genericName }}</span>
        <UButton
          @click="openSlideOver"
          variant="ghost"
          icon="i-material-symbols:search"
          size="sm"
        />
      </div>
    </template>
    <div class="grid gap-2 text-sm">
      <div class="grid grid-cols-3 gap-1">
        <span class="font-medium">Manufacturer</span>
        <span class="col-span-2">{{ drug.labelerName }}</span>
      </div>
      <div class="grid grid-cols-3 gap-1">
        <span class="font-medium">Route</span>
        <span class="col-span-2">{{ drug.routes.join(", ") }}</span>
      </div>
      <div class="grid grid-cols-3 gap-1">
        <span class="font-medium">Active Ingredients</span>
        <span class="col-span-2">{{
          drug.activeIngredients
            ? drug.activeIngredients.map((ai) => ai.name).join(", ")
            : ""
        }}</span>
      </div>
    </div>
  </UCard>
  <DrugCardSlideOver
    :isSlideOverOpen="isSlideOverOpen"
    :drug="drug"
    :closeSlideOver="closeSlideOver"
  />
</template>
