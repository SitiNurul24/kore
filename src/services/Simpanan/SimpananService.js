// import con from '@/constants'
import axios from 'axios'

const BASE_URL = '/api'

class SimpananService {
  async getSimpananList() {
    const url = `${BASE_URL}/txn?fnc=runLib;opic=AkyejquMGB6TeNQ7mmLrw;csn=DEMOAKR;rc=JvXlb/d1vBTo4Co9hbdlAukw3KWV3xbbnAmVeN3VaZ8%3D`
    try {
      const response = await axios.get(url)
      console.log('Simpanan List Response:', response.data)
      return response.data
    } catch (error) {
      throw new Error('Error fetching simpanan list: ' + error.message)
    }
  }

  async getSimpananById(docnum) {
    const url = `${BASE_URL}/txn?fnc=runLib;opic=AkyejquMGB6TeNQ7mmLrw;csn=DEMOAKR;vars=%7B%22doc_num%22%3A%22${docnum}%22%7D;rc=JvXlb/d1vBTo4Co9hbdlAoIXAH0xb39VTPtpovnPazU%3D`
    try {
      const response = await axios.get(url)
      console.log('Simpanan by ID Response:', response.data)
      let dataEdit = []
      for (const i of response.data.details) {
        const detail = {
          mbrId: i.mbr_mbrid,
          name: i.mbr_name,
          paytype: i.inact_code,
          paymentName: i.inct_name,
          amount: i.amount,
          description: i.sdesc,
        }
        dataEdit.push(detail)
      }
      return { ...response.data.header, details: dataEdit }
    } catch (error) {
      throw new Error('Error fetching simpanan by ID: ' + error.message)
    }
  }

  async getPaymentOptions() {
    const srt = localStorage.getItem('srt')
    const pid = localStorage.getItem('pid')
    const payload = {
      mformid: 'SMP',
      mversion: '0',
      formid: 'ZKOPSMP',
      form_version: '604',
      pid: '8',
      blockid: 'OPT_PAYLIST',
      source_type: 'TABLE',
      rowfetch: 10,
      numpage: 1,
      findtext: '',
      tableid: 'IkZHTF9JTkFDVCI=',
      defwhere: 'ImluYWN0X2NvZGU9J01EUlMnIG9yIGluYWN0X2NvZGU9J0tTSU0nICI=',
      dtd: [],
      orderby: 'inact_code',
      first_record: 0,
      columns: [
        {
          colname: 'inact_code',
          coltype: '',
          formatmask: '',
          summary_type: '',
        },
        {
          colname: 'inact_name',
          coltype: '',
          formatmask: '',
          summary_type: '',
        },
        {
          colname: 'rec_id',
          coltype: '',
          formatmask: '',
          summary_type: '',
        },
      ],
      data_source_alias: '',
      fetch_all_record: '1.0',
      auto_commit: 1,
      persistent: 0,
    }

    const newSimpanan = new FormData()
    newSimpanan.append('unifie', srt)
    newSimpanan.append('urifie', null)
    newSimpanan.append('pid', pid)
    newSimpanan.append('mform_id', 'SMP')
    newSimpanan.append('form_id', 'ZKOPSMP')
    newSimpanan.append('form_version', 604)
    newSimpanan.append('rcd', JSON.stringify(payload))

    const url = `${BASE_URL}/txn?fnc=fetchData;srt=${srt}`
    try {
      const response = await axios.post(url, newSimpanan)
      console.log('Payment Simpanan Response:', response.data.tabledata)
      return response.data.tabledata || []
    } catch (error) {
      throw new Error('Error fetching payment simpanan: ' + error.message)
    }
  }

  async getMembership() {
    const srt = localStorage.getItem('srt')
    const pid = localStorage.getItem('pid')
    const newSimpanan = new FormData()
    const rcd = {
      mformid: 'SMP',
      mversion: '0',
      formid: 'ZKOPSMP',
      form_version: '604',
      pid: '6',
      blockid: 'OPT_IDLIST',
      source_type: 'TABLE',
      rowfetch: 10,
      numpage: 1,
      findtext: '',
      tableid: 'Ik1CUl9NRU1CRVIi',
      defwhere: 'InRlcm1pbmF0aW9uPSdBJyI=',
      dtd: [],
      orderby: '',
      first_record: 0,
      columns: [
        { colname: 'mbrid', coltype: '', formatmask: '', summary_type: '' },
        { colname: 'name', coltype: '', formatmask: '', summary_type: '' },
        { colname: 'company', coltype: '', formatmask: '', summary_type: '' },
        { colname: 'rec_id', coltype: '', formatmask: '', summary_type: '' },
      ],
      data_source_alias: '',
      fetch_all_record: '',
      auto_commit: 1,
      persistent: 0,
    }
    newSimpanan.append('unifie', srt)
    newSimpanan.append('urifie', 'None')
    newSimpanan.append('pid', pid)
    newSimpanan.append('mform_id', 'SMP')
    newSimpanan.append('form_id', 'ZKOPSMP')
    newSimpanan.append('form_version', '604')
    newSimpanan.append('rcd', JSON.stringify(rcd))

    const url = `${BASE_URL}/txn?fnc=fetchData;srt=${srt}`
    console.log('Fetching Membership with data:', newSimpanan)
    try {
      const response = await axios.post(url, newSimpanan)
      console.log('Membership Response:', response.data.tabledata)
      return response.data.tabledata || []
    } catch (error) {
      throw new Error('Error fetching membership: ' + error.message)
    }
  }

  async createSimpanan(simpananData) {
    const srt = localStorage.getItem('srt')
    const pid = localStorage.getItem('pid')
    const newSimpanan = new FormData()

    newSimpanan.append('unifie', srt)
    newSimpanan.append('urifie', 'None')
    newSimpanan.append('mform_id', 'SMP')
    newSimpanan.append('form_id', 'ZKOPSMP')
    newSimpanan.append('form_version', '604')
    newSimpanan.append('pid', pid)
    newSimpanan.append('rcd', JSON.stringify(simpananData))
    newSimpanan.append('fnc', `commitTxn;srt=${srt}`)
    newSimpanan.append('eps', '{}')
    const url = `${BASE_URL}/txn?fnc=commitTxn;srt=${srt}`

    console.log('Creating Simpanan with data:', newSimpanan)
    try {
      const response = await axios.post(url, newSimpanan)
      console.log('Create Simpanan Response:', response.data)
      return response.data
    } catch (error) {
      throw new Error('Error creating simpanan: ' + error.message)
    }
  }

  async updateSimpanan(id, simpananData) {
    const srt = localStorage.getItem('srt')
    const url = `${BASE_URL}/txn?fnc=commitTxn;srt=${srt}`
    const payload = [
      {
        formid: 'ZKOPSMP',
        form_version: '604',
        blockid: 'HDR',
        master_blockid: '',
        txn: 'update',
        table_id: 'MBR_IURHDR',
        source_type: 'TABLE',
        rid: '75000000120',
        tid: 0,
        tabledata: [
          {
            colname: 'txndesc',
            colval: 'beli Kue Bolu Enak',
            coltype: '',
            formatmask: '%d-%m-%Y',
            master_colname: '',
          },
        ],
      },
      {
        formid: 'ZKOPSMP',
        form_version: '604',
        blockid: 'DTL',
        master_blockid: 'HDR',
        txn: 'update',
        table_id: 'MBR_IUR',
        source_type: 'TABLE',
        rid: '7500000012010009',
        tid: 1,
        tabledata: [
          {
            colname: 'doc_number',
            colval: '75000000120',
            coltype: 'vchar',
            formatmask: '%d-%m-%Y',
            master_colname: 'doc_num',
          },
          {
            colname: 'amount',
            colval: '10,000',
            coltype: 'number',
            formatmask: '{:,.0f}',
            master_colname: '',
          },
        ],
      },
    ]
    const newSimpanan = new FormData()
    newSimpanan.append('unifie', srt)
    newSimpanan.append('urifie', 'None')
    newSimpanan.append('pid', '9')
    newSimpanan.append('mform_id', 'SMP')
    newSimpanan.append('form_id', 'ZKOPSMP')
    newSimpanan.append('form_version', '604')
    newSimpanan.append('rcd', JSON.stringify(simpananData))
    newSimpanan.append('eps', '{}')

    try {
      const response = await axios.post(url, simpananData)
      console.log('Update Simpanan Response:', response.data)
      return response.data
    } catch (error) {
      throw new Error('Error updating simpanan: ' + error.message)
    }
  }

  async deleteSimpanan(id) {
    const srt = localStorage.getItem('srt')
    const pid = localStorage.getItem('pid')
    const url = `${BASE_URL}/txn?fnc=runLib;srt=${srt}`
    const newSimpanan = new FormData()
    newSimpanan.append('unifie', srt)
    newSimpanan.append('urifie', 'None')
    newSimpanan.append('pid', pid)
    newSimpanan.append('mform_id', 'SMP')
    newSimpanan.append('form_id', 'ZKOPSMP')
    newSimpanan.append('form_version', '604')
    newSimpanan.append('libname', 'simp.remove')
    newSimpanan.append('argt', 'a')
    newSimpanan.append('argl', '1')
    newSimpanan.append('arg0', id)
    try {
      const response = await axios.post(url, newSimpanan)
      console.log('Delete Simpanan Response:', response.data)
      return response.data
    } catch (error) {
      throw new Error('Error deleting simpanan: ' + error.message)
    }
  }
}

export default SimpananService
