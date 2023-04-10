import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => {
  return (
    <div className="relative">
      <video
        loop
        autoPlay
        muted
        className="absolute inset-0 z-[-1] h-full w-full object-cover"
        src="fondo-49311.mp4"
      />
      <div className="flex h-screen w-full items-center justify-center">
        <SignUp path="/sign-up" routing="path" signInUrl="/sing-in" />;
      </div>
    </div>
  );
};
export default SignUpPage;

