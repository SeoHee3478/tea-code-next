"use client";

import Link from "next/link";

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="container max-w-full px-4 py-4">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* 햄버거 버튼 (모바일) */}
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="메뉴 토글"
            >
              <span className="text-xl">☰</span>
            </button>

            <Link
              href="/"
              className="flex items-center gap-2 px-4 hover:opacity-80 transition-opacity"
            >
              <div>
                <h1 className="text-xl font-bold text-gray-800">Tea Code</h1>
                <p className="text-xs text-gray-500">티끌모아 태산</p>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-6">
            {/* 링크들 */}
            <div className="flex gap-6">
              <Link
                href="https://www.notion.so/2025-6-Study-2bb9d85cf67b800d9c0ddf3523dc5185?source=copy_link"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-bold text-gray-600 hover:text-gray-900 transition-colors"
              >
                Notion
              </Link>
              <Link
                href="https://github.com/minkyeongJ/tea-code"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-bold text-gray-600 hover:text-gray-900 transition-colors"
              >
                GitHub
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
