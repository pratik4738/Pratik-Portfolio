import { motion } from 'framer-motion';

export default function About() {
  return (
    <div className="px-5 lg:px-28 flex justify-between flex-col lg:flex-row" id="about">
      <motion.div
        className="lg:w-1/2"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", stiffness: 80, damping: 10 }}
        viewport={{ once: true }}
      >
        <img src="/assets/about-me.svg" alt="About Me Illustration" />
      </motion.div>

      <motion.div
        className="lg:w-1/2"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", stiffness: 80, damping: 10, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <h2 className="lg:text-4xl text-2xl mt-4 lg:mt-0">
          About <span className="font-extrabold">Me</span>
        </h2>

        <p className="text-[#71717A] text-sm/6 lg:text-base mt-5 lg:mt-10">
          I&apos;m a Computer Engineering student at MIT Academy of Engineering, Alandi, pursuing my B.Tech from August 2023 to June 2027. I build full-stack and AI-powered web and mobile applications, bringing ideas from database design and REST APIs through to polished user interfaces.
        </p>

        <p className="text-[#71717A] text-sm/6 lg:text-base mt-3 lg:mt-5">
          I completed a Full Stack Development internship at Campus Credentials from June to August 2025. There, I worked on Exam-Wizards, an online assessment platform built with React, Spring Boot, MySQL, and REST APIs, including authentication, exam management, questions, and results.
        </p>

        <p className="text-[#71717A] text-sm/6 lg:text-base mt-3 lg:mt-5">
          I&apos;m pursuing my B.Tech in Computer Engineering (CGPA: 7.30/10 through semester 6) and have solved 200+ data structures and algorithms problems on LeetCode.
        </p>

        <div className="mt-6 lg:mt-8 grid gap-5 sm:grid-cols-2">
          <div>
            <h3 className="font-bold">Education</h3>
            <p className="text-[#71717A] text-sm/6 mt-2">MIT Academy of Engineering, Alandi, Pune</p>
            <p className="text-[#71717A] text-sm/6">B.Tech, Computer Engineering · 2023–2027</p>
          </div>
          <div>
            <h3 className="font-bold">Activities</h3>
            <p className="text-[#71717A] text-sm/6 mt-2">Team lead, STATATHON 2025: AI-powered survey processing and report generation.</p>
            <p className="text-[#71717A] text-sm/6 mt-2">SMART INDIA HACKATHON 2025: proposed Pramaanam AI for document automation.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
