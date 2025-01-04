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
  <UCard class="h-80 hover:shadow-lg transition-shadow">
    <div class="flex items-center mb-2 gap-2">
      <span class="font-bold text-xl truncate">{{ drug.genericName }}</span>
      <UButton
        @click="openSlideOver"
        class="ml-auto"
        variant="ghost"
        color="gray"
        icon="i-rivet-icons:magnifying-glass"
        size="sm"
      />
    </div>
    <div class="space-y-2 text-sm">
      <div class="flex flex-col">
        <span class="font-medium text-gray-600 mb-2">Manufacturer</span>
        <span>{{ drug.labelerName }}</span>
      </div>
      <div>
        <span class="text-sm font-medium text-gray-600"
          >Administration Routes</span
        >
        <ul class="flex flex-row gap-1 mt-2">
          <li v-for="route in drug.routes" :key="route">
            <UBadge
              color="gray"
              variant="solid"
              :ui="{ rounded: 'rounded-full' }"
              >{{ route }}</UBadge
            >
          </li>
        </ul>
      </div>
      <div>
        <span class="font-medium text-gray-600">Active Ingredients</span>
        <ul class="flex flex-row flex-wrap gap-1 mt-2">
          <li
            v-for="activeIngredient in drug.activeIngredients"
            :key="activeIngredient.name"
          >
            <UBadge
              color="gray"
              variant="solid"
              :ui="{ rounded: 'rounded-full' }"
              ><span class="whitespace-nowrap">{{
                activeIngredient.name
              }}</span></UBadge
            >
          </li>
        </ul>
      </div>
    </div>
  </UCard>
  <DrugCardSlideOver
    :isSlideOverOpen="isSlideOverOpen"
    :drug="drug"
    :closeSlideOver="closeSlideOver"
  />
</template>
