// Database service using Supabase
import { supabase } from './supabase';

// Types
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  image_url: string;
  created_at?: string;
}

export interface Reservation {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  special_requests: string;
  status: 'en attente' | 'en cours' | 'termine';
  created_at?: string;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  read: boolean;
  created_at?: string;
}

export interface Order {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  items: string;
  total: string;
  special_requests: string;
  status: 'en attente' | 'en cours' | 'termine';
  created_at?: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  approved: boolean;
  created_at?: string;
}

export interface Admin {
  id: string;
  email: string;
  password: string;
}

// Menu Items
export const getMenuItems = async (): Promise<MenuItem[]> => {
  const { data, error } = await supabase
    .from('menu_items')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching menu items:', error);
    return [];
  }
  return data || [];
};

export const addMenuItem = async (item: Omit<MenuItem, 'id' | 'created_at'>): Promise<MenuItem | null> => {
  const { data, error } = await supabase
    .from('menu_items')
    .insert(item)
    .select()
    .single();
  
  if (error) {
    console.error('Error adding menu item:', error);
    return null;
  }
  return data;
};

export const updateMenuItem = async (id: string, item: Partial<MenuItem>): Promise<MenuItem | null> => {
  const { data, error } = await supabase
    .from('menu_items')
    .update(item)
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating menu item:', error);
    return null;
  }
  return data;
};

export const deleteMenuItem = async (id: string): Promise<boolean> => {
  const { error } = await supabase
    .from('menu_items')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting menu item:', error);
    return false;
  }
  return true;
};

// Reservations
export const getReservations = async (): Promise<Reservation[]> => {
  const { data, error } = await supabase
    .from('reservations')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching reservations:', error);
    return [];
  }
  return data || [];
};

export const addReservation = async (reservation: Omit<Reservation, 'id' | 'created_at' | 'status'>): Promise<Reservation | null> => {
  const { data, error } = await supabase
    .from('reservations')
    .insert({ ...reservation, status: 'en attente' })
    .select()
    .single();
  
  if (error) {
    console.error('Error adding reservation:', error);
    return null;
  }
  return data;
};

export const updateReservation = async (id: string, data: Partial<Reservation>): Promise<Reservation | null> => {
  const { data: updated, error } = await supabase
    .from('reservations')
    .update(data)
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating reservation:', error);
    return null;
  }
  return updated;
};

export const deleteReservation = async (id: string): Promise<boolean> => {
  const { error } = await supabase
    .from('reservations')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting reservation:', error);
    return false;
  }
  return true;
};

// Contacts
export const getContacts = async (): Promise<Contact[]> => {
  const { data, error } = await supabase
    .from('contacts')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching contacts:', error);
    return [];
  }
  return data || [];
};

export const addContact = async (contact: Omit<Contact, 'id' | 'created_at' | 'read'>): Promise<Contact | null> => {
  const { data, error } = await supabase
    .from('contacts')
    .insert({ ...contact, read: false })
    .select()
    .single();
  
  if (error) {
    console.error('Error adding contact:', error);
    return null;
  }
  return data;
};

export const markContactAsRead = async (id: string): Promise<boolean> => {
  const { error } = await supabase
    .from('contacts')
    .update({ read: true })
    .eq('id', id);
  
  if (error) {
    console.error('Error marking contact as read:', error);
    return false;
  }
  return true;
};

export const deleteContact = async (id: string): Promise<boolean> => {
  const { error } = await supabase
    .from('contacts')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting contact:', error);
    return false;
  }
  return true;
};

// Orders
export const getOrders = async (): Promise<Order[]> => {
  const { data, error } = await supabase
    .from('commandes')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching orders:', error);
    return [];
  }
  return data || [];
};

export const addOrder = async (order: Omit<Order, 'id' | 'created_at' | 'status'>): Promise<Order | null> => {
  const { data, error } = await supabase
    .from('commandes')
    .insert({ ...order, status: 'en attente' })
    .select()
    .single();
  
  if (error) {
    console.error('Error adding order:', error);
    return null;
  }
  return data;
};

export const updateOrder = async (id: string, data: Partial<Order>): Promise<Order | null> => {
  const { data: updated, error } = await supabase
    .from('commandes')
    .update(data)
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating order:', error);
    return null;
  }
  return updated;
};

export const deleteOrder = async (id: string): Promise<boolean> => {
  const { error } = await supabase
    .from('commandes')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting order:', error);
    return false;
  }
  return true;
};

// Reviews (Avis)
export const getApprovedReviews = async (): Promise<Review[]> => {
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('approved', true)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching reviews:', error);
    return [];
  }
  return data || [];
};

export const getAllReviews = async (): Promise<Review[]> => {
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching reviews:', error);
    return [];
  }
  return data || [];
};

export const addReview = async (review: Omit<Review, 'id' | 'created_at' | 'approved'>): Promise<Review | null> => {
  const { data, error } = await supabase
    .from('reviews')
    .insert({ ...review, approved: false })
    .select()
    .single();
  
  if (error) {
    console.error('Error adding review:', error);
    return null;
  }
  return data;
};

export const approveReview = async (id: string): Promise<boolean> => {
  const { error } = await supabase
    .from('reviews')
    .update({ approved: true })
    .eq('id', id);
  
  if (error) {
    console.error('Error approving review:', error);
    return false;
  }
  return true;
};

export const deleteReview = async (id: string): Promise<boolean> => {
  const { error } = await supabase
    .from('reviews')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting review:', error);
    return false;
  }
  return true;
};

// Admin Authentication
export const adminLogin = async (email: string, password: string): Promise<{ success: boolean; admin?: { email: string }; message?: string }> => {
  const { data, error } = await supabase
    .from('admin')
    .select('*')
    .eq('email', email)
    .single();
  
  if (error || !data) {
    return { success: false, message: 'Email ou mot de passe incorrect' };
  }
  
  if (data.password === password) {
    return { success: true, admin: { email: data.email } };
  }
  
  return { success: false, message: 'Email ou mot de passe incorrect' };
};

// Initialize database with default data if needed
export const initDatabase = async () => {
  // Check if we have menu items
  const { count } = await supabase
    .from('menu_items')
    .select('*', { count: 'exact', head: true });
  
  if (count === 0) {
    // Add default menu items
    const defaultItems = [
      {
        name: 'Amiwo au Poulet',
        description: 'Le classique du Benin. Pommes de terre grillees accompagnees de sauce tomate epicee et poulet roti.',
        price: '4.500 XOF',
        category: 'Signature',
        image_url: '/images/amiwo.jpg'
      },
      {
        name: 'Wagassi Grille',
        description: 'Fromage deinggu traditionnellement grille, accompagne de Sauce Arachide et de pikliz.',
        price: '3.500 XOF',
        category: 'Signature',
        image_url: '/images/wagassi.jpg'
      },
      {
        name: 'Foutou Banane',
        description: 'Puree de bananes plantains pilee, servie avec sauce graine et viande de boeuf.',
        price: '5.000 XOF',
        category: ' Traditionnel',
        image_url: '/images/foutou.jpg'
      }
    ];
    
    await supabase.from('menu_items').insert(defaultItems);
  }
  
  // Check if admin exists
  const { count: adminCount } = await supabase
    .from('admin')
    .select('*', { count: 'exact', head: true });
  
  if (adminCount === 0) {
    // Add default admin
    await supabase.from('admin').insert({
      email: 'admin@gmail.com',
      password: 'admin123'
    });
  }
};
