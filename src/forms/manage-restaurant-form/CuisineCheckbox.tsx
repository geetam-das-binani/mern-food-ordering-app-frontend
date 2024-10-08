import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormItem,
  FormLabel,
  
} from "@/components/ui/form";
import { ControllerRenderProps } from "react-hook-form";
import { RestaurantFormData } from "./ManageRestaurantForm";

type Props = {
  cuisine: string;
  field: ControllerRenderProps<RestaurantFormData, "cuisines">;
};
const CuisineCheckbox = ({ cuisine, field }: Props) => {
  return (
    <FormItem className="flex flex-row items-center mt-2 space-x-1 space-y-0">
      <FormControl>
        <Checkbox
          className="bg-white"
          checked={field.value?.includes(cuisine)}
          onCheckedChange={(checked) => {
            return checked
              ? field.onChange([...field.value, cuisine])
              : field.onChange(
                  field.value?.filter((value: string) => value !== cuisine)
                );
          }}
        />
      </FormControl>
      <FormLabel className="text-sm font-normal">{cuisine}</FormLabel>
    </FormItem>
  );
};

export default CuisineCheckbox;
