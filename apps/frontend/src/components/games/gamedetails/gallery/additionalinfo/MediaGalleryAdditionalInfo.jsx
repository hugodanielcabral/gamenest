import propTypes from "prop-types";
import { AdditionalInfoWebsites } from "./websites/AdditionalInfoWebsites.jsx";
import { AdditionalInfoStoryline } from "./storyline/AdditionalInfoStoryline.jsx";
import { AdditionalInfoSpecifications } from "./specifications/AdditionalInfoSpecifications.jsx";
import { AdditionalInfoAgeRating } from "./ageRating/AdditionalInfoAgeRating.jsx";

export const MediaGalleryAdditionalInfo = ({ data }) => {
  //* Agregar read more al summary y storyline, el mismo abrira un modal con el contenido completo.
  //* Arreglar los iconos de los websites y agregarles un tooltip con el nombre del website(hacer uso de ref). Ademas, ubicarlos en el centro del contenedor.
  //* Agregar a la par del nombre del juego, las plataformas y las stores.
  //* Crear un componente "CardBackground", el cual permitira mostrar una imagen de fondo y un contenido encima de esta. El mismo sera utilizado en aditionalInfo, games page, collections, etc.
  //* Hacer uso de callbacks (como hice en la modal).
  return (
    <div className="col-span-4 grid grid-cols-3 gap-3">
      <AdditionalInfoStoryline data={data} />
      <AdditionalInfoWebsites data={data} />
      <AdditionalInfoSpecifications data={data} />
      <AdditionalInfoAgeRating data={data} />
    </div>
  );
};

MediaGalleryAdditionalInfo.propTypes = {
  data: propTypes.object,
};
