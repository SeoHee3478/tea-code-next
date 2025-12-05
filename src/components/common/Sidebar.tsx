"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface MenuItem {
  id: string;
  title: string;
  path: string;
  icon: string;
  status: "active" | "planned";
}

const menuItems: MenuItem[] = [
  {
    id: "home",
    title: "홈",
    path: "/",
    icon: "🏠",
    status: "active",
  },
  {
    id: "infinite-scroll",
    title: "무한스크롤",
    path: "/sessions/infinite-scroll/answer",
    icon: "♾️",
    status: "active",
  },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* 사이드바 */}
      <aside
        className={`
          fixed left-0 top-[5rem] h-[calc(100vh-5rem)] bg-white border-r border-gray-200
          transition-transform duration-300 z-40 overflow-y-auto
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 w-64
        `}
      >
        <nav className="p-4">
          <div className="mb-4">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              세션 목록
            </h2>
          </div>

          <ul className="space-y-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.path;
              const isClickable = item.status === "active";

              return (
                <li key={item.id}>
                  {isClickable ? (
                    <Link
                      href={item.path}
                      className={`
                        flex items-center gap-3 px-3 py-2.5 rounded-lg
                        transition-colors duration-200
                        ${
                          isActive
                            ? "bg-blue-50 text-blue-700 font-medium"
                            : "text-gray-700 hover:bg-gray-50"
                        }
                      `}
                    >
                      <span className="text-xl">{item.icon}</span>
                      <span className="text-sm">{item.title}</span>
                    </Link>
                  ) : (
                    <div
                      className="
                        flex items-center gap-3 px-3 py-2.5 rounded-lg
                        text-gray-400 cursor-not-allowed
                      "
                    >
                      <span className="text-xl opacity-50">{item.icon}</span>
                      <span className="text-sm">{item.title}</span>
                      <span className="ml-auto text-xs bg-gray-100 px-2 py-0.5 rounded">
                        예정
                      </span>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="text-xs text-gray-500 space-y-2">
              <p className="font-semibold">💡 Tip</p>
              <p>각 세션을 클릭하여 실습 페이지로 이동하세요!</p>
            </div>
          </div>
        </nav>
      </aside>

      {/* 모바일 오버레이 */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 top-[5rem] bg-black/30 z-30 backdrop-blur-sm"
          onClick={onClose}
        />
      )}
    </>
  );
}
