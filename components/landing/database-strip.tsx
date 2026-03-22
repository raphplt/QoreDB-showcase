"use client";

import { motion } from "framer-motion";
import { Database, HardDrive, Scale, Zap } from "lucide-react";
import Image from "next/image";
import { useTranslation } from "react-i18next";

const databases = [
  { name: "PostgreSQL", image: "/images/databases/postgresql.webp" },
  { name: "MySQL", image: "/images/databases/mysql.webp" },
  { name: "MongoDB", image: "/images/databases/mongodb.webp" },
  { name: "Redis", image: "/images/databases/redis.png" },
  { name: "SQLite", image: "/images/databases/sqlite.webp" },
  { name: "DuckDB", image: "/images/databases/duckdb.png" },
  { name: "SQL Server", image: "/images/databases/sqlserver.png" },
  { name: "CockroachDB", image: "/images/databases/cockroachdb.png" },
];

const stats = [
  { key: "databases", icon: Database },
  { key: "binary_size", icon: HardDrive },
  { key: "startup", icon: Zap },
  { key: "license", icon: Scale },
];

export function DatabaseStrip() {
  const { t } = useTranslation();

  return (
    <section className="relative z-10 py-12 border-y border-(--q-border) bg-(--q-bg-1)">
      <div className="max-w-5xl mx-auto px-6 space-y-8">
        {/* Database chips */}
        <div className="text-center">
          <p className="text-(--q-text-2) text-xs font-medium uppercase tracking-[2px] mb-6">
            {t("database_strip.label")}
          </p>
          <motion.div
            className="flex flex-wrap justify-center items-center gap-3"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            {databases.map((db) => (
              <div
                key={db.name}
                className="group flex items-center gap-2.5 px-4 py-2 border border-(--q-border) rounded-lg text-sm font-medium text-(--q-text-2) hover:text-(--q-text-0) hover:border-(--q-accent) hover:bg-(--q-accent)/5 transition-all duration-200 cursor-default"
              >
                <Image
                  src={db.image}
                  alt={db.name}
                  width={20}
                  height={20}
                  className="w-5 h-5 object-contain shrink-0 opacity-60 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-200"
                />
                {db.name}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Stats bar */}
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
    </section>
  );
}
