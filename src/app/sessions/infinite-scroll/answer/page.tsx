import PostList from "./components/PostList";

export default function InfiniteScroll() {
  return (
    <section className="w-full max-w-5xl flex flex-col justify-center items-center gap-6">
      <h1 className="text-2xl font-bold">무한 스크롤</h1>
      <PostList />
    </section>
  );
}
