type StackChipsProps = {
  /** Le vocabulaire CSS n'autorise que ces deux emplacements de chips. */
  readonly variant: "experience-stack" | "project-stack";
  readonly label: string;
  readonly items: readonly string[];
};

/** Liste de technologies. Rend `null` plutôt qu'une liste vide, jamais annoncée. */
const StackChips = ({ variant, label, items }: StackChipsProps) => {
  if (items.length === 0) {
    return null;
  }

  return (
    <ul className={variant} aria-label={label}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
};

export default StackChips;
