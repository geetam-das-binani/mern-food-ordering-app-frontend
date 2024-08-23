import { SearchState } from "@/pages/SearchPage";
import { Restaurant, SearchResults } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useSearchRestaurant = (
  searchState: SearchState,
  city?: string
) => {
  const params = new URLSearchParams();

  params.set("page", searchState.page.toString());
  params.set("searchQuery", searchState.searchQuery);
  params.set("selectedCuisines", searchState.selectedCuisines.join(","));
  params.set("sortOption", searchState.sortOption);

  const createSearchRequest = async (): Promise<SearchResults> => {
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
    queryKey: ["search-restaurant", city, searchState],
    queryFn: createSearchRequest,
    enabled: !!city,
  });

  return { results, isLoading };
};

export const useGetRestaurant = (id: string) => {
  const getRestaurantRequest = async (): Promise<Restaurant> => {
    const response = await fetch(`${API_BASE_URL}/api/my/restaurant/${id}`);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    return data;
  };
  const { data: restaurant, isLoading , error} = useQuery({
    queryKey: ["get-restaurant"],
    queryFn: getRestaurantRequest,
    enabled: !!id,
  });
  if(error){
   toast.error(error?.message)
  }

  return { restaurant, isLoading };
};
