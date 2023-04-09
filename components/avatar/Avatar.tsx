interface IAvatarProps {
  size: string;
  typeMask: string;
  urlProfile: string;
}

const Avatar = (props: IAvatarProps) => {
  const { size, typeMask, urlProfile } = props;
  return (
    <div className="avatar">
      <div className={`mask ${typeMask} ${size}`}>
        <img src={urlProfile} />
      </div>
    </div>
  );
};

export default Avatar;
