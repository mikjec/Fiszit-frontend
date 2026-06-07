import { Layers, Pencil, Trash2 } from "lucide-react";

export type Deck = {
  id: number;
  name: string;
};

type DeckItemProps = {
  deck: Deck;
  index: number;
  onEdit: (deck: Deck) => void;
  onDelete: (id: number) => void;
};

export default function DeckItem({ deck, index, onEdit, onDelete }: DeckItemProps) {
  return (
    <li
      className="group flex items-center justify-between px-4 py-3.5 rounded-xl hover:bg-gray-50 transition-all border border-transparent hover:border-gray-100"
      style={{ animation: `fadeUp 0.2s ease-out ${index * 40}ms both` }}
    >
      <a
        href={`/decks/${deck.id}/flashcards`}
        className="flex-1 min-w-0 flex items-center gap-3"
      >
        <div className="w-8 h-8 rounded-lg bg-sky-50 flex items-center justify-center text-sky-400 shrink-0 group-hover:bg-sky-100 transition-colors">
          <Layers className="w-4 h-4" />
        </div>
        <span className="text-sm font-medium text-gray-700 truncate group-hover:text-gray-900 transition-colors">
          {deck.name}
        </span>
      </a>

      <div className="flex items-center gap-1 ml-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={(e) => { e.preventDefault(); onEdit(deck); }}
          className="p-2 rounded-lg text-gray-400 hover:text-emerald-500 hover:bg-emerald-50 transition-all"
          title="Edytuj"
        >
          <Pencil className="w-4 h-4" />
        </button>
        <button
          onClick={(e) => { e.preventDefault(); onDelete(deck.id); }}
          className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all"
          title="Usuń"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </li>
  );
}
