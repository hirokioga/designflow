// Number and currency formatters for BOM metrics

export function formatCurrency(
  value: number | null | undefined,
  currency: string = 'USD'
): string {
  if (value === null || value === undefined) return '-'

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

export function formatWeight(
  value: number | null | undefined,
  unit: string = 'kg'
): string {
  if (value === null || value === undefined) return '-'

  return `${value.toFixed(3)} ${unit}`
}

export function formatPercentage(value: number | null | undefined): string {
  if (value === null || value === undefined) return '-'

  return `${value.toFixed(1)}%`
}

export function formatDate(dateString: string | null | undefined): string {
  if (!dateString) return '-'

  const date = new Date(dateString)
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date)
}

export function formatDateTime(dateString: string | null | undefined): string {
  if (!dateString) return '-'

  const date = new Date(dateString)
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

export function formatFileSize(sizeInMB: number | null | undefined): string {
  if (sizeInMB === null || sizeInMB === undefined) return '-'

  if (sizeInMB < 1) {
    return `${(sizeInMB * 1024).toFixed(0)} KB`
  }

  return `${sizeInMB.toFixed(1)} MB`
}
