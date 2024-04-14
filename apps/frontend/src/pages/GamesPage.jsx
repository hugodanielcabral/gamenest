import {
  GamesFilters,
  GamesHome,
} from "../components/games/gameshome/index.js";

const GamesPage = () => {
  //TODO 1: Agregar el fondo con la imagen de fondo (deberia crear un componente? ya que lo estoy usando y lo usare en varias paginas).

  //TODO 2: Crear un componente buscador generico para poder reutilizarlo en otras paginas(por ahora en Games y Collection).

  //TODO 3: Crear un componente Card para utilizarlo tanto en Games como en Collection.

  //TODO 4: Crear un componente Pagination para utilizarlo tanto en Games como en Collection.

  //TODO 5: Crear un componente Filters para utilizarlo tanto en Games como en Collection.

  //* Utilizar los colores info, error y white.

  return (
    <>
      <div className="grid grid-cols-4 gap-4 p-5">
        <div className="col-span-4 lg:col-span-3">
          <GamesHome />
        </div>
        <aside className="sticky hidden bg-transparent lg:block top-24 h-fit border-base-content">
          <GamesFilters />
        </aside>
      </div>
    </>
  );
};

export default GamesPage;
