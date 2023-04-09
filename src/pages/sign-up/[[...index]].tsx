import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <SignUp path="/sign-up" routing="path" signInUrl="/sing-in" />
    </div>
  );
};
export default SignUpPage;
