/*
  Warnings:

  - The `optionType` column on the `Booking` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `destination` on the `CustomLead` table. All the data in the column will be lost.
  - You are about to drop the column `currency1` on the `Destination` table. All the data in the column will be lost.
  - You are about to drop the column `currency2` on the `Destination` table. All the data in the column will be lost.
  - The `role` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `paymentMethod` on the `Booking` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "OptionType" AS ENUM ('BASE', 'PREMIUM', 'PLATINIUM');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('STRIPE', 'VIREMENT', 'CHEQUE');

-- CreateEnum
CREATE TYPE "StatutDemarchage" AS ENUM ('A_CONTACTER', 'CONTACTE', 'EN_DISCUSSION', 'PARTENAIRE', 'INACTIF', 'REFUS');

-- CreateEnum
CREATE TYPE "TypeInteraction" AS ENUM ('APPEL', 'EMAIL', 'MESSAGE_RESEAU', 'RDV', 'AUTRE');

-- CreateEnum
CREATE TYPE "TypePrestataire" AS ENUM ('HOTEL', 'TRANSPORT', 'ACTIVITE', 'AUTRE');

-- CreateEnum
CREATE TYPE "TypeSuiviPrestataire" AS ENUM ('NEGOCIATION_TARIF', 'NOUVELLE_PRESTATION', 'RENOUVELLEMENT', 'AUTRE');

-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "customLeadId" TEXT,
DROP COLUMN "optionType",
ADD COLUMN     "optionType" "OptionType" NOT NULL DEFAULT 'BASE',
DROP COLUMN "paymentMethod",
ADD COLUMN     "paymentMethod" "PaymentMethod" NOT NULL;

-- AlterTable
ALTER TABLE "CustomLead" DROP COLUMN "destination",
ADD COLUMN     "destinationId" TEXT,
ADD COLUMN     "destinationLibre" TEXT;

-- AlterTable
ALTER TABLE "Destination" DROP COLUMN "currency1",
DROP COLUMN "currency2",
ADD COLUMN     "primaryCurrency" TEXT,
ADD COLUMN     "secondaryCurrency" TEXT;

-- AlterTable
ALTER TABLE "GroupTrip" ADD COLUMN     "ambassadeurId" TEXT,
ADD COLUMN     "coutBancaires" DOUBLE PRECISION,
ADD COLUMN     "coutMedias" DOUBLE PRECISION,
ADD COLUMN     "nombreChambres" INTEGER,
ADD COLUMN     "prixVenteParPersonne" DOUBLE PRECISION,
ADD COLUMN     "supplementChambreSimple" DOUBLE PRECISION,
ADD COLUMN     "tauxChange" DOUBLE PRECISION,
ADD COLUMN     "volInterieurPrixParPersonne" DOUBLE PRECISION,
ADD COLUMN     "volInterieurTotal" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role",
ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'USER';

-- CreateTable
CREATE TABLE "Ville" (
    "id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "destinationId" TEXT,

    CONSTRAINT "Ville_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Hebergement" (
    "id" TEXT NOT NULL,
    "villeId" TEXT NOT NULL,
    "destinationId" TEXT,
    "nom" TEXT NOT NULL,
    "typeChambre" TEXT NOT NULL,
    "prixParNuit" DOUBLE PRECISION NOT NULL,
    "devise" TEXT NOT NULL DEFAULT 'USD',
    "prestataireId" TEXT,

    CONSTRAINT "Hebergement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transport" (
    "id" TEXT NOT NULL,
    "villeId" TEXT NOT NULL,
    "destinationId" TEXT,
    "compagnie" TEXT,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "prix" DOUBLE PRECISION NOT NULL,
    "devise" TEXT NOT NULL DEFAULT 'USD',
    "prestataireId" TEXT,

    CONSTRAINT "Transport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Activite" (
    "id" TEXT NOT NULL,
    "villeId" TEXT NOT NULL,
    "destinationId" TEXT,
    "nom" TEXT NOT NULL,
    "description" TEXT,
    "prix" DOUBLE PRECISION NOT NULL,
    "devise" TEXT NOT NULL DEFAULT 'USD',
    "prestataireId" TEXT,

    CONSTRAINT "Activite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EtapeVoyage" (
    "id" TEXT NOT NULL,
    "groupTripId" TEXT NOT NULL,
    "jourNumero" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "villeId" TEXT NOT NULL,
    "hebergementId" TEXT,
    "activite1Id" TEXT,
    "activite1Qte" INTEGER,
    "activite2Id" TEXT,
    "activite2Qte" INTEGER,

    CONSTRAINT "EtapeVoyage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EtapeTransport" (
    "id" TEXT NOT NULL,
    "etapeId" TEXT NOT NULL,
    "transportId" TEXT NOT NULL,
    "quantite" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "EtapeTransport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ambassadeur" (
    "id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "disciplines" TEXT[],
    "languesParlees" TEXT[],
    "pays" TEXT,
    "ville" TEXT,
    "siteWeb" TEXT,
    "email" TEXT,
    "telephone" TEXT,
    "pageFacebook" TEXT,
    "pageInstagram" TEXT,
    "nbAdherentsEstime" INTEGER,
    "nbFollowersFacebook" INTEGER,
    "nbFollowersInstagram" INTEGER,
    "festivalInfo" TEXT,
    "statutDemarchage" "StatutDemarchage" NOT NULL DEFAULT 'A_CONTACTER',
    "sourceScraping" TEXT,
    "dateAjout" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "notes" TEXT,

    CONSTRAINT "Ambassadeur_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactAmbassadeur" (
    "id" TEXT NOT NULL,
    "ambassadeurId" TEXT NOT NULL,
    "nom" TEXT,
    "role" TEXT,
    "email" TEXT,
    "telephone" TEXT,

    CONSTRAINT "ContactAmbassadeur_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SuiviAmbassadeur" (
    "id" TEXT NOT NULL,
    "ambassadeurId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" "TypeInteraction" NOT NULL,
    "resume" TEXT NOT NULL,

    CONSTRAINT "SuiviAmbassadeur_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Prestataire" (
    "id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "type" "TypePrestataire" NOT NULL,
    "languesParlees" TEXT[],
    "villeId" TEXT,
    "destinationId" TEXT,
    "contactNom" TEXT,
    "email" TEXT,
    "telephone" TEXT,
    "notes" TEXT,

    CONSTRAINT "Prestataire_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SuiviPrestataire" (
    "id" TEXT NOT NULL,
    "prestataireId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" "TypeSuiviPrestataire" NOT NULL,
    "resume" TEXT NOT NULL,
    "ancienPrix" DOUBLE PRECISION,
    "nouveauPrix" DOUBLE PRECISION,

    CONSTRAINT "SuiviPrestataire_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GroupTrip" ADD CONSTRAINT "GroupTrip_ambassadeurId_fkey" FOREIGN KEY ("ambassadeurId") REFERENCES "Ambassadeur"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_customLeadId_fkey" FOREIGN KEY ("customLeadId") REFERENCES "CustomLead"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomLead" ADD CONSTRAINT "CustomLead_destinationId_fkey" FOREIGN KEY ("destinationId") REFERENCES "Destination"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ville" ADD CONSTRAINT "Ville_destinationId_fkey" FOREIGN KEY ("destinationId") REFERENCES "Destination"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hebergement" ADD CONSTRAINT "Hebergement_villeId_fkey" FOREIGN KEY ("villeId") REFERENCES "Ville"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hebergement" ADD CONSTRAINT "Hebergement_destinationId_fkey" FOREIGN KEY ("destinationId") REFERENCES "Destination"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hebergement" ADD CONSTRAINT "Hebergement_prestataireId_fkey" FOREIGN KEY ("prestataireId") REFERENCES "Prestataire"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transport" ADD CONSTRAINT "Transport_villeId_fkey" FOREIGN KEY ("villeId") REFERENCES "Ville"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transport" ADD CONSTRAINT "Transport_destinationId_fkey" FOREIGN KEY ("destinationId") REFERENCES "Destination"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transport" ADD CONSTRAINT "Transport_prestataireId_fkey" FOREIGN KEY ("prestataireId") REFERENCES "Prestataire"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activite" ADD CONSTRAINT "Activite_villeId_fkey" FOREIGN KEY ("villeId") REFERENCES "Ville"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activite" ADD CONSTRAINT "Activite_destinationId_fkey" FOREIGN KEY ("destinationId") REFERENCES "Destination"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activite" ADD CONSTRAINT "Activite_prestataireId_fkey" FOREIGN KEY ("prestataireId") REFERENCES "Prestataire"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EtapeVoyage" ADD CONSTRAINT "EtapeVoyage_groupTripId_fkey" FOREIGN KEY ("groupTripId") REFERENCES "GroupTrip"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EtapeVoyage" ADD CONSTRAINT "EtapeVoyage_villeId_fkey" FOREIGN KEY ("villeId") REFERENCES "Ville"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EtapeVoyage" ADD CONSTRAINT "EtapeVoyage_hebergementId_fkey" FOREIGN KEY ("hebergementId") REFERENCES "Hebergement"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EtapeVoyage" ADD CONSTRAINT "EtapeVoyage_activite1Id_fkey" FOREIGN KEY ("activite1Id") REFERENCES "Activite"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EtapeVoyage" ADD CONSTRAINT "EtapeVoyage_activite2Id_fkey" FOREIGN KEY ("activite2Id") REFERENCES "Activite"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EtapeTransport" ADD CONSTRAINT "EtapeTransport_etapeId_fkey" FOREIGN KEY ("etapeId") REFERENCES "EtapeVoyage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EtapeTransport" ADD CONSTRAINT "EtapeTransport_transportId_fkey" FOREIGN KEY ("transportId") REFERENCES "Transport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContactAmbassadeur" ADD CONSTRAINT "ContactAmbassadeur_ambassadeurId_fkey" FOREIGN KEY ("ambassadeurId") REFERENCES "Ambassadeur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SuiviAmbassadeur" ADD CONSTRAINT "SuiviAmbassadeur_ambassadeurId_fkey" FOREIGN KEY ("ambassadeurId") REFERENCES "Ambassadeur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prestataire" ADD CONSTRAINT "Prestataire_villeId_fkey" FOREIGN KEY ("villeId") REFERENCES "Ville"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prestataire" ADD CONSTRAINT "Prestataire_destinationId_fkey" FOREIGN KEY ("destinationId") REFERENCES "Destination"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SuiviPrestataire" ADD CONSTRAINT "SuiviPrestataire_prestataireId_fkey" FOREIGN KEY ("prestataireId") REFERENCES "Prestataire"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
