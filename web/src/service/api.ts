import axios from "axios";

interface BodyData {
  local: string;
  country: string;
  description: string;
}

export const getDataApi = async () => {
  try {
    const response = await axios.get("http://localhost:9000/locations");
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const createDataApi = async (body: BodyData) => {
  const { local, country, description } = body;

  try {
    const response = await axios.post("http://localhost:9000/locations", {
      local,
      country,
      description,
    });

    return response;
  } catch (error) {
    console.error(error);
  }
};

export const deleteDataApi = async (id: string) => {
  try {
    const response = await axios.delete(
      `http://localhost:9000/locations/${id}`
    );

    return response;
  } catch (error) {
    console.error(error);
  }
};

export const editDataApi = async (id: string, body: BodyData) => {
  const { local, country, description } = body;

  try {
    const response = await axios.put(`http://localhost:9000/locations/${id},`, {
      local,
      country,
      description,
    });

    return response;
  } catch (error) {
    console.error(error);
  }
};
