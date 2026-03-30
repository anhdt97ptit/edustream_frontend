import { Loader } from "lucide-react";

export default function Loading() {
  // Or a custom loading skeleton component
  return (
    <div className={"h-screen items-center flex"}>
      <Loader className={"m-auto animate-spin w-10 h-10 text-indigo-400"} />
    </div>
  );
}
