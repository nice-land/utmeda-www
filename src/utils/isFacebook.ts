export function isFacebookApp() {
  if (typeof window === 'undefined') {
    return false;
  }

  const w = window as any;

  const ua = navigator.userAgent || navigator.vendor || w.opera;

  return ua.indexOf('FBIOS') > -1 || ua.indexOf('FBAN') > -1;
}
