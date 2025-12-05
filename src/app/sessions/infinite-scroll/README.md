# 무한스크롤

## 📌 목표

Intersection Observer + Tanstack query 의 InfiniteQuery를 활용해
페이지 끝까지 스크롤 시 다음 데이터를 자동으로 불러오는 무한스크롤 구현하기

## 📌 기능 구현 명세

### 조건

1. TanStack Query의 `useInfiniteQuery` 사용
2. IntersectionObserver로 하단 요소 감시
3. 요소가 화면에 보이면 자동으로 다음 페이지 데이터를 추가로 불러오기

## 📌 구현 프로세스

### 1. **InfiniteQuery 설정하기**

- `queryFn`으로 API 요청을 정의한다.
- `getNextPageParam`을 사용해  
  **"다음 pageParam을 어떻게 계산할지" 규칙을 만든다.**

---

### 2. **observerTarget 만들기**

- `useRef`로 **감시할 DOM 요소**를 만든다.
- 무한스크롤을 감지할 하단 div에 연결할 예정.

---

### 3. **IntersectionObserver 생성하기**

- 사용자가 observerTarget을 화면에 보이게 할 때 실행될 콜백을 작성한다.

---

### 4. **조건 충족 시 다음 페이지 요청하기**

콜백에서 아래 조건이 모두 true일 때 `fetchNextPage()` 호출:

- `entries[0].isIntersecting`  
  → 감시 대상이 화면에 등장했는가?

- `hasNextPage`  
  → 더 가져올 페이지가 남아 있는가?

- `!isFetchingNextPage`  
  → 이미 불러오는 중이 아닌가?

---

### 5. **observer와 observerTarget 연결하기**

- `observer.observe(observerTarget.current)`  
  → 실제 감시 시작

---

### 6. **클린업 함수로 observer 해제하기**

- 컴포넌트가 언마운트되거나 ref가 변경될 때  
  `observer.unobserve()` 실행
- 중복 감시/메모리 누수 방지

---

### 7. **감시용 ref를 JSX에서 하단 요소에 연결하기**

예시:

```tsx
<div ref={observerTarget}>{isFetchingNextPage && "불러오는 중..."}</div>
```
