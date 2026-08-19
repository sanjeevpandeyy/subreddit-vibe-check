function Navbar() {
  return (
    <nav className="border-b border-white/10 bg-black/40 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-sm font-black text-black">
            V
          </div>

          <span className="text-sm font-semibold tracking-wide text-white">
            Vibe Check
          </span>
        </div>

        <span className="hidden text-sm text-zinc-500 sm:block">
          Reddit Sentiment Dashboard
        </span>
      </div>
    </nav>
  );
}

export default Navbar;