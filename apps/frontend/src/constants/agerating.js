import esrbRatingRP from "../assets/logos/esrb/ESRB_2013_Rating_Pending.webp";
import esrbRatingEC from "../assets/logos/esrb/ESRB_2013_EC_Rating.webp";
import esrbRatingE from "../assets/logos/esrb/ESRB_2013_E_Rating.webp";
import esrbRatingE10 from "../assets/logos/esrb/ESRB_2013_E10+_Rating.webp";
import esrbRatingT from "../assets/logos/esrb/ESRB_2013_T_Rating.webp";
import esrbRatingM from "../assets/logos/esrb/ESRB_2013_M_Rating.webp";
import esrbRatingAO from "../assets/logos/esrb/ESRB_2013_AO_Rating.webp";

import pegiRating3 from "../assets/logos/pegi/PEGI_3.webp";
import pegiRating7 from "../assets/logos/pegi/PEGI_7.webp";
import pegiRating12 from "../assets/logos/pegi/PEGI_12.webp";
import pegiRating16 from "../assets/logos/pegi/PEGI_16.webp";
import pegiRating18 from "../assets/logos/pegi/PEGI_18.webp";

export const pegiRatingsData = [
  {
    id: 1,
    rating: "3",
    igdbRating: 1,
    image: pegiRating3,
  },
  {
    id: 2,
    rating: "7",
    igdbRating: 2,
    image: pegiRating7,
  },
  {
    id: 3,
    rating: "12",
    igdbRating: 3,
    image: pegiRating12,
  },
  {
    id: 4,
    rating: "16",
    igdbRating: 4,
    image: pegiRating16,
  },
  {
    id: 5,
    rating: "18",
    igdbRating: 5,
    image: pegiRating18,
  },
];

export const esrbRatingsData = [
  {
    id: 1,
    rating: "RP",
    igdbRating: 6,
    image: esrbRatingRP,
  },
  {
    id: 2,
    rating: "EC",
    igdbRating: 7,
    image: esrbRatingEC,
  },
  {
    id: 3,
    rating: "E",
    igdbRating: 8,
    image: esrbRatingE,
  },
  {
    id: 4,
    rating: "E10+",
    igdbRating: 9,
    image: esrbRatingE10,
  },
  {
    id: 5,
    rating: "T",
    igdbRating: 10,
    image: esrbRatingT,
  },
  {
    id: 6,
    rating: "M",
    igdbRating: 11,
    image: esrbRatingM,
  },
  {
    id: 7,
    rating: "AO",
    igdbRating: 12,
    image: esrbRatingAO,
  },
];
