import Link from "next/link";

const navItems = [
  { href: "/about", label: "About" },
  { href: "/project", label: "Project" },
  { href: "/links", label: "Links" },
  { href: "/play", label: "Play" },
];

export const MainHeader = () => {
  return (
    <header className='sticky top-0 z-50 bg-neutral-950 px-6 py-4 text-white'>
      <div className='flex items-center justify-between'>
        <Link className='text-2xl font-bold' href='/'>
          Portfolio
        </Link>
        <nav className='flex gap-4 text-sm font-bold'>
          {navItems.map((item) => (
            <Link
              className='rounded-full px-3 py-1 text-neutral-300 transition hover:bg-white/10 hover:text-white'
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};
