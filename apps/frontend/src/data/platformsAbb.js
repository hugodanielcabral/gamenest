const PLATFORM_ABBREVIATION = [
  {
    id: 1,
    fullName: "PlayStation 4",
    abbreviation: "PS4",
  },
  {
    id: 2,
    fullName: "PlayStation 5",
    abbreviation: "PS5",
  },
  {
    id: 3,
    fullName: "Xbox One",
    abbreviation: "Series One",
  },
  {
    id: 4,
    fullName: "Xbox Series X",
    abbreviation: "Series X",
  },
  {
    id: 5,
    fullName: "Nintendo Switch",
    abbreviation: "Switch",
  },
  {
    id: 6,
    fullName: "PC (Microsoft Windows)",
    abbreviation: "PC",
  },
];

const getPlaformAbbreviation = (platformName) => {
  const PLATFORM_NAME = PLATFORM_ABBREVIATION.find(
    (platform) => platform.fullName === platformName
  ) || { abbreviation: platformName };

  return PLATFORM_NAME?.abbreviation;
};

export default getPlaformAbbreviation;
