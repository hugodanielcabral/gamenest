import propTypes from "prop-types";
import { CiLink } from "react-icons/ci";
import { GiHeartShield } from "react-icons/gi";
import { FaWikipediaW } from "react-icons/fa";
import { CiFacebook } from "react-icons/ci";
import { CiTwitter } from "react-icons/ci";
import { CiInstagram } from "react-icons/ci";
import { FaYoutube } from "react-icons/fa";
import { FaTwitch } from "react-icons/fa";
import { FaReddit } from "react-icons/fa";
import { FaSteam } from "react-icons/fa";

export const GameDetailsInfo = ({ game }) => {
  //! Separar por componentes.
  //! En el componente de website, crear un array y verificar si tiene
  //! tal elemento(con el contains o includes) por ejemplo, verificar si tiene
  //! en el elemento url la palabra "wiki" renderizar un icono de wikipedia.

  const gameWebsites = [
    {
      name: "Official",
      url: game.websites.find((website) => website.category === 1),
      icon: <CiLink />,
    },
    {
      name: "Wikia",
      url: game.websites.find((website) => website.category === 2),
      icon: <GiHeartShield />,
    },
    {
      name: "Wikipedia",
      url: game.websites.find((website) => website.category === 3),
      icon: <FaWikipediaW />,
    },
    {
      name: "Facebook",
      url: game.websites.find((website) => website.category === 4),
      icon: <CiFacebook />,
    },
    {
      name: "Twitter",
      url: game.websites.find((website) => website.category === 5),
      icon: <CiTwitter />,
    },
    {
      name: "Instagram",
      url: game.websites.find((website) => website.category === 8),
      icon: <CiInstagram />,
    },
    {
      name: "YouTube",
      url: game.websites.find((website) => website.category === 9),
      icon: <FaYoutube />,
    },
    {
      name: "Twitch",
      url: game.websites.find((website) => website.category === 6),
      icon: <FaTwitch />,
    },
    {
      name: "Reddit",
      url: game.websites.find((website) => website.category === 14),
      icon: <FaReddit />,
    },
    {
      name: "Steam",
      url: game.websites.find((website) => website.category === 13),
      icon: <FaSteam />,
    },
  ];

  const involvedCompanies = game.involved_companies
    ? game.involved_companies.find((company) => company.developer === true)
    : null;

  return (
    <div className="flex flex-col justify-center col-span-4 p-5 md:col-span-1 gap-y-3 bg-base-100/90">
      <h2 className="text-2xl font-bold text-info">GAME INFO</h2>
      <section>
        <h3 className="text-xl font-bold">Developers</h3>
        <p className="text-xl">
          {involvedCompanies
            ? involvedCompanies.company.name
            : "No developers found."}
        </p>
      </section>
      <section>
        <h3 className="text-xl font-bold">Publishers</h3>
        {game.involved_companies
          ? game.involved_companies.map((company) => (
              <p key={company.id} className="text-xl">
                {company.company.name}
              </p>
            ))
          : "No publishers found."}
      </section>
      <section>
        <h3 className="text-xl font-bold">Game Modes</h3>
        {game.game_modes
          ? game.game_modes.map((mode) => (
              <p key={mode.id} className="text-xl">
                {mode.name}
              </p>
            ))
          : "No game modes found."}
      </section>
      <section>
        <h3 className="text-xl font-bold">Player Perspectives</h3>
        {game.player_perspectives
          ? game.player_perspectives.map((perspective) => (
              <p key={perspective.id} className="text-xl">
                {perspective.name}
              </p>
            ))
          : "No player perspectives found."}
      </section>
      <section>
        <h3 className="text-xl font-bold">Franchises</h3>
        {game.franchises
          ? game.franchises.map((franchise) => (
              <p key={franchise.id} className="text-xl">
                {franchise.name}
              </p>
            ))
          : "No franchises found."}
      </section>
      <section>
        <h3 className="text-xl font-bold">IGDB ID</h3>
        <p className="text-xl">{game.id ?? "No IGDB ID found."}</p>
      </section>
      <section>
        <h3 className="text-xl font-bold">Websites</h3>
        <div className="grid grid-cols-5 gap-3 mx-auto w-52">
          {game.websites
            ? gameWebsites
                .filter((website) => website.url)
                .map((website) => (
                  <a
                    key={website.name}
                    href={website.url?.url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 mx-auto text-2xl rounded-md text-info hover:text-accent bg-base-100/90"
                  >
                    {website.icon}
                  </a>
                ))
            : "No websites found."}
        </div>
      </section>
    </div>
  );
};

GameDetailsInfo.propTypes = {
  game: propTypes.object.isRequired,
};
