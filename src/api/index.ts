import axios from 'axios';
import Config from 'react-native-config';

export const fetchProducts = async (category?: string) => {
    if (!Config.BASE_URL) { throw new Error('BASE_URL is not configured!'); }

    const url = category ? `${Config.BASE_URL}/category/${category}` : Config.BASE_URL;
    const response = await axios.get(url);
    return response.data.products;
};

export const fetchProductById = async (id: number) => {
    const response = await axios.get(`${Config.BASE_URL}/${id}`);
    return response.data;
};

export const fetchCategories = async () => {
    const response = await axios.get(`${Config.BASE_URL}/categories`);
    return response.data;
};

export const searchProducts = async (query: string) => {
    const response = await axios.get(`${Config.BASE_URL}/search?q=${query}`);
    return response.data.products;
};
