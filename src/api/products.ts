import Config from 'react-native-config';
import { loadUrlsWithTTFB } from '../utils/metrics';

const BASE_URL = Config.BASE_URL;

export const fetchCategories = async () => {
    const result = await loadUrlsWithTTFB(`${BASE_URL}/products/categories`);

    if (result !== -1) {
        return result.data;
    }

    return [];
};

export const fetchProductsByCategory = async (category: string) => {
    const result = await loadUrlsWithTTFB(`${BASE_URL}/products/category/${category}`);

    if (result !== -1) {
        return result.data.products;
    }

    return [];
};

export const fetchProductById = async (id: number) => {
    const result = await loadUrlsWithTTFB(`${BASE_URL}/products/${id}`);

    if (result !== -1) {
        return result.data.products;
    }

    return [];
};

export async function fetchProductsByQuery(query: string) {
    const result = await loadUrlsWithTTFB(`${BASE_URL}/products/search?q=${encodeURIComponent(query)}`);

    if (result !== -1) {
        return result.data.products;
    }

    return [];
}
