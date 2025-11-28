import axios from 'axios'

const BASE_URL = '/api'

class MemberDataService {
  async getMemberData() {
    const url = `${BASE_URL}/txn?fnc=runLib;opic=AkyejquMGB6TeNQ7mmLrw;csn=DEMOAKR;rc=JvXlb/d1vBT6ylPz9TLPMaEJ96BIiWmM`
    // const form = new FormData()
    // form.append('csn', csn)
    // form.append('usn', usn)

    const res = await axios.get(url)
    console.log('MemberDataService.getMemberData', res.data)
    return res.data
  }

  // Menambahkan method POST
  async postMemberData(payload) {
    const url = `${BASE_URL}/txn?fnc=runLib;opic=6t0KxJnF8gYJmkDj52TkQw;csn=DEMOAKR;rc=JvXlb/d1vBT6ylPz9TLPMfO1HhyZtJ6V`
    const form = new FormData()

    // Append necessary fields to the form
    // form.append('fnc', 'runLib')
    // form.append('opic', '6t0KxJnF8gYJmkDj52TkQw') // Sesuaikan dengan nilai opic
    // form.append('csn', 'DEMOAKR')
    form.append('argt', 'vars') // Ganti 'data' dengan payload yang ingin Anda kirimkan
    form.append('argl', JSON.stringify(payload)) // Ganti 'data' dengan payload yang ingin Anda kirimkan

    try {
      const res = await axios.post(url, form, {
        headers: {
          'Content-Type': 'multipart/form-data', // Menggunakan content type untuk FormData
        },
      })
      console.log('MemberDataService.postMemberData', res.data)
      return res.data
    } catch (error) {
      console.error('Error posting data', error)
      throw error
    }
  }

  // Method to fetch Religion data
  async fetchReligionData() {
    const srt = localStorage.getItem('srt')
    const url = `${BASE_URL}/txn?fnc=fetchData;srt=${srt}`

    try {
      const form = new FormData()
      form.append('fnc', `fetchData;srt=${srt}`)
      form.append('unifie', srt)
      form.append('urifie', 'None')
      form.append('pid', '42')
      form.append('mform_id', 'MBD')
      form.append('form_id', 'MBD')
      form.append('form_version', '601')
      form.append(
        'rcd',
        '{"mformid":"MBD","mversion":"601","formid":"MBD","form_version":"601","pid":"42","blockid":"OPT_RELIGIONLIST","source_type":"TABLE","rowfetch":10,"numpage":1,"findtext":"","tableid":"ImhyZF9yZWZzIg==","defwhere":"ImZpbGxfdHlwZSA9ICdSRUwnIg==","dtd":[],"orderby":"","first_record":0,"columns":[{"colname":"fill_name","coltype":"","formatmask":"","summary_type":""},{"colname":"rec_id","coltype":"","formatmask":"","summary_type":""}],"data_source_alias":"","fetch_all_record":"","auto_commit":1,"persistent":0}',
      )

      const res = await axios.post(url, form)
      return res.data
    } catch (error) {
      console.error('Error fetching religion data:', error)
      throw error
    }
  }

  // Method to fetch Education data
  async fetchEducationData() {
    const srt = localStorage.getItem('srt')
    const url = `${BASE_URL}/txn?fnc=fetchData;srt=${srt}`

    try {
      const form = new FormData()
      form.append('fnc', `fetchData;srt=${srt}`)
      form.append('unifie', '0380453485380a836fa164847ddcfc9fbaedbd9c565f11f0a8a4b633f9e1c848')
      form.append('urifie', 'None')
      form.append('pid', '42')
      form.append('mform_id', 'MBD')
      form.append('form_id', 'MBD')
      form.append('form_version', '601')
      form.append(
        'rcd',
        '{"mformid":"MBD","mversion":"601","formid":"MBD","form_version":"601","pid":"42","blockid":"OPT_EDULIST","source_type":"TABLE","rowfetch":100,"numpage":1,"findtext":"","tableid":"ImhyZF9yZWZzIg==","defwhere":"ImZpbGxfdHlwZSA9ICdERUcnIg==","dtd":[],"orderby":"fill_name","first_record":0,"columns":[{"colname":"fill_name","coltype":"","formatmask":"","summary_type":""},{"colname":"rec_id","coltype":"","formatmask":"","summary_type":""}],"data_source_alias":"","fetch_all_record":"","auto_commit":1,"persistent":0}',
      )

      const res = await axios.post(url, form)
      return res.data
    } catch (error) {
      console.error('Error fetching religion data:', error)
      throw error
    }
  }
  // async postMemberData(payload) {
  //   const url = `${BASE_URL}/txn?fnc=commitTxn;srt=8ba59fdcde2cb1c109956e2e17b94a9cd4e734f8607811f0ab37b633f9e1c848`
  //   const form = new FormData()

  //   // Append necessary fields to the form
  //   // form.append('fnc', 'runLib')
  //   // form.append('opic', '6t0KxJnF8gYJmkDj52TkQw') // Sesuaikan dengan nilai opic
  //   // form.append('csn', 'DEMOAKR')
  //   form.append('unifie', '8ba59fdcde2cb1c109956e2e17b94a9cd4e734f8607811f0ab37b633f9e1c848')
  //   form.append('urifie', 'None')
  //   form.append('mform_id', 'MBD')
  //   form.append('form_id', 'MBD')
  //   form.append('form_version', '601')
  //   form.append('pid', '3')
  //   form.append('rcd', payload)
  //   form.append('eps', '{}')

  //   try {
  //     const res = await axios.post(url, form, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data', // Menggunakan content type untuk FormData
  //       },
  //     })
  //     console.log('MemberDataService.postMemberData', res.data)
  //     return res.data
  //   } catch (error) {
  //     console.error('Error posting data', error)
  //     throw error
  //   }
  // }
  // Method to remove a member
  async removeMember(memberId) {
    const srt = localStorage.getItem('srt')
    // const url = `${BASE_URL}/txn?fnc=runLib;srt=8ba59fdcde2cb1c109956e2e17b94a9cd4e734f8607811f0ab37b633f9e1c848`
    const url = `${BASE_URL}/txn?fnc=runLib;srt=${srt}`

    const form = new FormData()
    form.append('form_id', 'MBD')
    form.append('mform_id', 'MBD')
    form.append('form_version', '601')
    form.append('pid', '3')
    form.append('unifie', '8ba59fdcde2cb1c109956e2e17b94a9cd4e734f8607811f0ab37b633f9e1c848')
    form.append('urifie', 'None')
    form.append('libname', 'pmd.removed')
    form.append('argt', 'a')
    form.append('argl', '2')
    form.append('arg0', '1000')
    form.append('arg1', memberId)

    try {
      const res = await axios.post(url, form)
      console.log('Member removed successfully:', res.data)
      return res.data
    } catch (error) {
      console.error('Error removing member:', error)
      throw error
    }
  }

  // Method to fetch Group
  async fetchGroup() {
    const srt = localStorage.getItem('srt')
    const url = `${BASE_URL}/txn?fnc=fetchData;srt=${srt}`

    try {
      const form = new FormData()
      form.append('fnc', `fetchData;srt=${srt}`)
      form.append('unifie', '0380453485380a836fa164847ddcfc9fbaedbd9c565f11f0a8a4b633f9e1c848')
      form.append('urifie', 'None')
      form.append('pid', '42')
      form.append('mform_id', 'MBD')
      form.append('form_id', 'MBD')
      form.append('form_version', '601')
      form.append(
        'rcd',
        '{"mformid":"MBD","mversion":"601","formid":"MBD","form_version":"601","pid":"42","blockid":"OPT_MGULIST","source_type":"TABLE","rowfetch":10,"numpage":1,"findtext":"","tableid":"Im1icl9tYnJzdHIi","defwhere":"ImNvbXBhbnk9JXMgYW5kIHN0cnR5cGU9J01HVSci","dtd":["1000"],"orderby":"seq,strcode","first_record":0,"columns":[{"colname":"strcode","coltype":"","formatmask":"","summary_type":""},{"colname":"name","coltype":"","formatmask":"","summary_type":""},{"colname":"rec_id","coltype":"","formatmask":"","summary_type":""}],"data_source_alias":"","fetch_all_record":"","auto_commit":1,"persistent":0}',
      )

      const res = await axios.post(url, form)
      return res.data
    } catch (error) {
      console.error('Error fetching group data:', error)
      throw error
    }
  }
}

export default MemberDataService
