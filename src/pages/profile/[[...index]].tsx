/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { MagicSpinner } from "react-spinners-kit";
import Avatar from "components/avatar/Avatar";
import SignOutButton from "components/signOutButton/SignOutButton";
import ThemeSwitcher from "components/themeSwitcher/ThemeSwitcher";
import CreateOrgButton from "components/createOrgButton/CreateOrgButton";
import OrgTable from "components/orgTable/OrgTable";
import { api } from "~/utils/api";
import type { IOrganization } from "~/types/IOrganization";

export interface ICreateOrganization {
  ownerName: string;
  name: string;
  participants: string[];
  ownerId: string;
  ownerUrlImage: string;
}

const ProfilePage = () => {
  const [mutate, setMutate] = useState<boolean>(false);
  const { isLoaded, isSignedIn, user } = useUser();
  const [myOrganizations, setMyOrganizations] = useState<IOrganization[]>([]);
  const [errorMutate, setErrorMutate] = useState<boolean>(false);
  const createOrgMutation = api.organization.createOrganization.useMutation({
    onMutate() {
      setMutate(true);
    },
    onSuccess() {
      setMutate(false);
    },
    onError() {
      setErrorMutate(true);
    },
  });

  const { register, reset, handleSubmit, formState: {errors} } = useForm<ICreateOrganization>();

  const onSubmit: SubmitHandler<ICreateOrganization> = (data) => {
    createOrgMutation.mutate({
      ...data,
      ownerId: user?.id as string,
      ownerUrlImage: user?.profileImageUrl as string,
      ownerName: user?.fullName as string,
    });
    reset();
  };

  const Org = api.organization.getOrganizationByUser.useQuery({userId: user?.id as string})

  useEffect(() => {
    if (Org.data !== undefined) {
      setMyOrganizations(Org.data.OrganizationFound);
    }
  }, [Org.data]);


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
          <div className="flex gap-10  p-5 max-md:flex-col md:col-span-5 xl:col-span-6">
            <div className="flex h-64 max-w-lg items-center justify-center rounded-md border border-base-300 p-4  shadow-xl max-md:mx-auto">
              <div className="form-control flex m-10">
                <h3 className="mt-5 mb-2 font-bold">Create new organization</h3>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
                  <label className="label">
                    <span className="label-text-alt">Organization Name</span>
                  </label>
                  <input
                    type="text"
                    {...register("name", {required: true })}
                    placeholder="Name of new organization"
                    className="input-bordered input w-full max-w-xs mb-4"
                  />
                  {errors.name && <span className="text-error">⚠️ This field is required</span>}
                  
                  <div className="flex justify-end">
                    <CreateOrgButton
                      mutate={mutate}
                      errorMutate={errorMutate}
                    />
                  </div>
                </form>
              </div>
            </div>

            <OrgTable OrganizationsFounded={myOrganizations} />
          </div>
          <div className="border md:col-span-8">Other shits</div>
        </div>
      )}
    </>
  );
};

export default ProfilePage;



//TODO: Only share with the user, the organizations that he is the owner or participant, is not then, not show it.

