<script lang="ts" setup>
import type { Drug } from "~/types/Drug";

const props = defineProps<{
  closeSlideOver: () => void;
  isSlideOverOpen: boolean;
  drug: Drug;
}>();
</script>

<template>
  <USlideover v-model="props.isSlideOverOpen">
    <UCard
      class="flex flex-col flex-1"
      :ui="{
        body: { base: 'flex-1' },
        ring: '',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800',
      }"
    >
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-xl font-bold leading-6">
            {{ drug.genericName }}
          </h3>
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            class="-my-1"
            @click="props.closeSlideOver"
          />
        </div>
      </template>
      <section class="flex flex-col gap-4">
        <div class="text-sm">
          <p class="font-medium text-gray-600">Generic Name</p>
          <p>{{ drug.genericName }}</p>
        </div>
        <div class="text-sm">
          <p class="font-medium text-gray-600">Brand Name</p>
          <p>{{ drug.brandName }}</p>
        </div>
        <div class="text-sm">
          <p class="font-medium text-gray-600">Manufacturer</p>
          <p>{{ drug.brandName }}</p>
        </div>
        <div class="text-sm">
          <p class="font-medium text-gray-600">Active Substances</p>
          <ul class="flex flex-row flex-wrap gap-1 mt-1">
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
        <div class="text-sm">
          <p class="font-medium text-gray-600">Administration Routes</p>
          <ul class="flex flex-row gap-1 mt-1">
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
        <div class="text-sm">
          <p class="font-medium text-gray-600">Packaging</p>
          <p>{{ drug.packaging.map((p) => p.description).join(", ") }}</p>
        </div>
      </section>
    </UCard>
  </USlideover>
</template>
