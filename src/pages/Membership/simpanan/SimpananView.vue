<template>
  <div class="flex">
    <div class="flex-1 bg-[#f6f8fb] min-h-screen p-6">
      <div class="bg-white rounded-md shadow-sm p-6">
        <!-- Tabs -->
        <div class="flex gap-4 mb-6">
          <button
            :class="[
              activeTab === 'simpanan'
                ? 'bg-[#02A2DC] text-white'
                : 'bg-white text-[#02A2DC] border border-[#02A2DC] hover:bg-[#eaf4f9]',
              'px-6 py-3 rounded-md text-sm font-normal shadow',
            ]"
            @click="activeTab = 'simpanan'"
          >
            Simpanan
          </button>
          <button
            :class="[
              activeTab === 'tarik'
                ? 'bg-[#02A2DC] text-white'
                : 'bg-white text-[#02A2DC] border border-[#02A2DC] hover:bg-[#eaf4f9]',
              'px-6 py-3 rounded-md text-sm font-normal shadow',
            ]"
            @click="activeTab = 'tarik'"
          >
            Tarik Simpanan
          </button>
        </div>

        <hr class="border border-[#dcdcdc] mb-6" />

        <!-- Search Bar -->
        <div class="flex mb-4">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search"
            class="w-full px-4 py-2 border border-[#02A2DC] rounded-md"
          />
        </div>

        <!-- Buttons (Aligned to the Right) for Simpanan -->
        <div v-if="activeTab === 'simpanan' && !showForm" class="flex justify-end gap-4 mb-6">
          <button
            @click="toggleForm"
            class="flex items-center gap-2 px-6 py-3 text-sm font-medium text-white bg-[#02A2DC] rounded-md shadow hover:bg-[#0094c8]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add New Transaction
          </button>
          <button
            class="flex items-center gap-2 px-6 py-3 text-sm font-medium text-[#02A2DC] border border-[#02A2DC] rounded-md shadow hover:bg-[#eaf4f9]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 12v8m0-8l-4 4m4-4l4 4M12 4v8"
              />
            </svg>
            Upload Data
          </button>
        </div>

        <!-- Back Header -->
        <div
          v-if="showForm"
          class="flex items-center gap-2 text-[#02A2DC] text-lg font-medium mb-4 cursor-pointer"
          @click="toggleForm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 stroke-[#02A2DC]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Add New Transaction
        </div>

        <!-- Save/Cancel -->
        <div class="flex justify-end gap-4 mb-4" v-if="showForm">
          <button
            class="px-6 py-2 text-sm font-medium text-white bg-[#02A2DC] rounded-md"
            @click="saveTransaction"
          >
            Save
          </button>
          <button
            class="px-6 py-2 text-sm font-medium text-[#02A2DC] border border-[#02A2DC] rounded-md"
            @click="toggleForm"
          >
            Cancel
          </button>
        </div>

        <!-- Form -->
        <div v-if="showForm" class="mt-2 p-6 bg-white rounded-md shadow-sm">
          <div class="grid grid-cols-2 gap-4 mb-4"></div>
          <div class="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label class="block text-sm font-medium">Transaction Date</label>
              <input
                v-model="newTransaction.transactionDate"
                type="date"
                class="w-full px-4 py-2 border border-[#02A2DC] rounded-md"
              />
            </div>
            <div>
              <label class="block text-sm font-medium">Description</label>
              <textarea
                v-model="newTransaction.description"
                placeholder="Add Description"
                class="w-full px-4 py-2 border border-[#02A2DC] rounded-md"
              ></textarea>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label class="block text-sm font-medium">Simpanan</label>
              <select
                v-model="newTransaction.simpanan"
                class="w-full px-4 py-2 border border-[#02A2DC] rounded-md"
              >
                <option value="SP">Pokok</option>
                <option value="SW">Wajib</option>
                <option value="SS">Sukarela</option>
                <option value="SPA">Pelayanan Anggota</option>
              </select>
            </div>
          </div>

          <!-- Detail Transaksi -->
          <div class="mb-6">
            <label class="block text-sm font-medium">Detail Transaction</label>

            <div class="flex justify-end mb-4">
              <button
                @click="isAddingRow = true"
                class="px-6 py-2 text-sm font-medium text-white bg-[#02A2DC] rounded-md"
              >
                Add New Detail
              </button>
            </div>

            <table class="w-full border-collapse mb-4">
              <thead>
                <tr class="bg-[#f0f9ff]">
                  <th class="px-4 py-2 border">MBR ID</th>
                  <th class="px-4 py-2 border">Name</th>
                  <th class="px-4 py-2 border">Payment Name</th>
                  <th class="px-4 py-2 border">Amount</th>
                  <th class="px-4 py-2 border">Description</th>
                  <th class="px-4 py-2 border">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(transaction, index) in newTransaction.details" :key="index">
                  <td class="px-4 py-2 border">{{ transaction.mbrId }}</td>
                  <td class="px-4 py-2 border">{{ transaction.name }}</td>
                  <td class="px-4 py-2 border">{{ transaction.paymentName }}</td>
                  <td class="px-4 py-2 border">{{ transaction.amount }}</td>
                  <td class="px-4 py-2 border">{{ transaction.description }}</td>
                  <td class="px-4 py-2 border">
                    <div class="flex justify-center gap-2">
                      <button
                        class="w-8 h-8 flex items-center justify-center bg-yellow-400 hover:bg-yellow-500 rounded"
                        title="Edit"
                      >
                        ✏️
                      </button>
                      <button
                        @click="removeDetail(index)"
                        class="w-8 h-8 flex items-center justify-center bg-red-500 hover:bg-red-600 rounded"
                        title="Delete"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
                <tr v-if="isAddingRow">
                  <!-- <td><input class="underline-input" v-model="newRow.mbrId" type="text" /></td> -->
                  <td>
                    <select v-model="newRow.mbrId">
                      <option
                        v-for="member in mamberList"
                        :key="member.mbrId"
                        :value="member.mbrId"
                      >
                        {{ member.mbrId }}
                      </option>
                    </select>
                  </td>
                  <td><input class="underline-input" v-model="newRow.name" type="text" /></td>

                  <td>
                    <select v-model="newRow.paytype">
                      <option
                        v-for="option in paymentOptions"
                        :key="option"
                        :value="option.inact_code"
                      >
                        {{ option.inact_name }}
                      </option>
                    </select>
                  </td>
                  <td><input class="underline-input" v-model="newRow.amount" type="number" /></td>
                  <td>
                    <input class="underline-input" v-model="newRow.description" type="text" />
                  </td>
                  <td>
                    <button @click="addRow">Add</button>
                    <button @click="cancelAddRow">Cancel</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Tarik Simpanan Tab -->
        <div v-if="activeTab === 'tarik'" class="mt-8">
          <table class="w-full border-collapse mt-4">
            <thead>
              <tr class="bg-[#02A2DC] text-white text-center">
                <th class="px-4 py-2 border leading-tight">
                  <div class="flex flex-col">
                    <span>Document</span>
                    <span>Number</span>
                  </div>
                </th>
                <th class="px-4 py-2 border">Doc Date</th>
                <th class="px-4 py-2 border">Company ID</th>
                <th class="px-4 py-2 border">Member ID</th>
                <th class="px-4 py-2 border">Name</th>
                <th class="px-4 py-2 border">Trans Date</th>
                <th class="px-4 py-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(data, index) in paginatedData" :key="index">
                <td class="px-4 py-2 border">{{ data.doc_num }}</td>
                <td class="px-4 py-2 border">{{ data.doc_date }}</td>
                <td class="px-4 py-2 border">{{ data.mbr_company }}</td>
                <td class="px-4 py-2 border">{{ data.mbr_mbrid }}</td>
                <td class="px-4 py-2 border">{{ data.mbr_name }}</td>
                <td class="px-4 py-2 border">{{ data.trans_date }}</td>
                <td class="px-4 py-2 border">
                  <div class="flex justify-center gap-2">
                    <button
                      @click="openCheckSaldoPage(data)"
                      class="w-8 h-8 flex items-center justify-center bg-green-500 hover:bg-green-600 rounded"
                      title="Check Saldo"
                    >
                      💼
                    </button>
                    <button
                      class="w-8 h-8 flex items-center justify-center bg-yellow-400 hover:bg-yellow-500 rounded"
                      title="Edit"
                    >
                      ✏️
                    </button>
                    <button
                      class="w-8 h-8 flex items-center justify-center bg-red-500 hover:bg-red-600 rounded"
                      title="Delete"
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <!-- Pagination Controls -->
          <div class="flex justify-center mt-4">
            <button
              @click="previousPage"
              class="px-4 py-2 text-sm font-medium text-[#02A2DC] border border-[#02A2DC] rounded-md mr-2"
              :disabled="currentPage === 1"
            >
              Previous
            </button>
            <span class="px-4 py-2 text-sm font-medium">{{ currentPage }} / {{ totalPages }}</span>
            <button
              @click="nextPage"
              class="px-4 py-2 text-sm font-medium text-[#02A2DC] border border-[#02A2DC] rounded-md ml-2"
              :disabled="currentPage === totalPages"
            >
              Next
            </button>
          </div>
        </div>

        <div v-if="activeTab === 'checkSaldo'" class="p-6">
          <!-- Header with Back and Save/Cancel -->
          <div class="flex justify-between items-center mb-4">
            <!-- Back -->
            <div
              class="flex items-center gap-2 text-[#02A2DC] text-lg font-medium cursor-pointer"
              @click="activeTab = 'tarik'"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 stroke-[#02A2DC]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Check Saldo
            </div>

            <!-- Save & Cancel Buttons -->
            <div class="flex gap-2">
              <button
                @click="saveSaldoCheck"
                class="bg-[#02A2DC] text-white px-5 py-2 rounded-md text-sm"
              >
                Save
              </button>
              <button
                @click="activeTab = 'tarik'"
                class="border border-[#02A2DC] text-[#02A2DC] px-5 py-2 rounded-md text-sm"
              >
                Cancel
              </button>
            </div>
          </div>

          <!-- Saldo Form -->
          <div class="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label class="block text-sm font-medium mb-1">Member ID</label>
              <div class="flex gap-2">
                <input
                  type="text"
                  :value="
                    selectedMember.mbr_mbrid
                      ? `${selectedMember.mbr_mbrid} - ${selectedMember.mbr_name}`
                      : 'No member selected'
                  "
                  class="w-full px-4 py-2 border border-[#02A2DC] rounded-md bg-gray-50"
                  readonly
                />
                <button
                  @click="fetchSaldoData"
                  class="bg-[#02A2DC] text-white font-semibold px-4 py-2 rounded-md shadow text-sm hover:bg-[#0094c8]"
                  :disabled="!selectedMember.mbr_mbrid"
                >
                  Check Sum
                </button>
              </div>
            </div>
            <div></div>

            <!-- Iuran Pokok -->
            <div>
              <label class="text-sm mb-1 block font-medium">Iuran Pokok</label>
              <div class="flex gap-1 items-center">
                <input
                  type="text"
                  v-model="saldoData.pokok"
                  class="w-full border px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#02A2DC]"
                  readonly
                />
                <button
                  @click="handleTambahIuranPokok"
                  class="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-100 hover:scale-105 transition"
                  title="Tambah Dokumen Iuran Pokok"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    class="w-4 h-4 text-gray-700"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 2h6l5 5v13a2 2 0 01-2 2H9a2 2 0 01-2-2V4a2 2 0 012-2z"
                    />
                    <circle cx="18" cy="18" r="3" stroke="currentColor" stroke-width="2" />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M18 16v4m-2-2h4"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Iuran Wajib -->
            <div>
              <label class="text-sm mb-1 block font-medium">Iuran Wajib</label>
              <div class="flex gap-1 items-center">
                <input
                  type="text"
                  v-model="saldoData.wajib"
                  class="w-full border px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#02A2DC]"
                  readonly
                />
                <button
                  @click="addDocument('wajib')"
                  class="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-100 hover:scale-105 transition"
                  title="Tambah Dokumen Iuran Wajib"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    class="w-4 h-4 text-gray-700"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 2h6l5 5v13a2 2 0 01-2 2H9a2 2 0 01-2-2V4a2 2 0 012-2z"
                    />
                    <circle cx="18" cy="18" r="3" stroke="currentColor" stroke-width="2" />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M18 16v4m-2-2h4"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Simpanan Sukarela -->
            <div>
              <label class="text-sm mb-1 block font-medium">Simpanan Sukarela</label>
              <div class="flex gap-1 items-center">
                <input
                  type="text"
                  v-model="saldoData.sukarela"
                  class="w-full border px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#02A2DC]"
                  readonly
                />
                <button
                  @click="addDocument('sukarela')"
                  class="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-100 hover:scale-105 transition"
                  title="Tambah Dokumen Sukarela"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    class="w-4 h-4 text-gray-700"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 2h6l5 5v13a2 2 0 01-2 2H9a2 2 0 01-2-2V4a2 2 0 012-2z"
                    />
                    <circle cx="18" cy="18" r="3" stroke="currentColor" stroke-width="2" />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M18 16v4m-2-2h4"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Pelayanan Anggota -->
            <div>
              <label class="text-sm mb-1 block font-medium">Pelayanan Anggota</label>
              <div class="flex gap-1 items-center">
                <input
                  type="text"
                  v-model="saldoData.pelayanan"
                  class="w-full border px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#02A2DC]"
                  readonly
                />
                <button
                  @click="addDocument('pelayanan')"
                  class="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-100 hover:scale-105 transition"
                  title="Tambah Dokumen Pelayanan"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    class="w-4 h-4 text-gray-700"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 2h6l5 5v13a2 2 0 01-2 2H9a2 2 0 01-2-2V4a2 2 0 012-2z"
                    />
                    <circle cx="18" cy="18" r="3" stroke="currentColor" stroke-width="2" />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M18 16v4m-2-2h4"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- Detail Transaction Table -->
          <div class="mt-6">
            <div class="flex justify-between items-center mb-2">
              <h3 class="text-sm font-semibold">Detail Transaction</h3>

              <!-- Add New Detail Button -->
              <button
                class="bg-[#02A2DC] text-white px-4 py-2 rounded-md text-sm mb-4"
                @click="addNewDetail"
              >
                + Add New Detail
              </button>
            </div>

            <!-- Table -->
            <table class="w-full text-sm border mb-4">
              <thead class="bg-[#02A2DC] text-white text-center">
                <tr>
                  <th class="border px-2 py-1 w-1/6">Doc Number</th>
                  <th class="border px-2 py-1 w-1/6">Doc Date</th>
                  <th class="border px-2 py-1 w-1/6">Txn Code</th>
                  <th class="border px-2 py-1 w-1/6">Transaction Date</th>
                  <th class="border px-2 py-1 w-1/6">Member ID</th>
                  <th class="border px-2 py-1 w-1/6">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, i) in saldoData.details" :key="i" class="text-center">
                  <td class="border px-2 py-1">
                    <div v-if="item.isEditing">
                      <input
                        v-model="item.doc_number"
                        class="w-full border-none focus:outline-none text-center"
                      />
                    </div>
                    <div v-else>
                      {{ item.doc_number }}
                    </div>
                  </td>
                  <td class="border px-2 py-1">
                    <div v-if="item.isEditing">
                      <input
                        v-model="item.doc_date"
                        type="date"
                        class="w-full border-none focus:outline-none text-center"
                      />
                    </div>
                    <div v-else>
                      {{ item.doc_date }}
                    </div>
                  </td>
                  <td class="border px-2 py-1">
                    <div v-if="item.isEditing">
                      <input
                        v-model="item.txn_code"
                        class="w-full border-none focus:outline-none text-center"
                      />
                    </div>
                    <div v-else>
                      {{ item.txn_code }}
                    </div>
                  </td>
                  <td class="border px-2 py-1">
                    <div v-if="item.isEditing">
                      <input
                        v-model="item.trans_date"
                        type="date"
                        class="w-full border-none focus:outline-none text-center"
                      />
                    </div>
                    <div v-else>
                      {{ item.trans_date }}
                    </div>
                  </td>
                  <td class="border px-2 py-1">
                    <div v-if="item.isEditing">
                      <input
                        v-model="item.mbr_id"
                        class="w-full border-none focus:outline-none text-center"
                      />
                    </div>

                    <div v-else>
                      {{ item.mbr_id }}
                    </div>
                  </td>
                  <td class="border px-2 py-1">
                    <div class="flex justify-center gap-2">
                      <button
                        v-if="item.isEditing"
                        class="w-8 h-8 flex items-center justify-center bg-green-500 hover:bg-green-600 rounded"
                        title="Save"
                        @click="saveDetail(i)"
                      >
                        💾
                      </button>
                      <button
                        v-else
                        class="w-8 h-8 flex items-center justify-center bg-yellow-400 hover:bg-yellow-500 rounded"
                        title="Edit"
                        @click="editDetail(i)"
                      >
                        ✏️
                      </button>
                      <button
                        class="w-8 h-8 flex items-center justify-center bg-red-500 hover:bg-red-600 rounded"
                        title="Delete"
                        @click="deleteDetail(i)"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
                <tr v-if="saldoData.details.length === 0">
                  <td colspan="6" class="text-center py-4 text-gray-400">No data</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- DATA SIMPANAN -->
        <div v-if="activeTab === 'simpanan' && !showForm" class="mt-8">
          <table class="w-full border-collapse mt-4">
            <thead>
              <tr class="bg-[#02A2DC] text-white text-center">
                <th class="px-4 py-2 border leading-tight">
                  <div class="flex flex-col">
                    <span>Document</span>
                    <span>Number</span>
                  </div>
                </th>
                <th class="px-4 py-2 border">Type</th>
                <th class="px-4 py-2 border">Date</th>
                <th class="px-4 py-2 border">Description</th>
                <th class="px-4 py-2 border">Status</th>
                <th class="px-4 py-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(data, index) in simpananList" :key="index">
                <td class="px-4 py-2 border">{{ data.doc_num }}</td>
                <td class="px-4 py-2 border">{{ data.refname }}</td>
                <td class="px-4 py-2 border">{{ data.doc_date }}</td>
                <td class="px-4 py-2 border">{{ data.txndesc }}</td>
                <td class="px-4 py-2 border">{{ data.pstatus }}</td>
                <td class="px-4 py-2 border">
                  <div class="flex justify-center gap-2">
                    <button
                      @click="editTransaction(index)"
                      class="w-8 h-8 flex items-center justify-center bg-yellow-400 hover:bg-yellow-500 rounded"
                      title="Edit"
                    >
                      ✏️
                    </button>
                    <button
                      @click="deleteTransaction(index)"
                      class="w-8 h-8 flex items-center justify-center bg-red-500 hover:bg-red-600 rounded"
                      title="Delete"
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import SimpananService from '@/services/Simpanan/SimpananService'
import TarikSimpananService from '@/services/Simpanan/TarikSimpananService'
import { ref, reactive, onMounted, computed, watch } from 'vue'

const activeTab = ref('simpanan')
const isEdit = ref(false)
console.log('activeTab:', activeTab.value)
const showForm = ref(false)
const isAddingRow = ref(false)
const searchQuery = ref('')
const newRow = reactive({
  mbrId: '',
  name: '',
  paytype: '',
  paymentName: '',
  amount: '',
  description: '',
})
const paymentOptions = ref([])
const mamberList = ref([])
const newTransaction = reactive({
  docNumber: '',
  company: '',
  transactionDate: '',
  docReference: '',
  simpanan: '',
  description: '',
  details: [],
  isEditing: false,
  editingIndex: null,
})
const simpananList = ref([])
const tarikSimpananList = ref([])
const simpananService = new SimpananService()
const tarikSimpananService = new TarikSimpananService()

watch([() => newRow.mbrId, () => newRow.paytype], ([mbrVal, payVal]) => {
  const member = mamberList.value.find((m) => m.mbrId === mbrVal)
  if (member) {
    newRow.name = member.name
  } else {
    newRow.name = ''
  }

  const payment = paymentOptions.value.find((p) => p.inact_code === payVal)
  if (payment) {
    newRow.paymentName = payment.inact_name
  } else {
    newRow.paymentName = ''
  }
})

onMounted(async () => {
  try {
    const response = await simpananService.getSimpananList()
    simpananList.value = response
    const paymentData = await simpananService.getPaymentOptions()
    paymentOptions.value = paymentData
    console.log('Payment Options:', paymentOptions.value)
    const memberData = await simpananService.getMembership()
    mamberList.value = memberData.map((data) => ({
      mbrId: data.mbrid,
      name: data.name,
      company: data.company,
    }))
    console.log('Member List:', mamberList.value)
    const tarikSimpananResponse = await tarikSimpananService.getTarikSimpananList()
    tarikSimpananList.value = tarikSimpananResponse
    console.log('Tarik Simpanan List:', tarikSimpananResponse)
  } catch (error) {
    console.error('Error fetching Data:', error)
  }
})

function toggleForm() {
  isEdit.value = false
  console.log('Edit mode:', isEdit.value)
  console.log('isAddingRow:', isAddingRow.value)
  showForm.value = !showForm.value

  if (!showForm.value) resetForm()
}

function addRow() {
  if (newRow.mbrId && newRow.name && newRow.paymentName && newRow.amount) {
    newTransaction.details.push({ ...newRow })
    newRow.mbrId = ''
    newRow.name = ''
    newRow.paytype = ''
    newRow.paymentName = ''
    newRow.amount = ''
    newRow.description = ''
    isAddingRow.value = false
  } else {
    alert('Please fill in all fields')
  }
}

function cancelAddRow() {
  isAddingRow.value = false
}

function removeDetail(index) {
  newTransaction.details.splice(index, 1)
}

async function saveTransaction() {
  function formatDate(date) {
    const d = new Date(date)
    return d.toISOString().split('T')[0]
  }
  const txn = isEdit.value ? 'update' : 'new'
  const rid = newTransaction.docNumber ?? ''
  console.log('Saving transaction:', {
    txn,
    rid,
    docDate: formatDate(newTransaction.transactionDate),
    description: newTransaction.description,
    simpanan: newTransaction.simpanan,
    details: newTransaction.details,
  })
  console.log('Transaction details:', newTransaction)

  const hdrBlock = {
    formid: 'ZKOPSMP',
    form_version: '604',
    blockid: 'HDR',
    master_blockid: '',
    txn: txn,
    table_id: 'MBR_IURHDR',
    source_type: 'TABLE',
    rid: rid,
    tid: 0,
    tabledata: [
      {
        colname: 'company',
        colval: '1000',
        coltype: 'vchar',
        formatmask: '%d-%m-%Y',
        master_colname: '',
      },
      {
        colname: 'currs',
        colval: 'IDR',
        coltype: 'vchar',
        formatmask: '%d-%m-%Y',
        master_colname: '',
      },
      {
        colname: 'doc_date',
        colval: formatDate(newTransaction.transactionDate),
        coltype: 'date',
        formatmask: '%d-%m-%Y',
        master_colname: '',
      },
      {
        colname: 'trans_date',
        colval: formatDate(newTransaction.transactionDate),
        coltype: 'date',
        formatmask: '%d-%m-%Y',
        master_colname: '',
      },
      {
        colname: 'itype',
        colval: newTransaction.simpanan,
        coltype: 'vchar',
        formatmask: '%d-%m-%Y',
        master_colname: '',
      },
      {
        colname: 'txndesc',
        colval: newTransaction.description,
        coltype: '',
        formatmask: '%d-%m-%Y',
        master_colname: '',
      },
    ],
  }

  const dtlBlocks = newTransaction.details?.map((detail, index) => ({
    formid: 'ZKOPSMP',
    form_version: '604',
    blockid: 'DTL',
    master_blockid: 'HDR',
    txn: txn,
    table_id: 'MBR_IUR',
    source_type: 'TABLE',
    rid: `${rid}${detail.mbrId}`, // gabungkan rid dengan mbrId untuk unik
    tid: index + 1, // penting: tid harus unik per block
    tabledata: [
      {
        colname: 'doc_number',
        colval: isEdit.value ? rid : '', // gunakan rid jika edit, kosong jika baru
        coltype: 'vchar',
        formatmask: '%d-%m-%Y',
        master_colname: 'doc_num',
      },
      {
        colname: 'currs',
        colval: 'IDR',
        coltype: 'vchar',
        formatmask: '%d-%m-%Y',
        master_colname: '',
      },
      {
        colname: 'doc_date',
        colval: formatDate(newTransaction.transactionDate),
        coltype: 'date',
        formatmask: '%d-%m-%Y',
        master_colname: '',
      },
      {
        colname: 'txn_code',
        colval: newTransaction.simpanan,
        coltype: 'vchar',
        formatmask: '%d-%m-%Y',
        master_colname: '',
      },
      {
        colname: 'trans_date',
        colval: formatDate(newTransaction.transactionDate),
        coltype: 'date',
        formatmask: '%d-%m-%Y',
        master_colname: '',
      },
      {
        colname: 'mbr_company',
        colval: '1000',
        coltype: 'vchar',
        formatmask: '%d-%m-%Y',
        master_colname: '',
      },
      {
        colname: 'mbr_mbrid',
        colval: detail.mbrId,
        coltype: 'vchar',
        formatmask: '%d-%m-%Y',
        master_colname: '',
      },
      {
        colname: '*mbr_name',
        colval: detail.name,
        coltype: 'vchar',
        formatmask: '%d-%m-%Y',
        master_colname: '',
      },
      {
        colname: 'paytype',
        colval: detail.paytype,
        coltype: 'vchar',
        formatmask: '%d-%m-%Y',
        master_colname: '',
      },
      {
        colname: '*inct_name',
        colval: detail.paymentName,
        coltype: 'vchar',
        formatmask: '%d-%m-%Y',
        master_colname: '',
      },
      {
        colname: 'amount',
        colval: detail.amount?.toLocaleString('en-US') || '0',
        coltype: 'number',
        formatmask: '{:,.0f}',
        master_colname: '',
      },
      {
        colname: 'sdesc',
        colval: detail.description,
        coltype: 'vchar',
        formatmask: '%d-%m-%Y',
        master_colname: '',
      },
    ],
  }))

  const payload = [hdrBlock, ...dtlBlocks]
  console.log('Payload to be sent:', JSON.stringify(payload, null, 2))

  console.log('Data to be saved:', payload)
  try {
    const response = await simpananService.createSimpanan(payload)
    console.log('Transaction saved:', response)
  } catch (error) {
    console.error('Error saving transaction:', error)
    alert('Failed to save transaction')
    return
  }
}

// const showSaldoModal = ref(false)
const selectedMember = reactive({
  mbr_mbrid: '',
  mbr_name: '',
  mbr_company: '',
  doc_num: '',
  doc_date: '',
  trans_date: '',
})

const saldoData = reactive({
  pokok: '',
  wajib: '',
  sukarela: '',
  pelayanan: '',
  details: [],
})

function openCheckSaldoPage(data) {
  selectedMember.mbr_mbrid = data.mbr_mbrid
  selectedMember.mbr_name = data.mbr_name
  selectedMember.mbr_company = data.mbr_company
  selectedMember.doc_num = data.doc_num
  selectedMember.doc_date = data.doc_date
  selectedMember.trans_date = data.trans_date

  activeTab.value = 'checkSaldo'
  fetchSaldoData()
}

async function fetchSaldoData() {
  if (!selectedMember.mbr_mbrid) {
    alert('Please select a member first')
    return
  }

  try {
    console.log('Fetching saldo data for member:', selectedMember.mbr_mbrid)

    const response = await tarikSimpananService.getSaldoSimpanan(selectedMember.mbr_mbrid)
    console.log('API Response:', response)

    saldoData.pokok = response.smt.iup ? Number(response.smt.iup).toLocaleString('id-ID') : '0'
    saldoData.wajib = response.smt.iuw ? Number(response.smt.iuw).toLocaleString('id-ID') : '0'
    saldoData.sukarela = response.smt.sskr ? Number(response.smt.sskr).toLocaleString('id-ID') : '0'
    saldoData.pelayanan = response.smt.plyn
      ? Number(response.smt.plyn).toLocaleString('id-ID')
      : '0'
    saldoData.details = []

    const empsum = response['dat.empsum']?.[0]

    if (empsum) {
      saldoData.wajib = empsum.iuw ? Number(empsum.iuw).toLocaleString('id-ID') : '0'
      saldoData.pokok = empsum.iup ? Number(empsum.iup).toLocaleString('id-ID') : '0'
      saldoData.sukarela = empsum.sskr ? Number(empsum.sskr).toLocaleString('id-ID') : '0'
      saldoData.pelayanan = empsum.plyn ? Number(empsum.plyn).toLocaleString('id-ID') : '0'
    }

    alert('Saldo berhasil dimuat.')
  } catch (error) {
    console.error('Fetch saldo error:', error)
    alert('Gagal mengambil data saldo. Periksa koneksi atau member ID.')
  }
}

function addDocument(jenis) {
  console.log('Tambah dokumen', jenis)
}

// const detailTransactions = ref([])

const handleTambahIuranPokok = async () => {
  if (!selectedMember.value?.mbr_mbrid) {
    alert('Please select a member first')
    return
  }

  try {
    const response = await simpananService.getIuranPokok(selectedMember.value.mbr_mbrid)
    console.log('Iuran Pokok Response:', response)

    if (response && response.length > 0) {
      const amount = response[0].amount ? Number(response[0].amount) : 0
      saldoData.pokok = amount.toLocaleString('id-ID')

      // Tambahkan ke tabel detailTransaction
      //   detailTransaction.value.push({
      //     type: 'Iuran Pokok',
      //     amount: amount,
      //     memberId: selectedMember.value.mbr_mbrid,
      //     name: selectedMember.value.mbr_name,
      //     date: new Date().toISOString().slice(0, 10) // tanggal hari ini
      //   })

      alert('Iuran Pokok berhasil ditambahkan ke detail.')
    } else {
      alert('Tidak ada data Iuran Pokok untuk member ini.')
    }
  } catch (error) {
    console.error('Error fetching Iuran Pokok:', error)
    alert('Gagal mengambil Iuran Pokok. Periksa koneksi atau member ID.')
  }
}

// function selectMember(member) {
//   selectedMember.mbr_mbrid = member.mbr_mbrid
//   selectedMember.mbr_name = member.mbr_name
//   selectedMember.mbr_company = member.mbr_company

//   // Tambahkan ini supaya doc_num dan doc_date otomatis ikut
//   selectedMember.doc_num = member.doc_num
//   selectedMember.doc_date = member.doc_date
//   selectedMember.trans_date = member.trans_date

//   // Misalnya kamu juga update saldo
//   saldoData.pokok = member.saldo_pokok
//   saldoData.wajib = member.saldo_wajib
//   saldoData.sukarela = member.saldo_sukarela
//   saldoData.pelayanan = member.saldo_pelayanan
// }

function addNewDetail() {
  saldoData.details.push({
    doc_number: '',
    doc_date: '',
    txn_code: '',
    trans_date: '',
    mbr_id: '',
    isEditing: true,
  })
}

// Function untuk edit baris
function editDetail(index) {
  saldoData.details[index].isEditing = true
}

// Function untuk simpan edit
function saveDetail(index) {
  saldoData.details[index].isEditing = false
}

// Function untuk hapus baris
function deleteDetail(index) {
  saldoData.details.splice(index, 1)
}

function resetForm() {
  newTransaction.docNumber = ''
  newTransaction.company = ''
  newTransaction.transactionDate = ''
  newTransaction.docReference = ''
  newTransaction.simpanan = ''
  newTransaction.description = ''
  newTransaction.details = []
  newTransaction.isEditing = false
}

async function editTransaction(index) {
  isEdit.value = true
  const transactionToEdit = simpananList.value[index]
  console.log('Editing transaction:', transactionToEdit)
  try {
    const res = await simpananService.getSimpananById(transactionToEdit.doc_num)
    console.log('Transaction to edit:', res)
    Object.assign(newTransaction, {
      docNumber: res.doc_num,
      transactionDate: convertDate(res.trans_date),
      description: res.txndesc,
      simpanan: res.itype,
      details: res.details || [],
      isEditing: false,
      editingIndex: null,
    })
  } catch (error) {
    console.error('Error editing transaction:', error)
    alert('Failed to edit transaction')
    return
  }

  function convertDate(date) {
    let [day, month, year] = date.split('-')
    return `${year}-${month}-${day}`
  }

  // Object.assign(newTransaction, transactionToEdit)

  newTransaction.isEditing = true
  newTransaction.editingIndex = index

  showForm.value = true
}

async function deleteTransaction(index) {
  const simpananId = simpananList.value[index].doc_num

  try {
    await simpananService.deleteSimpanan(simpananId)
    simpananList.value.splice(index, 1)
    alert('Simpanan berhasil dihapus')
    await refreshSimpananList()
  } catch (error) {
    console.error('Error deleting simpanan:', error)
    alert('Failed to delete simpanan')
  }
}

async function refreshSimpananList() {
  try {
    const response = await simpananService.getSimpananList()
    simpananList.value = response
  } catch (error) {
    console.error('Error refreshing simpanan list:', error)
  }
}

const currentPage = ref(1)
const itemsPerPage = ref(10) // Adjust the number of items per page as needed
// const totalItems = ref(tarikSimpananList.value.length) // Total number of items in your data

// Compute the data to display for the current page
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return tarikSimpananList.value.slice(start, end)
})

// Total pages
const totalPages = computed(() => {
  return Math.ceil(tarikSimpananList.value.length / itemsPerPage.value)
})

// Change page
// function changePage(page) {
//   if (page >= 1 && page <= totalPages.value) {
//     currentPage.value = page
//   }
// }

// Next page
function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

// Previous page
function previousPage() {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}
</script>

<style scoped>
table {
  border-spacing: 0;
  border-collapse: collapse;
}

th,
td {
  text-align: center;
  border: 1px solid #e0e0e0;
  padding: 10px 15px;
}

th {
  background-color: #02a2dc;
  color: white;
}

tr:hover {
  background-color: #f5f5f5;
}

button {
  border: none;
  cursor: pointer;
}

button:hover {
  opacity: 0.8;
}

.underline-input {
  border: none; /* Remove default border */
  /* border-bottom: 2px solid #000;  Add underline (black color) */
  outline: none; /* Remove the focus outline */
  padding: 5px 0; /* Adjust padding */
  font-size: 16px; /* Optional: Adjust font size */
}

.underline-input:focus {
  border-bottom: 2px solid #3498db; /* Change the color when focused */
  box-shadow: none; /* Remove focus outline */
}
</style>
