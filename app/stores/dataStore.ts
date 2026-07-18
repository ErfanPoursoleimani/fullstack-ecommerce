import { Address, CartProduct, Dict, Product, Review, Notification ,Tag, User } from '@/app/types/types';
import { Cart, Image, Order } from '@prisma/client';
import axios from 'axios';
import { create } from 'zustand';
import { initialDict } from './initialData';

// Add these interfaces if they don't exist in your types


interface DataStore {
    // State
    users: User[];
    carts: Cart[];
    products: Product[];
    tags: Tag[];
    cartProducts: CartProduct[];
    orders: Order[];
    images: Image[];
    notifications: Notification[];
    addresses: Address[];
    reviews: Review[];
    dict: Dict;
    isRTL: boolean;
    error: string;
    loading: boolean;
    
    // Configuration
    lang: string;
    cartId: number | null;
    isAuthenticated: boolean
    
    // Actions
    setUsers: (users: User[]) => void;
    setCarts: (carts: Cart[]) => void;
    setProducts: (products: Product[]) => void;
    setTags: (tags: Tag[]) => void;
    setCartProducts: (lang: string, cartProducts: CartProduct[], productId: number, cartId: number | null) => void;
    setOrders: (orders: Order[]) => void;
    setImages: (images: Image[]) => void;
    setNotifications: (notifications: Notification[]) => void;
    setAddresses: (addresses: Address[]) => void;
    setReviews: (reviews: Review[]) => void;
    setDict: (dict: Dict) => void;
    setError: (error: string) => void;
    setLoading: (loading: boolean) => void;
    setLang: (lang: string) => void;
    setCartId: (cartId: number | null) => void;
    setIsAuthenticated: (isAuthenticated: boolean) => void
    removeProduct: (productId: number) => void
    addProduct: (product: Product) => void
    
    // API Actions
    fetchTags: (lang: string) => Promise<void>;
    fetchUsers: (lang: string) => Promise<void>;
    fetchCarts: (lang: string) => Promise<void>;
    fetchProducts: (lang: string) => Promise<void>;
    fetchOrders: (lang: string) => Promise<void>;
    fetchImages: (lang: string) => Promise<void>;
    fetchNotifications: (lang: string, userId?: number | null) => Promise<void>;
    fetchAddresses: (lang: string, userId?: number | null) => Promise<void>;
    fetchReviews: (lang: string, userId?: number | null) => Promise<void>;
    fetchCartProducts: (lang: string, isAuthenticated: boolean, cartId?: number | null) => Promise<void>;
    fetchDict: (lang: string) => Promise<void>;
    
    // Utility Actions
    initializeStore: (lang: string, isAuthenticated: boolean, cartId?: number | null, userId?: number | null) => Promise<void>;
    clearError: () => void;
    getProduct: (productId: number) => Product | null;
    reset: () => void;
}

const initialState = {
    users: [],
    carts: [],
    products: [],
    tags: [],
    cartProducts: [],
    orders: [],
    images: [],
    notifications: [],
    addresses: [],
    reviews: [],
    dict: initialDict,
    isRTL: false,
    error: '',
    loading: false,
    lang: 'en',
    cartId: null,
    isAuthenticated: false,
};


const cookieManager = {
    get: (name: string) => {
        if (typeof window === 'undefined') return null;
        try {
            const cookies = document.cookie.split(';');
            for (let cookie of cookies) {
                const [key, value] = cookie.trim().split('=');
                if (key === name) return decodeURIComponent(value);
            }
            return null;
        } catch (error) {
            console.error('Error reading cookie:', error);
            return null;
        }
    },
    delete: (name: string, path: string = '/', domain?: string) => {
        if (typeof window === 'undefined') return;
        try {
            let cookieString = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path};`;
            
            // Add domain if specified
            if (domain) {
                cookieString += ` domain=${domain};`;
            }
            
            document.cookie = cookieString;
        } catch (error) {
            console.error('Error deleting cookie:', error);
        }
    },
};

export const useDataStore = create<DataStore>()((set, get) => ({
    // Initial State
    ...initialState,

    // Basic Setters
    setUsers: (users) => set({ users }),
    setCarts: (carts) => set({ carts }),
    setProducts: (products) => set({ products }),
    setTags: (tags) => set({ tags }),
    setCartProducts: async(lang, cartProducts, productId ,cartId) => {
        set({loading: true})
        /* const updatedCartProducts: CartProduct[] = []
        if(get().cartId) {
            try {
                {cartProducts.map(async(cartProduct)=> {
                    const { data: updatedCartProduct } = await axios.post(`/${lang}/api/carts?cartId${cartId}&productId=${productId}`, cartProduct)
                    updatedCartProducts.push(updatedCartProduct)
                })}
            } catch (error) {
                set({error: "Error POST cartProducts"})
            }
        }
        set({ cartProducts: get().cartId ? updatedCartProducts : cartProducts }) */
        set({ cartProducts: [...cartProducts] })
        set({loading: false})
    },
    setOrders: (orders) => set({ orders }),
    setImages: (images) => set({ images }),
    setNotifications: (notifications) => set({ notifications }),
    setAddresses: (addresses) => set({ addresses }),
    setReviews: (reviews) => set({ reviews }),
    setDict: (dict) => set({ dict }),
    setError: (error) => set({ error }),
    setLoading: (loading) => set({ loading }),
    setLang: (lang) => {
        set({ lang, isRTL: lang === 'fa' || lang === 'ar' });
        get().fetchDict(lang);
    },
    setCartId: (cartId) => set({ cartId }),
    setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),

    // API Actions
    fetchTags: async (lang: string) => {
        try {
            set({ loading: true });
            const { data } = await axios.get(`/${lang}/api/tags`);
            console.log(data)
            set({ tags: data, loading: false });
        } catch (err) {
            set({ error: err as string, loading: false });
        }
    },

    fetchUsers: async (lang: string) => {
        try {
            set({ loading: true });
            const { data } = await axios.get(`/${lang}/api/users`);
            set({ users: data, loading: false });
        } catch (err) {
            set({ error: err as string, loading: false });
        }
    },

    fetchCarts: async (lang: string) => {
        try {
            set({ loading: true });
            const { data } = await axios.get(`/${lang}/api/carts`);
            set({ carts: data, loading: false });
        } catch (err) {
            set({ error: err as string, loading: false });
        }
    },

    fetchProducts: async (lang: string) => {
        try {
            set({ loading: true });
            const { data } = await axios.get(`/${lang}/api/products`);
            set({ products: data, loading: false });
        } catch (err) {
            set({ error: err as string, loading: false });
        }
    },

    fetchOrders: async (lang: string) => {
        try {
            set({ loading: true });
            const { data } = await axios.get(`/${lang}/api/orders`);
            set({ orders: data, loading: false });
        } catch (err) {
            set({ error: err as string, loading: false });
        }
    },

    fetchImages: async (lang: string) => {
        try {
            set({ loading: true });
            const { data } = await axios.get(`/${lang}/api/images`);
            set({ images: data, loading: false });
        } catch (err) {
            set({ error: err as string, loading: false });
        }
    },

    removeProduct: (productId: number) => set((state) => ({
        products: state.products.filter(p => p.id !== productId)
    })),
    
    addProduct: (product) => set((state) => ({
        products: [...state.products, product]
    })),

    fetchNotifications: async (lang: string, userId?: number | null) => {
        try {
            set({ loading: true });
            const { data } = await axios.get(`/${lang}/api/notifications?userId=${userId}`);
            set({ notifications: data, loading: false });
        } catch (err) {
            set({ error: err as string, loading: false });
        }
    },

    fetchAddresses: async (lang: string, userId?: number | null) => {
        try {
            set({ loading: true });
            const { data } = await axios.get(`${userId 
                                                    ? `/${lang}/api/addresses?userId=${userId}` 
                                                    : `/${lang}/api/addresses`}`);
            set({ addresses: data, loading: false });
        } catch (err) {
            set({ error: err as string, loading: false });
        }
    },

    fetchReviews: async (lang: string, userId?: number | null) => {
        try {
            set({ loading: true });
            const { data } = await axios.get(`/${lang}/api/reviews?userId=${userId}`);
            set({ reviews: data, loading: false });
        } catch (err) {
            set({ error: err as string, loading: false });
        }
    },

    fetchCartProducts: async (lang: string, isAuthenticated, cartId?: number | null) => {
        try {
            set({ loading: true });
            if (isAuthenticated) {
                if (cookieManager.get('cartProducts')) {
                    const parsedCookieCartProducts = cookieManager.get('cartProducts');
                    const cookieProducts: CartProduct[] = JSON.parse(parsedCookieCartProducts!);
                    for (const cartProduct of cookieProducts) {
                        await axios.post(`/${lang}/api/cartProducts?cartId=${cartId}&productId=${cartProduct.productId}`, cartProduct);
                    }
                    cookieManager.delete('cartProducts');
                }
                const { data } = await axios.get(`/${lang}/api/cartProducts?cartId=${cartId}`);
                set({ cartProducts: [...(data.cartProducts || [])] });
            } else {
                const cookieData = cookieManager.get('cartProducts');
                const cartProducts = cookieData ? JSON.parse(cookieData) : [];
                set({ cartProducts: [...cartProducts] });
            }
        } catch (err) {
            set({ error: err as string });
        } finally {
            set({ loading: false })
        }
    },

    fetchDict: async (lang: string) => {
        try {
            set({ loading: true });
            const { data } = await axios.get(`/${lang}/api/dictionary?locale=${lang}`);
            set({ dict: data, loading: false });
        } catch (err) {
            set({ error: err as string, loading: false });
        }
    },

    // Initialize Store (replaces your useEffect logic)
    initializeStore: async (lang: string, isAuthenticated ,cartId?: number | null, userId?: number | null) => {
        set({ lang, cartId, isRTL: lang === 'fa' || lang === 'ar' });
        
        // Fetch all data in parallel
        const promises = [
            get().fetchTags(lang),
            get().fetchUsers(lang),
            get().fetchCarts(lang),
            get().fetchOrders(lang),
            get().fetchImages(lang),
            // get().fetchNotifications(lang, userId),
            get().fetchProducts(lang),
            get().fetchAddresses(lang, userId),
            // get().fetchReviews(lang, userId),
            get().fetchDict(lang),
            get().fetchCartProducts(lang, isAuthenticated, cartId),
        ];

        try {
            await Promise.all(promises);
        } catch (error) {
            console.error('Error initializing store:', error);
            set({ error: 'Failed to initialize store', loading: false });
        }
    },

    // Utility Actions
    clearError: () => set({ error: '' }),

    getProduct: (productId: number) => {
        const { products } = get();
        return products.find(p => p.id === productId) || null;
    },

    // Reset function - restores all state to initial values (no localStorage clearing)
    reset: () => {
        set(initialState);
        // Only clear cookies related to cart
        cookieManager.delete('cartProducts');
    }
}));

export const selectProducts = (state: DataStore) => state.products;
export const selectAddresses = (state: DataStore) => state.addresses;
export const selectCartProducts = (state: DataStore) => state.cartProducts;
export const selectNotifications = (state: DataStore) => state.notifications;
export const selectReviews = (state: DataStore) => state.reviews;
export const selectDict = (state: DataStore) => state.dict;
export const selectIsRTL = (state: DataStore) => state.isRTL;
export const selectError = (state: DataStore) => state.error;
export const selectLoading = (state: DataStore) => state.loading;

export default useDataStore;