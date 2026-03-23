"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function CreatePage() {
  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", minHeight: "70vh", padding: "20px", textAlign: "center",
    }}>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
        style={{ fontSize: "64px", marginBottom: "20px" }}
      >
        🎬
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        style={{ fontSize: "22px", fontWeight: 800, color: "#fff", marginBottom: "8px" }}
      >
        Criar Conteúdo
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        style={{ fontSize: "14px", color: "var(--text-muted)", marginBottom: "24px", maxWidth: "300px" }}
      >
        Em breve você poderá criar e compartilhar seu próprio conteúdo.
      </motion.p>
      <Link href="/explore">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            padding: "12px 28px", fontSize: "14px", fontWeight: 700,
            background: "var(--gradient-button)", color: "#fff",
            border: "none", borderRadius: "12px", cursor: "pointer",
            fontFamily: "inherit",
          }}
        >
          Explorar Cursos
        </motion.button>
      </Link>
    </div>
  );
}
