import propTypes from "prop-types";

export const HeaderHero = ({ heroInfo }) => {
  console.log(heroInfo, "heroInfo");
  return (
    <div
      className="relative min-h-screen hero"
      style={{
        backgroundImage: `url(${heroInfo.image})`,
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="text-center hero-content text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">{heroInfo.title}</h1>
          <p className="mb-5">{heroInfo.description}</p>
        </div>
      </div>
    </div>
  );
};

HeaderHero.propTypes = {
  heroInfo: propTypes.object.isRequired,
};
