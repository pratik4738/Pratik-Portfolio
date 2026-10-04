import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FaArrowLeft, FaArrowRight, FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import { projects } from "../data/projects";

const filters = ["All", "AI & data", "AgriTech", "Education"];

function ProjectCarousel({ project }) {
  const slides = project.gallery ?? [];
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion || isPaused || slides.length < 2) return undefined;

    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 4500);

    return () => window.clearInterval(intervalId);
  }, [isPaused, shouldReduceMotion, slides.length]);

  const showSlide = (index) => {
    setActiveIndex((index + slides.length) % slides.length);
  };

  const currentSlide = slides[activeIndex];

  return (
    <div
      className="group relative aspect-[1.8/1] overflow-hidden bg-[#090b11] lg:aspect-auto lg:min-h-[26rem]"
      role="region"
      aria-label={`${project.name} screenshot carousel`}
      aria-roledescription="carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setIsPaused(false);
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.img
          key={currentSlide.src}
          src={currentSlide.src}
          alt={currentSlide.caption}
          className="absolute inset-0 h-full w-full select-none object-cover"
          draggable="false"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.12}
          onDragEnd={(_, info) => {
            if (info.offset.x < -55) showSlide(activeIndex + 1);
            if (info.offset.x > 55) showSlide(activeIndex - 1);
          }}
          initial={shouldReduceMotion ? false : { opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={shouldReduceMotion ? undefined : { opacity: 0, x: -24 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.35, ease: "easeOut" }}
        />
      </AnimatePresence>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/30" />
      <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between p-4 sm:p-5">
        <span className="inline-flex items-center gap-2 border border-white/20 bg-black/50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-white backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-[#9fe3c1]" /> Product preview
        </span>
        <span className="bg-black/50 px-3 py-1.5 text-xs font-semibold tabular-nums text-white backdrop-blur-sm">
          {String(activeIndex + 1).padStart(2, "0")} <span className="text-white/50">/ {String(slides.length).padStart(2, "0")}</span>
        </span>
      </div>

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4 sm:p-5">
        <p className="max-w-[70%] text-xs font-medium leading-5 text-white sm:text-sm">{currentSlide.caption}</p>
        <div className="flex shrink-0 gap-2">
          <motion.button
            type="button"
            onClick={() => showSlide(activeIndex - 1)}
            aria-label="Previous project screenshot"
            className="grid h-10 w-10 place-items-center border border-white/30 bg-black/50 text-white backdrop-blur-sm transition hover:bg-white hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9fe3c1]"
            whileTap={shouldReduceMotion ? undefined : { scale: 0.92 }}
          >
            <FaArrowLeft aria-hidden="true" />
          </motion.button>
          <motion.button
            type="button"
            onClick={() => showSlide(activeIndex + 1)}
            aria-label="Next project screenshot"
            className="grid h-10 w-10 place-items-center border border-white/30 bg-black/50 text-white backdrop-blur-sm transition hover:bg-white hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9fe3c1]"
            whileTap={shouldReduceMotion ? undefined : { scale: 0.92 }}
          >
            <FaArrowRight aria-hidden="true" />
          </motion.button>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-0.5 bg-white/20" aria-hidden="true">
        <motion.div
          key={activeIndex}
          className="h-full origin-left bg-[#9fe3c1]"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isPaused || shouldReduceMotion ? 1 : 1 }}
          transition={{ duration: 0.35 }}
        />
      </div>

      <div className="absolute bottom-[4.1rem] left-4 flex gap-1.5 sm:left-5">
        {slides.map((slide, index) => (
          <button
            key={slide.src}
            type="button"
            onClick={() => showSlide(index)}
            aria-label={`Show screenshot ${index + 1}: ${slide.caption}`}
            aria-current={activeIndex === index ? "true" : undefined}
            className={`h-1.5 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9fe3c1] ${activeIndex === index ? "w-6 bg-[#9fe3c1]" : "w-1.5 bg-white/60 hover:bg-white"}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function ProjectIndex() {
  const [activeFilter, setActiveFilter] = useState("All");
  const visibleProjects = projects.filter(
    (project) => activeFilter === "All" || project.category === activeFilter,
  );

  return (
    <section className="my-10 bg-[#090909] px-5 py-12 text-white lg:my-16 lg:px-28 lg:py-20" id="projects">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 border-b border-white/15 pb-7 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/50">Selected builds · {projects.length} case studies</p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">Projects <span className="text-[#9fe3c1]">in practice.</span></h2>
            <p className="mt-2 max-w-xl text-sm/6 text-white/60 lg:text-base">
              Products built around useful workflows, thoughtful engineering, and real-world problems.
            </p>
          </div>

          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter projects">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                role="tab"
                aria-selected={activeFilter === filter}
                onClick={() => setActiveFilter(filter)}
                className={`rounded px-3 py-2 text-sm transition-colors ${
                  activeFilter === filter
                    ? "bg-white text-black"
                    : "border border-white/20 text-white/70 hover:border-white/60 hover:text-white"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:mt-9 lg:gap-6">
          {visibleProjects.map((project, index) => {
            const hasGallery = project.gallery?.length > 1;

            return (
              <motion.article
                key={project.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true, amount: 0.1 }}
                className={`group overflow-hidden border border-white/15 bg-white/[0.035] transition-colors hover:border-white/35 hover:bg-white/[0.06] ${hasGallery ? "sm:col-span-2 lg:grid lg:grid-cols-[1.2fr_0.8fr]" : ""}`}
              >
                {hasGallery ? (
                  <ProjectCarousel project={project} />
                ) : (
                  <div className="relative aspect-[1.72/1] overflow-hidden bg-[#1a211d]">
                <div className="absolute inset-0 flex flex-col justify-between p-5 sm:p-7">
                  <div className="flex items-center justify-between gap-3 border-b border-[#9fe3c1]/20 pb-3 text-[#9fe3c1]">
                    <span className="text-[10px] font-bold uppercase tracking-[0.14em]">{project.category}</span>
                    <span className="text-xs font-semibold opacity-70">{project.number} / 04</span>
                  </div>
                  <div>
                    <p className="max-w-lg text-2xl font-bold leading-tight sm:text-3xl">{project.name}</p>
                    <p className="mt-2 max-w-lg text-sm text-white/65">{project.tagline}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.slice(0, 3).flatMap((group) => group.items).slice(0, 4).map((technology) => (
                      <span key={technology} className="border border-white/20 bg-black/20 px-2 py-1 text-[10px] text-white/75">{technology}</span>
                    ))}
                  </div>
                </div>
                {project.thumbnail && (
                  <img
                    src={project.thumbnail}
                    alt={`${project.name} project thumbnail`}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.025]"
                    onError={(event) => { event.currentTarget.style.display = "none"; }}
                  />
                )}
              </div>
                )}

              <div className={`p-5 sm:p-6 ${hasGallery ? "flex flex-col justify-center lg:p-8" : ""}`}>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#9fe3c1]">{project.type}</span>
                  <span className="text-xs text-white/45">{project.timeline}</span>
                </div>
                <h3 className="mt-2 text-xl font-bold sm:text-2xl">{project.name}</h3>
                <p className="mt-3 min-h-[3rem] text-sm/6 text-white/65">{project.summary}</p>

                <div className="mt-4 flex flex-wrap gap-2" aria-label={`${project.name} technologies`}>
                  {project.stack.flatMap((group) => group.items).slice(0, 6).map((technology) => (
                    <span key={technology} className="border border-white/15 px-2 py-1 text-[11px] text-white/65">{technology}</span>
                  ))}
                </div>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
                  <Link to={`/projects/${project.slug}`} className="inline-flex items-center gap-2 text-sm font-bold text-white transition-colors hover:text-[#9fe3c1]">
                    View case study <FaExternalLinkAlt aria-hidden="true" />
                  </Link>
                  <div className="flex gap-3">
                    {project.links.demo && <a href={project.links.demo} target="_blank" rel="noreferrer" aria-label={`${project.name} live demo`} className="text-white/60 transition hover:text-[#9fe3c1]"><FaExternalLinkAlt /></a>}
                    {project.links.github && <a href={project.links.github} target="_blank" rel="noreferrer" aria-label={`${project.name} GitHub repository`} className="text-white/60 transition hover:text-[#9fe3c1]"><FaGithub /></a>}
                  </div>
                </div>
              </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}