import { useUser } from "@clerk/nextjs";
import { useForm } from "react-hook-form";
import type  {SubmitHandler} from "react-hook-form"
import { MagicSpinner } from "react-spinners-kit";
import Avatar from "components/avatar/Avatar";
import SignOutButton from "components/signOutButton/SignOutButton";
import ThemeSwitcher from "components/themeSwitcher/ThemeSwitcher";
import { api } from "../../utils/api";

import type { IOrganization } from "~/types/IOrganization";

const ProfilePage = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const { handleSubmit, register, reset } = useForm<ICreateOrganization>();

  const createOrgMutation = api.organization.createOrganization.useMutation();

  interface ICreateOrganization extends IOrganization {
    ownerId: string;
  }

  const onSubmit: SubmitHandler<ICreateOrganization> = (data) => {
    createOrgMutation.mutate({
      ...data,
      ownerId: user?.id as string,
      ownerName: user?.fullName as string,
    });
    reset();
  };

  // const organizationQuery = api.organization.getOrganizations.useQuery();
  const infoOrganizationID = api.organization.getOrganizationById.useQuery({
    id: "643ac1ffb8fdfd6d2eb69176",
  });
  

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
          <div className="flex flex-col items-center justify-center rounded border border-base-300 p-5 shadow-md md:col-span-3 xl:col-span-2 2xl:col-span-2">
            <h2 className="m-4 text-2xl font-bold">{user.fullName}</h2>
            <Avatar
              isOnline={`${isSignedIn ? "online" : "offline"}`} // se setea mal
              size="w-32"
              // typeMask="rounded-full"
              urlProfile={user.profileImageUrl}
            />

            <p className="mx-auto mt-4">Edit Avatar 🛠️</p>
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
            <div className="flex w-[64] flex-col">
              <h3 className="text-center xl:text-sm">
                Email:{" "}
                <span className="mx-auto text-info">
                  {user.emailAddresses[0]?.emailAddress}
                </span>
              </h3>
              <h3 className="mb-5 text-center xl:text-sm">
                Phone:{" "}
                <span className="mx-auto text-info">
                  {!user.primaryPhoneNumber && "xxxxxxxxx"}
                  {user.primaryPhoneNumber && user.primaryPhoneNumberId}
                </span>
              </h3>
              <div className="flex justify-between">
                <SignOutButton />
                <ThemeSwitcher />
              </div>
            </div>
          </div>
          <div className="border p-5 md:col-span-5 xl:col-span-6">
            <div className="flex h-auto max-w-xs items-center justify-center rounded-md border border-base-300  p-4 shadow-xl">
              <div className="form-control flex w-full max-w-xs">
                <h3 className="mb-5">Create new organization</h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <label className="label">
                    <span className="label-text-alt">Organization Name</span>
                  </label>
                  <input
                    type="text"
                    {...register("name")}
                    placeholder="Name of new organization"
                    className="input-bordered input w-full max-w-xs"
                  />
                  <div className="flex justify-end">
                    <input type="submit" className="btn-sm btn my-5" />
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="border md:col-span-8">Other shits</div>
        </div>
      )}
    </>
  );
};

export default ProfilePage;
