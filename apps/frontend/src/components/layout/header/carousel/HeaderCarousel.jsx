import { useState } from "react";
import right_arrow from "../../../../assets/right-arrow.svg";
import left_arrow from "../../../../assets/left-arrow.svg";

const carouselData = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420",
    title: "Title 1",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi cum, iste recusandae illo, velit corporis optio vitae temporibus accusantium asperiores dolorem ducimus perspiciatis! Enim excepturi assumenda aut. Debitis, impedit expedita?",
  },
  {
    id: 2,
    title: "Title 2",
    description:
      "lorem ipsum dolor sit amet consectetur adipisicing elit.lorem ipsum dolor sit amet consectetur adipisicing elit.lorem ipsum dolor sit amet consectetur adipisicing elit.",
    image:
      "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    title: "Title 3",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. lorem ipsum dolor sit amet consectetur adipisicing elit. lorem ipsum dolor sit amet consectetur adipisicing elit. lorem ipsum dolor sit amet consectetur adipisicing elit.",
    image:
      "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?q=80&w=1771&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 4,
    title: "Title 4",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio dignissimos blanditiis eius debitis sed voluptatum a veritatis, id corrupti eum. Provident placeat rem officia soluta adipisci, doloremque quibusdam similique minus?",
    image:
      "https://images.unsplash.com/photo-1616588589676-62b3bd4ff6d2?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export const HeaderCarousel = () => {
  const [currentItem, setCurrentItem] = useState(carouselData[0]);

  const handleNextCarouselData = () => {
    const index = carouselData.findIndex((item) => item.id === currentItem.id);
    console.log(index);
    if (index + 1 === carouselData.length) {
      setCurrentItem(carouselData[index - carouselData.length + 1]);
    } else {
      setCurrentItem(carouselData[index + 1]);
    }
  };

  const handlePreviousCarouselData = () => {
    const index = carouselData.findIndex((item) => item.id === currentItem.id);
    if (index === 0) {
      setCurrentItem(carouselData[carouselData.length - 1]);
    } else {
      setCurrentItem(carouselData[index - 1]);
    }
  };
  return (
    <div
      className="bg-center bg-no-repeat bg-cover container-header"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(36, 37, 38, 0.5), rgba(36, 37, 38, 0.5)), url(${currentItem.image})`,
      }}
    >
      <div className="flex items-center justify-between mx-6 h-[600px]">
        <button
          onClick={() => handlePreviousCarouselData()}
          className="p-5 transition duration-500 ease-in-out transform bg-opacity-50 rounded-full bg-slate-300 hover:bg-red-500 hover:scale-110"
        >
          <img src={left_arrow} alt="Image of a left arrow" />
        </button>
        <div className="w-2/4">
          <h2 className="text-3xl text-white">{currentItem.title}</h2>
          <h4 className="mt-5 text-2xl">{currentItem.description}</h4>
          <ul className="flex gap-4 mt-5">
            <li>
              <p>
                posted by: <span className="text-red-500">admin</span>
              </p>
            </li>
            <li>
              <p>comments: 0</p>
            </li>
          </ul>
        </div>
        <button
          onClick={() => handleNextCarouselData()}
          className="p-5 transition duration-500 ease-in-out transform bg-opacity-50 rounded-full bg-slate-300 hover:bg-red-500 hover:scale-110"
        >
          <img src={right_arrow} alt="Image of a right arrow" />
        </button>
      </div>
    </div>
  );
};
