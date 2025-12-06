"use client";

import { useExhibitions } from "@/app/sessions/infinite-scroll/answer/hooks/useExhibitions";
import { useEffect, useRef } from "react";
import PostCard from "./PostCard";

export default function PostList() {
  // 0. tanstack query hook 가져오기 - 다음 페이지 가져오기, 다음 페이지 있는지, 다음 페이지 페칭 중인지
  const { data, isLoading, isError } = useExhibitions();

  // 1. useRef로 observerTarget 만들기(감시할 대상 만들기)

  // 2. observe 생성하기(카메라 설치하기)
  // 2-1. observe로 감시대상이 감지되고 여러 조건이 충족된다면 다음페이지 불러오기
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
        }
      },
      {
        threshold: 1,
      }
    );

    // 3. observe가 ref를 지켜보도록 연결하기(실제로 감시 시작)

    return () => {
      // 4. 클린업 함수 작성(컴포넌트 사라지거나 ref가 변경될 때 카메라 회수)
    };
  }, []);

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
      {/* 5. 감시용 ref 연결하기 */}
      <div className="w-full h-20 flex justify-center items-center my-8">
        {/* 6. 더불러오는 중 상태, 모든 전시 불러오기 완료 상태 보여주기 */}
        {false && <p className="text-lg text-gray-600">더 불러오는 중...</p>}
        {false && allExhibitions.length > 0 && (
          <p className="text-gray-500">모든 전시를 불러왔습니다</p>
        )}
      </div>
    </div>
  );
}
