export const AuthCard = ({ children, title }) => {
  return (
    <div className="py-5 mx-auto mt-32 bg-black bg-opacity-50 rounded-lg shadow-2xl w-96 px-7 shadow-black">
      <h3 className="text-4xl font-bold text-center text-white">{title}</h3>
      {children}
    </div>
  );
};
