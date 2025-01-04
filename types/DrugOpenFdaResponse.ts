export type DrugOpenFdaResponse = {
  meta: {
    results: {
      total: number;
    };
  };
  results: {
    product_ndc: string;
    generic_name: string;
    labeler_name: string;
    brand_name: string;
    active_ingredients: {
      name: string;
      strength: string;
    }[];
    packaging: {
      package_ndc: string;
      description: string;
      sample: boolean;
    }[];
    route?: string[];
  }[];
};
