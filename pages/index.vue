<script setup lang="ts">
import SearchFilters from "~/components/SearchFilters.vue";
import { MAX_SKIP_VALUE } from "~/constants/general";
import type { Drug } from "~/types/Drug";
import type { DrugSearchState } from "~/types/DrugSearchState";
import type { TermCount } from "~/types/TermCount";

const { data: activeIngredients } = await useFetch<TermCount[]>(
  "/api/drugs/activeIngredients"
);
const { data: routes } = await useFetch<TermCount[]>("/api/drugs/routes");

const searchState = reactive<DrugSearchState>({
  filters: {
    activeIngredients: [],
    routes: [],
  },
  page: 1,
});

const drugs = ref<{ total: number; results: Drug[] }>();
const isLoading = ref(false);
const isErrored = ref(false);

const fetchDrugs = async () => {
  isLoading.value = true;
  isErrored.value = false;

  try {
    const data = await $fetch<{ total: number; results: Drug[] }>(
      "/api/drugs",
      {
        query: {
          page: searchState.page,
          active_ingredients: searchState.filters.activeIngredients,
          routes: searchState.filters.routes,
        },
      }
    );
    drugs.value = data || undefined;
  } catch (err) {
    isErrored.value = true;
  } finally {
    isLoading.value = false;
  }
};

watch(
  () => searchState.filters,
  () => {
    searchState.page = 1;
  },
  { deep: true }
);

watch(searchState, fetchDrugs, { deep: true });

const maxEntries = computed(() => {
  if (!drugs.value) {
    return 0;
  }

  return Math.min(MAX_SKIP_VALUE, drugs.value.total);
});

fetchDrugs();
</script>

<template>
  <div class="container mx-auto mt-4 mb-16">
    <h1 class="text-5xl font-bold mb-10">OpenFDA Drug List</h1>
    <div class="flex flex-col md:flex-row gap-2 mb-4">
      <SearchFilters
        :activeIngredients="activeIngredients"
        :routes="routes"
        :searchState="searchState"
      />
    </div>
    <div v-if="isLoading">
      <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <li v-for="n in 12" :key="n">
          <DrugCardSkeleton />
        </li>
      </ul>
    </div>
    <div v-else-if="isErrored">Unexpected Errror</div>
    <div v-else-if="!drugs?.results || drugs.results.length === 0">
      No results found
    </div>
    <div v-else>
      <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <li v-for="drug in drugs.results" :key="drug.id">
          <DrugCard :drug="drug" />
        </li>
      </ul>
      <div class="w-full flex mt-4">
        <UPagination
          class="mx-auto"
          size="lg"
          v-model="searchState.page"
          :page-count="12"
          :total="maxEntries"
        />
      </div>
    </div>
  </div>
</template>
