import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaArrowLeft,
  FaArrowRight,
  FaExternalLinkAlt,
  FaExpand,
  FaGithub,
  FaLink,
  FaMoon,
  FaSun,
  FaTimes,
  FaSearchPlus,
  FaSearchMinus,
} from "react-icons/fa";
import { projects } from "../data/projects";

const linkItems = [
  { key: "demo", label: "Live demo", icon: FaExternalLinkAlt },
  { key: "github", label: "GitHub", icon: FaGithub },
  { key: "documentation", label: "Documentation", icon: FaLink },
  { key: "presentation", label: "Presentation", icon: FaExternalLinkAlt },
];

export default function ProjectDetail() {
  const { slug } = useParams();
  const projectIndex = projects.findIndex((item) => item.slug === slug);
  const project = projects[projectIndex];
  const [isDark, setIsDark] = useState(true);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const galleryItems = useMemo(
    () => [...(project?.gallery ?? []), ...(project?.videos ?? [])],
    [project],
  );
  const isAvailable = (value) => typeof value === "string" && value.length > 0;
  const pageTone = isDark
    ? "bg-[#101211] text-[#f4f5f3]"
    : "bg-[#f6f7f5] text-[#161a17]";
  const mutedTone = isDark ? "text-white/60" : "text-black/60";
  const lineTone = isDark ? "border-white/15" : "border-black/15";
  const panelTone = isDark ? "bg-white/[0.035]" : "bg-white border-black/10";

  useEffect(() => {
    if (!project) return;
    document.title = `${project.name} | Pratik Patil`;
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [project]);

  useEffect(() => {
    if (!isViewerOpen) return undefined;

    function handleKeyDown(event) {
      if (event.key === "Escape") setIsViewerOpen(false);
      if (event.key === "ArrowRight") setGalleryIndex((current) => (current + 1) % galleryItems.length);
      if (event.key === "ArrowLeft") setGalleryIndex((current) => (current - 1 + galleryItems.length) % galleryItems.length);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [galleryItems.length, isViewerOpen]);

  useEffect(() => {
    if (!project) return;
    window.localStorage.setItem("portfolio-project-theme", isDark ? "dark" : "light");
  }, [isDark, project]);

  if (!project) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#101211] px-5 text-white">
        <div className="text-center">
          <p className="text-sm text-white/55">Project not found</p>
          <h1 className="mt-2 text-3xl font-bold">This case study is unavailable.</h1>
          <Link className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#9fe3c1]" to="/#projects">
            <FaArrowLeft aria-hidden="true" /> Back to projects
          </Link>
        </div>
      </main>
    );
  }

  const previousProject = projects[(projectIndex - 1 + projects.length) % projects.length];
  const nextProject = projects[(projectIndex + 1) % projects.length];
  const availableLinks = linkItems.filter((item) => isAvailable(project.links[item.key]));
  const currentMedia = galleryItems[galleryIndex];

  function showMedia(index) {
    setGalleryIndex(index);
    setIsZoomed(false);
    setIsViewerOpen(true);
  }

  function moveGallery(direction) {
    setGalleryIndex((current) => (current + direction + galleryItems.length) % galleryItems.length);
    setIsZoomed(false);
  }

  return (
    <main className={`${pageTone} min-h-screen transition-colors duration-300`}>
      <div className="mx-auto max-w-7xl px-5 pb-12 md:px-8 lg:px-12">
        <header className={`flex min-h-16 items-center justify-between border-b ${lineTone}`}>
          <Link to="/" className="text-sm font-bold tracking-wide">PRATIK PATIL</Link>
          <div className="flex items-center gap-3">
            <span className={`hidden text-xs sm:inline ${mutedTone}`}>PROJECT CASE STUDY</span>
            <button
              type="button"
              onClick={() => setIsDark((value) => !value)}
              aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
              title={`Switch to ${isDark ? "light" : "dark"} theme`}
              className={`grid h-9 w-9 place-items-center rounded-full border ${lineTone} transition hover:scale-105`}
            >
              {isDark ? <FaSun aria-hidden="true" /> : <FaMoon aria-hidden="true" />}
            </button>
          </div>
        </header>

        <div className={`mt-6 flex items-center justify-between text-sm ${mutedTone}`}>
          <Link className="inline-flex items-center gap-2 transition hover:opacity-70" to="/#projects">
            <FaArrowLeft aria-hidden="true" /> All projects
          </Link>
          <span>{project.number} / {String(projects.length).padStart(2, "0")}</span>
        </div>

        <section className="pb-12 pt-12 md:pb-16 md:pt-16">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end"
          >
            <div>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-[#9fe3c1] px-3 py-1 text-xs font-bold text-[#14251d]">{project.category}</span>
                <span className={`rounded-full border px-3 py-1 text-xs ${lineTone} ${mutedTone}`}>{project.type}</span>
              </div>
              <h1 className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">{project.name}</h1>
              <p className={`mt-4 max-w-2xl text-base leading-7 md:text-lg ${mutedTone}`}>{project.tagline}</p>

              <div className={`mt-7 grid grid-cols-2 gap-x-5 gap-y-4 border-y py-5 sm:grid-cols-4 ${lineTone}`}>
                {[
                  ["Timeline", project.timeline],
                  ["Role", project.role],
                  ["Team size", project.teamSize],
                  ["Project type", project.type],
                ].map(([label, value]) => (
                  <div key={label}>
                    <p className={`text-[10px] font-bold uppercase tracking-[0.12em] ${mutedTone}`}>{label}</p>
                    <p className="mt-1.5 text-xs font-semibold leading-5 sm:text-sm">{value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {project.stack.flatMap((group) => group.items).map((technology) => (
                  <span key={technology} className={`rounded-full border px-2.5 py-1 text-xs ${lineTone} ${mutedTone}`}>{technology}</span>
                ))}
              </div>

              {availableLinks.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {availableLinks.map(({ key, label, icon: Icon }) => (
                    <a key={key} href={project.links[key]} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#9fe3c1] px-4 py-2.5 text-sm font-bold text-[#14251d] transition hover:bg-[#b9f3d6]">
                      {label}<Icon aria-hidden="true" />
                    </a>
                  ))}
                </div>
              )}
            </div>

            <div className={`relative aspect-[1.45/1] overflow-hidden border ${lineTone} ${panelTone}`}>
              {isAvailable(project.thumbnail) ? (
                <img src={project.thumbnail} alt={`${project.name} project screenshot`} className="h-full w-full object-cover" />
              ) : (
                <div className="relative flex h-full flex-col justify-between overflow-hidden p-6 sm:p-9">
                  <div className="absolute -right-10 -top-16 h-72 w-72 rounded-full border border-[#9fe3c1]/15" aria-hidden="true" />
                  <div className="absolute -right-2 -top-8 h-52 w-52 rounded-full border border-[#9fe3c1]/15" aria-hidden="true" />
                  <span className={`relative text-[10px] font-bold uppercase tracking-[0.16em] ${mutedTone}`}>Project overview</span>
                  <div className="relative">
                    <span className="text-6xl font-black text-[#9fe3c1]/75 sm:text-8xl">{project.number}</span>
                    <p className="mt-3 max-w-lg text-2xl font-bold sm:text-4xl">{project.name}</p>
                    <p className={`mt-2 max-w-lg text-sm ${mutedTone}`}>{project.summary}</p>
                  </div>
                  <span className={`relative text-xs ${mutedTone}`}>Add hero image at {project.thumbnailPath}</span>
                </div>
              )}
            </div>
          </motion.div>
        </section>

        <section className={`grid gap-8 border-t py-10 md:grid-cols-[0.32fr_1fr] md:py-14 ${lineTone}`}>
          <div>
            <p className={`text-xs font-bold uppercase tracking-[0.14em] ${mutedTone}`}>01 / Project overview</p>
            <h2 className="mt-3 text-2xl font-bold">What it is</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              ["Overview", project.overview],
              ["Problem", project.problem],
              ["Designed for", project.audience],
            ].map(([title, copy]) => (
              <div key={title}>
                <h3 className="text-sm font-bold">{title}</h3>
                <p className={`mt-2 text-sm/6 ${mutedTone}`}>{copy}</p>
              </div>
            ))}
            <div className="sm:col-span-3">
              <h3 className="text-sm font-bold">Solution</h3>
              <p className={`mt-2 max-w-4xl text-sm/6 ${mutedTone}`}>{project.solution}</p>
            </div>
          </div>
        </section>

        <section className={`border-t py-10 md:py-14 ${lineTone}`}>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className={`text-xs font-bold uppercase tracking-[0.14em] ${mutedTone}`}>02 / Gallery</p>
              <h2 className="mt-3 text-2xl font-bold">Product screens</h2>
            </div>
            {galleryItems.length > 1 && <span className={`text-xs ${mutedTone}`}>{galleryIndex + 1} / {galleryItems.length}</span>}
          </div>

          {galleryItems.length > 0 ? (
            <>
              <div className={`relative mt-6 overflow-hidden border ${lineTone} ${panelTone}`}>
                <button type="button" onClick={() => showMedia(galleryIndex)} className="group relative block aspect-[16/9] w-full overflow-hidden text-left" aria-label={`Open image viewer: ${galleryItems[galleryIndex].caption}`}>
                  {galleryItems[galleryIndex].type === "video" ? (
                    <video className="h-full w-full object-contain" src={galleryItems[galleryIndex].src} controls />
                  ) : (
                    <img className="h-full w-full object-contain" src={galleryItems[galleryIndex].src} alt={galleryItems[galleryIndex].caption} />
                  )}
                  <span className="absolute bottom-4 right-4 rounded-full bg-black/70 p-3 text-white opacity-0 transition group-hover:opacity-100"><FaExpand aria-hidden="true" /></span>
                </button>
                <div className={`flex items-center justify-between gap-4 border-t px-4 py-3 ${lineTone}`}>
                  <p className={`text-sm ${mutedTone}`}>{galleryItems[galleryIndex].caption}</p>
                  {galleryItems.length > 1 && (
                    <div className="flex gap-2">
                      <button type="button" onClick={() => moveGallery(-1)} aria-label="Previous screenshot" className={`grid h-9 w-9 place-items-center rounded-full border ${lineTone}`}><FaArrowLeft /></button>
                      <button type="button" onClick={() => moveGallery(1)} aria-label="Next screenshot" className={`grid h-9 w-9 place-items-center rounded-full border ${lineTone}`}><FaArrowRight /></button>
                    </div>
                  )}
                </div>
              </div>
              {galleryItems.length > 1 && (
                <div className="mt-3 flex gap-3 overflow-x-auto pb-2">
                  {galleryItems.map((media, index) => (
                    <button key={media.src} type="button" onClick={() => setGalleryIndex(index)} aria-label={`Show screenshot: ${media.caption}`} aria-pressed={galleryIndex === index} className={`w-28 shrink-0 overflow-hidden border text-left sm:w-36 ${galleryIndex === index ? "border-[#9fe3c1]" : lineTone}`}>
                      <img className="aspect-video w-full object-cover" src={media.thumbnail || media.src} alt="" />
                      <span className={`block truncate px-2 py-1.5 text-[10px] ${mutedTone}`}>{media.caption}</span>
                    </button>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className={`mt-6 flex min-h-52 flex-col items-start justify-center border p-6 sm:min-h-64 sm:p-10 ${lineTone} ${panelTone}`}>
              <span className={`text-xs font-bold uppercase tracking-[0.12em] ${mutedTone}`}>Gallery images not added</span>
              <p className="mt-3 max-w-xl text-lg font-semibold">The case study gallery is ready for screenshots.</p>
              <p className={`mt-2 text-sm ${mutedTone}`}>Place image or video files in <code className="break-all">public{project.mediaDirectory}</code>, then add their captions to this project&apos;s gallery list.</p>
            </div>
          )}
        </section>

        <section className={`border-t py-10 md:py-14 ${lineTone}`}>
          <div className="grid gap-8 md:grid-cols-[0.32fr_1fr]">
            <div>
              <p className={`text-xs font-bold uppercase tracking-[0.14em] ${mutedTone}`}>03 / Capabilities</p>
              <h2 className="mt-3 text-2xl font-bold">Key features</h2>
            </div>
            <div className="grid gap-px border sm:grid-cols-2 lg:grid-cols-3" style={{ borderColor: isDark ? "rgba(255,255,255,.15)" : "rgba(0,0,0,.15)" }}>
              {project.features.map((feature, index) => (
                <article key={feature.title} className={`min-h-32 p-5 ${isDark ? "bg-[#101211]" : "bg-[#f6f7f5]"}`}>
                  <span className="text-xs font-bold text-[#72b997]">{String(index + 1).padStart(2, "0")}</span>
                  <h3 className="mt-3 text-sm font-bold">{feature.title}</h3>
                  <p className={`mt-2 text-xs/5 ${mutedTone}`}>{feature.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={`grid gap-8 border-t py-10 md:grid-cols-[0.32fr_1fr] md:py-14 ${lineTone}`}>
          <div>
            <p className={`text-xs font-bold uppercase tracking-[0.14em] ${mutedTone}`}>04 / Stack</p>
            <h2 className="mt-3 text-2xl font-bold">Technology</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {project.stack.map((group) => (
              <div key={group.group} className={`border p-4 ${lineTone} ${panelTone}`}>
                <h3 className={`text-xs font-bold uppercase tracking-[0.1em] ${mutedTone}`}>{group.group}</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {group.items.map((item) => <span key={item} className={`rounded-full border px-2.5 py-1 text-xs ${lineTone}`}>{item}</span>)}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className={`grid gap-8 border-t py-10 md:grid-cols-[0.32fr_1fr] md:py-14 ${lineTone}`}>
          <div>
            <p className={`text-xs font-bold uppercase tracking-[0.14em] ${mutedTone}`}>05 / Process</p>
            <h2 className="mt-3 text-2xl font-bold">Development timeline</h2>
            <p className={`mt-3 text-sm ${mutedTone}`}>{project.timeline}</p>
          </div>
          {project.milestones.length > 0 ? (
            <ol className="relative space-y-0 border-l border-[#72b997]/50 pl-6">
              {project.milestones.map((milestone, index) => (
                <li key={milestone.title} className="relative pb-7 last:pb-0">
                  <span className="absolute -left-[31px] top-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-[#101211] bg-[#9fe3c1] text-[8px] font-bold text-[#14251d]">{index + 1}</span>
                  <h3 className="text-sm font-bold">{milestone.title}</h3>
                  <p className={`mt-1 text-sm/6 ${mutedTone}`}>{milestone.detail}</p>
                </li>
              ))}
            </ol>
          ) : (
            <p className={`border-l border-[#72b997]/50 pl-6 text-sm ${mutedTone}`}>Detailed milestone dates were not included in the project information.</p>
          )}
        </section>

        <section className={`grid gap-8 border-t py-10 md:grid-cols-[0.32fr_1fr] md:py-14 ${lineTone}`}>
          <div>
            <p className={`text-xs font-bold uppercase tracking-[0.14em] ${mutedTone}`}>06 / Work</p>
            <h2 className="mt-3 text-2xl font-bold">My contribution</h2>
          </div>
          <div className="divide-y divide-white/10">
            {project.contribution.map((item) => (
              <div key={item.area} className={`grid gap-2 py-4 first:pt-0 sm:grid-cols-[0.3fr_1fr] ${lineTone}`}>
                <h3 className="text-sm font-bold">{item.area}</h3>
                <p className={`text-sm/6 ${mutedTone}`}>{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={`grid gap-8 border-t py-10 md:grid-cols-[0.32fr_1fr] md:py-14 ${lineTone}`}>
          <div>
            <p className={`text-xs font-bold uppercase tracking-[0.14em] ${mutedTone}`}>07 / Engineering</p>
            <h2 className="mt-3 text-2xl font-bold">Challenges &amp; solutions</h2>
          </div>
          <div className="space-y-3">
            {project.challenges.map((item, index) => (
              <article key={item.challenge} className={`grid gap-4 border p-4 sm:grid-cols-2 sm:p-5 ${lineTone} ${panelTone}`}>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#d2836f]">Challenge {String(index + 1).padStart(2, "0")}</p>
                  <p className="mt-2 text-sm/6">{item.challenge}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#72b997]">Solution</p>
                  <p className={`mt-2 text-sm/6 ${mutedTone}`}>{item.solution}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={`grid gap-8 border-t py-10 md:grid-cols-[0.32fr_1fr] md:py-14 ${lineTone}`}>
          <div>
            <p className={`text-xs font-bold uppercase tracking-[0.14em] ${mutedTone}`}>08 / System</p>
            <h2 className="mt-3 text-2xl font-bold">Project architecture</h2>
          </div>
          <div>
            <div className="grid gap-2 sm:grid-cols-[repeat(auto-fit,minmax(130px,1fr))]">
              {project.architecture.flow.map((node, index) => (
                <div key={node} className="flex items-center gap-2">
                  <div className={`flex min-h-16 flex-1 items-center justify-center border px-3 py-3 text-center text-xs font-semibold ${lineTone} ${panelTone}`}>{node}</div>
                  {index < project.architecture.flow.length - 1 && <span className={`hidden text-sm sm:block ${mutedTone}`} aria-hidden="true">→</span>}
                </div>
              ))}
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.architecture.integrations.map((item) => <span key={item} className="rounded-full border border-[#72b997]/35 px-3 py-1.5 text-xs text-[#72b997]">{item}</span>)}
            </div>
          </div>
        </section>

        <section className={`grid gap-8 border-t py-10 md:grid-cols-[0.32fr_1fr] md:py-14 ${lineTone}`}>
          <div>
            <p className={`text-xs font-bold uppercase tracking-[0.14em] ${mutedTone}`}>09 / Outcome</p>
            <h2 className="mt-3 text-2xl font-bold">Project outcome</h2>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {project.outcomes.map((outcome) => (
              <li key={outcome} className={`flex gap-3 border p-4 text-sm/6 ${lineTone} ${panelTone}`}>
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#72b997]" aria-hidden="true" />{outcome}
              </li>
            ))}
          </ul>
        </section>

        <section className={`grid gap-8 border-t py-10 md:grid-cols-[0.32fr_1fr] md:py-14 ${lineTone}`}>
          <div>
            <p className={`text-xs font-bold uppercase tracking-[0.14em] ${mutedTone}`}>10 / Reflection</p>
            <h2 className="mt-3 text-2xl font-bold">What I learned</h2>
          </div>
          <ol className="grid gap-3 sm:grid-cols-3">
            {project.lessons.map((lesson, index) => (
              <li key={lesson} className={`border p-4 ${lineTone} ${panelTone}`}>
                <span className="text-xs font-bold text-[#72b997]">0{index + 1}</span>
                <p className={`mt-3 text-sm/6 ${mutedTone}`}>{lesson}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className={`border-y py-7 ${lineTone}`}>
          {availableLinks.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {availableLinks.map(({ key, label, icon: Icon }) => (
                <a key={key} href={project.links[key]} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#9fe3c1] px-4 py-2.5 text-sm font-bold text-[#14251d]">
                  {label}<Icon aria-hidden="true" />
                </a>
              ))}
            </div>
          ) : (
            <p className={`text-sm ${mutedTone}`}>No public project links were included in the supplied project information.</p>
          )}
        </section>

        <nav className="grid gap-3 py-8 sm:grid-cols-2" aria-label="Project navigation">
          <Link to={`/projects/${previousProject.slug}`} className={`group border p-4 transition hover:border-[#72b997] ${lineTone}`}>
            <span className={`flex items-center gap-2 text-xs ${mutedTone}`}><FaArrowLeft aria-hidden="true" /> Previous project</span>
            <span className="mt-2 block font-bold group-hover:text-[#72b997]">{previousProject.name}</span>
          </Link>
          <Link to={`/projects/${nextProject.slug}`} className={`group border p-4 text-right transition hover:border-[#72b997] ${lineTone}`}>
            <span className={`flex items-center justify-end gap-2 text-xs ${mutedTone}`}>Next project <FaArrowRight aria-hidden="true" /></span>
            <span className="mt-2 block font-bold group-hover:text-[#72b997]">{nextProject.name}</span>
          </Link>
        </nav>
      </div>

      {isViewerOpen && currentMedia && (
        <div className="fixed inset-0 z-[100] flex flex-col bg-black/95 p-4 text-white sm:p-6" role="dialog" aria-modal="true" aria-label={`${project.name} image viewer`}>
          <div className="flex items-center justify-between gap-4">
            <p className="truncate text-sm">{currentMedia.caption} <span className="text-white/50">{galleryIndex + 1} / {galleryItems.length}</span></p>
            <div className="flex shrink-0 gap-2">
              <button type="button" className="grid h-10 w-10 place-items-center rounded-full border border-white/25" onClick={() => setIsZoomed((value) => !value)} aria-label={isZoomed ? "Zoom out" : "Zoom in"}>{isZoomed ? <FaSearchMinus /> : <FaSearchPlus />}</button>
              <button type="button" className="grid h-10 w-10 place-items-center rounded-full border border-white/25" onClick={() => setIsViewerOpen(false)} aria-label="Close image viewer"><FaTimes /></button>
            </div>
          </div>
          <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden py-4">
            <button type="button" onClick={() => moveGallery(-1)} className="absolute left-0 z-10 grid h-10 w-10 place-items-center rounded-full bg-white/10" aria-label="Previous image"><FaArrowLeft /></button>
            {currentMedia.type === "video" ? (
              <video className="max-h-full max-w-full" src={currentMedia.src} controls autoPlay />
            ) : (
              <img className={`max-h-full max-w-full object-contain transition-transform duration-300 ${isZoomed ? "scale-150 cursor-zoom-out" : "cursor-zoom-in"}`} src={currentMedia.src} alt={currentMedia.caption} onClick={() => setIsZoomed((value) => !value)} />
            )}
            <button type="button" onClick={() => moveGallery(1)} className="absolute right-0 z-10 grid h-10 w-10 place-items-center rounded-full bg-white/10" aria-label="Next image"><FaArrowRight /></button>
          </div>
          <div className="flex justify-center gap-2 overflow-x-auto py-2">
            {galleryItems.map((media, index) => (
              <button key={media.src} type="button" onClick={() => setGalleryIndex(index)} aria-label={`Show ${media.caption}`} className={`h-14 w-20 shrink-0 overflow-hidden border-2 ${galleryIndex === index ? "border-[#9fe3c1]" : "border-transparent"}`}>
                <img className="h-full w-full object-cover" src={media.thumbnail || media.src} alt="" />
              </button>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}