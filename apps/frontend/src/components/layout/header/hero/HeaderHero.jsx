import games_page_hero_img from "../../../../assets/hero/games-page-hero-img.jpg";

export const HeaderHero = () => {
  return (
    <div>
      <img
        src={games_page_hero_img}
        className="relative w-full h-[500px] object-cover  brightness-50"
        alt="Hero image for the games page"
      />
      {/*  <h1 className="absolute z-50 text-5xl font-bold text-center top-52 text-orange-tag-adventure left-1/4">
        Games
      </h1> */}
    </div>
  );
};
