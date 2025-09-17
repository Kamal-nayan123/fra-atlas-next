import {createSharedPathnamesNavigation} from 'next-intl/navigation';

export const locales = ['en', 'hi', 'or', 'te'] as const;
export type Locale = typeof locales[number];

export const {Link, redirect, usePathname, useRouter} = createSharedPathnamesNavigation({locales});