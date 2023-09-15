import axios, { AxiosError } from "axios";
import type { BodyData } from "./types";

const API_BASE_URL = "http://localhost:9000/locations";

const handleApiError = (error: AxiosError) => {
  console.error(error);
  throw error;
};

export const getDataApi = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response;
  } catch (error) {
    handleApiError(error as AxiosError);
  }
};

export const createDataApi = async (body: BodyData) => {
  try {
    const response = await axios.post(API_BASE_URL, body);
    return response;
  } catch (error) {
    handleApiError(error as AxiosError);
  }
};

export const deleteDataApi = async (id: string) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    return response;
  } catch (error) {
    handleApiError(error as AxiosError);
  }
};

export const editDataApi = async (id: string, body: BodyData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${id}`, body);
    return response;
  } catch (error) {
    handleApiError(error as AxiosError);
  }
};

export const toggleFavoriteData = async (id: string) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/${id}`);
    return response;
  } catch (error) {
    handleApiError(error as AxiosError);
  }
};
