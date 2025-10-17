import { useNavigate } from "react-router-dom";
import AimshalaLogo from "@/assets/logos/aimshala-light.png";
import { motion } from "framer-motion";
import {
  Users,
  BarChart3,
  BookOpen,
  Shield,
  FileText,
  Settings,
} from "lucide-react";

export default function LandingPage() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.15,
      },
    },
  } as const;

  const cardVariants = {
    hidden: { opacity: 0, y: 16, scale: 0.98 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  } as const;

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--text-head)] flex flex-col">
      <header className="flex items-center justify-between px-6 py-4  border-gray-200">
        <div className="flex items-center gap-2">
          <img src={AimshalaLogo} alt="Aimshala Logo" className="h-10" />
          <span className="text-xl font-semibold">Admin</span>
        </div>
        <motion.button
          whileHover={{ y: -2, scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleLoginClick}
          className="px-6 py-2 bg-[var(--brand-color)] hover:bg-[var(--brand-color)]/90 text-white rounded-md shadow-md transition will-change-transform"
        >
          Login
        </motion.button>
      </header>

      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex flex-col items-center text-center py-16 px-6"
      >
        <motion.h1
          className="text-4xl font-bold mb-4"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut", delay: 0.05 }}
        >
          Manage Everything in One Place
        </motion.h1>
        <motion.p
          className="text-lg text-[var(--text-muted)] max-w-xl mb-8"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut", delay: 0.1 }}
        >
          Welcome to the Aimshala Admin Dashboard. Easily monitor, control, and
          streamline all your administrative tasks with a single, intuitive
          platform.
        </motion.p>
        <motion.button
          whileHover={{ y: -2, scale: 1.04 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleLoginClick}
          className="px-8 py-3 bg-[var(--brand-color)] hover:bg-[var(--brand-color)]/80 text-white text-lg rounded-md shadow-lg transition will-change-transform"
        >
          Get Started
        </motion.button>
      </motion.section>

      <section className="py-14 px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="max-w-6xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {[
            {
              title: "User Management",
              desc: "Add, edit, and monitor user accounts with ease.",
              icon: Users,
            },
            {
              title: "Analytics",
              desc: "View reports and statistics to make data-driven decisions.",
              icon: BarChart3,
            },
            {
              title: "Content Control",
              desc: "Manage courses, materials, and resources effortlessly.",
              icon: BookOpen,
            },
            {
              title: "Secure Access",
              desc: "Role-based authentication for better security.",
              icon: Shield,
            },
            {
              title: "Activity Logs",
              desc: "Track all admin actions for accountability.",
              icon: FileText,
            },
            {
              title: "Custom Settings",
              desc: "Configure the platform according to your needs.",
              icon: Settings,
            },
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              whileHover={{ y: -4, scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="group relative overflow-hidden bg-white p-6 rounded-xs shadow-sm border border-gray-200 flex flex-col items-center text-center "
            >
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
              <motion.div
                whileHover={{ scale: 1.08 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="text-[var(--brand-color)] mb-4"
              >
                <feature.icon size={32} strokeWidth={1.5} />
              </motion.div>
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.desc}</p>
              <div className="absolute inset-0 rounded-xl ring-1 ring-transparent hover:ring-[var(--brand-color)]/30 transition" />
              <div className="pointer-events-none absolute -inset-px rounded-xl  opacity-60" />
            </motion.div>
          ))}
        </motion.div>
      </section>

      <footer className="mt-auto py-6 text-center text-sm text-gray-500 border-t">
        © {new Date().getFullYear()} Aimshala. All rights reserved.
      </footer>
    </div>
  );
}
