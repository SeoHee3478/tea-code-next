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

// 1. getNextPageParam: 다음 pageParam을 어떻게 계산할지 결정하는 규칙
// lastPage: 마지막으로 받아온 page 데이터를 lastPage 라는 이름으로 getNextPageParams에 넘겨줌
export function useExhibitions() {
  return useInfiniteQuery({
    queryKey: ["exhibitions"],
    queryFn: ({ pageParam = 1 }) => fetchExhibitions(pageParam),
    getNextPageParam: (lastPage) => {
      return 0;
    },
    initialPageParam: 1,
  });
}
