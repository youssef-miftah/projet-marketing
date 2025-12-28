import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Configuration axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le token JWT
api.interceptors.request.use((config) => {
  const token = Cookies.get('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Types
export interface User {
  id: string;
  email: string;
  nom?: string;
  prenom?: string;
  role: 'customer' | 'admin';
}

export interface Product {
  _id: string;
  nom: string;
  description: string;
  categorie: string;
  etat: string;
  prix: number;
  stock: number;
  images: string[];
  origine: string;
  impactEcologique: {
    co2Economise: number;
    description: string;
  };
  specifications?: Record<string, string>;
}

export interface Order {
  _id: string;
  userId: string;
  products: Array<{
    productId: string;
    quantity: number;
    price: number;
    nom: string;
  }>;
  total: number;
  statut: string;
  adresseLivraison: any;
  createdAt: string;
}

export interface Buyback {
  _id: string;
  userId: string;
  typeProduit: string;
  description: string;
  etat: string;
  photos: string[];
  prixPropose: number;
  prixAccepte?: number;
  statut: string;
  commentaireAdmin?: string;
}

// API Auth
export const authAPI = {
  register: async (data: { email: string; password: string; nom?: string; prenom?: string }) => {
    const response = await api.post('/auth/register', data);
    if (response.data.success && response.data.data.token) {
      Cookies.set('token', response.data.data.token, { expires: 7 });
    }
    return response.data;
  },

  login: async (data: { email: string; password: string }) => {
    const response = await api.post('/auth/login', data);
    if (response.data.success && response.data.data.token) {
      Cookies.set('token', response.data.data.token, { expires: 7 });
    }
    return response.data;
  },

  logout: () => {
    Cookies.remove('token');
  },

  getMe: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },
};

// API Products
export const getProducts = async (params?: {
  categorie?: string;
  etat?: string;
  minPrix?: string;
  maxPrix?: string;
  recyclé?: string;
  page?: string;
  limit?: string;
  sort?: string;
}) => {
  try {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value) queryParams.append(key, value);
      });
    }
    const response = await fetch(`${API_URL}/products?${queryParams.toString()}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    return { success: false, data: { products: [] } };
  }
};

export const getProductById = async (id: string) => {
  try {
    const response = await fetch(`${API_URL}/products/${id}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching product:', error);
    return { success: false };
  }
};

export const productsAPI = {
  getAll: getProducts,
  getById: getProductById,
  create: async (data: Partial<Product>) => {
    const response = await api.post('/products', data);
    return response.data;
  },
  update: async (id: string, data: Partial<Product>) => {
    const response = await api.put(`/products/${id}`, data);
    return response.data;
  },
  delete: async (id: string) => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  },
};

// API Orders
export const ordersAPI = {
  create: async (data: {
    products: Array<{ productId: string; quantity: number }>;
    adresseLivraison: any;
  }) => {
    const response = await api.post('/orders', data);
    return response.data;
  },
  getMyOrders: async () => {
    const response = await api.get('/orders/my-orders');
    return response.data;
  },
  getById: async (id: string) => {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  },
};

// API Buyback
export const buybackAPI = {
  submit: async (data: {
    typeProduit: string;
    description: string;
    etat: string;
    prixPropose: number;
    photos?: string[];
  }) => {
    const response = await api.post('/buyback', data);
    return response.data;
  },
  getMyBuybacks: async () => {
    const response = await api.get('/buyback/my-buybacks');
    return response.data;
  },
  getAll: async (params?: { statut?: string }) => {
    const queryParams = params ? new URLSearchParams(params).toString() : '';
    const response = await api.get(`/buyback?${queryParams}`);
    return response.data;
  },
  updateStatus: async (id: string, data: {
    statut?: string;
    prixAccepte?: number;
    commentaireAdmin?: string;
  }) => {
    const response = await api.put(`/buyback/${id}/update-status`, data);
    return response.data;
  },
};

export default api;

