import { SearchState } from "@/pages/SearchPage";
import { SearchResults } from "@/types/types";
import { useQuery } from "@tanstack/react-query";


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useSearchRestaurant = (searchState:SearchState,city?: string) => {
  const params=new URLSearchParams();

  params.set("page",searchState.page.toString());
  params.set("searchQuery", searchState.searchQuery);
  params.set("selectedCuisines", searchState.selectedCuisines.join(","));
  params.set("sortOption", searchState.sortOption);

  
  const createSearchRequest = async ():Promise<SearchResults> => {
    const response = await fetch(
      `${API_BASE_URL}/api/restaurant/search/${city}?${params.toString()}`
    );

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }

    return data;
  };

  const { data: results, isLoading } = useQuery({
    queryKey: ["search-restaurant", city,searchState],
    queryFn: createSearchRequest,
    enabled: !!city,
  });

  

  return { results, isLoading };
};
