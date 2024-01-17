import { Loading } from "../../components/Loading";

export const CustomerInfoLoading = () => {
  return (
    <div className="flex gap-2 items-center justify-center p-2 border-zinc-600 border rounded-lg">
      <Loading color="black" />
    </div>
  );
};
