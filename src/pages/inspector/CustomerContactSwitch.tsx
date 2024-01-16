export const CustomerContactSwitch = ({
  isCustomerMode,
  onToggleMode,
}: {
  isCustomerMode: boolean;
  onToggleMode: () => void;
}) => {
  return (
    <div className="w-full">
      <div className="p-1 bg-zinc-400 border-zinc-100 border rounded-md flex">
        <button
          onClick={onToggleMode}
          className={`px-1 py-2 font-semibold text-sm flex-1 transition-colors ${
            isCustomerMode
              ? "bg-zinc-300 text-zinc-800 shadow-gray-600 rounded-md"
              : "text-zinc-500"
          }`}
        >
          Grupo
        </button>
        <button
          onClick={onToggleMode}
          className={`px-1 py-2 font-semibold text-sm flex-1 transition-colors ${
            !isCustomerMode
              ? "bg-zinc-300 text-zinc-800 shadow-gray-600 rounded-md"
              : "text-zinc-500"
          }`}
        >
          Integrante
        </button>
      </div>
    </div>
  );
};
