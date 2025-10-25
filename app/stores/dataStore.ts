import { Address, CartProduct, Dict, Product, Review, Notification ,Tag, User } from '@/app/types/types';
import { Cart, Image, Order } from '@prisma/client';
import axios from 'axios';
import { create } from 'zustand';

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

const initialDict: Dict = {
    logo: "SoleymaniRice",
    logoPt1: "Soleimani",
    logoPt2: "Rice",
    search: "Search",
    in: "in",
    enterEmailOrPhone: "Please enter your email or phone number",
    selectYourRegion: "Select your region",
    otherProducts: "Other Products",
    seeAllProducts: "All Products", 
    region: "Region",
    unitedArabEmirates: "United Arab Emirates",
    iran: "Iran",
    accountDetails: "Account Details",
    logout: "Logout",
    myOrders: "My Orders",
    inProgress: "In Progress",
    canceled: "Canceled",
    sent: "Sent",
    description: "Description",
    no: "No",
    reviews: "Reviews",
    similarProducts: "Similar Products",
    recommendations: "Recommendations",
    activitySummary: "Activity Summary",
    ERROR_MESSAGES: {
        PHONE_NUMBER: "Please enter a valid phone number",
        PHONE_NUMBER_AND_EMAIL: "Please enter a valid phone number or email",
        POSTAL_CODE: "Postal code must be 10 digits",
        FIRST_NAME: "First name must be 3-20 characters",
        LAST_NAME: "Last name must be 3-25 characters",
        EMAIL: "Please enter a valid email address",
        URL: "Must be a valid URL starting with http or https",
        REQUIRED: "Dont leave this section empty"
    },
    links: {
        about: "About Us",
        contact: "Contact",
        products: "Products",
        home: "Home",
        users: "Users"
    },
    account: {
        register: "Register",
        login: "Login",
        logout: "LogOut",
        profile: "Profile",
        history: "History"
    },
    content: {
        homepage: {
            seeOurProducts: "our products",
            description: {
                first: {
                    title: "Unique aroma",
                    body: "Feel the pleasant smell of the northern rice fields in your home with every cooking."
                },
                second: {
                    title: "Exceptional taste",
                    body: "Each grain of taremi is tender and delicious, the pleasure of every bite is complete with this rice."
                },
                third: {
                    title: "Premium quality",
                    body: "From our best farms, straight to your table. Fresh and healthy, as it should be."
                }
            }
        }
    },
    shoppingCart: {
        continue: "continue"
    },
    product:{
        addToCart: "Add to Cart",
        deleteFromCart: "Delete from Cart",
        price: "Price",
        perkg: "per kg",
        currency: "$",
        label: "Label",
        massUnit: "Kg",
        products: {
            برنج_روس: "برنج روس",
            برنج_کشت_دوم: "Second Crop Rice",
            برنج_قهوه_ای: "Brown Rice",
            برنج_طارم_عطری: "Tarom Atri Rice",
            برنج_طارم_فجر: "Tarom Fajr Rice",
            برنج_بسمتی: "Basmati Rice",
            برنج_هندی: "Indian Rice",
            برنج_ژاپنی: "Japanease Rice",
            "برنج_وحشی": "Wild Rice",
            "برنج_سیاه": "Black Rice",
            "برنج_دودی": "Smoked Rice",
            "خرده_برنج": "Broken Rice"
        },
        "categories": {
            "برنج_ایرانی": "Iranian Rice",
            "برنج_خاص": "Premium Rice",
            "برنج_رنگی": "Colored Rice",
            "برنج_وارداتی": "Imported Rice",
            "برنج_کشت_دوم": "Second Crop Rice"
        }
    },
    finalSum: "Final Sum",
    productsPrice: "Products Price",
    discount: "Discount",
    completeTheOrder: "Complete the Order",
    postalCode: "Postal Code",
    reciever: "Receiver",
    buyDirectlyFromTheStore: "Buy Directly from the Store",
    shipToIsfahan: "Ship to Isfahan",
    otherCities: "Other Cities",
    fee: "Fee",
    continue: "Continue",
    shipping: "Shipping",
    and: "And",
    address: "Address",
    pay: "Pay",
    payment: "Payment",
    payOnTheSpot: "Pay on the Spot",
    payOnTheSpotUsingCashOrCreditCard: "Pay on the Spot Using Cash or Credit Card",
    payOnline: "Pay Online",
    zarinPal: "ZarinPal",
    portal: "Portal",
    transferTheMoney: "Transfer the Money",
    TransferTo: "Transfer To",
    free: "Free",
    categories: "Categories",
    ordersHistory: "Orders History",
    noOrdersHistory: "No Orders History",
    youHaveNoNotifications: "You Have no Notifications",
    email: "Email",
    phoneNumber: "Phone Number",
    fullName: "Full Name",
    nationalCode: "National Code",
    orders: "Orders",
    addresses: "Addresses",
    users: "Users",
    notifications: "Notifications",
    products: "Products",
    firstName: "First Name",
    lastName: "Last Name",
    confirm: "Confirm",
    edit: "Edit",
    delete: "Delete",
    province: "Province",
    city: "City",
    plate: "Plate",
    unit: "Unit",
    mainHeading: "Premium Iranian Rice from Northern Iran - SoleymaniRice",
    mainSection: "Welcome to SoleymaniRice (برنج پورسلیمانی), your trusted source for authentic Iranian rice straight from the fertile fields of Northern Iran. For generations, our family has cultivated and selected the finest rice varieties, bringing the taste of Persian tradition to your table. Free Delivery | Premium Quality | Direct from Northern Iran",
    aboutSectionHeading: "Authentic Iranian Rice from the Heart of Northern Iran",
    aboutSection: "SoleymaniRice specializes in premium Iranian rice varieties sourced directly from the lush paddy fields of Northern Iran, where the perfect climate and rich soil produce the world's most aromatic and flavorful rice. Our commitment to quality ensures that every grain meets the highest standards of Persian culinary excellence. From the misty mountains of Gilan to the verdant plains of Mazandaran, Northern Iran has been the cradle of rice cultivation for centuries. We honor this heritage by bringing you only the finest selections, hand-picked and carefully processed to preserve their natural aroma, texture, and nutritional value.",
    productsSectionHeading: "Our Premium Iranian Rice Collection",
    برنج_کشت_دوم: "Our carefully selected Second Crop Rice offers excellent value without compromising on quality. Grown in the same fertile fields of Northern Iran, this rice provides authentic taste and texture at an accessible price point. Best for: Daily cooking, Adas Polo, Budget-friendly meals",
    برنج_طارم_عطری: "Known for its exceptional fragrance, Tarom Atri rice lives up to its name ('atri' means aromatic). This premium rice variety from Northern Iran offers a beautiful balance of taste and texture, making it ideal for special occasions and gourmet Persian cuisine. Best for: Shirin Polo, Albaloo Polo, Wedding dishes",
    برنج_طارم_فجر: "A premium variety from Northern Iran, Tarom Fajr rice is renowned for its medium grains, delicate aroma, and perfect texture. This rice variety is favored by Persian chefs for its ability to create the perfect tahdig while maintaining fluffy, separate grains. Best for: Everyday meals, Loobia Polo, Kateh",
    برنج_بسمتی: "Experience the legendary aroma and elongated grains of authentic Iranian Basmati rice. Perfect for tahdig, polo, and traditional Persian dishes, our Basmati rice offers exceptional quality with a distinctive nutty flavor and fluffy texture after cooking. Best for: Zereshk Polo, Sabzi Polo, Tahchin",
    ourDifferenceHeading: "The SoleymaniRice Difference",
    ourDifference: "✓ Sourced from Northern Iran - Direct from Gilan and Mazandaran provinces ✓ Traditional Selection - Time-honored methods for quality assurance ✓ Premium Quality - Every grain inspected for excellence ✓ Authentic Taste - Genuine Persian rice varieties ✓ Family Heritage - Generations of rice expertise ✓ Freshness Guaranteed - Properly stored and quickly delivered",
    originHeading: "Northern Iran - The Home of Premium Rice", 
    origin: "The provinces of Northern Iran, particularly Gilan and Mazandaran, are blessed with ideal conditions for rice cultivation: abundant rainfall, rich alluvial soil, and the perfect climate. This region has been producing the world's finest rice for over a thousand years. At SoleymaniRice, we partner with trusted farmers in these regions to bring you rice that embodies the essence of Persian culinary tradition. Each variety is carefully harvested, aged when appropriate, and processed to maintain its natural characteristics.",
    footerContent: "SoleymaniRice is a family-owned business specializing in authentic Iranian rice from Northern Iran. We offer premium varieties including Basmati, Tarom Fajr, Tarom Atri, and Second Crop Rice, all sourced directly from trusted farmers in Gilan and Mazandaran provinces."

};

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
            get().fetchProducts(lang),
            get().fetchOrders(lang),
            get().fetchImages(lang),
            // get().fetchNotifications(lang, userId),
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
export const selectCartProducts = (state: DataStore) => state.cartProducts;
export const selectNotifications = (state: DataStore) => state.notifications;
export const selectAddresses = (state: DataStore) => state.addresses;
export const selectReviews = (state: DataStore) => state.reviews;
export const selectDict = (state: DataStore) => state.dict;
export const selectIsRTL = (state: DataStore) => state.isRTL;
export const selectError = (state: DataStore) => state.error;
export const selectLoading = (state: DataStore) => state.loading;

export default useDataStore;