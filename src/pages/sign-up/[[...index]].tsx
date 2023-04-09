import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => {
    return <SignUp path="/sign-up" routing="path" signInUrl="/sing-in" />;
};
export default SignUpPage;
