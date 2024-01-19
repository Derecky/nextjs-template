import { i18n } from '@/lib/i18n/i18n-config';
import { NextRequest, NextResponse } from 'next/server';

import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

function getLocale(req: NextRequest): string | undefined {
  const negotiatorHeaders: Record<string, string> = {};
  req.headers.forEach((key, value) => (negotiatorHeaders[key] = value));

  const locales: string[] = [...i18n.locales];
  let languages = new Negotiator({ headers: negotiatorHeaders }).languages(
    locales
  );

  const locale = matchLocale(languages, locales, i18n.defaultLocale);

  return locale;
}

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  if (pathname.startsWith('/public/')) {
    return;
  }

  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  console.log({ pathnameIsMissingLocale });
  if (pathnameIsMissingLocale) {
    const locale = getLocale(req);

    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
        req.url
      )
    );
  }
}

export const config = {
  // Matcher ignores `/_next/` and `/api/`
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|).*)']
};
