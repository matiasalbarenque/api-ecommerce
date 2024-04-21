export const priceFormatting = (p, fractionDigits = 2) => {
  if (p === null || Number.isNaN(Number(p))) {
    throw new Error();
  }
  // Si el número tiene decimales lo forzamos que siempre represente 2 dígitos
  const options =
    Number(p) % 1 !== 0 ? { minimumFractionDigits: fractionDigits, maximumFractionDigits: fractionDigits } : {};
  return Number(p).toLocaleString('de-DE', options);
};
