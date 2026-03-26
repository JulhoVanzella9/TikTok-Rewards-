"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

export default function CheckoutPage() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<"basic" | "pro" | "premium">("pro");
  const [isProcessing, setIsProcessing] = useState(false);

  const plans = {
    basic: {
      name: "Basic",
      price: 29.90,
      originalPrice: 49.90,
      features: [
        "Access to video rating",
        "Earn up to $50/day",
        "Basic support",
        "7 days access",
      ],
      color: "#25f4ee",
      recommended: false,
    },
    pro: {
      name: "Pro",
      price: 49.90,
      originalPrice: 99.90,
      features: [
        "Access to video rating",
        "Earn up to $150/day",
        "Priority support",
        "30 days access",
        "Exclusive tutorials",
        "$20 Welcome Bonus",
      ],
      color: "#fe2c55",
      recommended: true,
    },
    premium: {
      name: "Premium",
      price: 99.90,
      originalPrice: 199.90,
      features: [
        "Access to video rating",
        "Unlimited earnings",
        "VIP 24/7 support",
        "Lifetime access",
        "All tutorials & courses",
        "$50 Welcome Bonus",
        "Early access to new features",
      ],
      color: "#ffd700",
      recommended: false,
    },
  };

  const handleCheckout = async () => {
    setIsProcessing(true);
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    // Redirect to payment provider or success page
    router.push("/register");
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(180deg, #0a0a0f 0%, #1a1a2e 50%, #0a0a0f 100%)",
      padding: "20px",
      paddingBottom: "40px",
    }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px 0",
          position: "relative",
        }}
      >
        <Link href="/welcome" style={{ position: "absolute", left: 0 }}>
          <button style={{
            background: "rgba(255,255,255,0.1)",
            border: "none",
            borderRadius: "12px",
            padding: "10px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </button>
        </Link>
        <div style={{ textAlign: "center" }}>
          <h1 style={{
            fontSize: "24px",
            fontWeight: 800,
            color: "#fff",
          }}>
            Choose Your Plan
          </h1>
          <p style={{
            fontSize: "14px",
            color: "rgba(255,255,255,0.6)",
            marginTop: "4px",
          }}>
            Unlock access to TikTok Rewards
          </p>
        </div>
      </motion.div>

      {/* Limited Time Offer Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        style={{
          background: "linear-gradient(90deg, rgba(254,44,85,0.2) 0%, rgba(37,244,238,0.2) 100%)",
          borderRadius: "12px",
          padding: "12px 16px",
          marginBottom: "24px",
          border: "1px solid rgba(255,255,255,0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#fe2c55">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
          </svg>
        </motion.div>
        <span style={{ color: "#fff", fontSize: "14px", fontWeight: 600 }}>
          Limited Time: Up to 50% OFF!
        </span>
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#25f4ee">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
          </svg>
        </motion.div>
      </motion.div>

      {/* Plans */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        maxWidth: "400px",
        margin: "0 auto",
      }}>
        {(Object.keys(plans) as Array<keyof typeof plans>).map((planKey, index) => {
          const plan = plans[planKey];
          const isSelected = selectedPlan === planKey;
          
          return (
            <motion.div
              key={planKey}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              onClick={() => setSelectedPlan(planKey)}
              style={{
                background: isSelected 
                  ? `linear-gradient(135deg, ${plan.color}15, ${plan.color}08)`
                  : "rgba(255,255,255,0.03)",
                borderRadius: "20px",
                padding: "20px",
                border: isSelected 
                  ? `2px solid ${plan.color}`
                  : "2px solid rgba(255,255,255,0.08)",
                cursor: "pointer",
                position: "relative",
                transition: "all 0.3s ease",
              }}
            >
              {/* Recommended Badge */}
              {plan.recommended && (
                <div style={{
                  position: "absolute",
                  top: "-12px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: plan.color,
                  color: "#fff",
                  fontSize: "11px",
                  fontWeight: 700,
                  padding: "4px 16px",
                  borderRadius: "20px",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}>
                  Most Popular
                </div>
              )}

              {/* Plan Header */}
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "16px",
              }}>
                <div>
                  <h3 style={{
                    fontSize: "20px",
                    fontWeight: 700,
                    color: "#fff",
                  }}>
                    {plan.name}
                  </h3>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginTop: "4px" }}>
                    <span style={{
                      fontSize: "32px",
                      fontWeight: 800,
                      color: plan.color,
                    }}>
                      ${plan.price.toFixed(2)}
                    </span>
                    <span style={{
                      fontSize: "16px",
                      color: "rgba(255,255,255,0.4)",
                      textDecoration: "line-through",
                    }}>
                      ${plan.originalPrice.toFixed(2)}
                    </span>
                  </div>
                </div>
                <div style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  border: isSelected ? `3px solid ${plan.color}` : "2px solid rgba(255,255,255,0.2)",
                  background: isSelected ? plan.color : "transparent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.2s ease",
                }}>
                  {isSelected && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  )}
                </div>
              </div>

              {/* Features */}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {plan.features.map((feature, i) => (
                  <div key={i} style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={plan.color} strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    <span style={{
                      fontSize: "13px",
                      color: "rgba(255,255,255,0.8)",
                    }}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Payment Methods */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        style={{
          maxWidth: "400px",
          margin: "24px auto",
          textAlign: "center",
        }}
      >
        <p style={{
          fontSize: "12px",
          color: "rgba(255,255,255,0.5)",
          marginBottom: "12px",
        }}>
          Secure payment methods
        </p>
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "16px",
        }}>
          <div style={{
            background: "rgba(255,255,255,0.1)",
            borderRadius: "8px",
            padding: "8px 16px",
          }}>
            <span style={{ color: "#fff", fontSize: "14px", fontWeight: 600 }}>PayPal</span>
          </div>
          <div style={{
            background: "rgba(255,255,255,0.1)",
            borderRadius: "8px",
            padding: "8px 16px",
          }}>
            <span style={{ color: "#fff", fontSize: "14px", fontWeight: 600 }}>Pix</span>
          </div>
          <div style={{
            background: "rgba(255,255,255,0.1)",
            borderRadius: "8px",
            padding: "8px 16px",
          }}>
            <span style={{ color: "#fff", fontSize: "14px", fontWeight: 600 }}>Card</span>
          </div>
        </div>
      </motion.div>

      {/* Checkout Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        style={{
          maxWidth: "400px",
          margin: "0 auto",
        }}
      >
        <button
          onClick={handleCheckout}
          disabled={isProcessing}
          className="btn-3d btn-3d-primary btn-3d-lg btn-3d-full"
          style={{
            gap: "10px",
            fontFamily: "inherit",
            opacity: isProcessing ? 0.7 : 1,
          }}
        >
          {isProcessing ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" strokeDasharray="32" strokeDashoffset="12"/>
                </svg>
              </motion.div>
              Processing...
            </>
          ) : (
            <>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                <line x1="1" y1="10" x2="23" y2="10"/>
              </svg>
              Pay ${plans[selectedPlan].price.toFixed(2)} - Get Access Now
            </>
          )}
        </button>

        {/* Guarantee */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          marginTop: "16px",
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#25f4ee" strokeWidth="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
          <span style={{
            fontSize: "12px",
            color: "rgba(255,255,255,0.6)",
          }}>
            30-day money-back guarantee
          </span>
        </div>
      </motion.div>

      {/* Trust Badges */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        style={{
          marginTop: "32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "24px",
          color: "rgba(255,255,255,0.4)",
          fontSize: "11px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
          SSL Secure
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
          Verified
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
          50K+ Users
        </div>
      </motion.div>
    </div>
  );
}
