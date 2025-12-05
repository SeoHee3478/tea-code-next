"use client";

import { useExhibitions } from "@/app/sessions/infinite-scroll/answer/hooks/useExhibitions";
import { useEffect, useRef } from "react";
import PostCard from "./PostCard";

export default function PostList() {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useExhibitions();

  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.5 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }
    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const allExhibitions = data?.pages.flatMap((page) => page.exhibitions) ?? [];

  if (isLoading) return <div>로딩중</div>;
  if (isError) return <div>에러 발생</div>;
  return (
    <div className="w-full">
      <h2 className="text-sm text-right font-medium mb-8">
        ({allExhibitions?.length}개)
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {allExhibitions.map((item) => (
          <PostCard key={item.id} item={item} />
        ))}
      </div>
      <div
        ref={observerTarget}
        className="w-full h-20 flex justify-center items-center my-8"
      >
        {isFetchingNextPage && (
          <p className="text-lg text-gray-600">더 불러오는 중...</p>
        )}
        {!hasNextPage && allExhibitions.length > 0 && (
          <p className="text-gray-500">모든 전시를 불러왔습니다</p>
        )}
      </div>
    </div>
  );
}
