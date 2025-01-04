export type Drug = {
  id: string;
  genericName: string;
  labelerName: string;
  brandName: string;
  activeIngredients: {
    name: string;
    strength: string;
  }[];
  packaging: {
    id: string;
    description: string;
    sample: boolean;
  }[];
  routes: string[];
};
