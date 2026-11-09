import { useState } from "react";
import { Badge } from "@thomascaron/opale";

type StackChipsProps = {
  readonly label: string;
  readonly items: readonly string[];
};

/** Au-delà de ce nombre, la liste se replie sur mobile… */
const COLLAPSE_ABOVE = 8;
/** …et n'en montre que ces premières, le reste derrière un bouton « +N ». */
const VISIBLE_WHEN_COLLAPSED = 6;

/**
 * Liste de technologies. Rend `null` plutôt qu'une liste vide, jamais annoncée.
 * Une longue liste se replie sur mobile seulement (voir `index.css`) : le bouton et
 * le masquage n'agissent qu'en petit écran, la liste reste entière sur grand écran.
 */
const StackChips = ({ label, items }: StackChipsProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (items.length === 0) {
    return null;
  }

  const isCollapsible = items.length > COLLAPSE_ABOVE;
  const hiddenCount = items.length - VISIBLE_WHEN_COLLAPSED;

  return (
    <ul
      className={`experience-stack${isCollapsible && isExpanded ? " is-expanded" : ""}`}
      aria-label={label}
    >
      {items.map((item, index) => (
        <li
          key={item}
          className={
            isCollapsible && index >= VISIBLE_WHEN_COLLAPSED ? "stack-chip-item--extra" : undefined
          }
        >
          <Badge className="stack-chip" rootClassName="stack-chip-root" variant="default">
            {item}
          </Badge>
        </li>
      ))}
      {isCollapsible && (
        <li className="stack-chip-more">
          <button
            type="button"
            className="stack-chip-more__button"
            aria-expanded={isExpanded}
            onClick={() => setIsExpanded((expanded) => !expanded)}
          >
            <span aria-hidden="true">{isExpanded ? "Réduire" : `+${hiddenCount}`}</span>
            <span className="visually-hidden">
              {isExpanded
                ? `Masquer les ${hiddenCount} autres technologies`
                : `Afficher les ${hiddenCount} autres technologies`}
            </span>
          </button>
        </li>
      )}
    </ul>
  );
};

export default StackChips;
