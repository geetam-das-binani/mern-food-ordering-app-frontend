import { cuisineList } from "@/config/restaurant-options-config";
import { Fragment } from "react";
import { Label } from "./ui/label";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "./ui/button";

type Props = {
  isExpanded: boolean;
  onExpandedClick: () => void;
  onChange: (cuisines: string[]) => void;
  selectedCuisines: string[];
};
const CuisinesFilter = ({
  isExpanded,
  onChange,
  onExpandedClick,
  selectedCuisines,
}: Props) => {
  const handleCuisinesFilterReset = () => {
    onChange([]);
  };
  const handleCuisinesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: clickedCuisine, checked } = e.target;
    if (checked) {
      onChange([...selectedCuisines, clickedCuisine]);
    } else {
      onChange(
        selectedCuisines.filter((cuisine) => cuisine !== clickedCuisine)
      );
    }
  };

  return (
    <Fragment>
      <div className="flex items-center justify-between px-2">
        <div className="mb-2 font-semibold text-md">Filter By Cuisines</div>
        <div
          onClick={handleCuisinesFilterReset}
          className="mb-2 text-sm font-semibold text-blue-500 underline cursor-pointer"
        >
          Reset Filters
        </div>
      </div>

      <div className="flex flex-col space-y-1">
        {cuisineList
          .slice(0, isExpanded ? cuisineList.length : 7)
          .map((cuisine) => {
            const isSelected = selectedCuisines.includes(cuisine);
            return (
              <div key={cuisine} className="flex">
                <input
                  id={`cuisine_${cuisine}`}
                  type="checkbox"
                  className="hidden"
                  value={cuisine}
                  checked={isSelected}
                  onChange={handleCuisinesChange}
                />
                <Label
                  className={`flex flex-1 items-center rounded-full py-4 font-semibold px-4 cursor-pointer text-sm ${
                    isSelected
                      ? "border border-green-600 text-green-600"
                      : "border border-slate-300"
                  }`}
                  htmlFor={`cuisine_${cuisine}`}
                >
                  {isSelected && <Check size={20} strokeWidth={3} />}

                  {cuisine}
                </Label>
              </div>
            );
          })}

        <Button
          variant={"link"}
          className="flex-1 mt-4"
          onClick={onExpandedClick}
        >
          {isExpanded ? (
            <span className="flex items-center ">
              View Less <ChevronUp  />
            </span>
          ) : (
            <span className="flex items-center">
              View More <ChevronDown />
            </span>
          )}
        </Button>
      </div>
    </Fragment>
  );
};

export default CuisinesFilter;
