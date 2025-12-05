import Link from "next/link";

interface Session {
  id: string;
  title: string;
  description: string;
  difficulty: "⭐" | "⭐⭐" | "⭐⭐⭐";
  presenter?: string;
  date?: string;
  status: "completed" | "upcoming" | "planned";
}

const sessions: Session[] = [
  {
    id: "infinite-scroll",
    title: "무한스크롤 구현",
    description: "Intersection Observer API를 활용한 무한스크롤 구현",
    difficulty: "⭐⭐",
    date: "2025.12.06",
    status: "upcoming",
  },
];

function SessionCard({ session }: { session: Session }) {
  const statusColors = {
    completed: "bg-green-100 text-green-800",
    upcoming: "bg-blue-100 text-blue-800",
    planned: "bg-gray-100 text-gray-800",
  };

  const statusText = {
    completed: "완료",
    upcoming: "예정",
    planned: "기획",
  };

  const isClickable =
    session.status === "completed" || session.status === "upcoming";

  const cardContent = (
    <div
      className={`
      bg-white rounded-lg p-6 border-2 transition-all
      ${
        isClickable
          ? "border-gray-200 hover:border-blue-400 hover:shadow-lg cursor-pointer"
          : "border-gray-100 opacity-60"
      }
    `}
    >
      <div className="flex justify-between items-start mb-3">
        <h2 className="text-xl font-bold text-gray-800">{session.title}</h2>
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            statusColors[session.status]
          }`}
        >
          {statusText[session.status]}
        </span>
      </div>

      <p className="text-gray-600 text-sm mb-4">{session.description}</p>

      <div className="flex justify-between items-center text-sm">
        <span className="text-gray-500">난이도: {session.difficulty}</span>
        {session.date && <span className="text-gray-400">{session.date}</span>}
      </div>

      {session.presenter && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <span className="text-xs text-gray-500">
            발표자: {session.presenter}
          </span>
        </div>
      )}
    </div>
  );

  if (isClickable) {
    return <Link href={`/sessions/${session.id}/answer`}>{cardContent}</Link>;
  }

  return cardContent;
}

export default function Home() {
  return (
    <div>
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          티클모아 태산 스터디
        </h1>
        <p className="text-gray-600 text-lg">
          하나씩 따라 치며 배우는 실전 개발 스터디
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">📚 세션 목록</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {sessions.map((session) => (
            <SessionCard key={session.id} session={session} />
          ))}
        </div>
      </div>

      <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
        <h3 className="font-bold text-gray-800 mb-2">💡 학습 방법</h3>
        <ol className="text-sm text-gray-700 space-y-2">
          <li>1. 세션 문서를 읽고 개념 이해하기</li>
          <li>2. 발표자의 시연 보며 전체 흐름 파악하기</li>
          <li>3. 코드를 직접 따라 치며 구현하기</li>
          <li>4. 구현 중 발생한 이슈나 다른 방법 공유하기</li>
        </ol>
      </div>
    </div>
  );
}
