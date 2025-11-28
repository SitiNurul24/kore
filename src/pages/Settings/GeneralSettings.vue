<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <div class="max-w-6xl mx-auto space-y-6">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 class="text-2xl font-bold text-gray-800">General Setting</h2>
          <p class="text-sm text-gray-500">Kelola konfigurasi utama aplikasi sesuai kebutuhan koperasi Anda.</p>
        </div>
        <div class="flex items-center gap-3">
          <button
            class="px-4 py-2 bg-[#02A2DC] text-white rounded-lg shadow-md hover:bg-[#0191b8] transition"
            type="button"
            @click="handleSave"
          >
            Save
          </button>
          <button
            class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
            type="button"
          >
            Cancel
          </button>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-md overflow-hidden">
        <div class="flex flex-col lg:flex-row">
          <aside class="lg:w-60 border-b lg:border-b-0 lg:border-r border-gray-200 bg-gray-50">
            <nav class="flex lg:flex-col overflow-x-auto lg:overflow-visible">
              <button
                v-for="section in sectionList"
                :key="section.id"
                type="button"
                @click="navigateToSection(section.id)"
                class="px-4 py-3 text-sm font-medium transition whitespace-nowrap"
                :class="[
                  activeSection === section.id
                    ? 'text-[#02A2DC] bg-white lg:rounded-none lg:border-l-4 lg:border-[#02A2DC] shadow-inner'
                    : 'text-gray-600 hover:text-[#02A2DC] hover:bg-gray-100',
                ]"
              >
                {{ section.label }}
              </button>
            </nav>
          </aside>

          <main class="flex-1 p-6 space-y-6">
             <transition name="fade">
              <div
                v-if="saveStatus"
                class="flex items-center gap-3 px-4 py-3 border rounded-lg"
                :class="saveStatus.type === 'success'
                  ? 'bg-green-50 border-green-200 text-green-700'
                  : 'bg-red-50 border-red-200 text-red-700'"
              >
                <svg
                  v-if="saveStatus.type === 'success'"
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
                <svg
                  v-else
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM12 15.75h.007v.008H12v-.008Z"
                  />
                </svg>
                <p class="text-sm font-medium">{{ saveStatus.message }}</p>
              </div>
            </transition>
            <!-- Currency & Currency Rate Section -->
            <template v-if="['currency', 'currency-rate'].includes(activeSection)">
              <div class="flex flex-wrap items-center gap-3">
                <button
                  v-for="tab in currencyTabs"
                  :key="tab.id"
                  type="button"
                  @click="setCurrencyTab(tab.id)"
                  class="px-4 py-2 rounded-lg text-sm font-semibold transition"
                  :class="[
                    activeCurrencyTab === tab.id
                      ? 'bg-[#02A2DC] text-white shadow'
                      : 'bg-gray-100 text-gray-600 hover:text-[#02A2DC]',
                  ]"
                >
                  {{ tab.label }}
                </button>
              </div>

              <div v-if="activeCurrencyTab === 'currency'" class="space-y-6">
                <section class="border border-gray-200 rounded-lg overflow-hidden">
                     <header class="px-4 py-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
                    <h3 class="text-base font-semibold text-gray-700">Rate Type</h3>
                      <div class="flex gap-3">
                      <button
                        type="button"
                        class="px-3 py-1.5 border border-gray-300 rounded-md text-sm text-gray-600 hover:bg-gray-100 transition"
                        @click="addRateTypeRow"
                      >
                        Add
                      </button>
                      <button
                        type="button"
                        class="px-3 py-1.5 border rounded-md text-sm transition"
                        :class="selectedRateTypeIds.length
                          ? 'border-red-300 text-red-600 hover:bg-red-50'
                          : 'border-gray-200 text-gray-400 cursor-not-allowed'"
                        :disabled="!selectedRateTypeIds.length"
                        @click="removeSelectedRateTypes"
                      >
                        Remove
                      </button>
                    </div>
                  </header>
                  <div class="p-4">
                    <div class="overflow-x-auto">
                      <table class="min-w-full text-sm">
                        <thead class="bg-[#02A2DC] text-white">
                          <tr>
                               <th class="w-12 px-4 py-3">
                              <input
                                type="checkbox"
                                class="w-4 h-4 text-[#02A2DC] border-white rounded focus:ring-offset-0 focus:ring-white"
                                v-model="isAllRateTypesSelected"
                                :disabled="!rateTypeData.length"
                              />
                            </th>
                            <th class="px-4 py-3 text-left font-semibold">Rate Type</th>
                            <th class="px-4 py-3 text-left font-semibold">Description</th>
                            <th class="px-4 py-3 text-left font-semibold">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            v-for="type in rateTypeData"
                            :key="type.id"
                            class="border-b last:border-0 border-gray-200"
                          >


                            <td class="px-4 py-3">


                                                           <input
                                type="checkbox"
                                class="w-4 h-4 text-[#02A2DC] border-gray-300 rounded focus:ring-[#02A2DC]"
                                v-model="selectedRateTypeIds"
                                :value="type.id"
                              />
                            </td>
                            <td class="px-4 py-3 text-gray-700 font-medium">
                              <input
                                v-model="type.code"
                                type="text"
                                placeholder="Code"
                                class="w-full border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#02A2DC]"
                              />
                            </td>
                            <td class="px-4 py-3 text-gray-600">
                              <input
                                v-model="type.description"
                                type="text"
                                placeholder="Description"
                                class="w-full border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#02A2DC]"
                              />
                            </td>
                            <td class="px-4 py-3">
                              <select
                                v-model="type.status"
                                class="w-full border border-gray-200 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#02A2DC]">
                                <option v-for="status in statusOptions" :key="status" :value="status">{{ status }}</option>
                              </select>
                            </td>
                          </tr>
                           <tr v-if="!rateTypeData.length">
                            <td class="px-4 py-6 text-center text-gray-500" colspan="4">No rate types available.</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </section>

                <section class="border border-gray-200 rounded-lg overflow-hidden">
                  <header class="px-4 py-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
                    <h3 class="text-base font-semibold text-gray-700">Currency</h3>
                    <div class="flex gap-3">
                      <button
                        type="button"
                        class="px-3 py-1.5 border border-gray-300 rounded-md text-sm text-gray-600 hover:bg-gray-100 transition"
                       @click="addCurrencyRow"
                        >
                        Add
                      </button>
                      <button
                        type="button"
                         class="px-3 py-1.5 border rounded-md text-sm transition"
                        :class="selectedCurrencyIds.length
                          ? 'border-red-300 text-red-600 hover:bg-red-50'
                          : 'border-gray-200 text-gray-400 cursor-not-allowed'"
                        :disabled="!selectedCurrencyIds.length"
                        @click="removeSelectedCurrencies"
                      >
                        Remove
                      </button>
                    </div>
                  </header>
                  <div class="p-4">
                    <div class="overflow-x-auto">
                      <table class="min-w-full text-sm">
                        <thead class="bg-[#02A2DC] text-white">
                          <tr>
                             <th class="w-12 px-4 py-3">
                              <input
                                type="checkbox"
                                class="w-4 h-4 text-[#02A2DC] border-white rounded focus:ring-offset-0 focus:ring-white"
                                v-model="isAllCurrenciesSelected"
                                :disabled="!currencyList.length"
                              />
                            </th>
                            <th class="px-4 py-3 text-left font-semibold">Currency</th>
                            <th class="px-4 py-3 text-left font-semibold">Symbol</th>
                            <th class="px-4 py-3 text-left font-semibold">Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            v-for="currency in currencyList"
                            :key="currency.id"
                            class="border-b last:border-0 border-gray-200"
                          >
                           <td class="px-4 py-3">
                              <input
                                type="checkbox"
                                class="w-4 h-4 text-[#02A2DC] border-gray-300 rounded focus:ring-[#02A2DC]"
                                v-model="selectedCurrencyIds"
                                :value="currency.id"
                              />
                            </td>
                            <td class="px-4 py-3 text-gray-700 font-medium">
                              <input
                                v-model="currency.code"
                                type="text"
                                placeholder="Code"
                                class="w-full border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#02A2DC]"
                              />
                            </td>
                            <td class="px-4 py-3 text-gray-600">
                              <input
                                v-model="currency.symbol"
                                type="text"
                                placeholder="Symbol"
                                class="w-full border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#02A2DC]"
                              />
                            </td>
                            <td class="px-4 py-3 text-gray-600">
                              <input
                                v-model="currency.description"
                                type="text"
                                placeholder="Description"
                                class="w-full border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#02A2DC]"
                              />
                            </td>
                          </tr>
                          <tr v-if="!currencyList.length">
                            <td class="px-4 py-6 text-center text-gray-500" colspan="4">No currencies available.</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </section>
              </div>

              <div v-else class="space-y-6">
                <section class="border border-gray-200 rounded-lg overflow-hidden">
                  <header class="px-4 py-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
                    <h3 class="text-base font-semibold text-gray-700">Currency Rate</h3>
                    <button
                      type="button"
                      class="px-3 py-1.5 border border-gray-300 rounded-md text-sm text-gray-600 hover:bg-gray-100 transition">
                      Add Rate
                    </button>
                  </header>
                  <div class="p-4">
                    <div class="overflow-x-auto">
                      <table class="min-w-full text-sm">
                        <thead class="bg-[#02A2DC] text-white">
                          <tr>
                            <th class="px-4 py-3 text-left font-semibold">Currency</th>
                            <th class="px-4 py-3 text-left font-semibold">Rate Type</th>
                            <th class="px-4 py-3 text-left font-semibold">Valid From</th>
                            <th class="px-4 py-3 text-left font-semibold">Valid To</th>
                            <th class="px-4 py-3 text-left font-semibold">Rate</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            v-for="rate in currencyRateData"
                            :key="rate.id"
                            class="border-b last:border-0 border-gray-200"
                          >
                            <td class="px-4 py-3 text-gray-700 font-medium">{{ rate.currency }}</td>
                            <td class="px-4 py-3 text-gray-600">{{ rate.rateType }}</td>
                            <td class="px-4 py-3 text-gray-600">{{ rate.validFrom }}</td>
                            <td class="px-4 py-3 text-gray-600">{{ rate.validTo }}</td>
                            <td class="px-4 py-3 text-gray-600">{{ rate.rate }}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </section>
              </div>
            </template>

            <!-- Company Section -->
            <template v-else-if="activeSection === 'company'">
              <section class="border border-gray-200 rounded-lg overflow-hidden">
                <header class="px-4 py-3 bg-gray-50 border-b border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <div>
                    <h3 class="text-base font-semibold text-gray-700">Informasi Perusahaan</h3>
                    <p class="text-xs text-gray-500">Kelola identitas perusahaan dan informasi pajak koperasi Anda.</p>
                  </div>
                  <div class="flex items-center gap-2">
                    <button
                      v-if="!isCreatingCompany"
                      type="button"
                      class="px-3 py-1.5 border border-[#02A2DC] text-[#02A2DC] rounded-md text-sm font-medium hover:bg-[#02A2DC] hover:text-white transition"
                      @click="startNewCompany"
                    >
                      New
                    </button>
                    <template v-else>
                      <button
                        type="button"
                        class="px-3 py-1.5 border border-gray-300 text-gray-600 rounded-md text-sm font-medium hover:bg-gray-100 transition"
                        @click="cancelNewCompany"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        form="company-create-form"
                        class="px-3 py-1.5 bg-[#02A2DC] text-white rounded-md text-sm font-medium shadow hover:bg-[#0191b8] transition"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        class="px-3 py-1.5 border border-red-300 text-red-600 rounded-md text-sm font-medium hover:bg-red-50 transition disabled:opacity-60 disabled:cursor-not-allowed"
                        :disabled="!companyProfile"
                        @click="removeCompanyProfile"
                      >
                        Remove
                      </button>
                    </template>
                  </div>
                </header>
                <div class="p-6 space-y-6">
                  <transition name="fade">
                    <div
                      v-if="companyNotification"
                      class="px-4 py-3 border rounded-lg flex items-start gap-3"
                      :class="companyNotification.type === 'success'
                        ? 'bg-green-50 border-green-200 text-green-700'
                        : 'bg-red-50 border-red-200 text-red-700'"
                    >
                      <svg
                        v-if="companyNotification.type === 'success'"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="1.5"
                        class="w-5 h-5 mt-0.5"
                      >
                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                      <svg
                        v-else
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="1.5"
                        class="w-5 h-5 mt-0.5"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM12 15.75h.007v.008H12v-.008Z"
                        />
                      </svg>
                      <p class="text-sm font-medium">{{ companyNotification.message }}</p>
                    </div>
                  </transition>

                  <form
                    v-if="isCreatingCompany"
                    id="company-create-form"
                    class="space-y-6"
                    @submit.prevent="saveCompanyForm"
                  >
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label class="text-sm font-semibold text-gray-700 mb-1 block">Company Name</label>
                        <input
                          v-model="companyForm.companyName"
                          type="text"
                          required
                          class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#02A2DC]"
                          placeholder="Enter company name"
                        />
                      </div>
                      <div>
                        <label class="text-sm font-semibold text-gray-700 mb-1 block">Company Registry</label>
                        <input
                          v-model="companyForm.registryNumber"
                          type="text"
                          class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#02A2DC]"
                          placeholder="Enter registry number"
                        />
                      </div>
                      <div>
                        <label class="text-sm font-semibold text-gray-700 mb-1 block">Address</label>
                        <textarea
                          v-model="companyForm.address"
                          rows="3"
                          class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#02A2DC]"
                          placeholder="Enter company address"
                        ></textarea>
                      </div>
                      <div class="grid grid-cols-1 gap-4">
                        <div>
                          <label class="text-sm font-semibold text-gray-700 mb-1 block">Accounting</label>
                          <select
                            v-model="companyForm.accounting"
                            class="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#02A2DC]"
                          >
                            <option disabled value="">Select accounting method</option>
                            <option v-for="option in accountingOptions" :key="option" :value="option">{{ option }}</option>
                          </select>
                        </div>
                        <div>
                          <label class="text-sm font-semibold text-gray-700 mb-1 block">Country</label>
                          <select
                            v-model="companyForm.country"
                            class="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#02A2DC]"
                          >
                            <option disabled value="">Select country</option>
                            <option v-for="country in countryOptions" :key="country" :value="country">{{ country }}</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <label class="text-sm font-semibold text-gray-700 mb-1 block">Base Currency</label>
                        <select
                          v-model="companyForm.baseCurrency"
                          class="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#02A2DC]"
                        >
                          <option disabled value="">Select base currency</option>
                          <option v-for="currency in baseCurrencyOptions" :key="currency" :value="currency">{{ currency }}</option>
                        </select>
                      </div>
                      <div>
                        <label class="text-sm font-semibold text-gray-700 mb-1 block">Rate Type</label>
                        <select
                          v-model="companyForm.rateType"
                          class="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#02A2DC]"
                        >
                          <option disabled value="">Select rate type</option>
                          <option v-for="rate in rateTypeOptions" :key="rate" :value="rate">{{ rate }}</option>
                        </select>
                      </div>
                      <div>
                        <label class="text-sm font-semibold text-gray-700 mb-1 block">Tax ID</label>
                        <input
                          v-model="companyForm.taxId"
                          type="text"
                          class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#02A2DC]"
                          placeholder="Enter tax identification"
                        />
                      </div>
                      <div>
                        <label class="text-sm font-semibold text-gray-700 mb-1 block">Tax Name</label>
                        <input
                          v-model="companyForm.taxName"
                          type="text"
                          class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#02A2DC]"
                          placeholder="Enter tax name"
                        />
                      </div>
                    </div>
                    <div class="flex justify-end gap-3">
                      <button
                        type="button"
                        class="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition"
                        @click="cancelNewCompany"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        class="px-4 py-2 bg-[#02A2DC] text-white rounded-lg text-sm font-medium shadow hover:bg-[#0191b8] transition"
                      >
                        Save Company
                      </button>
                    </div>
                  </form>

                  <div v-else>
                    <div v-if="companyProfile" class="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div class="border border-gray-200 rounded-lg p-4 bg-gray-50">
                        <p class="text-xs font-medium text-gray-500 uppercase tracking-wide">Company Name</p>
                        <p class="mt-2 text-base font-semibold text-gray-800">{{ companyProfile.companyName }}</p>
                      </div>
                      <div class="border border-gray-200 rounded-lg p-4 bg-gray-50">
                        <p class="text-xs font-medium text-gray-500 uppercase tracking-wide">Company Registry</p>
                        <p class="mt-2 text-base font-semibold text-gray-800">{{ companyProfile.registryNumber || '-' }}</p>
                      </div>
                      <div class="border border-gray-200 rounded-lg p-4 bg-gray-50 md:col-span-2">
                        <p class="text-xs font-medium text-gray-500 uppercase tracking-wide">Address</p>
                        <p class="mt-2 text-base text-gray-700">{{ companyProfile.address || 'Belum ada alamat yang tersimpan.' }}</p>
                      </div>
                      <div class="border border-gray-200 rounded-lg p-4 bg-gray-50">
                        <p class="text-xs font-medium text-gray-500 uppercase tracking-wide">Accounting</p>
                        <p class="mt-2 text-base text-gray-700">{{ companyProfile.accounting || '-' }}</p>
                      </div>
                      <div class="border border-gray-200 rounded-lg p-4 bg-gray-50">
                        <p class="text-xs font-medium text-gray-500 uppercase tracking-wide">Country</p>
                        <p class="mt-2 text-base text-gray-700">{{ companyProfile.country || '-' }}</p>
                      </div>
                      <div class="border border-gray-200 rounded-lg p-4 bg-gray-50">
                        <p class="text-xs font-medium text-gray-500 uppercase tracking-wide">Base Currency</p>
                        <p class="mt-2 text-base text-gray-700">{{ companyProfile.baseCurrency || '-' }}</p>
                      </div>
                      <div class="border border-gray-200 rounded-lg p-4 bg-gray-50">
                        <p class="text-xs font-medium text-gray-500 uppercase tracking-wide">Rate Type</p>
                        <p class="mt-2 text-base text-gray-700">{{ companyProfile.rateType || '-' }}</p>
                      </div>
                      <div class="border border-gray-200 rounded-lg p-4 bg-gray-50">
                        <p class="text-xs font-medium text-gray-500 uppercase tracking-wide">Tax ID</p>
                        <p class="mt-2 text-base text-gray-700">{{ companyProfile.taxId || '-' }}</p>
                      </div>
                      <div class="border border-gray-200 rounded-lg p-4 bg-gray-50">
                        <p class="text-xs font-medium text-gray-500 uppercase tracking-wide">Tax Name</p>
                        <p class="mt-2 text-base text-gray-700">{{ companyProfile.taxName || '-' }}</p>
                      </div>
                    </div>
                    <div v-else class="text-center py-12 text-gray-500 border border-dashed border-gray-300 rounded-lg">
                      <p class="text-sm font-medium">Belum ada data perusahaan.</p>
                      <p class="text-xs mt-1">Klik tombol <span class="font-semibold text-[#02A2DC]">New</span> untuk menambahkan data perusahaan baru.</p>
                    </div>
                  </div>
                </div>
              </section>
            </template>

            <!-- Document Section -->
            <template v-else-if="activeSection === 'document'">
              <section class="border border-gray-200 rounded-lg overflow-hidden">
                <header class="px-4 py-3 bg-gray-50 border-b border-gray-200">
                  <h3 class="text-base font-semibold text-gray-700">Pengaturan Dokumen</h3>
                </header>
                <div class="p-6 space-y-4">
                  <div
                    v-for="setting in documentSettings"
                    :key="setting.id"
                    class="flex items-start justify-between border border-gray-200 rounded-lg px-4 py-3"
                  >
                    <div>
                      <p class="text-sm font-semibold text-gray-700">{{ setting.name }}</p>
                      <p class="text-xs text-gray-500">{{ setting.description }}</p>
                    </div>
                    <label class="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        class="sr-only"
                        :checked="setting.enabled"
                        @change="toggleDocumentSetting(setting.id)"
                      />
                      <span
                        class="w-11 h-6 flex items-center bg-gray-200 rounded-full p-1 duration-300 ease-in-out"
                        :class="setting.enabled ? 'bg-[#02A2DC]' : 'bg-gray-200'"
      >
                        <span
                          class="bg-white w-4 h-4 rounded-full shadow-md transform duration-300"
                          :class="setting.enabled ? 'translate-x-5' : 'translate-x-0'"
                        ></span>
                      </span>
                    </label>
                  </div>
                </div>
              </section>
            </template>

            <!-- Notification Section -->
            <template v-else-if="activeSection === 'notification'">
              <section class="border border-gray-200 rounded-lg overflow-hidden">
                <header class="px-4 py-3 bg-gray-50 border-b border-gray-200">
                  <h3 class="text-base font-semibold text-gray-700">Preferensi Notifikasi</h3>
                </header>
                <div class="p-6 space-y-5">
                  <div
                    v-for="channel in notificationPreferences"
                    :key="channel.id"
                    class="flex items-start gap-4 border border-gray-200 rounded-lg px-4 py-3">
                    <input
                      type="checkbox"
                      class="mt-1 w-4 h-4 text-[#02A2DC] border-gray-300 rounded focus:ring-[#02A2DC]"
                      :checked="channel.enabled"
                      @change="toggleNotification(channel.id)"
                    />
                    <div>
                      <p class="text-sm font-semibold text-gray-700">{{ channel.label }}</p>
                      <p class="text-xs text-gray-500">{{ channel.description }}</p>
                    </div>
                  </div>
                </div>
              </section>
            </template>

            <!-- Language Section -->
            <template v-else-if="activeSection === 'language'">
              <section class="border border-gray-200 rounded-lg overflow-hidden">
                <header class="px-4 py-3 bg-gray-50 border-b border-gray-200">
                  <h3 class="text-base font-semibold text-gray-700">Bahasa Aplikasi</h3>
                </header>
                <div class="p-6 space-y-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-600 mb-2">Bahasa Utama</label>
                    <select
                      v-model="selectedLanguage"
                      class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#02A2DC]"
                    >
                      <option v-for="language in availableLanguages" :key="language" :value="language">
                        {{ language }}
                      </option>
                    </select>
                  </div>
                  <div>
                    <p class="text-sm font-semibold text-gray-700 mb-3">Bahasa Tambahan</p>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <label
                        v-for="language in additionalLanguages"
                        :key="language.id"
                        class="flex items-center gap-3 border border-gray-200 rounded-lg px-3 py-2"
                      >
                        <input
                          type="checkbox"
                          class="w-4 h-4 text-[#02A2DC] border-gray-300 rounded focus:ring-[#02A2DC]"
                          :checked="language.enabled"
                          @change="toggleAdditionalLanguage(language.id)"
                        />
                        <span class="text-sm text-gray-600">{{ language.label }}</span>
                      </label>
                    </div>
                  </div>
                </div>
              </section>
            </template>

            <!-- Reference Section -->
            <template v-else-if="activeSection === 'reference'">
              <section class="border border-gray-200 rounded-lg overflow-hidden">
                <header class="px-4 py-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
                  <h3 class="text-base font-semibold text-gray-700">Referensi</h3>
                  <button
                    type="button"
                    class="px-3 py-1.5 border border-gray-300 rounded-md text-sm text-gray-600 hover:bg-gray-100 transition"
                  >
                    Add Reference
                  </button>
                </header>
                <div class="p-4">
                  <div class="overflow-x-auto">
                    <table class="min-w-full text-sm">
                      <thead class="bg-[#02A2DC] text-white">
                        <tr>
                          <th class="px-4 py-3 text-left font-semibold">Code</th>
                          <th class="px-4 py-3 text-left font-semibold">Description</th>
                          <th class="px-4 py-3 text-left font-semibold">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="reference in referenceData"
                          :key="reference.id"
                          class="border-b last:border-0 border-gray-200"
                        >
                          <td class="px-4 py-3 text-gray-700 font-medium">{{ reference.code }}</td>
                          <td class="px-4 py-3 text-gray-600">{{ reference.description }}</td>
                          <td class="px-4 py-3">
                            <span
                              class="px-2 py-1 text-xs font-semibold rounded-full"
                              :class="reference.status === 'Active'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-gray-100 text-gray-500'"
                            >
                              {{ reference.status }}
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>
            </template>

            <!-- Fallback Section -->
            <template v-else>
              <div class="text-center py-12 text-gray-500">
                Pengaturan belum tersedia untuk bagian ini.
              </div>
            </template>
          </main>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const sectionList = [
  { id: 'currency', label: 'Currency' },
  { id: 'company', label: 'Company' },
  { id: 'document', label: 'Document' },
  { id: 'notification', label: 'Notification' },
  { id: 'language', label: 'Language' },
  { id: 'reference', label: 'Reference' },
  { id: 'currency-rate', label: 'Currency Rate' },
]

const validSections = computed(() => sectionList.map((section) => section.id))

const getInitialSection = () => {
  const sectionParam = route.params.section
  if (typeof sectionParam === 'string' && validSections.value.includes(sectionParam)) {
    return sectionParam
  }
  return 'currency'
}

const activeSection = ref(getInitialSection())

watch(
  () => route.params.section,
  (newSection) => {
    if (typeof newSection === 'string' && validSections.value.includes(newSection)) {
      activeSection.value = newSection
    } else {
      activeSection.value = 'currency'
    }
  },
  { immediate: true },
)

const navigateToSection = (sectionId) => {
  if (validSections.value.includes(sectionId)) {
    router.push({ path: `/settings/${sectionId}` })
  }
}

const currencyTabs = [
  { id: 'currency', label: 'Currency' },
  { id: 'currency-rate', label: 'Currency Rate' },
]

const activeCurrencyTab = ref(activeSection.value === 'currency-rate' ? 'currency-rate' : 'currency')

watch(
  activeSection,
  (section) => {
    if (section === 'currency-rate') {
      activeCurrencyTab.value = 'currency-rate'
    } else if (section === 'currency') {
      activeCurrencyTab.value = 'currency'
    }
  },
  { immediate: true },
)

const setCurrencyTab = (tabId) => {
  if (tabId === 'currency-rate') {
    navigateToSection('currency-rate')
  } else {
    navigateToSection('currency')
  }
}

const statusOptions = ['Active', 'Inactive']

const rateTypeData = ref([
  { id: 1, code: 'S', description: 'Tax Rate', status: 'Active' },
  { id: 2, code: 'M', description: 'Market Rate', status: 'Active' },
])

const currencyList = ref([
  { id: 1, code: 'IDR', symbol: 'Rp', description: 'Rupiah' },
  { id: 2, code: 'USD', symbol: '$', description: 'US Dollar' },
  { id: 3, code: 'JPY', symbol: '¥', description: 'Yen' },
  { id: 4, code: 'SGD', symbol: '$', description: 'Singapore Dollar' },
  { id: 5, code: 'EUR', symbol: '€', description: 'Euro' },
])
const selectedRateTypeIds = ref([])
const selectedCurrencyIds = ref([])

const isAllRateTypesSelected = computed({
  get: () =>
    rateTypeData.value.length > 0 && selectedRateTypeIds.value.length === rateTypeData.value.length,
  set: (value) => {
    selectedRateTypeIds.value = value ? rateTypeData.value.map((type) => type.id) : []
  },
})

const isAllCurrenciesSelected = computed({
  get: () =>
    currencyList.value.length > 0 && selectedCurrencyIds.value.length === currencyList.value.length,
  set: (value) => {
    selectedCurrencyIds.value = value ? currencyList.value.map((currency) => currency.id) : []
  },
})

let rateTypeCounter = rateTypeData.value.length + 1
let currencyCounter = currencyList.value.length + 1

const addRateTypeRow = () => {
  rateTypeData.value = [
    ...rateTypeData.value,
    { id: rateTypeCounter++, code: '', description: '', status: 'Active' },
  ]
}

const removeSelectedRateTypes = () => {
  if (!selectedRateTypeIds.value.length) return
  rateTypeData.value = rateTypeData.value.filter((type) => !selectedRateTypeIds.value.includes(type.id))
  selectedRateTypeIds.value = []
}

const addCurrencyRow = () => {
  currencyList.value = [
    ...currencyList.value,
    { id: currencyCounter++, code: '', symbol: '', description: '' },
  ]
}

const removeSelectedCurrencies = () => {
  if (!selectedCurrencyIds.value.length) return
  currencyList.value = currencyList.value.filter(
    (currency) => !selectedCurrencyIds.value.includes(currency.id),
  )
  selectedCurrencyIds.value = []
}

const saveStatus = ref(null)
let saveStatusTimeoutId

const handleSave = () => {
  if (saveStatusTimeoutId) {
    clearTimeout(saveStatusTimeoutId)
  }

  console.table(rateTypeData.value)
  console.table(currencyList.value)

  saveStatus.value = {
    type: 'success',
    message: 'Currency settings saved successfully.',
  }

  saveStatusTimeoutId = setTimeout(() => {
    saveStatus.value = null
    saveStatusTimeoutId = null
  }, 3000)
}

onBeforeUnmount(() => {
  if (saveStatusTimeoutId) {
    clearTimeout(saveStatusTimeoutId)
  }
  clearCompanyNotification()
})

const currencyRateData = [
  { id: 1, currency: 'USD', rateType: 'Market Rate', validFrom: '01 Jan 2024', validTo: '31 Jan 2024', rate: '15,200' },
  { id: 2, currency: 'JPY', rateType: 'Market Rate', validFrom: '01 Jan 2024', validTo: '31 Jan 2024', rate: '105' },
  { id: 3, currency: 'EUR', rateType: 'Tax Rate', validFrom: '01 Jan 2024', validTo: '31 Jan 2024', rate: '16,400' },
]

const accountingOptions = ['Standard', 'Accrual', 'Cash Basis']
const countryOptions = ['Indonesia', 'Malaysia', 'Singapore', 'Thailand']
const baseCurrencyOptions = ['IDR - Indonesian Rupiah', 'USD - US Dollar', 'SGD - Singapore Dollar', 'EUR - Euro']
const rateTypeOptions = ['Market Rate', 'Tax Rate', 'Average Rate']

const getDefaultCompanyForm = () => ({
  companyName: '',
  registryNumber: '',
  address: '',
  accounting: '',
  country: '',
  baseCurrency: '',
  rateType: '',
  taxId: '',
  taxName: '',
})

const companyProfile = ref({
  companyName: 'Koperasi Sejahtera Bersama',
  registryNumber: 'ID-2024-001',
  address: 'Jl. Merdeka No. 45, Jakarta Pusat, DKI Jakarta',
  accounting: 'Standard',
  country: 'Indonesia',
  baseCurrency: 'IDR - Indonesian Rupiah',
  rateType: 'Market Rate',
  taxId: '01.234.567.8-123.000',
  taxName: 'PPh Badan Koperasi',
})

const companyForm = ref(getDefaultCompanyForm())
const isCreatingCompany = ref(false)
const companyNotification = ref(null)
let companyNotificationTimeoutId

const resetCompanyForm = () => {
  companyForm.value = { ...getDefaultCompanyForm() }
}

const clearCompanyNotification = () => {
  if (companyNotificationTimeoutId) {
    clearTimeout(companyNotificationTimeoutId)
    companyNotificationTimeoutId = null
  }
}

const setCompanyNotification = (notification) => {
  clearCompanyNotification()
  companyNotification.value = notification
  companyNotificationTimeoutId = setTimeout(() => {
    companyNotification.value = null
    companyNotificationTimeoutId = null
  }, 3000)
}

const startNewCompany = () => {
  resetCompanyForm()
  isCreatingCompany.value = true
  clearCompanyNotification()
  companyNotification.value = null
}

const cancelNewCompany = () => {
  isCreatingCompany.value = false
  resetCompanyForm()
}

const saveCompanyForm = () => {
  companyProfile.value = { ...companyForm.value }
  isCreatingCompany.value = false
  setCompanyNotification({ type: 'success', message: 'Data perusahaan berhasil disimpan.' })
  resetCompanyForm()
}

const removeCompanyProfile = () => {
  if (!companyProfile.value) return
  companyProfile.value = null
  isCreatingCompany.value = false
  resetCompanyForm()
  setCompanyNotification({ type: 'success', message: 'Data perusahaan telah dihapus.' })
}

const documentSettings = ref([
  {
    id: 'autoNumber',
    name: 'Penomoran Otomatis',
    description: 'Aktifkan penomoran otomatis untuk dokumen transaksi baru.',
    enabled: true,
  },
  {
    id: 'approvalWorkflow',
    name: 'Workflow Persetujuan',
    description: 'Minta persetujuan manager sebelum dokumen diposting.',
    enabled: false,
  },
  {
    id: 'attachmentRequired',
    name: 'Lampiran Wajib',
    description: 'Wajibkan lampiran dokumen pendukung untuk transaksi tertentu.',
    enabled: true,
  },
])

const toggleDocumentSetting = (settingId) => {
  documentSettings.value = documentSettings.value.map((setting) =>
    setting.id === settingId ? { ...setting, enabled: !setting.enabled } : setting,
  )
}

const notificationPreferences = ref([
  {
    id: 'email',
    label: 'Email Notification',
    description: 'Kirimkan update transaksi dan persetujuan melalui email.',
    enabled: true,
  },
  {
    id: 'sms',
    label: 'SMS Notification',
    description: 'Terima pemberitahuan penting melalui SMS.',
    enabled: false,
  },
  {
    id: 'inApp',
    label: 'In-App Notification',
    description: 'Tampilkan notifikasi langsung di dashboard aplikasi.',
    enabled: true,
  },
])

const toggleNotification = (channelId) => {
  notificationPreferences.value = notificationPreferences.value.map((channel) =>
    channel.id === channelId ? { ...channel, enabled: !channel.enabled } : channel,
  )
}

const availableLanguages = ['Bahasa Indonesia', 'English', '日本語 (Japanese)']
const selectedLanguage = ref('Bahasa Indonesia')

const additionalLanguages = ref([
  { id: 'english', label: 'English', enabled: true },
  { id: 'mandarin', label: '中文 (Mandarin)', enabled: false },
  { id: 'japanese', label: '日本語 (Japanese)', enabled: true },
  { id: 'arabic', label: 'العربية (Arabic)', enabled: false },
])

const toggleAdditionalLanguage = (languageId) => {
  additionalLanguages.value = additionalLanguages.value.map((language) =>
    language.id === languageId ? { ...language, enabled: !language.enabled } : language,
  )
}

const referenceData = [
  { id: 1, code: 'REF-001', description: 'Kode Referensi Penjualan', status: 'Active' },
  { id: 2, code: 'REF-002', description: 'Kode Referensi Pembelian', status: 'Active' },
  { id: 3, code: 'REF-003', description: 'Kode Referensi Simpanan', status: 'Inactive' },
]

</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
