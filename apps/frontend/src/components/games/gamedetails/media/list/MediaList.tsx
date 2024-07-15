interface MediaListProps {
  id?: number;
  url?: string;
  name?: string;
  className: string;
}

export const MediaList = ({ id, url, name, className }: MediaListProps) => {
  return (
    <li className="rounded-md border-2 border-gray-700 bg-base-300 bg-opacity-50 px-2 pt-2 shadow-md shadow-black">
      {url ? (
        <a href={url} target="_blank" rel="noreferrer" aria-label="Media Link">
          <span className={className}></span>
        </a>
      ) : (
        <span className={className}></span>
      )}
    </li>
  );
};
