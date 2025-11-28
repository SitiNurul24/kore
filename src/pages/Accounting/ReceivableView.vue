<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <h2 class="text-xl font-bold mb-4">Accounting</h2>

    <!-- Form View -->
    <div v-if="showForm" class="bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 class="text-lg font-semibold">Receivable</h3>

      <!-- View Data Button -->
      <button
        @click="showForm = false"
        class="flex items-center text-[#02A2DC] font-medium gap-2 hover:underline mt-2"
      >
        <span class="w-5 h-5 flex items-center justify-center rounded-full border border-[#02A2DC]">
          <span class="material-icons text-[14px] text-[#02A2DC]">arrow_back</span>
        </span>
        View Data
      </button>

      <hr class="border border-gray-200 my-4" />

      <!-- Tombol Aksi -->
      <div class="flex justify-end gap-2 mb-6">
        <button
          :class="[
            activeAction === 'save' ? 'btn-primary' : 'btn-outline',
            'px-8 py-2 text-sm h-10 min-w-[140px]',
          ]"
          @click="setActiveAction('save')"
        >
          <div class="flex items-center justify-center gap-1 w-full">
            Save <span class="text"></span>
          </div>
        </button>

        <button
          :class="[
            activeAction === 'cancel' ? 'btn-primary' : 'btn-outline',
            'px-4 py-2 text-sm h-10 min-w-[140px]',
          ]"
          @click="setActiveAction('cancel')"
        >
          <div class="flex items-center justify-center gap-1 w-full">
            Cancel <span class="text"></span>
          </div>
        </button>

        <button
          :class="[
            activeAction === 'payment' ? 'btn-primary' : 'btn-outline',
            'px-4 py-2 text-sm h-10 min-w-[140px]',
          ]"
          @click="setActiveAction('payment')"
        >
          <div class="flex items-center justify-center gap-1 w-full">
            Payment <span class="material-icons text-sm">payments</span>
          </div>
        </button>

        <button
          :class="[
            activeAction === 'print-invoice' ? 'btn-primary' : 'btn-outline',
            'px-4 py-2 text-sm h-10 min-w-[140px]',
          ]"
          @click="setActiveAction('print-invoice')"
        >
          <div class="flex items-center justify-center gap-1 w-full">
            Print Invoice <span class="material-icons text-sm">print</span>
          </div>
        </button>

        <button
          :class="[
            activeAction === 'print-cover' ? 'btn-primary' : 'btn-outline',
            'px-4 py-2 text-sm h-10 min-w-[140px]',
          ]"
          @click="setActiveAction('print-cover')"
        >
          <div class="flex items-center justify-center gap-1 w-full">
            Print Cover <span class="material-icons text-sm">print</span>
          </div>
        </button>
      </div>

      <!-- Form Container (Centering) -->
      <div class="max-w-6xl mx-auto px-1">
        <!-- Form Grid -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-bold text-gray-700">Company</label>
            <input
              type="text"
              v-model="selectedTransaction.company"
              class="w-full border border-gray-300 rounded px-3 py-2 bg-white text-gray-500"
            />
          </div>

          <div>
            <label class="block text-sm font-bold text-gray-700">Doc Number</label>
            <input
              type="text"
              v-model="selectedTransaction.docNo"
              class="w-full border border-gray-300 rounded px-3 py-2 bg-white text-gray-500"
            />
          </div>

          <div>
            <label class="block text-sm font-bold text-gray-700">Business Area</label>
            <input
              type="text"
              v-model="selectedTransaction.businessArea"
              class="w-full border border-gray-300 rounded px-3 py-2 bg-white text-gray-500"
            />
          </div>
          <div>
            <label class="block text-sm font-bold text-gray-700">Doc Ref</label>
            <input
              type="text"
              v-model="selectedTransaction.docRef"
              class="w-full border border-gray-300 rounded px-3 py-2 bg-white text-gray-500"
            />
          </div>

          <div>
            <label class="block text-sm font-bold text-gray-700">Customer</label>
            <input
              type="text"
              v-model="selectedTransaction.customer"
              class="w-full border border-gray-300 rounded px-3 py-2 bg-white text-gray-500"
            />
          </div>
          <div>
            <label class="block text-sm font-bold text-gray-700">Doc Date</label>
            <input
              type="text"
              v-model="selectedTransaction.docDate"
              class="w-full border border-gray-300 rounded px-3 py-2 bg-white text-gray-500"
            />
          </div>

          <div>
            <label class="block text-sm font-bold text-gray-700">Currency</label>
            <input
              type="text"
              v-model="selectedTransaction.currency"
              class="w-full border border-gray-300 rounded px-3 py-2 bg-white text-gray-500"
            />
          </div>
          <div>
            <label class="block text-sm font-bold text-gray-700">Posting Date</label>
            <input
              type="text"
              v-model="selectedTransaction.postingDate"
              class="w-full border border-gray-300 rounded px-3 py-2 bg-white text-gray-500"
            />
          </div>

          <!-- Kolom Receivable Acc dan subgrid-nya -->
          <div>
            <label class="block text-sm font-bold text-gray-700">Receivable Acc</label>
            <input
              type="text"
              v-model="selectedTransaction.receivableAcc"
              class="w-full border border-gray-300 rounded px-3 py-2 bg-white text-gray-500"
            />

            <!-- Subgrid isi 3 baris 2 kolom -->
            <div class="grid grid-cols-2 gap-2 mt-2">
              <div>
                <label class="block text-sm font-bold text-gray-700">Receivable Amount</label>
                <input
                  type="text"
                  v-model="selectedTransaction.localAmount"
                  class="w-full border border-gray-300 rounded px-3 py-2 bg-white text-gray-500"
                />
              </div>
              <div>
                <label class="block text-sm font-bold text-gray-700">Payment Account</label>
                <select
                  v-model="selectedTransaction.paymentAccount"
                  class="w-full border border-gray-300 rounded px-3 py-2 bg-white text-gray-500"
                >
                  <option disabled value="">Select Account</option>
                  <option>1-01-01</option>
                  <option>1-01-02</option>
                  <option>1-01-03</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-bold text-gray-700">Status</label>
                <input
                  type="text"
                  v-model="selectedTransaction.status"
                  class="w-full border border-gray-300 rounded px-3 py-2 bg-white text-gray-500"
                />
              </div>
              <div>
                <label class="block text-sm font-bold text-gray-700">Paid</label>
                <input
                  type="text"
                  v-model="selectedTransaction.paidAmount"
                  class="w-full border border-gray-300 rounded px-3 py-2 bg-white text-gray-500"
                />
              </div>

              <!-- Description Full Width -->
              <div class="col-span-2">
                <label class="block text-sm font-bold text-gray-700">Description</label>
                <textarea
                  v-model="selectedTransaction.description"
                  class="w-full border border-gray-300 rounded px-3 py-2 bg-white text-gray-500"
                  rows="2"
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- CARD CONTAINER -->
      <div class="bg-white rounded-xl shadow-md p-6 mb-6">
        <!-- TITLE -->
        <label class="block text-gray-700 font-semibold mb-2">Additional Info</label>

        <!-- INPUT -->
        <input
          type="text"
          placeholder="Add Text"
          class="w-full border border-gray-300 rounded-md px-4 py-2 mb-6 focus:outline-none focus:ring focus:border-blue-400"
        />

        <!-- TABLE -->
        <div class="overflow-x-auto">
          <table class="min-w-full text-sm text-center border-collapse">
            <thead>
              <tr class="bg-[#00a7e1] text-white">
                <th class="py-3 px-4 border border-black">Account</th>
                <th class="py-3 px-4 border border-black">Account Name</th>
                <th class="py-3 px-4 border border-black w-[100px]">D/C</th>
                <th class="py-3 px-4 border border-black">Amount</th>
                <th class="py-3 px-4 border border-black">Description</th>
              </tr>
            </thead>
            <tbody class="text-gray-800">
              <!-- Example Row -->
              <tr class="border-b border-gray-200">
                <td class="py-2 px-4 border border-gray-200">-</td>
                <td class="py-2 px-4 border border-gray-200">-</td>
                <td class="py-2 px-4 border border-gray-200">-</td>
                <td class="py-2 px-4 border border-gray-200">-</td>
                <td class="py-2 px-4 border border-gray-200">-</td>
              </tr>
              <tr class="border-b border-gray-200">
                <td class="py-2 px-4 border border-gray-200">-</td>
                <td class="py-2 px-4 border border-gray-200">-</td>
                <td class="py-2 px-4 border border-gray-200">-</td>
                <td class="py-2 px-4 border border-gray-200">-</td>
                <td class="py-2 px-4 border border-gray-200">-</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- PAGINATION -->
        <div class="flex justify-center items-center mt-4 space-x-2 text-sm">
          <button class="text-blue-600 font-bold">1</button>
          <button class="text-gray-400 cursor-not-allowed">2</button>
          <button class="text-gray-400 cursor-not-allowed">3</button>

          <!-- Panah dalam lingkaran biru -->
          <button class="ml-2 w-8 h-8 rounded-full bg-[#00a7e1] flex items-center justify-center">
            <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M10.293 15.707a1 1 0 010-1.414L13.586 11H4a1 1 0 110-2h9.586l-3.293-3.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Table View -->
    <div v-if="!showForm" class="bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 class="text-lg font-semibold mb-4">Receivable</h3>

      <div class="relative w-full md:w-1/3 mb-6">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search"
          class="w-full p-3 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <span class="material-icons absolute right-3 top-3 text-gray-400">search</span>
      </div>

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
              <th class="p-4 border border-black">Doc Ref</th>
              <th class="p-4 border border-black">Doc Date</th>
              <th class="p-4 border border-black">Customer</th>
              <th class="p-4 border border-black">Local Amount</th>
              <th class="p-4 border border-black">Company</th>
              <th class="p-4 border border-black">Business Area</th>
              <th class="p-4 border border-black">Description</th>
              <th class="p-4 border border-black">Status</th>
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
              <td class="p-4 border border-white">{{ item.docRef }}</td>
              <td class="p-4 border border-white">{{ item.docDate }}</td>
              <td class="p-4 border border-white">{{ item.customer }}</td>
              <td class="p-4 border border-white">{{ formatAmount(item.localAmount) }}</td>
              <td class="p-4 border border-white">{{ item.company }}</td>
              <td class="p-4 border border-white">{{ item.businessArea }}</td>
              <td class="p-4 border border-white">{{ item.description }}</td>
              <td class="p-4 border border-white">{{ item.status }}</td>
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
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const showForm = ref(false)
const selectedTransaction = ref({})
const searchQuery = ref('')
const showPaymentForm = ref(false)

const transactions = ref([
  {
    docNo: '210000001',
    docRef: '75000000101',
    docDate: '30-01-2025',
    customer: 'John Doe',
    localAmount: 500000,
    company: '1000',
    businessArea: 'KEU',
    description: 'Penjualan barang',
    status: 'Paid',
    currency: 'IDR',
    postingDate: '30-01-2025',
    receivableAcc: '1-01-01',
    paymentAccount: '1-01-02',
    paidAmount: 500000,
  },

  {
    docNo: '210000001',
    docRef: '75000000101',
    docDate: '30-01-2025',
    customer: 'OTC',
    localAmount: 500000,
    company: '1000',
    businessArea: 'KEU',
    description: 'Penjualan barang',
    status: 'Paid',
    currency: 'IDR',
    postingDate: '30-01-2025',
    receivableAcc: '1-01-01',
    paymentAccount: '1-01-02',
    paidAmount: 500000,
  },
])

const filteredTransactions = computed(() => {
  return transactions.value.filter(
    (item) =>
      item.docNo.includes(searchQuery.value) ||
      item.docRef.includes(searchQuery.value) ||
      item.customer.includes(searchQuery.value),
  )
})

const activeAction = ref('') // menyimpan tombol aktif

function setActiveAction(action) {
  activeAction.value = action

  switch (action) {
    case 'save':
      handleSave()
      break
    case 'cancel':
      handleCancel()
      break
    case 'payment':
      handlePayment()
      break
    case 'print-invoice':
      handlePrintInvoice()
      break
    case 'print-cover':
      handlePrintCover()
      break
  }
}

function handlePrintCover() {
  alert('Fungsi Print Cover belum diimplementasikan.')
}

function formatAmount(value) {
  if (!value && value !== 0) return '-'
  return parseFloat(value).toLocaleString('id-ID')
}

function selectTransaction(item) {
  selectedTransaction.value = { ...item }
  showForm.value = true
}

function confirmPayment() {
  alert('Payment confirmed!')
  showPaymentForm.value = false
}

function handleSave() {
  const index = transactions.value.findIndex((t) => t.docNo === selectedTransaction.value.docNo)
  if (index !== -1) {
    transactions.value[index] = { ...selectedTransaction.value }
  } else {
    transactions.value.push({ ...selectedTransaction.value })
  }

  showForm.value = false
}

function handleCancel() {
  selectedTransaction.value = {}
  showForm.value = false
}

function handlePayment() {
  console.log('Payment clicked')
  showPaymentForm.value = true
}

function handlePrintInvoice() {
  alert('Fungsi Print Invoice belum diimplementasikan.')
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

.btn-primary {
  background-color: #02a2dc;
  color: white;
  padding: 0.5rem 1.25rem;
  font-weight: 600;
  border-radius: 0.375rem;
}

.btn-outline {
  background-color: white;
  border: 1.5px solid #02a2dc;
  color: #02a2dc;
  padding: 0.5rem 1.25rem;
  font-weight: 600;
  border-radius: 0.375rem;
}
</style>

<script>
export default {
  methods: {
    handlePayment() {
      console.log('Payment clicked')
      this.showPaymentForm = true
    },
  },
}
</script>
