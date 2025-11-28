<template>
  <div class="mb-6">
    <h1 class="text-2xl font-bold mb-4">Create Settlement</h1>
    <div class="flex flex-col gap-3 md:flex-row md:items-end md:justify-between mb-6">
      <button class="text-[#02A2DC] font-semibold flex items-center mb-4 md:mb-0">
        <span class="material-icons mr-2">arrow_back</span> Add New Settlement
      </button>
      <div class="flex gap-2 mb-6 items-center justify-end">
        <button class="bg-[#02A2DC] text-white px-6 py-2 rounded-md font-semibold">
          <span class="material-icons mr-2">save</span> Save
        </button>
        <button class="border border-[#02A2DC] text-[#02A2DC] px-6 py-2 rounded-md font-semibold">
          <span class="material-icons mr-2">edit</span> Update
        </button>
        <button class="border border-[#02A2DC] text-[#02A2DC] px-6 py-2 rounded-md font-semibold">
          <span class="material-icons mr-2">publish</span> Post
        </button>
        <button
          class="border border-[#02A2DC] text-[#02A2DC] px-6 py-2 rounded-md font-semibold"
          @click="showForm = false"
        >
          <span class="material-icons mr-2">cancel</span> Cancel
        </button>
        <button class="text-[#02A2DC] font-semibold flex items-center" @click="showForm = false">
          <span class="material-icons mr-2">arrow_back</span> Back
        </button>
      </div>
    </div>
    <!-- Progress Step -->
    <div class="flex items-center justify-center mb-8">
      <!-- Step 1 -->
      <button
        class="flex flex-col items-center focus:outline-none z-10"
        @click="goToStep1"
        type="button"
        style="background: transparent"
      >
        <div
          :class="[
            'w-10 h-10 flex items-center justify-center rounded-full border-2 text-lg font-bold transition-colors',
            activeStep === 1
              ? 'bg-[#02A2DC] border-[#02A2DC] text-white'
              : 'bg-white border-[#B0B0B0] text-[#B0B0B0]',
          ]"
        >
          1
        </div>
        <span
          :class="[
            'text-xs font-semibold mt-1 transition-colors',
            activeStep === 1 ? 'text-[#02A2DC]' : 'text-[#B0B0B0]',
          ]"
          >Company</span
        >
      </button>
      <!-- Garis penghubung di antara bulatan -->
      <div class="h-0.5 bg-[#B0B0B0]" style="width: 40px"></div>
      <!-- Step 2 -->
      <button
        class="flex flex-col items-center focus:outline-none z-10"
        @click="goToStep2"
        type="button"
        style="background: transparent"
      >
        <div
          :class="[
            'w-10 h-10 flex items-center justify-center rounded-full border-2 text-lg font-bold transition-colors',
            activeStep === 2
              ? 'bg-[#02A2DC] border-[#02A2DC] text-white'
              : 'bg-white border-[#B0B0B0] text-[#B0B0B0]',
          ]"
        >
          2
        </div>
        <span
          :class="[
            'text-xs font-semibold mt-1 transition-colors',
            activeStep === 2 ? 'text-[#02A2DC]' : 'text-[#B0B0B0]',
          ]"
          >Document Info</span
        >
      </button>
    </div>

    <!-- STEP 1 -->
    <div v-if="activeStep === 1">
      <div class="grid md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium mb-1">Document Number</label>
          <input
            v-model="settlementData.doc_num"
            class="w-full border border-gray-300 p-3 rounded-md"
            readonly
          />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Name</label>
          <div class="relative">
            <input
              v-model="searchQuery"
              @focus="showDropdown = true"
              @input="filterNames"
              class="w-full border border-gray-300 p-3 rounded-md"
              placeholder="Search Member"
            />
            <ul
              v-if="showDropdown && filteredMembers.length > 0"
              class="absolute w-full bg-white border mt-1 rounded-md shadow-md z-10"
            >
              <li
                v-for="(member, index) in filteredMembers"
                :key="index"
                @click="handleMemberSelect(member)"
                class="p-2 cursor-pointer hover:bg-gray-100"
              >
                {{ member.mbr_name }}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="grid md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium mb-1">Company</label>
          <input
            v-model="settlementData.mbr_company"
            class="w-full border border-gray-300 p-3 rounded-md"
            readonly
          />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">MBRID</label>
          <input
            v-model="settlementData.mbr_mbrid"
            class="w-full border border-gray-300 p-3 rounded-md"
            readonly
          />
        </div>
      </div>
      <div class="grid md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium mb-1">STL Document Number</label>
          <input
            v-model="settlementData.stl_doc_num"
            class="w-full border border-gray-300 p-3 rounded-md"
            placeholder="0000"
          />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">STL Date</label>
          <input
            v-model="settlementData.settlement_date"
            type="date"
            class="w-full border border-gray-300 p-3 rounded-md"
          />
        </div>
      </div>
      <div class="grid md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium mb-1">STL Amount</label>
          <input
            v-model="settlementData.tot_am"
            type="number"
            class="w-full border border-gray-300 p-3 rounded-md"
            placeholder="000.000.00"
          />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Description</label>
          <textarea
            v-model="settlementData.description"
            class="w-full border border-gray-300 p-3 rounded-md"
            placeholder="Add Description"
          ></textarea>
        </div>
      </div>
    </div>

    <!-- STEP 2 -->
    <div v-if="activeStep === 2">
      <div class="grid md:grid-cols-2 gap-6">
        <!-- Box 1: Data Pinjaman -->
        <div class="w-full bg-white border border-gray-200 rounded-lg p-6 shadow-lg">
          <h4 class="font-semibold text-base mb-4">Data Pinjaman</h4>
          <div class="mb-4">
            <label class="block text-sm font-medium mb-1">Document Number</label>
            <select class="w-full border border-gray-300 p-3 rounded-md"></select>
            <div>
              <label class="block text-sm font-medium mb-1">Doc Date</label>
              <input
                v-model="settlementData.settlement_date"
                type="date"
                class="w-full border border-gray-300 p-3 rounded-md"
              />
            </div>
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium mb-1">STL Document Number</label>
            <input
              type="text"
              class="w-full border border-gray-300 p-3 rounded-md"
              placeholder="Enter STL Document Number"
            />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium mb-1">STL Amount</label>
            <input
              type="text"
              class="w-full border border-gray-300 p-3 rounded-md"
              placeholder="000.000.00"
            />
          </div>
        </div>

        <!-- Box 2: Periodic Instalment -->
        <div class="w-full bg-white border border-gray-200 rounded-lg p-6 shadow-lg">
          <h4 class="font-semibold text-base mb-4">Periodic Instalment</h4>
          <div class="mb-4">
            <label class="block text-sm font-medium mb-1">SVM</label>
            <input
              type="text"
              class="w-full border border-gray-300 p-3 rounded-md"
              placeholder="Add Svm"
            />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium mb-1">SVY</label>
            <input
              type="text"
              class="w-full border border-gray-300 p-3 rounded-md"
              placeholder="Add SvY"
            />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium mb-1">EVM</label>
            <input
              type="text"
              class="w-full border border-gray-300 p-3 rounded-md"
              placeholder="Add EvM"
            />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium mb-1">EVY</label>
            <input
              type="text"
              class="w-full border border-gray-300 p-3 rounded-md"
              placeholder="Add EvY"
            />
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Tabel Settlement hanya tampil jika showForm false -->
</template>

<script setup>
import { ref, onMounted } from 'vue'
import PinjamanService from '@/services/Pinjaman/PinjamanService'

const pinjamanService = new PinjamanService()
const settlementData = ref({
  doc_num: '',
  mbr_name: '',
  mbr_company: '',
  mbr_mbrid: '',
  stl_doc_num: '',
  settlement_date: '',
  tot_am: '',
  description: '',
})

const memberOptions = ref([])
const filteredMembers = ref([])
const searchQuery = ref('')
const showDropdown = ref(false) // Menambahkan kontrol untuk menampilkan dropdown
const activeStep = ref(1) // Menentukan langkah aktif untuk progress step
onMounted(async () => {
  try {
    const response = await pinjamanService.getPinjamanSettlement()
    console.log('API Response:', response) // Cek seluruh respons API

    const data = response.tabledata
    console.log('Data yang diterima:', data) // Cek data dalam tabledata

    if (data.length > 0) {
      memberOptions.value = data.map((item) => ({
        mbr_name: item.mbr_name,
        mbr_company: item.mbr_company,
        mbr_mbrid: item.mbr_mbrid,
        doc_num: item.doc_num,
      }))
      filteredMembers.value = memberOptions.value
    } else {
      console.warn('tabledata kosong')
      filteredMembers.value = []
    }
  } catch (error) {
    console.error('Terjadi kesalahan saat mengambil data settlement pinjaman:', error)
  }
})

function goToStep2() {
  activeStep.value = 2
}

function goToStep1() {
  activeStep.value = 1
}

function filterNames() {
  filteredMembers.value = memberOptions.value.filter((member) =>
    member.mbr_name.toLowerCase().includes(searchQuery.value.toLowerCase()),
  )
}

function handleMemberSelect(selectedMember) {
  if (selectedMember) {
    settlementData.value.mbr_company = selectedMember.mbr_company
    settlementData.value.mbr_mbrid = selectedMember.mbr_mbrid
    settlementData.value.doc_num = selectedMember.doc_num
    settlementData.value.mbr_name = selectedMember.mbr_name
    searchQuery.value = selectedMember.mbr_name 
    filteredMembers.value = [] 
    showDropdown.value = false 
  }
}
</script>

<style scoped>
ul {
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #ccc;
  padding: 0;
  margin-top: 5px;
}

li {
  padding: 10px;
  cursor: pointer;
}

li:hover {
  background-color: #f0f0f0;
}
</style>
