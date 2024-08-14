import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import { RestaurantFormData } from "./ManageRestaurantForm";

const DetailsSection = () => {
  const { control } = useFormContext<RestaurantFormData>();
  return (
    <div className="space-y-2">
      <div>
        <h2 className="text-2xl font-bold">Details </h2>
        <FormDescription>Enter the details of your restaurant</FormDescription>
      </div>
      <FormField
        control={control}
        name="restaurantName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input className="bg-white" placeholder="Name" {...field} />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />
      <div className="flex gap-4">
        <FormField
          control={control}
          name="city"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input className="bg-white" placeholder="City" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="country"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Country</FormLabel>
              <FormControl>
                <Input className="bg-white" placeholder="country" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={control}
        name="deliveryPrice"
        render={({ field }) => (
          <FormItem className="max-w-[25%]">
            <FormLabel>Delivery Price ₹</FormLabel>
            <FormControl>
              <Input className="bg-white" placeholder="₹100" {...field} />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="estimatedDeliveryTime"
        render={({ field }) => (
          <FormItem className="max-w-[25%]">
            <FormLabel>Estimated Delivery Time (minutes)</FormLabel>
            <FormControl>
              <Input className="bg-white" placeholder="30" {...field} />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default DetailsSection;
