export const SpecificationsList = ({ specificationTitle, specification }) => {
  return (
    <section className="shrink-0">
      <h3 className="text-left text-sm md:text-lg lg:text-xl text-white">
        {specificationTitle}
      </h3>
      {
        <ul>
          {specification.map((spec) => (
            <li key={spec.id} className="text-sm md:text-lg">
              {spec.name}
            </li>
          ))}
        </ul>
      }
    </section>
  );
};
