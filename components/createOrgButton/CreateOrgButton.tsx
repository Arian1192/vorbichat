
interface ICreateOrgButton {
  mutate: boolean;
  errorMutate: boolean;
}

const CreateOrgButton = ({ mutate, errorMutate }: ICreateOrgButton) => {
  return (
    <>
      <button
        type="submit"
        className={`btn btn my-5 gap-2 ${mutate && !errorMutate && "loading"}`}
      >
        {!mutate && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className={`h-5 w-5`}
          >
            {!errorMutate && (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            )}
            {errorMutate && (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            )}
          </svg>
        )}
        Create
      </button>
    </>
  );
};

export default CreateOrgButton;
