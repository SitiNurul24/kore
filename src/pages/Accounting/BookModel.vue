<!-- ✅ Template -->
<template>
  <div class="min-h-screen bg-[#f1f5f9] p-6">
    <h2 class="mb-4 text-xl font-bold text-gray-700">Accounting</h2>

    <div class="overflow-hidden rounded-2xl bg-white shadow-sm">
      <div class="flex flex-wrap items-center justify-between gap-3 border-b border-[#dcecf6] bg-[#e9f6fb] px-6 py-5">
        <div>
          <h3 class="text-lg font-semibold text-gray-700">Book Model</h3>
          <p class="text-sm text-gray-500">Kelola template laporan dan model buku bawaan.</p>
        </div>
        <div class="flex flex-wrap items-center gap-3">
          <button
            class="rounded-full bg-[#02A2DC] px-5 py-2 text-sm font-semibold text-white shadow transition hover:bg-[#0191c4]"
            @click="handleNew"
          >
            Add New Model
          </button>
  <button
            class="rounded-full border border-[#02A2DC] px-5 py-2 text-sm font-semibold text-[#02A2DC] shadow-sm transition hover:bg-[#e6f7ff]"
            @click="toggleReportTypeManager"
          >
            Report Type
          </button>
        </div>
      </div>
 <div v-if="loading || fetchError" class="px-6 pt-4">
        <div v-if="loading" class="rounded-md bg-blue-50 px-4 py-3 text-sm text-blue-700">
          Memuat data book model dari server...
        </div>
        <div v-else class="rounded-md bg-red-50 px-4 py-3 text-sm text-red-700">
          {{ fetchError }}
        </div>
      </div>
  <transition name="slide-fade">
        <section
          v-if="showReportTypeManager"
          class="border-b border-[#c8e8f2] bg-[#f8fdff] px-6 py-6"
        >
          <div class="rounded-md border border-[#c8e8f2] bg-white shadow-sm">
            <div class="flex flex-wrap items-center justify-between gap-3 border-b border-[#c8e8f2] bg-[#ecf7fb] px-5 py-4">
              <h4 class="text-base font-semibold text-gray-700">Report Type</h4>
              <div class="flex flex-wrap items-center gap-2">
                <button
                  class="rounded-md border border-[#02A2DC] px-4 py-2 text-sm font-semibold text-[#02A2DC] hover:bg-[#e6f7ff] transition"
                  @click="startNewReportTypeEntry"
                >
                  Add
                </button>
                <button
                  class="rounded-md bg-[#02A2DC] px-4 py-2 text-sm font-semibold text-white shadow hover:bg-[#0191c4] transition"
                  @click="handleSaveReportTypes"
                >
                  Save
                </button>
              </div>
            </div>
            <div class="px-5 py-6 space-y-5">
              <p class="text-sm text-gray-500">
                Tambahkan atau hapus daftar report type yang akan muncul pada Book Model.
              </p>
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
                    <tr
                      v-for="type in reportTypes"
                      :key="type.code"
                      class="cursor-pointer transition"
                      :class="selectedReportTypeCode === type.code ? 'bg-[#e6f7ff]' : 'hover:bg-[#f4fbfe]'"
                      @click="selectReportType(type.code)"
                    >
                      <td class="px-4 py-3">
                        <input
                          type="radio"
                          name="selectedReportType"
                          class="h-4 w-4 cursor-pointer accent-[#02A2DC]"
                          :checked="selectedReportTypeCode === type.code"
                          @change="selectReportType(type.code)"
                        />
                      </td>
                      <td class="px-4 py-3 font-semibold text-gray-700">{{ type.code }}</td>
                      <td class="px-4 py-3 text-gray-600">{{ type.description }}</td>
                    </tr>
                    <tr v-if="reportTypes.length === 0">
                      <td class="px-4 py-6 text-center text-sm text-gray-500" colspan="3">
                        Belum ada report type yang tersedia.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div
                v-if="isAddingReportType"
                class="rounded-md border border-dashed border-[#c8e8f2] bg-[#fdfefe] p-4"
              >
                <div class="grid gap-4 md:grid-cols-2">
                  <div>
                    <label class="text-sm font-semibold text-gray-700" for="newReportType">Report Type<span class="text-red-500">*</span></label>
                    <input
                      id="newReportType"
                      v-model="newReportType.code"
                      type="text"
                      placeholder="Misal: F2"
                      class="mt-2 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-[#02A2DC] focus:outline-none focus:ring-1 focus:ring-[#02A2DC]"
                    />
                    <p v-if="reportTypeFormErrors.code" class="mt-1 text-xs text-red-500">{{ reportTypeFormErrors.code }}</p>
                  </div>
                  <div>
                    <label class="text-sm font-semibold text-gray-700" for="newReportTypeDescription">Description<span class="text-red-500">*</span></label>
                    <input
                      id="newReportTypeDescription"
                      v-model="newReportType.description"
                      type="text"
                      placeholder="Masukkan deskripsi"
                      class="mt-2 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-[#02A2DC] focus:outline-none focus:ring-1 focus:ring-[#02A2DC]"
                    />
                    <p v-if="reportTypeFormErrors.description" class="mt-1 text-xs text-red-500">{{ reportTypeFormErrors.description }}</p>
                  </div>
                </div>
                <div class="mt-4 flex justify-end">
                  <button
                    class="rounded-md bg-[#02A2DC] px-4 py-2 text-sm font-semibold text-white shadow hover:bg-[#0191c4] transition"
                    @click="submitNewReportType"
                  >
                    Add
                  </button>
                </div>
              </div>
              <div class="flex flex-wrap items-center justify-between gap-3">
                <button
                  class="rounded-md border border-[#02A2DC] px-4 py-2 text-sm font-semibold text-[#02A2DC] hover:bg-[#e6f7ff] transition"
                  @click="startNewReportTypeEntry"
                >
                  Add
                </button>
                <button
                  class="rounded-md border border-red-300 px-4 py-2 text-sm font-semibold text-red-500 hover:bg-red-50 disabled:cursor-not-allowed disabled:border-gray-200 disabled:text-gray-400"
                  :disabled="!selectedReportTypeCode"
                  @click="removeSelectedReportType"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </section>
      </transition>

 <!-- 🎯 Tambahan: Dropdown Report Type + Book Model + Tombol Open -->
      <div class="px-6 py-6">
        <div class="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 items-end">
          <div>
            <label class="text-sm font-semibold text-gray-700" for="selectionReportType">
              Report Type<span class="text-red-500">*</span>
            </label>
            <select
              id="selectionReportType"
              v-model="selection.reportType"
              class="mt-2 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-[#02A2DC] focus:outline-none focus:ring-1 focus:ring-[#02A2DC]"
            >
              <option value="" disabled>Select report type</option>
              <option v-for="type in reportTypes" :key="type.code" :value="type.code">
                {{ type.code }} - {{ type.description }}
              </option>
            </select>
          </div>

          <div>
            <label class="text-sm font-semibold text-gray-700" for="selectionBookModel">
              Book Model<span class="text-red-500">*</span>
            </label>
            <select
              id="selectionBookModel"
              v-model="selection.modelId"
              :disabled="!selection.reportType"
              class="mt-2 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-[#02A2DC] focus:outline-none focus:ring-1 focus:ring-[#02A2DC]"
            >
              <option value="" disabled>Select book model</option>
              <option
                v-for="model in availableModels"
                :key="model.id"
                :value="String(model.id)"
              >
                {{ model.bookModel }} - {{ model.description }}
              </option>
            </select>
          </div>

          <div>
            <button
              class="w-full rounded-md bg-[#02A2DC] px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-[#0191c4] disabled:cursor-not-allowed disabled:bg-gray-300 mt-6"
              :disabled="!selection.modelId"
              @click="handleOpen"
            >
              Open
            </button>
          </div>
        </div>
      </div>

      <transition name="slide-fade">
        <section
          v-if="showForm"
          class="border-b border-[#c8e8f2] bg-[#f8fdff] px-6 py-6"
        >
          <div class="rounded-md border border-[#c8e8f2] bg-white shadow-sm">
            <div class="flex flex-wrap items-center justify-between gap-3 border-b border-[#c8e8f2] bg-[#ecf7fb] px-5 py-4">
              <h4 class="text-base font-semibold text-gray-700">
                {{ isEditing ? 'Edit Book Model' : 'New Book Model' }}
              </h4>
              <div class="flex flex-wrap items-center gap-2">
                <button
                  class="rounded-md border border-[#02A2DC] px-4 py-2 text-sm font-semibold text-[#02A2DC] hover:bg-[#e6f7ff] transition"
                  @click="handleBack"
                >
                  Back
                </button>
                <button
                  class="rounded-md bg-[#02A2DC] px-4 py-2 text-sm font-semibold text-white shadow hover:bg-[#0191c4] transition"
                  @click="handleSave"
                >
                  Save
                </button>
                <div class="relative">
                  <button
                    class="rounded-md border border-[#02A2DC] px-4 py-2 text-sm font-semibold text-[#02A2DC] hover:bg-[#e6f7ff] transition"
                    @click="toggleCopyFrom"
                  >
                    Copy From
                  </button>
                  <transition name="fade">
                    <div
                      v-if="copyFromOpen"
                      class="absolute right-0 z-10 mt-2 w-64 rounded-md border border-[#c8e8f2] bg-white shadow-lg"
                    >
                      <div class="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                        Existing Book Models
                      </div>
                      <ul class="max-h-48 overflow-y-auto text-sm">
                        <li
                          v-for="model in bookModels"
                          :key="model.id"
                          class="border-t border-[#eef6fa] first:border-t-0"
                        >
                          <button
                            class="flex w-full items-start gap-2 px-4 py-3 text-left hover:bg-[#f4fbfe]"
                            @click="applyCopyFrom(model)"
                          >
                            <span class="mt-0.5 h-2 w-2 rounded-full bg-[#02A2DC]"></span>
                            <span>
                              <span class="block font-semibold text-gray-700">{{ model.bookModel }}</span>
                              <span class="block text-xs text-gray-500">{{ model.reportType }}</span>
                            </span>
                          </button>
                        </li>
                        <li v-if="bookModels.length === 0" class="px-4 py-3 text-sm text-gray-500">
                          No book models available yet.
                        </li>
                      </ul>
                    </div>
                  </transition>
                </div>
              </div>
            </div>

            <div class="px-5 py-6">
              <div class="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                <div class="md:col-span-1 xl:col-span-1">
                  <label class="text-sm font-semibold text-gray-700" for="bookModel">Book Model<span class="text-red-500">*</span></label>
                  <input
                    id="bookModel"
                    v-model="form.bookModel"
                    type="text"
                    placeholder="Enter book model name"
                    class="mt-2 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-[#02A2DC] focus:outline-none focus:ring-1 focus:ring-[#02A2DC]"
                  />
                  <p v-if="errors.bookModel" class="mt-1 text-xs text-red-500">{{ errors.bookModel }}</p>
                </div>
                <div class="md:col-span-1 xl:col-span-2">
                  <label class="text-sm font-semibold text-gray-700" for="description">Description<span class="text-red-500">*</span></label>
                  <textarea
                    id="description"
                    v-model="form.description"
                    rows="3"
                    placeholder="Provide a short description"
                    class="mt-2 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-[#02A2DC] focus:outline-none focus:ring-1 focus:ring-[#02A2DC]"
                  ></textarea>
                  <p v-if="errors.description" class="mt-1 text-xs text-red-500">{{ errors.description }}</p>
                </div>
                <div class="md:col-span-1 xl:col-span-1">
                  <label class="text-sm font-semibold text-gray-700" for="chartOfAccount">Chart of Account<span class="text-red-500">*</span></label>
                  <input
                    id="chartOfAccount"
                    v-model="form.chartOfAccount"
                    type="text"
                    placeholder="COA reference"
                    class="mt-2 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-[#02A2DC] focus:outline-none focus:ring-1 focus:ring-[#02A2DC]"
                  />
                  <p v-if="errors.chartOfAccount" class="mt-1 text-xs text-red-500">{{ errors.chartOfAccount }}</p>
                </div>
                <div class="md:col-span-1">
                  <label class="text-sm font-semibold text-gray-700" for="reportType">Report Type<span class="text-red-500">*</span></label>
                  <select
                    id="reportType"
                    v-model="form.reportType"
                    class="mt-2 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-[#02A2DC] focus:outline-none focus:ring-1 focus:ring-[#02A2DC]"
                  >
                    <option value="" disabled>Select report type</option>
                    <option
                      v-for="type in reportTypes"
                      :key="type.code"
                      :value="type.code"
                    >
                      {{ type.code }} - {{ type.description }}
                    </option>
                  </select>
                  <p v-if="errors.reportType" class="mt-1 text-xs text-red-500">{{ errors.reportType }}</p>
                </div>
                <div class="md:col-span-1">
                  <label class="text-sm font-semibold text-gray-700" for="calculation">Calculation<span class="text-red-500">*</span></label>
                  <select
                    id="calculation"
                    v-model="form.calculation"
                    class="mt-2 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-[#02A2DC] focus:outline-none focus:ring-1 focus:ring-[#02A2DC]"
                  >
                    <option value="" disabled>Select calculation</option>
                    <option v-for="option in calculationOptions" :key="option" :value="option">
                      {{ option }}
                    </option>
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
                    <tr v-for="(row, index) in form.details" :key="index" class="hover:bg-[#f4fbfe]">
                      <td class="px-4 py-3">
                        <input
                          v-model="row.line"
                          type="text"
                          class="w-full rounded border border-gray-300 px-2 py-1 text-xs focus:border-[#02A2DC] focus:outline-none focus:ring-1 focus:ring-[#02A2DC]"
                          placeholder="Line"
                        />
                      </td>
                      <td class="px-4 py-3">
                        <input
                          v-model="row.account"
                          type="text"
                          class="w-full rounded border border-gray-300 px-2 py-1 text-xs focus:border-[#02A2DC] focus:outline-none focus:ring-1 focus:ring-[#02A2DC]"
                          placeholder="Account"
                        />
                      </td>
                      <td class="px-4 py-3">
                        <input
                          v-model="row.description"
                          type="text"
                          class="w-full rounded border border-gray-300 px-2 py-1 text-xs focus:border-[#02A2DC] focus:outline-none focus:ring-1 focus:ring-[#02A2DC]"
                          placeholder="Description"
                        />
                      </td>
                      <td class="px-4 py-3">
                        <input
                          v-model="row.sumLines"
                          type="text"
                          class="w-full rounded border border-gray-300 px-2 py-1 text-xs focus:border-[#02A2DC] focus:outline-none focus:ring-1 focus:ring-[#02A2DC]"
                          placeholder="e.g. 1,2,3"
                        />
                      </td>
                      <td class="px-4 py-3">
                        <input
                          v-model="row.formula"
                          type="text"
                          class="w-full rounded border border-gray-300 px-2 py-1 text-xs focus:border-[#02A2DC] focus:outline-none focus:ring-1 focus:ring-[#02A2DC]"
                          placeholder="Formula"
                        />
                      </td>
                      <td class="px-4 py-3 text-center">
                        <input
                          v-model="row.credit"
                          type="checkbox"
                          class="h-4 w-4 accent-[#02A2DC]"
                        />
                      </td>
                      <td class="px-4 py-3">
                        <input
                          v-model="row.format"
                          type="text"
                          class="w-full rounded border border-gray-300 px-2 py-1 text-xs focus:border-[#02A2DC] focus:outline-none focus:ring-1 focus:ring-[#02A2DC]"
                          placeholder="Format"
                        />
                      </td>
                      <td class="px-4 py-3">
                        <input
                          v-model="row.display"
                          type="text"
                          class="w-full rounded border border-gray-300 px-2 py-1 text-xs focus:border-[#02A2DC] focus:outline-none focus:ring-1 focus:ring-[#02A2DC]"
                          placeholder="Display"
                        />
                      </td>
                      <td class="px-4 py-3 text-right">
                        <button
                          class="rounded-md border border-red-300 px-3 py-1 text-xs font-semibold text-red-500 hover:bg-red-50"
                          @click="removeDetailRow(index)"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                    <tr v-if="form.details.length === 0">
                      <td class="px-4 py-6 text-center text-sm text-gray-500" colspan="9">
                        No detail lines yet. Add a line to start building your model.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div class="mt-4 flex flex-wrap items-center justify-between gap-3">
                <div class="text-xs text-gray-500">
                  Configure the line breakdown that will be used when generating the report.
                </div>
                <div class="flex flex-wrap items-center gap-2">
                  <button
                    class="rounded-md border border-[#02A2DC] px-4 py-2 text-sm font-semibold text-[#02A2DC] hover:bg-[#e6f7ff] transition"
                    @click="addDetailRow"
                  >
                    Add
                  </button>
                  <button
                    class="rounded-md border border-[#02A2DC] px-4 py-2 text-sm font-semibold text-[#02A2DC] hover:bg-[#e6f7ff] transition disabled:cursor-not-allowed disabled:border-gray-200 disabled:text-gray-400"
                    :disabled="form.details.length === 0"
                    @click="removeLastDetailRow"
                  >
                    Remove
                  </button>
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
  deleteReportType,
  fetchBookModelDetails,
  fetchBookModelHeader,
  fetchBookModels,
  fetchReportTypes,
  saveBookModel,
  saveReportType,
} from '@/services/bookModel'

const DEFAULT_SRT = '503aea5523f0cb8c526a019a352e15644e648e8ecb4a11f08144b633f9e1c848'

const BASE_REPORT_TYPES = [
  { code: 'DSB', description: 'Dashboard Setting' },
  { code: 'F1', description: 'Financial Report' },
  { code: 'G1', description: 'Budgeting Report' },
]

const reportTypes = ref([...BASE_REPORT_TYPES])
const loadingReportTypes = ref(false)

const showReportTypeManager = ref(false)
const isAddingReportType = ref(false)
const newReportType = ref({ code: '', description: '' })
const reportTypeFormErrors = ref({})
const selectedReportTypeCode = ref('')



const calculationOptions = ['Periodic', 'Summary']

const getSrt = () => localStorage.getItem('srt') || DEFAULT_SRT

const createDetailRow = () => ({
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
  id: null,
  bookModel: '',
  description: '',
  chartOfAccount: '',
  reportType: '',
  calculation: 'Periodic',
  details: [createDetailRow()],
})

const seededBookModelDetails = [
  {
    line: '00100',
    account: '',
    description: 'Pendapatan',
    sumLines: '00110-00290',
    formula: '',
    credit: false,
    format: 'PL',
    display: 'H2',
  },
  {
    line: '00110',
    account: '4-01-01',
    description: 'Pendapatan Penjualan Umum (Retail)',
    sumLines: '',
    formula: '',
    credit: true,
    format: 'PL',
    display: 'H3',
  },
  {
    line: '00120',
    account: '4-01-02',
    description: 'Pendapatan Barang Dagang (Retail)',
    sumLines: '',
    formula: '',
    credit: true,
    format: 'PL',
    display: 'H3',
  },
  {
    line: '00130',
    account: '4-01-03',
    description: 'Pendapatan Usaha Utama',
    sumLines: '',
    formula: '',
    credit: true,
    format: 'PL',
    display: 'H3',
  },
  {
    line: '00140',
    account: '4-01-04',
    description: 'Pendapatan Usaha Jasa',
    sumLines: '',
    formula: '',
    credit: true,
    format: 'PL',
    display: 'H3',
  },
  {
    line: '00150',
    account: '4-01-05',
    description: 'Pendapatan Usaha Lain',
    sumLines: '',
    formula: '',
    credit: true,
    format: 'PL',
    display: 'H3',
  },
  {
    line: '00160',
    account: '4-01-06',
    description: 'Pendapatan Sewa Lokasi',
    sumLines: '',
    formula: '',
    credit: true,
    format: 'PL',
    display: 'H3',
  },
  {
    line: '00170',
    account: '4-01-07',
    description: 'Pendapatan Sewa Peralatan',
    sumLines: '',
    formula: '',
    credit: true,
    format: 'PL',
    display: 'H3',
  },
  {
    line: '00180',
    account: '4-01-08',
    description: 'Pendapatan Sewa Anggota',
    sumLines: '',
    formula: '',
    credit: true,
    format: 'PL',
    display: 'H3',
  },
  {
    line: '00190',
    account: '4-01-09',
    description: 'Pendapatan Sewa Non Anggota',
    sumLines: '',
    formula: '',
    credit: true,
    format: 'PL',
    display: 'H3',
  },
  {
    line: '00200',
    account: '4-01-10',
    description: 'Pendapatan Penjualan Aset',
    sumLines: '',
    formula: '',
    credit: true,
    format: 'PL',
    display: 'H3',
  },
  {
    line: '00210',
    account: '4-01-11',
    description: 'Pendapatan Penjualan Sisa Bahan',
    sumLines: '',
    formula: '',
    credit: true,
    format: 'PL',
    display: 'H3',
  },
  {
    line: '00220',
    account: '4-01-12',
    description: 'Pendapatan Penjualan Scrap',
    sumLines: '',
    formula: '',
    credit: true,
    format: 'PL',
    display: 'H3',
  },
  {
    line: '00230',
    account: '4-01-13',
    description: 'Pendapatan Denda Anggota',
    sumLines: '',
    formula: '',
    credit: true,
    format: 'PL',
    display: 'H3',
  },
  {
    line: '00240',
    account: '4-01-14',
    description: 'Pendapatan Denda Non Anggota',
    sumLines: '',
    formula: '',
    credit: true,
    format: 'PL',
    display: 'H3',
  },
  {
    line: '00250',
    account: '4-01-15',
    description: 'Pendapatan Administrasi',
    sumLines: '',
    formula: '',
    credit: true,
    format: 'PL',
    display: 'H3',
  },
  {
    line: '00260',
    account: '4-01-16',
    description: 'Pendapatan Komisi',
    sumLines: '',
    formula: '',
    credit: true,
    format: 'PL',
    display: 'H3',
  },
  {
    line: '00270',
    account: '4-01-17',
    description: 'Pendapatan Bunga Bank',
    sumLines: '',
    formula: '',
    credit: true,
    format: 'PL',
    display: 'H3',
  },
  {
    line: '00280',
    account: '4-01-18',
    description: 'Pendapatan Selisih Kurs',
    sumLines: '',
    formula: '',
    credit: true,
    format: 'PL',
    display: 'H3',
  },
  {
    line: '00290',
    account: '4-01-19',
    description: 'Pendapatan Lain-Lain',
    sumLines: '',
    formula: '',
    credit: true,
    format: 'PL',
    display: 'H3',
  },
  {
    line: '00300',
    account: '',
    description: 'Total Pendapatan',
    sumLines: '00110-00290',
    formula: '',
    credit: false,
    format: 'PL',
    display: 'H2',
  },
  {
    line: '00310',
    account: '4-02-01',
    description: 'Pendapatan DB Anggota JICT',
    sumLines: '',
    formula: '',
    credit: true,
    format: 'PL',
    display: 'H3',
  },
  {
    line: '00320',
    account: '4-02-02',
    description: 'Pendapatan DB Non Anggota JICT',
    sumLines: '',
    formula: '',
    credit: true,
    format: 'PL',
    display: 'H3',
  },
  {
    line: '00330',
    account: '4-02-03',
    description: 'Pendapatan DB Perusahaan Grup',
    sumLines: '',
    formula: '',
    credit: true,
    format: 'PL',
    display: 'H3',
  },
  {
    line: '00340',
    account: '4-02-04',
    description: 'Pendapatan DB Perusahaan Non Grup',
    sumLines: '',
    formula: '',
    credit: true,
    format: 'PL',
    display: 'H3',
  },
  {
    line: '00350',
    account: '4-02-05',
    description: 'Pendapatan DB Catering Service',
    sumLines: '',
    formula: '',
    credit: true,
    format: 'PL',
    display: 'H3',
  },
  {
    line: '00360',
    account: '4-02-06',
    description: 'Pendapatan DB Layanan Lainnya',
    sumLines: '',
    formula: '',
    credit: true,
    format: 'PL',
    display: 'H3',
  },
  {
    line: '00370',
    account: '',
    description: 'Total Pendapatan DB',
    sumLines: '00310-00360',
    formula: '',
    credit: false,
    format: 'PL',
    display: 'H2',
  },
  {
    line: '00380',
    account: '',
    description: 'Total Pendapatan Usaha',
    sumLines: '00100+00370',
    formula: '',
    credit: false,
    format: 'PL',
    display: 'H1',
  },
]

const fallbackBookModels = [
  {
    id: 1,
    reportType: 'F1',
    bookModel: 'KEUPL',
    description: 'Financial report - Pendapatan Sewa',
    chartOfAccount: 'Laba Rugi',
    calculation: 'Periodic',
    details: seededBookModelDetails,
  },
  {
    id: 2,
    reportType: 'DSB',
    bookModel: 'Dashboard Summary Model',
    description: 'Dashboard Setting overview for management.',
    chartOfAccount: 'COA-DSB-01',
    calculation: 'Periodic',
    details: [
      {
        line: '100',
        account: 'DSB-100',
        description: 'KPI Snapshot',
        sumLines: '',
        formula: '',
        credit: false,
        format: 'Summary',
        display: 'Detail',
      },
    ],
  },
  {
    id: 3,
    reportType: 'G1',
    bookModel: 'Budget Planning Model',
    description: 'Budgeting report structure for yearly planning.',
    chartOfAccount: 'COA-G1-01',
    calculation: 'Summary',
    details: [
      {
        line: '200',
        account: 'G1-200',
        description: 'Projected Revenue',
        sumLines: '',
        formula: '',
        credit: false,
        format: 'Currency',
        display: 'Detail',
      },
      {
        line: '210',
        account: 'G1-210',
        description: 'Projected Expenses',
        sumLines: '',
        formula: '',
        credit: true,
        format: 'Currency',
        display: 'Detail',
      },
    ],
  },
  {
    id: 4,
    reportType: 'F1',
    bookModel: 'CONSOL',
    description: 'Consolidated balance sheet view.',
    chartOfAccount: 'Neraca',
    calculation: 'Summary',
    details: [createDetailRow()],
  },
  {
    id: 5,
    reportType: 'F1',
    bookModel: 'KEUNG',
    description: 'Standalone balance sheet for KEUNG.',
    chartOfAccount: 'Neraca',
    calculation: 'Periodic',
    details: [createDetailRow()],
  },
  {
    id: 6,
    reportType: 'F1',
    bookModel: 'KONSOLID1',
    description: 'Neraca Tes Untuk KOPERASI KITA 2',
    chartOfAccount: 'Neraca Tes Untuk KOPERASI KITA 2',
    calculation: 'Periodic',
    details: [createDetailRow()],
  },
  {
    id: 7,
    reportType: 'F1',
    bookModel: 'KONSOLID2',
    description: 'Neraca Tes Untuk KOPERASI KITA 3',
    chartOfAccount: 'Neraca Tes Untuk KOPERASI KITA 3',
    calculation: 'Periodic',
    details: [createDetailRow()],
  },
  {
    id: 8,
    reportType: 'F1',
    bookModel: 'PRMNC',
    description: 'Neraca PRM',
    chartOfAccount: 'Neraca PRM',
    calculation: 'Summary',
    details: [createDetailRow()],
  },
  {
    id: 9,
    reportType: 'F1',
    bookModel: 'PRMPL',
    description: 'Laba Rugi PRM',
    chartOfAccount: 'Laba Rugi',
    calculation: 'Periodic',
    details: [createDetailRow()],
  },
]


const bookModels = ref([...fallbackBookModels])
const loading = ref(false)
const fetchError = ref('')
const form = ref(createEmptyForm())
const errors = ref({})

const toggleReportTypeManager = () => {
  showReportTypeManager.value = !showReportTypeManager.value
  if (!showReportTypeManager.value) {
    isAddingReportType.value = false
    resetReportTypeEntry()
  }
}

const startNewReportTypeEntry = () => {
  isAddingReportType.value = true
  resetReportTypeEntry()
}

const resetReportTypeEntry = () => {
  newReportType.value = { code: '', description: '' }
  reportTypeFormErrors.value = {}
}

const loadReportTypes = async () => {
  loadingReportTypes.value = true
  try {
    const srt = getSrt()
    const types = await fetchReportTypes(srt)

    if (Array.isArray(types) && types.length) {
      reportTypes.value = types
    } else {
      reportTypes.value = [...BASE_REPORT_TYPES]
    }

    if (!selection.value.reportType && reportTypes.value.length) {
      selection.value.reportType = reportTypes.value[0].code
    }
    selectedReportTypeCode.value = ''
  } catch (error) {
    console.error('Gagal memuat report type', error)
    reportTypes.value = [...BASE_REPORT_TYPES]
  } finally {
    loadingReportTypes.value = false
  }
}

const addReportType = async ({ code, description }) => {
  const srt = getSrt()
  try {
    await saveReportType(srt, { code, description })
    await loadReportTypes()
    isAddingReportType.value = false
    resetReportTypeEntry()
  } catch (error) {
    console.error('Gagal menambahkan report type', error)
  }
}

const submitNewReportType = () => {
  if (!isAddingReportType.value) {
    isAddingReportType.value = true
  }

  const nextErrors = {}
  const code = newReportType.value.code.trim().toUpperCase()
  const description = newReportType.value.description.trim()

  if (!code) {
    nextErrors.code = 'Report type is required.'
  } else if (reportTypes.value.some((type) => type.code.toUpperCase() === code)) {
    nextErrors.code = 'Report type already exists.'
  }

  if (!description) {
    nextErrors.description = 'Description is required.'
  }

  reportTypeFormErrors.value = nextErrors
  if (Object.keys(nextErrors).length > 0) {
    return
  }

  addReportType({ code, description })
}

const selectReportType = (code) => {
  selectedReportTypeCode.value = code
}

const removeSelectedReportType = async () => {
  if (!selectedReportTypeCode.value) return

  const srt = getSrt()
  try {
    await deleteReportType(srt, { code: selectedReportTypeCode.value })
    await loadReportTypes()
  } catch (error) {
    console.error('Gagal menghapus report type', error)
  }
}

const handleSaveReportTypes = () => {
  showReportTypeManager.value = false
  isAddingReportType.value = false
  resetReportTypeEntry()
}

const showForm = ref(false)
const isEditing = ref(false)
const copyFromOpen = ref(false)
const selection = ref({
  reportType: '',
  modelId: '',
  chartOfAccount: '',
  calculation: '',
})
const availableModels = computed(() => {
  if (!selection.value.reportType) return []

  return bookModels.value.filter((item) => item.reportType === selection.value.reportType)
})
const selectedModel = computed(() =>
  availableModels.value.find(
    (item) => String(item.id) === selection.value.modelId
  )
)
const syncSelectionDetails = () => {
  if (selectedModel.value) {
    selection.value.chartOfAccount = selectedModel.value.chartOfAccount || ''
    selection.value.calculation = selectedModel.value.calculation || ''
  } else {
    selection.value.chartOfAccount = ''
    selection.value.calculation = ''
  }
}

const loadBookModels = async () => {
  loading.value = true
  fetchError.value = ''
  const srt = getSrt()
  const currentReportType = selection.value.reportType

  try {
    const models = await fetchBookModels(srt, currentReportType)

    if (Array.isArray(models) && models.length) {
      bookModels.value = models.map((item) => ({ ...item, reportType: currentReportType }))
      return
    }

    fetchError.value = 'Book model dari server kosong. Menampilkan data template bawaan.'
    bookModels.value = [...fallbackBookModels]
  } catch (error) {
    fetchError.value =
      error?.friendlyMessage ||
      error?.message ||
      'Gagal memuat data book model dari server.'

    bookModels.value = [...fallbackBookModels]
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadReportTypes().then(() => {
    if (selection.value.reportType) {
      loadBookModels()
    }
  })
})

watch(
  () => selection.value.reportType,
  () => {
    if (selection.value.reportType) {
      loadBookModels()
    }

    const stillExists = availableModels.value.some(
      (item) => String(item.id) === selection.value.modelId
    )

    if (!stillExists) {
       selection.value.modelId = ''

    }

    syncSelectionDetails()
  },
  { immediate: true }
)

watch(
  () => selection.value.modelId,
  () => {
    syncSelectionDetails()
  },
  { immediate: true }
)





const resetFormState = () => {
  form.value = createEmptyForm()
  errors.value = {}
  copyFromOpen.value = false
}

const handleNew = () => {
  resetFormState()
  form.value.reportType = selection.value.reportType || ''
  isEditing.value = false
  showForm.value = true
}

const handleOpen = async () => {
  if (selectedModel.value) {
    await selectModel(selectedModel.value)
  }
}


const toggleCopyFrom = () => {
  copyFromOpen.value = !copyFromOpen.value
}

const selectModel = async (model) => {
  const srt = getSrt()
  let header = model
  let details = model.details || []

  try {
    const remoteHeader = await fetchBookModelHeader(srt, model.bookModel)
    if (remoteHeader) {
      header = { ...header, ...remoteHeader }
    }

    const remoteDetails = await fetchBookModelDetails(srt, model.bookModel)
    if (Array.isArray(remoteDetails) && remoteDetails.length) {
      details = remoteDetails
    }
  } catch (error) {
    console.error('Gagal memuat detail book model', error)
  }

  form.value = {
    ...createEmptyForm(),
    ...header,
    details: details.length ? details.map((detail) => ({ ...detail })) : [createDetailRow()],
  }
  errors.value = {}
  isEditing.value = true
  showForm.value = true
  copyFromOpen.value = false
}

const applyCopyFrom = (model) => {
  const cloned = {
    bookModel: `${model.bookModel} Copy`,
    description: model.description || '',
    chartOfAccount: model.chartOfAccount || '',
    reportType: model.reportType || '',
    calculation: model.calculation || 'Periodic',
    details: (model.details || []).map((detail) => ({ ...detail })),
  }
  form.value = {
    ...createEmptyForm(),
    ...cloned,
    id: null,
  }
  isEditing.value = false
  errors.value = {}
  copyFromOpen.value = false
  showForm.value = true
}

const validateForm = () => {
  const nextErrors = {}
  if (!form.value.bookModel.trim()) {
    nextErrors.bookModel = 'Book model name is required.'
  }
  if (!form.value.description.trim()) {
    nextErrors.description = 'Description is required.'
  }
  if (!form.value.chartOfAccount.trim()) {
    nextErrors.chartOfAccount = 'Chart of account is required.'
  }
  if (!form.value.reportType) {
    nextErrors.reportType = 'Report type is required.'
  }
  if (!form.value.calculation) {
    nextErrors.calculation = 'Calculation type is required.'
  }

  errors.value = nextErrors
  return Object.keys(nextErrors).length === 0
}

const handleSave = async () => {
  if (!validateForm()) {
    return
  }

  const payload = {
    ...form.value,
    details: form.value.details.map((detail) => ({ ...detail })),
  }

  const srt = getSrt()
  const action = isEditing.value ? 'update' : 'insert'

  try {
    await saveBookModel(srt, payload, action)
    await loadBookModels()
    handleBack()
  } catch (error) {
    fetchError.value = error?.message || 'Gagal menyimpan book model.'
  }
}

const handleBack = () => {
  resetFormState()
  isEditing.value = false
  showForm.value = false
}

const addDetailRow = () => {
  form.value.details = [...form.value.details, createDetailRow()]
}

const removeDetailRow = (index) => {
  form.value.details = form.value.details.filter((_, idx) => idx !== index)
}

const removeLastDetailRow = () => {
  if (form.value.details.length === 0) return
  form.value.details = form.value.details.slice(0, -1)
}

watch(
  () => bookModels.value,
  () => {
    const exists = availableModels.value.some(
      (item) => String(item.id) === selection.value.modelId
    )

    if (!exists) {
      selection.value.modelId = ''
      syncSelectionDetails()
    }
  },
  { deep: true }
)
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-fade-enter-active {
  transition: all 0.25s ease;
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateY(-8px);
}

.slide-fade-leave-active {
  transition: all 0.2s ease;
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
