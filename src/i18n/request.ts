import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => {
  const messages = (await import(`../messages/${locale}.json`)).default;
  return {
    messages,
    locale: locale as string // locale is guaranteed to be a string by next-intl
  };
});