"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslation } from "react-i18next";

export function InlineCTA() {
  const { t } = useTranslation();
  const params = useParams();
  const locale = (params.locale as string) || "fr";

  return (
    <section className="relative z-10 py-16 px-6">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 p-8 rounded-2xl border border-(--q-accent)/20 bg-(--q-accent)/5">
        <p className="text-(--q-text-0) font-semibold text-lg sm:text-xl text-center sm:text-left">
          {t("inline_cta.text")}
        </p>
        <Link
          href={`/${locale}/download`}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-(--q-accent) hover:bg-(--q-accent-strong) text-white font-semibold transition-colors shrink-0"
        >
          {t("inline_cta.button")}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
