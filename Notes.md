Architecture & Documentation Technique : Authentik Travels
Version : 1.0.0
Stack : Next.js 15 (App Router), TypeScript, Prisma ORM, PostgreSQL (Supabase), NextAuth.js, Stripe API, Tailwind CSS.

1. Vue d'Ensemble du Système

L'application est une plateforme de réservation d'immersions de voyage (SaaS-like) structurée autour d'un noyau monolithique modulaire. Elle gère le cycle de vie complet d'une réservation, de la consultation du catalogue à la gestion administrative.

2. Modélisation des Données (Schema Registry)Le schéma de données est orchestré par Prisma ORM. La base de données est hébergée sur Supabase (PostgreSQL).

A. Modèle User (Identity Management)Gère l'authentification et les privilèges.id: UUID (Primary Key).role: Enum (USER, ADMIN). Définit l'accès au Dashboard.password: Hashé via bcryptjs (10 salt rounds).

B. Modèle GroupTrip (Inventory)Représente l'offre de voyage.
capacity: Integer. Définit le stock total de places disponibles.
priceBase / pricePremium / pricePlatinum: Décimales. Structure de prix multi-niveaux.
slug: String (Unique). Utilisé pour le routage dynamique (SEO-friendly).

C. Modèle Booking (Transaction)

Représente une vente confirmée.

participants: Integer. Nombre de voyageurs par dossier (limité à 2 via l'UI/API).
tripId: Foreign Key vers GroupTrip.

3. Flux de Paiement & Idempotence (Stripe Engine)

Le tunnel d'achat utilise Stripe Checkout pour garantir la conformité PCI et la sécurité des transactions.

Stratégie de Session

1. Initialisation (/api/checkout) :

Calcul dynamique de la quantity (multiplicateur d'acompte).
Injection des metadata (tripId, participants) pour assurer la traçabilité post-paiement.

2. Traitement Asynchrone (Webhooks) :

L'application écoute l'événement checkout.session.completed.
Flux de persistance : À la réception du signal, le webhook instancie une ligne dans la table Booking et décrémente virtuellement le stock disponible via le calcul de capacité.

4. Authentification & Sécurité (Middleware)

L'authentification est implémentée via NextAuth.js avec la stratégie JWT (JSON Web Tokens).

. Provider : CredentialsProvider personnalisé pour la validation d'email/password.
. Callback Session : Extension de l'objet session pour inclure le role de l'utilisateur, permettant un contrôle d'accès granulaire (RBAC - Role Based Access Control) sur les routes /admin.
. Protection des Routes : Utilisation de getServerSession pour bloquer les accès non autorisés côté serveur (SSR).

5. Logique Métier : Gestion des Stocks

La gestion des stocks n'est pas stockée en tant que valeur fixe décrémentée (pour éviter les désynchronisations), mais calculée dynamiquement (Computed Property) :

$$Places\ Restantes = Capacity - \sum(Bookings.participants)$$

Cette logique est appliquée :

. Côté Client (BookingZone) : Désactivation du bouton "+" si la sélection dépasse les places restantes.
. Côté Serveur (/api/checkout) : Rejet de la transaction si le stock est insuffisant au moment de la requête.

6. Dashboard Administratif (Analytics)

Le dashboard utilise le Server-Side Rendering (SSR) pour garantir la fraîcheur des données.

. Agrégation des données : Utilisation de .reduce() sur les relations Prisma pour calculer le Chiffre d'Affaires (Total Inscriptions × 500€).
. Visualisation : Barre de progression dynamique reflétant le fillingRate en temps réel.

7. Infrastructure & Déploiement (Production Readiness)

. Hosting : Vercel (Optimisé pour Next.js).
. Environment Variables :
. DATABASE_URL : Connexion poolée vers Supabase.
. NEXTAUTH_SECRET : Clé de chiffrement des tokens.
. STRIPE_WEBHOOK_SECRET : Signature de sécurité pour valider l'origine des requêtes Stripe.

. Emails : Intégration de Resend API pour les notifications transactionnelles déclenchées par le Webhook.

---

## Procédure de test pour les paiements Stripe

Afin de pouvoir simuler les paiements Stripe, il est nécessaire d'ouvri un terminal ayant pour racine `C/\tools\stripe`, c'est dans ce fichier qu'est installé le fichier .exe de stripe.

### Connexion à l'environnement de tet

Une fois le terminal ouvert avec ce chemin `C/\tools\stripe`, lancer la commande bash `./stripe login`.

Le terminal devrait afficher le pairing code ainsi qu'une URL. Copier / coller cette url afin de pouvoir autoriser l'environnement de test

```
Your pairing code is: breeze-fine-wisely-gained
This pairing code verifies your authentication with Stripe.
Press Enter to open the browser or visit https://dashboard.stripe.com/stripecli/confirm_auth?t=oqNOIAqMUj9ESxIZjAMGP9huAco6Yu1t (^C to quit)
```

Une fois la page visitée et le lien d'autorisation cliqué, retourner sur le terminal et exécuter cette commande `./stripe listen --forward-to localhost:3000/api/webhooks/stripe`. Le terminal devrait afficher la clé secrete du webhook

```
> Ready! You are using Stripe API Version [2026-02-25.clover]. Your webhook signing secret is whsec_4650b59f46b5f3da8afc83afd578a5635fa97f5e50178321a174ed75e604f631 (^C to quit)
```

Cette clé est à insérer dans la variable d'environnement :

#Clé web hook confirmation paiement stripe (test)
STRIPE_WEBHOOK_SECRET=whsec_4650b59f46b5f3da8afc83afd578a5635fa97f5e50178321a174ed75e604f631

Redémarrer le terminal de l'application pour qu'il prenne en compte la nouvelle variable d'environnement puis procéder au paiement sur l'application.

----------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------
                Check List passage du mode test au mode production
----------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------

🛡️ ÉTAPE 1 : Configuration Légale (Stripe Dashboard)
Avant d'encaisser le premier euro, Stripe doit valider ton identité.

[ ] Activation du compte : Remplir le formulaire "Activate your account" (Structure juridique, SIRET, adresse).

[ ] Vérification d'identité (KYC) : Téléverser la pièce d'identité du gérant et un justificatif de domicile.

[ ] Lien Bancaire : Ajouter l'IBAN du compte professionnel pour les virements (Payouts).

[ ] Libellé de relevé bancaire : Configurer le nom qui apparaîtra sur le relevé de tes clients (ex: AUTHENTIK-TRAVELS).

🔑 ÉTAPE 2 : Permutation des Clés API (Vercel)
Tu dois remplacer les clés de test par les clés réelles dans les paramètres de Vercel.

[ ] Désactiver le "Test Mode" sur Stripe pour voir les clés "Live".

[ ] Clé Publique : Remplacer pk_test_... par pk_live_...

[ ] Clé Secrète : Remplacer sk_test_... par sk_live_...

[ ] Secret JWT : Conserver ton NEXTAUTH_SECRET actuel (il reste valide).

🌐 ÉTAPE 3 : Le Webhook de Production
C'est l'étape où beaucoup d'erreurs surviennent. Le webhook de test ne fonctionne pas pour les paiements réels.

[ ] Créer l'Endpoint Live : Dans Stripe (Mode Live) > Developers > Webhooks.

[ ] URL de destination : https://ton-domaine.com/api/webhooks/stripe.

[ ] Événements : Sélectionner uniquement checkout.session.completed.

[ ] Signing Secret : Récupérer le nouveau whsec_... (Live) et mettre à jour la variable STRIPE_WEBHOOK_SECRET sur Vercel.

🧪 ÉTAPE 4 : Test de "Fumée" (Smoke Test)
Une fois tout configuré en Live, il faut vérifier que la chaîne fonctionne avec de l'argent réel.

[ ] Test réel : Crée un voyage temporaire à 1€ (ou utilise un code promo de 99%).

[ ] Paiement : Effectue l'achat avec ta propre carte bancaire.

[ ] Vérification :

[ ] L'argent apparaît-il dans "Paiements" sur Stripe ?

[ ] La réservation est-elle bien créée dans ton admin (Supabase) ?

[ ] L'email de confirmation (Resend) est-il bien reçu ?

📦 ÉTAPE 5 : Optimisation & Sécurité
[ ] Domaine Personnalisé : Connecter ton nom de domaine (ex: www.authentika.io) sur Vercel à la place de l'URL .vercel.app.

[ ] Mise à jour de NEXTAUTH_URL : Changer http://localhost:3000 par https://www.ton-domaine.com dans Vercel.

[ ] Sauvegarde DB : Activer les sauvegardes automatiques sur Supabase.


-------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------

-----------------------
Mise à Jour BDD
---------------------------

Pour mettre à jour la base de données, une fois modifié le fichier '/prisma/schema.prisma', exécuter la commande
```bash
$env:DATABASE_URL="TON_LIEN_SUPABASE"; npx prisma db push```
