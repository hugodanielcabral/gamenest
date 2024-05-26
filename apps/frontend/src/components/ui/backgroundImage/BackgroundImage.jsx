import propTypes from "prop-types";

export const BackgroundImage = ({
  children,
  backgroundImage,
  startOpacity = 0,
  middleOpacity = 0,
  endOpacity = 80,
}) => {
  return (
    <div className="min-h-screen">
      <img
        src={backgroundImage}
        className={`w-full h-full object-cover absolute left-0 right-0 gradient-mask-b-[rgb(0,0,0,1)_${startOpacity}%,rgb(0,0,0,0.4)_${middleOpacity}%,rgb(0,0,0,0.5)_${endOpacity}%]`}
      />
      <div className="relative z-10 p-4 container mx-auto">{children}</div>
    </div>
  );
};

BackgroundImage.propTypes = {
  backgroundImage: propTypes.string.isRequired,
  children: propTypes.node.isRequired,
  startOpacity: propTypes.number,
  middleOpacity: propTypes.number,
  endOpacity: propTypes.number,
};
