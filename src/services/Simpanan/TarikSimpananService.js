import con from '@/constants'
import axios from 'axios'

const BASE_URL = '/api'

class TarikSimpananService {
  async getTarikSimpananList() {
    const url = `${BASE_URL}/txn?fnc=runLib;opic=AkyejquMGB6TeNQ7mmLrw;csn=DEMOAKR;rc=JvXlb/d1vBRKk0dIBZBnF2uIFKw0iXse`
    try {
      const response = await axios.get(url)
      console.log('Tarik Simpanan List Response:', response.data)
      return response.data
    } catch (error) {
      throw new Error('Error fetching tarik simpanan list: ' + error.message)
    }
  }

  async getSaldoSimpanan(memberId) {
    const srt = localStorage.getItem('srt')
    const pid = localStorage.getItem('pid')

    const formData = new FormData()
    formData.append('form_id', 'ZKOPTSMP')
    formData.append('mform_id', 'TSMP')
    formData.append('form_version', '604')
    formData.append('pid', pid)
    formData.append('unifie', srt)
    formData.append('libname', 'dat.empsum')
    formData.append('argt', 'a')
    formData.append('argl', '1')
    formData.append('arg0', memberId)
    formData.append('urifie', 'None')

    const url = `${BASE_URL}/txn?fnc=runLib;srt=${srt}`
    try {
      const response = await axios.post(url, formData)
      console.log('Saldo Simpanan Response:', response.data)
      return response.data
    } catch (error) {
      throw new Error('Error fetching saldo simpanan: ' + error.message)
    }
  }

  async getIuranPokok(memberId) {
    const srt = localStorage.getItem('srt')
    const pid = localStorage.getItem('pid')

    const defwhere = btoa(`mbr_mbrid='${memberId}' and txn_code='SP'`) // encode ke base64

    const payload = {
      mformid: 'TSMP',
      mversion: '0',
      formid: 'ZKOPTSMP',
      form_version: '604',
      pid: pid,
      blockid: 'SMPL',
      source_type: 'TABLE',
      rowfetch: 10,
      numpage: 1,
      findtext: '',
      tableid: 'Ik1CUl9JVVIi',
      defwhere: defwhere,
      dtd: [],
      orderby: 'mbr_mbrid',
      first_record: 0,
      columns: [
        { colname: 'doc_number', coltype: 'vchar', formatmask: '', summary_type: '' },
        { colname: 'amount', coltype: 'number', formatmask: '{:,.0f}', summary_type: 'sum' },
        { colname: 'txn_code', coltype: 'vchar', formatmask: '', summary_type: '' },
        { colname: 'doc_date', coltype: 'date', formatmask: '', summary_type: '' },
        { colname: '*mbr_name', coltype: 'vchar', formatmask: '', summary_type: '' },
      ],
      data_source_alias: '',
      fetch_all_record: '1.0',
      auto_commit: 1,
      persistent: 0,
    }

    const formData = new FormData()
    formData.append('unifie', srt)
    formData.append('urifie', 'None')
    formData.append('pid', pid)
    formData.append('mform_id', 'TSMP')
    formData.append('form_id', 'ZKOPTSMP')
    formData.append('form_version', '604')
    formData.append('rcd', JSON.stringify(payload))

    const url = `/api/txn?fnc=fetchData;srt=${srt}`
    try {
      const response = await axios.post(url, formData)
      console.log('Iuran Pokok Response:', response.data)

      const rows = response.data.tabledata || []
      const total = rows.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0)

      return {
        total,
        detail: rows,
      }
    } catch (error) {
      throw new Error('Error fetching Iuran Pokok: ' + error.message)
    }
  }

  async getIuranWajib(memberId) {
    const srt = localStorage.getItem('srt')
    const pid = localStorage.getItem('pid') || '4'

    const formData = new FormData()
    formData.append('unifie', srt)
    formData.append('urifie', 'None')
    formData.append('pid', pid)
    formData.append('mform_id', 'TSMP')
    formData.append('form_id', 'ZKOPTSMP')
    formData.append('form_version', '604')

    const defwhere = btoa(`mbr_mbrid='${memberId}' and txn_code='SW'`)

    const rcdPayload = {
      mformid: 'TSMP',
      mversion: '0',
      formid: 'ZKOPTSMP',
      form_version: '604',
      pid: pid,
      blockid: 'SMPL',
      source_type: 'TABLE',
      rowfetch: 10,
      numpage: 1,
      findtext: '',
      tableid: 'Ik1CUl9JVVIi',
      defwhere: defwhere,
      dtd: [],
      orderby: 'mbr_mbrid',
      first_record: 0,
      columns: [
        { colname: 'doc_number', coltype: 'vchar' },
        { colname: 'currs', coltype: 'vchar' },
        { colname: 'doc_date', coltype: 'date' },
        { colname: 'txn_code', coltype: 'vchar' },
        { colname: 'trans_date', coltype: 'date' },
        { colname: 'mbr_company', coltype: 'vchar' },
        { colname: 'mbr_mbrid', coltype: 'vchar' },
        { colname: '*mbr_name', coltype: 'vchar' },
        { colname: 'amount', coltype: 'number', formatmask: '{:,.0f}', summary_type: 'sum' },
        { colname: 'sdesc', coltype: 'vchar' },
        { colname: 'rec_id', coltype: '' },
      ],
      data_source_alias: '',
      fetch_all_record: '1.0',
      auto_commit: 1,
      persistent: 0,
    }

    formData.append('rcd', JSON.stringify(rcdPayload))

    const url = `${BASE_URL}/txn?fnc=fetchData;srt=${srt}`

    try {
      const response = await axios.post(url, formData)
      console.log('Iuran Wajib Response:', response.data)
      return response.data
    } catch (error) {
      throw new Error('Error fetching Iuran Wajib: ' + error.message)
    }
  }
}

export default TarikSimpananService
