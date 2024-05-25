import { customizeFeatures } from "../../../../constants/home/homeConstants";
export const HomeCustomize = () => {
  return (
    <section className="container mx-auto my-8 p-5">
      <div className="divider"></div>

      <div className="flex justify-center items-center md:gap-y-0 gap-y-5 gap-x-10 flex-wrap">
        <figure className="grid grid-cols-2 gap-3 basis-3/4 md:basis-1/3 flex-shrink-0 md:order-0 order-1">
          {customizeFeatures.map((feature) => (
            <img
              key={feature.id}
              src={feature.img}
              alt={feature.alt}
              height={feature.height}
              width={feature.width}
              style={{ gridColumn: `span ${feature.gridColSpan}` }}
              className="object-cover rounded-lg shadow-md shadow-info hover:shadow-error transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105"
            />
          ))}
        </figure>
        <article className="flex-grow md:basis-1/3 order-0 md:order-1">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold  uppercase text-center bg-clip-text text-transparent bg-gradient-to-r from-info to-error">
           Control total de tu colección
          </h2>
          <p className="text-base md:text-xl lg:text-2xl text-balance text-center text-gray-300">
            Personaliza tu colección por medio de plataformas, notas, estado, y más
          </p>
        </article>
      </div>
    </section>
  );
};
