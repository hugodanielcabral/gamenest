export const GameDetailsGallery = () => {
  const data = [
    {
      image: "https://via.placeholder.com/300x200",
    },
    {
      image: "https://via.placeholder.com/300x200",
    },
    {
      image: "https://via.placeholder.com/300x200",
    },
    {
      image: "https://via.placeholder.com/300x200",
    },
    {
      image: "https://via.placeholder.com/300x200",
    },
    {
      image: "https://via.placeholder.com/300x200",
    },
    {
      image: "https://via.placeholder.com/300x200",
    },
    {
      image: "https://via.placeholder.com/300x200",
    },
    {
      image: "https://via.placeholder.com/300x200",
    },
    {
      image: "https://via.placeholder.com/300x200",
    },
    {
      image: "https://via.placeholder.com/300x200",
    },
  ];

  return (
    <div className="flex flex-col gap-5">
      <div className="p-3 bg-green-600">
        <h2 className="text-2xl font-bold">Screenshots</h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-5">
          {data.map((item, index) => (
            <img key={index} src={item.image} alt="artwork" />
          ))}
        </div>
      </div>
      <div className="p-3 bg-pink-600">
        <h2 className="text-2xl font-bold">Artworks</h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-5">
          {data.map((item, index) => (
            <img key={index} src={item.image} alt="artwork" />
          ))}
        </div>
      </div>
      <div className="p-3 bg-blue-600">
        <h2 className="text-2xl font-bold">Videos</h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-5">
          {data.map((item, index) => (
            <img key={index} src={item.image} alt="artwork" />
          ))}
        </div>
      </div>
    </div>
  );
};
