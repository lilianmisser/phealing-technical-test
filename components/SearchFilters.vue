<script lang="ts" setup>
import type { DrugSearchState } from "~/types/DrugSearchState";
import type { TermCount } from "~/types/TermCount";

const props = defineProps<{
  activeIngredients: TermCount[] | null;
  routes: TermCount[] | null;
  searchState: DrugSearchState;
}>();
</script>

<template>
  <USelectMenu
    class="max-w-sm w-full"
    v-if="props.activeIngredients !== null"
    v-model="props.searchState.filters.activeIngredients"
    :options="props.activeIngredients.map((ai) => ai.term)"
    placeholder="Select Active Ingredients"
    searchable
    multiple
    size="lg"
    ><template #label>
      <span
        v-if="props.searchState.filters.activeIngredients.length"
        class="truncate"
        >{{ props.searchState.filters.activeIngredients.join(", ") }}</span
      >
      <span v-else>Select Active Ingredients</span>
    </template></USelectMenu
  >
  <USelectMenu
    class="max-w-sm w-full"
    v-if="props.routes !== null"
    v-model="props.searchState.filters.routes"
    :options="props.routes.map((r) => r.term)"
    placeholder="Select Routes"
    searchable
    multiple
    size="lg"
  >
    <template #label>
      <span v-if="props.searchState.filters.routes.length" class="truncate">{{
        props.searchState.filters.routes.join(", ")
      }}</span>
      <span v-else>Select Routes</span>
    </template>
  </USelectMenu>
</template>
