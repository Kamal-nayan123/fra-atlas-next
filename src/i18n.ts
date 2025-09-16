import {getRequestConfig} from 'next-intl/server';

export default getRequestConfig(async ({locale}) => {
  // Validate that the incoming `locale` parameter is valid
  if (!['en', 'hi', 'or', 'te'].includes(locale)) {
    // This can be replaced with a more robust locale validation
    // For now, we'll just default to English
    locale = 'en';
  }

  return {
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
