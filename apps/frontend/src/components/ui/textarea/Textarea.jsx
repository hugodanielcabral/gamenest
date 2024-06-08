export const Textarea = ({ ...props }) => {
  return (
    <textarea
      className="textarea bg-base-200 border-2 border-gray-400 p-2 rounded-md w-full h-40 focus:border-2 focus:border-info transition-colors duration-700"
      {...props}
    ></textarea>
  );
};
