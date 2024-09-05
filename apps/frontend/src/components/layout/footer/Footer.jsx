import gameNestLogo2 from "../../../assets/logos/gamenest-logo-2.webp";
import { mySocialLinks } from "../../../constants/footer/footerConstants";
export const Footer = () => {
  return (
    <footer className="border-t-2 border-info bg-base-100">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="self flex justify-center sm:justify-start">
            <img
              src={gameNestLogo2}
              alt="GameNest Logo"
              className="h-14 w-auto"
            />
          </div>

          <div className="mt-4 sm:mt-0">
            <p className="text-center font-nunito text-xs text-white md:text-sm">
              Hecho con ❤️ por{" "}
              <a
                href="https://www.linkedin.com/in/hugo-daniel-cabral"
                target="_blank"
                rel="noreferrer"
                className="font-nunito text-xs text-info md:text-sm"
              >
                Daniel Cabral
              </a>
            </p>
          </div>

          <ul className="flex items-center justify-center gap-2">
            {mySocialLinks.map((socialLink) => (
              <li
                key={socialLink.id}
                className="transition-transform duration-300 ease-in-out hover:scale-110"
              >
                <a href={socialLink.url} target="_blank" rel="noreferrer">
                  <img
                    src={socialLink.icon}
                    alt={socialLink.name}
                    className={socialLink.className}
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
