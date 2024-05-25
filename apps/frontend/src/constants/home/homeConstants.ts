import platformImg from "../../assets/home/collection-manage-platform-format.webp";
import progressNotesImg from "../../assets/home/collection-manage-progressnotes.webp";
import statusImg from "../../assets/home/collection-manage-status.webp";
import ownershipImg from "../../assets/home/collection-manage-ownership.webp";
import storesImg from "../../assets/home/collection-manage-stores.webp";

interface CustomizeFeature {
  id: number;
  img: string;
  height: number;
  width: number;
  alt: string;
  gridColSpan: number;
}


export const customizeFeatures:CustomizeFeature[] = [
  {
    id: 1,
    img: platformImg,
    height: 150,
    width: 250,
    alt: "Platform",
    gridColSpan: 1,
  },
  {
    id: 2,
    img: progressNotesImg,
    height: 150,
    width: 250,
    alt: "Progress Notes",
    gridColSpan: 1,
  },
  {
    id: 3,
    img: statusImg,
    height: 150,
    width: 250,
    alt: "Status",
    gridColSpan: 1,
  },
  {
    id: 4,
    img: ownershipImg,
    height: 150,
    width: 250,
    alt: "Ownership",
    gridColSpan: 1,
  },
  {
    id: 5,
    img: storesImg,
    height: 150,
    width: 220,
    alt: "Stores",
    gridColSpan: 2,
  },
];
