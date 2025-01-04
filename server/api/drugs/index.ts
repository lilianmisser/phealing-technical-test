import { z } from "zod";
import { ITEMS_PER_PAGE } from "~/constants/general";
import { Drug } from "~/types/Drug";
import { DrugOpenFdaResponse } from "~/types/DrugOpenFdaResponse";

const limit = ITEMS_PER_PAGE;

const querySchema = z.object({
  page: z.coerce.number().min(1),
  active_ingredients: z
    .union([z.string(), z.array(z.string())])
    .transform((value) => (typeof value === "string" ? [value] : value))
    .optional(),
  routes: z
    .union([z.string(), z.array(z.string())])
    .transform((value) => (typeof value === "string" ? [value] : value))
    .optional(),
});

function buildSearchParams(activeIngredients?: string[], routes?: string[]) {
  const params = [];
  if (activeIngredients?.length) {
    params.push(`active_ingredients.name:(${activeIngredients.join("+OR+")})`);
  }
  if (routes?.length) {
    params.push(`route:(${routes.join("+OR+")})`);
  }
  return params.join("+AND+");
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  const query = getQuery(event);
  const parsedQuery = querySchema.safeParse(query);

  if (!parsedQuery.success) {
    return { statusCode: 400, message: parsedQuery.error };
  }

  const resultsToSkip = (parsedQuery.data.page - 1) * limit;
  const { active_ingredients, routes } = parsedQuery.data;

  const params = new URLSearchParams({
    api_key: config.openFdaApiKey,
    limit: String(limit),
    skip: String(resultsToSkip),
  });

  const searchQuery = buildSearchParams(active_ingredients, routes);

  // Search Query is appended manually because its syntax gets encoded differently if its appended in url search params
  const apiUrl = `${
    config.public.openFdaApiUrl
  }?search=${searchQuery}&${params.toString()}`;

  try {
    const response = await fetch(apiUrl);

    // OpenFDA API returns 404 when there are no results
    if (response.status === 404) {
      return {
        total: 0,
        results: [],
      };
    }

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const data: DrugOpenFdaResponse = await response.json();
    const formattedData = {
      total: data.meta.results.total,
      results: data.results.map<Drug>((drug) => ({
        id: drug.product_ndc,
        genericName: drug.generic_name,
        labelerName: drug.labeler_name,
        brandName: drug.brand_name,
        activeIngredients: drug.active_ingredients,
        packaging: drug.packaging.map((packaging) => ({
          id: packaging.package_ndc,
          description: packaging.description,
          sample: packaging.sample,
        })),
        routes: drug.route || [],
      })),
    };

    return formattedData;
  } catch (error: any) {
    if (error) return { statusCode: 500, message: error.message };
  }
});
