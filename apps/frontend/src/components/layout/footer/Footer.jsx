import gameNestLogo2 from "../../../assets/logos/gamenest-logo-2.png";
import { mySocialLinks } from "../../../utils/mySocialLinks";

export const Footer = () => {
  return (
    <footer className="bg-base-300">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="flex justify-center text-teal-600 sm:justify-start">
            <img
              src={gameNestLogo2}
              alt="GameNest Logo"
              className="h-14 w-auto"
            />
          </div>

          <ul className="flex gap-2 justify-center items-center">
            {mySocialLinks.map((socialLink) => (
              <li
                key={socialLink.id}
                className="hover:scale-110 transition-transform duration-300 ease-in-out"
              >
                <a href={socialLink.url} target="_blank" rel="noreferrer">
                  <img
                    src={socialLink.icon}
                    alt={socialLink.name}
                    className="size-8 md:size-11"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};
