const BASE_URL = import.meta.env.VITE_BASE_URL;

export const GET = async (url: string) => {
  try {
    const response = await fetch(`${BASE_URL}${url}`, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": "true",
      },
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response.json();
  } catch (error) {
    console.error(error);
  }
};

export const POST = async (url: string, data: any) => {
  try {
    const response = await fetch(`${BASE_URL}${url}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": "true",
      },
      body: JSON.stringify(data),
    });
      
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const PATCH = async (url: string, data: any) => {
  try {
    const response = await fetch(`${BASE_URL}${url}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": "true",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response.json();
  } catch (error) {
    console.error(error);
  }
}
