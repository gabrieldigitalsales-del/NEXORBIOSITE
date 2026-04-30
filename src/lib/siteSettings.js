export function getSetting(settings, section, key, fallback = '') {
  return settings?.[section]?.[key]?.value ?? fallback;
}

export function onlyDigits(value) {
  return String(value || '').replace(/\D/g, '');
}

export function whatsappLink(number, message = '') {
  const cleanNumber = onlyDigits(number) || '553198261608';
  const text = String(message || '').includes('%') ? message : encodeURIComponent(message || 'Ola, quero conhecer os servicos da NEXOR.');
  return `https://wa.me/${cleanNumber}?text=${text}`;
}

export function formatPhoneBR(value) {
  const digits = onlyDigits(value);
  if (digits.startsWith('55') && digits.length >= 12) {
    const ddd = digits.slice(2, 4);
    const rest = digits.slice(4);
    if (rest.length === 9) return `+55 ${ddd} ${rest.slice(0, 5)}-${rest.slice(5)}`;
    if (rest.length === 8) return `+55 ${ddd} ${rest.slice(0, 4)}-${rest.slice(4)}`;
  }
  return value || '+55 31 9826-1608';
}
