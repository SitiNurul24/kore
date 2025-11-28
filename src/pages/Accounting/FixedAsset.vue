<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <h2 class="text-xl font-bold mb-4">Accounting</h2>

    <div class="bg-white rounded-lg shadow-md p-6">
      <!-- Judul Bagian -->
      <div class="mb-6">
        <h3 class="text-lg font-semibold mb-4">Fixed Asset</h3>
      </div>

      <!-- Tab Navigation -->
      <div class="flex items-center mb-6 gap-4" v-if="!showForm">
        <button
          @click="activeTab = 'Material'"
          :class="[
            'w-36 py-2 rounded-md border text-sm font-medium text-center',
            activeTab === 'Material'
              ? 'bg-[#02A2DC] text-white border-[#02A2DC]'
              : 'text-[#02A2DC] border-[#02A2DC]',
          ]"
        >
          Material
        </button>
        <button
          @click="activeTab = 'Depreciation'"
          :class="[
            'w-36 py-2 rounded-md border text-sm font-medium text-center',
            activeTab === 'Depreciation'
              ? 'bg-[#02A2DC] text-white border-[#02A2DC]'
              : 'text-[#02A2DC] border-[#02A2DC]',
          ]"
        >
          Depreciation
        </button>
        <button
          @click="activeTab = 'Transaction'"
          :class="[
            'w-36 py-2 rounded-md border text-sm font-medium text-center',
            activeTab === 'Transaction'
              ? 'bg-[#02A2DC] text-white border-[#02A2DC]'
              : 'text-[#02A2DC] border-[#02A2DC]',
          ]"
        >
          Transaction
        </button>
      </div>

      <!-- Section Material -->
      <div v-if="activeTab === 'Material'">
        <!-- Header Navigasi saat form aktif -->
        <div v-if="showForm" class="mb-4">
          <div class="flex items-center gap-2 mb-2">
            <button
              @click="showForm = false"
              class="w-8 h-8 flex items-center justify-center rounded-full border-2 border-[#02A2DC] text-[#02A2DC] hover:bg-[#e6f7ff]"
            >
              <span class="material-icons">arrow_back</span>
            </button>
            <span class="text-[#02A2DC] font-semibold text-base">Add New Material</span>
          </div>
          <div class="border-b border-gray-300"></div>
        </div>

        <!-- Search & Add Button (only if form not shown) -->
        <div v-if="!showForm" class="mb-6">
          <div class="relative w-full md:w-1/3 mb-6 mx-auto">
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Search"
              class="w-full p-3 pr-12 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <span class="material-icons absolute right-3 top-3.5 text-gray-400 text-2xl"
              >search</span
            >
          </div>
          <div class="flex justify-end">
            <button
              @click="showForm = true"
              class="flex items-center justify-center bg-[#02A2DC] hover:bg-[#0191b8] text-white px-6 py-2 rounded-lg shadow-md"
            >
              <span
                class="w-8 h-8 flex items-center justify-center bg-[#02A2DC] border-2 border-white rounded-full text-white text-lg font-bold mr-2"
                >+</span
              >
              <span class="text-lg font-semibold">Add New Material</span>
            </button>
          </div>
        </div>

        <!-- Card View -->
        <div v-if="!showForm" class="flex flex-wrap gap-4">
          <div
            v-for="(item, index) in filteredAssets"
            :key="index"
            class="bg-white rounded-lg shadow-md border border-gray-300 p-4 w-[23%] min-w-[220px] hover:shadow-lg transition-all"
          >
            <div class="flex items-center">
              <img
                :src="item.picture || '/src/assets/fotoprofil.png'"
                alt="asset"
                class="w-16 h-16 rounded-full object-cover mr-4"
              />
              <div>
                <p class="text-xs text-blue-500 font-bold">ID Asset:</p>
                <p class="text-xs font-bold text-[#2b2b2b]">{{ item.id }}</p>
                <p class="text-xs text-blue-500 font-bold mt-2">Asset Name:</p>
                <p class="text-xs font-bold text-[#2b2b2b]">{{ item.name }}</p>
              </div>
            </div>
            <div class="flex justify-start mt-4 gap-2">
              <button
                @click="editAsset(item)"
                class="bg-yellow-400 hover:bg-yellow-500 w-8 h-8 flex items-center justify-center rounded-md"
              >
                <span class="material-icons text-white text-sm">edit</span>
              </button>
              <button
                @click="deleteAsset(item)"
                class="bg-red-500 hover:bg-red-600 w-8 h-8 flex items-center justify-center rounded-md"
              >
                <span class="material-icons text-white text-sm">delete</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Jika tidak ada data -->
        <div
          v-if="filteredAssets.length === 0 && !showForm"
          class="text-center text-gray-500 mt-10"
        >
          No assets found.
        </div>

        <!-- Form Add Material -->
        <div v-if="showForm" class="mt-6 flex flex-col gap-6">
          <!-- ✅ Tombol di bagian atas kanan -->
          <div class="flex justify-end gap-4">
            <button
              @click="saveAsset"
              class="w-32 h-11 rounded-md bg-[#02A2DC] text-white font-semibold hover:bg-[#0191b8] transition-all"
            >
              Save
            </button>
            <button
              @click="cancelForm"
              class="w-32 h-11 rounded-md border border-[#02A2DC] text-[#02A2DC] font-semibold bg-white hover:bg-[#e6f7ff] transition-all"
            >
              Cancel
            </button>
          </div>

          <div class="flex flex-col md:flex-row items-start gap-6">
            <!-- Upload & Preview Image -->
            <div class="w-full md:w-[200px]">
              <!-- Preview Gambar Utama -->
              <img
                :src="previewImage || 'https://via.placeholder.com/200x150'"
                alt="Preview"
                class="rounded-xl w-full h-[150px] object-cover border border-gray-300"
              />

              <!-- Upload File -->
              <input
                type="file"
                accept="image/*"
                @change="handleImageUpload"
                class="mt-3 block w-full text-sm text-gray-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
              />

              <!-- Thumbnails -->
              <div class="flex mt-3 gap-2 flex-wrap">
                <img
                  v-for="(img, index) in previewThumbnails"
                  :key="index"
                  :src="img"
                  @click="previewImage = img"
                  class="w-12 h-12 rounded-md object-cover border border-gray-300 cursor-pointer"
                />
              </div>
            </div>

            <!-- Form Input Asset -->
            <div class="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="text-sm font-semibold text-black">Asset ID</label>
                <input
                  type="text"
                  v-model="newAsset.id"
                  placeholder="00000"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label class="text-sm font-semibold text-black">Asset Name</label>
                <input
                  type="text"
                  v-model="newAsset.name"
                  placeholder="Add Name"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label class="text-sm font-semibold text-black">Asset Class</label>
                <select
                  v-model="newAsset.assetClass"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option disabled value="">Select Category</option>
                  <option>IT</option>
                  <option>Office Equipment</option>
                  <option>Vehicle</option>
                </select>
              </div>

              <div>
                <label class="text-sm font-semibold text-black">Serial Number</label>
                <input
                  type="text"
                  v-model="newAsset.serialNumber"
                  placeholder="Add Serial Number"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label class="text-sm font-semibold text-black">Merk</label>
                <input
                  type="text"
                  v-model="newAsset.merk"
                  placeholder="Add Merk"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label class="text-sm font-semibold text-black">Total</label>
                <input
                  type="number"
                  v-model="newAsset.total"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div class="col-span-2">
                <label class="text-sm font-semibold text-black">Description</label>
                <textarea
                  v-model="newAsset.description"
                  rows="3"
                  placeholder="Description"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md"
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Section Depreciation -->
      <div v-if="activeTab === 'Depreciation'">
        <!-- Search & Add New -->
        <div class="mb-6">
          <!-- Search Input -->
          <div class="relative w-full md:w-1/3 mb-6 mx-auto">
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Search"
              class="w-full p-3 pr-12 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <span class="material-icons absolute right-3 top-4 text-gray-400 text-2xl">search</span>
          </div>

          <!-- Add New Depreciation Button -->
          <div class="flex justify-end">
            <button
              @click="showForm = true"
              class="flex items-center justify-center bg-[#02A2DC] hover:bg-[#0191b8] text-white px-6 py-2 rounded-lg shadow-md"
            >
              <span
                class="w-8 h-8 flex items-center justify-center bg-[#02A2DC] border-2 border-white rounded-full text-white text-lg font-bold mr-2"
                >+</span
              >
              <span class="text-lg font-semibold">Add New Depreciation</span>
            </button>
          </div>
        </div>

        <!-- Pagination -->
        <div
          class="flex justify-center items-center space-x-2 text-[#02A2DC] font-semibold text-sm mt-4"
        >
          <button class="hover:underline">1</button>
          <button class="hover:underline text-gray-400">2</button>
          <button class="hover:underline text-gray-400">3</button>
          <button>
            <span class="material-icons text-sm">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
    <div class="">
      <!-- Table Depreciation -->

      <!-- Section Transaction -->
      <div v-if="activeTab === 'Transaction'">
        <!-- Search & Add New -->
        <div class="mb-6">
          <!-- Search Input -->
          <div class="relative w-full md:w-1/3 mb-6 mx-auto">
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Search"
              class="w-full p-3 pr-12 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <span class="material-icons absolute right-3 top-4 text-gray-400 text-2xl">search</span>
          </div>

          <!-- Add New Transaction Button -->
          <div class="flex justify-end">
            <button
              @click="showForm = true"
              class="flex items-center justify-center bg-[#02A2DC] hover:bg-[#0191b8] text-white px-6 py-2 rounded-lg shadow-md"
            >
              <span
                class="w-8 h-8 flex items-center justify-center bg-[#02A2DC] border-2 border-white rounded-full text-white text-lg font-bold mr-2"
                >+</span
              >
              <span class="text-lg font-semibold">Add New Transaction</span>
            </button>
          </div>
        </div>

        <!-- Form Tambah Transaksi -->
        <div v-if="showTransactionForm" class="mt-10 border-t pt-6 px-6">
          <div
            class="flex items-center gap-2 text-[#02A2DC] mb-6 cursor-pointer"
            @click="showTransactionForm = false"
          >
            <span
              class="w-8 h-8 flex items-center justify-center border-2 border-[#02A2DC] rounded-full text-[#02A2DC] text-lg font-bold mr-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2.5"
                stroke="currentColor"
                class="w-5 h-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </span>
            <span class="text-lg font-semibold">Back to List</span>
          </div>

          <hr class="border-t border-gray-300 mb-4" />

          <!-- Tombol Save Cancel -->
          <div class="flex justify-end mb-4">
            <button
              class="bg-gradient-to-r from-[#02A2DC] to-[#0095cc] hover:from-[#0191b8] hover:to-[#007ea8] text-white font-semibold px-6 py-2 rounded shadow-lg mr-2 transition-all duration-200"
            >
              Save
            </button>
            <button @click="showTransactionForm = true">
              class="border border-[#02A2DC] text-[#02A2DC] font-semibold px-6 py-2 rounded
              hover:bg-[#EAF8FF] transition-all duration-200"> Cancel
            </button>
          </div>

          <!-- Form Input -->
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="text-sm font-semibold text-gray-700 mb-1 block">Txn Type</label>
              <select class="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-500">
                <option class="text-gray-500">Add Type</option>
              </select>
            </div>
            <div>
              <label class="text-sm font-semibold text-gray-700 mb-1 block">Doc Ref</label>
              <input
                type="text"
                placeholder="Add Doc Ref"
                class="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-500"
              />
            </div>
            <div>
              <label class="text-sm font-semibold text-gray-700 mb-1 block">Company</label>
              <select class="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-500">
                <option>Add Company</option>
              </select>
            </div>
            <div>
              <label class="text-sm font-semibold text-gray-700 mb-1 block">Doc Num</label>
              <input
                type="text"
                placeholder="Add Company"
                class="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-500"
              />
            </div>
            <div>
              <label class="text-sm font-semibold text-gray-700 mb-1 block">Business Area</label>
              <select class="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-500">
                <option>Add Business Area</option>
              </select>
            </div>
            <div>
              <label class="text-sm font-semibold text-gray-700 mb-1 block">Doc Date</label>
              <input
                type="text"
                value="Datetime.Now"
                class="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-500"
              />
            </div>
            <div>
              <label class="text-sm font-semibold text-gray-700 mb-1 block">Business Center</label>
              <select class="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-500">
                <option>Add Business Center</option>
              </select>
            </div>
            <div>
              <label class="text-sm font-semibold text-gray-700 mb-1 block">Asset Value</label>
              <input
                type="number"
                placeholder="Add Asset"
                class="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-500"
              />
            </div>
            <div class="col-span-2">
              <label class="text-sm font-semibold text-gray-700 mb-1 block">Description</label>
              <textarea
                placeholder="Add Description"
                class="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-500 resize-none h-24"
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeTab = ref('Material')
const showForm = ref(false)
const searchQuery = ref('')
const showMaterialForm = ref(false)
const showDepreciationForm = ref(false)
const showTransactionForm = ref(false)
const previewImage = ref('')
const previewThumbnails = ref([])
const handleImageUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      previewImage.value = e.target.result
      previewThumbnails.value.push(e.target.result)
    }
    reader.readAsDataURL(file)
  }
}

const assets = ref([
  { id: 'MB0001', name: 'Mobil Calya', picture: '/src/assets/car.png' },
  { id: 'MB0002', name: 'Printer', picture: '/src/assets/printer.png' },
  { id: 'MB0003', name: 'LED TV', picture: '/src/assets/tv.png' },
])

const newAsset = ref({
  id: '',
  name: '',
  assetClass: '',
  serialNumber: '',
  merk: '',
  total: 0,
  description: '',
  picture: '',
})

const filteredAssets = computed(() =>
  assets.value.filter(
    (asset) =>
      asset.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      asset.id.toLowerCase().includes(searchQuery.value.toLowerCase()),
  ),
)

const searchDepreciation = ref('')
const depreciations = ref([
  { documentNumber: '15000000133', docDate: '30-11-2024' },
  { documentNumber: '15000000134', docDate: '30-11-2024' },
  { documentNumber: '15000000135', docDate: '07-10-2024' },
])

const filteredDepreciations = computed(() =>
  depreciations.value.filter((item) =>
    item.documentNumber.toLowerCase().includes(searchDepreciation.value.toLowerCase()),
  ),
)

const addDepreciation = () => {
  alert('Add New Depreciation clicked!')
}

const editAsset = (item) => console.log('Edit asset:', item)
const deleteAsset = (item) => console.log('Delete asset:', item)

const saveAsset = () => {
  if (newAsset.value.id && newAsset.value.name) {
    assets.value.push({
      id: newAsset.value.id,
      name: newAsset.value.name,
      picture: newAsset.value.picture || 'https://via.placeholder.com/300x200',
    })
    showForm.value = false
    newAsset.value = {
      id: '',
      name: '',
      assetClass: '',
      serialNumber: '',
      merk: '',
      total: 0,
      description: '',
      picture: '',
    }
  } else {
    alert('Please fill Asset ID and Name')
  }
}

const cancelForm = () => {
  showForm.value = false
  newAsset.value = {
    id: '',
    name: '',
    assetClass: '',
    serialNumber: '',
    merk: '',
    total: 0,
    description: '',
    picture: '',
  }
}
</script>

<style scoped>
.material-icons {
  font-size: 18px;
}

.material-icons.text-sm {
  font-size: 18px;
}

.material-icons.text-base {
  font-size: 20px;
}

.material-icons.text-2xl {
  font-size: 24px;
}
</style>
