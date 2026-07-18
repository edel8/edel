import type { Locale } from "./routing";

export async function getMessages(locale: Locale) {
  try {
    return (await import(`@/../messages/${locale}.json`)).default;
  } catch {
    return {};
  }
}
