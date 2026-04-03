const CONTACT_EMAIL_PARTS = ["qoredb", "gmail.com"] as const;

export function getContactEmail() {
  return CONTACT_EMAIL_PARTS.join("@");
}

export function getContactMailtoHref() {
  return `mailto:${getContactEmail()}`;
}
