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
        <div className="grid grid-cols-1 gap-10 p-10 md:grid-cols-8">
          <div className="flex flex-col items-center justify-center rounded border border-base-300 p-5 shadow-md md:col-span-3 xl:col-span-2 2xl:col-span-1">
            <h2 className="m-4 text-2xl font-bold">{user.fullName}</h2>
            <Avatar
              isOnline={`${isSignedIn ? "online" : "offline"}`} // se setea mal
              size="w-32"
              typeMask="rounded-full"
              urlProfile={user.profileImageUrl}
            />
            <p className="mx-auto">Edit Avatar 🛠️</p>
            <h3>
              Created:{" "}
              <span className="text-info">
                {user.createdAt?.toDateString()}
              </span>
            </h3>
            <h3>
              Last sign:{" "}
              <span className="text-info">
                {user.lastSignInAt?.toDateString()}
              </span>
            </h3>

            <div className="divider mx-auto w-[80%]">Info</div>
            <h3>
              Email:{" "}
              <span className="mx-auto text-info">
                {user.emailAddresses[0]?.emailAddress}
              </span>
            </h3>
            <h3 className="mb-5">
              Phone:{" "}
              <span className="mx-auto text-info">
                {!user.primaryPhoneNumber && "xxxxxxxxxxxxxxxx"}
                {user.primaryPhoneNumber && user.primaryPhoneNumberId}
              </span>
            </h3>
          </div>
          <div className="border md:col-span-5 2xl:col-span-7">
            Other Stuff to change if the user want
          </div>
          <div className="border md:col-span-8">Other shits</div>
        </div>
      )}
    </>
  );
};

export default ProfilePage;
