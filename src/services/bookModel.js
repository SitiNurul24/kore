import axios from "axios"

const BASE_URL = "/api" // samakan dengan PinjamanService

// WHY: validasi wajib agar request tidak diam-diam salah kredensial.
function requireSrt(srt) {
  const v = srt || localStorage.getItem("srt")
  if (!v) throw new Error("srt value not found in localStorage")
  return v
}
function requirePid(pid) {
  const v = pid || localStorage.getItem("pid")
  if (!v) throw new Error("pid value not found in localStorage")
  return v
}
function form(entries) {
  const f = new FormData()
  entries.forEach(([k, v]) => f.append(k, v))
  return f
}
async function _post(url, data) {
  const res = await axios.post(url, data)
  return res.data
}
function _unwrap(data) {
  const root = data?.data ?? data
  const td = root?.tabledata ?? root?.items ?? root?.data ?? []
  return Array.isArray(td) ? td : td ? [td] : []
}

/** ====== Konstanta dari dokumen API ====== */
const MFORM = { mform_id: "BMD", form_id: "BMD", version: "602" }

// TABLE IDs (untuk commit) – asumsi berdasarkan tableid fetch
const TABLES = {
  REPORT_TYPE: "FGL_BMR",
  HEADER: "FGL_BMH",
  DETAIL: "FGL_BMD",
}

// BlockId (untuk commit) – diset agar jelas hierarki HDR/DTL
const BLOCKS = {
  REPORT_TYPE: "BMR",
  HEADER: "BMH",
  DETAIL: "BMD",
}

/** ====== FETCH: REPORT TYPE ====== */
export async function getReportTypes(srt) {
  const _srt = requireSrt(srt)
  const url = `${BASE_URL}/txn?fnc=fetchData;srt=${_srt}`
  const f = form([
    ["fnc", `fetchData;srt=${_srt}`],
    ["unifie", _srt],
    ["urifie", "None"],
    ["pid", "31"],
    ["mform_id", MFORM.mform_id],
    ["form_id", MFORM.form_id],
    ["form_version", MFORM.version],
    [
      "rcd",
      JSON.stringify({
        mformid: MFORM.mform_id,
        mversion: MFORM.version,
        formid: MFORM.form_id,
        form_version: MFORM.version,
        pid: "31",
        blockid: "OPT_BMRLIST",
        source_type: "TABLE",
        rowfetch: 200,
        numpage: 1,
        findtext: "",
        tableid: "IkZHTF9CTVIi",
        defwhere: '""',
        dtd: [],
        orderby: "reptype",
        first_record: 0,
        columns: [
          { colname: "reptype", coltype: "", formatmask: "", summary_type: "" },
          { colname: "description", coltype: "", formatmask: "", summary_type: "" },
          { colname: "rec_id", coltype: "", formatmask: "", summary_type: "" },
        ],
        data_source_alias: "",
        fetch_all_record: "",
        auto_commit: 1,
        persistent: 0,
      }),
    ],
  ])
  const data = await _post(url, f)
  return _unwrap(data).map((r) => ({
    reptype: String(r.reptype || "").trim(),
    description: String(r.description || "").trim(),
    rec_id: String(r.rec_id || "").trim(),
  }))
}

/** ====== MUTATION: REPORT TYPE ======
 * txn: "new" | "chg" | "del"
 */
export async function createReportType({ reptype, description }, srt, pid) {
  const _srt = requireSrt(srt)
  const _pid = requirePid(pid)
  const url = `${BASE_URL}/txn?fnc=commitTxn;srt=${_srt}`
  const blocks = [
    {
      formid: MFORM.form_id,
      form_version: MFORM.version,
      blockid: BLOCKS.REPORT_TYPE,
      master_blockid: "",
      txn: "new",
      table_id: TABLES.REPORT_TYPE,
      source_type: "TABLE",
      rid: "",
      tid: 0,
      tabledata: [
        { colname: "reptype", colval: reptype, coltype: "vchar", formatmask: "" },
        { colname: "description", colval: description, coltype: "vchar", formatmask: "" },
      ],
    },
  ]
  const f = form([
    ["fnc", `commitTxn;srt=${_srt}`],
    ["unifie", _srt],
    ["urifie", "None"],
    ["mform_id", MFORM.mform_id],
    ["form_id", MFORM.form_id],
    ["form_version", MFORM.version],
    ["pid", String(_pid)],
    ["rcd", JSON.stringify(blocks)],
    ["eps", "{}"],
  ])
  return _post(url, f)
}

export async function deleteReportType({ rec_id }, srt, pid) {
  const _srt = requireSrt(srt)
  const _pid = requirePid(pid)
  const url = `${BASE_URL}/txn?fnc=commitTxn;srt=${_srt}`
  const blocks = [
    {
      formid: MFORM.form_id,
      form_version: MFORM.version,
      blockid: BLOCKS.REPORT_TYPE,
      master_blockid: "",
      txn: "del",
      table_id: TABLES.REPORT_TYPE,
      source_type: "TABLE",
      rid: String(rec_id || ""),
      tid: 0,
      tabledata: [],
    },
  ]
  const f = form([
    ["fnc", `commitTxn;srt=${_srt}`],
    ["unifie", _srt],
    ["urifie", "None"],
    ["mform_id", MFORM.mform_id],
    ["form_id", MFORM.form_id],
    ["form_version", MFORM.version],
    ["pid", String(_pid)],
    ["rcd", JSON.stringify(blocks)],
    ["eps", "{}"],
  ])
  return _post(url, f)
}

/** ====== FETCH: BOOK MODEL LIST BY REPORT TYPE ====== */
export async function getBookModelsByReportType(reptype, srt) {
  const _srt = requireSrt(srt)
  const url = `${BASE_URL}/txn?fnc=fetchData;srt=${_srt}`
  const f = form([
    ["fnc", `fetchData;srt=${_srt}`],
    ["unifie", _srt],
    ["urifie", "None"],
    ["pid", "30"],
    ["mform_id", MFORM.mform_id],
    ["form_id", MFORM.form_id],
    ["form_version", MFORM.version],
    [
      "rcd",
      JSON.stringify({
        mformid: MFORM.mform_id,
        mversion: MFORM.version,
        formid: MFORM.form_id,
        form_version: MFORM.version,
        pid: "30",
        blockid: "OPT_BMHLIST",
        source_type: "TABLE",
        rowfetch: 200,
        numpage: 1,
        findtext: "",
        tableid: "IkZHTF9CTUgi",
        defwhere: "InJlcHR5cGU9JXMi",
        dtd: [String(reptype || "")],
        orderby: "book_model",
        first_record: 0,
        columns: [
          { colname: "book_model", coltype: "", formatmask: "", summary_type: "" },
          { colname: "description", coltype: "", formatmask: "", summary_type: "" },
          { colname: "coyflag", coltype: "", formatmask: "", summary_type: "" },
          { colname: "bsaflag", coltype: "", formatmask: "", summary_type: "" },
          { colname: "bscflag", coltype: "", formatmask: "", summary_type: "" },
          { colname: "t1flag", coltype: "", formatmask: "", summary_type: "" },
          { colname: "t2flag", coltype: "", formatmask: "", summary_type: "" },
          { colname: "t3flag", coltype: "", formatmask: "", summary_type: "" },
          { colname: "t4flag", coltype: "", formatmask: "", summary_type: "" },
          { colname: "t5flag", coltype: "", formatmask: "", summary_type: "" },
          { colname: "rec_id", coltype: "", formatmask: "", summary_type: "" },
        ],
        data_source_alias: "",
        fetch_all_record: "",
        auto_commit: 1,
        persistent: 0,
      }),
    ],
  ])
  const data = await _post(url, f)
  return _unwrap(data).map((r) => ({
    book_model: String(r.book_model || "").trim(),
    description: String(r.description || "").trim(),
    rec_id: String(r.rec_id || "").trim(),
  }))
}

/** ====== FETCH: BOOK MODEL HEADER (BMH) ====== */
export async function getBookModelHeader(book_model, srt) {
  const _srt = requireSrt(srt)
  const url = `${BASE_URL}/txn?fnc=fetchData;srt=${_srt}`
  const f = form([
    ["fnc", `fetchData;srt=${_srt}`],
    ["unifie", _srt],
    ["urifie", "None"],
    ["pid", "31"],
    ["mform_id", MFORM.mform_id],
    ["form_id", MFORM.form_id],
    ["form_version", MFORM.version],
    [
      "rcd",
      JSON.stringify({
        mformid: MFORM.mform_id,
        mversion: MFORM.version,
        formid: MFORM.form_id,
        form_version: MFORM.version,
        pid: "31",
        blockid: "BMH",
        source_type: "TABLE",
        rowfetch: null,
        numpage: 1,
        findtext: "",
        tableid: "IkZHTF9CTUgi",
        defwhere: "ImJvb2tfbW9kZWw9JXMi",
        dtd: [String(book_model || "")],
        orderby: "",
        first_record: 0,
        columns: [
          { colname: "book_model", coltype: "vchar", formatmask: "", summary_type: "" },
          { colname: "coa", coltype: "vchar", formatmask: "", summary_type: "" },
          { colname: "*coa", coltype: "vchar", formatmask: "", summary_type: "" },
          { colname: "reptype", coltype: "vchar", formatmask: "", summary_type: "" },
          { colname: "*reptype", coltype: "vchar", formatmask: "", summary_type: "" },
          { colname: "caltype", coltype: "vchar", formatmask: "", summary_type: "" },
          { colname: "description", coltype: "vchar", formatmask: "", summary_type: "" },
          { colname: "rec_id", coltype: "", formatmask: "", summary_type: "" },
        ],
        data_source_alias: "",
        fetch_all_record: "",
        auto_commit: 1,
        persistent: 0,
      }),
    ],
  ])
  const data = await _post(url, f)
  const [r] = _unwrap(data)
  if (!r) return null
  return {
    book_model: String(r.book_model || "").trim(),
    coa: String(r.coa || "").trim(),
    reptype: String(r.reptype || "").trim(),
    caltype: String(r.caltype || "").trim(),
    description: String(r.description || "").trim(),
    rec_id: String(r.rec_id || "").trim(),
  }
}

/** ====== FETCH: BOOK MODEL DETAILS (BMD) ====== */
export async function getBookModelDetails(book_model, srt) {
  const _srt = requireSrt(srt)
  const url = `${BASE_URL}/txn?fnc=fetchData;srt=${_srt}`
  const f = form([
    ["fnc", `fetchData;srt=${_srt}`],
    ["unifie", _srt],
    ["urifie", "None"],
    ["pid", "31"],
    ["mform_id", MFORM.mform_id],
    ["form_id", MFORM.form_id],
    ["form_version", MFORM.version],
    [
      "rcd",
      JSON.stringify({
        mformid: MFORM.mform_id,
        mversion: MFORM.version,
        formid: MFORM.form_id,
        form_version: MFORM.version,
        pid: "31",
        blockid: "BMD",
        source_type: "TABLE",
        rowfetch: 500,
        numpage: 1,
        findtext: "",
        tableid: "IkZHTF9CTUQi",
        defwhere: "ImJvb2tfbW9kZWw9JXMi",
        dtd: [String(book_model || "")],
        orderby: "line",
        first_record: 0,
        columns: [
          { colname: "book_model", coltype: "vchar", formatmask: "", summary_type: "" },
          { colname: "line", coltype: "vchar", formatmask: "", summary_type: "" },
          { colname: "account", coltype: "vchar", formatmask: "", summary_type: "" },
          { colname: "description", coltype: "vchar", formatmask: "", summary_type: "" },
          { colname: "sum_lines", coltype: "vchar", formatmask: "", summary_type: "" },
          { colname: "formula", coltype: "vchar", formatmask: "", summary_type: "" },
          { colname: "ctype", coltype: "vchar", formatmask: "", summary_type: "" },
          { colname: "format", coltype: "vchar", formatmask: "", summary_type: "" },
          { colname: "display", coltype: "vchar", formatmask: "", summary_type: "" },
          { colname: "rec_id", coltype: "", formatmask: "", summary_type: "" },
        ],
        data_source_alias: "",
        fetch_all_record: "",
        auto_commit: 1,
        persistent: 0,
      }),
    ],
  ])
  const data = await _post(url, f)
  return _unwrap(data).map((r) => ({
    rid: String(r.rec_id || "").trim(),
    line: String(r.line || "").trim(),
    account: String(r.account || "").trim(),
    description: String(r.description || "").trim(),
    sumLines: String(r.sum_lines || "").trim(),
    formula: String(r.formula || "").trim(),
    credit: String(r.ctype || "").trim().toUpperCase() === "CR",
    format: String(r.format || "").trim(),
    display: String(r.display || "").trim(),
  }))
}

/** ====== MUTATION: BOOK MODEL (HDR + DTL) ======
 * header: { book_model, reptype, caltype, coa, description, rid? }
 * details: [{ line, account, description, sumLines, formula, credit, format, display, rid? }]
 * deletedDetailRids: string[]
 */
export async function saveBookModel({ header, details, deletedDetailRids = [] }, srt, pid) {
  const _srt = requireSrt(srt)
  const _pid = requirePid(pid)
  const url = `${BASE_URL}/txn?fnc=commitTxn;srt=${_srt}`

  const hdrTxn = header?.rid ? "chg" : "new"
  const blocks = [
    {
      formid: MFORM.form_id,
      form_version: MFORM.version,
      blockid: BLOCKS.HEADER,
      master_blockid: "",
      txn: hdrTxn,
      table_id: TABLES.HEADER,
      source_type: "TABLE",
      rid: String(header?.rid || ""),
      tid: 0,
      tabledata: [
        { colname: "book_model", colval: header.book_model, coltype: "vchar", formatmask: "" },
        { colname: "reptype", colval: header.reptype, coltype: "vchar", formatmask: "" },
        { colname: "coa", colval: header.coa, coltype: "vchar", formatmask: "" },
        { colname: "caltype", colval: header.caltype, coltype: "vchar", formatmask: "" },
        { colname: "description", colval: header.description, coltype: "vchar", formatmask: "" },
      ],
    },
    // NEW/CHG details
    ...(details || []).map((d, idx) => ({
      formid: MFORM.form_id,
      form_version: MFORM.version,
      blockid: BLOCKS.DETAIL,
      master_blockid: BLOCKS.HEADER,
      txn: d.rid ? "chg" : "new",
      table_id: TABLES.DETAIL,
      source_type: "TABLE",
      rid: String(d.rid || ""),
      tid: idx + 1,
      tabledata: [
        { colname: "book_model", colval: header.book_model, coltype: "vchar", formatmask: "" },
        { colname: "line", colval: d.line || "", coltype: "vchar", formatmask: "" },
        { colname: "account", colval: d.account || "", coltype: "vchar", formatmask: "" },
        { colname: "description", colval: d.description || "", coltype: "vchar", formatmask: "" },
        { colname: "sum_lines", colval: d.sumLines || "", coltype: "vchar", formatmask: "" },
        { colname: "formula", colval: d.formula || "", coltype: "vchar", formatmask: "" },
        { colname: "ctype", colval: d.credit ? "CR" : "DR", coltype: "vchar", formatmask: "" },
        { colname: "format", colval: d.format || "", coltype: "vchar", formatmask: "" },
        { colname: "display", colval: d.display || "", coltype: "vchar", formatmask: "" },
      ],
    })),
    // DEL details
    ...(deletedDetailRids || []).map((rid, i) => ({
      formid: MFORM.form_id,
      form_version: MFORM.version,
      blockid: BLOCKS.DETAIL,
      master_blockid: BLOCKS.HEADER,
      txn: "del",
      table_id: TABLES.DETAIL,
      source_type: "TABLE",
      rid: String(rid || ""),
      tid: (details?.length || 0) + i + 1,
      tabledata: [],
    })),
  ]

  const f = form([
    ["fnc", `commitTxn;srt=${_srt}`],
    ["unifie", _srt],
    ["urifie", "None"],
    ["mform_id", MFORM.mform_id],
    ["form_id", MFORM.form_id],
    ["form_version", MFORM.version],
    ["pid", String(_pid)],
    ["rcd", JSON.stringify(blocks)],
    ["eps", "{}"],
  ])
  return _post(url, f)
}

export async function deleteBookModel({ headerRid }, srt, pid) {
  const _srt = requireSrt(srt)
  const _pid = requirePid(pid)
  const url = `${BASE_URL}/txn?fnc=commitTxn;srt=${_srt}`
  const blocks = [
    {
      formid: MFORM.form_id,
      form_version: MFORM.version,
      blockid: BLOCKS.HEADER,
      master_blockid: "",
      txn: "del",
      table_id: TABLES.HEADER,
      source_type: "TABLE",
      rid: String(headerRid || ""),
      tid: 0,
      tabledata: [],
    },
  ]
  const f = form([
    ["fnc", `commitTxn;srt=${_srt}`],
    ["unifie", _srt],
    ["urifie", "None"],
    ["mform_id", MFORM.mform_id],
    ["form_id", MFORM.form_id],
    ["form_version", MFORM.version],
    ["pid", String(_pid)],
    ["rcd", JSON.stringify(blocks)],
    ["eps", "{}"],
  ])
  return _post(url, f)
}

/** ====== Optional: COA list (dropdown) ====== */
export async function getCoaList(srt) {
  const _srt = requireSrt(srt)
  const url = `${BASE_URL}/txn?fnc=fetchData;srt=${_srt}`
  const f = form([
    ["fnc", `fetchData;srt=${_srt}`],
    ["unifie", _srt],
    ["urifie", "None"],
    ["pid", "31"],
    ["mform_id", MFORM.mform_id],
    ["form_id", MFORM.form_id],
    ["form_version", MFORM.version],
    [
      "rcd",
      JSON.stringify({
        mformid: MFORM.mform_id,
        mversion: MFORM.version,
        formid: MFORM.form_id,
        form_version: MFORM.version,
        pid: "31",
        blockid: "OPT_COALIST",
        source_type: "TABLE",
        rowfetch: 200,
        numpage: 1,
        findtext: "",
        tableid: "IkZHTF9DT0Ei",
        defwhere: '""',
        dtd: [],
        orderby: "coa",
        first_record: 0,
        columns: [
          { colname: "coa", coltype: "", formatmask: "", summary_type: "" },
          { colname: "coa_name", coltype: "", formatmask: "", summary_type: "" },
          { colname: "rec_id", coltype: "", formatmask: "", summary_type: "" },
        ],
        data_source_alias: "",
        fetch_all_record: "",
        auto_commit: 1,
        persistent: 0,
      }),
    ],
  ])
  const data = await _post(url, f)
  return _unwrap(data).map((r) => ({
    coa: String(r.coa || "").trim(),
    name: String(r.coa_name || "").trim(),
  }))
}
