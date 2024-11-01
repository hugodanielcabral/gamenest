import { useDataFetch } from "../../../hooks/useDataFetch";
import { useQueryParams } from "../../../hooks/useQueryParams";
import { Loading } from "../../ui/loading/Loading.tsx";

interface CountCollection {
  count: number;
}

export const CollectionPagination = () => {
  const { getQueryString, query, setParams } = useQueryParams();

  // Obtener el número de página de los parámetros de consulta, por defecto es "1"
  const page = query.page ? query.page : "1";

  // Usar useDataFetch con el tipo genérico CountCollection
  const { fetchData: totalPages, isLoading, error } = useDataFetch<CountCollection>(
    "collection/totalPages",
    `${getQueryString()}`,
  );

  // Manejar el estado de carga
  if (isLoading) {
    return (
      <Loading
        className="m-6 flex items-center justify-center"
        color="primary"
        type="ring"
      />
    );
  }

  // Manejar errores
  if (error) {
    return (
      <div className="m-6 text-red-500 text-center">
        Ocurrió un error al cargar los datos: {error}
      </div>
    );
  }

  // Asegurarse de que totalPages no sea null
  if (!totalPages) {
    return null;
  }

  // Calcular el número total de páginas
  const totalPagesCount = Math.ceil(totalPages.count / 12);

  // Función para manejar la siguiente página
  const handleNextPage = () => {
    if (Number(page) < totalPagesCount && typeof page === "string") {
      const parsedPage = parseInt(page, 10);
      setParams("page", String(parsedPage + 1));
    }
  };

  // Función para manejar la página anterior
  const handlePrevPage = () => {
    if (Number(page) > 1 && typeof page === "string") {
      const parsedPage = parseInt(page, 10);
      setParams("page", String(parsedPage - 1));
    }
  };

  return (
    <div className="join m-6 border-2 border-gray-700">
      <button
        className="btn join-item bg-base-100 disabled:opacity-90"
        onClick={handlePrevPage}
        disabled={Number(page) === 1}
      >
        «
      </button>
      <button className="btn join-item bg-base-100">Página {page}</button>
      <button
        className="btn join-item bg-base-100"
        onClick={handleNextPage}
        disabled={Number(page) >= totalPagesCount}
      >
        »
      </button>
    </div>
  );
};
