"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const AccordionContext = React.createContext<{
  openItems: string[];
  toggleItem: (value: string) => void;
} | null>(null);

function useAccordion() {
  const context = React.useContext(AccordionContext);
  if (!context) {
    throw new Error("useAccordion must be used within an Accordion");
  }
  return context;
}

interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: "single" | "multiple";
  defaultValue?: string | string[];
  onValueChange?: (value: string | string[]) => void;
}

export function Accordion({
  children,
  className,
  type = "single",
  defaultValue,
  onValueChange,
  ...props
}: AccordionProps) {
  const [openItems, setOpenItems] = React.useState<string[]>(() => {
    if (Array.isArray(defaultValue)) return defaultValue;
    if (defaultValue) return [defaultValue];
    return [];
  });

  const toggleItem = React.useCallback(
    (value: string) => {
      setOpenItems((prev) => {
        let next: string[];
        if (type === "single") {
          next = prev.includes(value) ? [] : [value];
        } else {
          next = prev.includes(value)
            ? prev.filter((item) => item !== value)
            : [...prev, value];
        }

        if (onValueChange) {
          onValueChange(type === "single" ? next[0] || "" : next);
        }
        return next;
      });
    },
    [type, onValueChange]
  );

  return (
    <AccordionContext.Provider value={{ openItems, toggleItem }}>
      <div className={cn("space-y-4", className)} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

export function AccordionItem({
  children,
  className,
  value,
  ...props
}: AccordionItemProps) {
  const { openItems } = useAccordion();
  const isOpen = openItems.includes(value);

  return (
    <div
      className={cn(
        "border border-(--q-border) rounded-lg bg-(--q-bg-1)/50 overflow-hidden transition-colors",
        isOpen && "border-(--q-accent)/30 bg-(--q-bg-1)",
        className
      )}
      {...props}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, { value, isOpen }); // eslint-disable-line @typescript-eslint/no-explicit-any
        }
        return child;
      })}
    </div>
  );
}

interface AccordionTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isOpen?: boolean;
  value?: string;
  onToggle?: () => void;
}

export function AccordionTrigger({
  children,
  className,
  isOpen, // Injected by Item
  value, // Injected by Item
  ...props
}: AccordionTriggerProps) {
  const { toggleItem } = useAccordion();

  return (
    <button
      type="button"
      onClick={() => value && toggleItem(value)}
      className={cn(
        "flex w-full items-start justify-between p-6 text-left transition-all hover:bg-(--q-bg-2)/50",
        className
      )}
      {...props}
    >
      <div className="flex-1 pr-4 font-semibold text-lg text-(--q-text-0)">
        {children}
      </div>
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.2 }}
        className="shrink-0 text-(--q-text-2)"
      >
        <ChevronDown className="h-5 w-5" />
      </motion.div>
    </button>
  );
}

interface AccordionContentProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen?: boolean;
}

export function AccordionContent({
  children,
  className,
  isOpen, // Injected by Item
  ...props
}: AccordionContentProps) {
  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <div
            className={cn(
              "p-6 pt-0 text-(--q-text-1) leading-relaxed text-base border-t border-(--q-border)/50 mt-2",
              className
            )}
            {...props}
          >
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
