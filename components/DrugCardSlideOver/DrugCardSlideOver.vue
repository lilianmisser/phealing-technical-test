<script lang="ts" setup>
import type { Drug } from "~/types/Drug";
import InfoBlock from "./InfoBlock.vue";

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
        <InfoBlock title="Generic Name" :content="drug.genericName" />
        <InfoBlock title="Brand Name" :content="drug.brandName" />
        <InfoBlock title="Manufacturer" :content="drug.labelerName" />
        <InfoBlock title="Active Ingredients">
          <BadgeList :items="drug.activeIngredients.map((a) => a.name)" />
        </InfoBlock>
        <InfoBlock title="Administration Routes">
          <BadgeList :items="drug.routes" />
        </InfoBlock>
        <InfoBlock
          title="Packaging"
          :content="drug.packaging.map((p) => p.description)"
        />
      </section>
    </UCard>
  </USlideover>
</template>
