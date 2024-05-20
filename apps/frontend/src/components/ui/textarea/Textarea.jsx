export const Textarea = ({ ...props }) => {
  return (
    <textarea
      className="textarea bg-base-200 border-2 border-gray-400 p-2 rounded-md w-full h-40 focus:border-t-4 focus:border-t-info focus:border-b-error focus:border-l-2 focus:border-r-gray-500/50 focus:border-r-2 focus:border-gray-500/50 transition-colors duration-700"
      {...props}
    ></textarea>
  );
};
