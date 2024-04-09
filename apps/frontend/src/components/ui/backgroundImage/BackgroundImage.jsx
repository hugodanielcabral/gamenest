import propTypes from "prop-types";

export const BackgroundImage = ({ children, backgroundImage }) => {
  return (
    <div className="min-h-screen">
      <img
        src={backgroundImage}
        className={`w-full absolute left-0 right-0 gradient-mask-b-[rgb(0,0,0,1),rgb(0,0,0,0.4)_0%,rgb(0,0,0,0)]`}
      />
      <div className="relative z-10 p-4 container mx-auto">{children}</div>
    </div>
  );
};

BackgroundImage.propTypes = {
  backgroundImage: propTypes.string.isRequired,
  children: propTypes.node.isRequired,
};
