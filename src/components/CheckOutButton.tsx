import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import LoadingButton from "./LoadingButton";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";

import UserProfileForm, {
  UserFormData,
} from "@/forms/user-profile-form/UserProfileForm";
import { useGetMyUser } from "@/api/MyUserApi";
import { User } from "@/types/types";

type Props = {
  onCheckOut: (userFormData: UserFormData) => void;
  disabled: boolean;
  isLoading:boolean
};
const CheckOutButton = ({ onCheckOut, disabled ,isLoading}: Props) => {
  const {
    isAuthenticated,
    isLoading: isAuthLoading,
    loginWithRedirect,
  } = useAuth0();
  const { pathname } = useLocation();
  const { currentUser } = useGetMyUser();

  const onLogin = async () => {
    loginWithRedirect({ appState: { returnTo: pathname } });
  };

  if (isAuthLoading) {
    return <LoadingButton />;
  }

  if (!isAuthenticated || !currentUser?._id) {
    return (
      <Button onClick={onLogin} className="flex-1 bg-orange-500">
        Login To Check Out
      </Button>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={disabled} className="flex-1 bg-orange-500">
          {" "}
          Go to Check Out
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-[425px] md:min-w-[700px] bg-gray-50">
        <UserProfileForm
          currentUser={currentUser as User}
          onSave={onCheckOut}
          isLoading={isLoading}
          buttonText="Continue To Payment"
          title="Confirm Your Delivery Details"
        />
      </DialogContent>
    </Dialog>
  );
};

export default CheckOutButton;
