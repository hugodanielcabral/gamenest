interface AuthErrorsProps {
  errors: { path: string; msg: string }[];
  inputField: string;
}

export const AuthErrors = ({ errors,  inputField }:AuthErrorsProps) => {
  return (
    <>
      {errors && errors.find((err) => err.path === inputField) && (
        <p className="mb-4 text-sm font-bold text-center text-error">
          {errors.find((err) => err.path === inputField).msg}
        </p>
      )}
    </>
  );
};
