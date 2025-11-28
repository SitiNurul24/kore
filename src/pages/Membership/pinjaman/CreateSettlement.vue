<template>
  <div>
    <h2 class="text-xl font-bold mb-4">Membership</h2>
    <div
      v-if="notification.show"
      :class="[
        'mb-4 p-4 rounded-md flex items-center transition-all duration-300',
        notification.type === 'success'
          ? 'bg-green-100 border border-green-400 text-green-700'
          : 'bg-red-100 border border-red-400 text-red-700',
      ]"
    >
      <span class="material-icons mr-2">
        {{ notification.type === 'success' ? 'check_circle' : 'error' }}
      </span>
      <span class="flex-1">{{ notification.message }}</span>
      <button @click="closeNotification" class="ml-auto hover:opacity-70">
        <span class="material-icons">close</span>
      </button>
    </div>

    <div class="p-6 bg-white rounded-lg shadow-md">
      <h3 class="text-base font-bold text-[#0d0909] mb-4">Pinjaman</h3>
      <div class="flex space-x-3 mb-4 border-b border-gray-200 pb-4">
        <button
          class="px-4 py-2 rounded border border-[#02A2DC] font-semibold"
          :class="
            activeTab === 'settlement' ? 'bg-[#02A2DC] text-white' : 'bg-white text-[#02A2DC]'
          "
          @click="
            () => {
              activeTab = 'settlement'
              showForm = false
            }
          "
        >
          Settlement
        </button>
        <button
          class="px-4 py-2 rounded border border-[#02A2DC] font-semibold"
          :class="activeTab === 'upload' ? 'bg-[#02A2DC] text-white' : 'bg-white text-[#02A2DC]'"
          @click="navigateToUpload"
        >
          Upload Potongan
        </button>
        <button
          class="px-4 py-2 rounded border border-[#02A2DC] font-semibold"
          :class="activeTab === 'pinjaman' ? 'bg-[#02A2DC] text-white' : 'bg-white text-[#02A2DC]'"
          @click="navigateToPinjaman"
        >
          Pinjaman
        </button>
      </div>

      <div class="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-6">
        <!-- Tombol Kembali -->
        <button class="text-[#02A2DC] font-semibold mb-4 flex items-center" @click="goBack">
          <span class="material-icons mr-2">arrow_back</span> Back to Settlement List
        </button>

        <!-- Tombol Aksi -->
        <div class="flex flex-wrap gap-3 sm:flex-nowrap sm:justify-start items-center">
          <!-- Tombol Save -->
          <button
            @click="saveSettlement"
            :disabled="isLoading || !isFormValid"
            class="bg-[#02A2DC] text-white px-6 py-2 rounded-md font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            <span v-if="isSaving" class="material-icons mr-2 animate-spin">refresh</span>
            <span v-else class="material-icons mr-2">save</span>
            {{ isSaving ? 'Saving...' : 'Save' }}
          </button>

          <!-- Tombol Cancel -->
          <button
            @click="cancelForm"
            :disabled="isLoading"
            class="border border-[#02A2DC] text-[#02A2DC] px-6 py-2 rounded-md font-semibold hover:bg-[#02A2DC] hover:text-white flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span class="material-icons mr-2">cancel</span> Cancel
          </button>

          <!-- Tombol Update -->
          <button
            @click="updateSettlement"
            :disabled="isLoading"
            class="border border-[#02A2DC] text-[#02A2DC] px-6 py-2 rounded-md font-semibold hover:bg-[#02A2DC] hover:text-white flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span class="material-icons mr-2">edit</span> Update
          </button>

          <!-- Tombol Post -->
          <button
            @click="submitSettlementForm"
            :disabled="isLoading || !isFormValid"
            class="border border-[#02A2DC] text-[#02A2DC] px-6 py-2 rounded-md font-semibold hover:bg-[#02A2DC] hover:text-white flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span class="material-icons mr-2">publish</span> Post
          </button>
        </div>
      </div>

      <!-- STEP 1 -->
      <div v-if="activeStep === 1">
        <div class="grid md:grid-cols-2 gap-6 mb-4">
          <div>
            <label class="block text-sm font-medium mb-1">
              Document Number
              <span class="text-red-500">*</span>
            </label>
            <input
              v-model="settlementData.doc_num"
              class="w-full border border-gray-300 p-3 rounded-md bg-gray-50"
              readonly
              placeholder="Auto-generated"
            />
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">
              Name
              <span class="text-red-500">*</span>
            </label>
            <div class="relative" ref="nameDropdown">
              <input
                v-model="searchQuery"
                @focus="showDropdown = true"
                @input="filterNames"
                @blur="hideDropdownDelayed"
                class="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-[#02A2DC] focus:border-[#02A2DC]"
                placeholder="Search Member"
                :class="{ 'border-red-500': formErrors.includes('Name is required') }"
              />
              <ul
                v-if="showDropdown && filteredMembers.length > 0"
                class="absolute w-full bg-white border mt-1 rounded-md shadow-lg z-20 max-h-48 overflow-y-auto"
              >
                <li
                  v-for="(member, index) in filteredMembers"
                  :key="index"
                  @mousedown="handleMemberSelect(member)"
                  class="p-3 cursor-pointer hover:bg-gray-100 border-b last:border-b-0"
                >
                  <div class="font-medium">{{ member.mbr_name }}</div>
                  <div class="text-sm text-gray-500">
                    {{ member.mbr_mbrid }} - {{ member.mbr_company }}
                  </div>
                </li>
              </ul>
              <div
                v-if="showDropdown && filteredMembers.length === 0 && searchQuery"
                class="absolute w-full bg-white border mt-1 rounded-md shadow-lg z-20 p-3 text-gray-500 text-center"
              >
                No members found
              </div>
            </div>
          </div>
        </div>

        <div class="grid md:grid-cols-2 gap-6 mb-4">
          <div>
            <label class="block text-sm font-medium mb-1">MBRID</label>
            <input
              v-model="settlementData.mbr_mbrid"
              class="w-full border border-gray-300 p-3 rounded-md bg-gray-50"
              readonly
            />
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">
              STL Date
              <span class="text-red-500">*</span>
            </label>
            <input
              v-model="settlementData.settlement_date"
              type="date"
              class="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-[#02A2DC] focus:border-[#02A2DC]"
              :class="{ 'border-red-500': formErrors.includes('STL Date is required') }"
            />
          </div>
        </div>

        <div class="grid md:grid-cols-2 gap-6 mb-4">
          <div>
            <label class="block text-sm font-medium mb-1">
              STL Amount
              <span class="text-red-500">*</span>
            </label>
            <input
              v-model="settlementData.stl_am"
              type="number"
              step="0.01"
              class="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-[#02A2DC] focus:border-[#02A2DC]"
              placeholder="0.00"
              :class="{ 'border-red-500': formErrors.includes('STL Amount is required') }"
              @input="formatAmount"
            />
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">Description</label>
            <textarea
              v-model="settlementData.description"
              class="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-[#02A2DC] focus:border-[#02A2DC]"
              placeholder="Add Description (Optional)"
              rows="3"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import PinjamanService from '@/services/Pinjaman/PinjamanService'

const router = useRouter()
const pinjamanService = new PinjamanService()

// Reactive data
const settlementData = ref({
  doc_num: '',
  mbr_name: '',
  mbr_company: '',
  mbr_mbrid: '',
  stl_doc_num: '',
  settlement_date: '',
  tot_am: '',
  description: '',
  stl_am: '',
})

const memberOptions = ref([])
const filteredMembers = ref([])
const searchQuery = ref('')
const showDropdown = ref(false)
const activeStep = ref(1)
// const dataUpdated = ref(false)
const activeTab = ref('settlement')
const showForm = ref(false)
const pinjamanList = ref([])
// const LoanSettlement = ref([])

// Loading states
const isLoading = ref(false)
const isSaving = ref(false)
const isPosting = ref(false)

// Notification state
const notification = ref({
  show: false,
  type: 'success', // 'success' or 'error'
  message: '',
})

// Form validation
const formErrors = computed(() => {
  const errors = []
  if (!settlementData.value.mbr_name) errors.push('Name is required')
  if (!settlementData.value.stl_doc_num) errors.push('STL Document Number is required')
  if (!settlementData.value.settlement_date) errors.push('STL Date is required')
  if (!settlementData.value.stl_am || settlementData.value.stl_am <= 0)
    errors.push('STL Amount is required')
  return errors
})

const isFormValid = computed(() => formErrors.value.length === 0)

// Notification functions
function showNotification(type, message) {
  notification.value = {
    show: true,
    type,
    message,
  }

  // Auto hide after 5 seconds
  setTimeout(() => {
    closeNotification()
  }, 5000)
}

function closeNotification() {
  notification.value.show = false
}

// Navigation functions
function navigateToUpload() {
  router.push('/membership/upload-potongan')
}

function navigateToPinjaman() {
  router.push('/membership/pinjaman')
}

function goBack() {
  // Cek apakah ada perubahan yang belum disimpan
  if (isFormValid.value && (settlementData.value.mbr_name || settlementData.value.stl_doc_num)) {
    if (confirm('You have unsaved changes. Are you sure you want to leave?')) {
      router.back() // Kembali ke halaman sebelumnya
    }
  } else {
    router.back() // Kembali ke halaman sebelumnya
  }
}

// Utility functions
// function formatCurrency(amount) {
//   if (!amount) return 'Rp 0'
//   return new Intl.NumberFormat('id-ID', {
//     style: 'currency',
//     currency: 'IDR',
//     minimumFractionDigits: 0,
//   }).format(amount)
// }

function formatAmount() {
  // Remove any non-numeric characters except decimal point
  const value = settlementData.value.stl_am.toString().replace(/[^\d.]/g, '')
  settlementData.value.stl_am = value
}

function hideDropdownDelayed() {
  setTimeout(() => {
    showDropdown.value = false
  }, 200)
}

// API functions
onMounted(async () => {
  try {
    const response = await pinjamanService.getPinjamanSettlement()
    const res = await pinjamanService.getPinjamanList()
    const data = await pinjamanService.getLoanSettlement()

    console.log('API Response:', response)

    pinjamanList.value = res.tabledata

    console.log('Data yang diterima:', pinjamanList.value)
    console.log('Loan Settlement Data:', data)

    if (data && data.length > 0) {
      memberOptions.value = data.map((item) => ({
        mbr_name: item.mbr_name,
        mbr_company: item.mbr_company,
        mbr_mbrid: item.mbr_mbrid,
        doc_num: item.doc_num,
        stl_am: item.stl_am,
      }))
      filteredMembers.value = memberOptions.value

      console.log('Member options loaded:', memberOptions.value.length, 'members')
    } else {
      console.warn('tabledata kosong')
      filteredMembers.value = []
      showNotification('error', 'No member data available. Please contact administrator.')
    }
  } catch (error) {
    console.error('Terjadi kesalahan saat mengambil data settlement pinjaman:', error)
    showNotification('error', 'Failed to load member data. Please refresh the page.')
  }
})

function filterNames() {
  if (!searchQuery.value) {
    filteredMembers.value = memberOptions.value
    return
  }

  filteredMembers.value = memberOptions.value.filter(
    (member) =>
      member.mbr_name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      member.mbr_mbrid.toLowerCase().includes(searchQuery.value.toLowerCase()),
  )
}

function handleMemberSelect(selectedMember) {
  if (selectedMember) {
    settlementData.value.mbr_company = selectedMember.mbr_company
    settlementData.value.mbr_mbrid = selectedMember.mbr_mbrid
    settlementData.value.doc_num = selectedMember.doc_num
    settlementData.value.mbr_name = selectedMember.mbr_name
    settlementData.value.stl_am = selectedMember.stl_am

    console.log(settlementData.value)

    searchQuery.value = selectedMember.mbr_name
    filteredMembers.value = []
    showDropdown.value = false

    // Auto-generate STL doc number if not exists
    if (!settlementData.value.stl_doc_num) {
      const now = new Date()
      const dateStr =
        now.getFullYear().toString() +
        (now.getMonth() + 1).toString().padStart(2, '0') +
        now.getDate().toString().padStart(2, '0')
      settlementData.value.stl_doc_num = `STL${dateStr}${Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, '0')}`
    }

    // Auto-set today's date if not exists
    if (!settlementData.value.settlement_date) {
      const today = new Date().toISOString().split('T')[0]
      settlementData.value.settlement_date = today
    }
  }
}

async function saveSettlement() {
  if (!isFormValid.value) {
    showNotification('error', 'Please fill in all required fields before saving')
    return
  }

  isSaving.value = true

  try {
    // Simulate API call for saving draft
    await new Promise((resolve) => setTimeout(resolve, 1000))

    showNotification('success', 'Settlement data saved as draft successfully!')
    console.log('Settlement saved as draft:', settlementData.value)
  } catch (error) {
    console.error('Error saving settlement:', error)
    showNotification('error', 'Failed to save settlement data. Please try again.')
  } finally {
    isSaving.value = false
  }
}

function updateSettlement() {
  if (!isFormValid.value) {
    showNotification('error', 'Please fill in all required fields before updating')
    return
  }

  showNotification('success', 'Update functionality will be implemented')
}

async function submitSettlementForm() {
  if (!isFormValid.value) {
    showNotification('error', 'Please fill in all required fields before posting')
    return
  }

  isPosting.value = true

  const data = [
    {
      formid: 'ZKOPSTL',
      form_version: '602',
      blockid: 'LON',
      master_blockid: '',
      txn: 'new',
      table_id: 'docnum',
      source_type: 'TABLE',
      rid: '',
      tid: 0,
      tabledata: [
        {
          colname: 'settlement_by',
          colval: settlementData.value.mbr_name,
          coltype: 'vchar',
          formatmask: '',
          summary_type: '',
        },
        {
          colname: 'mbr_company',
          colval: settlementData.value.mbr_company,
          coltype: 'vchar',
          formatmask: '',
          summary_type: '',
        },
        {
          colname: 'mbr_mbrid',
          colval: settlementData.value.mbr_mbrid,
          coltype: 'vchar',
          formatmask: '',
          summary_type: '',
        },
        {
          colname: 'stl_doc_num',
          colval: settlementData.value.stl_doc_num,
          coltype: 'vchar',
          formatmask: '',
          summary_type: '',
        },
        {
          colname: 'settlement_date',
          colval: settlementData.value.settlement_date,
          coltype: 'date',
          formatmask: '',
          summary_type: '',
        },
        {
          colname: 'settlement_amount',
          colval: parseFloat(settlementData.value.stl_am) || 0,
          coltype: 'number',
          formatmask: '{:,.0f}',
          summary_type: '',
        },
        {
          colname: 'stldesc',
          colval: settlementData.value.description || '',
          coltype: 'vchar',
          formatmask: '',
          summary_type: '',
        },
      ],
    },
  ]

  console.log('Preparing to post settlement with data:', settlementData.value)
  console.log('Data to be sent:', data)

  try {
    const response = await pinjamanService.createSettlement(settlementData.value.doc_num)
    console.log('Settlement response:', response)

    // Check if the response indicates success
    if (response && (response.success || response.status === 'success' || response.tabledata)) {
      showNotification(
        'success',
        `Settlement posted successfully! Document: ${settlementData.value.stl_doc_num}`,
      )

      // Optionally reset form after successful post
      setTimeout(() => {
        if (confirm('Settlement posted successfully! Do you want to create another settlement?')) {
          resetForm()
        } else {
          router.push('/membership/settlement')
        }
      }, 2000)
    } else {
      throw new Error('Unexpected response format')
    }
  } catch (error) {
    console.error('Error creating settlement:', error)

    // More specific error messages
    if (error.response?.status === 400) {
      showNotification('error', 'Invalid data. Please check your input and try again.')
    } else if (error.response?.status === 500) {
      showNotification('error', 'Server error. Please contact administrator.')
    } else if (error.message?.includes('Network Error')) {
      showNotification('error', 'Network error. Please check your connection.')
    } else {
      showNotification('error', 'Failed to post settlement. Please try again.')
    }
  } finally {
    isPosting.value = false
  }
}

function resetForm() {
  settlementData.value = {
    doc_num: '',
    mbr_name: '',
    mbr_company: '',
    mbr_mbrid: '',
    stl_doc_num: '',
    settlement_date: '',
    tot_am: '',
    description: '',
    stl_am: '',
  }
  searchQuery.value = ''
  filteredMembers.value = memberOptions.value
  showDropdown.value = false
}

function cancelForm() {
  if (isFormValid.value && (settlementData.value.mbr_name || settlementData.value.stl_doc_num)) {
    if (confirm('Are you sure you want to cancel? All unsaved changes will be lost.')) {
      resetForm()
      showNotification('success', 'Form has been reset')
    }
  } else {
    resetForm()
    showNotification('success', 'Form has been reset')
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

.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Custom focus styles */
input:focus,
textarea:focus,
select:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(2, 162, 220, 0.1);
}

/* Transition effects */
.transition-all {
  transition: all 0.3s ease;
}

.transition-colors {
  transition:
    background-color 0.3s ease,
    color 0.3s ease,
    border-color 0.3s ease;
}
</style>
