import { useSearchRestaurant } from "@/api/RestaurantSearchApi";
import { useParams } from "react-router-dom";
import SearchResultsInfo from "../components/SearchResultsInfo";
import SearchResultsCard from "@/components/SearchResultsCard";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import { useState } from "react";
import PaginationSelector from "@/components/PaginationSelector";
import CuisinesFilter from "@/components/CuisinesFilter";
import SortOptionDropDown from "@/components/SortOptionDropDown";

export type SearchState = {
  searchQuery: string;
  page: number;
  selectedCuisines: string[];
  sortOption: string;
};

const SearchPage = () => {
  const { city } = useParams();
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: "",
    page: 1,
    selectedCuisines: [],
    sortOption: "",
  });
  const { isLoading, results } = useSearchRestaurant(searchState, city);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <div className="inline-block  h-24 w-24 animate-spin rounded-full border-4 border-gray-500 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white" />
      </div>
    );
  }
  if (!results?.data || !city) {
    return <span>No results found</span>;
  }

  const handleSearch = (searchFormData: SearchForm) => {
    setSearchState((prev) => ({
      ...prev,
      searchQuery: searchFormData.searchQuery,
      page: 1,
    }));
  };
  const resetSearch = () => {
    setSearchState((prev) => ({ ...prev, searchQuery: "", page: 1 }));
  };
  const handlePageChange = (pageNumber: number) => {
    setSearchState((prev) => ({ ...prev, page: pageNumber }));
  };
  const handleCuisinesChange = (cuisines: string[]) => {
    setSearchState((prev) => ({
      ...prev,
      selectedCuisines: cuisines,
      page: 1,
    }));
  };
  const setSortOption = (sortOption: string) => {
    setSearchState((prev) => ({
      ...prev,
      sortOption: sortOption === "none" ? "" : sortOption,
      page: 1,
    }));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div id="cuisines-list">
        <CuisinesFilter
          selectedCuisines={searchState.selectedCuisines}
          onChange={handleCuisinesChange}
          isExpanded={isExpanded}
          onExpandedClick={() => setIsExpanded((prev) => !prev)}
        />
      </div>
      <div id="main-content" className="flex flex-col gap-5">
        <div className="flex flex-col justify-between gap-3 lg:flex-row">
          <SearchResultsInfo total={results.pagination.total} city={city} />
          <SortOptionDropDown onChange={setSortOption} />
        </div>

        <SearchBar
          searchQuery={searchState.searchQuery}
          onSubmit={handleSearch}
          placeHolder="Search By Restaurant Name or Cuisines"
          onReset={resetSearch}
        />
        {results?.data.map((restaurant) => (
          <SearchResultsCard key={restaurant._id} restaurant={restaurant} />
        ))}
        <PaginationSelector
          page={results.pagination.page}
          totalPages={results.pagination.totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default SearchPage;
