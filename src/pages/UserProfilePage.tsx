import { useGetMyUser, useUpdateMyUser } from "@/api/MyUserApi";
import UserProfileForm from "@/forms/user-profile-form/UserProfileForm";
import { User } from "@/types/types";

const UserProfilePage = () => {
  const { currentUser, isPending } = useGetMyUser();
  const { isLoading, updateUser } = useUpdateMyUser();

  if (isPending)
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <div className="inline-block  h-24 w-24 animate-spin rounded-full border-4 border-gray-500 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white" />
      </div>
    );

 

  return (
    <UserProfileForm
      currentUser={currentUser as User}
      isLoading={isLoading}
      onSave={updateUser}
    />
  );
};

export default UserProfilePage;
