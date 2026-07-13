export function formatCurrency(value: number) {
  return value.toFixed(2);
}

export function formatDate(date: Date) {
  return date.toISOString();
}
