<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <h2 class="text-xl font-bold mb-4">Accounting</h2>

    <div class="bg-white rounded-lg shadow-md p-6 mb-6">
      <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h3 class="text-lg font-semibold">Payable</h3>

        <!-- Search -->
        <div class="relative w-full md:w-72">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Search"
            class="w-full p-3 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <span class="material-icons absolute right-3 top-3 text-gray-400">search</span>
        </div>
      </div>
    </div>

    <div
      v-if="actionMessage"
      class="mb-4 rounded-lg border border-[#02A2DC]/40 bg-[#02A2DC]/5 px-4 py-3 text-sm text-[#02658a]"
    >
      {{ actionMessage }}
    </div>

    <div v-if="loading" class="p-6 text-center text-sm text-gray-500">Memuat data payable...</div>
    <div v-else-if="error" class="p-6 text-center text-sm text-red-500 whitespace-pre-wrap">
      {{ error }}
    </div>
    <div v-else-if="!paginatedTransactions.length" class="p-6 text-center text-sm text-gray-500">
      Data payable tidak tersedia.
    </div>

    <!-- Table -->
    <div v-else class="overflow-x-auto border border-gray-200 rounded">
      <table class="min-w-[1000px] w-full text-sm table-fixed">
        <thead class="bg-[#02A2DC] text-white font-bold">
          <tr>
            <th class="p-4 border" style="width: 16%">Document<br />Number</th>
            <th class="p-4 border" style="width: 14%">Doc Ref</th>
            <th class="p-4 border" style="width: 14%">Doc Date</th>
            <th class="p-4 border" style="width: 18%">Supplier</th>
            <th class="p-4 border" style="width: 18%">Local Amount</th>
            <th class="p-4 border" style="width: 12%">Company</th>
            <th class="p-4 border" style="width: 8%">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, idx) in paginatedTransactions"
            :key="item.recId || item.docNo || idx"
            class="text-center hover:bg-gray-50"
          >
            <td class="p-4 border text-center">{{ item.docNo || '-' }}</td>
            <td class="p-4 border text-center">{{ item.docRef || '-' }}</td>
            <td class="p-4 border text-center">{{ item.docDateDisplay || item.docDate || '-' }}</td>
            <td class="p-4 border text-center">{{ item.supplier || '-' }}</td>
            <td class="p-4 border text-right font-semibold text-gray-800">{{ formatAmount(item.localAmount) }}</td>
            <td class="p-4 border text-center">{{ item.company || '-' }}</td>
            <td class="p-4 border">
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

    <!-- Pagination -->
    <div
      v-if="!loading && !error && filteredTransactions.length"
      class="flex flex-wrap justify-center items-center mt-4 gap-2 text-sm"
    >
      <button class="px-3 py-1 rounded border" :disabled="currentPage === 1" @click="prevPage">Prev</button>
      <template v-for="page in totalPages" :key="page">
        <button
          class="px-3 py-1 rounded"
          :class="page === currentPage ? 'bg-[#02A2DC] text-white' : 'bg-white border text-[#02A2DC]'"
          @click="goToPage(page)"
        >
          {{ page }}
        </button>
      </template>
      <button class="px-3 py-1 rounded border" :disabled="currentPage === totalPages" @click="nextPage">Next</button>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { fetchPayableListRunLib } from '@/services/modules/payable'

const router = useRouter()

const searchQuery = ref('')
const loading = ref(false)
const error = ref('')
const actionMessage = ref('')
const usingFallback = ref(false)
const transactions = ref([])

const itemsPerPage = 10
const currentPage = ref(1)

const filteredTransactions = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return transactions.value
  return transactions.value.filter((it) =>
    [it.docNo, it.docRef, it.supplier, it.company, it.status, it.description]
      .map((v) => (v ? String(v).toLowerCase() : ''))
      .some((v) => v.includes(q)),
  )
})

const totalPages = computed(() =>
  Math.max(1, Math.ceil(filteredTransactions.value.length / itemsPerPage)),
)

const paginatedTransactions = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return filteredTransactions.value.slice(start, start + itemsPerPage)
})

function nextPage() {
  if (currentPage.value < totalPages.value) currentPage.value++
}
function prevPage() {
  if (currentPage.value > 1) currentPage.value--
}
function goToPage(page) {
  currentPage.value = page
}

function formatAmount(v) {
  if (v === null || v === undefined || v === '') return '-'
  const cleaned = String(v).replace(/[^\d,-]/g, '').replace(/\.(?=\d{3}(?:\D|$))/g, '')
  const n = Number(cleaned.replace(',', '.'))
  return Number.isFinite(n) ? n.toLocaleString('id-ID') : '-'
}

function selectTransaction(item) {
  if (!item) return
  const identifier = item.recId || item.docNo
  if (!identifier) return
  router.push({
    name: 'PayableDetail',
    params: { recId: identifier },
    state: { payable: item },
  })
}

async function load() {
  loading.value = true
  error.value = ''
  usingFallback.value = false

  try {
    const resp = await fetchPayableListRunLib({ pageSize: -1, search: '' })
    transactions.value = [...resp]
    usingFallback.value = resp.__fallback === true
    currentPage.value = 1
  } catch (e) {
    console.error(e)
    error.value = e?.friendlyMessage || e?.message || 'Gagal memuat data payable.'
  } finally {
    loading.value = false
  }
}

onMounted(load)
watch(searchQuery, () => {
  currentPage.value = 1
})
</script>

<style scoped>
table { border-collapse: collapse; }
th, td { vertical-align: middle; }
th { background-color: #02a2dc; color: white; font-weight: bold; text-transform: none; text-align: center; }
button:disabled { opacity: 0.4; cursor: not-allowed; }
</style>
