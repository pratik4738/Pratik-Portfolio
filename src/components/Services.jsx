import { motion } from "framer-motion";
import { FaCode, FaDatabase, FaPython, FaReact, FaServer } from "react-icons/fa";

const services = [
  {
    title: "Full-Stack Applications",
    description: "Build complete web and mobile products, from responsive React interfaces to APIs, authentication, and database-backed features.",
    tools: "React · Node.js · Spring Boot · MySQL · MongoDB",
    icon: FaCode,
  },
  {
    title: "AI and Generative AI",
    description: "Integrate useful AI capabilities such as interview feedback, resume analysis, NLP recommendations, and image-based crop disease detection.",
    tools: "Gemini AI · Hugging Face · NLP · ResNet-50",
    icon: FaPython,
  },
  {
    title: "Backend and REST APIs",
    description: "Design and build secure backend services, authentication, and API integrations that connect product experiences to reliable data.",
    tools: "Express · Spring Boot · FastAPI · REST APIs",
    icon: FaServer,
  },
  {
    title: "Data Processing and Analytics",
    description: "Automate data cleaning, outlier detection, augmentation, interactive analysis, and report generation for real-world datasets.",
    tools: "Pandas · NumPy · scikit-learn · Plotly · Airflow",
    icon: FaDatabase,
  },
  {
    title: "Real-Time Product Features",
    description: "Create responsive, cross-device experiences with live collaboration, peer rooms, expert consultations, and integrated payments.",
    tools: "React Native · Socket.IO · WebRTC · Razorpay",
    icon: FaReact,
  },
];

export default function Services() {
  return (
    <section className="px-5 py-12 lg:px-28 lg:py-20" id="services">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-8 flex flex-col justify-between gap-4 md:mb-12 md:flex-row md:items-end"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#71717A]">What I build</p>
            <h2 className="mt-2 text-2xl lg:text-4xl">Services <span className="font-extrabold">I Offer</span></h2>
          </div>
          <p className="max-w-xl text-sm/6 text-[#71717A] lg:text-base">
            From product interfaces and backend systems to AI-powered workflows, I help turn practical ideas into working software.
          </p>
        </motion.div>

        <div className="grid border-t border-black/15 md:grid-cols-2 md:gap-x-10">
          {services.map(({ title, description, tools, icon: Icon }, index) => (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: index * 0.07 }}
              viewport={{ once: true }}
              className="flex gap-4 border-b border-black/15 py-6 lg:gap-6 lg:py-8"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded bg-black text-white" aria-hidden="true">
                <Icon size={19} />
              </span>
              <div>
                <h3 className="text-lg font-bold lg:text-xl">{title}</h3>
                <p className="mt-2 text-sm/6 text-[#71717A] lg:text-base">{description}</p>
                <p className="mt-3 text-xs font-semibold text-black/75">{tools}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}