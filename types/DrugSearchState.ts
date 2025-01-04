export type DrugSearchState = {
  filters: {
    activeIngredients: string[];
    routes: string[];
  };
  page: number;
};
