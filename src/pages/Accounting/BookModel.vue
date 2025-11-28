<template>
  <div class="min-h-screen bg-[#f1f5f9] p-6">
    <h2 class="mb-4 text-xl font-bold text-gray-700">Accounting</h2>

    <div class="overflow-hidden rounded-2xl bg-white shadow-sm">
      <div class="flex flex-wrap items-center justify-between gap-3 border-b border-[#dcecf6] bg-[#e9f6fb] px-6 py-5">
        <div>
          <h3 class="text-lg font-semibold text-gray-700">Book Model</h3>
          <p class="text-sm text-gray-500">Kelola template laporan dan model buku terhubung ke Data Service.</p>
        </div>
        <div class="flex flex-wrap items-center gap-3">
          <button class="rounded-full bg-[#02A2DC] px-5 py-2 text-sm font-semibold text-white shadow transition hover:bg-[#0191c4]" @click="handleNew">
            Add New Model
          </button>
          <button class="rounded-full border border-[#02A2DC] px-5 py-2 text-sm font-semibold text-[#02A2DC] shadow-sm transition hover:bg-[#e6f7ff]" @click="toggleReportTypeManager">
            Report Type
          </button>
        </div>
      </div>

      <!-- Loading/Error -->
      <div v-if="loading || fetchError" class="px-6 pt-4">
        <div v-if="loading" class="rounded-md bg-blue-50 px-4 py-3 text-sm text-blue-700">
          Memuat data dari server...
        </div>
        <div v-else class="rounded-md bg-red-50 px-4 py-3 text-sm text-red-700">
          {{ fetchError }}
        </div>
      </div>

      <!-- Report Type Manager -->
      <transition name="slide-fade">
        <section v-if="showReportTypeManager" class="border-b border-[#c8e8f2] bg-[#f8fdff] px-6 py-6">
          <div class="rounded-md border border-[#c8e8f2] bg-white shadow-sm">
            <div class="flex flex-wrap items-center justify-between gap-3 border-b border-[#c8e8f2] bg-[#ecf7fb] px-5 py-4">
              <h4 class="text-base font-semibold text-gray-700">Report Type</h4>
              <div class="flex flex-wrap items-center gap-2">
                <button class="rounded-md border border-[#02A2DC] px-4 py-2 text-sm font-semibold text-[#02A2DC] hover:bg-[#e6f7ff]" @click="startNewReportTypeEntry">
                  Add
                </button>
                <button class="rounded-md bg-[#02A2DC] px-4 py-2 text-sm font-semibold text-white shadow hover:bg-[#0191c4]" @click="reloadReportTypes">
                  Save
                </button>
              </div>
            </div>
            <div class="px-5 py-6 space-y-5">
              <p class="text-sm text-gray-500">Tambah/hapus daftar report type dari Data Service.</p>
              <div class="overflow-hidden rounded-lg border border-[#c8e8f2]">
                <table class="min-w-full divide-y divide-[#e5f4fa] text-sm">
                  <thead class="bg-[#02A2DC] text-left text-xs font-semibold uppercase tracking-wider text-white">
                    <tr>
                      <th class="w-14 px-4 py-3">Select</th>
                      <th class="px-4 py-3">Report Type*</th>
                      <th class="px-4 py-3">Description*</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-[#eef6fa] bg-white">
                    <tr v-for="type in reportTypes" :key="type.rec_id || type.reptype" class="cursor-pointer transition" :class="selectedReportTypeCode === type.reptype ? 'bg-[#e6f7ff]' : 'hover:bg-[#f4fbfe]'" @click="selectReportType(type.reptype)">
                      <td class="px-4 py-3">
                        <input type="radio" name="selectedReportType" class="h-4 w-4 cursor-pointer accent-[#02A2DC]" :checked="selectedReportTypeCode === type.reptype" @change="selectReportType(type.reptype)"/>
                      </td>
                      <td class="px-4 py-3 font-semibold text-gray-700">{{ type.reptype }}</td>
                      <td class="px-4 py-3 text-gray-600">{{ type.description }}</td>
                    </tr>
                    <tr v-if="reportTypes.length === 0">
                      <td class="px-4 py-6 text-center text-sm text-gray-500" colspan="3">Belum ada report type.</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <!-- Add new type -->
              <div v-if="isAddingReportType" class="rounded-md border border-dashed border-[#c8e8f2] bg-[#fdfefe] p-4">
                <div class="grid gap-4 md:grid-cols-2">
                  <div>
                    <label class="text-sm font-semibold text-gray-700">Report Type<span class="text-red-500">*</span></label>
                    <input v-model="newReportType.code" type="text" placeholder="Misal: F2" class="mt-2 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-[#02A2DC] focus:outline-none focus:ring-1 focus:ring-[#02A2DC]" />
                    <p v-if="reportTypeFormErrors.code" class="mt-1 text-xs text-red-500">{{ reportTypeFormErrors.code }}</p>
                  </div>
                  <div>
                    <label class="text-sm font-semibold text-gray-700">Description<span class="text-red-500">*</span></label>
                    <input v-model="newReportType.description" type="text" placeholder="Masukkan deskripsi" class="mt-2 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-[#02A2DC] focus:outline-none focus:ring-1 focus:ring-[#02A2DC]" />
                    <p v-if="reportTypeFormErrors.description" class="mt-1 text-xs text-red-500">{{ reportTypeFormErrors.description }}</p>
                  </div>
                </div>
                <div class="mt-4 flex justify-end gap-2">
                  <button class="rounded-md bg-[#02A2DC] px-4 py-2 text-sm font-semibold text-white shadow hover:bg-[#0191c4]" @click="submitNewReportType">Add</button>
                </div>
              </div>

              <div class="flex flex-wrap items-center justify-between gap-3">
                <button class="rounded-md border border-[#02A2DC] px-4 py-2 text-sm font-semibold text-[#02A2DC] hover:bg-[#e6f7ff]" @click="startNewReportTypeEntry">Add</button>
                <button class="rounded-md border border-red-300 px-4 py-2 text-sm font-semibold text-red-500 hover:bg-red-50 disabled:cursor-not-allowed disabled:border-gray-200 disabled:text-gray-400" :disabled="!selectedReportTypeObj" @click="removeSelectedReportType">
                  Remove
                </button>
              </div>
            </div>
          </div>
        </section>
      </transition>

      <!-- Filter/Open -->
      <div class="px-6 py-6">
        <div class="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 items-end">
          <div>
            <label class="text-sm font-semibold text-gray-700">Report Type<span class="text-red-500">*</span></label>
            <select v-model="selection.reportType" class="mt-2 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-[#02A2DC] focus:outline-none focus:ring-1 focus:ring-[#02A2DC]">
              <option value="" disabled>Select report type</option>
              <option v-for="type in reportTypes" :key="type.rec_id || type.reptype" :value="type.reptype">
                {{ type.reptype }} - {{ type.description }}
              </option>
            </select>
          </div>

          <div>
            <label class="text-sm font-semibold text-gray-700">Book Model<span class="text-red-500">*</span></label>
            <select v-model="selection.modelId" :disabled="!selection.reportType" class="mt-2 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-[#02A2DC] focus:outline-none focus:ring-1 focus:ring-[#02A2DC]">
              <option value="" disabled>Select book model</option>
              <option v-for="model in availableModels" :key="model.rec_id || model.book_model" :value="model.book_model">
                {{ model.book_model }} - {{ model.description }}
              </option>
            </select>
          </div>

          <div>
            <button class="w-full rounded-md bg-[#02A2DC] px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-[#0191c4] disabled:cursor-not-allowed disabled:bg-gray-300 mt-6" :disabled="!selection.modelId" @click="handleOpen">
              Open
            </button>
          </div>
        </div>
      </div>

      <!-- Form Book Model -->
      <transition name="slide-fade">
        <section v-if="showForm" class="border-b border-[#c8e8f2] bg-[#f8fdff] px-6 py-6">
          <div class="rounded-md border border-[#c8e8f2] bg-white shadow-sm">
            <div class="flex flex-wrap items-center justify-between gap-3 border-b border-[#c8e8f2] bg-[#ecf7fb] px-5 py-4">
              <h4 class="text-base font-semibold text-gray-700">
                {{ isEditing ? 'Edit Book Model' : 'New Book Model' }}
              </h4>
              <div class="flex flex-wrap items-center gap-2">
                <button class="rounded-md border border-[#02A2DC] px-4 py-2 text-sm font-semibold text-[#02A2DC] hover:bg-[#e6f7ff]" @click="handleBack">Back</button>
                <button class="rounded-md bg-[#02A2DC] px-4 py-2 text-sm font-semibold text-white shadow hover:bg-[#0191c4]" @click="handleSave">Save</button>
              </div>
            </div>

            <div class="px-5 py-6">
              <div class="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                <div class="md:col-span-1">
                  <label class="text-sm font-semibold text-gray-700">Book Model<span class="text-red-500">*</span></label>
                  <input v-model="form.bookModel" type="text" placeholder="Enter book model name" :readonly="isEditing" class="mt-2 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-[#02A2DC] focus:outline-none focus:ring-1 focus:ring-[#02A2DC]" />
                  <p v-if="errors.bookModel" class="mt-1 text-xs text-red-500">{{ errors.bookModel }}</p>
                </div>
                <div class="md:col-span-1 xl:col-span-2">
                  <label class="text-sm font-semibold text-gray-700">Description<span class="text-red-500">*</span></label>
                  <textarea v-model="form.description" rows="3" placeholder="Provide a short description" class="mt-2 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-[#02A2DC] focus:outline-none focus:ring-1 focus:ring-[#02A2DC]"></textarea>
                  <p v-if="errors.description" class="mt-1 text-xs text-red-500">{{ errors.description }}</p>
                </div>
                <div class="md:col-span-1">
                  <label class="text-sm font-semibold text-gray-700">Chart of Account<span class="text-red-500">*</span></label>
                  <input v-model="form.chartOfAccount" type="text" placeholder="COA reference" class="mt-2 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-[#02A2DC] focus:outline-none focus:ring-1 focus:ring-[#02A2DC]" />
                  <p v-if="errors.chartOfAccount" class="mt-1 text-xs text-red-500">{{ errors.chartOfAccount }}</p>
                </div>
                <div class="md:col-span-1">
                  <label class="text-sm font-semibold text-gray-700">Report Type<span class="text-red-500">*</span></label>
                  <select v-model="form.reportType" class="mt-2 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-[#02A2DC]">
                    <option value="" disabled>Select report type</option>
                    <option v-for="type in reportTypes" :key="type.reptype" :value="type.reptype">{{ type.reptype }} - {{ type.description }}</option>
                  </select>
                  <p v-if="errors.reportType" class="mt-1 text-xs text-red-500">{{ errors.reportType }}</p>
                </div>
                <div class="md:col-span-1">
                  <label class="text-sm font-semibold text-gray-700">Calculation<span class="text-red-500">*</span></label>
                  <select v-model="form.calculation" class="mt-2 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-[#02A2DC]">
                    <option value="" disabled>Select calculation</option>
                    <option v-for="option in calculationOptions" :key="option" :value="option">{{ option }}</option>
                  </select>
                  <p v-if="errors.calculation" class="mt-1 text-xs text-red-500">{{ errors.calculation }}</p>
                </div>
              </div>

              <div class="mt-6 overflow-hidden rounded-lg border border-[#c8e8f2]">
                <table class="min-w-full divide-y divide-[#e5f4fa] text-sm">
                  <thead class="bg-[#02A2DC] text-left text-xs font-semibold uppercase tracking-wider text-white">
                    <tr>
                      <th class="px-4 py-3">Line</th>
                      <th class="px-4 py-3">Account</th>
                      <th class="px-4 py-3">Description</th>
                      <th class="px-4 py-3">Sum Lines</th>
                      <th class="px-4 py-3">Formula</th>
                      <th class="px-4 py-3">Cr.</th>
                      <th class="px-4 py-3">Format</th>
                      <th class="px-4 py-3">Display</th>
                      <th class="px-4 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-[#eef6fa] bg-white">
                    <tr v-for="(row, index) in form.details" :key="row.rid || index" class="hover:bg-[#f4fbfe]">
                      <td class="px-4 py-3"><input v-model="row.line" type="text" class="w-full rounded border border-gray-300 px-2 py-1 text-xs focus:border-[#02A2DC]"/></td>
                      <td class="px-4 py-3"><input v-model="row.account" type="text" class="w-full rounded border border-gray-300 px-2 py-1 text-xs focus:border-[#02A2DC]"/></td>
                      <td class="px-4 py-3"><input v-model="row.description" type="text" class="w-full rounded border border-gray-300 px-2 py-1 text-xs focus:border-[#02A2DC]"/></td>
                      <td class="px-4 py-3"><input v-model="row.sumLines" type="text" class="w-full rounded border border-gray-300 px-2 py-1 text-xs focus:border-[#02A2DC]"/></td>
                      <td class="px-4 py-3"><input v-model="row.formula" type="text" class="w-full rounded border border-gray-300 px-2 py-1 text-xs focus:border-[#02A2DC]"/></td>
                      <td class="px-4 py-3 text-center"><input v-model="row.credit" type="checkbox" class="h-4 w-4 accent-[#02A2DC]"/></td>
                      <td class="px-4 py-3"><input v-model="row.format" type="text" class="w-full rounded border border-gray-300 px-2 py-1 text-xs focus:border-[#02A2DC]"/></td>
                      <td class="px-4 py-3"><input v-model="row.display" type="text" class="w-full rounded border border-gray-300 px-2 py-1 text-xs focus:border-[#02A2DC]"/></td>
                      <td class="px-4 py-3 text-right">
                        <button class="rounded-md border border-red-300 px-3 py-1 text-xs font-semibold text-red-500 hover:bg-red-50" @click="removeDetailRow(index)">Remove</button>
                      </td>
                    </tr>
                    <tr v-if="form.details.length === 0">
                      <td class="px-4 py-6 text-center text-sm text-gray-500" colspan="9">No detail lines yet.</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div class="mt-4 flex flex-wrap items-center justify-between gap-3">
                <div class="text-xs text-gray-500">Configure line breakdown.</div>
                <div class="flex flex-wrap items-center gap-2">
                  <button class="rounded-md border border-[#02A2DC] px-4 py-2 text-sm font-semibold text-[#02A2DC] hover:bg-[#e6f7ff]" @click="addDetailRow">Add</button>
                  <button class="rounded-md border border-[#02A2DC] px-4 py-2 text-sm font-semibold text-[#02A2DC] hover:bg-[#e6f7ff] disabled:cursor-not-allowed disabled:border-gray-200 disabled:text-gray-400" :disabled="form.details.length === 0" @click="removeLastDetailRow">Remove</button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import {
  getReportTypes,
  getBookModelsByReportType,
  getBookModelHeader,
  getBookModelDetails,
  createReportType,
  deleteReportType,
  saveBookModel,
} from '@/services/modules/bookModel'

const DEFAULT_SRT = localStorage.getItem('srt') || '503aea5523f0cb8c526a019a352e15644e648e8ecb4a11f08144b633f9e1c848'

const reportTypes = ref([])
const bookModels = ref([])
const loading = ref(false)
const fetchError = ref('')

const showReportTypeManager = ref(false)
const isAddingReportType = ref(false)
const newReportType = ref({ code: '', description: '' })
const reportTypeFormErrors = ref({})
const selectedReportTypeCode = ref('')
const selectedReportTypeObj = computed(() => reportTypes.value.find(t => t.reptype === selectedReportTypeCode.value) || null)

const calculationOptions = ['Periodic', 'Summary'] // mapped ke caltype

const createDetailRow = () => ({
  rid: '',
  line: '',
  account: '',
  description: '',
  sumLines: '',
  formula: '',
  credit: false,
  format: '',
  display: '',
})

const createEmptyForm = () => ({
  headerRid: '',
  bookModel: '',
  description: '',
  chartOfAccount: '',
  reportType: '',
  calculation: 'Periodic',
  details: [createDetailRow()],
})

const showForm = ref(false)
const isEditing = ref(false)
const errors = ref({})
const form = ref(createEmptyForm())

const selection = ref({
  reportType: '',
  modelId: '',
})
const availableModels = computed(() => {
  if (!selection.value.reportType) return []
  return bookModels.value
})
const originalDetailRids = ref([]) // WHY: track DEL

function toggleReportTypeManager() {
  showReportTypeManager.value = !showReportTypeManager.value
  if (!showReportTypeManager.value) {
    isAddingReportType.value = false
    resetReportTypeEntry()
  }
}
function startNewReportTypeEntry() {
  isAddingReportType.value = true
  resetReportTypeEntry()
}
function resetReportTypeEntry() {
  newReportType.value = { code: '', description: '' }
  reportTypeFormErrors.value = {}
}

async function submitNewReportType() {
  const errs = {}
  const code = (newReportType.value.code || '').trim().toUpperCase()
  const description = (newReportType.value.description || '').trim()
  if (!code) errs.code = 'Report type is required.'
  if (!description) errs.description = 'Description is required.'
  if (Object.keys(errs).length) { reportTypeFormErrors.value = errs; return }
  try {
    await createReportType({ reptype: code, description }, DEFAULT_SRT)
    isAddingReportType.value = false
    resetReportTypeEntry()
    await reloadReportTypes()
  } catch (e) {
    alert(e?.message || 'Gagal membuat report type')
  }
}

async function removeSelectedReportType() {
  if (!selectedReportTypeObj.value) return
  if (!confirm(`Hapus report type "${selectedReportTypeObj.value.reptype}"?`)) return
  try {
    await deleteReportType({ rec_id: selectedReportTypeObj.value.rec_id }, DEFAULT_SRT)
    if (selection.value.reportType === selectedReportTypeObj.value.reptype) {
      selection.value.reportType = ''
      selection.value.modelId = ''
      bookModels.value = []
    }
    selectedReportTypeCode.value = ''
    await reloadReportTypes()
  } catch (e) {
    alert(e?.message || 'Gagal menghapus report type')
  }
}

function selectReportType(code) {
  selectedReportTypeCode.value = code
}

async function reloadReportTypes() {
  try {
    const list = await getReportTypes(DEFAULT_SRT)
    reportTypes.value = list
  } catch (e) {
    alert(e?.message || 'Gagal memuat report types')
  }
}

async function loadBookModelsForSelectedType() {
  if (!selection.value.reportType) { bookModels.value = []; return }
  loading.value = true
  fetchError.value = ''
  try {
    bookModels.value = await getBookModelsByReportType(selection.value.reportType, DEFAULT_SRT)
  } catch (e) {
    fetchError.value = e?.message || 'Gagal memuat book model list'
    bookModels.value = []
  } finally {
    loading.value = false
  }
}

async function loadAllBasics() {
  loading.value = true
  fetchError.value = ''
  try {
    reportTypes.value = await getReportTypes(DEFAULT_SRT)
  } catch (e) {
    fetchError.value = e?.message || 'Gagal memuat report types'
  } finally {
    loading.value = false
  }
}

onMounted(() => { loadAllBasics() })

watch(() => selection.value.reportType, async () => {
  selection.value.modelId = ''
  await loadBookModelsForSelectedType()
})

function resetFormState() {
  form.value = createEmptyForm()
  errors.value = {}
  isEditing.value = false
  originalDetailRids.value = []
}

function handleNew() {
  resetFormState()
  form.value.reportType = selection.value.reportType || ''
  showForm.value = true
}

function validateForm() {
  const next = {}
  if (!form.value.bookModel.trim()) next.bookModel = 'Book model is required.'
  if (!form.value.description.trim()) next.description = 'Description is required.'
  if (!form.value.chartOfAccount.trim()) next.chartOfAccount = 'Chart of Account is required.'
  if (!form.value.reportType) next.reportType = 'Report type is required.'
  if (!form.value.calculation) next.calculation = 'Calculation is required.'
  errors.value = next
  return Object.keys(next).length === 0
}

async function handleSave() {
  if (!validateForm()) return
  try {
    const payload = {
      header: {
        rid: form.value.headerRid || '',
        book_model: form.value.bookModel,
        reptype: form.value.reportType,
        caltype: form.value.calculation,
        coa: form.value.chartOfAccount,
        description: form.value.description,
      },
      details: (form.value.details || []).map(d => ({
        rid: d.rid || '',
        line: d.line || '',
        account: d.account || '',
        description: d.description || '',
        sumLines: d.sumLines || '',
        formula: d.formula || '',
        credit: !!d.credit,
        format: d.format || '',
        display: d.display || '',
      })),
      deletedDetailRids: originalDetailRids.value.filter((rid) => !form.value.details.some(d => d.rid === rid)),
    }
    await saveBookModel(payload, DEFAULT_SRT)
    alert('Saved.')
    await loadBookModelsForSelectedType()
    handleBack()
  } catch (e) {
    alert(e?.message || 'Gagal menyimpan Book Model')
  }
}

function handleBack() {
  resetFormState()
  showForm.value = false
}

function addDetailRow() {
  form.value.details = [...form.value.details, createDetailRow()]
}
function removeDetailRow(index) {
  form.value.details = form.value.details.filter((_, i) => i !== index)
}
function removeLastDetailRow() {
  if (!form.value.details.length) return
  form.value.details = form.value.details.slice(0, -1)
}

async function handleOpen() {
  if (!selection.value.modelId) return
  try {
    loading.value = true
    const hdr = await getBookModelHeader(selection.value.modelId, DEFAULT_SRT)
    const dtl = await getBookModelDetails(selection.value.modelId, DEFAULT_SRT)
    if (!hdr) throw new Error('Header tidak ditemukan')
    form.value = {
      headerRid: hdr.rec_id || '',
      bookModel: hdr.book_model || '',
      description: hdr.description || '',
      chartOfAccount: hdr.coa || '',
      reportType: hdr.reptype || '',
      calculation: hdr.caltype || 'Periodic',
      details: (dtl || []).map((d) => ({ ...d })),
    }
    originalDetailRids.value = (dtl || []).map((d) => d.rid).filter(Boolean)
    errors.value = {}
    isEditing.value = true
    showForm.value = true
  } catch (e) {
    alert(e?.message || 'Gagal membuka Book Model')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.fade-enter-active,.fade-leave-active{transition:opacity .2s ease}
.fade-enter-from,.fade-leave-to{opacity:0}
.slide-fade-enter-active{transition:all .25s ease}
.slide-fade-enter-from{opacity:0;transform:translateY(-8px)}
.slide-fade-leave-active{transition:all .2s ease}
.slide-fade-leave-to{opacity:0;transform:translateY(-6px)}
</style>
