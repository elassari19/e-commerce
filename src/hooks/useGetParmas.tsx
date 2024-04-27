import { useSearchParams } from "next/navigation";

const useGetParmas = () => {
  const params = useSearchParams();
  const tag = params.get("t")?.trim();

  return {tag}
}

export default useGetParmas