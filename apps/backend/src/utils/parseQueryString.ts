interface ParseQueryStringFn {
  (query: string): { [key: string]: string } | undefined; // ✅ Cambiar tipo de retorno
}

type AllowedCols = "platform_name" | "game_name" | "genres" | "status_name" | "ownership_name";

const ALLOWED_COLUMNS: readonly AllowedCols[] = [
  "platform_name", 
  "game_name", 
  "genres", 
  "status_name", 
  "ownership_name"
] as const;

export const parseQueryString: ParseQueryStringFn = (queryString) => {
  if (!queryString?.trim()) return undefined;
  
  const splitString = queryString.split(";");
  const result: { [key: string]: string } = {}; 

  for (const filter of splitString) {
    if (!filter) continue;
    
    const [col, val] = filter.split(":");
    
    if (ALLOWED_COLUMNS.includes(col as AllowedCols) && val?.trim()) {
      result[col] = val.trim();
    }
  }

  return Object.keys(result).length > 0 ? result : undefined;
};