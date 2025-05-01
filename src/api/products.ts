import axios from 'axios';

const API_BASE = 'https://dummyjson.com';

export const fetchCategories = async () => {
    const response = await axios.get(`${API_BASE}/products/categories`);
    return response.data;
};

export const fetchProductsByCategory = async (category: string) => {
    const response = await axios.get(`${API_BASE}/products/category/${category}`);
    return response.data.products;
};

export const fetchProductById = async (id: number) => {
    const response = await axios.get(`${API_BASE}/products/${id}`);
    return response.data;
};
