import { ChipList } from "@thomascaron/ui";

type StackChipsProps = {
  readonly label: string;
  readonly items: readonly string[];
};

/** Liste de technologies. Rend `null` plutôt qu'une liste vide, jamais annoncée. */
const StackChips = ({ label, items }: StackChipsProps) => <ChipList label={label} items={items} />;

export default StackChips;
