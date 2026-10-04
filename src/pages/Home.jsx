import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { FaLinkedinIn, FaPhone, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { BiLogoGmail } from "react-icons/bi";
import { SiLeetcode } from "react-icons/si";
import { TypeAnimation } from "react-type-animation";

export default function Home() {
  const shouldReduceMotion = useReducedMotion();
  const pointerX = useSpring(useMotionValue(0.5), { stiffness: 120, damping: 18 });
  const pointerY = useSpring(useMotionValue(0.5), { stiffness: 120, damping: 18 });
  const rotateX = useTransform(pointerY, [0, 1], [5, -5]);
  const rotateY = useTransform(pointerX, [0, 1], [-5, 5]);

  const updatePortraitTilt = (event) => {
    if (shouldReduceMotion || event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - bounds.left) / bounds.width);
    pointerY.set((event.clientY - bounds.top) / bounds.height);
  };

  const resetPortraitTilt = () => {
    pointerX.set(0.5);
    pointerY.set(0.5);
  };

  return (
    <div className="mt-20" id="home">
      <div className="flex justify-between py-10 items-center px-5 lg:px-28 lg:flex-row flex-col-reverse">

        <motion.div
          className="lg:w-[45%]"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >

          <motion.div
            className="text-2xl lg:text-5xl flex flex-col mt-8 lg:mt-0 gap-2 lg:gap-5"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { staggerChildren: 0.2, ease: "easeInOut" },
              },
            }}
          >
            <motion.h2 variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>
              Hello, <TypeAnimation
                sequence={[
                  'I am Pratik Patil',
                  1000,
                   'I am a Full Stack Web & Java Developer',
                  1000,
                  // 'I am a UI/UX Designer',
                  // 1000,
                ]}
                speed={10}
                style={{ fontWeight:600 }}
                repeat={Infinity}
              />
            </motion.h2>
            <motion.h2 variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>
              <span className="font-extrabold">Full-Stack & AI</span>{" "}
              <span className="text-white font-extrabold" style={{ WebkitTextStroke: "1px black" }}>Developer</span>
            </motion.h2>
            <motion.h2 variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>
              Based In <span className="font-extrabold">India.</span>
            </motion.h2>
          </motion.div>

          <motion.p
            className="text-[#71717A] text-sm lg:text-base mt-5"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
Computer Engineering student at MIT Academy of Engineering, building full-stack and AI-powered web and mobile applications. I work with React, Node.js, Java Spring Boot, and Python FastAPI, and have solved 200+ data structures and algorithms problems on LeetCode.
          </motion.p>

          <motion.div
            className="flex items-center gap-x-5 mt-10 lg:mt-14"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            {[
              { Icon: BiLogoGmail, href: "mailto:pratikspatil009@gmail.com", label: "Email Pratik" },
              { Icon: FaPhone, href: "tel:+919579991561", label: "Call Pratik" },
              { Icon: FaLinkedinIn, href: "https://www.linkedin.com/in/pratik-patil-4738x", label: "Pratik on LinkedIn", external: true },
              { Icon: SiLeetcode, href: "https://leetcode.com/u/pratikspatil009/", label: "Pratik on LeetCode", external: true },
              { Icon: FaYoutube, href: "https://www.youtube.com/@Pratik4738xGrow", label: "Pratik on YouTube", external: true },
              { Icon: FaXTwitter, href: "https://x.com/pratikspatil009", label: "Pratik on X", external: true },
            ].map(({ Icon, href, label, external }) => (
              <motion.a
                key={label}
                href={href}
                aria-label={label}
                title={label}
                target={external ? "_blank" : undefined}
                rel={external ? "noreferrer" : undefined}
                className="grid h-10 w-10 place-items-center rounded border-2 border-black bg-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#548568] lg:h-12 lg:w-12"
                whileHover={{ scale: 1.1, backgroundColor: "#000", color: "#fff" }}
                whileTap={{ scale: 0.9 }}
              >
                <Icon className="h-4 w-4 lg:h-5 lg:w-5" aria-hidden="true" />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="flex w-full items-end justify-center lg:w-[55%]"
          initial={shouldReduceMotion ? false : { opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <div
            className="relative isolate flex w-full items-end justify-center"
            onPointerMove={updatePortraitTilt}
            onPointerLeave={resetPortraitTilt}
            style={{ perspective: 1100 }}
          >
            <motion.div
              aria-hidden="true"
              className="absolute bottom-[9%] aspect-square w-[76%] rounded-full border border-dashed border-[#a7cbb8]/80"
              animate={shouldReduceMotion ? undefined : { rotate: 360 }}
              transition={shouldReduceMotion ? undefined : { duration: 36, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              aria-hidden="true"
              className="absolute bottom-[15%] aspect-square w-[64%] rounded-full border border-[#d2e4d8]"
              animate={shouldReduceMotion ? undefined : { rotate: -360 }}
              transition={shouldReduceMotion ? undefined : { duration: 48, repeat: Infinity, ease: "linear" }}
            />
            <div
              aria-hidden="true"
              className="absolute bottom-0 h-[82%] w-[72%] rounded-t-[48%] border border-[#b7d8c8] bg-[#eaf3ee]"
            />
            <motion.img
              className="relative z-10 h-[clamp(22rem,56vh,34rem)] w-auto max-w-full origin-bottom object-contain object-bottom drop-shadow-[0_18px_18px_rgba(16,24,20,0.12)] sm:h-[clamp(26rem,68vh,42rem)] lg:h-[min(78vh,46rem)]"
              src="/assets/full-transparent-photo.png"
              alt="Pratik Patil, full-stack and AI developer"
              style={shouldReduceMotion ? undefined : { rotateX, rotateY, transformStyle: "preserve-3d" }}
              animate={shouldReduceMotion ? undefined : { y: [0, -8, 0] }}
              transition={shouldReduceMotion ? undefined : { duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              aria-hidden="true"
              className="absolute right-[13%] top-[19%] z-20 h-3 w-3 rounded-full border-2 border-white bg-[#6a9b7d] shadow-[0_0_0_6px_rgba(106,155,125,0.18)]"
              animate={shouldReduceMotion ? undefined : { scale: [1, 1.18, 1] }}
              transition={shouldReduceMotion ? undefined : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.a
              href="#contact"
              className="absolute bottom-7 left-1 z-20 flex items-center gap-3 rounded-full border border-[#d7e4dc] bg-white/95 px-3 py-2 shadow-[0_8px_24px_rgba(27,55,39,0.12)] backdrop-blur sm:bottom-10 sm:left-4 sm:px-4"
              whileHover={shouldReduceMotion ? undefined : { y: -4, scale: 1.03 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
            >
              <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#548568] shadow-[0_0_0_5px_rgba(106,155,125,0.18)]" />
              <span className="text-left leading-tight">
                <span className="block text-[10px] font-semibold uppercase tracking-[0.12em] text-[#66806e]">Available for</span>
                <span className="block text-xs font-bold text-[#1c2d22] sm:text-sm">new opportunities</span>
              </span>
              <span aria-hidden="true" className="ml-1 text-xs font-bold uppercase text-[#548568]">Contact</span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
