import games_page_hero_img from "../../../../assets/hero/games-page-hero-img.jpg";

export const HeaderHero = () => {
  return (
    <div
      className="relative min-h-screen hero"
      style={{
        backgroundImage: `url(${games_page_hero_img})`,
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="text-center hero-content text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Games</h1>
          <p className="mb-5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
            illo impedit assumenda laborum? Repellendus omnis magni et. Eos
            assumenda optio fuga quas quia omnis nostrum dolore vitae! Nesciunt,
            eaque cum.
          </p>
        </div>
      </div>
    </div>
  );
};
