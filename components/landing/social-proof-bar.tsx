"use client";

import { motion } from "framer-motion";
import { Database, HardDrive, Scale, Zap } from "lucide-react";
import { useTranslation } from "react-i18next";

const stats = [
  { key: "databases", icon: Database },
  { key: "binary_size", icon: HardDrive },
  { key: "startup", icon: Zap },
  { key: "license", icon: Scale },
];

export function SocialProofBar() {
  const { t } = useTranslation();

  return (
    <motion.section
      className="relative z-10 py-10 bg-(--q-bg-0)"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex justify-center items-center gap-6 sm:gap-0 flex-nowrap overflow-x-auto">
          {stats.map((stat, index) => (
            <div
              key={stat.key}
              className={`flex items-center gap-2.5 whitespace-nowrap px-4 sm:px-8 shrink-0 ${
                index < stats.length - 1
                  ? "sm:border-r sm:border-(--q-border)"
                  : ""
              }`}
            >
              <stat.icon className="w-4 h-4 text-(--q-accent) shrink-0" />
              <span className="text-sm font-bold text-(--q-text-0)">
                {t(`social_proof.${stat.key}`)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
