"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useParams } from "next/navigation";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  const params = useParams();
  const locale = params.locale as string;

  return (
    <nav className="flex items-center gap-1.5 text-sm text-(--q-text-2) mb-8">
      <Link
        href={`/${locale}`}
        className="hover:text-(--q-text-0) transition-colors"
      >
        QoreDB
      </Link>
      {items.map((item, index) => (
        <span key={index} className="flex items-center gap-1.5">
          <ChevronRight className="w-3.5 h-3.5" />
          {item.href ? (
            <Link
              href={item.href}
              className="hover:text-(--q-text-0) transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-(--q-text-0) font-medium">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
