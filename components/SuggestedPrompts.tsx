const prompts = [
  "Tell me about Hampi",
  "Why is this place important?",
  "Tell me a crazy historical fact",
  "Tell me the story like I'm Gen-Z",
];

export default function SuggestedPrompts({
  onSelect,
  disabled,
}: {
  onSelect: (prompt: string) => void;
  disabled?: boolean;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {prompts.map((p) => (
        <button
          key={p}
          type="button"
          disabled={disabled}
          onClick={() => onSelect(p)}
          className="rounded-full border border-gold/25 bg-ink-raised px-3.5 py-1.5 text-xs font-medium text-sandstone-dim transition-colors hover:border-gold/50 hover:text-gold disabled:cursor-not-allowed disabled:opacity-40"
        >
          {p}
        </button>
      ))}
    </div>
  );
}
