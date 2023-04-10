import { useUser } from "@clerk/nextjs";

interface IAvatarProps {
  size: string;
  typeMask: string;
  urlProfile: string;
  isOnline?: string;
}

const Avatar = (props: IAvatarProps) => {
  const { size, typeMask, urlProfile, isOnline } = props;
  const { user, isLoaded } = useUser();

  const handleClik = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.addEventListener("change", handleFile);
    input.click();
  };

  const handleFile = (event: any) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      {
        isLoaded && user?.setProfileImage({ file });
      }
    };
  };

  return (
    <div className="flex items-center justify-center">
      <div className={`${isOnline} avatar`} onClick={handleClik}>
        <div className={`mask ${size} ${typeMask ? typeMask: 'rounded-full'}`}>
          <div>
            <img src={urlProfile} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Avatar;
