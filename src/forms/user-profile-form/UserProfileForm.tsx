import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
 
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/LoadingButton";
import { User } from "@/types/types";
import { useEffect } from "react";
const formSchema = z.object({
  email: z.string().optional(),
  name: z.string().min(3, "Name is required"),
  city: z.string().min(3, "City is required"),
  country: z.string().min(3, "Country is required"),
  addressLine1: z.string().min(3, "Address line 1 is required"),
});

export type UserFormData = z.infer<typeof formSchema>;

type Props = {
  onSave: (userProfileData: UserFormData) => void;
  isLoading: boolean;
  currentUser: User;
  buttonText?:string,
  title?:string
};
const UserProfileForm = ({ isLoading, onSave, currentUser,buttonText="Submit",title="User Profile" }: Props) => {
  const form = useForm<UserFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: currentUser,
  });

  useEffect(() => {
    form.reset(currentUser);
  }, [currentUser, form]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSave)}
        className="p-10 space-y-4 rounded-lg bg-gray-50"
      >
        <div>
          <h2 className="text-xl font-bold md:text-2xl">{title}</h2>
          <FormDescription>
            View and change your profile information here
          </FormDescription>
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  disabled
                  className="bg-white "
                  placeholder="email"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input className="bg-white " placeholder="name" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col gap-4 md:flex-row">
          <FormField
            control={form.control}
            name="addressLine1"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel> Address Line 1</FormLabel>
                <FormControl>
                  <Input className="bg-white " placeholder="name" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel> City</FormLabel>
                <FormControl>
                  <Input className="bg-white " placeholder="name" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel> Country</FormLabel>
                <FormControl>
                  <Input className="bg-white " placeholder="name" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {isLoading ? (
          <LoadingButton />
        ) : (
          <Button className="bg-orange-500" type="submit">
           {buttonText}
          </Button>
        )}
      </form>
    </Form>
  );
};

export default UserProfileForm;
