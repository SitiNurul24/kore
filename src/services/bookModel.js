import axios from 'axios'

const BASE_URL = '/api'
const FORM_ID = 'BMD'
const FORM_VERSION = '602'

const BLOCKS = {
  REPORT_TYPE_LIST: 'OPT_BMRLIST',
  REPORT_TYPE_FORM: 'OPT_BMRLISTM',
  BOOK_MODEL_LIST: 'OPT_BMHLIST',
  BOOK_MODEL_HEADER: 'BMH',
  BOOK_MODEL_DETAIL: 'BMD',
  CHART_OF_ACCOUNT: 'OPT_COALIST',
}

const TABLES = {
  REPORT_TYPE: 'IkZHTF9CTVIi',
  BOOK_MODEL_HEADER: 'IkZHTF9CTUgi',
  BOOK_MODEL_DETAIL: 'IkZHTF9CTUQi',
  CHART_OF_ACCOUNT: 'IkZHTF9DT0Ei',
}

function toFormData(srt, pid, rcdPayload, fnc = 'fetchData') {
  const form = new FormData()
  form.append('fnc', `${fnc};srt=${srt}`)
  form.append('unifie', srt)
  form.append('urifie', 'None')
  form.append('pid', String(pid))
  form.append('mform_id', FORM_ID)
  form.append('form_id', FORM_ID)
  form.append('form_version', FORM_VERSION)
  form.append('rcd', JSON.stringify(rcdPayload))
  if (fnc === 'commitTxn') {
    form.append('eps', '{}')
  }
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

function buildListPayload({
  pid,
  blockid,
  tableid,
  defwhere,
  dtd = [],
  columns = [],
  orderby = '',
  rowfetch = 10,
}) {
  return {
    mformid: FORM_ID,
    mversion: FORM_VERSION,
    formid: FORM_ID,
    form_version: FORM_VERSION,
    pid: String(pid),
    blockid,
    source_type: 'TABLE',
    rowfetch,
    numpage: 1,
    findtext: '',
    tableid,
    defwhere,
    dtd,
    orderby,
    first_record: 0,
    columns,
    data_source_alias: '',
    fetch_all_record: '',
    auto_commit: 1,
    persistent: 0,
  }
}

function base64Encode(value) {
  return btoa(value)
}

export async function fetchReportTypes(srt) {
  if (!srt) throw new Error('Missing session token (srt)')
  const url = `${BASE_URL}/txn?fnc=fetchData;srt=${srt}`
  const payload = buildListPayload({
    pid: 31,
    blockid: BLOCKS.REPORT_TYPE_LIST,
    tableid: TABLES.REPORT_TYPE,
    defwhere: 'IiI=',
    orderby: 'reptype',
    columns: [
      { colname: 'reptype', coltype: '', formatmask: '', summary_type: '' },
      { colname: 'description', coltype: '', formatmask: '', summary_type: '' },
      { colname: 'rec_id', coltype: '', formatmask: '', summary_type: '' },
    ],
  })

  const res = await axios.post(url, toFormData(srt, 31, payload))
  const rows = parseRows(res.data)
  return rows.map((row) => ({
    code: row.reptype ?? '',
    description: row.description ?? '',
    rec_id: row.rec_id ?? '',
  }))
}

export async function fetchReportTypeOptions(srt) {
  const url = `${BASE_URL}/txn?fnc=fetchData;srt=${srt}`
  const payload = buildListPayload({
    pid: 31,
    blockid: BLOCKS.REPORT_TYPE_FORM,
    tableid: TABLES.REPORT_TYPE,
    defwhere: 'IiI=',
    orderby: 'reptype',
    columns: [
      { colname: 'reptype', coltype: '', formatmask: '', summary_type: '' },
      { colname: 'description', coltype: '', formatmask: '', summary_type: '' },
      { colname: 'rec_id', coltype: '', formatmask: '', summary_type: '' },
    ],
  })
  const res = await axios.post(url, toFormData(srt, 31, payload))
  return parseRows(res.data)
}

export async function fetchBookModels(srt, reportType) {
  if (!srt) throw new Error('Missing session token (srt)')
  const url = `${BASE_URL}/txn?fnc=fetchData;srt=${srt}`
  const defwhere = reportType
    ? base64Encode(`reptype='${reportType}'`)
    : 'InJlcHR5cGU9JXMi'

  const payload = buildListPayload({
    pid: 30,
    blockid: BLOCKS.BOOK_MODEL_LIST,
    tableid: TABLES.BOOK_MODEL_HEADER,
    defwhere,
    dtd: reportType ? [reportType] : ['DSB'],
    orderby: 'book_model',
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
  })

  const res = await axios.post(url, toFormData(srt, 30, payload))
  const rows = parseRows(res.data)
  return rows.map((row, idx) => ({
    id: row.rec_id ?? idx + 1,
    bookModel: row.book_model ?? '',
    description: row.description ?? '',
    reportType: reportType ?? '',
    chartOfAccount: row.coa ?? row.chartOfAccount ?? '',
    calculation: row.caltype ?? '',
    raw: row,
  }))
}

export async function fetchBookModelHeader(srt, bookModel) {
  const url = `${BASE_URL}/txn?fnc=fetchData;srt=${srt}`
  const defwhere = bookModel ? base64Encode(`book_model='${bookModel}'`) : 'IiI='
  const payload = buildListPayload({
    pid: 31,
    blockid: BLOCKS.BOOK_MODEL_HEADER,
    tableid: TABLES.BOOK_MODEL_HEADER,
    defwhere,
    dtd: bookModel ? [bookModel] : [],
    orderby: '',
    rowfetch: null,
    columns: [
      { colname: 'book_model', coltype: 'vchar', formatmask: '', summary_type: '' },
      { colname: 'coa', coltype: 'vchar', formatmask: '', summary_type: '' },
      { colname: '*coa', coltype: 'vchar', formatmask: '', summary_type: '' },
      { colname: 'reptype', coltype: 'vchar', formatmask: '', summary_type: '' },
      { colname: '*reptype', coltype: 'vchar', formatmask: '', summary_type: '' },
      { colname: 'caltype', coltype: 'vchar', formatmask: '', summary_type: '' },
      { colname: 'description', coltype: 'vchar', formatmask: '', summary_type: '' },
      { colname: 'rec_id', coltype: '', formatmask: '', summary_type: '' },
    ],
  })

  const res = await axios.post(url, toFormData(srt, 31, payload))
  const [header] = parseRows(res.data)
  if (!header) return null
  return {
    id: header.rec_id ?? '',
    bookModel: header.book_model ?? '',
    description: header.description ?? '',
    reportType: header.reptype ?? '',
    chartOfAccount: header.coa ?? '',
    calculation: header.caltype ?? '',
    rec_id: header.rec_id ?? '',
  }
}

export async function fetchBookModelDetails(srt, bookModel) {
  if (!bookModel) return []
  const url = `${BASE_URL}/txn?fnc=fetchData;srt=${srt}`
  const defwhere = base64Encode(`book_model='${bookModel}'`)
  const payload = buildListPayload({
    pid: 31,
    blockid: BLOCKS.BOOK_MODEL_DETAIL,
    tableid: TABLES.BOOK_MODEL_DETAIL,
    defwhere,
    orderby: 'line',
    rowfetch: 40,
    columns: [
      { colname: 'book_model', coltype: 'vchar', formatmask: '', summary_type: '' },
      { colname: 'line', coltype: 'vchar', formatmask: '', summary_type: '' },
      { colname: 'account', coltype: 'vchar', formatmask: '', summary_type: '' },
      { colname: 'description', coltype: 'vchar', formatmask: '', summary_type: '' },
      { colname: 'sum_lines', coltype: 'vchar', formatmask: '', summary_type: '' },
      { colname: 'formula', coltype: 'vchar', formatmask: '', summary_type: '' },
      { colname: 'ctype', coltype: 'vchar', formatmask: '', summary_type: '' },
      { colname: 'format', coltype: 'vchar', formatmask: '', summary_type: '' },
      { colname: 'display', coltype: 'vchar', formatmask: '', summary_type: '' },
      { colname: 'company', coltype: 'vchar', formatmask: '', summary_type: '' },
      { colname: 'bsa', coltype: 'vchar', formatmask: '', summary_type: '' },
      { colname: 'bsc', coltype: 'vchar', formatmask: '', summary_type: '' },
      { colname: 'text1', coltype: 'vchar', formatmask: '', summary_type: '' },
      { colname: 'text2', coltype: 'vchar', formatmask: '', summary_type: '' },
      { colname: 'text3', coltype: 'vchar', formatmask: '', summary_type: '' },
      { colname: 'text4', coltype: 'vchar', formatmask: '', summary_type: '' },
      { colname: 'text5', coltype: 'vchar', formatmask: '', summary_type: '' },
      { colname: 'rec_id', coltype: '', formatmask: '', summary_type: '' },
    ],
  })

  const res = await axios.post(url, toFormData(srt, 31, payload))
  const rows = parseRows(res.data)
  return rows.map((row) => ({
    line: row.line ?? '',
    account: row.account ?? '',
    description: row.description ?? '',
    sumLines: row.sum_lines ?? '',
    formula: row.formula ?? '',
    credit: (row.ctype ?? '').toString().toUpperCase() === 'C',
    format: row.format ?? '',
    display: row.display ?? '',
    rec_id: row.rec_id ?? '',
  }))
}

function buildCommitRecord({ action, blockid, pid, tabledata }) {
  return {
    mformid: FORM_ID,
    mversion: FORM_VERSION,
    formid: FORM_ID,
    form_version: FORM_VERSION,
    pid: String(pid),
    blockid,
    action,
    tabledata,
  }
}

export async function saveReportType(srt, payload, action = 'insert') {
  const url = `${BASE_URL}/txn?fnc=commitTxn;srt=${srt}`
  const rcd = [
    buildCommitRecord({
      action,
      blockid: BLOCKS.REPORT_TYPE_LIST,
      pid: 31,
      tabledata: [
        { colname: 'reptype', colval: payload.code ?? '' },
        { colname: 'description', colval: payload.description ?? '' },
        { colname: 'rec_id', colval: payload.rec_id ?? '' },
      ],
    }),
  ]
  const res = await axios.post(url, toFormData(srt, 31, rcd, 'commitTxn'))
  return res.data
}

export async function deleteReportType(srt, payload) {
  return saveReportType(srt, payload, 'delete')
}

export async function saveBookModel(srt, payload, action = 'insert') {
  const url = `${BASE_URL}/txn?fnc=commitTxn;srt=${srt}`
  const headerRecord = buildCommitRecord({
    action,
    blockid: BLOCKS.BOOK_MODEL_HEADER,
    pid: 31,
    tabledata: [
      { colname: 'book_model', colval: payload.bookModel ?? '' },
      { colname: 'coa', colval: payload.chartOfAccount ?? '' },
      { colname: 'reptype', colval: payload.reportType ?? '' },
      { colname: 'caltype', colval: payload.calculation ?? '' },
      { colname: 'description', colval: payload.description ?? '' },
      { colname: 'rec_id', colval: payload.rec_id ?? '' },
    ],
  })

  const detailRecords = (payload.details || []).map((detail) =>
    buildCommitRecord({
      action,
      blockid: BLOCKS.BOOK_MODEL_DETAIL,
      pid: 31,
      tabledata: [
        { colname: 'book_model', colval: payload.bookModel ?? '' },
        { colname: 'line', colval: detail.line ?? '' },
        { colname: 'account', colval: detail.account ?? '' },
        { colname: 'description', colval: detail.description ?? '' },
        { colname: 'sum_lines', colval: detail.sumLines ?? '' },
        { colname: 'formula', colval: detail.formula ?? '' },
        { colname: 'ctype', colval: detail.credit ? 'C' : 'D' },
        { colname: 'format', colval: detail.format ?? '' },
        { colname: 'display', colval: detail.display ?? '' },
        { colname: 'rec_id', colval: detail.rec_id ?? '' },
      ],
    })
  )

  const rcd = [headerRecord, ...detailRecords]
  const res = await axios.post(url, toFormData(srt, 31, rcd, 'commitTxn'))
  return res.data
}

export async function deleteBookModel(srt, payload) {
  return saveBookModel(srt, payload, 'delete')
}

export async function fetchChartOfAccounts(srt) {
  const url = `${BASE_URL}/txn?fnc=fetchData;srt=${srt}`
  const payload = buildListPayload({
    pid: 31,
    blockid: BLOCKS.CHART_OF_ACCOUNT,
    tableid: TABLES.CHART_OF_ACCOUNT,
    defwhere: 'IiI=',
    orderby: 'coa',
    columns: [
      { colname: 'coa', coltype: '', formatmask: '', summary_type: '' },
      { colname: 'coa_name', coltype: '', formatmask: '', summary_type: '' },
      { colname: 'rec_id', coltype: '', formatmask: '', summary_type: '' },
    ],
  })

  const res = await axios.post(url, toFormData(srt, 31, payload))
  const rows = parseRows(res.data)
  return rows.map((row) => ({
    code: row.coa ?? '',
    name: row.coa_name ?? '',
    rec_id: row.rec_id ?? '',
  }))
}

export default {
  fetchReportTypes,
  fetchBookModels,
  fetchBookModelHeader,
  fetchBookModelDetails,
  saveBookModel,
  deleteBookModel,
  saveReportType,
  deleteReportType,
  fetchChartOfAccounts,
  fetchReportTypeOptions,
}
