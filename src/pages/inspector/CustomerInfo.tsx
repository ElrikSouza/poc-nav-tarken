export const CustomerInfo = ({ name }: { name: string }) => {
  return (
    <div className="flex gap-2 items-center p-2 border-zinc-600 border rounded-lg">
      <img className="rounded-md w-10 h-10" src="https://picsum.photos/200" />
      <div className="text-zinc-900 font-semibold text-sm">{name}</div>
    </div>
  );
};
