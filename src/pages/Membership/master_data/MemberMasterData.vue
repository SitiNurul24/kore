<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <h2 class="text-xl font-bold mb-4">Membership</h2>

    <!-- Search + Card Area -->
    <div v-if="!isAddFormVisible" class="bg-white rounded-lg shadow-md p-6 mb-6">
      <div class="mb-6">
        <h3 class="text-lg font-semibold mb-2">Search Member</h3>
        <div class="relative w-full md:w-1/3">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Search"
            class="w-full p-3 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <span class="material-icons absolute right-3 top-3 text-gray-400">search</span>
        </div>
      </div>

      <div class="flex justify-end mb-6">
        <button
          @click="openAddMemberForm"
          class="flex items-center justify-center bg-[#02A2DC] hover:bg-[#0191b8] text-white px-6 py-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        >
          <span
            class="w-8 h-8 flex items-center justify-center bg-[#02A2DC] border-2 border-white rounded-full text-white text-lg font-bold mr-2"
            >+</span
          >
          <span class="text-lg font-semibold">Add New Member</span>
        </button>
      </div>

      <div v-if="filteredMembers.length" class="flex flex-wrap gap-4 mt-6">
        <div
          v-for="(member, index) in filteredMembers"
          :key="index"
          class="bg-white rounded-lg shadow-md border border-gray-300 p-4 w-[24%] min-w-[200px] hover:shadow-lg transition-shadow duration-300"
        >
          <div class="flex items-center w-full">
            <img
              :src="
                member.picture && member.picture !== ''
                  ? member.picture
                  : '/src/assets/fotoprofil.png'
              "
              alt="photo"
              class="w-16 h-16 rounded-full object-cover mr-4"
            />
            <div class="flex flex-col">
              <p class="text-xs text-blue-500 font-bold">ID Number</p>
              <p class="text-xs font-bold text-[#2b2b2b]">{{ member.id }}</p>
              <p class="text-xs text-blue-500 font-bold mt-2">Full Name</p>
              <p class="text-xs font-bold text-[#2b2b2b]">{{ member.fullName }}</p>
            </div>
          </div>

          <div class="flex justify-start mt-4 gap-2">
            <button
              @click="editMember(member)"
              class="bg-yellow-400 hover:bg-yellow-500 w-8 h-8 flex items-center justify-center rounded-md"
            >
              <span class="material-icons text-white text-sm">edit</span>
            </button>
            <button
              @click="removeMember(member)"
              class="bg-red-500 hover:bg-red-600 w-8 h-8 flex items-center justify-center rounded-md"
            >
              <span class="material-icons text-white text-sm">delete</span>
            </button>
          </div>
        </div>
      </div>
      <div v-else class="text-center text-gray-500 mt-10">No members found.</div>
    </div>

    <!-- Form Add New Member -->
    <div v-if="isAddFormVisible" class="bg-white rounded-lg shadow-md p-6 mt-4">
      <div class="flex items-center mb-6">
        <button
          @click="handleBack"
          class="flex items-center justify-center bg-blue-600 p-2 rounded-full"
        >
          <span class="material-icons text-white">arrow_back</span>
        </button>
        <h3 class="text-lg font-bold text-blue-600 ml-4">Add New Member</h3>
      </div>

      <div class="border-t-2 border-gray-300 mb-6"></div>

      <div class="flex justify-end gap-4 mb-6">
        <button
          type="button"
          @click="currentStep === 3 ? saveMember() : nextStep()"
          class="bg-[#02A2DC] text-white px-6 py-3 w-32 rounded-md text-sm font-medium"
        >
          Save
        </button>
        <button
          type="button"
          @click="cancelAddForm"
          class="bg-white text-blue-600 px-6 py-3 w-32 border border-blue-600 rounded-md text-sm font-medium"
        >
          Cancel
        </button>
      </div>

      <!-- STEP INDICATOR -->
      <div class="flex justify-between items-center mb-6 max-w-md mx-auto">
        <div class="flex flex-col items-center">
          <span
            :class="[
              'rounded-full w-8 h-8 flex items-center justify-center border-2',
              currentStep === 1
                ? 'bg-[#02A2DC] text-white border-[#02A2DC]'
                : 'border-gray-300 text-gray-400',
            ]"
            >1</span
          >
          <span
            :class="[currentStep === 1 ? 'text-[#02A2DC] font-semibold' : 'text-gray-400']"
            class="text-sm mt-1"
            >Personal Data</span
          >
        </div>
        <div class="border-t-2 flex-grow mx-2 border-gray-300"></div>
        <div class="flex flex-col items-center">
          <span
            :class="[
              'rounded-full w-8 h-8 flex items-center justify-center border-2',
              currentStep === 2
                ? 'bg-[#02A2DC] text-white border-[#02A2DC]'
                : 'border-gray-300 text-gray-400',
            ]"
            >2</span
          >
          <span
            :class="[currentStep === 2 ? 'text-[#02A2DC] font-semibold' : 'text-gray-400']"
            class="text-sm mt-1"
            >Address</span
          >
        </div>
        <div class="border-t-2 flex-grow mx-2 border-gray-300"></div>
        <div class="flex flex-col items-center">
          <span
            :class="[
              'rounded-full w-8 h-8 flex items-center justify-center border-2',
              currentStep === 3
                ? 'bg-[#02A2DC] text-white border-[#02A2DC]'
                : 'border-gray-300 text-gray-400',
            ]"
            >3</span
          >
          <span
            :class="[currentStep === 3 ? 'text-[#02A2DC] font-semibold' : 'text-gray-400']"
            class="text-sm mt-1"
            >Organization</span
          >
        </div>
      </div>

      <!-- STEP 1 -->
      <div v-if="currentStep === 1" class="w-full max-w-6xl px-6 mx-auto">
        <div class="grid grid-cols-2 gap-8 items-start">
          <!-- KIRI -->
          <div class="space-y-5 self-stretch mr-4">
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-1">Company</label>
              <input
                v-model="newMember.company"
                type="text"
                class="w-full p-3 border border-gray-400 rounded-md"
              />
            </div>
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-1">Full Name</label>
              <input
                v-model="newMember.fullName"
                type="text"
                class="w-full p-3 border border-gray-400 rounded-md"
              />
            </div>
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-1">Gender</label>
              <div class="flex gap-6">
                <label class="flex items-center gap-2">
                  <input type="radio" v-model="newMember.gender" value="M" /> Man
                </label>
                <label class="flex items-center gap-2">
                  <input type="radio" v-model="newMember.gender" value="F" /> Female
                </label>
              </div>
            </div>
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-1">Religion</label>
              <select
                v-model="newMember.religion"
                class="w-full p-3 border border-gray-400 rounded-md"
                :disabled="isLoading"
              >
                <option disabled value="">Select Religion</option>
                <!-- Loop through religions and display each fill_name -->
                <option
                  v-for="(religion, index) in religions"
                  :key="index"
                  :value="religion.fill_name"
                >
                  {{ religion.fill_name }}
                </option>
              </select>
              <div v-if="isLoading" class="text-gray-500 text-sm">Loading...</div>
            </div>
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-1">Description</label>
              <textarea
                v-model="newMember.description"
                rows="4"
                class="w-full p-3 border border-gray-400 rounded-md"
              ></textarea>
            </div>
          </div>

          <!-- KANAN -->
          <div class="space-y-5 self-stretch ml-4">
            <!-- Member ID -->
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-1">Member ID</label>
              <input
                v-model="newMember.memberId"
                type="text"
                class="w-full p-3 border border-gray-400 rounded-md"
              />
            </div>

            <!-- Birth Place, Date & Age -->
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-1"></label>
              <div class="flex gap-3">
                <div class="w-1/3">
                  <label class="block text-sm font-bold text-gray-700 mb-1">Birth Place</label>
                  <input
                    v-model="newMember.birthPlace"
                    type="text"
                    class="w-full p-3 border border-gray-400 rounded-md"
                    placeholder="Select City"
                  />
                </div>
                <div class="w-1/3">
                  <label class="block text-sm font-bold text-gray-700 mb-1">Birth Date</label>
                  <input
                    v-model="newMember.birthDate"
                    type="date"
                    @change="calculateAge"
                    class="w-full p-3 border border-gray-400 rounded-md"
                  />
                </div>
                <div class="w-1/3">
                  <label class="block text-sm font-bold text-gray-700 mb-1">Age</label>
                  <!-- Readonly input for age in "years, months" format -->
                  <input
                    v-model="newMember.age"
                    type="text"
                    class="w-full p-3 border border-gray-400 rounded-md"
                    readonly
                  />
                </div>
              </div>
            </div>

            <!-- Marital Status -->
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-1">Marital Status</label>
              <div class="flex gap-6">
                <label class="flex items-center gap-2">
                  <input type="radio" v-model="newMember.maritalStatus" value="Single" /> Single
                </label>
                <label class="flex items-center gap-2">
                  <input type="radio" v-model="newMember.maritalStatus" value="Married" /> Married
                </label>
                <label class="flex items-center gap-2">
                  <input type="radio" v-model="newMember.maritalStatus" value="Divorced" /> Divorced
                </label>
              </div>
            </div>

            <!-- Education -->
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-1">Education</label>
              <select
                v-model="newMember.Education"
                class="w-full p-3 border border-gray-400 rounded-md"
                :disabled="isLoading"
              >
                <option disabled value="">Select Education</option>
                <!-- Loop through education and display each fill_name -->
                <option
                  v-for="(education, index) in education"
                  :key="index"
                  :value="education.fill_name"
                >
                  {{ education.fill_name }}
                </option>
              </select>
              <div v-if="isLoading" class="text-gray-500 text-sm">Loading...</div>
            </div>

            <!-- Picture -->
            <div class="flex flex-col items-start justify-center w-32 h-36">
              <label class="block text-sm font-bold text-gray-700 mb-1">Picture</label>
              <div
                class="border border-gray-400 bg-white rounded-md flex flex-col items-center justify-center w-full h-full p-2"
              >
                <div v-if="newMember.picture" class="flex flex-col items-center">
                  <img
                    :src="newMember.picture"
                    alt="Preview"
                    class="w-16 h-16 object-cover rounded-full"
                  />
                </div>
                <div v-else class="flex flex-col items-center text-gray-400 text-sm">
                  <svg
                    class="w-8 h-8 mb-1"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M3 5.25C3 4.56 3.56 4 4.25 4h15.5c.69 0 1.25.56 1.25 1.25v13.5c0 .69-.56 1.25-1.25 1.25H4.25A1.25 1.25 0 013 18.75V5.25zM3 15l5-5 4 4 8-8"
                    />
                  </svg>
                  <span>No file chosen</span>
                </div>
                <label
                  class="bg-gray-200 text-gray-700 px-3 py-1 rounded cursor-pointer hover:bg-gray-300 text-xs shadow"
                >
                  Upload File
                  <input
                    type="file"
                    accept="image/*"
                    @change="handlePictureUpload"
                    class="hidden"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- STEP 2 -->
      <div v-if="currentStep === 2" class="w-full max-w-6xl px-6 mx-auto flex flex-wrap gap-6">
        <!-- LEFT COLUMN -->
        <div class="flex-1 space-y-6">
          <!-- Address -->
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-1">Address</label>
            <input
              v-model="newMember.address"
              type="text"
              placeholder="Add Street"
              class="w-full p-3 border border-gray-400 rounded-md"
            />
          </div>

          <!-- Phone Number -->
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-1">Phone Number</label>
            <div class="flex gap-2">
              <span class="flex items-center text-sm font-bold text-gray-700">+62</span>
              <input
                v-model="newMember.phoneNumber"
                type="text"
                placeholder="0000-0000-000"
                class="w-full p-3 border border-gray-400 rounded-md"
              />
            </div>
          </div>
        </div>

        <!-- RIGHT COLUMN -->
        <div class="flex-1 space-y-6">
          <!-- District, City, Province (side by side) -->
          <div class="flex gap-4">
            <div class="w-1/3">
              <label class="block text-sm font-bold text-gray-700 mb-1">District</label>
              <input
                v-model="newMember.district"
                type="text"
                placeholder="Enter District"
                class="w-full p-3 border border-gray-400 rounded-md"
              />
            </div>
            <div class="w-1/3">
              <label class="block text-sm font-bold text-gray-700 mb-1">City</label>
              <input
                v-model="newMember.city"
                type="text"
                placeholder="Enter City"
                class="w-full p-3 border border-gray-400 rounded-md"
              />
            </div>
            <!-- Province -->
            <div class="w-1/3">
              <label class="block text-sm font-bold text-gray-700 mb-1">Province</label>
              <input
                v-model="newMember.province"
                list="provinceList"
                placeholder="Enter Province"
                class="w-full p-3 border border-gray-400 rounded-md"
              />
              <datalist id="provinceList">
                <option v-for="province in provinces" :key="province" :value="province" />
              </datalist>
            </div>
          </div>

          <!-- Email -->
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-1">Email</label>
            <input
              v-model="newMember.email"
              type="email"
              placeholder="Add Email Address"
              class="w-full p-3 border border-gray-400 rounded-md"
            />
          </div>
        </div>
      </div>

      <!-- STEP 3 -->
      <div v-if="currentStep === 3" class="w-full max-w-6xl px-6 mx-auto">
        <div class="grid grid-cols-2 gap-6 items-start">
          <!-- KIRI -->
          <div class="space-y-6">
            <!-- Begin -->
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-1">Begin</label>
              <input
                v-model="newMember.begin"
                type="date"
                class="w-full p-3 border border-gray-400 rounded-md"
              />
            </div>

            <!-- Status (diberi tinggi tetap agar sejajar dengan Term Eff) -->
            <div class="min-h-[72px] flex flex-col justify-between">
              <label class="block text-sm font-bold text-gray-700 mb-1">Status</label>
              <div class="flex gap-6">
                <label class="flex items-center gap-2">
                  <input type="radio" v-model="newMember.status" value="A" />
                  <span>Active</span>
                </label>
                <label class="flex items-center gap-2">
                  <input type="radio" v-model="newMember.status" value="N" />
                  <span>Terminate</span>
                </label>
              </div>
            </div>

            <!-- Group -->
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-1">Group</label>
              <select
                v-model="newMember.Group"
                class="w-full p-3 border border-gray-400 rounded-md"
                :disabled="isLoading"
              >
                <option disabled value="">Select Group</option>
                <!-- Loop through group and display each name -->
                <option v-for="(group, index) in group" :key="index" :value="group.strcode">
                  {{ group.name }}
                </option>
              </select>
              <div v-if="isLoading" class="text-gray-500 text-sm">Loading...</div>
            </div>

            <!-- Department -->
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-1">Department</label>
              <input
                v-model="newMember.department"
                type="text"
                placeholder="Add Department"
                class="w-full p-3 border border-gray-400 rounded-md"
              />
            </div>

            <!-- Note NIP ALB -->
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-1">Note NIP ALB</label>
              <textarea
                v-model="newMember.noteNipAlb"
                rows="3"
                placeholder="Add Notes"
                class="w-full p-3 border border-gray-400 rounded-md resize-none"
              ></textarea>
            </div>
          </div>

          <!-- KANAN -->
          <div class="space-y-6">
            <!-- Last -->
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-1">Last</label>
              <input
                v-model="newMember.last"
                type="date"
                class="w-full p-3 border border-gray-400 rounded-md"
              />
            </div>

            <!-- Term Eff -->
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-1">Term Eff</label>
              <input
                v-model="newMember.termEff"
                type="date"
                class="w-full p-3 border border-gray-400 rounded-md"
              />
            </div>

            <!-- Position -->
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-1">Position</label>
              <input
                v-model="newMember.position"
                type="text"
                placeholder="Add Position"
                class="w-full p-3 border border-gray-400 rounded-md"
              />
            </div>

            <!-- NIPP Number -->
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-1">NIPP Number</label>
              <input
                v-model="newMember.nippNumber"
                type="text"
                placeholder="Add Number"
                class="w-full p-3 border border-gray-400 rounded-md"
              />
            </div>

            <!-- Spacer -->
            <div class="h-[112px]"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
// import { useRouter } from 'vue-router'
import MemberDataService from '@/services/MemberData/MemberDataService.js'

const memberDataService = new MemberDataService()
// const router = useRouter()

const members = ref([])
const searchQuery = ref('')
const isAddFormVisible = ref(false)
const currentStep = ref(1)
// const cities = ref(['Jakarta', 'Medan', 'Bandung', 'Surabaya', 'Yogyakarta'])
const isEditMode = ref(false)
const editedIndex = ref(null)

// Function to calculate age based on birth date
function calculateAge() {
  if (newMember.value.birthDate) {
    const birthDate = new Date(newMember.value.birthDate)
    const today = new Date()

    // Calculate years difference
    let ageYears = today.getFullYear() - birthDate.getFullYear()

    // Calculate month difference
    let ageMonths = today.getMonth() - birthDate.getMonth()

    // If the birthday hasn't occurred yet this year, subtract 1 from ageYears and adjust ageMonths
    if (ageMonths < 0) {
      ageYears--
      ageMonths += 12 // Add 12 months if birthday hasn't occurred yet
    }

    // Set the age in "years, months" format
    newMember.value.age = `${ageYears},${ageMonths}`
  }
}

const newMember = ref({
  company: '',
  fullName: '',
  gender: '',
  religion: '',
  description: '',
  memberId: '',
  birthPlace: '',
  birthDate: '',
  age: '',
  maritalStatus: '',
  education: '',
  picture: '',
  address: '',
  city: '',
  position: '',
  district: '',
  province: '',
  phoneNumber: '',
  email: '',
  begin: '',
  last: '',
  status: '',
  termEff: '',
  group: '',
  departemen: '',
  nippNumber: '',
  noteNipAlb: '',
})

const religions = ref([])
const education = ref([])
const group = ref([])

// onMounted(async () => {
//   try {

//     const religionData = await memberDataService.fetchReligionData();
//     religions.value = religionData.tabledata;
//     console.log('Religion data fetched:', religions.value);
//     const educationData = await memberDataService.fetchEducationData();
//     education.value = educationData.tabledata;
//     const groupData = await memberDataService.fetchGroup();  // Assuming this fetches the group data
//     if (groupData && groupData.tabledata) {
//       group.value = groupData.tabledata;  // Set the group data to the reactive reference
//     }
//   } catch (error) {
//     console.error('Error fetching religion data:', error);
//   }
// });

const provinces = ref([
  'Aceh',
  'Sumatera Utara',
  'Sumatera Barat',
  'Riau',
  'Kepulauan Riau',
  'Jambi',
  'Sumatera Selatan',
  'Bangka Belitung',
  'Bengkulu',
  'Lampung',
  'DKI Jakarta',
  'Jawa Barat',
  'Banten',
  'Jawa Tengah',
  'DI Yogyakarta',
  'Jawa Timur',
  'Bali',
  'Nusa Tenggara Barat',
  'Nusa Tenggara Timur',
  'Kalimantan Barat',
  'Kalimantan Tengah',
  'Kalimantan Selatan',
  'Kalimantan Timur',
  'Kalimantan Utara',
  'Sulawesi Utara',
  'Gorontalo',
  'Sulawesi Tengah',
  'Sulawesi Barat',
  'Sulawesi Selatan',
  'Sulawesi Tenggara',
  'Maluku',
  'Maluku Utara',
  'Papua',
  'Papua Barat',
  'Papua Tengah',
  'Papua Pegunungan',
  'Papua Selatan',
  'Papua Barat Daya',
])

const filteredMembers = computed(() =>
  members.value.filter((m) =>
    [m.fullName, m.id].some((field) =>
      field?.toLowerCase().includes(searchQuery.value.toLowerCase()),
    ),
  ),
)

function openAddMemberForm() {
  resetForm()
  isAddFormVisible.value = true
  currentStep.value = 1
}

function cancelAddForm() {
  isAddFormVisible.value = false
  resetForm()
  isEditMode.value = false
  editedIndex.value = null
}

function nextStep() {
  if (currentStep.value < 3) currentStep.value++
}

// function previousStep() {
//   if (currentStep.value > 1) {
//     currentStep.value--
//   }
// }

function handleBack() {
  if (currentStep.value > 1) {
    currentStep.value--
  } else {
    isAddFormVisible.value = false
    resetForm()
    isEditMode.value = false
    editedIndex.value = null
  }
}

async function saveMember() {
  const payload = {
    data: {
      company: '1000',
      mbrid: newMember.value.memberId,
      name: newMember.value.fullName,
      company_begin: newMember.value.begin,
      company_last: newMember.value.last,
      mbrgroup: newMember.value.group || '', // Memastikan tidak kosong
      religion: newMember.value.religion,
      education: newMember.value.education || '', // Memastikan tidak kosong
      birth_Place: newMember.value.birthPlace,
      birth_Date: newMember.value.birthDate,
      address: newMember.value.address,
      phone: newMember.value.phoneNumber,
      email: newMember.value.email,
      maritalStatus: newMember.value.maritalStatus,
      photo_file: newMember.value.picture,
      gender: newMember.value.gender, // Pastikan ini hanya nilai string seperti "Male" atau "Female"
      termination: newMember.value.status,
      termeff: newMember.value.termEff,
      termtype: null,
      termreason: null,
      description: newMember.value.description,
      createdinfo: JSON.stringify({
        user: 'null',
        datetime: 'null',
      }),
      modifiedinfo: JSON.stringify({
        user: 'null',
        datetime: 'null',
      }),
      mbr_position: newMember.value.position,
      mbr_unit: newMember.value.departemen,
      mbr_empno: '',
      mbr_empno2: '',
    },
  }

  console.log('Saving member data:', newMember.value)
  // if (isEditMode.value && editedIndex.value !== null) {
  //   members.value[editedIndex.value] = { ...newMember.value }
  // } else {
  //   members.value.push({ id: (members.value.length + 10001).toString(), ...newMember.value })
  // }

  // Call the POST method to send data to the server
  try {
    const response = await memberDataService.postMemberData(payload)
    console.log('Member data saved successfully:', response)
    // You can add a success message or handle response if necessary.3e4y
  } catch (error) {
    console.error('Error saving member data:', error)
    // You can add an error message or handle the error if necessary.
  }

  cancelAddForm()
}

// function deleteMember(member) {
//   if (confirm(`Are you sure you want to delete ${member.fullName}?`)) {
//     members.value = members.value.filter((m) => m !== member)
//   }
// }

async function removeMember(member) {
  try {
    if (confirm(`Are you sure you want to delete ${member.fullName}?`)) {
      const response = await memberDataService.removeMember(member.id)
      console.log('Member deleted successfully:', response)
      members.value = members.value.filter((m) => m !== member)
    }
  } catch (error) {
    console.error('Error deleting member:', error)
  }
}

function editMember(member) {
  const index = members.value.findIndex((m) => m === member)
  if (index !== -1) {
    isEditMode.value = true
    editedIndex.value = index
    newMember.value = { ...member }
    currentStep.value = 1
    isAddFormVisible.value = true
  }
}

function resetForm() {
  Object.keys(newMember.value).forEach((key) => (newMember.value[key] = ''))
}

function handlePictureUpload(event) {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = () => {
      newMember.value.picture = reader.result
    }
    reader.readAsDataURL(file)
  }
}

// function goBack() {
//   window.history.back()
// }

onMounted(async () => {
  try {
    const response = await memberDataService.getMemberData()
    console.log('Member data fetched:', response)

    if (Array.isArray(response)) {
      members.value = response.map((item) => ({
        id: item.mbrid || '',
        fullName: item.name || '',
        picture: item.picture || '',
      }))
    } else {
      members.value = []
    }

    const payload = {
      data: {
        company: '1000',
        mbrid: '10025',
        fullname: 'Cicilia',
        begin: '01-01-2020',
        last: '01-01-2025',
        group: 'REG',
        religion: 'Islam',
        education: 'S1',
        birthPlace: 'Bandung',
        birthDate: '23-01-1990',
        age: '33',
        maritalStatus: 'M',
        city: 'Bandung',
        province: 'Jawa Barat',
        position: 'manager',
        district: 'Bandung',
        address: 'Jl. Sukabumi No. 1',
        phoneNumber: '081234567890',
        email: 'agus@example.com',
        picture: 'null',
        gender: 'M',
        status: 'Aktif',
        termeff: null,
        departemen: 'HRD',
        nippNumber: '1234567890',
        noteNipAlb: 'Karyawan tetap',
        description: 'Karyawan tetap',
      },
    }

    console.log(JSON.stringify(payload))
    console.log(encodeURIComponent(JSON.stringify(payload)))

    const religionData = await memberDataService.fetchReligionData()
    religions.value = religionData.tabledata
    console.log('Religion data fetched:', religions.value)
    const educationData = await memberDataService.fetchEducationData()
    education.value = educationData.tabledata
    const groupData = await memberDataService.fetchGroup() // Assuming this fetches the group data
    if (groupData && groupData.tabledata) {
      group.value = groupData.tabledata // Set the group data to the reactive reference
    }
  } catch (error) {
    console.error('Error fetching member data:', error)
  }
})
</script>

<style scoped>
.material-icons {
  font-size: 16px;
  vertical-align: middle;
}
</style>
