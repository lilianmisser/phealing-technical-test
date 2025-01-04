import { TermCount } from "~/types/TermCount";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  const apiUrl = `${config.public.openFdaApiUrl}?count=route.exact`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch routes: ${response.statusText}`);
    }

    const data: { results: TermCount[] } = await response.json();
    return data.results.sort((a, b) => a.term.localeCompare(b.term));
  } catch (error: any) {
    return { statusCode: 500, message: error.message };
  }
});
