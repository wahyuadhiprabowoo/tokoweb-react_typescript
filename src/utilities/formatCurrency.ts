const CURRENCY_FORMATTER = new Intl.NumberFormat("id-ID", {
  currency: "IDR",
  style: "currency",
  minimumFractionDigits: 0,
});

export function formatCurrency(number: number) {
  return CURRENCY_FORMATTER.format(number);
}
