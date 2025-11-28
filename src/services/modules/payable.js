import axios from 'axios'

// API url provided by the product team (example:
// https://app.gcgakor.id/odmform?srt=<token>;fnc=run;formid=mainpanel)
export const PAYABLE_FORM_ID = 'mainpanel'
export const PAYABLE_SRT = '62bf565ab57743695973ce086ebe03ac82139588c39111f08fe3b633f9e1c848'
export const PAYABLE_BASE_URL = 'https://app.gcgakor.id/odmform'

// Fallback data
const FALLBACK_PAYABLES_RAW = [
  {
    doc_no: '15000000134',
    doc_ref: '51000000188-KEU',
    doc_date: '30-11-2024',
    supplier: 'EMP',
    local_amount: 13971636,
    company: '1000',
    description: 'Payroll process - MLY:KEU:GEN:2024-11',
    status: 'Unpaid',
  },
  {
    doc_no: '15000000133',
    doc_ref: '51000000188-SIMP',
    doc_date: '30-11-2024',
    supplier: 'EMP',
    local_amount: 4466800,
    company: '1000',
    description: 'Payroll process - MLY:SIMP:GEN:2024-11',
    status: 'Unpaid',
  },
  {
    doc_no: '15000000132',
    doc_ref: '41000000034',
    doc_date: '07-10-2024',
    supplier: 'OTS',
    local_amount: 122100000,
    company: '1000',
    description: 'Pembelian barang',
    status: 'Paid',
  },
]

// Axios instance
const api = axios.create({
  timeout: 20000,
  headers: {
    Accept: 'application/json, text/plain, */*',
  },
})

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response) err.friendlyMessage = `API error (${err.response.status})`
    else if (err.request) err.friendlyMessage = 'Tidak ada respons dari server (CORS/jaringan)'
    else err.friendlyMessage = `Request error: ${err.message}`
    return Promise.reject(err)
  },
)

// Fetch payable list using odmform run endpoint
export async function fetchPayableListRunLib({ srt = PAYABLE_SRT, page = 1, pageSize = -1, search = '' } = {}) {
  if (!srt) throw new Error('Missing session token (srt)')

  // Keep the parameter order identical to the provided sample URL to reduce the
  // chance of backend parsing errors.
  const url = `${PAYABLE_BASE_URL}?srt=${encodeURIComponent(srt)};fnc=run;formid=${encodeURIComponent(PAYABLE_FORM_ID)}`

  let rowsRaw
  let useFallback = false

  try {
    const res = await api.get(url, { responseType: 'text' })
    const parsed = parseDynamicPayload(res.data)
    rowsRaw = extractRowsPayload(parsed)
  } catch (err) {
    console.warn('fetchPayableListRunLib: fallback digunakan.', err)
    rowsRaw = FALLBACK_PAYABLES_RAW
    useFallback = true
  }

  if (!Array.isArray(rowsRaw) || rowsRaw.length === 0) {
    rowsRaw = FALLBACK_PAYABLES_RAW
    useFallback = true
  }

  const mapped = rowsRaw.map(normalizeRow)
  const filtered = filterClient(mapped, search)

  const paged =
    pageSize && pageSize > 0
      ? filtered.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize)
      : filtered

  if (useFallback) Object.defineProperty(paged, '__fallback', { value: true, enumerable: false })
  return paged
}

// Helpers
function parseDynamicPayload(raw) {
  if (!raw) return {}
  if (typeof raw === 'object') return raw
  if (typeof raw !== 'string') return {}

  try {
    return JSON.parse(raw)
  } catch (e) {
    // Some responses might wrap JSON in HTML or other strings; try to extract the first JSON-like block.
    const firstBrace = raw.indexOf('{')
    const lastBrace = raw.lastIndexOf('}')
    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
      const sliced = raw.slice(firstBrace, lastBrace + 1)
      try {
        return JSON.parse(sliced)
      } catch (err) {
        console.warn('Unable to parse JSON payload from response string.', err)
      }
    }
  }

  return {}
}

function extractRowsPayload(d) {
  if (!d) return []
  if (Array.isArray(d)) return d
  if (Array.isArray(d?.data)) return d.data
  if (Array.isArray(d?.rows)) return d.rows
  if (Array.isArray(d?.tabledata)) return d.tabledata
  if (Array.isArray(d?.data?.tabledata)) return d.data.tabledata
  if (typeof d === 'object') {
    for (const k of Object.keys(d)) {
      const v = d[k]
      if (Array.isArray(v) && v.every((x) => typeof x === 'object')) return v
    }
  }
  return []
}

function normalizeRow(it = {}) {
  const docNo = pickString(it, ['recId', 'rec_id', 'recordId', 'record_id', 'docNo', 'doc_no', 'document_no', 'no'])
  const docRef = pickString(it, ['docRef', 'doc_ref', 'reference', 'ref'])
  const rawDate = pickString(it, ['docDate', 'doc_date', 'date'])
  const supplier = pickString(it, ['supplier', 'vendor', 'sup', 'vendorName', 'vendor_name'])
  const company = pickString(it, ['company', 'company_code', 'companyCode'])
  const description = pickString(it, ['description', 'remark', 'desc', 'text'])
  const status =
    pickString(it, ['status', 'payment_status', 'paymentStatus']) ||
    (description?.toLowerCase().includes('pembelian') ? 'Paid' : 'Unpaid')

  const currency = pickString(it, ['currency', 'curr', 'curr_code'])
  const businessArea = pickString(it, ['businessArea', 'business_area', 'ba'])
  const postingDate = pickString(it, ['postingDate', 'posting_date'])
  const payableAcc = pickString(it, ['payableAcc', 'payable_account', 'accountPayable'])
  const paymentAccount = pickString(it, ['paymentAccount', 'payment_account', 'bankAccount', 'bank_account'])
  const additionalInfoText = pickString(it, ['additionalInfoText', 'additionalInfo', 'notes', 'note'])

  const docDateDisplay = formatDdmmyyyy(rawDate)
  const postingDateDisplay = formatDdmmyyyy(postingDate)

  const localAmount = parseNumber(it.localAmount ?? it.local_amount ?? it.amount ?? it.total)
  const paidAmount = parseNumber(it.paidAmount ?? it.paid_amount ?? it.paid)

  const details = Array.isArray(it.detailPayable ?? it.details ?? it.lines)
    ? normalizeDetailRows(it.detailPayable ?? it.details ?? it.lines)
    : []

  return {
    recId: docNo,
    docNo,
    docRef,
    docDate: rawDate,
    docDateDisplay,
    supplier,
    localAmount,
    company,
    description,
    status,
    currency,
    businessArea,
    postingDate: postingDateDisplay || postingDate,
    payableAcc,
    paymentAccount,
    paidAmount,
    additionalInfoText,
    additionalInfoRows: details,
  }
}

function formatDdmmyyyy(d) {
  if (!d) return ''
  const s = String(d).trim()
  const m1 = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s)
  if (m1) return `${m1[3]}-${m1[2]}-${m1[1]}`
  const m2 = /^(\d{2})-(\d{2})-(\d{4})$/.exec(s)
  if (m2) return s
  const date = new Date(s)
  if (!isNaN(date)) {
    const dd = `${date.getDate()}`.padStart(2, '0')
    const mm = `${date.getMonth() + 1}`.padStart(2, '0')
    const yy = date.getFullYear()
    return `${dd}-${mm}-${yy}`
  }
  return s
}

function filterClient(rows, search) {
  if (!search) return rows
  const s = search.toLowerCase()
  return rows.filter((r) =>
    [r.docNo, r.docRef, r.docDateDisplay, r.supplier, r.company, r.description, r.status]
      .map((v) => (v ? String(v).toLowerCase() : ''))
      .some((v) => v.includes(s)),
  )
}

function parseNumber(raw) {
  if (raw === undefined || raw === null || raw === '') return 0
  if (typeof raw === 'number') return raw
  const cleaned = String(raw).replace(/[^\d,-]/g, '').replace(',', '.')
  const n = Number(cleaned)
  return Number.isFinite(n) ? n : 0
}

function pickString(obj, keys = []) {
  for (const key of keys) {
    if (obj[key] !== undefined && obj[key] !== null && obj[key] !== '') return String(obj[key])
  }
  return ''
}

function normalizeDetailRows(rows) {
  return rows.map((item, idx) => ({
    id: item?.id ?? item?.recId ?? item?.rec_id ?? idx,
    account: pickString(item ?? {}, ['account', 'accountNumber', 'account_number', 'acc']),
    accountName: pickString(item ?? {}, ['accountName', 'account_name', 'name', 'accName']),
    dc: pickString(item ?? {}, ['dc', 'debitCredit', 'debit_credit', 'type']),
    amount: parseNumber(item?.amount ?? item?.value ?? item?.nominal),
    description: pickString(item ?? {}, ['description', 'note', 'text']),
  }))
}
