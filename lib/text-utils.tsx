import React from "react";

/**
 * Transforme un texte brut avec sauts de ligne (\n) en paragraphes HTML aérés.
 * @param text Le texte à traiter
 * @param className Classes optionnelles pour chaque paragraphe
 */
export const renderDescription = (
  text: string | null | undefined,
  className: string = "mb-6 last:mb-0",
) => {
  if (!text) return null;

  return text.split("\n").map((paragraph, index) =>
    paragraph.trim() ? (
      <p key={index} className={className}>
        {paragraph}
      </p>
    ) : null,
  );
};
