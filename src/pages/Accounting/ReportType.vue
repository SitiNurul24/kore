<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <h2 class="mb-4 text-xl font-bold text-gray-700">Accounting</h2>

    <div class="overflow-hidden rounded-lg bg-white shadow">
      <div class="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 bg-[#e9f6fb] px-6 py-4">
        <div>
          <h3 class="text-lg font-semibold text-gray-700">Report Type</h3>
          <p class="text-sm text-gray-500">Kelola daftar report type yang digunakan oleh book model.</p>
        </div>
        <button
          class="rounded-md border border-[#02A2DC] px-5 py-2 text-sm font-semibold text-[#02A2DC] transition hover:bg-[#e6f7ff]"
          @click="goBackToBookModel"
        >
          Back to Book Model
        </button>
      </div>

      <div class="space-y-6 px-6 py-6">
        <section class="overflow-hidden rounded-lg border border-gray-200">
          <header class="flex flex-wrap items-center justify-between gap-3 bg-[#f4fbfe] px-5 py-4">
            <h4 class="text-base font-semibold text-gray-700">Form Report Type</h4>
            <div class="flex flex-wrap items-center gap-2">
              <button
                class="rounded-md border border-[#02A2DC] px-4 py-2 text-sm font-semibold text-[#02A2DC] transition hover:bg-[#e6f7ff]"
                @click="startNew"
              >
                Add
              </button>
              <button
                class="rounded-md bg-[#02A2DC] px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-[#0191c4] disabled:cursor-not-allowed disabled:bg-gray-300"
                :disabled="!isFormFilled"
                @click="saveCurrent"
              >
                Save
              </button>
            </div>
          </header>

          <div class="grid gap-5 border-t border-gray-200 px-5 py-5 md:grid-cols-2">
            <div>
              <label class="text-sm font-semibold text-gray-700" for="code">
                Report Type<span class="text-red-500">*</span>
              </label>
              <input
                id="code"
                v-model="form.code"
                type="text"
                placeholder="Masukkan kode report type"
                class="mt-2 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-[#02A2DC] focus:outline-none focus:ring-1 focus:ring-[#02A2DC]"
              />
              <p v-if="errors.code" class="mt-1 text-xs text-red-500">{{ errors.code }}</p>
            </div>
            <div>
              <label class="text-sm font-semibold text-gray-700" for="description">
                Description<span class="text-red-500">*</span>
              </label>
              <input
                id="description"
                v-model="form.description"
                type="text"
                placeholder="Masukkan deskripsi"
                class="mt-2 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-[#02A2DC] focus:outline-none focus:ring-1 focus:ring-[#02A2DC]"
              />
              <p v-if="errors.description" class="mt-1 text-xs text-red-500">{{ errors.description }}</p>
            </div>
          </div>
        </section>

        <section>
          <div class="flex flex-wrap items-center justify-between gap-3">
            <h4 class="text-base font-semibold text-gray-700">Daftar Report Type</h4>
            <span class="text-xs text-gray-500">Records: {{ reportTypes.length }} Page: 1</span>
          </div>

          <div class="mt-3 overflow-hidden rounded-lg border border-gray-200">
            <table class="min-w-full divide-y divide-gray-200 text-sm">
              <thead class="bg-[#02A2DC] text-left text-xs font-semibold uppercase tracking-wide text-white">
                <tr>
                  <th class="px-4 py-3">Report Type</th>
                  <th class="px-4 py-3">Description</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr
                  v-for="(item, index) in reportTypes"
                  :key="item.code"
                  :class="[
                    'cursor-pointer transition hover:bg-[#f4fbfe]',
                    selectedIndex === index ? 'bg-[#dff2ff]' : '',
                  ]"
                  @click="selectRow(index)"
                >
                  <td class="px-4 py-3 font-medium">{{ item.code }}</td>
                  <td class="px-4 py-3">{{ item.description }}</td>
                </tr>
                <tr v-if="reportTypes.length === 0">
                  <td colspan="2" class="px-4 py-6 text-center text-sm text-gray-500">
                    Belum ada report type.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="mt-4 flex flex-wrap items-center justify-end gap-2">
            <button
              class="rounded-md border border-[#02A2DC] px-4 py-2 text-sm font-semibold text-[#02A2DC] transition hover:bg-[#e6f7ff]"
              @click="startNew"
            >
              Add
            </button>
            <button
              class="rounded-md border border-red-300 px-4 py-2 text-sm font-semibold text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:border-gray-200 disabled:text-gray-400"
              :disabled="selectedIndex === -1"
              @click="removeSelected"
            >
              Remove
            </button>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  REPORT_TYPE_STORAGE_KEY,
  loadReportTypes,
  saveReportTypes,
} from '@/utils/reportTypesStore'

const router = useRouter()

const createEmptyForm = () => ({
  code: '',
  description: '',
})

const sortReportTypes = (items) =>
  [...items].sort((a, b) => a.code.localeCompare(b.code))

const reportTypes = ref(sortReportTypes(loadReportTypes()))
const selectedIndex = ref(-1)
const form = ref(createEmptyForm())
const errors = ref({})

const isFormFilled = computed(
  () => form.value.code.trim() !== '' && form.value.description.trim() !== ''
)

const goBackToBookModel = () => {
  router.push('/accounting/book-model')
}

const startNew = () => {
  form.value = createEmptyForm()
  errors.value = {}
  selectedIndex.value = -1
}

const selectRow = (index) => {
  selectedIndex.value = index
  errors.value = {}
  form.value = { ...reportTypes.value[index] }
}

const validateForm = () => {
  const nextErrors = {}
  if (!form.value.code.trim()) {
    nextErrors.code = 'Report type code wajib diisi.'
  }
  if (!form.value.description.trim()) {
    nextErrors.description = 'Deskripsi report type wajib diisi.'
  }

  const duplicateIndex = reportTypes.value.findIndex((item, idx) => {
    return (
      item.code.trim().toLowerCase() === form.value.code.trim().toLowerCase() &&
      idx !== selectedIndex.value
    )
  })

  if (duplicateIndex !== -1) {
    nextErrors.code = 'Kode report type sudah digunakan.'
  }

  errors.value = nextErrors
  return Object.keys(nextErrors).length === 0
}

const applyReportTypes = (items, focusCode = null) => {
  const sorted = sortReportTypes(items)
  reportTypes.value = sorted
  saveReportTypes(sorted)

  if (sorted.length === 0) {
    startNew()
    return
  }

  let indexToSelect = -1

  if (focusCode) {
    indexToSelect = sorted.findIndex((item) => item.code === focusCode)
  }

  if (indexToSelect === -1 && selectedIndex.value !== -1) {
    const currentCode = sorted[selectedIndex.value]?.code
    if (currentCode) {
      indexToSelect = sorted.findIndex((item) => item.code === currentCode)
    }
  }

  if (indexToSelect === -1) {
    indexToSelect = 0
  }

  selectedIndex.value = indexToSelect
  form.value = { ...sorted[indexToSelect] }
  errors.value = {}
}

const saveCurrent = () => {
  if (!validateForm()) return

  const payload = {
    code: form.value.code.trim().toUpperCase(),
    description: form.value.description.trim(),
  }

  let nextItems = [...reportTypes.value]

  if (selectedIndex.value !== -1) {
    nextItems[selectedIndex.value] = payload
  } else {
    nextItems = [...nextItems, payload]
  }

  applyReportTypes(nextItems, payload.code)
}

const removeSelected = () => {
  if (selectedIndex.value === -1) return

  const removedIndex = selectedIndex.value
  const nextItems = reportTypes.value.filter((_, idx) => idx !== removedIndex)
  const fallbackCode = nextItems[Math.min(removedIndex, nextItems.length - 1)]?.code || null

  applyReportTypes(nextItems, fallbackCode)
}

const handleStorageUpdate = (event) => {
  if (event.key !== REPORT_TYPE_STORAGE_KEY) return

  const stored = loadReportTypes()
  const focusCode = form.value.code.trim().toUpperCase() || null
  reportTypes.value = sortReportTypes(stored)

  if (!reportTypes.value.length) {
    startNew()
    return
  }

  if (focusCode) {
    const idx = reportTypes.value.findIndex((item) => item.code === focusCode)
    if (idx !== -1) {
      selectedIndex.value = idx
      form.value = { ...reportTypes.value[idx] }
      return
    }
  }

  selectedIndex.value = -1
  form.value = createEmptyForm()
}

onMounted(() => {
  if (typeof window !== 'undefined') {
    window.addEventListener('storage', handleStorageUpdate)
  }
})

onBeforeUnmount(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('storage', handleStorageUpdate)
  }
})
</script>

<style scoped>
tr.bg-\[#dff2ff\] td {
  font-weight: 600;
}
</style>
