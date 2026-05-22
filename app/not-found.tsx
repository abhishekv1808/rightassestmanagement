import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F9F8F5] flex flex-col">
      {/* Minimal header */}
      <header className="w-full border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-3 group"
            aria-label="Right Asset Management — Home"
          >
            {/* Compact wordmark logo */}
            <div className="w-9 h-9 rounded-md bg-[#1B3A6B] flex items-center justify-center flex-shrink-0">
              <span className="text-[#C9A84C] font-bold text-base leading-none font-serif">
                R
              </span>
            </div>
            <span className="text-[#1B3A6B] font-semibold text-base leading-tight tracking-tight group-hover:text-[#C9A84C] transition-colors">
              Right Asset Management
            </span>
          </Link>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="text-center max-w-lg w-full">
          {/* 404 number */}
          <div className="mb-2">
            <span className="text-[120px] sm:text-[160px] font-bold text-[#1B3A6B] leading-none font-serif block">
              404
            </span>
          </div>

          {/* Gold divider line */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-16 bg-[#C9A84C]" />
            <div className="w-2 h-2 rounded-full bg-[#C9A84C]" />
            <div className="h-px w-16 bg-[#C9A84C]" />
          </div>

          {/* Heading */}
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] mb-3 font-serif">
            Page Not Found
          </h1>

          {/* Subtitle */}
          <p className="text-[#64748B] text-base sm:text-lg mb-10 leading-relaxed">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved.
          </p>

          {/* Quick navigation links */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
            <Link
              href="/"
              className="text-sm font-medium text-[#1B3A6B] border border-[#1B3A6B] rounded-md px-4 py-2 hover:bg-[#1B3A6B] hover:text-white transition-colors"
            >
              Home
            </Link>
            <Link
              href="/financial"
              className="text-sm font-medium text-[#1B3A6B] border border-[#1B3A6B] rounded-md px-4 py-2 hover:bg-[#1B3A6B] hover:text-white transition-colors"
            >
              Services
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium text-[#1B3A6B] border border-[#1B3A6B] rounded-md px-4 py-2 hover:bg-[#1B3A6B] hover:text-white transition-colors"
            >
              Contact
            </Link>
          </div>

          {/* Primary CTA */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-[#1B3A6B] text-white font-semibold text-sm px-8 py-3 rounded-md hover:bg-[#162f58] transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            Back to Home
          </Link>
        </div>
      </main>

      {/* Minimal footer note */}
      <footer className="py-5 text-center">
        <p className="text-xs text-[#64748B]">
          &copy; {new Date().getFullYear()} Right Asset Management. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
}
