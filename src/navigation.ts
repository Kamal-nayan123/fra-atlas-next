import {createLocalizedPathnamesNavigation} from 'next-intl/navigation';

export const locales = ['en', 'hi', 'or', 'te'] as const;

export const {Link, redirect, usePathname, useRouter} =
  createLocalizedPathnamesNavigation({locales});
