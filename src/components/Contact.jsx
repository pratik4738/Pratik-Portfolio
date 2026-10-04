import { useState } from "react";
import { motion } from "framer-motion";
import { IoMdMail } from "react-icons/io";
import { FaPhone } from "react-icons/fa6";

const emailEndpoint = "https://formsubmit.co/ajax/pratikspatil009@gmail.com";

export default function Contact() {
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState({ type: "idle", message: "" });

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    if (payload._honey) return;

    setIsSending(true);
    setStatus({ type: "idle", message: "" });

    try {
      const response = await fetch(emailEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });
      const result = await response.json();

      if (!response.ok || result.success === false || result.success === "false") {
        throw new Error("The message could not be sent.");
      }

      form.reset();
      setStatus({
        type: "success",
        message: "Message sent. Thanks for reaching out!",
      });
    } catch {
      setStatus({
        type: "error",
        message: "Message not sent. Please email pratikspatil009@gmail.com directly.",
      });
    } finally {
      setIsSending(false);
    }
  }

  const fieldClass = "w-full rounded border border-black/20 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-[#71717A] focus:border-black focus:ring-2 focus:ring-black/10";

  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, amount: 0.15 }}
      className="my-12 px-5 lg:my-20 lg:px-28"
      id="contact"
    >
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center text-2xl lg:text-4xl">
          Contact <span className="font-extrabold">Me</span>
        </h2>

        <div className="mt-8 grid gap-10 lg:mt-14 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
          <form onSubmit={handleSubmit} className="space-y-5" aria-label="Send Pratik a message">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block text-sm font-semibold">
                Your name
                <input className={`${fieldClass} mt-2 font-normal`} name="name" type="text" autoComplete="name" maxLength="100" placeholder="Name" required />
              </label>
              <label className="block text-sm font-semibold">
                Email address
                <input className={`${fieldClass} mt-2 font-normal`} name="email" type="email" autoComplete="email" maxLength="254" placeholder="you@example.com" required />
              </label>
            </div>

            <label className="block text-sm font-semibold">
              Project or opportunity
              <input className={`${fieldClass} mt-2 font-normal`} name="subject" type="text" maxLength="120" placeholder="What would you like to discuss?" required />
            </label>

            <label className="block text-sm font-semibold">
              Website or profile <span className="font-normal text-[#71717A]">(optional)</span>
              <input className={`${fieldClass} mt-2 font-normal`} name="website" type="url" maxLength="300" placeholder="https://" />
            </label>

            <label className="block text-sm font-semibold">
              Message
              <textarea className={`${fieldClass} mt-2 min-h-36 resize-y font-normal`} name="message" maxLength="5000" placeholder="A few details about what you have in mind..." required />
            </label>

            <input className="hidden" name="_honey" type="text" tabIndex="-1" autoComplete="off" aria-hidden="true" />
            <input name="_subject" type="hidden" value="New portfolio contact" />
            <input name="_template" type="hidden" value="table" />

            <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <button
                className="flex items-center gap-2 rounded bg-black px-5 py-3 font-medium text-white transition hover:bg-black/80 disabled:cursor-not-allowed disabled:opacity-60"
                type="submit"
                disabled={isSending}
              >
                {isSending ? "Sending..." : "Send message"}
                {!isSending && <IoMdMail aria-hidden="true" />}
              </button>
              <p className="text-xs text-[#71717A]">First-time delivery requires confirming your email from FormSubmit.</p>
            </div>

            <p
              className={`min-h-5 text-sm ${status.type === "error" ? "text-red-700" : "text-green-800"}`}
              role="status"
              aria-live="polite"
            >
              {status.message}
            </p>
          </form>

          <div className="lg:pt-2">
            <div className="space-y-1 text-2xl font-extrabold lg:text-5xl">
              <h3>Let&apos;s <span className="text-white" style={{ WebkitTextStroke: "1px black" }}>talk</span> for</h3>
              <h3>Something special</h3>
            </div>
            <p className="mt-4 text-sm/6 text-[#71717A] lg:mt-6 lg:text-base">
              Share a little about your project or opportunity. I&apos;ll get back to you by email.
            </p>

            <div className="mt-6 flex flex-col gap-3 text-sm font-semibold lg:text-base">
              <a className="flex items-center gap-2 hover:underline" href="mailto:pratikspatil009@gmail.com">
                <IoMdMail aria-hidden="true" />
                <span>pratikspatil009@gmail.com</span>
              </a>
              <a className="flex items-center gap-2 hover:underline" href="tel:+919579991561">
                <FaPhone aria-hidden="true" />
                <span>+91 95799 91561</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
