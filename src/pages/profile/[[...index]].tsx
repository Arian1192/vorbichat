import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { MagicSpinner } from "react-spinners-kit";
import Avatar from "components/avatar/Avatar";

const ProfilePage = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  console.log(user);

  return (
    <>
      {/* if is not userProfile loaded we print a MagicSpinner */}
      {!isLoaded && (
        <div className="flex h-screen w-full items-center justify-center">
          <MagicSpinner size={128} />
        </div>
      )}
      {isSignedIn && (
        <div className="grid h-screen grid-cols-6">
          <div className="col-span-1 flex flex-col items-center justify-center border">
            <Avatar
              size="w-24"
              typeMask="mask-squircle"
              urlProfile={user.profileImageUrl}
            />
          </div>
          <div className="col-span-5 border">
            Other Stuff to change if the user want
          </div>
          <div className="col-span-6 border">Other shits</div>
        </div>
      )}
    </>
  );
};

export default ProfilePage;
