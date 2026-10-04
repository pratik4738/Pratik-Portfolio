import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaCalendarAlt,
  FaCode,
  FaExternalLinkAlt,
  FaFilePdf,
  FaGithub,
  FaLightbulb,
  FaPlus,
  FaUsers,
} from "react-icons/fa";

const presentationUrl = "/assets/statathon-idea-presentation-format%20(1).pptx%20(1).pdf";

const showcases = [
  {
    id: "statathon-2025",
    title: "ASDP - AI Survey Data Processor",
    event: "STATATHON 2025",
    year: "2025",
    role: "Team Lead · InnoStat_77",
    categories: ["Hackathons", "Presentations"],
    badge: "Hackathon",
    featured: true,
    description:
      "An AI-augmented platform that automates survey data preparation, estimation, and report writing. It accepts raw CSV and Excel files, validates and cleans data, applies survey weights, and generates ready-to-use PDF and HTML reports.",
    problem:
      "Survey teams spend significant time preparing inconsistent datasets, validating quality, estimating results, and assembling reports. The challenge was to make this end-to-end workflow faster, more reliable, and easier to audit.",
    approach:
      "Designed a unified pipeline for schema mapping, rule validation, imputation, outlier checks, adaptive AI-assisted method selection, survey weighting, estimation, visualization, and automated report generation.",
    technologies: [
      "Python",
      "Flask / FastAPI",
      "AI / ML",
      "Apache Airflow",
      "PostgreSQL",
      "Redis",
      "AWS",
      "Docker",
      "Kubernetes",
      "GitHub CI/CD",
      "Jinja2",
      "S3",
    ],
    features: [
      "CSV/Excel ingestion and schema mapping",
      "Data cleaning, validation, and outlier detection",
      "AI-assisted method selection",
      "Survey weighting and estimation",
      "Visualization and metadata consistency checks",
      "PDF/HTML reports and audit trails",
      "Multilingual and voice support",
      "Report Q&A with LLM + RAG and low-code configuration",
    ],
    outcome:
      "Participated as Team Lead and presented the ASDP solution for STATATHON 2025 Problem Statement 4, in the Software - Data Processing and Analysis category.",
    presentation: presentationUrl,
    links: {},
  },
  {
    id: "next-project",
    title: "Project showcase",
    event: "Project",
    year: "Add year",
    role: "Add role or team",
    categories: ["Projects"],
    badge: "Project",
    placeholder: true,
  },
  {
    id: "next-hackathon",
    title: "Technical competition",
    event: "Hackathon",
    year: "Add year",
    role: "Add role or team",
    categories: ["Hackathons"],
    badge: "Hackathon",
    placeholder: true,
  },
  {
    id: "next-presentation",
    title: "Project presentation",
    event: "Presentation",
    year: "Add year",
    role: "Add role or team",
    categories: ["Presentations"],
    badge: "PPT",
    placeholder: true,
  },
];

const filters = ["All", "Hackathons", "Projects", "Presentations"];

function ActionLink({ href, children, icon: Icon, disabled = false }) {
  const className = `inline-flex min-h-10 items-center justify-center gap-2 rounded border px-3 py-2 text-sm font-semibold transition-colors ${
    disabled
      ? "cursor-not-allowed border-white/15 text-white/35"
      : "border-white/30 text-white hover:border-white hover:bg-white hover:text-black"
  }`;

  if (disabled || !href) {
    return (
      <button type="button" className={className} disabled title="Link not provided">
        <Icon aria-hidden="true" />
        {children}
      </button>
    );
  }

  return (
    <a className={className} href={href} target="_blank" rel="noreferrer">
      <Icon aria-hidden="true" />
      {children}
    </a>
  );
}

export default function Hackathons() {
  const [activeFilter, setActiveFilter] = useState("All");
  const visibleShowcases = showcases.filter(
    (showcase) =>
      activeFilter === "All" || showcase.categories.includes(activeFilter),
  );

  return (
    <section className="bg-[#101010] px-5 py-14 text-white lg:px-28 lg:py-24" id="hackathons">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 border-b border-white/15 pb-7 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/55">Selected work beyond the product</p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">Hackathons &amp; Presentations</h2>
          </div>

          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter showcases">
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

        <div className="relative mt-8 space-y-5 before:absolute before:bottom-5 before:left-[19px] before:top-5 before:w-px before:bg-white/20 md:mt-10">
          {visibleShowcases.map((showcase, index) => (
            <motion.article
              key={showcase.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: Math.min(index * 0.06, 0.18) }}
              viewport={{ once: true, amount: 0.1 }}
              className={`relative ml-10 border border-white/15 bg-white/[0.035] p-5 md:ml-14 md:p-7 ${
                showcase.featured ? "lg:p-9" : ""
              }`}
            >
              <span className="absolute -left-[39px] top-6 z-10 flex h-3 w-3 rounded-full border-2 border-[#101010] bg-[#9fe3c1] md:-left-[47px]" aria-hidden="true" />

              {showcase.placeholder ? (
                <div className="flex min-h-24 flex-col justify-center gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="border border-white/20 px-2 py-1 text-[11px] uppercase tracking-wide text-white/60">{showcase.badge}</span>
                      <span className="flex items-center gap-1 text-xs text-white/45"><FaCalendarAlt aria-hidden="true" /> {showcase.year}</span>
                    </div>
                    <h3 className="mt-3 text-lg font-semibold">{showcase.title}</h3>
                    <p className="mt-1 text-sm text-white/45">{showcase.event} · {showcase.role}</p>
                  </div>
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-dashed border-white/25 text-white/45" aria-hidden="true">
                    <FaPlus />
                  </span>
                </div>
              ) : (
                <div className="grid gap-7 xl:grid-cols-[0.9fr_1.1fr] xl:gap-10">
                  <div className="min-w-0">
                    <div className="mb-4 flex flex-wrap items-center gap-2">
                      <span className="bg-[#b7f0d2] px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-black">{showcase.badge}</span>
                      <span className="border border-white/20 px-2.5 py-1 text-xs text-white/75">{showcase.event}</span>
                    </div>
                    <h3 className="text-2xl font-bold leading-tight md:text-3xl">{showcase.title}</h3>
                    <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/60">
                      <span className="flex items-center gap-2"><FaCalendarAlt aria-hidden="true" /> {showcase.year}</span>
                      <span className="flex items-center gap-2"><FaUsers aria-hidden="true" /> {showcase.role}</span>
                    </div>
                    <p className="mt-5 text-sm/6 text-white/75 md:text-base">{showcase.description}</p>

                    <div className="mt-6 overflow-hidden border border-white/15 bg-white">
                      <iframe
                        className="aspect-[4/3] w-full"
                        src={`${showcase.presentation}#page=1&toolbar=0&navpanes=0`}
                        title={`${showcase.event} presentation preview`}
                        loading="lazy"
                      />
                    </div>

                    <div className="mt-5 flex flex-wrap gap-2">
                      <ActionLink href={showcase.links.project} icon={FaExternalLinkAlt} disabled={!showcase.links.project}>View Project</ActionLink>
                      <ActionLink href={showcase.presentation} icon={FaFilePdf}>View PPT</ActionLink>
                      <ActionLink href={showcase.links.demo} icon={FaLightbulb} disabled={!showcase.links.demo}>View Demo</ActionLink>
                      <ActionLink href={showcase.links.github} icon={FaGithub} disabled={!showcase.links.github}>View GitHub</ActionLink>
                    </div>
                  </div>

                  <div className="space-y-6 border-t border-white/15 pt-6 xl:border-l xl:border-t-0 xl:pl-8 xl:pt-0">
                    <Detail title="Problem statement">{showcase.problem}</Detail>
                    <Detail title="Solution / approach">{showcase.approach}</Detail>
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-[0.12em] text-white/50">Key features</h4>
                      <ul className="mt-3 grid gap-x-5 gap-y-2 sm:grid-cols-2">
                        {showcase.features.map((feature) => (
                          <li key={feature} className="flex gap-2 text-sm/5 text-white/75">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#9fe3c1]" aria-hidden="true" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-[0.12em] text-white/50">Technologies</h4>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {showcase.technologies.map((technology) => (
                          <span key={technology} className="border border-white/20 px-2 py-1 text-xs text-white/75">{technology}</span>
                        ))}
                      </div>
                    </div>
                    <Detail title="Outcome">{showcase.outcome}</Detail>
                  </div>
                </div>
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Detail({ title, children }) {
  return (
    <div>
      <h4 className="text-xs font-bold uppercase tracking-[0.12em] text-white/50">{title}</h4>
      <p className="mt-2 text-sm/6 text-white/75">{children}</p>
    </div>
  );
}