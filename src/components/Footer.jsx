import { FaArrowUp, FaLinkedinIn, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { SiLeetcode } from "react-icons/si";

export default function Footer() {
  const socialLinks = [
    { Icon: FaLinkedinIn, href: "https://www.linkedin.com/in/pratik-patil-4738x", label: "LinkedIn" },
    { Icon: SiLeetcode, href: "https://leetcode.com/u/pratikspatil009/", label: "LeetCode" },
    { Icon: FaYoutube, href: "https://www.youtube.com/@Pratik4738xGrow", label: "YouTube" },
    { Icon: FaXTwitter, href: "https://x.com/pratikspatil009", label: "X" },
  ];

  return (
    <footer className="mt-16 bg-[#101211] text-white">
      <div className="mx-auto max-w-7xl px-5 py-10 lg:px-28 lg:py-14">
        <div className="grid gap-9 border-b border-white/15 pb-9 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <a href="/#home" aria-label="Pratik Patil, back to home" className="inline-flex items-center gap-4 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9bc5aa]">
              <img className="h-10 invert" src="/assets/logo-PP-Logo.png" alt="" />
              <span className="text-sm font-bold tracking-wide">PRATIK PATIL</span>
            </a>
            <p className="mt-4 max-w-md text-sm leading-6 text-white/65">
              Full-Stack &amp; AI Developer building thoughtful digital experiences.
            </p>
            <a
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#b6d5c1] transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9bc5aa]"
              href="mailto:pratikspatil009@gmail.com"
            >
              Let&apos;s build something useful <span aria-hidden="true">↗</span>
            </a>
          </div>

          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-white/55">Find me around the web</p>
            <nav aria-label="Social profiles" className="flex gap-2">
              {socialLinks.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={`Pratik on ${label}`}
                  title={label}
                  target="_blank"
                  rel="noreferrer"
                  className="grid h-11 w-11 place-items-center rounded border border-white/20 text-white/80 transition duration-200 hover:-translate-y-1 hover:border-[#9bc5aa] hover:bg-[#9bc5aa] hover:text-[#101211] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9bc5aa]"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </a>
              ))}
            </nav>
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-5 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Pratik Patil. All rights reserved.</p>
          <p>Designed and built with care.</p>
          <a
            className="inline-flex items-center gap-2 self-start text-white/75 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9bc5aa] sm:self-auto"
            href="#home"
          >
            Back to top <FaArrowUp aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
