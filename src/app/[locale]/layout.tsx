import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { MainLayout } from '@/components/main-layout';

export default async function LocaleLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: { locale: string };
}) {
    const locale = params.locale;
    const messages = await getMessages();

    return (
        <NextIntlClientProvider locale={locale} messages={messages}>
            <MainLayout>{children}</MainLayout>
        </NextIntlClientProvider>
    );
}
