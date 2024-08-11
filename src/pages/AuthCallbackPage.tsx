import { useCreateMyUser } from "@/api/MyUserApi";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const AuthCallbackPage = () => {
  const { user } = useAuth0();
  const { createUser } = useCreateMyUser();
  const navigate = useNavigate();
  const hasCreatedUser=useRef(false)

  useEffect(() => {
    if (user?.sub && user?.email && !hasCreatedUser.current) {
      createUser({ email: user.email, authOId: user.sub });
      hasCreatedUser.current=true
      navigate("/");
    }
  }, [navigate,createUser,user]);
  return <>Loading...</>
};

export default AuthCallbackPage;
