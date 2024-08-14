import { useFormContext } from "react-hook-form";
import { RestaurantFormData } from "./ManageRestaurantForm";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Props = {
  index: number;
  removeMenuItem: () => void;
};
const MenuItemInput = ({ index, removeMenuItem }: Props) => {
  const { control } = useFormContext<RestaurantFormData>();
  return (
    <div className="flex flex-row items-end gap-2">
      <FormField
        control={control}
        name={`menuItems.${index}.name`}
        render={({ field }) => (
          <FormItem className="flex flex-col items-start gap-1">
            <FormLabel>
              Name <FormMessage />
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="Cheese Pizza"
                className="bg-white"
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name={`menuItems.${index}.price`}
        render={({ field }) => (
          <FormItem className="flex flex-col items-start gap-1">
            <FormLabel>
              Price(₹) <FormMessage />
            </FormLabel>
            <FormControl>
              <Input 
              {...field}
               placeholder="₹10.99" 
               className="bg-white" />
            </FormControl>
          </FormItem>
        )}
      />
      <Button
        type="button"
        onClick={removeMenuItem}
        className="bg-red-500 max-h-fit"
      >
        Remove
      </Button>
    </div>
  );
};

export default MenuItemInput;
