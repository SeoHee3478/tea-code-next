import { useInfiniteQuery } from "@tanstack/react-query";
import { ExhibitionsResponse } from "@/types/exhibitions";

async function fetchExhibitions(page: number): Promise<ExhibitionsResponse> {
  const baseUrl =
    typeof window === "undefined"
      ? process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
      : "";

  const response = await fetch(
    `${baseUrl}/api/exhibitions/all?page=${page}&limit=20`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch exhibitions");
  }

  return response.json();
}

export function useExhibitions() {
  return useInfiniteQuery({
    queryKey: ["exhibitions"],
    queryFn: ({ pageParam = 1 }) => fetchExhibitions(pageParam),
    getNextPageParam: (lastPage) => {
      return lastPage.hasMore ? lastPage.currentPage + 1 : undefined;
    },
    initialPageParam: 1,
  });
}
