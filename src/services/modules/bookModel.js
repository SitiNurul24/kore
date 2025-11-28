import axios from 'axios'

const BASE_URL = '/api'
const FORM_ID = 'BMD'
const FORM_VERSION = '602'
const REPORT_TYPE_BLOCK = 'OPT_BMRLIST'
const BOOK_MODEL_BLOCK = 'OPT_BMHLIST'

const baseRcd = {
  mformid: FORM_ID,
  mversion: FORM_VERSION,
  formid: FORM_ID,
  form_version: FORM_VERSION,
  blockid: REPORT_TYPE_BLOCK,
  source_type: 'TABLE',
  rowfetch: 10,
  numpage: 1,
  findtext: '',
  tableid: 'IkZHTF9CTVIi',
  defwhere: 'IiI=',
  dtd: [],
  orderby: 'reptype',
  first_record: 0,
  columns: [
    { colname: 'reptype', coltype: '', formatmask: '', summary_type: '' },
    { colname: 'description', coltype: '', formatmask: '', summary_type: '' },
    { colname: 'rec_id', coltype: '', formatmask: '', summary_type: '' },
  ],
  data_source_alias: '',
  fetch_all_record: '',
  auto_commit: 1,
  persistent: 0,
}

function buildFetchFormData(srt, pid) {
  const form = new FormData()
  form.append('fnc', `fetchData;srt=${srt}`)
  form.append('unifie', srt)
  form.append('urifie', 'None')
  form.append('pid', String(pid))
  form.append('mform_id', FORM_ID)
  form.append('form_id', FORM_ID)
  form.append('form_version', FORM_VERSION)
  form.append('rcd', JSON.stringify({ ...baseRcd, pid: String(pid) }))
  return form
}

function buildCommitFormData(srt, pid, action, payload = {}) {
  const toTableData = (record) => [
    { colname: 'reptype', colval: record.reptype ?? record.code ?? '' },
    { colname: 'description', colval: record.description ?? '' },
    { colname: 'rec_id', colval: record.rec_id ?? record.recId ?? '' },
  ]

  const form = new FormData()
  form.append('fnc', `commitTxn;srt=${srt}`)
  form.append('unifie', srt)
  form.append('urifie', 'None')
  form.append('pid', String(pid))
  form.append('mform_id', FORM_ID)
  form.append('form_id', FORM_ID)
  form.append('form_version', FORM_VERSION)

  const commitPayload = [
    {
      ...baseRcd,
      pid: String(pid),
      action,
      blockid: REPORT_TYPE_BLOCK,
      tabledata: toTableData(payload),
    },
  ]

  form.append('rcd', JSON.stringify(commitPayload))
  form.append('eps', '{}')
  return form
}

function parseRows(raw) {
  if (!raw) return []
  if (Array.isArray(raw)) return raw
  if (Array.isArray(raw?.tabledata)) return raw.tabledata
  if (Array.isArray(raw?.data)) return raw.data
  if (Array.isArray(raw?.data?.tabledata)) return raw.data.tabledata
  if (typeof raw === 'object') {
    for (const key of Object.keys(raw)) {
      const value = raw[key]
      if (Array.isArray(value) && value.every((v) => typeof v === 'object')) {
        return value
      }
    }
  }
  return []
}

function mapReportTypes(rows = []) {
  return rows.map((row) => ({
    code: row.reptype ?? row.code ?? '',
    description: row.description ?? row.desc ?? '',
    rec_id: row.rec_id ?? row.recId ?? '',
  }))
}

export async function fetchReportTypes(srt) {
  if (!srt) throw new Error('Missing session token (srt)')

  const url = `${BASE_URL}/txn?fnc=fetchData;srt=${srt}`
  const form = buildFetchFormData(srt, 12)
  const res = await axios.post(url, form)
  return mapReportTypes(parseRows(res.data))
}

export async function fetchReportTypeDetails(srt) {
  if (!srt) throw new Error('Missing session token (srt)')

  const url = `${BASE_URL}/txn?fnc=fetchData;srt=${srt}`
  const form = buildFetchFormData(srt, 18)
  const res = await axios.post(url, form)
  return mapReportTypes(parseRows(res.data))
}

export async function createReportType(srt, payload) {
  const url = `${BASE_URL}/txn?fnc=commitTxn;srt=${srt}`
  const form = buildCommitFormData(srt, 18, 'insert', payload)
  const res = await axios.post(url, form)
  return res.data
}

export async function updateReportType(srt, payload) {
  const url = `${BASE_URL}/txn?fnc=commitTxn;srt=${srt}`
  const form = buildCommitFormData(srt, 18, 'update', payload)
  const res = await axios.post(url, form)
  return res.data
}

export async function deleteReportType(srt, payload) {
  const url = `${BASE_URL}/txn?fnc=commitTxn;srt=${srt}`
  const form = buildCommitFormData(srt, 18, 'delete', payload)
  const res = await axios.post(url, form)
  return res.data
}

const baseBookModelRcd = {
  mformid: FORM_ID,
  mversion: FORM_VERSION,
  formid: FORM_ID,
  form_version: FORM_VERSION,
  pid: '30',
  blockid: BOOK_MODEL_BLOCK,
  source_type: 'TABLE',
  rowfetch: 10,
  numpage: 1,
  findtext: '',
  tableid: 'IkZHTF9CTUgi',
  defwhere: 'InJlcHR5cGU9JXMi',
  dtd: ['DSB'],
  orderby: 'book_model',
  first_record: 0,
  columns: [
    { colname: 'book_model', coltype: '', formatmask: '', summary_type: '' },
    { colname: 'description', coltype: '', formatmask: '', summary_type: '' },
    { colname: 'coyflag', coltype: '', formatmask: '', summary_type: '' },
    { colname: 'bsaflag', coltype: '', formatmask: '', summary_type: '' },
    { colname: 'bscflag', coltype: '', formatmask: '', summary_type: '' },
    { colname: 't1flag', coltype: '', formatmask: '', summary_type: '' },
    { colname: 't2flag', coltype: '', formatmask: '', summary_type: '' },
    { colname: 't3flag', coltype: '', formatmask: '', summary_type: '' },
    { colname: 't4flag', coltype: '', formatmask: '', summary_type: '' },
    { colname: 't5flag', coltype: '', formatmask: '', summary_type: '' },
    { colname: 'rec_id', coltype: '', formatmask: '', summary_type: '' },
  ],
  data_source_alias: '',
  fetch_all_record: '',
  auto_commit: 1,
  persistent: 0,
}

function buildBookModelFormData(srt, reportType) {
  const form = new FormData()
  form.append('fnc', `fetchData;srt=${srt}`)
  form.append('unifie', srt)
  form.append('urifie', 'None')
  form.append('pid', '30')
  form.append('mform_id', FORM_ID)
  form.append('form_id', FORM_ID)
  form.append('form_version', FORM_VERSION)

  const defwhereValue = reportType ? btoa(`reptype='${reportType}'`) : 'IiI='

  const rcdPayload = {
    ...baseBookModelRcd,
    defwhere: defwhereValue,
    dtd: reportType ? [reportType] : [],
  }

  form.append('rcd', JSON.stringify(rcdPayload))
  return form
}

function mapBookModels(rows = []) {
  return rows.map((row, idx) => ({
    id: row.rec_id ?? row.recId ?? idx + 1,
    bookModel: row.book_model ?? row.bookModel ?? '',
    description: row.description ?? row.desc ?? '',
    reportType: row.reptype ?? row.reportType ?? '',
    chartOfAccount: row.coa ?? row.chartOfAccount ?? row['*coa'] ?? '',
    calculation: row.caltype ?? row.calculation ?? '',
    raw: row,
  }))
}

export async function fetchBookModels(srt, { reportType } = {}) {
  if (!srt) throw new Error('Missing session token (srt)')

  const url = `${BASE_URL}/txn?fnc=fetchData;srt=${srt}`
  const form = buildBookModelFormData(srt, reportType)
  const res = await axios.post(url, form)
  return mapBookModels(parseRows(res.data))
}
