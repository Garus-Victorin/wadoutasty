-- ============================================
-- Script de creation des tables WADOU Tasty
-- Pour Supabase
-- ============================================

-- ============================================
-- Table: admin (Gestion des administrateurs)
-- ============================================
CREATE TABLE IF NOT EXISTS admin (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- Table: menu_items (Les plats du menu)
-- ============================================
CREATE TABLE IF NOT EXISTS menu_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    price TEXT NOT NULL,
    category TEXT NOT NULL,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- Table: reservations (Les reservations)
-- ============================================
CREATE TABLE IF NOT EXISTS reservations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    date TEXT NOT NULL,
    time TEXT NOT NULL,
    guests INTEGER NOT NULL,
    special_requests TEXT,
    status TEXT DEFAULT 'en attente' CHECK (status IN ('en attente', 'en cours', 'termine')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- Table: contacts (Messages de contact)
-- ============================================
CREATE TABLE IF NOT EXISTS contacts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    message TEXT NOT NULL,
    read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- Table: commandes (Commandes a livrer)
-- ============================================
CREATE TABLE IF NOT EXISTS commandes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    address TEXT NOT NULL,
    items TEXT NOT NULL,
    total TEXT NOT NULL,
    special_requests TEXT,
    status TEXT DEFAULT 'en attente' CHECK (status IN ('en attente', 'en cours', 'termine')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- Table: reviews (Avis des clients)
-- ============================================
CREATE TABLE IF NOT EXISTS reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT NOT NULL,
    approved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- Configuration des politiques RLS (Row Level Security)
-- ============================================

-- Activer RLS sur toutes les tables
ALTER TABLE admin ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE commandes ENABLE ROW LEVEL SECURITY;

-- Politique pour admin
CREATE POLICY "admin_select" ON admin FOR SELECT USING (true);
CREATE POLICY "admin_insert" ON admin FOR INSERT WITH CHECK (true);
CREATE POLICY "admin_update" ON admin FOR UPDATE USING (true);
CREATE POLICY "admin_delete" ON admin FOR DELETE USING (true);

-- Politique pour menu_items
CREATE POLICY "menu_items_select" ON menu_items FOR SELECT USING (true);
CREATE POLICY "menu_items_insert" ON menu_items FOR INSERT WITH CHECK (true);
CREATE POLICY "menu_items_update" ON menu_items FOR UPDATE USING (true);
CREATE POLICY "menu_items_delete" ON menu_items FOR DELETE USING (true);

-- Politique pour reservations
CREATE POLICY "reservations_select" ON reservations FOR SELECT USING (true);
CREATE POLICY "reservations_insert" ON reservations FOR INSERT WITH CHECK (true);
CREATE POLICY "reservations_update" ON reservations FOR UPDATE USING (true);
CREATE POLICY "reservations_delete" ON reservations FOR DELETE USING (true);

-- Politique pour contacts
CREATE POLICY "contacts_select" ON contacts FOR SELECT USING (true);
CREATE POLICY "contacts_insert" ON contacts FOR INSERT WITH CHECK (true);
CREATE POLICY "contacts_update" ON contacts FOR UPDATE USING (true);
CREATE POLICY "contacts_delete" ON contacts FOR DELETE USING (true);

-- Politique pour commandes
CREATE POLICY "commandes_select" ON commandes FOR SELECT USING (true);
CREATE POLICY "commandes_insert" ON commandes FOR INSERT WITH CHECK (true);
CREATE POLICY "commandes_update" ON commandes FOR UPDATE USING (true);
CREATE POLICY "commandes_delete" ON commandes FOR DELETE USING (true);

-- Politique pour reviews
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "reviews_select" ON reviews FOR SELECT USING (true);
CREATE POLICY "reviews_insert" ON reviews FOR INSERT WITH CHECK (true);
CREATE POLICY "reviews_update" ON reviews FOR UPDATE USING (true);
CREATE POLICY "reviews_delete" ON reviews FOR DELETE USING (true);


