import axios from 'axios';
import Config from 'react-native-config';

const BASE_URL = Config.BASE_URL;

export const fetchCategories = async () => {
    const response = await axios.get(`${BASE_URL}/products/categories`);
    return response.data;
};

export const fetchProductsByCategory = async (category: string) => {
    const response = await axios.get(`${BASE_URL}/products/category/${category}`);
    return response.data.products;
};

export const fetchProductById = async (id: number) => {
    const response = await axios.get(`${BASE_URL}/products/${id}`);
    return response.data;
};

export async function fetchProductsByQuery(query: string) {
    const response = await axios.get(`${BASE_URL}/products/search?q=${encodeURIComponent(query)}`);
    return response.data.products;
  }
