const STORAGE_KEY = 'akor:report-types'

const defaultReportTypes = [
  { code: 'DSB', description: 'Dashboard Setting' },
  { code: 'F1', description: 'Financial Report' },
  { code: 'G1', description: 'Budgeting Report' },
]

const isValidReportType = (item) =>
  item && typeof item.code === 'string' && typeof item.description === 'string'

const sanitizeReportTypes = (items) =>
  items
    .filter(isValidReportType)
    .map((item) => ({
      code: item.code.trim().toUpperCase(),
      description: item.description.trim(),
    }))
    .filter((item) => item.code && item.description)

export const loadReportTypes = () => {
  if (typeof window === 'undefined') {
    return [...defaultReportTypes]
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      return [...defaultReportTypes]
    }

    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) {
      return [...defaultReportTypes]
    }

    const sanitized = sanitizeReportTypes(parsed)

    return sanitized
  } catch (error) {
    console.warn('Failed to load report types from storage', error)
    return [...defaultReportTypes]
  }
}

export const saveReportTypes = (reportTypes) => {
  if (typeof window === 'undefined') {
    return
  }

  const sanitized = sanitizeReportTypes(Array.isArray(reportTypes) ? reportTypes : [])

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(sanitized))
}

export const getDefaultReportTypes = () => [...defaultReportTypes]
export const REPORT_TYPE_STORAGE_KEY = STORAGE_KEY
