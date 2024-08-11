import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "./ui/separator";
import { CircleUserIcon, Menu } from "lucide-react";
import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import MobileNavLinks from "./MobileNavLinks";

const MobileNav = () => {
    const { isAuthenticated, user, loginWithRedirect } = useAuth0();
    return (
       
         <Sheet >
            <SheetTrigger >
                <Menu className="text-orange-500" />
            </SheetTrigger>
            <SheetContent className="space-y-3">
                <SheetTitle>
                    {isAuthenticated ? (
                        <span className="flex items-center gap-2">
                            <CircleUserIcon className="text-orange-500" />
                            {user?.email}
                        </span>
                    ) : (
                        <span>Welcome to MernEats.com!</span>
                    )}
                </SheetTitle>
                <Separator />
                <SheetDescription className="flex flex-col gap-4">
                    {
                        isAuthenticated ? (<MobileNavLinks />) :

                            <Button
                            onClick={async () => await loginWithRedirect()}
                            className="flex-1 font-bold bg-orange-500">Log In</Button>
                    }

                </SheetDescription>
            </SheetContent>
        </Sheet>
     
    );
};

export default MobileNav;
