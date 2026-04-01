"use client";

import { Check, Link2 } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export function ShareButtons({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);
  const { t } = useTranslation();

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOnX = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(title);
    window.open(`https://x.com/intent/tweet?text=${text}&url=${url}`, "_blank");
  };

  const shareOnLinkedin = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      "_blank",
    );
  };

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <span className="text-sm text-(--q-text-2) font-medium">
        {t("blog_post.share")}
      </span>
      <button
        type="button"
        onClick={shareOnX}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-(--q-border) text-sm text-(--q-text-1) hover:border-(--q-accent)/30 hover:text-(--q-text-0) transition-colors"
      >
        𝕏
      </button>
      <button
        type="button"
        onClick={shareOnLinkedin}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-(--q-border) text-sm text-(--q-text-1) hover:border-(--q-accent)/30 hover:text-(--q-text-0) transition-colors"
      >
        LinkedIn
      </button>
      <button
        type="button"
        onClick={copyLink}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-(--q-border) text-sm text-(--q-text-1) hover:border-(--q-accent)/30 hover:text-(--q-text-0) transition-colors"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-emerald-500" />
            {t("blog_post.copied")}
          </>
        ) : (
          <>
            <Link2 className="w-3.5 h-3.5" />
            {t("blog_post.copy_link")}
          </>
        )}
      </button>
    </div>
  );
}
