import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import { RestaurantFormData } from "./ManageRestaurantForm";
import { Input } from "@/components/ui/input";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const ImageSection = () => {
  const { control, watch } = useFormContext<RestaurantFormData>();
  const existingImageUrl = watch("imageUrl");

  return (
    <div className="space-y-2">
      <div>
        <h2 className="text-2xl font-bold">Image</h2>
        <FormDescription>
          Add an image that will be displayed on your restaurant listing in the
          search result. Adding a new image will overwrite the previous one.
        </FormDescription>
      </div>
      <div className="flex flex-col gap-8 md:w-[50%]">
        {existingImageUrl && (
          <AspectRatio ratio={16 / 9}>
            <img
              src={existingImageUrl}
              alt="restaurantImage"
              className="object-cover w-full h-full rounded-md"
            />
           </AspectRatio>
        )}
        <FormField
          control={control}
          name="imageFile"
          render={({
            field: { name, onBlur, onChange: onImageChange, ref, disabled },
          }) => (
            <FormItem>
              <FormControl>
                <Input
                  onChange={(e) =>
                    onImageChange(e.target.files ? e.target.files?.[0] : null)
                  }
                  accept=".jpg,.jpeg,.png"
                  type="file"
                  name={name}
                  onBlur={onBlur}
                  ref={ref}
                  disabled={disabled}
                  className="bg-white"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default ImageSection;
