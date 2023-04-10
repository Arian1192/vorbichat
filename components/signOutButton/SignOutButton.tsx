import { useClerk } from "@clerk/nextjs";

const SignOutButton = () => {
  const { signOut } = useClerk();
  const handleSingOut = () => {
    signOut();
  };
  return (
    <button className="btn btn-info btn-wide" onClick={handleSingOut}>
      Sign Out
    </button>
  );
};

export default SignOutButton;
