interface CardProps {
  imgSrc?: string | Function;
  title?: string;
  children?: React.ReactNode;
}

const CardImage = ({ imgSrc, title }: CardProps) => {
  return (
    <img
      src={typeof imgSrc === "function" ? imgSrc() : imgSrc}
      alt={title}
      className="rounded-md border-2 border-gray-700"
    />
  );
};

const CardContent = ({ title, children }: CardProps) => {
  return (
    <div className="card-content absolute bottom-0 z-10 flex h-full w-full flex-col items-center justify-center rounded-md border-2 bg-base-100 bg-opacity-0 opacity-0 transition-all duration-300 ease-in-out group-hover:border-gray-500 group-hover:bg-opacity-90 group-hover:opacity-100">
      <h2 className="card-title text-pretty text-xl text-info">{title}</h2>
      {children}
    </div>
  );
};

const Card = ({ children }: CardProps) => {
  return <div className="group relative">{children}</div>;
};

export { Card, CardImage, CardContent };
