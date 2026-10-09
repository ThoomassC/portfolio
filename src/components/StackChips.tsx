import { Badge } from "@thomascaron/opale";

type StackChipsProps = {
  readonly label: string;
  readonly items: readonly string[];
};

/** Liste de technologies. Rend `null` plutôt qu'une liste vide, jamais annoncée. */
const StackChips = ({ label, items }: StackChipsProps) => {
  if (items.length === 0) {
    return null;
  }

  return (
    <ul className="experience-stack" aria-label={label}>
      {items.map((item) => (
        <li key={item}>
          <Badge className="stack-chip" rootClassName="stack-chip-root" variant="default">
            {item}
          </Badge>
        </li>
      ))}
    </ul>
  );
};

export default StackChips;
