-- Nettoyage des tables (Ordre respectant les contraintes)
TRUNCATE TABLE "Post", "Booking", "GroupTrip", "Circuit", "Destination", "User" CASCADE;

-- 1. DESTINATIONS
INSERT INTO "Destination" ("id", "name", "slug", "tagline", "description", "currency1", "currency2", "createdAt", "updatedAt")
VALUES 
('dest-cuba', 'Cuba', 'cuba', 'L''île crocodile aux mille couleurs', 'Une immersion entre cités coloniales et rythmes de salsa.', 'CUP', 'EUR', NOW(), NOW()),
('dest-colombie', 'Colombie', 'colombie', 'Le pays du réalisme magique', 'Des Andes aux Caraïbes, une terre de café et de culture.', 'COP', 'EUR', NOW(), NOW()),
('dest-costarica', 'Costa Rica', 'costa-rica', 'La vie en Pura Vida', 'Un sanctuaire de biodiversité entre deux océans.', 'CRC', 'USD', NOW(), NOW()),
('dest-repdom', 'République Dominicaine', 'republique-dominicaine', 'Bien plus que des plages', 'Montagnes, cascades et histoire coloniale.', 'DOP', 'EUR', NOW(), NOW());

-- 2. CIRCUITS INDIVIDUELS (3 par destination)
INSERT INTO "Circuit" ("id", "title", "slug", "tagline", "description", "duration", "priceBase", "program", "isPublished", "destinationId", "createdAt", "updatedAt")
VALUES 
-- Cuba
('circ-cuba-1', 'Cuba Authentique', 'cuba-authentique', 'L''essentiel en maisons d''hôtes', 'Circuit de 10 jours.', 10, 1150.00, '[{"title": "La Havane", "desc": "Visite coloniale"}, {"title": "Viñales", "desc": "Tabac"}]'::jsonb, true, 'dest-cuba', NOW(), NOW()),
('circ-cuba-2', 'Salsa & Plages', 'salsa-plages', 'Rythme et détente', 'Circuit de 12 jours.', 12, 1350.00, '[{"title": "Trinidad", "desc": "Musique"}, {"title": "Varadero", "desc": "Plage"}]'::jsonb, true, 'dest-cuba', NOW(), NOW()),
('circ-cuba-3', 'L''Orient Cubain', 'orient-cubain', 'Sur les traces de la révolution', 'Circuit de 14 jours.', 14, 1550.00, '[{"title": "Santiago", "desc": "Berceau salsa"}, {"title": "Baracoa", "desc": "Nature"}]'::jsonb, true, 'dest-cuba', NOW(), NOW()),
-- Colombie
('circ-col-1', 'Route du Café', 'route-du-cafe', 'Arômes andins', 'Circuit de 11 jours.', 11, 1450.00, '[{"title": "Bogota", "desc": "Musée Or"}, {"title": "Salento", "desc": "Café"}]'::jsonb, true, 'dest-colombie', NOW(), NOW()),
('circ-col-2', 'Perles des Caraïbes', 'perles-caraibes', 'Histoire et farniente', 'Circuit de 13 jours.', 13, 1650.00, '[{"title": "Carthagène", "desc": "Vieille ville"}, {"title": "Tayrona", "desc": "Jungle"}]'::jsonb, true, 'dest-colombie', NOW(), NOW()),
('circ-col-3', 'Amazonie Colombienne', 'amazonie-col', 'Aventure profonde', 'Circuit de 9 jours.', 9, 1850.00, '[{"title": "Leticia", "desc": "Fleuve"}, {"title": "Puerto Nariño", "desc": "Dauphins"}]'::jsonb, true, 'dest-colombie', NOW(), NOW()),
-- Costa Rica
('circ-cr-1', 'Volcans & Canopée', 'volcans-canopee', 'Aventure verte', 'Circuit de 12 jours.', 12, 1750.00, '[{"title": "Arenal", "desc": "Volcan"}, {"title": "Monteverde", "desc": "Brume"}]'::jsonb, true, 'dest-costarica', NOW(), NOW()),
('circ-cr-2', 'Tortuguero Sauvage', 'tortuguero-sauvage', 'Biodiversité marine', 'Circuit de 10 jours.', 10, 1550.00, '[{"title": "Canaux", "desc": "Bateau"}, {"title": "Tortues", "desc": "Observation"}]'::jsonb, true, 'dest-costarica', NOW(), NOW()),
('circ-cr-3', 'Pacifique Sud', 'pacifique-sud', 'Jungle et Océan', 'Circuit de 14 jours.', 14, 2100.00, '[{"title": "Corcovado", "desc": "Nature brute"}, {"title": "Uvita", "desc": "Baleines"}]'::jsonb, true, 'dest-costarica', NOW(), NOW()),
-- Rep Dom
('circ-rd-1', 'Montagnes & Vallées', 'montagnes-vallees', 'Alpes dominicaines', 'Circuit de 9 jours.', 9, 1250.00, '[{"title": "Jarabacoa", "desc": "Canyoning"}, {"title": "Constanza", "desc": "Agriculture"}]'::jsonb, true, 'dest-repdom', NOW(), NOW()),
('circ-rd-2', 'Péninsule de Samana', 'peninsule-samana', 'Éden tropical', 'Circuit de 11 jours.', 11, 1400.00, '[{"title": "Baleines", "desc": "Observation"}, {"title": "Limon", "desc": "Cascade"}]'::jsonb, true, 'dest-repdom', NOW(), NOW()),
('circ-rd-3', 'Trésors Coloniaux', 'tresors-coloniaux', 'Histoire et farniente', 'Circuit de 12 jours.', 12, 1550.00, '[{"title": "Santo Domingo", "desc": "Histoire"}, {"title": "Bayahibe", "desc": "Plages"}]'::jsonb, true, 'dest-repdom', NOW(), NOW());

-- 3. VOYAGES DE GROUPE (3 par destination)
INSERT INTO "GroupTrip" ("id", "title", "slug", "description", "startDate", "endDate", "duration", "capacity", "program", "priceBase", "pricePremium", "depositAmount", "status", "destinationId", "createdAt", "updatedAt")
VALUES 
-- Cuba
('gt-cuba-1', 'Salsa Tour 2026', 'salsa-tour-2026', 'Voyage danse.', '2026-02-15', '2026-02-27', 12, 12, '[{"title": "Jour 1", "desc": "Cours"}]'::jsonb, 1850.00, 2150.00, 500.00, 'PUBLISHED', 'dest-cuba', NOW(), NOW()),
('gt-cuba-2', 'Tabaco & Vieilles Voitures', 'tabaco-voitures', 'Immersion retro.', '2026-04-10', '2026-04-20', 10, 10, '[{"title": "Jour 1", "desc": "Havana"}]'::jsonb, 1650.00, 1950.00, 400.00, 'PUBLISHED', 'dest-cuba', NOW(), NOW()),
('gt-cuba-3', 'Nouvel An à La Havane', 'nouvel-an-havane', 'Fête cubaine.', '2026-12-27', '2027-01-05', 9, 15, '[{"title": "Jour 1", "desc": "Réveillon"}]'::jsonb, 2200.00, 2550.00, 600.00, 'DRAFT', 'dest-cuba', NOW(), NOW()),
-- Colombie
('gt-col-1', 'Expédition Perdue', 'expedition-perdue', 'Cité perdue.', '2026-01-10', '2026-01-22', 12, 8, '[{"title": "Jour 1", "desc": "Trek"}]'::jsonb, 1950.00, 2200.00, 500.00, 'PUBLISHED', 'dest-colombie', NOW(), NOW()),
('gt-col-2', 'Carnaval de Barranquilla', 'carnaval-barranquilla', 'Fête géante.', '2026-02-10', '2026-02-20', 10, 14, '[{"title": "Jour 1", "desc": "Danse"}]'::jsonb, 1750.00, 2100.00, 450.00, 'PUBLISHED', 'dest-colombie', NOW(), NOW()),
('gt-col-3', 'Route de l''Émeraude', 'route-emeraude', 'Mines et pierres.', '2026-06-05', '2026-06-15', 10, 12, '[{"title": "Jour 1", "desc": "Mines"}]'::jsonb, 1850.00, 2150.00, 500.00, 'DRAFT', 'dest-colombie', NOW(), NOW()),
-- Costa Rica
('gt-cr-1', 'Photo Animalière CR', 'photo-animaliere-cr', 'Spécial photo.', '2026-03-05', '2026-03-17', 12, 6, '[{"title": "Jour 1", "desc": "Oiseaux"}]'::jsonb, 2500.00, 2900.00, 700.00, 'PUBLISHED', 'dest-costarica', NOW(), NOW()),
('gt-cr-2', 'Yoga & Surf Pura Vida', 'yoga-surf-cr', 'Bien-être.', '2026-05-12', '2026-05-22', 10, 12, '[{"title": "Jour 1", "desc": "Zen"}]'::jsonb, 1950.00, 2300.00, 500.00, 'PUBLISHED', 'dest-costarica', NOW(), NOW()),
('gt-cr-3', 'Le Grand Raid Nature', 'grand-raid-cr', 'Challenge physique.', '2026-11-10', '2026-11-25', 15, 10, '[{"title": "Jour 1", "desc": "Action"}]'::jsonb, 2800.00, 3200.00, 800.00, 'DRAFT', 'dest-costarica', NOW(), NOW()),
-- Rep Dom
('gt-rd-1', 'La Route du Rhum RD', 'route-rhum-rd', 'Gastronomie.', '2026-02-20', '2026-03-02', 10, 12, '[{"title": "Jour 1", "desc": "Dégustation"}]'::jsonb, 1550.00, 1850.00, 400.00, 'PUBLISHED', 'dest-repdom', NOW(), NOW()),
('gt-rd-2', 'Éco-Volontariat Tortues', 'eco-tortues-rd', 'Soutien nature.', '2026-07-15', '2026-07-27', 12, 8, '[{"title": "Jour 1", "desc": "Protection"}]'::jsonb, 1400.00, 1700.00, 300.00, 'PUBLISHED', 'dest-repdom', NOW(), NOW()),
('gt-rd-3', 'Carnaval de La Vega', 'carnaval-la-vega', 'Tradition diable.', '2026-02-01', '2026-02-10', 9, 20, '[{"title": "Jour 1", "desc": "Masques"}]'::jsonb, 1350.00, 1600.00, 350.00, 'DRAFT', 'dest-repdom', NOW(), NOW());

-- 4. ARTICLES DE BLOG (3 par destination)
INSERT INTO "Post" ("id", "title", "slug", "excerpt", "content", "mainImage", "category", "readingTime", "published", "destinationId", "createdAt", "updatedAt")
VALUES 
-- Cuba
('p-cuba-1', '5 Raisons de visiter Cuba', '5-raisons-cuba', 'Pourquoi choisir Cuba ?', 'Contenu détaillé...', 'https://images.unsplash.com/photo-1500673922987-e212871fec22', 'Guide', 5, true, 'dest-cuba', NOW(), NOW()),
('p-cuba-2', 'Comment manger chez l''habitant', 'manger-habitant-cuba', 'Le guide des paladares.', 'Contenu détaillé...', 'https://images.unsplash.com/photo-1585032226651-759b368d7246', 'Conseils', 4, true, 'dest-cuba', NOW(), NOW()),
('p-cuba-3', 'L''histoire de la Salsa', 'histoire-salsa-cuba', 'D''où vient ce rythme ?', 'Contenu détaillé...', 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62', 'Culture', 7, true, 'dest-cuba', NOW(), NOW()),
-- Colombie
('p-col-1', 'La sécurité en Colombie', 'securite-colombie', 'Conseils pratiques.', 'Contenu détaillé...', 'https://images.unsplash.com/photo-1531403009284-440f080d1e12', 'Conseils', 6, true, 'dest-colombie', NOW(), NOW()),
('p-col-2', 'Le meilleur café du monde', 'meilleur-cafe-colombie', 'Visite des haciendas.', 'Contenu détaillé...', 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085', 'Guide', 5, true, 'dest-colombie', NOW(), NOW()),
('p-col-3', 'Carthagène la Belle', 'carthagene-la-belle', 'Guide de la ville.', 'Contenu détaillé...', 'https://images.unsplash.com/photo-1583531172005-814191b8b6c0', 'Récits', 8, true, 'dest-colombie', NOW(), NOW()),
-- Costa Rica
('p-cr-1', 'Quand partir au Costa Rica', 'quand-partir-cr', 'Saison sèche vs verte.', 'Contenu détaillé...', 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23', 'Guide', 5, true, 'dest-costarica', NOW(), NOW()),
('p-cr-2', 'Top 10 des animaux du CR', 'top-10-animaux-cr', 'Paresseux et Toucans.', 'Contenu détaillé...', 'https://images.unsplash.com/photo-1526336028061-b3b8f6bc2652', 'Culture', 4, true, 'dest-costarica', NOW(), NOW()),
('p-cr-3', 'Conduire au Costa Rica', 'conduire-au-cr', '4x4 ou bus ?', 'Contenu détaillé...', 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800', 'Conseils', 7, true, 'dest-costarica', NOW(), NOW()),
-- Rep Dom
('p-rd-1', 'RD : Au-delà des Resorts', 'rd-au-dela-resorts', 'Découvrez le vrai visage.', 'Contenu détaillé...', 'https://images.unsplash.com/photo-1544989164-329471131920', 'Récits', 6, true, 'dest-repdom', NOW(), NOW()),
('p-rd-2', 'Les plus belles cascades', 'plus-belles-cascades-rd', 'Damasajua et Limon.', 'Contenu détaillé...', 'https://images.unsplash.com/photo-1589412225852-780963359d99', 'Guide', 5, true, 'dest-repdom', NOW(), NOW()),
('p-rd-3', 'La zone coloniale de SD', 'zone-coloniale-sd', 'Histoire des Amériques.', 'Contenu détaillé...', 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07', 'Culture', 5, true, 'dest-repdom', NOW(), NOW());