import axios, { AxiosError } from "axios";
import type { BodyData } from "./types";

const API_BASE_URL = "http://localhost:9000";

const handleApiError = (error: AxiosError) => {
  console.error(error);
  throw error;
};

export const getDataApi = async (token: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/locations`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    handleApiError(error as AxiosError);
  }
};

export const createDataApi = async (body: string, token: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/locations`, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    handleApiError(error as AxiosError);
  }
};

export const deleteDataApi = async (id: string) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/locations/${id}`);
    return response;
  } catch (error) {
    handleApiError(error as AxiosError);
  }
};

export const editDataApi = async (id: string, body: BodyData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/locations/${id}`, body);
    return response;
  } catch (error) {
    handleApiError(error as AxiosError);
  }
};

export const toggleFavoriteData = async (id: string) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/locations/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    handleApiError(error as AxiosError);
  }
};

export const authenticate = async (body: string) => {
  const response = await axios.post(`${API_BASE_URL}/sessions`, body);
  return response;
};

export const register = async (body: string) => {
  const response = await axios.post(`${API_BASE_URL}/register`, body);

  return response;
};
