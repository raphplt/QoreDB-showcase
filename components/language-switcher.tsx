'use client';

import { useTranslation } from 'react-i18next';
import { usePathname, useRouter } from 'next/navigation';
import { i18nConfig } from '@/i18nConfig';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { FlagFR, FlagGB } from "@/components/icons/flags";

export function LanguageSwitcher() {
  const { t, i18n } = useTranslation();
  const currentLocale = i18n.language;
  const router = useRouter();
  const currentPathname = usePathname();

  const handleChange = (newLocale: string) => {
			const days = 30;
			const date = new Date();
			date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
			const expires = date.toUTCString();
			document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires};path=/`;

			if (
				currentLocale === i18nConfig.defaultLocale &&
				!i18nConfig.prefixDefault
			) {
				router.push("/" + newLocale + currentPathname);
			} else {
				router.push(currentPathname.replace(`/${currentLocale}`, `/${newLocale}`));
			}

			router.refresh();
		};

  return (
			<DropdownMenu modal={false}>
				<DropdownMenuTrigger asChild>
					<Button
						variant="ghost"
						size="icon"
						className="w-9 h-9 flex items-center justify-center p-0"
					>
						{currentLocale === "fr" ? (
							<FlagFR className="w-6 h-4 rounded-[2px]" />
						) : (
							<FlagGB className="w-6 h-4 rounded-[2px]" />
						)}
						<span className="sr-only">{t("language_switcher.toggle")}</span>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end" className="min-w-[140px]">
					<DropdownMenuItem
						onClick={() => handleChange("fr")}
						className="flex items-center gap-3 cursor-pointer py-2"
					>
						<FlagFR className="w-6 h-4 rounded-[2px]" />
						<span className="font-medium">Français</span>
					</DropdownMenuItem>
					<DropdownMenuItem
						onClick={() => handleChange("en")}
						className="flex items-center gap-3 cursor-pointer py-2"
					>
						<FlagGB className="w-6 h-4 rounded-[2px]" />
						<span className="font-medium">English</span>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		);
}
