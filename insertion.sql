-- ============================================
-- Script d'insertion des données initiales WADOU Tasty
-- Pour Supabase
-- ============================================

-- ============================================
-- Admin par défaut
-- ============================================
INSERT INTO admin (email, password) 
VALUES ('admin@gmail.com', 'admin123')
ON CONFLICT (email) DO NOTHING;

-- ============================================
-- Plats du menu - Catégorie Signature
-- ============================================
INSERT INTO menu_items (name, description, price, category, image_url) VALUES
('Amiwo au Poulet', 'Le classique du Bénin. Pommes de terre grillées accompagnées de sauce tomate épicée et poulet rôti.', '4.500 XOF', 'Signature', 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800'),
('Wagassi Grillé', 'Fromage deinggué traditionnellement grillé, accompagné de Sauce Arachide et de pikliz.', '3.500 XOF', 'Signature', 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=800'),
('Foutou Banane', 'Purée de bananes plantains pilée, servie avec sauce graine et viande de boeuf.', '5.000 XOF', 'Signature', 'https://images.unsplash.com/photo-1607532941433-304659e8198a?q=80&w=800'),
('Kedjenou', 'Ragoût de poulet mijoté aux légumes, préparé dans une olla traditionnelle.', '5.500 XOF', 'Signature', 'https://images.unsplash.com/photo-1607532941433-304659e8198a?q=80&w=800');

-- ============================================
-- Plats du menu - Catégorie Traditionnel
-- ============================================
INSERT INTO menu_items (name, description, price, category, image_url) VALUES
('Pâte Rouge', 'Pâte de maïs accompagnée de sauce gombo et boeuf épiderme.', '2.500 XOF', 'Traditionnel', 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=800'),
('Tchapi', 'Riz blanc puffé accompagné de sauce arachide et poisson fumé.', '3.000 XOF', 'Traditionnel', 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=800'),
('Ablo', 'Gâteau de maïs vapeur accompagné de sauce tomate et poisson.', '2.800 XOF', 'Traditionnel', 'https://images.unsplash.com/photo-1594040226829-7f251ab46d80?q=80&w=800'),
('Djenkoume', 'Pâte de maïs accompagné de sauce aux crevettes et légumes.', '3.500 XOF', 'Traditionnel', 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=800');

-- ============================================
-- Plats du menu - Catégorie Grillades
-- ============================================
INSERT INTO menu_items (name, description, price, category, image_url) VALUES
('Poulet Braisé', 'Poulet grillé aux épices traditionnelles, servi avec alloco et pikliz.', '5.500 XOF', 'Grillades', 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?q=80&w=800'),
('Brochettes de Boeuf', 'Boeuf mariné aux épices, grillé au feu de bois. Par 4 pièces.', '4.000 XOF', 'Grillades', 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?q=80&w=800'),
('Poisson Grillé', 'Tilapia grillé, accompagné de mangue verte et sauce pimentée.', '6.000 XOF', 'Grillades', 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=800'),
('Escargots Grillés', 'Escargots préparé à la sauce pikliz, grillé au feu.', '3.500 XOF', 'Grillades', 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=800');

-- ============================================
-- Plats du menu - Catégorie Boissons
-- ============================================
INSERT INTO menu_items (name, description, price, category, image_url) VALUES
('Bissap', 'Boisson Hibiscus artisanale, pétillante et rafraîchissante.', '1.000 XOF', 'Boissons', 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?q=80&w=800'),
('Gingembre Frais', 'Jus de gingembre frais au citron, idéal pour la digestion.', '1.200 XOF', 'Boissons', 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?q=80&w=800'),
('Eau de Coco', 'Eau de coco fraîche directement de la noix.', '1.500 XOF', 'Boissons', 'https://images.unsplash.com/photo-1525385133512-2f3bdd039054?q=80&w=800'),
('Bouye', 'Boisson du baobab, riche en vitamines et minéraux.', '1.200 XOF', 'Boissons', 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?q=80&w=800');
