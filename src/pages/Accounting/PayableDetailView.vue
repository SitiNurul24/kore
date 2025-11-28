<!-- File: src/pages/Accounting/PayableDetailView.vue -->
<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <h2 class="text-xl font-bold mb-4">Accounting</h2>

    <div class="bg-white rounded-lg shadow-md p-6">
      <div class="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <h3 class="text-lg font-semibold">Payable Detail</h3>
        <button
          @click="goBack"
          class="flex items-center text-[#02A2DC] font-medium gap-2 hover:underline"
        >
          <span class="w-5 h-5 flex items-center justify-center rounded-full border border-[#02A2DC]">
            <span class="material-icons text-[14px] text-[#02A2DC]">arrow_back</span>
          </span>
          Kembali ke Daftar
        </button>
      </div>

      <hr class="border border-gray-200 my-4" />

      <div v-if="loading" class="p-6 text-center text-sm text-gray-500">Memuat detail payable...</div>
      <div v-else-if="error" class="p-6 text-center text-sm text-red-500 whitespace-pre-wrap">{{ error }}</div>
      <div v-else-if="!payable" class="p-6 text-center text-sm text-gray-500">
        Data payable tidak ditemukan.
      </div>

      <div v-else class="max-w-6xl mx-auto px-1">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-bold text-gray-700">Company</label>
            <input
              :value="payable.company || '-'"
              type="text"
              class="readonly-input"
              readonly
            />
          </div>

          <div>
            <label class="block text-sm font-bold text-gray-700">Doc Number</label>
            <input :value="payable.docNo || '-'" type="text" class="readonly-input" readonly />
          </div>

          <div>
            <label class="block text-sm font-bold text-gray-700">Business Area</label>
            <input :value="payable.businessArea || '-'" type="text" class="readonly-input" readonly />
          </div>

          <div>
            <label class="block text-sm font-bold text-gray-700">Doc Ref</label>
            <input :value="payable.docRef || '-'" type="text" class="readonly-input" readonly />
          </div>

          <div>
            <label class="block text-sm font-bold text-gray-700">Supplier</label>
            <input :value="payable.supplier || '-'" type="text" class="readonly-input" readonly />
          </div>

          <div>
            <label class="block text-sm font-bold text-gray-700">Doc Date</label>
            <input :value="payable.docDateDisplay || payable.docDate || '-'" type="text" class="readonly-input" readonly />
          </div>

          <div>
            <label class="block text-sm font-bold text-gray-700">Currency</label>
            <input :value="payable.currency || '-'" type="text" class="readonly-input" readonly />
          </div>

          <div>
            <label class="block text-sm font-bold text-gray-700">Posting Date</label>
            <input :value="payable.postingDate || '-'" type="text" class="readonly-input" readonly />
          </div>

          <div>
            <label class="block text-sm font-bold text-gray-700">Payable Acc</label>
            <input :value="payable.payableAcc || '-'" type="text" class="readonly-input" readonly />

            <div class="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
              <div>
                <label class="block text-sm font-bold text-gray-700">Payable Amount</label>
                <input :value="formattedAmount" type="text" class="readonly-input" readonly />
              </div>

              <div>
                <label class="block text-sm font-bold text-gray-700">Payment Account</label>
                <input :value="payable.paymentAccount || '-'" type="text" class="readonly-input" readonly />
              </div>

              <div>
                <label class="block text-sm font-bold text-gray-700">Status</label>
                <input :value="payable.status || '-'" type="text" class="readonly-input" readonly />
              </div>

              <div>
                <label class="block text-sm font-bold text-gray-700">Paid</label>
                <input :value="formattedPaidAmount" type="text" class="readonly-input" readonly />
              </div>

              <div class="md:col-span-2">
                <label class="block text-sm font-bold text-gray-700">Description</label>
                <textarea :value="payable.description || '-'" rows="2" class="readonly-textarea" readonly></textarea>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-8 bg-white border border-gray-200 rounded-xl shadow-sm p-6">
          <label class="block text-gray-700 font-semibold mb-3">Additional Info</label>
          <input
            type="text"
            :value="additionalInfoText"
            placeholder="Add Text"
            class="additional-info-input"
            readonly
          />

          <div class="overflow-x-auto mt-6">
            <table class="min-w-full text-sm text-center border-collapse">
              <thead>
                <tr class="bg-[#02A2DC] text-white">
                  <th class="py-3 px-4 border border-black">Account</th>
                  <th class="py-3 px-4 border border-black">Account Name</th>
                  <th class="py-3 px-4 border border-black w-[100px]">D/C</th>
                  <th class="py-3 px-4 border border-black">Amount</th>
                  <th class="py-3 px-4 border border-black">Description</th>
                </tr>
              </thead>
              <tbody class="text-gray-700">
                <tr v-if="!additionalInfoRows.length" class="border-b border-gray-200">
                  <td class="py-2 px-4 border border-gray-200" colspan="5">Tidak ada data tambahan.</td>
                </tr>
                <tr
                  v-for="(row, index) in additionalInfoRows"
                  :key="row.id || index"
                  class="border-b border-gray-200"
                >
                  <td class="py-2 px-4 border border-gray-200">{{ row.account || '-' }}</td>
                  <td class="py-2 px-4 border border-gray-200">{{ row.accountName || '-' }}</td>
                  <td class="py-2 px-4 border border-gray-200">{{ row.dc || '-' }}</td>
                  <td class="py-2 px-4 border border-gray-200">{{ formatRowAmount(row.amount) }}</td>
                  <td class="py-2 px-4 border border-gray-200">{{ row.description || '-' }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { fetchPayableListRunLib } from '@/services/modules/payable'

const router = useRouter()
const route = useRoute()

const historyState = typeof window !== 'undefined' ? window.history.state : {}
const payable = ref(route?.state?.payable ?? historyState?.payable ?? null)
const loading = ref(false)
const error = ref('')

const formattedAmount = computed(() => formatAmount(payable.value?.localAmount))
const formattedPaidAmount = computed(() => formatAmount(payable.value?.paidAmount))
const additionalInfoText = computed(() =>
  payable.value?.additionalInfoText || payable.value?.additionalInfo || payable.value?.notes || ''
)

const additionalInfoRows = computed(() => {
  const raw = payable.value?.additionalInfoRows || payable.value?.detailPayable || payable.value?.details || []
  if (!Array.isArray(raw)) return []
  return raw.map((item, idx) => ({
    id: item?.id ?? item?.recId ?? idx,
    account: item?.account ?? item?.accountNumber ?? item?.acc ?? '-',
    accountName: item?.accountName ?? item?.name ?? item?.accName ?? '-',
    dc: item?.dc ?? item?.debitCredit ?? item?.type ?? '-',
    amount: item?.amount ?? item?.value ?? item?.nominal ?? 0,
    description: item?.description ?? item?.note ?? item?.text ?? '-',
  }))
})

function goBack() {
  router.push({ name: 'Payable' })
}

function formatAmount(v) {
  if (v === null || v === undefined || v === '') return '-'
  const n = typeof v === 'number' ? v : Number(String(v).replace(/[^0-9,-]+/g, '').replace(',', '.'))
  return Number.isFinite(n) ? n.toLocaleString('id-ID') : '-'
}

async function ensurePayableLoaded() {
  if (payable.value) return

  const recId = route.params.recId || route.query.recId
  if (!recId) {
    error.value = 'Parameter recId tidak tersedia.'
    return
  }

  loading.value = true
  error.value = ''
  try {
    const list = await fetchPayableListRunLib({ pageSize: -1, search: '' })
    payable.value = list.find((item) => String(item.recId) === String(recId) || String(item.docNo) === String(recId)) || null
    if (!payable.value) {
      error.value = 'Data payable tidak ditemukan.'
    }
  } catch (e) {
    console.error(e)
    error.value = e?.friendlyMessage || e?.message || 'Gagal memuat detail payable.'
  } finally {
    loading.value = false
  }
}

onMounted(ensurePayableLoaded)
</script>


<style scoped>
.readonly-input {
  width: 100%;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  padding: 0.5rem 0.75rem;
  background-color: #ffffff;
  color: #4b5563;
  cursor: default;
}

.readonly-textarea {
  width: 100%;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  padding: 0.5rem 0.75rem;
  background-color: #ffffff;
  color: #4b5563;
  cursor: default;
  resize: none;
}

.additional-info-input {
  width: 100%;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  padding: 0.65rem 1rem;
  background-color: #f9fafb;
  color: #4b5563;
  cursor: default;
}
</style>
