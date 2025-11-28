import axios from 'axios'

const BASE_URL = '/api'

export async function loginToGCG({ csn, usn, pwd }) {
  const url = `${BASE_URL}/preodm?fnc=auth`
  const form = new FormData()
  form.append('csn', 'demoakr')
  form.append('usn', usn)
  form.append('pwd', pwd)

  const res = await axios.post(url, form)
  return res.data
}

export async function fetchUserInfo(srt) {
  const url = `${BASE_URL}/txn?fnc=runLib;srt=${srt}`
  const form = new FormData()
  form.append('form_id', 'MAINPANEL')
  form.append('mform_id', 'MAINPANEL')
  form.append('form_version', '624')
  form.append('pid', '1')
  form.append('libname', 'panel.get_username')

  const res = await axios.post(url, form)
  return res.data
}
