<template>
  <div>
    <h2 class="text-xl font-bold mb-4">Membership</h2>
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
          @click="
            () => {
              activeTab = 'upload'
              showForm = false
            }
          "
        >
          Upload Potongan
        </button>
        <button
          class="px-4 py-2 rounded border border-[#02A2DC] font-semibold"
          :class="activeTab === 'pinjaman' ? 'bg-[#02A2DC] text-white' : 'bg-white text-[#02A2DC]'"
          @click="
            () => {
              activeTab = 'pinjaman'
              showForm = false
            }
          "
        >
          Pinjaman
        </button>
      </div>

      <!-- === SETTLEMENT TAB === -->
      <div v-if="activeTab === 'settlement'">
        <div v-if="!showForm">
          <div class="flex flex-col md:flex-row md:items-end md:justify-between mb-6 gap-3">
            <div class="relative w-full md:w-1/3">
              <input
                type="text"
                v-model="searchQuery"
                placeholder="Search"
                class="w-full p-2.5 pr-10 border border-gray-300 rounded-md focus:outline-none"
              />
              <span class="material-icons absolute right-3 top-2.5 text-gray-400">search</span>
              <div class="flex gap-2 mt-3 md:mt-0 md:flex-row md:items-end">
                <button
                  class="bg-[#02A2DC] text-white px-4 py-2 rounded-md flex items-center"
                  @click="newTransaction"
                >
                  <span class="material-icons mr-1 text-sm">add</span>
                  New Settlement
                </button>
              </div>
            </div>
          </div>
          <div class="overflow-x-auto">
            <div class="min-w-[1200px] inline-block align-middle">
              <table class="w-full text-sm border border-gray-200 rounded overflow-hidden">
                <thead class="bg-[#E6F7FD] text-[#02A2DC] text-left">
                  <tr>
                    <th class="p-3 border">Document Number</th>
                    <th class="p-3 border">MBRID</th>
                    <th class="p-3 border">Name</th>
                    <th class="p-3 border">Total Amount</th>
                    <th class="p-3 border">Status</th>
                    <th class="p-3 border">STL Date</th>
                    <th class="p-3 border">STL By</th>
                    <th class="p-3 border text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in settlementList" :key="index" class="hover:bg-gray-50">
                    <td class="p-3 border">{{ item.stl_doc_num }}</td>
                    <td class="p-3 border">{{ item.mbr_mbrid }}</td>
                    <td class="p-3 border">{{ item.mbr_name }}</td>
                    <td class="p-3 border">{{ item.settlement_amount }}</td>
                    <td class="p-3 border">{{ item.status }}</td>
                    <td class="p-3 border">{{ item.settlement_date }}</td>
                    <td class="p-3 border">{{ item.settlement_by }}</td>
                    <td class="p-3 border text-center">
                      <button class="text-yellow-600 mr-2 hover:text-yellow-800">
                        <span class="material-icons">edit</span>
                      </button>
                      <button class="text-red-600 hover:text-red-800">
                        <span class="material-icons">delete</span>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Pagination Controls -->
            <div class="flex justify-center mt-4">
              <button
                @click="previousPage"
                class="px-4 py-2 text-sm font-medium text-[#02A2DC] border border-[#02A2DC] rounded-md mr-2"
                :disabled="currentPage === 1"
              >
                Previous
              </button>
              <span class="px-4 py-2 text-sm font-medium"
                >{{ currentPage }} / {{ Math.ceil(totalItems / itemsPerPage) }}</span
              >
              <button
                @click="nextPage"
                class="px-4 py-2 text-sm font-medium text-[#02A2DC] border border-[#02A2DC] rounded-md ml-2"
                :disabled="currentPage === Math.ceil(totalItems / itemsPerPage)"
              >
                Next
              </button>
            </div>
          </div>
        </div>
        <!-- Form Add New Settlement -->
        <div v-if="showForm" class="mb-6">
          <div class="flex flex-col gap-3 md:flex-row md:items-end md:justify-between mb-6">
            <button
              class="text-[#02A2DC] font-semibold flex items-center mb-4 md:mb-0"
              @click="showForm = false"
            >
              <span class="material-icons mr-2">arrow_back</span> Add New Settlement
            </button>
            <div class="flex gap-2 mb-6 items-center justify-end">
              <button class="bg-[#02A2DC] text-white px-6 py-2 rounded-md font-semibold">
                <span class="material-icons mr-2">save</span> Save
              </button>
              <button
                class="border border-[#02A2DC] text-[#02A2DC] px-6 py-2 rounded-md font-semibold"
              >
                <span class="material-icons mr-2">edit</span> Update
              </button>
              <button
                class="border border-[#02A2DC] text-[#02A2DC] px-6 py-2 rounded-md font-semibold"
              >
                <span class="material-icons mr-2">publish</span> Post
              </button>
              <button
                class="border border-[#02A2DC] text-[#02A2DC] px-6 py-2 rounded-md font-semibold"
                @click="showForm = false"
              >
                <span class="material-icons mr-2">cancel</span> Cancel
              </button>
              <button
                class="text-[#02A2DC] font-semibold flex items-center"
                @click="showForm = false"
              >
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
                <input
                  v-model="settlementData.mbr_name"
                  class="w-full border border-gray-300 p-3 rounded-md"
                  readonly
                />
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
                  <select class="w-full border border-gray-300 p-3 rounded-md">
                    <option>Select Doc Number</option>
                  </select>
                </div>
                <div class="mb-4">
                  <label class="block text-sm font-medium mb-1">Company</label>
                  <input
                    type="text"
                    class="w-full border border-gray-300 p-3 rounded-md"
                    placeholder="Enter Company"
                  />
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

          <!-- Tabel Settlement hanya tampil jika showForm false -->
          <div v-if="activeTab === 'settlement' && !showForm" class="overflow-x-auto"></div>
        </div>
      </div>

      <!-- === UPLOAD TAB === -->
      <div v-else-if="activeTab === 'upload'">
        <div v-if="!showForm">
          <!-- Upload Table View -->
          <div class="flex flex-col md:flex-row md:items-end md:justify-between mb-6 gap-3">
            <div class="relative w-full md:w-1/3">
              <input
                type="text"
                v-model="searchQuery"
                placeholder="Search"
                class="w-full p-2.5 pr-10 border border-gray-300 rounded-md focus:outline-none"
              />
              <span class="material-icons absolute right-3 top-2.5 text-gray-400">search</span>
            </div>
            <div class="flex gap-2 mt-3 md:mt-0 md:flex-row md:items-end">
              <button
                class="bg-[#02A2DC] text-white px-4 py-2 rounded-md flex items-center"
                @click="newTransaction"
              >
                <span class="material-icons mr-1 text-sm">add</span>
                New Transaction
              </button>
              <button
                class="bg-[#E6F7FD] text-[#02A2DC] border border-[#02A2DC] px-4 py-2 rounded-md flex items-center"
                @click="uploadData"
              >
                <span class="material-icons mr-1 text-sm">upload</span>
                Upload Data
              </button>
            </div>
          </div>
          <div class="overflow-x-auto">
            <div class="min-w-[1200px] inline-block align-middle">
              <table class="w-full text-sm border border-gray-200 rounded overflow-hidden">
                <thead class="bg-[#E6F7FD] text-[#02A2DC] text-left">
                  <tr>
                    <th class="p-3 border">Document Number</th>
                    <th class="p-3 border">Doc Date</th>
                    <th class="p-3 border">Description</th>
                    <th class="p-3 border text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(item, index) in paginatedUploadPotongan"
                    :key="index"
                    class="hover:bg-gray-50"
                  >
                    <td class="p-3 border">{{ item.doc_num }}</td>
                    <td class="p-3 border">{{ item.doc_date }}</td>
                    <td class="p-3 border">{{ item.description }}</td>
                    <td class="p-3 border text-center">
                      <button class="text-yellow-600 mr-2 hover:text-yellow-800">
                        <span class="material-icons">edit</span>
                      </button>
                      <button class="text-red-600 hover:text-red-800">
                        <span class="material-icons">delete</span>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Pagination Controls -->
            <div class="flex justify-center mt-4">
              <button
                @click="previousUploadPage"
                class="px-4 py-2 text-sm font-medium text-[#02A2DC] border border-[#02A2DC] rounded-md mr-2"
                :disabled="uploadCurrentPage === 1"
              >
                Previous
              </button>
              <span class="px-4 py-2 text-sm font-medium">
                {{ uploadCurrentPage }} / {{ uploadTotalPages }}
              </span>
              <button
                @click="nextUploadPage"
                class="px-4 py-2 text-sm font-medium text-[#02A2DC] border border-[#02A2DC] rounded-md ml-2"
                :disabled="uploadCurrentPage === uploadTotalPages"
              >
                Next
              </button>
            </div>
          </div>
        </div>
        <div v-else>
          <!-- Tampilan Form Upload -->
          <div class="mb-6">
            <button
              class="text-[#02A2DC] font-semibold mb-4 flex items-center"
              @click="showForm = false"
            >
              <span class="material-icons mr-2">arrow_back</span> Add New Transaction
            </button>
            <div class="flex justify-end gap-2 mb-6">
              <button @click="saveUploadForm" class="bg-[#02A2DC] text-white px-6 py-2 rounded">
                Save
              </button>
              <button
                class="border border-[#02A2DC] text-[#02A2DC] px-6 py-2 rounded"
                @click="showForm = false"
              >
                Cancel
              </button>
            </div>
            <!-- Bagian untuk Company dan TXN Date -->
            <div class="flex gap-6 mb-4">
              <div class="w-1/2">
                <label class="block text-sm font-medium mb-1">Company</label>
                <select
                  v-model="uploadForm.company"
                  class="w-full border border-gray-300 p-3 rounded-md"
                >
                  <option value="">Select Company</option>
                  <option value="1000">1000</option>
                </select>
              </div>
              <div class="w-1/2">
                <label class="block text-sm font-medium mb-1">TXN Date</label>
                <input
                  v-model="uploadForm.txnDate"
                  type="date"
                  class="w-full border border-gray-300 p-3 rounded-md"
                />
              </div>
            </div>
            <div class="flex gap-6 mb-4">
              <div class="w-1/2">
                <label class="block text-sm font-medium mb-1">Description</label>
                <textarea
                  v-model="uploadForm.description"
                  class="w-full border border-gray-300 p-3 rounded-md"
                  placeholder="Add Description"
                ></textarea>
              </div>
            </div>
            <div class="bg-gray-50 p-4 rounded-md border border-gray-300">
              <h4 class="font-semibold text-sm mb-2">Detail Transaction</h4>
              <div class="mb-3">
                <input
                  type="text"
                  placeholder="Search"
                  class="border border-gray-300 rounded-md p-2 w-full md:w-1/3"
                />
                <div class="flex justify-end">
                  <button
                    @click="addNewDetailRowUpload"
                    class="mt-2 bg-[#02A2DC] text-white px-4 py-2 rounded-md flex items-center"
                    style="display: flex; align-items: center"
                  >
                    <span class="material-icons mr-1 text-sm">add</span>
                    Add New Detail
                  </button>
                </div>
              </div>
              <div class="overflow-x-auto">
                <table class="w-full text-sm border border-gray-200 rounded overflow-hidden">
                  <thead class="bg-[#E6F7FD] text-[#02A2DC] text-left">
                    <tr>
                      <th class="p-3 border">Loan Doc Number</th>
                      <th class="p-3 border">MBR ID</th>
                      <th class="p-3 border">Name</th>
                      <th class="p-3 border">Pay Method</th>
                      <th class="p-3 border">Pokok</th>
                      <th class="p-3 border">Jasa</th>
                      <th class="p-3 border">Amount</th>
                      <th class="p-3 border">Description</th>
                      <th class="p-3 border text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(item, index) in rowUploadDetails"
                      :key="index"
                      class="bg-white border hover:bg-gray-50"
                    >
                      <td class="p-3 border">{{ item.loanDocNumber }}</td>
                      <td class="p-3 border">{{ item.mbrId }}</td>
                      <td class="p-3 border">{{ item.name }}</td>
                      <td class="p-3 border">{{ item.payMethod }}</td>
                      <td class="p-3 border">{{ item.pokok }}</td>
                      <td class="p-3 border">{{ item.jasa }}</td>
                      <td class="p-3 border">{{ item.amount }}</td>
                      <td class="p-3 border">{{ item.description }}</td>
                      <td class="p-3 border text-center">
                        <button class="text-yellow-600 mr-2 hover:text-yellow-800">
                          <span class="material-icons">edit</span>
                        </button>
                        <button class="text-red-600 hover:text-red-800">
                          <span class="material-icons">delete</span>
                        </button>
                      </td>
                    </tr>
                    <tr v-if="rowUploadDetailsInput" class="bg-white border hover:bg-gray-50">
                      <!-- Loan Doc Number as Select Dropdown -->
                      <td class="border p-3">
                        <select v-model="rowUpload.loanDocNumber" class="w-full p-1 border rounded">
                          <option disabled value="">Select Loan Doc Number</option>
                          <option v-for="(doc, index) in loanDocNumbers" :key="index" :value="doc">
                            {{ doc.doc_num }}
                          </option>
                        </select>
                      </td>
                      <td class="border p-3">
                        <select v-model="rowUpload.mbrId" class="w-full p-1 border rounded">
                          <option disabled value="">Select MBR ID</option>
                          <option v-for="(mbr, idx) in mbrIds" :key="idx" :value="mbr.mbrid">
                            {{ mbr.mbrid }}
                          </option>
                        </select>
                      </td>
                      <td class="p-3 border">
                        <input
                          v-model="rowUpload.name"
                          type="text"
                          class="w-full p-1 border rounded"
                          :readonly="!!rowUpload.mbrId"
                        />
                      </td>
                      <td class="p-3 border">
                        <select v-model="rowUpload.payMethod" class="w-full p-1 border rounded">
                          <option disabled value="">Select Pay Method</option>
                          <option
                            v-for="(method, index) in payMethods"
                            :key="index"
                            :value="method.inact_name"
                          >
                            {{ method.inact_name }}
                          </option>
                        </select>
                      </td>
                      <td class="p-3 border">
                        <input
                          v-model="rowUpload.pokok"
                          type="number"
                          class="w-full p-1 border rounded"
                        />
                      </td>
                      <td class="p-3 border">
                        <input
                          v-model="rowUpload.jasa"
                          type="number"
                          class="w-full p-1 border rounded"
                        />
                      </td>
                      <td class="p-3 border">
                        <input
                          v-model="rowUpload.amount"
                          type="number"
                          class="w-full p-1 border rounded"
                        />
                      </td>
                      <td class="p-3 border">
                        <input
                          v-model="rowUpload.description"
                          class="w-full p-1 border rounded"
                          type="text"
                        />
                      </td>
                      <td class="p-3 border text-center">
                        <button
                          class="text-yellow-600 mr-2 hover:text-yellow-800"
                          @click="saveNewDetailRowUpload"
                        >
                          Add
                        </button>
                        <button
                          class="text-red-600 hover:text-red-800"
                          @click="cancelNewDetailRowUpload"
                        >
                          Cancel
                          <!-- <span class="material-icons">delete</span> -->
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- === PINJAMAN TAB === -->
      <div v-else-if="activeTab === 'pinjaman'">
        <!-- Form Add New Transaction -->
        <div v-if="showForm" class="mb-6">
          <div class="flex mb-6 justify-start">
            <button
              class="text-[#02A2DC] font-semibold flex items-center"
              @click="showForm = false"
            >
              <span class="material-icons mr-2">arrow_back</span>
              Add New Settlement
            </button>
          </div>
          <!-- Action Buttons (Save, Cancel, Print) -->
          <div class="flex gap-2 mb-6 items-center justify-end">
            <button
              @click="submitCompanyForm"
              class="bg-[#02A2DC] text-white px-6 py-2 rounded-md font-semibold flex items-center"
            >
              <span class="material-icons mr-2">save</span> Save
            </button>
            <button
              class="border border-[#02A2DC] text-[#02A2DC] px-6 py-2 rounded-md font-semibold"
            >
              <span class="material-icons mr-2">cancel</span> Cancel
            </button>
            <button
              class="border border-[#02A2DC] text-[#02A2DC] px-6 py-2 rounded-md font-semibold"
            >
              <span class="material-icons mr-2">print</span> Print
            </button>
          </div>
          <!-- New Transaction Form: Cards -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Company Card -->
            <form
              @submit.prevent=""
              class="w-full bg-white border border-gray-200 rounded-lg p-6 shadow-lg"
            >
              <h4 class="font-semibold text-base mb-4">Company</h4>

              <div class="mb-4">
                <label class="block text-sm font-medium mb-1">Member ID</label>
                <select
                  v-model="companyForm.memberId"
                  class="w-full border border-gray-300 p-3 rounded-md"
                >
                  <option value="" disabled selected>Select a Member</option>
                  <option
                    v-for="member in membershipList.tabledata"
                    :key="member.mbrid"
                    :value="member.mbrid"
                  >
                    {{ member.name }} ({{ member.mbrid }})
                  </option>
                </select>
              </div>

              <!-- Other form fields remain the same -->
              <div class="mb-4">
                <label class="block text-sm font-medium mb-1">Member Name</label>
                <input
                  v-model="companyForm.memberName"
                  type="text"
                  class="w-full border border-gray-300 p-3 rounded-md"
                  placeholder="Enter Name"
                />
              </div>

              <div class="mb-4">
                <label class="block text-sm font-medium mb-1">Jenis Pinjaman</label>
                <select
                  v-model="companyForm.jenisPinjaman"
                  class="w-full border border-gray-300 p-3 rounded-md"
                >
                  <option value="">Select Jenis Pinjaman</option>
                  <option value="Konsumtif">Konsumtif</option>
                  <option value="Investasi">Investasi</option>
                  <option value="Modal Kerja">Modal Kerja</option>
                </select>
              </div>

              <div class="grid md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium mb-1">Dana Diterima</label>
                  <input
                    v-model.number="companyForm.danaDiterima"
                    type="number"
                    class="w-full border border-gray-300 p-3 rounded-md"
                    placeholder="000.000.000"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium mb-1">Tenor</label>
                  <input
                    v-model.number="companyForm.tenor"
                    type="number"
                    class="w-full border border-gray-300 p-3 rounded-md"
                    placeholder="Enter Tenor"
                  />
                </div>
              </div>

              <div class="grid md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium mb-1">Jasa (%)</label>
                  <input
                    v-model.number="companyForm.jasa"
                    type="number"
                    class="w-full border border-gray-300 p-3 rounded-md"
                    placeholder="Enter Jasa (%)"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium mb-1">Admin (%)</label>
                  <input
                    v-model.number="companyForm.admin"
                    type="number"
                    class="w-full border border-gray-300 p-3 rounded-md"
                    placeholder="Enter Admin (%)"
                  />
                </div>
              </div>
              <div class="grid md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium mb-1">Total Amount</label>
                  <input
                    v-model.number="companyForm.totalAmount"
                    type="number"
                    class="w-full border border-gray-300 p-3 rounded-md"
                    placeholder="000.000.000"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium mb-1">Angsuran Perbulan</label>
                  <input
                    v-model.number="companyForm.angsuranPerbulan"
                    type="number"
                    class="w-full border border-gray-300 p-3 rounded-md"
                    placeholder="000.000.000"
                  />
                </div>
              </div>
              <div class="grid md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium mb-1">Accumulation</label>
                  <input
                    v-model.number="companyForm.accumulation"
                    type="number"
                    class="w-full border border-gray-300 p-3 rounded-md"
                    placeholder="000.000.000"
                  />
                </div>
              </div>
              <div class="flex justify-end">
                <button
                  type="submit"
                  class="bg-[#02A2DC] text-white px-6 py-2 rounded-md font-semibold"
                >
                  Accumulate
                </button>
              </div>
            </form>

            <!-- Settlement Card -->
            <div class="w-full bg-white border border-gray-200 rounded-lg p-6 shadow-lg">
              <h4 class="font-semibold text-base mb-4">Settlement</h4>
              <div class="mb-4">
                <label class="block text-sm font-medium mb-1">Sett Document Number</label>
                <input
                  type="text"
                  class="w-full border border-gray-300 p-3 rounded-md"
                  placeholder="Add Doc Number"
                />
              </div>
              <div class="mb-4">
                <label class="block text-sm font-medium mb-1">Status</label>
                <input
                  type="text"
                  class="w-full border border-gray-300 p-3 rounded-md"
                  placeholder="Add Status"
                />
              </div>
              <div class="mb-4">
                <label class="block text-sm font-medium mb-1">Settlement Fee</label>
                <input
                  type="number"
                  class="w-full border border-gray-300 p-3 rounded-md"
                  placeholder="000.000.000"
                />
              </div>
              <div class="mb-4">
                <label class="block text-sm font-medium mb-1">Settle My Amount</label>
                <input
                  type="number"
                  class="w-full border border-gray-300 p-3 rounded-md"
                  placeholder="000.000.00"
                />
              </div>
              <div class="grid md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium mb-1">Settlement Date</label>
                  <input type="date" class="w-full border border-gray-300 p-3 rounded-md" />
                </div>
                <div>
                  <label class="block text-sm font-medium mb-1">Settlement By</label>
                  <input
                    type="text"
                    class="w-full border border-gray-300 p-3 rounded-md"
                    placeholder="Add Name"
                  />
                </div>
              </div>
            </div>
            <!-- Document Info Card -->
            <div class="w-full bg-white border border-gray-200 rounded-lg p-6 shadow-lg">
              <h4 class="font-semibold text-base mb-4">Document Info</h4>
              <div class="grid md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium mb-1">Document Number</label>
                  <input
                    type="text"
                    class="w-full border border-gray-300 p-3 rounded-md"
                    placeholder="Add Doc Number"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium mb-1">Document Date</label>
                  <input type="date" class="w-full border border-gray-300 p-3 rounded-md" />
                </div>
              </div>
              <div class="grid md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium mb-1">Status</label>
                  <input
                    type="text"
                    class="w-full border border-gray-300 p-3 rounded-md"
                    placeholder="Add Status"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium mb-1">Approval</label>
                  <select class="w-full border border-gray-300 p-3 rounded-md">
                    <option>Select Approval</option>
                  </select>
                </div>
              </div>
            </div>

            <!-- Periodic Period Card -->
            <div class="w-full bg-white border border-gray-200 rounded-lg p-6 shadow-lg">
              <h4 class="font-semibold text-base mb-4">Periodic Period</h4>
              <div class="mb-4">
                <label class="block text-sm font-medium mb-1">Start</label>
                <input type="date" class="w-full border border-gray-300 p-3 rounded-md" />
              </div>
              <div class="mb-4">
                <label class="block text-sm font-medium mb-1">End</label>
                <input type="date" class="w-full border border-gray-300 p-3 rounded-md" />
              </div>
            </div>
          </div>
        </div>

        <!-- Tabel Pinjaman dan tombol -->
        <div v-else class="mb-6">
          <!-- Search box -->
          <div class="relative mb-3">
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Search"
              class="w-full p-2.5 pr-10 border border-gray-300 rounded-md focus:outline-none"
            />
            <span class="material-icons absolute right-3 top-2.5 text-gray-400">search</span>
          </div>

          <div class="flex justify-between items-center mt-4 w-full">
            <button
              class="border border-[#02A2DC] text-[#02A2DC] px-4 py-2 rounded-md flex items-center font-semibold text-sm shadow-sm hover:bg-[#E6F7FD] transition"
              @click="openFilter"
              style="box-shadow: 0 2px 8px 0 #02a2dc1a"
            >
              <span class="material-icons mr-1 text-base">filter_alt</span>
              Filter
              <span class="material-icons ml-1 text-base">arrow_drop_down</span>
            </button>

            <button
              class="bg-[#02A2DC] text-white px-4 py-2 rounded-md flex items-center font-semibold text-sm shadow-sm hover:bg-[#028fc7] transition"
              @click="
                () => {
                  showForm = true
                  resetCompanyForm()
                }
              "
              style="box-shadow: 0 2px 8px 0 #02a2dc1a"
            >
              <span class="material-icons mr-1 text-base">add</span>
              New Transaction
            </button>
          </div>
        </div>
        <!-- Table Section -->
        <div v-if="activeTab === 'pinjaman' && !showForm" class="w-full">
          <!-- Wrapper agar bisa scroll horizontal di mobile -->
          <div class="overflow-x-auto">
            <div class="min-w-[1200px] inline-block align-middle">
              <table class="w-full text-sm border border-gray-200 rounded">
                <thead class="bg-[#E6F7FD] text-[#02A2DC] text-left">
                  <tr>
                    <th class="p-3 border">Document Number</th>
                    <th class="p-3 border">Member ID</th>
                    <th class="p-3 border">Nama</th>
                    <th class="p-3 border">Loan Code</th>
                    <th class="p-3 border">Amount</th>
                    <th class="p-3 border">Term</th>
                    <th class="p-3 border">Status</th>
                    <th class="p-3 border">Pokok</th>
                    <th class="p-3 border">Jasa</th>
                    <th class="p-3 border">Outstanding Pokok</th>
                    <th class="p-3 border">Outstanding Jasa</th>
                    <th class="p-3 border">APR</th>
                    <th class="p-3 border">Sisa Tenor</th>
                    <th class="p-3 border text-center bg-[#E6F7FD] sticky right-0 z-10">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in paginatedLoans" :key="index" class="hover:bg-gray-50">
                    <td class="p-3 border">{{ item.doc_num }}</td>
                    <td class="p-3 border">{{ item.mbr_mbrid }}</td>
                    <td class="p-3 border">{{ item.mbr_name }}</td>
                    <td class="p-3 border">{{ item.loan_code }}</td>
                    <td class="p-3 border">Rp. {{ item.amount }}</td>
                    <td class="p-3 border">{{ item.term }}</td>
                    <td class="p-3 border">{{ item.status }}</td>
                    <td class="p-3 border">{{ item.pokok }}</td>
                    <td class="p-3 border">{{ item.jasa }}</td>
                    <td class="p-3 border">{{ item.outpok }}</td>
                    <td class="p-3 border">{{ item.outjasa }}</td>
                    <td class="p-3 border">{{ item.apr }}</td>
                    <td class="p-3 border">{{ item.sisa_tenor }}</td>
                    <td class="p-3 border text-center bg-white sticky right-0 z-10">
                      <button class="text-yellow-600 mr-2 hover:text-yellow-800">
                        <span class="material-icons">edit</span>
                      </button>
                      <button class="text-red-600 hover:text-red-800">
                        <span class="material-icons">delete</span>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Pagination Controls -->
        <div class="flex justify-center mt-4 flex-wrap gap-2">
          <button
            @click="previousPage"
            class="px-4 py-2 text-sm font-medium text-[#02A2DC] border border-[#02A2DC] rounded-md disabled:opacity-50"
            :disabled="currentPage === 1"
          >
            Previous
          </button>
          <span class="px-4 py-2 text-sm font-medium">
            {{ currentPage }} / {{ Math.ceil(totalItems / itemsPerPage) }}
          </span>
          <button
            @click="nextPage"
            class="px-4 py-2 text-sm font-medium text-[#02A2DC] border border-[#02A2DC] rounded-md disabled:opacity-50"
            :disabled="currentPage === Math.ceil(totalItems / itemsPerPage)"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// import con from '@/constants'
import PinjamanService from '@/services/Pinjaman/PinjamanService'
import { ref, onMounted, reactive, computed, watch } from 'vue'
import { useRouter } from 'vue-router'

const route = useRouter()

const activeTab = ref('pinjaman')
const showForm = ref(false)
const searchQuery = ref('')
const pinjamanList = ref([])
const settlementList = ref([])
const membershipList = ref([])
const uploadPotonganList = ref([])
const rowUploadDetails = ref([])
const rowUploadDetailsInput = ref(false)
const rowUpload = ref({})
const loanDocNumbers = ref([])
const mbrIds = ref([])
const payMethods = ref([])

const pinjamanService = new PinjamanService()

watch(
  () => activeTab.value,
  (newTab) => {
    console.log('Active Tab Changed:', newTab)
  },
)

const getMembership = async () => {
  try {
    const response = await pinjamanService.getMembership()
    console.log('Membership Data:', response)
    membershipList.value = response
  } catch (error) {
    console.error('Error fetching membership data:', error)
  }
}

onMounted(async () => {
  try {
    await getMembership() // Fetch membership data

    const resp = await pinjamanService.getSettlementList() // Settlement List
    const uploadResponse = await pinjamanService.getUploadPotonganList() // Upload Potongan List
    await getSelectDataUpload()

    // Pinjaman List API response
    settlementList.value = resp.tabledata // Settlement List API response
    uploadPotonganList.value = uploadResponse // Upload Potongan List API response

    console.log('Pinjaman List:', pinjamanList.value)
    console.log('Settlement List:', settlementList.value)
    console.log('Upload Potongan List:', uploadPotonganList.value)

    updatePagination()
  } catch (error) {
    console.error('Error fetching data:', error)
  }
})

onMounted(async () => {
  const response = await pinjamanService.getPinjamanList() // Pinjaman List
  pinjamanList.value = response.tabledata
})

async function getSelectDataUpload() {
  try {
    const loanDocResponse = await pinjamanService.getLoanDocNumbers()
    const mbrIdResponse = await pinjamanService.getMbrIds()
    const payMethodResponse = await pinjamanService.getPayMethods()

    loanDocNumbers.value = loanDocResponse.tabledata
    mbrIds.value = mbrIdResponse.tabledata
    payMethods.value = payMethodResponse.tabledata
    console.log('Loan Document Numbers:', loanDocNumbers.value)
    console.log('Member IDs:', mbrIds.value)
    console.log('Payment Methods:', payMethods.value)
  } catch (error) {
    throw new Error('Error fetching select data for upload: ' + error.message)
  }
}
watch(
  () => rowUpload.value.mbrId,
  (newMbrId) => {
    if (newMbrId) {
      const selectedMember = mbrIds.value.find((mbr) => mbr.mbrid === newMbrId)
      if (selectedMember) {
        rowUpload.value.name = selectedMember.name
      }
    }
  },
)
const companyForm = reactive({
  doc_num: '',
  memberId: '',
  memberName: '',
  jenisPinjaman: '',
  danaDiterima: null,
  tenor: null,
  jasa: null,
  admin: null,
  totalAmount: null,
  angsuranPerbulan: null,
  accumulation: null,
})

function resetCompanyForm() {
  companyForm.doc_num = ''
  companyForm.memberId = ''
  companyForm.memberName = ''
  companyForm.jenisPinjaman = ''
  companyForm.danaDiterima = null
  companyForm.tenor = null
  companyForm.jasa = null
  companyForm.admin = null
  companyForm.totalAmount = null
  companyForm.angsuranPerbulan = null
  companyForm.accumulation = null
}

function addNewDetailRowUpload() {
  rowUploadDetailsInput.value = true
  rowUpload.value = {}
}

function saveNewDetailRowUpload() {
  if (
    rowUpload.value.loanDocNumber &&
    rowUpload.value.mbrId &&
    rowUpload.value.name &&
    rowUpload.value.payMethod &&
    rowUpload.value.pokok &&
    rowUpload.value.jasa &&
    rowUpload.value.amount &&
    rowUpload.value.description
  ) {
    const dataUpload = {
      loanDocNumber: rowUpload.value.loanDocNumber,
      mbrId: rowUpload.value.mbrId,
      name: rowUpload.value.name,
      payMethod: rowUpload.value.payMethod,
      pokok: rowUpload.value.pokok,
      jasa: rowUpload.value.jasa,
      amount: rowUpload.value.amount,
      description: rowUpload.value.description,
    }

    rowUploadDetails.value.push(dataUpload)
    console.log('New detail row added:', rowUploadDetails.value)
    cancelNewDetailRowUpload()
  } else {
    alert('Please fill all fields before saving.')
  }
}
function cancelNewDetailRowUpload() {
  rowUploadDetailsInput.value = false
}

async function submitCompanyForm() {
  const data = [
    {
      formid: 'ZKOPPJM',
      form_version: '607',
      blockid: 'LON',
      master_blockid: '',
      txn: 'new',
      table_id: 'mbr_lon',
      source_type: 'TABLE',
      rid: '',
      tid: 0,
      tabledata: [
        {
          colname: 'mbr_company',
          colval: '1000', // Populate from form input
          coltype: 'vchar',
          formatmask: '%d-%m-%Y',
          master_colname: '',
        },
        {
          colname: 'mbr_mbrid',
          colval: companyForm.memberId, // Populate from form input
          coltype: 'vchar',
          formatmask: '%d-%m-%Y',
          master_colname: '',
        },
        {
          colname: '*name',
          colval: companyForm.memberName, // Populate from form input
          coltype: 'vchar',
          formatmask: '%d-%m-%Y',
          master_colname: '',
        },
        {
          colname: 'loan_code',
          colval: 'BNS', // Static value
          coltype: 'vchar',
          formatmask: '%d-%m-%Y',
          master_colname: '',
        },
        {
          colname: 'amount',
          colval: companyForm.danaDiterima !== null ? companyForm.danaDiterima : 0, // Populate from form input
          coltype: 'number',
          formatmask: '{:,.0f}',
          master_colname: '',
        },
        {
          colname: 'term',
          colval: companyForm.tenor !== null ? companyForm.tenor : 0, // Populate from form input
          coltype: 'number',
          formatmask: '%d-%m-%Y',
          master_colname: '',
        },
        {
          colname: 'plafon_am',
          colval: '0', // Static value
          coltype: 'number',
          formatmask: '{:,.0f}',
          master_colname: '',
        },
        {
          colname: 'interest',
          colval: '0.00', // Static value
          coltype: 'number',
          formatmask: '{:,.2f}',
          master_colname: '',
        },
        {
          colname: 'int_am',
          colval: '0.00', // Static value
          coltype: 'number',
          formatmask: '{:,.2f}',
          master_colname: '',
        },
        {
          colname: 'int_adm',
          colval: '0.00', // Static value
          coltype: 'number',
          formatmask: '{:,.2f}',
          master_colname: '',
        },
        {
          colname: 'am_adm',
          colval: '0.00', // Static value
          coltype: 'number',
          formatmask: '{:,.2f}',
          master_colname: '',
        },
        {
          colname: 'tot_am',
          colval: '0', // Static value
          coltype: 'number',
          formatmask: '{:,.0f}',
          master_colname: '',
        },
        {
          colname: 'instal',
          colval: '0', // Static value
          coltype: 'number',
          formatmask: '{:,.0f}',
          master_colname: '',
        },
        {
          colname: 'doc_date',
          colval: '2025-07-02', // Static value
          coltype: 'date',
          formatmask: '%d-%m-%Y',
          master_colname: '',
        },
      ],
    },
  ]

  console.log('Data to be sent:', data)

  try {
    const response = await pinjamanService.createPinjaman(data)
    console.log(response)
  } catch (error) {
    console.error('Error creating pinjaman:', error)
  }
}

const activeStep = ref(1)

function goToStep2() {
  activeStep.value = 2
}

function goToStep1() {
  activeStep.value = 1
}

const filteredLoans = computed(() => {
  return pinjamanList.value.filter(
    (loan) =>
      loan.mbr_name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      loan.doc_num.includes(searchQuery.value) ||
      loan.mbr_mbrid.includes(searchQuery.value),
  )
})

const itemsPerPage = 10
const currentPage = ref(1)
const totalItems = ref(0)
const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage))
const paginatedLoans = ref([])

function updatePagination() {
  totalItems.value = filteredLoans.value.length
  const startIndex = (currentPage.value - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  paginatedLoans.value = filteredLoans.value.slice(startIndex, endIndex)
}

watch(filteredLoans, () => {
  updatePagination()
})

function previousPage() {
  if (currentPage.value > 1) {
    currentPage.value--
    updatePagination()
  }
}

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
    updatePagination()
  }
}

const uploadCurrentPage = ref(1)
const uploadItemsPerPage = 10
const uploadTotalItems = computed(() => filteredUploadPotongan.value.length)
const uploadTotalPages = computed(() => Math.ceil(uploadTotalItems.value / uploadItemsPerPage))

// Create filtered and paginated upload data
const filteredUploadPotongan = computed(() => {
  return uploadPotonganList.value.filter(
    (item) =>
      item.description?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.doc_num?.includes(searchQuery.value) ||
      item.doc_date?.includes(searchQuery.value),
  )
})

const paginatedUploadPotongan = computed(() => {
  const startIndex = (uploadCurrentPage.value - 1) * uploadItemsPerPage
  const endIndex = startIndex + uploadItemsPerPage
  return filteredUploadPotongan.value.slice(startIndex, endIndex)
})

// Add pagination functions for upload table
function previousUploadPage() {
  if (uploadCurrentPage.value > 1) {
    uploadCurrentPage.value--
  }
}

function nextUploadPage() {
  if (uploadCurrentPage.value < uploadTotalPages.value) {
    uploadCurrentPage.value++
  }
}

// Reset pagination when search changes
watch(searchQuery, () => {
  uploadCurrentPage.value = 1
})

// Upload form data
const uploadForm = reactive({
  company: '',
  txnDate: '',
  description: '',
  details: [],
})

function newTransaction() {
  if (activeTab.value === 'upload') {
    // Untuk upload tab, tampilkan form di halaman yang sama
    showForm.value = true
  } else {
    // Untuk settlement tab, redirect ke halaman create
    route.push('/membership/settlement/create')
  }
}

function uploadData() {
  alert('Fitur upload data belum diimplementasikan.')
}

async function saveUploadForm() {
  if (!uploadForm.company || !uploadForm.txnDate || !uploadForm.description) {
    alert('Please fill in all required fields')
    return
  }

  // Generate document number
  const generateDocNumber = () => {
    const now = new Date()
    const year = now.getFullYear()
    const month = (now.getMonth() + 1).toString().padStart(2, '0')
    const day = now.getDate().toString().padStart(2, '0')
    const time = now.getTime().toString().slice(-5)
    return `${year}${month}${day}${time}`
  }

  const docNumber = generateDocNumber()
  const docRef = `55${docNumber.slice(2)}`

  const data = [
    {
      formid: 'ZKOPUPJ',
      form_version: '604',
      blockid: 'HDR',
      master_blockid: '',
      txn: 'new',
      table_id: 'MBR_EMPL',
      source_type: 'TABLE',
      rid: '',
      tid: 0,
      tabledata: [
        {
          colname: 'doc_num',
          colval: docNumber,
          coltype: 'vchar',
          formatmask: '',
          master_colname: '',
        },
        {
          colname: 'company',
          colval: uploadForm.company,
          coltype: 'vchar',
          formatmask: '',
          master_colname: '',
        },
        {
          colname: 'txndate',
          colval: uploadForm.txnDate,
          coltype: 'date',
          formatmask: '%Y-%m-%d',
          master_colname: '',
        },
        {
          colname: 'description',
          colval: uploadForm.description,
          coltype: 'vchar',
          formatmask: '',
          master_colname: '',
        },
        {
          colname: 'doc_date',
          colval: new Date().toISOString().split('T')[0],
          coltype: 'date',
          formatmask: '%Y-%m-%d',
          master_colname: '',
        },
      ],
    },
  ]

  if (rowUploadDetails.value.length > 0) {
    rowUploadDetails.value.forEach((detail, index) => {
      data.push({
        formid: 'ZKOPUPJ',
        form_version: '604',
        blockid: 'DTL',
        master_blockid: 'HDR',
        txn: 'new',
        table_id: 'MBR_EMPLCL',
        source_type: 'TABLE',
        rid: '',
        tid: index + 1,
        tabledata: [
          {
            colname: 'doc_number',
            colval: '',
            coltype: 'vchar',
            formatmask: '',
            master_colname: 'doc_num',
          },
          {
            colname: 'doc_date',
            colval: '',
            coltype: 'date',
            formatmask: '%Y-%m-%d',
            master_colname: '',
          },
          {
            colname: 'inst_date',
            colval: uploadForm.txnDate,
            coltype: 'date',
            formatmask: '%Y-%m-%d',
            master_colname: '',
          },
          {
            colname: 'docref',
            colval: docRef,
            coltype: 'vchar',
            formatmask: '',
            master_colname: '',
          },
          {
            colname: 'lon_mbr_company',
            colval: uploadForm.company,
            coltype: 'vchar',
            formatmask: '',
            master_colname: '',
          },
          {
            colname: 'lon_mbr_mbrid',
            colval: detail.mbrId,
            coltype: 'vchar',
            formatmask: '',
            master_colname: '',
          },
          {
            colname: '*mbr_name',
            colval: detail.name,
            coltype: 'vchar',
            formatmask: '',
            master_colname: '',
          },
        ],
      })
    })
  }

  console.log('Data to be sent:', JSON.stringify(data, null, 2))

  try {
    const response = await pinjamanService.createUploadPotongan(data)
    console.log('Upload created successfully:', response)

    if (response && (response.success || response.status === 'success' || response.tabledata)) {
      const newUpload = {
        doc_num: docNumber,
        doc_date: uploadForm.txnDate,
        description: uploadForm.description,
        company: uploadForm.company,
      }

      uploadPotonganList.value.unshift(newUpload)

      // Reset form
      uploadForm.company = ''
      uploadForm.txnDate = ''
      uploadForm.description = ''
      rowUploadDetails.value = []
      rowUploadDetailsInput.value = false

      // Kembali ke list view
      showForm.value = false
      alert(`Upload data saved successfully! Document Number: ${docNumber}`)
    }
  } catch (error) {
    console.error('Error creating upload:', error)
    alert('Failed to save upload data. Please try again.')
  }
}

const settlementData = ref(null)
function openSettlementForm(item) {
  settlementData.value = item
  activeTab.value = 'settlement'
  showForm.value = true
}
</script>
<style scoped>
/* Custom Styles for responsiveness */
table {
  overflow-x: auto;
}

th,
td {
  text-align: left;
}

th {
  background-color: #e6f7fd;
}

tr:hover {
  background-color: #f7f7f7;
}

button {
  cursor: pointer;
}

.material-icons {
  font-size: 20px;
}

/* For mobile responsiveness, make sure to allow horizontal scroll */
@media (max-width: 640px) {
  .overflow-x-auto {
    overflow-x: scroll;
  }
}

table {
  width: 100%;
  table-layout: fixed;
}

.sticky {
  position: relative !important; /* fixes sticky issue on mobile */
}

/* Custom Styles for responsiveness */
.grid {
  grid-template-columns: 1fr;
}

@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.card {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card h4 {
  margin-bottom: 16px;
  font-weight: 600;
}

.card .mb-4 {
  margin-bottom: 16px;
}

.card .mb-1 {
  margin-bottom: 8px;
}

.card label {
  font-size: 14px;
  color: #333;
}

.card input,
.card select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.card button {
  width: 100%;
  padding: 12px;
  border: none;
  background-color: #02a2dc;
  color: white;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
}

.card button:hover {
  background-color: #028fbf;
}
</style>
