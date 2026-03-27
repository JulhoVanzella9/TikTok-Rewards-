"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/lib/theme/context";
import TopBar from "../components/TopBar";
import SupportChat from "./components/SupportChat";

export default function SupportPage() {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";
  const [showChat, setShowChat] = useState(false);

  const faqs = [
    {
      question: "Como acessar o TikCash?",
      answer: "Após a compra, você recebe acesso imediato ao app. Basta fazer login com o email usado na compra."
    },
    {
      question: "Quais funcionalidades o TikCash oferece?",
      answer: "O TikCash oferece cursos exclusivos, programa de recompensas, sistema de indicações e muito mais."
    },
    {
      question: "Como conectar minha conta TikTok?",
      answer: "Acesse as configurações do app e siga as instruções para vincular sua conta TikTok de forma segura."
    },
    {
      question: "Meus dados estão seguros?",
      answer: "Sim! Utilizamos criptografia de ponta e seguimos todas as normas de proteção de dados."
    },
    {
      question: "Como solicitar reembolso?",
      answer: "Envie um email para contactmgcomp@gmail.com com seu código de compra dentro de 30 dias."
    },
    {
      question: "Posso usar em dispositivos móveis?",
      answer: "Sim! O TikCash funciona em qualquer dispositivo com navegador ou como app instalável (PWA)."
    },
  ];

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div style={{ 
      minHeight: "100vh", 
      background: isDarkMode ? "#000" : "#fafafa",
    }}>
      <TopBar />
      
      <main style={{ padding: "24px 16px", maxWidth: "800px", margin: "0 auto" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ marginBottom: "32px", textAlign: "center" }}
        >
          <h1 style={{ 
            fontSize: "32px", 
            fontWeight: 800, 
            color: isDarkMode ? "#fff" : "#1a1a1a",
            marginBottom: "8px",
          }}>
            <span style={{ color: "#fe2c55" }}>Centro</span> de Suporte
          </h1>
          <p style={{ 
            color: isDarkMode ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)",
            fontSize: "15px",
          }}>
            Estamos aqui para ajudar você com o TikCash
          </p>
        </motion.div>

        {/* Support Options */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", 
          gap: "16px",
          marginBottom: "32px",
        }}>
          {/* Email Support Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{
              padding: "24px",
              borderRadius: "16px",
              background: isDarkMode ? "rgba(255,255,255,0.03)" : "#fff",
              border: `1px solid ${isDarkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
            }}
          >
            <div style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              background: "rgba(254,44,85,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "16px",
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fe2c55" strokeWidth="2">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
            </div>
            <h3 style={{ 
              fontSize: "18px", 
              fontWeight: 700, 
              color: isDarkMode ? "#fff" : "#1a1a1a",
              marginBottom: "8px",
            }}>
              Suporte por Email
            </h3>
            <p style={{ 
              fontSize: "14px", 
              color: isDarkMode ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)",
              marginBottom: "16px",
            }}>
              Receba ajuda por email em até 24 horas
            </p>
            <a 
              href="mailto:contactmgcomp@gmail.com"
              style={{
                display: "block",
                width: "100%",
                padding: "12px",
                borderRadius: "10px",
                background: "#fe2c55",
                color: "#fff",
                fontSize: "14px",
                fontWeight: 600,
                textAlign: "center",
                textDecoration: "none",
                transition: "all 0.2s",
              }}
            >
              Enviar Email
            </a>
          </motion.div>

          {/* Live Chat Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              padding: "24px",
              borderRadius: "16px",
              background: isDarkMode ? "rgba(255,255,255,0.03)" : "#fff",
              border: `1px solid ${isDarkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
            }}
          >
            <div style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              background: "rgba(37,244,238,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "16px",
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#25f4ee" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
            </div>
            <h3 style={{ 
              fontSize: "18px", 
              fontWeight: 700, 
              color: isDarkMode ? "#fff" : "#1a1a1a",
              marginBottom: "8px",
            }}>
              Chat ao Vivo
            </h3>
            <p style={{ 
              fontSize: "14px", 
              color: isDarkMode ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)",
              marginBottom: "16px",
            }}>
              Converse com nossa equipe em tempo real
            </p>
            <button 
              onClick={() => setShowChat(true)}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "10px",
                background: "#25f4ee",
                color: "#000",
                fontSize: "14px",
                fontWeight: 600,
                border: "none",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              Iniciar Chat
            </button>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{
            padding: "24px",
            borderRadius: "16px",
            background: isDarkMode ? "rgba(255,255,255,0.03)" : "#fff",
            border: `1px solid ${isDarkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
            marginBottom: "24px",
          }}
        >
          <div style={{ 
            display: "flex", 
            alignItems: "center", 
            gap: "12px",
            marginBottom: "20px",
          }}>
            <div style={{
              width: "40px",
              height: "40px",
              borderRadius: "10px",
              background: "rgba(254,44,85,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fe2c55" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
            </div>
            <h2 style={{ 
              fontSize: "20px", 
              fontWeight: 700, 
              color: isDarkMode ? "#fff" : "#1a1a1a",
            }}>
              Perguntas Frequentes
            </h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "16px",
                    borderRadius: "12px",
                    background: openFaq === index 
                      ? (isDarkMode ? "rgba(254,44,85,0.1)" : "rgba(254,44,85,0.05)")
                      : "transparent",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.2s",
                  }}
                >
                  <span style={{ 
                    fontSize: "15px", 
                    fontWeight: 600, 
                    color: isDarkMode ? "#fff" : "#1a1a1a",
                  }}>
                    {faq.question}
                  </span>
                  <motion.svg
                    animate={{ rotate: openFaq === index ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke={isDarkMode ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)"} 
                    strokeWidth="2"
                  >
                    <polyline points="6 9 12 15 18 9"/>
                  </motion.svg>
                </button>
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      style={{ overflow: "hidden" }}
                    >
                      <p style={{
                        padding: "12px 16px 16px",
                        fontSize: "14px",
                        color: isDarkMode ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.7)",
                        lineHeight: 1.6,
                      }}>
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Still Need Help */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          style={{
            padding: "20px",
            borderRadius: "12px",
            background: isDarkMode 
              ? "linear-gradient(135deg, rgba(37,244,238,0.1) 0%, rgba(254,44,85,0.1) 100%)"
              : "linear-gradient(135deg, rgba(37,244,238,0.08) 0%, rgba(254,44,85,0.08) 100%)",
            border: `1px solid ${isDarkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
          }}
        >
          <h3 style={{ 
            fontSize: "16px", 
            fontWeight: 700, 
            color: isDarkMode ? "#fff" : "#1a1a1a",
            marginBottom: "8px",
          }}>
            Ainda precisa de ajuda?
          </h3>
          <p style={{ 
            fontSize: "14px", 
            color: isDarkMode ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.7)",
            lineHeight: 1.5,
          }}>
            Nossa equipe de suporte está disponível de Segunda a Sexta, das 9h às 18h (horário de Brasília). Para questões urgentes, use o chat ao vivo acima.
          </p>
        </motion.div>
      </main>

      {/* Chat Modal */}
      <SupportChat isOpen={showChat} onClose={() => setShowChat(false)} />
    </div>
  );
}
