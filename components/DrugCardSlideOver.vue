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
          <h3
            class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
          >
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
          <p class="font-bold">Generic Name</p>
          <p>{{ drug.genericName }}</p>
        </div>
        <div class="text-sm">
          <p class="font-bold">Brand Name</p>
          <p>{{ drug.brandName }}</p>
        </div>
        <div class="text-sm">
          <p class="font-bold">Manufacturer</p>
          <p>{{ drug.brandName }}</p>
        </div>
        <div class="text-sm">
          <p class="font-bold">Active Substances</p>
          <p>{{ drug.activeIngredients.map((ai) => ai.name).join(", ") }}</p>
        </div>
        <div class="text-sm">
          <p class="font-bold">Administration Routes</p>
          <p>{{ drug.routes.join(", ") }}</p>
        </div>
        <div class="text-sm">
          <p class="font-bold">Packaging</p>
          <p>{{ drug.packaging.map((p) => p.description).join(", ") }}</p>
        </div>
      </section>
    </UCard>
  </USlideover>
</template>
