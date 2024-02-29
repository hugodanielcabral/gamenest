import { HomeHero } from "../components/home/hero/HomeHero";

const HomePage = () => {
  const images = [
    {
      id: 1,
      src: "https://placehold.co/600x400",
      alt: "random image 1",
    },
    {
      id: 2,
      src: "https://placehold.co/600x400",
      alt: "random image 2",
    },
    {
      id: 3,
      src: "https://picsum.photos/seed/picsum/200/300",
      alt: "random image 3",
    },
    {
      id: 4,
      src: "https://picsum.photos/seed/picsum/200/300",
      alt: "random image 4",
    },
    {
      id: 5,
      src: "https://picsum.photos/seed/picsum/200/300",
      alt: "random image 5",
    },
    {
      id: 6,
      src: "https://picsum.photos/seed/picsum/200/300",
      alt: "random image 6",
    },
    {
      id: 7,
      src: "https://picsum.photos/seed/picsum/200/300",
      alt: "random image 7",
    },
    {
      id: 8,
      src: "https://picsum.photos/seed/picsum/200/300",
      alt: "random image 8",
    },
    {
      id: 9,
      src: "https://picsum.photos/seed/picsum/200/300",
      alt: "random image 9",
    },
    {
      id: 10,
      src: "https://picsum.photos/seed/picsum/200/300",
      alt: "random image 10",
    },
    {
      id: 11,
      src: "https://picsum.photos/seed/picsum/200/300",
      alt: "random image 11",
    },
    {
      id: 12,
      src: "https://picsum.photos/seed/picsum/200/300",
      alt: "random image 12",
    },
    {
      id: 13,
      src: "https://picsum.photos/seed/picsum/200/300",
      alt: "random image 13",
    },
  ];

  return (
    <div>
      <HomeHero />
      <div className="grid grid-cols-3 grid-rows-6 p-5 border border-orange-tag-adventure bg-grey-color gap-x-4 gap-y-3">
        <article className="relative col-span-3 row-span-3 md:row-span-6 md:col-span-2">
          <img
            src={images[0].src}
            alt=""
            className="absolute inset-0 object-cover w-full h-full"
          />
        </article>
        <article className="relative h-24 col-span-3 row-span-1 md:row-span-2 md:col-span-1">
          <img
            src={images[1].src}
            alt=""
            className="absolute inset-0 object-cover w-full h-full"
          />
        </article>
        <article className="relative h-24 col-span-3 row-span-1 md:row-span-2 md:col-span-1">
          <img
            src={images[0].src}
            alt=""
            className="absolute inset-0 object-cover w-full h-full"
          />
        </article>
        <article className="relative h-24 col-span-3 row-span-1 md:row-span-2 md:col-span-1">
          <img
            src={images[0].src}
            alt=""
            className="absolute inset-0 object-cover w-full h-full"
          />
        </article>
      </div>
    </div>
  );
};

export default HomePage;
