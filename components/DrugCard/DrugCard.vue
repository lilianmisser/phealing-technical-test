<script setup lang="ts">
import type { Drug } from "~/types/Drug";
import DetailRow from "./DetailRow.vue";

const isSlideOverOpen = ref(false);

function openSlideOver() {
  isSlideOverOpen.value = true;
}

function closeSlideOver() {
  isSlideOverOpen.value = false;
}

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
      <DetailRow title="Manufacturer">
        <span>{{ drug.labelerName }}</span>
      </DetailRow>
      <DetailRow title="Administration Routes">
        <BadgeList :items="drug.routes" />
      </DetailRow>
      <DetailRow title="Active Ingredients">
        <BadgeList :items="drug.activeIngredients.map((ai) => ai.name)" />
      </DetailRow>
    </div>
  </UCard>
  <DrugCardSlideOver
    :isSlideOverOpen="isSlideOverOpen"
    :drug="drug"
    :closeSlideOver="closeSlideOver"
  />
</template>
