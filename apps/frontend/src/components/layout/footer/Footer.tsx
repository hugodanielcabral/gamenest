import gameNestLogo2 from "../../../assets/logos/gamenest-logo-2.webp";
import { Icon } from "../../ui/icon/Icon";

export const mySocialLinks = [
  {
    id: 1,
    title: "LinkedIn",
    name: "icon-[akar-icons--linkedin-v1-fill]",
    url: "https://www.linkedin.com/in/hugo-daniel-cabral",
  },
  {
    id: 2,
    title: "GitHub",
    name: "icon-[jam--github]",
    url: "https://github.com/hugodanielcabral",
  },
  {
    id: 3,
    title: "Portafolio",
    name: "icon-[zondicons--portfolio]",
    url: "https://danielcabral.dev.ar/",
  },
];

export const Footer = () => {
  return (
    <footer className="border-t-2 border-info bg-base-100">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-2 sm:flex sm:items-center sm:justify-between sm:space-y-0">
          <div className="flex justify-center sm:justify-start">
            <img
              src={gameNestLogo2}
              alt="GameNest Logo"
              className="h-14 w-auto"
            />
          </div>
          <ul className="flex items-center justify-center gap-2">
            {mySocialLinks.map((socialLink) => (
              <li
                key={socialLink.id}
                className="transition-transform duration-300 ease-in-out hover:scale-110"
              >
                <a href={socialLink.url} target="_blank" rel="noreferrer">
                  <Icon name={socialLink.name} className="size-8 md:size-10 lg:size-11 text-info" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};
