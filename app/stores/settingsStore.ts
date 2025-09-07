import { Address, CartProduct, Dict, Product, Review, Notification ,Tag, User } from '@/app/types/types';
import { Cart, Image, Order } from '@prisma/client';
import axios from 'axios';
import { create } from 'zustand';

interface settingsStore {
    shippingMethod: "online" | "inPerson" | "isfahan" | null,
    paymentMethod: "transfer" | "debitCard" | "inPerson" | null,
    loading: boolean,
    error: string | null,

    // Actions
    setShippingMethod: (shippingMethod: "online" | "inPerson" | "isfahan" | null) => void;
    setPaymentMethod: (paymentMethod: "transfer" | "debitCard" | "inPerson" | null) => void;
}

const initialState = {
    shippingMethod: null,
    paymentMethod: null,
    loading: false,
    error: null
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

export const useSettingsStore = create<settingsStore>()((set, get) => ({
    ...initialState,

    setShippingMethod: (shippingMethod) => set({ shippingMethod }),
    setPaymentMethod: (paymentMethod) => set({ paymentMethod }),

    initializeStore: async () => {

    },


    clearError: () => set({ error: '' }),

    reset: () => {
        set(initialState);
    }
}));