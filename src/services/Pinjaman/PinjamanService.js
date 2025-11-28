import con from '@/constants'
import axios from 'axios'

const BASE_URL = '/api'

class PinjamanService {
  async getPinjamanList() {
    const srtValue = localStorage.getItem('srt')

    if (!srtValue) {
      throw new Error('srt value not found in localStorage')
    }

    const url = `${BASE_URL}/txn?fnc=fetchData;srt=${srtValue}`
    try {
      const form = new FormData()
      form.append('fnc', `fetchData;srt=${srtValue}`)
      form.append('unifie', srtValue)
      form.append('urifie', 'None')
      form.append('pid', '20')
      form.append('mform_id', 'PJM')
      form.append('form_id', 'ZKOPPJM')
      form.append('form_version', '607')
      form.append(
        'rcd',
        '{"mformid":"PJM","mversion":"0","formid":"ZKOPPJM","form_version":"607","pid":"20","blockid":"LONLIST","source_type":"FUNCTION","rowfetch":20,"numpage":1,"findtext":"","tableid":"ImRhdC5sb2FubGlzdCI=","defwhere":"e30=","dtd":[],"orderby":"","first_record":0,"columns":[{"colname":"doc_num","coltype":"vchar","formatmask":"","summary_type":""},{"colname":"mbr_mbrid","coltype":"vchar","formatmask":"","summary_type":""},{"colname":"mbr_name","coltype":"vchar","formatmask":"","summary_type":""},{"colname":"date_cair","coltype":"date","formatmask":"","summary_type":""},{"colname":"amount","coltype":"number","formatmask":"{:,.0f}","summary_type":""},{"colname":"term","coltype":"number","formatmask":"","summary_type":""},{"colname":"sisa_tenor","coltype":"number","formatmask":"","summary_type":""},{"colname":"int_type","coltype":"vchar","formatmask":"","summary_type":""},{"colname":"interest","coltype":"number","formatmask":"{:,.2f}","summary_type":""},{"colname":"loan_code","coltype":"vchar","formatmask":"","summary_type":""},{"colname":"loan_name","coltype":"vchar","formatmask":"","summary_type":""},{"colname":"pokok","coltype":"number","formatmask":"{:,.0f}","summary_type":""},{"colname":"jasa","coltype":"number","formatmask":"{:,.0f}","summary_type":""},{"colname":"instal","coltype":"number","formatmask":"{:,.0f}","summary_type":""},{"colname":"remain","coltype":"vchar","formatmask":"{:,.0f}","summary_type":""},{"colname":"accum","coltype":"number","formatmask":"{:,.0f}","summary_type":""},{"colname":"outpok","coltype":"vchar","formatmask":"{:,.0f}","summary_type":""},{"colname":"outjasa","coltype":"vchar","formatmask":"{:,.0f}","summary_type":""},{"colname":"tot_am","coltype":"number","formatmask":"{:,.0f}","summary_type":""},{"colname":"status","coltype":"vchar","formatmask":"","summary_type":""},{"colname":"apr","coltype":"vchar","formatmask":"","summary_type":""},{"colname":"rec_id","coltype":"","formatmask":"","summary_type":""}],"data_source_alias":"","fetch_all_record":"","auto_commit":1,"persistent":0}',
      )

      const res = await axios.post(url, form)
      return res.data
    } catch (error) {
      throw new Error('Error fetching pinjaman list: ' + error.message)
    }
  }

  async getPinjamanDetail(id) {
    const srtValue = localStorage.getItem('srt')

    if (!srtValue) {
      throw new Error('srt value not found in localStorage')
    }

    const url = `${BASE_URL}/txn?fnc=fetchData;srt=${srtValue}`
    try {
      const form = new FormData()
      form.append('fnc', `fetchData;srt=${srtValue}`)
      form.append('unifie', `${srtValue}`)
      form.append('urifie', 'None')
      form.append('pid', '23')
      form.append('mform_id', 'PJM')
      form.append('form_id', 'ZKOPPJM')
      form.append('form_version', '607')
      form.append(
        'rcd',
        '{"mformid":"PJM","mversion":"0","formid":"ZKOPPJM","form_version":"607","pid":"23","blockid":"LON","source_type":"TABLE","rowfetch":null,"numpage":1,"findtext":"","tableid":"Im1icl9sb24i","defwhere":"ImRvY19udW0gPSAnNTUwMDAwMDA4MzInIg==","dtd":[],"orderby":"","first_record":0,"columns":[{"colname":"mbr_company","coltype":"vchar","formatmask":"","summary_type":""},{"colname":"mbr_mbrid","coltype":"vchar","formatmask":"","summary_type":""},{"colname":"*mbr_mbrid","coltype":"vchar","formatmask":"","summary_type":""},{"colname":"*name","coltype":"vchar","formatmask":"","summary_type":""},{"colname":"date_cair","coltype":"date","formatmask":"","summary_type":""},{"colname":"loan_code","coltype":"vchar","formatmask":"","summary_type":""},{"colname":"*loan_code","coltype":"vchar","formatmask":"","summary_type":""},{"colname":"pay_type","coltype":"vchar","formatmask":"","summary_type":""},{"colname":"amount","coltype":"number","formatmask":"{:,.0f}","summary_type":""},{"colname":"term","coltype":"number","formatmask":"","summary_type":""},{"colname":"plafon_am","coltype":"number","formatmask":"{:,.0f}","summary_type":""},{"colname":"*pokok","coltype":"number","formatmask":"{:,.2f}","summary_type":""},{"colname":"interest","coltype":"number","formatmask":"{:,.2f}","summary_type":""},{"colname":"int_am","coltype":"number","formatmask":"{:,.2f}","summary_type":""},{"colname":"inct_code","coltype":"vchar","formatmask":"","summary_type":""},{"colname":"int_adm","coltype":"number","formatmask":"{:,.2f}","summary_type":""},{"colname":"am_adm","coltype":"number","formatmask":"{:,.2f}","summary_type":""},{"colname":"tot_am","coltype":"number","formatmask":"{:,.0f}","summary_type":""},{"colname":"curency","coltype":"vchar","formatmask":"","summary_type":""},{"colname":"instal","coltype":"number","formatmask":"{:,.0f}","summary_type":""},{"colname":"accum","coltype":"vchar","formatmask":"","summary_type":""},{"colname":"*accumdisp","coltype":"vchar","formatmask":"{:,.0f}","summary_type":""},{"colname":"svm","coltype":"number","formatmask":"","summary_type":""},{"colname":"svy","coltype":"number","formatmask":"","summary_type":""},{"colname":"evm","coltype":"number","formatmask":"","summary_type":""},{"colname":"evy","coltype":"number","formatmask":"","summary_type":""},{"colname":"doc_num","coltype":"vchar","formatmask":"","summary_type":""},{"colname":"doc_date","coltype":"date","formatmask":"","summary_type":""},{"colname":"*status","coltype":"vchar","formatmask":"","summary_type":""},{"colname":"*apr","coltype":"vchar","formatmask":"","summary_type":""},{"colname":"stl_doc_num","coltype":"vchar","formatmask":"","summary_type":""},{"colname":"settlement","coltype":"vchar","formatmask":"","summary_type":""},{"colname":"settlement_fee","coltype":"number","formatmask":"{:,.0f}","summary_type":""},{"colname":"settlement_amount","coltype":"number","formatmask":"{:,.0f}","summary_type":""},{"colname":"settlement_date","coltype":"date","formatmask":"","summary_type":""},{"colname":"settlement_by","coltype":"vchar","formatmask":"","summary_type":""},{"colname":"rec_id","coltype":"","formatmask":"","summary_type":""}],"data_source_alias":"","fetch_all_record":"","auto_commit":1,"persistent":0}',
      )
      const res = await axios.get(url)
      return res.data
    } catch (error) {
      throw new Error('Error fetching pinjaman detail: ' + error.message)
    }
  }
  async getMembership() {
    const srtValue = localStorage.getItem('srt')

    if (!srtValue) {
      throw new Error('srt value not found in localStorage')
    }
    const url = `${BASE_URL}/txn?fnc=fetchData;srt=${srtValue}`
    try {
      const form = new FormData()
      form.append('fnc', `fetchData;srt=${srtValue}`)
      form.append('unifie', `${srtValue}`)
      form.append('urifie', 'None')
      form.append('pid', '9')
      form.append('mform_id', 'PJM')
      form.append('form_id', 'ZKOPPJM')
      form.append('form_version', '607')
      form.append(
        'rcd',
        '{"mformid":"PJM","mversion":"0","formid":"ZKOPPJM","form_version":"607","pid":"9","blockid":"OPT_IDLIST","source_type":"TABLE","rowfetch":10,"numpage":1,"findtext":"","tableid":"Ik1CUl9NRU1CRVIi","defwhere":"ImNvbXBhbnk9JXMgYW5kIHRlcm1pbmF0aW9uPSdBJyI=","dtd":["1000"],"orderby":"","first_record":0,"columns":[{"colname":"mbrid","coltype":"","formatmask":"","summary_type":""},{"colname":"name","coltype":"","formatmask":"","summary_type":""},{"colname":"rec_id","coltype":"","formatmask":"","summary_type":""}],"data_source_alias":"","fetch_all_record":"","auto_commit":1,"persistent":0}',
      )

      const res = await axios.post(url, form)
      return res.data
    } catch (error) {
      throw new Error('Error fetching pinjaman detail: ' + error.message)
    }
  }

  async getLoanSettlement() {
    const srtValue = localStorage.getItem('srt')
    if (!srtValue) {
      throw new Error('srt value not found in localStorage')
    }
    const url = `${BASE_URL}/txn?fnc=runLib;opic=AkyejquMGB6TeNQ7mmLrw;csn=DEMOAKR;rc=JvXlb/d1vBQTgu3NYk4lj9rKkNWgFvbTDRR667ku7QY%3D`
    try {
      const res = await axios.get(url)
      return res.data
    } catch (error) {
      throw new Error('Error fetching pinjaman detail: ' + error.message)
    }
  }

  async updatePinjaman(id, data) {
    try {
      const response = await this.apiClient.put(`/pinjaman/${id}`, data)
      return response.data
    } catch (error) {
      throw new Error('Error updating pinjaman: ' + error.message)
    }
  }
  async deletePinjaman(id) {
    try {
      const response = await this.apiClient.delete(`/pinjaman/${id}`)
      return response.data
    } catch (error) {
      throw new Error('Error deleting pinjaman: ' + error.message)
    }
  }

  async createPinjaman(data) {
    const srtValue = localStorage.getItem('srt')
    const pid = localStorage.getItem('pid')

    if (!srtValue) {
      throw new Error('srt value not found in localStorage')
    }
    const url = `${BASE_URL}/txn?fnc=commitTxn;srt=${srtValue}`

    try {
      const form = new FormData()

      // Append necessary fields
      form.append('fnc', `commitTxn;srt=${srtValue}`)
      form.append('unifie', `${srtValue}`)
      form.append('urifie', 'None')
      form.append('mform_id', 'PJM')
      form.append('form_id', 'ZKOPPJM')
      form.append('form_version', '605')
      form.append('pid', pid)

      // Ensure data is formatted correctly
      const formattedData = data.map((record) => ({
        ...record,
        tabledata: record.tabledata.map((item) => ({
          ...item,
          colval: typeof item.colval === 'number' ? item.colval.toString() : item.colval, // Convert number to string
        })),
      }))

      console.log('Formatted Data:', JSON.stringify(formattedData)) // Log the data before sending

      form.append('rcd', JSON.stringify(formattedData)) // Ensure `data` is a valid object

      form.append('eps', '{}')

      // Make API request
      const res = await axios.post(url, form)

      console.log('Response from API:', res.data) // Log the response for debugging
      return res.data
    } catch (error) {
      // Catch and throw any errors encountered
      throw new Error('Error creating pinjaman: ' + error.message)
    }
  }

  async getSettlementList() {
    const srtValue = localStorage.getItem('srt')

    if (!srtValue) {
      throw new Error('srt value not found in localStorage')
    }
    const url = `${BASE_URL}/txn?fnc=fetchData;srt=${srtValue}`
    try {
      const form = new FormData()
      form.append('fnc', `fetchData;srt=${srtValue}`)
      form.append('unifie', `${srtValue}`)
      form.append('urifie', 'None')
      form.append('pid', '48')
      form.append('mform_id', 'STL')
      form.append('form_id', 'ZKOPSTL')
      form.append('form_version', '602')
      form.append(
        'rcd',
        '{"mformid":"STL","mversion":"0","formid":"ZKOPSTL","form_version":"602","pid":"48","blockid":"LONLIST","source_type":"FUNCTION","rowfetch":10,"numpage":1,"findtext":"","tableid":"ImRhdC5sb2FubGlzdCI=","defwhere":"e30=","dtd":[],"orderby":"","first_record":0,"columns":[{"colname":"mbr_company","coltype":"vchar","formatmask":"","summary_type":""},{"colname":"stl_doc_num","coltype":"vchar","formatmask":"","summary_type":""},{"colname":"mbr_mbrid","coltype":"vchar","formatmask":"","summary_type":""},{"colname":"mbr_name","coltype":"vchar","formatmask":"","summary_type":""},{"colname":"loan_code","coltype":"vchar","formatmask":"","summary_type":""},{"colname":"tot_am","coltype":"vchar","formatmask":"{:,.0f}","summary_type":""},{"colname":"accum","coltype":"vchar","formatmask":"{:,.0f}","summary_type":""},{"colname":"status","coltype":"vchar","formatmask":"","summary_type":""},{"colname":"settlement","coltype":"vchar","formatmask":"","summary_type":""},{"colname":"settlement_fee","coltype":"number","formatmask":"{:,.0f}","summary_type":""},{"colname":"settlement_amount","coltype":"number","formatmask":"{:,.0f}","summary_type":""},{"colname":"settlement_date","coltype":"date","formatmask":"","summary_type":""},{"colname":"settlement_by","coltype":"vchar","formatmask":"","summary_type":""},{"colname":"rec_id","coltype":"","formatmask":"","summary_type":""}],"data_source_alias":"","fetch_all_record":"","auto_commit":1,"persistent":0}',
      )

      const res = await axios.post(url, form)
      return res.data
    } catch (error) {
      throw new Error('Error fetching pinjaman list: ' + error.message)
    }
  }

  async createSettlement(docnum) {
    const srtValue = localStorage.getItem('srt')
    const pid = localStorage.getItem('pid')

    if (!srtValue) {
      throw new Error('srt value not found in localStorage')
    }
    const url = `${BASE_URL}/txn?fnc=runLib;srt=${srtValue}`

    try {
      const form = new FormData()

      form.append('fnc', `runLib;srt=${srtValue}`)
      form.append('form_id', `ZKOPSTL`)
      form.append('mform_id', `STL`)
      form.append('form_version', '602')
      form.append('pid', pid)
      form.append('unifie', srtValue)
      form.append('urifie', 'None')
      form.append('libname', 'stl.posting')
      form.append('argt', 'a')
      form.append('argl', '1')
      form.append('arg0', docnum)

      // Make API request
      const res = await axios.post(url, form)

      console.log('Response from API:', res.data) // Log the response for debugging
      return res.data
    } catch (error) {
      // Catch and throw any errors encountered
      throw new Error('Error creating settlement: ' + error.message)
    }
  }

  async getSettlementNew() {
    const srtValue = localStorage.getItem('srt')

    if (!srtValue) {
      throw new Error('srt value not found in localStorage')
    }
    const url = `${BASE_URL}/txn?fnc=fetchData;srt=${srtValue}`
    try {
      const form = new FormData()
      form.append('fnc', `fetchData;srt=${srtValue}`)
      form.append('unifie', `${srtValue}`)
      form.append('urifie', 'None')
      form.append('pid', '71')
      form.append('mform_id', 'STL')
      form.append('form_id', 'ZKOPSTL')
      form.append('form_version', '602')
      form.append(
        'rcd',
        '{{"mformid":"STL","mversion":"0","formid":"ZKOPSTL","form_version":"602","pid":"71","blockid":"LONSTL","source_type":"FUNCTION","rowfetch":10,"numpage":1,"findtext":"","tableid":"ImRhdC5sb2Fub3BlbiI=","defwhere":"e30=","dtd":[],"orderby":"doc_num desc","first_record":0,"columns":[{"colname":"mbr_company","coltype":"vchar","formatmask":"","summary_type":""},{"colname":"doc_num","coltype":"vchar","formatmask":"","summary_type":""},{"colname":"mbr_mbrid","coltype":"vchar","formatmask":"","summary_type":""},{"colname":"mbr_name","coltype":"vchar","formatmask":"","summary_type":""},{"colname":"loan_code","coltype":"vchar","formatmask":"","summary_type":""},{"colname":"seq","coltype":"number","formatmask":"","summary_type":""},{"colname":"date_cair","coltype":"date","formatmask":"","summary_type":""},{"colname":"tot_am","coltype":"number","formatmask":"{:,.0f}","summary_type":""},{"colname":"accum","coltype":"vchar","formatmask":"{:,.0f}","summary_type":""},{"colname":"stl_am","coltype":"number","formatmask":"{:,.0f}","summary_type":""},{"colname":"stl_ampkk","coltype":"number","formatmask":"{:,.0f}","summary_type":""},{"colname":"status","coltype":"vchar","formatmask":"","summary_type":""},{"colname":"rec_id","coltype":"","formatmask":"","summary_type":""}],"data_source_alias":"","fetch_all_record":"","auto_commit":1,"persistent":0}',
      )

      const res = await axios.post(url, form)
      return res.data
    } catch (error) {
      throw new Error('Error fetching settlement new: ' + error.message)
    }
  }

  async getPinjamanSettlement() {
    const srtValue = localStorage.getItem('srt')

    if (!srtValue) {
      throw new Error('srt value not found in localStorage')
    }

    const url = `${BASE_URL}/txn?fnc=fetchData;srt=${srtValue}`
    try {
      const form = new FormData()
      form.append('fnc', `fetchData;srt=${srtValue}`)
      form.append('unifie', srtValue)
      form.append('urifie', 'None')
      form.append('pid', '8')
      form.append('mform_id', 'STL')
      form.append('form_id', 'ZKOPSTL')
      form.append('form_version', '602')
      form.append(
        'rcd',
        '{"mformid":"STL","mversion":"0","formid":"ZKOPSTL","form_version":"602","pid":"8","blockid":"LONSTL","source_type":"FUNCTION","rowfetch":10,"numpage":1,"findtext":"","tableid":"ImRhdC5sb2Fub3BlbiI=","defwhere":"e30=","dtd":[],"orderby":"doc_num desc","first_record":0,"columns":[{"colname":"mbr_company","coltype":"vchar","formatmask":"","summary_type":""},{"colname":"doc_num","coltype":"vchar","formatmask":"","summary_type":""},{"colname":"mbr_mbrid","coltype":"vchar","formatmask":"","summary_type":""},{"colname":"mbr_name","coltype":"vchar","formatmask":"","summary_type":""},{"colname":"loan_code","coltype":"vchar","formatmask":"","summary_type":""},{"colname":"seq","coltype":"number","formatmask":"","summary_type":""},{"colname":"date_cair","coltype":"date","formatmask":"","summary_type":""},{"colname":"tot_am","coltype":"number","formatmask":"{:,.0f}","summary_type":""},{"colname":"accum","coltype":"vchar","formatmask":"{:,.0f}","summary_type":""},{"colname":"stl_am","coltype":"number","formatmask":"{:,.0f}","summary_type":""},{"colname":"stl_ampkk","coltype":"number","formatmask":"{:,.0f}","summary_type":""},{"colname":"status","coltype":"vchar","formatmask":"","summary_type":""},{"colname":"rec_id","coltype":"","formatmask":"","summary_type":""}],"data_source_alias":"","fetch_all_record":"","auto_commit":1,"persistent":0}',
      )

      const res = await axios.post(url, form)
      console.log('Response from getPinjamanSettlement:', res.data) // Log the response for debugging
      return res.data
    } catch (error) {
      throw new Error('Error fetching pinjaman list: ' + error.message)
    }
  }

  async getUploadPotonganList() {
    const srtValue = localStorage.getItem('srt')
    if (!srtValue) {
      throw new Error('srt value not found in localStorage')
    }
    const url = `${BASE_URL}/txn?fnc=runLib;opic=AkyejquMGB6TeNQ7mmLrw;csn=DEMOAKR;rc=JvXlb/d1vBQTX5cCquZ4kjHlyGO6NkkJVqo24OmEERA%3D`
    try {
      const res = await axios.get(url)
      return res.data
    } catch (error) {
      throw new Error('Error fetching pinjaman detail: ' + error.message)
    }
  }

  async getLoanDocNumbers() {
    const srtValue = localStorage.getItem('srt')
    const pid = localStorage.getItem('pid')
    const url = `${BASE_URL}/txn?fnc=fetchData;srt=${srtValue}`
    const form = new FormData()
    form.append('fnc', `fetchData;srt=${srtValue}`)
    form.append('unifie', srtValue)
    form.append('urifie', 'None')
    form.append('pid', pid)
    form.append('mform_id', 'UPJ')
    form.append('form_id', 'ZKOPUPJ')
    form.append('form_version', '604')
    form.append(
      'rcd',
      '{"mformid":"UPJ","mversion":"0","formid":"ZKOPUPJ","form_version":"604","pid":"14","blockid":"OPT_LONDOC","source_type":"FUNCTION","rowfetch":10,"numpage":1,"findtext":"","tableid":"ImRhdC5nZXRsb24i","defwhere":"e30=","dtd":[],"orderby":"","first_record":0,"columns":[{"colname":"doc_num","coltype":"","formatmask":"","summary_type":""},{"colname":"mbr_mbrid","coltype":"","formatmask":"","summary_type":""},{"colname":"mbr_name","coltype":"","formatmask":"","summary_type":""},{"colname":"rec_id","coltype":"","formatmask":"","summary_type":""}],"data_source_alias":"","fetch_all_record":"","auto_commit":1,"persistent":0}',
    )
    try {
      const res = await axios.post(url,form)
      return res.data
    } catch (error) {
      throw new Error('Error fetching loan document numbers: ' + error.message)
    }
  }

  async getMbrIds() {
    const srtValue = localStorage.getItem('srt')
    const pid = localStorage.getItem('pid')
    const url = `${BASE_URL}/txn?fnc=fetchData;srt=${srtValue}`
    const form = new FormData()
    form.append('fnc', `fetchData;srt=${srtValue}`)
    form.append('unifie', srtValue)
    form.append('urifie', 'None')
    form.append('pid', pid)
    form.append('mform_id', 'UPJ')
    form.append('form_id', 'ZKOPUPJ')
    form.append('form_version', '604')
    form.append(
      'rcd',
      '{"mformid":"UPJ","mversion":"0","formid":"ZKOPUPJ","form_version":"604","pid":"14","blockid":"OPT_IDLIST","source_type":"TABLE","rowfetch":10,"numpage":1,"findtext":"","tableid":"Ik1CUl9NRU1CRVIi","defwhere":"InRlcm1pbmF0aW9uPSdBJyI=","dtd":[],"orderby":"","first_record":0,"columns":[{"colname":"mbrid","coltype":"","formatmask":"","summary_type":""},{"colname":"name","coltype":"","formatmask":"","summary_type":""},{"colname":"company","coltype":"","formatmask":"","summary_type":""},{"colname":"rec_id","coltype":"","formatmask":"","summary_type":""}],"data_source_alias":"","fetch_all_record":"","auto_commit":1,"persistent":0}',
    )
    try {
      const res = await axios.post(url,form)
      return res.data
    } catch (error) {
      throw new Error('Error fetching MBR IDs: ' + error.message)
    }
  }

  async getPayMethods() {
    const srtValue = localStorage.getItem('srt')
    const pid = localStorage.getItem('pid')
    const url = `${BASE_URL}/txn?fnc=fetchData;srt=${srtValue}`
    const form = new FormData()
    form.append('fnc', `fetchData;srt=${srtValue}`)
    form.append('unifie', srtValue)
    form.append('urifie', 'None')
    form.append('pid', pid)
    form.append('mform_id', 'UPJ')
    form.append('form_id', 'ZKOPUPJ')
    form.append('form_version', '604')
    form.append(
      'rcd',
      '{"mformid":"UPJ","mversion":"0","formid":"ZKOPUPJ","form_version":"604","pid":"3","blockid":"OPT_PAYLIST","source_type":"TABLE","rowfetch":10,"numpage":1,"findtext":"","tableid":"IkZHTF9JTkFDVCI=","defwhere":"ImluYWN0X2NvZGU9J01EUlMnIG9yIGluYWN0X2NvZGU9J0tTSU0nICI=","dtd":[],"orderby":"inact_code","first_record":0,"columns":[{"colname":"inact_code","coltype":"","formatmask":"","summary_type":""},{"colname":"inact_name","coltype":"","formatmask":"","summary_type":""},{"colname":"rec_id","coltype":"","formatmask":"","summary_type":""}],"data_source_alias":"","fetch_all_record":"","auto_commit":1,"persistent":0}',
    )
    try {
      const res = await axios.post(url,form)
      return res.data
    } catch (error) {
      throw new Error('Error fetching payment methods: ' + error.message)
    }
  }

  async createUploadPotongan(data) {
    const srtValue = localStorage.getItem('srt')
    const pid = localStorage.getItem('pid')

    if (!srtValue) {
      throw new Error('srt value not found in localStorage')
    }
    const url = `${BASE_URL}/txn?fnc=commitTxn;srt=${srtValue}`

    try {
      const form = new FormData()

      // Append necessary fields
      form.append('fnc', `commitTxn;srt=${srtValue}`)
      form.append('unifie', `${srtValue}`)
      form.append('urifie', 'None')
      form.append('mform_id', 'UPJ')
      form.append('form_id', 'ZKOPUPJ')
      form.append('form_version', '604')
      form.append('pid', pid)

      // Ensure data is formatted correctly
      const formattedData = data.map((record) => ({
        ...record,
        tabledata: record.tabledata.map((item) => ({
          ...item,
          colval: typeof item.colval === 'number' ? item.colval.toString() : item.colval, // Convert number to string
        })),
      }))

      console.log('Formatted Data:', JSON.stringify(formattedData)) // Log the data before sending

      form.append('rcd', JSON.stringify(formattedData)) // Ensure `data` is a valid object

      form.append('eps', '{}')

      // Make API request
      const res = await axios.post(url, form)

      console.log('Response from API:', res.data) // Log the response for debugging
      return res.data
    } catch (error) {
      // Catch and throw any errors encountered
      throw new Error('Error creating upload potongan: ' + error.message)
    }
  }

}

export default PinjamanService
