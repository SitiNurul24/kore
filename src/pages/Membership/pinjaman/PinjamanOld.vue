<template>
  <div>
    <!-- Judul Membership -->
    <h2 class="text-xl font-bold mb-4">Membership</h2>

    <!-- Box Pinjaman -->
    <div class="p-6 bg-white rounded-lg shadow-md">
      <h3 class="text-base font-bold text-[#0d0909] mb-4">Pinjaman</h3>

      <!-- Tabs -->
    <div class="flex space-x-3 mb-4 border-b border-gray-200 pb-4">
  <button
    class="px-4 py-2 rounded border border-[#02A2DC] font-semibold"
    :class="activeTab === 'settlement' ? 'bg-[#02A2DC] text-white' : 'bg-white text-[#02A2DC]'"
    @click="() => { activeTab = 'settlement'; showForm = false }"
  >
    Settlement
  </button>
  <button
    class="px-4 py-2 rounded border border-[#02A2DC] font-semibold"
    :class="activeTab === 'upload' ? 'bg-[#02A2DC] text-white' : 'bg-white text-[#02A2DC]'"
    @click="() => { activeTab = 'upload'; showForm = false }"
  >
    Upload Potongan
  </button>
  <button
    class="px-4 py-2 rounded border border-[#02A2DC] font-semibold"
    :class="activeTab === 'pinjaman' ? 'bg-[#02A2DC] text-white' : 'bg-white text-[#02A2DC]'"
    @click="() => { activeTab = 'pinjaman'; showForm = false }"
  >
    Pinjaman
  </button>
</div>


      <!-- === SETTLEMENT TAB === -->
        <div v-if="activeTab === 'settlement'">
          <div v-if="!showForm" class="flex flex-col md:flex-row md:items-end md:justify-between mb-6 gap-3">
            <div class="relative w-full md:w-1/3">
              <input
                type="text"
                v-model="searchQuery"
                placeholder="Search"
                class="w-full p-2.5 pr-10 border border-gray-300 rounded-md focus:outline-none"/>
              <span class="material-icons absolute right-3 top-2.5 text-gray-400">search</span>
            </div>
            <div class="flex flex-col w-full md:w-auto">
              <div class="flex-1"></div>
              <div class="flex justify-end">
              </div>
            </div>
          </div>

        <!-- Form Add New Settlement -->
        <div v-if="showForm" class="mb-6">
          <div class="flex flex-col gap-3 md:flex-row md:items-end md:justify-between mb-6">
            <button class="text-[#02A2DC] font-semibold flex items-center mb-4 md:mb-0" @click="showForm = false">
              <span class="material-icons mr-2">arrow_back</span> Add New Settlement
            </button>
          <div class="flex gap-2 mb-6 items-center justify-end">
            <button
              class="bg-[#02A2DC] text-white px-6 py-2 rounded-md font-semibold">
              <span class="material-icons mr-2">save</span> Save
            </button>
            <button
              class="border border-[#02A2DC] text-[#02A2DC] px-6 py-2 rounded-md font-semibold">
              <span class="material-icons mr-2">edit</span> Update
            </button>
            <button
              class="border border-[#02A2DC] text-[#02A2DC] px-6 py-2 rounded-md font-semibold">
              <span class="material-icons mr-2">publish</span> Post
            </button>
            <button
              class="border border-[#02A2DC] text-[#02A2DC] px-6 py-2 rounded-md font-semibold"
              @click="showForm = false">
              <span class="material-icons mr-2">cancel</span> Cancel
            </button>
            <button
              class="text-[#02A2DC] font-semibold flex items-center"
              @click="showForm = false"
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
              style="background:transparent"
            >
              <div
                :class="[
                  'w-10 h-10 flex items-center justify-center rounded-full border-2 text-lg font-bold transition-colors',
                  activeStep === 1 ? 'bg-[#02A2DC] border-[#02A2DC] text-white' : 'bg-white border-[#B0B0B0] text-[#B0B0B0]'
                ]">1
                </div>
              <span
                :class="[
                  'text-xs font-semibold mt-1 transition-colors',
                  activeStep === 1 ? 'text-[#02A2DC]' : 'text-[#B0B0B0]'
                ]"
              >Company</span>
            </button>
            <!-- Garis penghubung di antara bulatan -->
            <div class="h-0.5 bg-[#B0B0B0]" style="width:40px;"></div>
            <!-- Step 2 -->
            <button
              class="flex flex-col items-center focus:outline-none z-10"
              @click="goToStep2"
              type="button"
              style="background:transparent"
            >
              <div
                :class="[
                  'w-10 h-10 flex items-center justify-center rounded-full border-2 text-lg font-bold transition-colors',
                  activeStep === 2 ? 'bg-[#02A2DC] border-[#02A2DC] text-white' : 'bg-white border-[#B0B0B0] text-[#B0B0B0]'
                ]"
              >2</div>
              <span
                :class="[
                  'text-xs font-semibold mt-1 transition-colors',
                  activeStep === 2 ? 'text-[#02A2DC]' : 'text-[#B0B0B0]'
                ]"
              >Document Info</span>
            </button>
          </div>

        <!-- filepath: d:\sem 6\GCG Proyek\akor-front\src\pages\Membership\Pinjaman.vue -->
        <!-- STEP 1 -->
 <div v-if="activeStep === 1">
    <div class="grid md:grid-cols-2 gap-6">
      <div>
        <label class="block text-sm font-medium mb-1">Document Number</label>
        <input v-model="settlementData.doc_num" class="w-full border border-gray-300 p-3 rounded-md" readonly />
      </div>
      <div>
        <label class="block text-sm font-medium mb-1">Name</label>
        <input v-model="settlementData.mbr_name" class="w-full border border-gray-300 p-3 rounded-md" readonly />
      </div>
    </div>
    <div class="grid md:grid-cols-2 gap-6">
      <div>
        <label class="block text-sm font-medium mb-1">Company</label>
        <input v-model="settlementData.mbr_company" class="w-full border border-gray-300 p-3 rounded-md" readonly />
      </div>
      <div>
        <label class="block text-sm font-medium mb-1">MBRID</label>
        <input v-model="settlementData.mbr_mbrid" class="w-full border border-gray-300 p-3 rounded-md" readonly />
      </div>
    </div>
    <div class="grid md:grid-cols-2 gap-6">
      <div>
        <label class="block text-sm font-medium mb-1">STL Document Number</label>
        <input v-model="settlementData.stl_doc_num" class="w-full border border-gray-300 p-3 rounded-md" placeholder="0000" />
      </div>
      <div>
        <label class="block text-sm font-medium mb-1">STL Date</label>
        <input v-model="settlementData.settlement_date" type="date" class="w-full border border-gray-300 p-3 rounded-md" />
      </div>
    </div>
    <div class="grid md:grid-cols-2 gap-6">
      <div>
        <label class="block text-sm font-medium mb-1">STL Amount</label>
        <input v-model="settlementData.tot_am" type="number" class="w-full border border-gray-300 p-3 rounded-md" placeholder="000.000.00" />
      </div>
      <div>
        <label class="block text-sm font-medium mb-1">Description</label>
        <textarea v-model="settlementData.description" class="w-full border border-gray-300 p-3 rounded-md" placeholder="Add Description"></textarea>
      </div>
    </div>
  </div>        
  </div>
  

          
        <!-- STEP 2 -->
        <div v-if="activeStep === 2">
          <div class="grid md:grid-cols-2 gap-6">
            <!-- Box 1: Data Pinjaman -->
            <div class="w-full bg-white border border-gray-200 rounded-lg p-6 shadow-lg ">
              <h4 class="font-semibold text-base mb-4">Data Pinjaman</h4>
              <div class="mb-4">
                <label class="block text-sm font-medium mb-1">Document Number</label>
                <select class="w-full border border-gray-300 p-3 rounded-md">
                  <option>Select Doc Number</option>
                </select>
              </div>
              <div class="mb-4">
                <label class="block text-sm font-medium mb-1">Company</label>
                <input type="text" class="w-full border border-gray-300 p-3 rounded-md" placeholder="Enter Company" />
              </div>
              <div class="mb-4">
                <label class="block text-sm font-medium mb-1">STL Document Number</label>
                <input type="text" class="w-full border border-gray-300 p-3 rounded-md" placeholder="Enter STL Document Number" />
              </div>
              <div class="mb-4">
                <label class="block text-sm font-medium mb-1">STL Amount</label>
                <input type="text" class="w-full border border-gray-300 p-3 rounded-md" placeholder="000.000.00" />
              </div>
            </div>

            <!-- Box 2: Periodic Instalment -->
            <div class="w-full bg-white border border-gray-200 rounded-lg p-6 shadow-lg">
              <h4 class="font-semibold text-base mb-4">Periodic Instalment</h4>
              <div class="mb-4">
                <label class="block text-sm font-medium mb-1">SVM</label>
                <input type="text" class="w-full border border-gray-300 p-3 rounded-md" placeholder="Add Svm" />
              </div>
              <div class="mb-4">
                <label class="block text-sm font-medium mb-1">SVY</label>
                <input type="text" class="w-full border border-gray-300 p-3 rounded-md" placeholder="Add SvY" />
              </div>
              <div class="mb-4">
                <label class="block text-sm font-medium mb-1">EVM</label>
                <input type="text" class="w-full border border-gray-300 p-3 rounded-md" placeholder="Add EvM" />
              </div>
              <div class="mb-4">
                <label class="block text-sm font-medium mb-1">EVY</label>
                <input type="text" class="w-full border border-gray-300 p-3 rounded-md" placeholder="Add EvY" />
              </div>
            </div>
          </div>
        </div>

<!-- Tabel Settlement hanya tampil jika showForm false -->
<div v-if="activeTab === 'settlement' && !showForm" class="overflow-x-auto">

  <!-- <button
      class="bg-[#02A2DC] text-white px-4 py-2 rounded-md flex items-center font-semibold text-sm shadow-sm hover:bg-[#028fc7] transition"
      @click="showForm = true"
      style="box-shadow: 0 2px 8px 0 #02a2dc1a;">
      <span class="material-icons mr-1 text-base">add</span>
      New Settlement
    </Button> -->
    <!-- <Button text="New Settlement" icon="add" color="bg-[#02A2DC]" @click="showModal = true"/> -->
    <!-- Modal Pop-up -->
<!-- Modal Pop-up yang dapat dipakai ulang -->
    <!-- <ModalPopup
      :showModal="showModal"
      @update:showModal="showModal = $event"
      title="Confirmation"
      :onConfirm="handleConfirm"
    >
      
      <table class="min-w-full table-auto">
        <thead>
          <tr class="bg-gray-100">
            <th class="px-4 py-2 text-left">DOC NUM</th>
            <th class="px-4 py-2 text-left">MBRID</th>
            <th class="px-4 py-2 text-left">NAME</th>
            <th class="px-4 py-2 text-left">KODE</th>
            <th class="px-4 py-2 text-left">SEQ</th>
            <th class="px-4 py-2 text-left">TGL CAIR</th>
            <th class="px-4 py-2 text-left">TOT AMOUNT</th>
            <th class="px-4 py-2 text-left">STL AMOUNT</th>
            <th class="px-4 py-2 text-left">STL AMOUNT</th>
            <th class="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in settlements" :key="row.doc_num" :class="{'bg-blue-100': row.selected}" @click="selectRow(row)" class="cursor-pointer hover:bg-blue-50">
            <td class="px-4 py-2">{{ row.doc_num }}</td>
            <td class="px-4 py-2">{{ row.mbrid }}</td>
            <td class="px-4 py-2">{{ row.name }}</td>
            <td class="px-4 py-2">{{ row.kode }}</td>
            <td class="px-4 py-2">{{ row.seq }}</td>
            <td class="px-4 py-2">{{ row.tgl_cair }}</td>
            <td class="px-4 py-2">{{ row.total_amount }}</td>
            <td class="px-4 py-2">{{ row.stl_amount }}</td>
            <td class="px-4 py-2">{{ row.stl_amount2 }}</td>
            <td class="px-4 py-2 text-center">
              <button @click="selectSettlement(row)" class="bg-blue-500 text-white px-2 py-1 rounded-md">Select</button>
            </td>
          </tr>
        </tbody>
      </table>
    </ModalPopup> -->
    </div>
</div>


<!-- === UPLOAD POTONGAN TAB === -->
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
            <table class="w-full text-sm border border-gray-200 rounded overflow-hidden">
              <thead class="bg-[#E6F7FD] text-[#02A2DC] text-left">
                <tr>
                  <th class="p-3 border">Document Number</th>
                  <th class="p-3 border">Doc Date</th>
                  <th class="p-3 border">Description</th>
                  <th class="p-3 border">Created Info</th>
                  <th class="p-3 border">Modified Info</th>
                  <th class="p-3 border text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in filteredUploads" :key="index" class="hover:bg-gray-50">
                  <td class="p-3 border">{{ item.docNo }}</td>
                  <td class="p-3 border">{{ item.docDate }}</td>
                  <td class="p-3 border">{{ item.description }}</td>
                  <td class="p-3 border">-</td>
                  <td class="p-3 border">-</td>
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
        </div>
        <div v-else>
          <!-- Tampilan Form Upload -->
          <div class="mb-6">
            <button class="text-[#02A2DC] font-semibold mb-4 flex items-center" @click="showForm = false">
              <span class="material-icons mr-2">arrow_back</span> Add New Transaction
            </button>
            <div class="flex justify-end gap-2 mb-6">
              <button class="bg-[#02A2DC] text-white px-6 py-2 rounded">Save</button>
              <button class="border border-[#02A2DC] text-[#02A2DC] px-6 py-2 rounded" @click="showForm = false">Cancel</button>
            </div>
            <!-- Bagian untuk Company dan TXN Date -->
            <div class="flex gap-6 mb-4">
              <div class="w-1/2">
                <label class="block text-sm font-medium mb-1">Company</label>
                <select class="w-full border border-gray-300 p-3 rounded-md">
                  <option>Select Company</option>
                </select>
              </div>
              <div class="w-1/2">
                <label class="block text-sm font-medium mb-1">TXN Date</label>
                <input type="date" class="w-full border border-gray-300 p-3 rounded-md" />
              </div>
            </div>
            <div class="flex gap-6 mb-4">
              <div class="w-1/2">
                <label class="block text-sm font-medium mb-1">Description</label>
                <textarea class="w-full border border-gray-300 p-3 rounded-md" placeholder="Add Description"></textarea>
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
                  <button class="mt-2 bg-[#02A2DC] text-white px-4 py-2 rounded-md flex items-center"
                    style="display: flex; align-items: center;">
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
                    <tr v-for="index in 3" :key="index" class="bg-white border hover:bg-gray-50">
                      <td class="p-3 border">-</td>
                      <td class="p-3 border">-</td>
                      <td class="p-3 border">-</td>
                      <td class="p-3 border">-</td>
                      <td class="p-3 border">-</td>
                      <td class="p-3 border">-</td>
                      <td class="p-3 border">-</td>
                      <td class="p-3 border">-</td>
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
            </div>
          </div>
        </div>
      </div>

      <!-- === PINJAMAN TAB === -->
      <div v-if="activeTab === 'pinjaman'">
        <!-- Form Add New Transaction -->
<div v-if="showForm" class="mb-6">
  <div class="flex mb-6 justify-start">
    <button class="text-[#02A2DC] font-semibold flex items-center" @click="showForm = false">
      <span class="material-icons mr-2">arrow_back</span>
      Add New Settlement
    </button>
  </div>
    <!-- Action Buttons (Save, Cancel, Print) -->
    <div class="flex gap-2 mb-6 items-center justify-end">
      <button class="bg-[#02A2DC] text-white px-6 py-2 rounded-md font-semibold">
        <span class="material-icons mr-2">save</span> Save
      </button>
      <button class="border border-[#02A2DC] text-[#02A2DC] px-6 py-2 rounded-md font-semibold">
        <span class="material-icons mr-2">cancel</span> Cancel
      </button>
      <button class="border border-[#02A2DC] text-[#02A2DC] px-6 py-2 rounded-md font-semibold">
        <span class="material-icons mr-2">print</span> Print
      </button>
    </div>

    <!-- New Transaction Form: Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

      <!-- Company Card -->
<form @submit.prevent="submitCompanyForm" class="w-full bg-white border border-gray-200 rounded-lg p-6 shadow-lg">
  <h4 class="font-semibold text-base mb-4">Company</h4>

   <div class="mb-4">
    <label class="block text-sm font-medium mb-1">Member ID</label>
    <select v-model="companyForm.memberId" class="w-full border border-gray-300 p-3 rounded-md">
      <option value="" disabled selected>Select a Member</option>
      <option v-for="member in membershipList.tabledata" :key="member.mbrid" :value="member.mbrid">
        {{ member.name }} ({{ member.mbrid }})
      </option>
    </select>
  </div>
  
  <!-- Other form fields remain the same -->
  <div class="mb-4">
    <label class="block text-sm font-medium mb-1">Member Name</label>
    <input v-model="companyForm.memberName" type="text" class="w-full border border-gray-300 p-3 rounded-md" placeholder="Enter Name" />
  </div>

  <div class="mb-4">
    <label class="block text-sm font-medium mb-1">Jenis Pinjaman</label>
    <select v-model="companyForm.jenisPinjaman" class="w-full border border-gray-300 p-3 rounded-md">
      <option value="">Select Jenis Pinjaman</option>
      <option value="Konsumtif">Konsumtif</option>
      <option value="Investasi">Investasi</option>
      <option value="Modal Kerja">Modal Kerja</option>
    </select>
  </div>
  
  <div class="grid md:grid-cols-2 gap-6">
    <div>
      <label class="block text-sm font-medium mb-1">Dana Diterima</label>
      <input v-model.number="companyForm.danaDiterima" type="number" class="w-full border border-gray-300 p-3 rounded-md" placeholder="000.000.000" />
    </div>
    <div>
      <label class="block text-sm font-medium mb-1">Tenor</label>
      <input v-model.number="companyForm.tenor" type="number" class="w-full border border-gray-300 p-3 rounded-md" placeholder="Enter Tenor" />
    </div>
  </div>

  <div class="grid md:grid-cols-2 gap-6">
    <div>
      <label class="block text-sm font-medium mb-1">Jasa (%)</label>
      <input v-model.number="companyForm.jasa" type="number" class="w-full border border-gray-300 p-3 rounded-md" placeholder="Enter Jasa (%)" />
    </div>        
    <div>
      <label class="block text-sm font-medium mb-1">Admin (%)</label>
      <input v-model.number="companyForm.admin" type="number" class="w-full border border-gray-300 p-3 rounded-md" placeholder="Enter Admin (%)" />
    </div>
  </div>
  <div class="grid md:grid-cols-2 gap-6">
    <div>
      <label class="block text-sm font-medium mb-1">Total Amount</label>
      <input v-model.number="companyForm.totalAmount" type="number" class="w-full border border-gray-300 p-3 rounded-md" placeholder="000.000.000" />
    </div>        
    <div>
      <label class="block text-sm font-medium mb-1">Angsuran Perbulan</label>
      <input v-model.number="companyForm.angsuranPerbulan" type="number" class="w-full border border-gray-300 p-3 rounded-md" placeholder="000.000.000" />
    </div>
  </div> 
  <div class="grid md:grid-cols-2 gap-6">
    <div>
      <label class="block text-sm font-medium mb-1">Accumulation</label>
      <input v-model.number="companyForm.accumulation" type="number" class="w-full border border-gray-300 p-3 rounded-md" placeholder="000.000.000" />
    </div>
  </div>
  <div class="flex justify-end">
    <button type="submit" class="bg-[#02A2DC] text-white px-6 py-2 rounded-md font-semibold">
      Accumulate
    </button>
  </div>
</form>

      <!-- Settlement Card -->
      <div class="w-full bg-white border border-gray-200 rounded-lg p-6 shadow-lg">
        <h4 class="font-semibold text-base mb-4">Settlement</h4>
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">Sett Document Number</label>
          <input type="text" class="w-full border border-gray-300 p-3 rounded-md" placeholder="Add Doc Number" />
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">Status</label>
          <input type="text" class="w-full border border-gray-300 p-3 rounded-md" placeholder="Add Status" />
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">Settlement Fee</label>
          <input type="number" class="w-full border border-gray-300 p-3 rounded-md" placeholder="000.000.000" />
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">Settle My Amount</label>
          <input type="number" class="w-full border border-gray-300 p-3 rounded-md" placeholder="000.000.00" />
        </div>
        <div class="grid md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium mb-1">Settlement Date</label>
          <input type="date" class="w-full border border-gray-300 p-3 rounded-md" />
        </div>        
        <div>
          <label class="block text-sm font-medium mb-1">Settlement By</label>
          <input type="text" class="w-full border border-gray-300 p-3 rounded-md" placeholder="Add Name" />
        </div>
        </div>
      </div>
      <!-- Document Info Card -->
      <div class="w-full bg-white border border-gray-200 rounded-lg p-6 shadow-lg">
        <h4 class="font-semibold text-base mb-4">Document Info</h4>
        <div class="grid md:grid-cols-2 gap-6">
          <div>
          <label class="block text-sm font-medium mb-1">Document Number</label>
          <input type="text" class="w-full border border-gray-300 p-3 rounded-md" placeholder="Add Doc Number" />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Document Date</label>
          <input type="date" class="w-full border border-gray-300 p-3 rounded-md" />
        </div>
        </div>
        <div class="grid md:grid-cols-2 gap-6">
          <div>
          <label class="block text-sm font-medium mb-1">Status</label>
          <input type="text" class="w-full border border-gray-300 p-3 rounded-md" placeholder="Add Status" />
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

  <!-- Filter & Add New Transaction sejajar di bawah search -->
  <div class="flex justify-between items-center mt-4">
    <!-- Tombol Filter -->
<button
  class="border border-[#02A2DC] text-[#02A2DC] px-4 py-2 rounded-md flex items-center justify-between font-semibold text-sm shadow-sm hover:bg-[#E6F7FD] transition min-w-[500px]"
  @click="openFilter"
  style="box-shadow: 0 2px 8px 0 #02a2dc1a;">
  <span class="flex items-center">
    <span class="material-icons mr-1 text-base">filter_alt</span>
    Filter
  </span>
  <span class="material-icons text-base">arrow_drop_down</span>
</button>
  

    <!-- Tombol New Transaction -->
    <button
      class="bg-[#02A2DC] text-white px-4 py-2 rounded-md flex items-center font-semibold text-sm shadow-sm hover:bg-[#028fc7] transition"
      @click="showForm = true"
      style="box-shadow: 0 2px 8px 0 #02a2dc1a;">
      <span class="material-icons mr-1 text-base">add</span>
      New Transaction
    </button>
  </div>
</div>
</div>
    <!-- Table Section -->
<div v-if="activeTab === 'pinjaman' && !showForm" class="overflow-x-auto">
  <table class="w-full min-w-[1200px] text-sm border border-gray-200 rounded overflow-hidden">
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
      <tr v-for="(item, index) in filteredLoans" :key="index" class="hover:bg-gray-50">
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
          
          <button class="text-blue-600 hover:text-blue-800" @click="openSettlementForm(item)">
            <span class="material-symbols-outlined">payments</span>
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
// import { ref, computed } from 'vue'
import { ref, computed, onMounted, reactive } from 'vue'
import PinjamanService from '@/services/Pinjaman/PinjamanService'
import Button from '@/components/base/Button.vue'
import ModalPopup from './components/base/ModalPopup.vue'
import con from '@/constants';

const activeTab = ref('pinjaman') 
const showForm = ref(false)
const searchQuery = ref('')
const pinjamanList = ref([]);
const settlementList = ref([]);
const showModal = ref(false);

const pinjamanService = new PinjamanService()

onMounted(async () => {
  try {
    await getMembership(); // Fetch membership data
    const response = await pinjamanService.getPinjamanList(); // Pinjaman List
    const resp = await pinjamanService.getSettlementList(); // Settlement List

    pinjamanList.value = response.tabledata;  // Pinjaman List API response
    settlementList.value = resp.tabledata;  // Settlement List API response

    console.log('Pinjaman List:', pinjamanList.value);
    console.log('Settlement List:', settlementList.value);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});

const getSelectedMemberName = (memberId) => {
  const selectedMember = membershipList.value.tabledata.find(member => member.mbrid === memberId);
  return selectedMember ? selectedMember.name : '';
};
  
const pinjamanDetail = ref({}) 
const membershipList = ref({}) 

const getPinjamanDetail = async (docNo) => {
  try {
    const response = await pinjamanService.getPinjamanDetail(docNo)
    console.log('Pinjaman Detail:', response)
    pinjamanDetail.value = response 
  } catch (error) {
    console.error('Error fetching pinjaman detail:', error)
  }
}

const getMembership = async () => {
  try {
    const response = await pinjamanService.getMembership();
    console.log('Membership Data:', response);
    membershipList.value = response; 
  } catch (error) {
    console.error('Error fetching membership data:', error);
  }
};

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
  accumulation: null
})

async function submitCompanyForm() {
  // Ensure companyForm is populated with form values correctly
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
          colval: '1000',  // Populate from form input
          coltype: 'vchar',
          formatmask: '%d-%m-%Y',
          master_colname: ''
        },
        {
          colname: 'mbr_mbrid',
          colval: companyForm.memberId,  // Populate from form input
          coltype: 'vchar',
          formatmask: '%d-%m-%Y',
          master_colname: ''
        },
        {
          colname: '*name',
          colval: companyForm.memberName,  // Populate from form input
          coltype: 'vchar',
          formatmask: '%d-%m-%Y',
          master_colname: ''
        },
        {
          colname: 'loan_code',
          colval: 'BNS',  // Static value
          coltype: 'vchar',
          formatmask: '%d-%m-%Y',
          master_colname: ''
        },
        {
          colname: 'amount',
          colval: companyForm.danaDiterima !== null ? companyForm.danaDiterima : 0,  // Populate from form input
          coltype: 'number',
          formatmask: '{:,.0f}',
          master_colname: ''
        },
        {
          colname: 'term',
          colval: companyForm.tenor !== null ? companyForm.tenor : 0,  // Populate from form input
          coltype: 'number',
          formatmask: '%d-%m-%Y',
          master_colname: ''
        },
        {
          colname: 'plafon_am',
          colval: '0',  // Static value
          coltype: 'number',
          formatmask: '{:,.0f}',
          master_colname: ''
        },
        {
          colname: 'interest',
          colval: '0.00',  // Static value
          coltype: 'number',
          formatmask: '{:,.2f}',
          master_colname: ''
        },
        {
          colname: 'int_am',
          colval: '0.00',  // Static value
          coltype: 'number',
          formatmask: '{:,.2f}',
          master_colname: ''
        },
        {
          colname: 'int_adm',
          colval: '0.00',  // Static value
          coltype: 'number',
          formatmask: '{:,.2f}',
          master_colname: ''
        },
        {
          colname: 'am_adm',
          colval: '0.00',  // Static value
          coltype: 'number',
          formatmask: '{:,.2f}',
          master_colname: ''
        },
        {
          colname: 'tot_am',
          colval: '0',  // Static value
          coltype: 'number',
          formatmask: '{:,.0f}',
          master_colname: ''
        },
        {
          colname: 'instal',
          colval: '0',  // Static value
          coltype: 'number',
          formatmask: '{:,.0f}',
          master_colname: ''
        },
        {
          colname: 'doc_date',
          colval: '2025-07-02',  // Static value
          coltype: 'date',
          formatmask: '%d-%m-%Y',
          master_colname: ''
        }
      ]
    }
  ];

  console.log('Data to be sent:', data);

  try {
    const response = await pinjamanService.createPinjaman(data);
    console.log(response);
  } catch (error) {
    console.error("Error creating pinjaman:", error);
  }
}


// function openSettlementForm(item) {
//   settlementData.value = { ...item }
//   activeTab.value = 'settlement'
//   showForm.value = true
// }

// const activeTab = ref('settlement') // Default tab is 'pinjaman'
// const searchQuery = ref('')
// const showForm = ref(false)
const activeStep = ref(1)

function goToStep2() {
  activeStep.value = 2
}

function goToStep1() {
  activeStep.value = 1
}


const filteredLoans = computed(() => {
  return pinjamanList.value.filter(loan =>
    loan.mbr_name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    loan.doc_num.includes(searchQuery.value) ||
    loan.mbr_mbrid.includes(searchQuery.value)
  )
})

const filteredSettlements = computed(() => {
  return settlementList.value.filter(item =>
    (item.name?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
     item.docNo?.includes(searchQuery.value) ||
     item.mbrid?.includes(searchQuery.value))
  );
});

function addSettlement() {
  showForm.value = true
}

// Upload Potongan Data
const uploads = ref([
  { docNo: '54000000161', docDate: '24-10-2024', description: 'Pembayaran Angsuran' },
  { docNo: '54000000160', docDate: '24-10-2024', description: 'Pembayaran Angsuran' },
  { docNo: '54000000159', docDate: '24-10-2024', description: 'Pembayaran Angsuran' },
])

const filteredUploads = computed(() => {
  return uploads.value.filter(item =>
    item.description.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    item.docNo.includes(searchQuery.value)
  ) 
})

function newTransaction() {
  showForm.value = true
}

function uploadData() {
  alert('Fitur upload data belum diimplementasikan.')
}

const formatCurrency = (value) => {
  if (value === null || value === undefined) return '-';
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value);
};

const settlementData = ref(null)
function openSettlementForm(item) {
  settlementData.value = item
  activeTab.value = 'settlement'
  showForm.value = true
}

// onMounted(async () => {
//   try {
//     const response = await pinjamanService.getSettlementList()
//     settlementList.value = response.tabledata // atau sesuaikan dengan struktur respons API kamu
//   } catch (error) {
//     console.error('Error fetching settlement data:', error)
//   }
// })

</script>

<style scoped>
/* Custom Styles for responsiveness */
table{
  overflow-x: auto;
  
}

th, td {
  text-align: left;
}

th {
  background-color: #E6F7FD;
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
  
table{
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