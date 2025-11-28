<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <h2 class="text-xl font-bold mb-4">Accounting</h2>

    <div class="bg-white rounded-lg shadow-md p-6 mb-6">
      <div class="mb-6">
        <h3 class="text-lg font-semibold mb-4">Journal</h3>

        <!-- Search Input -->
        <div class="relative w-full md:w-1/3 mb-6 mx-auto">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Search"
            class="w-full p-3 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <span class="material-icons absolute right-3 top-3 text-gray-400">search</span>
        </div>

        <!-- Status Dropdown -->
        <div class="mb-6">
          <label class="block text-base font-medium mb-2">Status</label>
          <select
            v-model="selectedStatus"
            :class="[
              'w-full md:w-1/3 p-3 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-400',
              selectedStatus === '' ? 'text-gray-400' : 'text-gray-900',
            ]"
          >
            <option value="">All Status</option>
            <option value="Open">Open</option>
            <option value="Closed">Closed</option>
          </select>
        </div>

        <!-- Tombol Add New Transaction -->
        <div class="flex justify-end mb-6">
          <button
            @click="showForm = true"
            class="flex items-center justify-center bg-[#02A2DC] hover:bg-[#0191b8] text-white px-6 py-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            <span
              class="w-8 h-8 flex items-center justify-center bg-[#02A2DC] border-2 border-white rounded-full text-white text-lg font-bold mr-2"
              >+</span
            >
            <span class="text-lg font-semibold">Add New Transaction</span>
          </button>
        </div>

        <!-- Table Display -->
        <div v-if="!showForm">
          <div class="overflow-x-auto border border-gray-200 rounded">
            <table class="min-w-[1200px] w-full text-sm table-fixed">
              <thead class="bg-[#02A2DC] text-white font-bold">
                <tr>
                  <th class="p-4 border border-black text-center">
                    <div class="flex flex-col leading-tight">
                      <span>Document</span>
                      <span>Number</span>
                    </div>
                  </th>
                  <th class="p-4 border border-black">Doc Type</th>
                  <th class="p-4 border border-black">Doc Ref</th>
                  <th class="p-4 border border-black">Doc Date</th>
                  <th class="p-4 border border-black">Posting Date</th>
                  <th class="p-4 border border-black">Currency</th>
                  <th class="p-4 border border-black">Company</th>
                  <th class="p-4 border border-black">Business Area</th>
                  <th class="p-4 border border-black">Description</th>
                  <th class="p-4 border border-black">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, index) in filteredTransactions"
                  :key="index"
                  class="text-center hover:bg-gray-50"
                >
                  <td class="p-4 border border-white">{{ item.docNo }}</td>
                  <td class="p-4 border border-white">OTJ</td>
                  <td class="p-4 border border-white">{{ item.docRef }}</td>
                  <td class="p-4 border border-white">{{ item.docDate }}</td>
                  <td class="p-4 border border-white">{{ item.docDate }}</td>
                  <td class="p-4 border border-white">IDR</td>
                  <td class="p-4 border border-white">{{ item.company }}</td>
                  <td class="p-4 border border-white">{{ item.businessArea }}</td>
                  <td class="p-4 border border-white">{{ item.description }}</td>
                  <td class="p-4 border border-white">
                    <button
                      @click="selectTransaction(item)"
                      class="bg-[#02A2DC] hover:bg-[#0191b8] text-white p-2 rounded-full flex items-center justify-center mx-auto"
                      title="View"
                    >
                      <span class="material-icons text-sm">visibility</span>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Form View -->
        <div v-if="showForm" class="grid grid-cols-2 gap-6 mt-6">
          <!-- Form Input Kiri -->
          <div class="flex flex-col space-y-4">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Company</label>
              <input
                class="w-full border border-gray-300 rounded-md p-2 bg-white"
                :value="selected.company + ' - Koperasi'"
                disabled
              />
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Supplier</label>
              <input
                class="w-full border border-gray-300 rounded-md p-2 bg-white"
                :value="selected.supplier"
                disabled
              />
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Currency</label>
              <input
                class="w-full border border-gray-300 rounded-md p-2 bg-white"
                value="IDR"
                disabled
              />
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Payable Acc</label>
              <input
                class="w-full border border-gray-300 rounded-md p-2 bg-white"
                value="1-06-10"
                disabled
              />
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Payable Amount</label>
              <input
                class="w-full border border-gray-300 rounded-md p-2 bg-white"
                :value="formatAmount(selected.localAmount)"
                disabled
              />
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Status</label>
              <input
                class="w-full border border-gray-300 rounded-md p-2 bg-white"
                value="Unpaid"
                disabled
              />
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Description</label>
              <textarea
                class="w-full border border-gray-300 rounded-md p-2 bg-white"
                rows="2"
                disabled
              >
Penjualan Barang</textarea
              >
            </div>
          </div>

          <!-- Form Input Kanan -->
          <div class="flex flex-col space-y-4">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Doc Number</label>
              <input
                class="w-full border border-gray-300 rounded-md p-2 bg-white"
                :value="selected.docNo"
                disabled
              />
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Doc Ref</label>
              <input
                class="w-full border border-gray-300 rounded-md p-2 bg-white"
                :value="selected.docRef"
                disabled
              />
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Doc Date</label>
              <input
                class="w-full border border-gray-300 rounded-md p-2 bg-white"
                :value="selected.docDate"
                disabled
              />
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Posting Date</label>
              <input
                class="w-full border border-gray-300 rounded-md p-2 bg-white"
                :value="selected.docDate"
                disabled
              />
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Payment Account</label>
              <select class="w-full border border-gray-300 rounded-md p-2 bg-white" disabled>
                <option>Select Account</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Paid</label>
              <input
                class="w-full border border-gray-300 rounded-md p-2 bg-white"
                value="0"
                disabled
              />
            </div>
          </div>
        </div>
        <div v-if="showForm" class="grid grid-cols-2 gap-6 mt-6">
          <!-- Tombol -->
          <div class="col-span-2 flex justify-center">
            <button
              @click="showForm = false"
              class="bg-[#02A2DC] text-white px-4 py-2 rounded shadow hover:bg-[#0191b8]"
            >
              Close
            </button>
          </div>

          <!-- Tombol -->
          <div class="col-span-2 flex justify-center mt-4 gap-3">
            <button class="bg-[#02A2DC] text-white px-4 py-2 rounded shadow hover:bg-[#0191b8]">
              Save
            </button>
            <button class="border border-[#02A2DC] text-[#02A2DC] px-4 py-2 rounded">Cancel</button>
            <button
              class="border border-[#02A2DC] text-[#02A2DC] px-4 py-2 rounded flex items-center gap-1"
            >
              Payment <span class="material-icons text-sm">payments</span>
            </button>
            <button
              class="border border-[#02A2DC] text-[#02A2DC] px-4 py-2 rounded flex items-center gap-1"
            >
              Remove <span class="material-icons text-sm">delete</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const showForm = ref(false)
const selected = ref({})
const searchQuery = ref('')
const selectedStatus = ref('')

const transactions = ref([
  {
    docNo: '21000000531',
    docRef: '75000000115',
    docDate: '30-01-2025',
    supplier: 'EMP',
    localAmount: 1000000,
    company: '1000',
    businessArea: 'SIMP',
    description: 'Angsuran Anggota',
  },
  {
    docNo: '21000000532',
    docRef: '75000000116',
    docDate: '31-01-2025',
    supplier: 'EMP',
    localAmount: 2000000,
    company: '1000',
    businessArea: 'SIMP',
    description: 'Angsuran Anggota',
  },
  {
    docNo: '21000000533',
    docRef: '75000000117',
    docDate: '01-02-2025',
    supplier: 'EMP',
    localAmount: 3000000,
    company: '1000',
    businessArea: 'SIMP',
    description: 'Angsuran Anggota',
  },
])

const filteredTransactions = computed(() => {
  return transactions.value.filter(
    (item) =>
      item.docNo.includes(searchQuery.value) ||
      item.docRef.includes(searchQuery.value) ||
      item.supplier.includes(searchQuery.value),
  )
})

function formatAmount(value) {
  return parseFloat(value).toLocaleString('id-ID')
}

function selectTransaction(item) {
  selected.value = item
  showForm.value = true
}
</script>

<style scoped>
table {
  border-collapse: collapse;
}

th,
td {
  text-align: center;
  vertical-align: middle;
}
</style>
