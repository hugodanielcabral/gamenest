import collectionImage from "../../../../assets/home/collection-image.avif";

export const HomeCollection = () => {
  return (
    <section className="container mx-auto my-8 p-5">
      <div className="divider"></div>
      <div className="flex justify-center items-center md:gap-y-0 gap-y-5 gap-x-10 flex-wrap">
        <article className="flex-grow md:basis-1/4">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold  uppercase text-center bg-clip-text text-transparent bg-gradient-to-r from-info to-error">
            Mantén tu colección organizada
          </h2>
          <p className="text-base md:text-xl lg:text-2xl text-balance text-center text-gray-300">
            Agrega tus juegos favoritos a tu colección y mantén un seguimiento de ellos
          </p>
        </article>
        <figure className="md:basis-2/4">
          <img
            src={collectionImage}
            alt="Collection Image"
            className="rounded-lg border-collapse border-info border border-opacity-30 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105 hover:border-error hover:border-opacity-60"
          />
        </figure>
      </div>
    </section>
  );
};
