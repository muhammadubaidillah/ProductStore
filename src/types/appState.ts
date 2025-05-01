import { CartItem } from './cartItem';
import { Product } from './product';
import { Category } from './category';

export interface AppState {
    cart: {
        items: CartItem[];
        totalQuantity: number;
        lastUpdated: number | null;
    };
    products: {
        items: Product[];
        status: 'idle' | 'loading' | 'succeeded' | 'failed';
        error: string | null;
    };
    category: {
        categories: Category[];
        loading: boolean;
        error: string | null;
    };
}
