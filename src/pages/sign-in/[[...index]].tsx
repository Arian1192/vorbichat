import { SignIn } from "@clerk/nextjs";


const SignInPage = () => {
  return (
    <div className="relative">
      <video
        loop
        autoPlay
        muted
        className="absolute inset-0 z-[-1] h-full w-full object-cover"
        src="falla-36784.mp4"
      />
      <div className="flex h-screen w-full items-center justify-center">
        <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
      </div>
    </div>
  );
};

export default SignInPage;
