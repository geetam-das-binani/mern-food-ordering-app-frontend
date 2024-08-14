import { useFormContext } from "react-hook-form";
import { RestaurantFormData } from "./ManageRestaurantForm";

import {
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { cuisineList } from "@/config/restaurant-options-config";
import CuisineCheckbox from "./CuisineCheckbox";
const CuisinesSection = () => {
  const { control } = useFormContext<RestaurantFormData>();
  return (
    <div className="space-y-2">
      <div>
        <h2 className="text-2xl font-bold">Cuisines</h2>
        <FormDescription>
          Select the cuisines that best describe your restaurant
        </FormDescription>
      </div>
      
        <FormField
          name="cuisines"
          control={control}
          render={({ field }) => (
            <FormItem>
             <div className="grid gap-1 md:grid-cols-5">
              {cuisineList.map((cuisineItem) => (
                <CuisineCheckbox key={cuisineItem} cuisine={cuisineItem} field={field} />
              ))}
               </div>
              <FormMessage />
            </FormItem>
          )}
        />
     
    </div>
  );
};

export default CuisinesSection;
