<template>
  <div class="flex flex-col h-screen overflow-hidden">
    <!-- Header hanya tampil jika bukan di halaman login -->
    <Header v-if="$route.path !== '/login'" />

    <div class="flex flex-1 overflow-hidden">
      <!-- Mobile Sidebar Overlay -->
      <div
        v-if="$route.path !== '/login' && isMobileSidebarOpen && isMobile"
        class="fixed inset-0 bg-black bg-opacity-50 z-40"
        @click="closeMobileSidebar"
      ></div>

      <!-- Sidebar Container -->
      <div
        v-if="$route.path !== '/login'"
        :class="[
          'bg-white shadow-xl border-r border-gray-200 flex flex-col h-full',
          // Desktop: Static positioning, always visible
          {
            'relative w-64 xl:w-72 flex-shrink-0': !isMobile,
            'fixed w-80 z-50 transition-transform duration-300': isMobile,
            'translate-x-0': !isMobile || isMobileSidebarOpen,
            '-translate-x-full': isMobile && !isMobileSidebarOpen,
          },
        ]"
      >
        <!-- Header Section -->
        <div class="flex-shrink-0 p-4 lg:p-6 border-b border-gray-100">
          <!-- Close button (mobile only) -->
          <button
            v-if="isMobile"
            @click="closeMobileSidebar"
            class="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <span class="material-icons text-gray-500">close</span>
          </button>

          <!-- Logo -->
          <div class="flex justify-center items-center">
            <img
              src="@/assets/images/logo_gcg.png"
              alt="Logo"
              class="w-24 h-24 lg:w-32 lg:h-32 object-contain"
            />
          </div>
        </div>

        <!-- Navigation Menu -->
        <nav class="flex-1 overflow-y-auto py-4 px-3 lg:px-4">
          <ul class="space-y-2">
            <!-- Dashboard -->
            <li>
              <router-link
                to="/"
                class="flex items-center px-3 py-2.5 rounded-lg transition-all duration-200 group"
                :class="
                  isActiveRoute('/')
                    ? 'bg-[#02A2DC] text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-[#02A2DC]'
                "
                @click="closeSidebarOnMobile"
              >
                <span
                  class="material-icons mr-3 text-xl transition-colors"
                  :class="
                    isActiveRoute('/') ? 'text-white' : 'text-gray-400 group-hover:text-[#02A2DC]'
                  "
                >
                  dashboard
                </span>
                <span class="font-medium text-sm lg:text-base">Dashboard</span>
              </router-link>
            </li>

            <!-- Accounting -->
            <!-- <li>
              <router-link
                to="/accounting"
                class="flex items-center px-3 py-2.5 rounded-lg transition-all duration-200 group"
                :class="
                  isActiveRoute('/accounting')
                    ? 'bg-[#02A2DC] text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-[#02A2DC]'
                "
                @click="closeSidebarOnMobile"
              >
                <span
                  class="material-icons mr-3 text-xl transition-colors"
                  :class="
                    isActiveRoute('/accounting')
                      ? 'text-white'
                      : 'text-gray-400 group-hover:text-[#02A2DC]'
                  "
                >
                  account_balance
                </span>
                <span class="font-medium text-sm lg:text-base">Accounting</span>
              </router-link>
            </li> -->
            <!-- Accounting with Submenu -->
            <li>
              <div>
                <!-- Main Menu Button -->
                <button
                  @click="toggleAccounting"
                  class="w-full flex items-center px-3 py-2.5 rounded-lg transition-all duration-200 group"
                  :class="
                    isActiveRoute('/accounting')
                      ? 'bg-[#02A2DC] text-white shadow-md'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-[#02A2DC]'
                  "
                >
                  <span
                    class="material-icons mr-3 text-xl transition-colors"
                    :class="
                      isActiveRoute('/accounting')
                        ? 'text-white'
                        : 'text-gray-400 group-hover:text-[#02A2DC]'
                    "
                  >
                    account_balance
                  </span>
                  <span class="font-medium text-sm lg:text-base flex-1 text-left">Accounting</span>
                  <span
                    class="material-icons text-lg transition-transform duration-200"
                    :class="[
                      isAccountingOpen ? 'rotate-180' : 'rotate-0',
                      isActiveRoute('/accounting')
                        ? 'text-white'
                        : 'text-gray-400 group-hover:text-[#02A2DC]',
                    ]"
                  >
                    expand_more
                  </span>
                </button>

                <!-- Submenu -->
                <div
                  class="overflow-hidden transition-all duration-300 ease-in-out"
                  :class="isAccountingOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'"
                >
                  <ul class="mt-2 ml-4 space-y-1 border-l-2 border-gray-100 pl-4">
                    <li v-for="item in accountingItems" :key="item.path">
                      <router-link
                        :to="item.path"
                        class="flex items-center px-3 py-2 rounded-lg text-sm transition-all duration-200 group"
                        :class="
                          $route.path === item.path
                            ? 'text-[#02A2DC] font-semibold bg-blue-50'
                            : 'text-gray-600 hover:text-[#02A2DC] hover:bg-gray-50'
                        "
                        @click="closeSidebarOnMobile"
                      >
                        <span
                          class="w-2 h-2 rounded-full mr-3 transition-colors flex-shrink-0"
                          :class="
                            $route.path === item.path
                              ? 'bg-[#02A2DC]'
                              : 'bg-gray-300 group-hover:bg-[#02A2DC]'
                          "
                        ></span>
                        <span class="truncate">{{ item.name }}</span>
                      </router-link>
                    </li>
                  </ul>
                </div>
              </div>
            </li>

 <!-- Settings with Submenu -->
            <li>
              <div>
                <!-- Main Menu Button -->
                <button
                  @click="toggleSettings"
                  class="w-full flex items-center px-3 py-2.5 rounded-lg transition-all duration-200 group"
                  :class="
                    isActiveRoute('/settings')
                      ? 'bg-[#02A2DC] text-white shadow-md'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-[#02A2DC]'
                  "
                >
                  <span
                    class="material-icons mr-3 text-xl transition-colors"
                    :class="
                      isActiveRoute('/settings')
                        ? 'text-white'
                        : 'text-gray-400 group-hover:text-[#02A2DC]'
                    "
                  >
                    settings
                  </span>
                  <span class="font-medium text-sm lg:text-base flex-1 text-left">Settings</span>
                  <span
                    class="material-icons text-lg transition-transform duration-200"
                    :class="[
                      isSettingsOpen ? 'rotate-180' : 'rotate-0',
                      isActiveRoute('/settings')
                        ? 'text-white'
                        : 'text-gray-400 group-hover:text-[#02A2DC]',
                    ]"
                  >
                    expand_more
                  </span>
                </button>

                <!-- Submenu -->
                <div
                  class="overflow-hidden transition-all duration-300 ease-in-out"
                  :class="isSettingsOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'"
                >
                  <ul class="mt-2 ml-4 space-y-1 border-l-2 border-gray-100 pl-4">
                    <li v-for="item in settingsItems" :key="item.path">
                      <router-link
                        :to="item.path"
                        class="flex items-center px-3 py-2 rounded-lg text-sm transition-all duration-200 group"
                        :class="
                          $route.path === item.path
                            ? 'text-[#02A2DC] font-semibold bg-blue-50'
                            : 'text-gray-600 hover:text-[#02A2DC] hover:bg-gray-50'
                        "
                        @click="closeSidebarOnMobile"
                      >
                        <span
                          class="w-2 h-2 rounded-full mr-3 transition-colors flex-shrink-0"
                          :class="
                            $route.path === item.path
                              ? 'bg-[#02A2DC]'
                              : 'bg-gray-300 group-hover:bg-[#02A2DC]'
                          "
                        ></span>
                        <span class="truncate">{{ item.name }}</span>
                      </router-link>
                    </li>
                  </ul>
                </div>
              </div>
            </li>


            <!-- Membership with Submenu -->
            <li>
              <div>
                <!-- Main Menu Button -->
                <button
                  @click="toggleMembership"
                  class="w-full flex items-center px-3 py-2.5 rounded-lg transition-all duration-200 group"
                  :class="
                    isActiveRoute('/membership')
                      ? 'bg-[#02A2DC] text-white shadow-md'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-[#02A2DC]'
                  "
                >
                  <span
                    class="material-icons mr-3 text-xl transition-colors"
                    :class="
                      isActiveRoute('/membership')
                        ? 'text-white'
                        : 'text-gray-400 group-hover:text-[#02A2DC]'
                    "
                  >
                    group
                  </span>
                  <span class="font-medium text-sm lg:text-base flex-1 text-left">Membership</span>
                  <span
                    class="material-icons text-lg transition-transform duration-200"
                    :class="[
                      isMembershipOpen ? 'rotate-180' : 'rotate-0',
                      isActiveRoute('/membership')
                        ? 'text-white'
                        : 'text-gray-400 group-hover:text-[#02A2DC]',
                    ]"
                  >
                    expand_more
                  </span>
                </button>

                <!-- Submenu -->
                <div
                  class="overflow-hidden transition-all duration-300 ease-in-out"
                  :class="isMembershipOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'"
                >
                  <ul class="mt-2 ml-4 space-y-1 border-l-2 border-gray-100 pl-4">
                    <li v-for="item in membershipItems" :key="item.path">
                      <router-link
                        :to="item.path"
                        class="flex items-center px-3 py-2 rounded-lg text-sm transition-all duration-200 group"
                        :class="
                          $route.path === item.path
                            ? 'text-[#02A2DC] font-semibold bg-blue-50'
                            : 'text-gray-600 hover:text-[#02A2DC] hover:bg-gray-50'
                        "
                        @click="closeSidebarOnMobile"
                      >
                        <span
                          class="w-2 h-2 rounded-full mr-3 transition-colors flex-shrink-0"
                          :class="
                            $route.path === item.path
                              ? 'bg-[#02A2DC]'
                              : 'bg-gray-300 group-hover:bg-[#02A2DC]'
                          "
                        ></span>
                        <span class="truncate">{{ item.name }}</span>
                      </router-link>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
          </ul>
        </nav>
      </div>

      <!-- Konten utama -->
      <div class="flex-1 flex flex-col min-w-0 overflow-hidden">
        <!-- Search bar & profil pengguna hanya tampil jika bukan di halaman login -->
        <div
          v-if="$route.path !== '/login'"
          class="bg-white shadow-md border-b border-gray-200 sticky top-0 z-30"
        >
          <!-- Mobile Header -->
          <div class="flex lg:hidden items-center justify-between p-3">
            <!-- Mobile Menu Button -->
            <button
              v-if="isMobile"
              @click="toggleMobileSidebar"
              class="p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 lg:hidden"
              aria-label="Toggle mobile menu"
            >
              <span class="material-icons">
                {{ isMobileSidebarOpen ? 'close' : 'menu' }}
              </span>
            </button>

            <!-- Mobile Search (Collapsed) -->
            <div class="flex-1 mx-3">
              <button
                @click="isMobileSearchOpen = !isMobileSearchOpen"
                class="w-full flex items-center justify-between bg-gray-100 border border-gray-300 rounded-md px-3 py-2 text-gray-500 hover:bg-gray-200 transition-colors"
                aria-label="Toggle search"
              >
                <span class="text-sm">Search here...</span>
                <span class="material-icons">search</span>
              </button>
            </div>

            <!-- Mobile Profile Actions -->
            <div class="flex items-center space-x-2">
              <!-- Mobile Notifications -->
              <button
                @click="showNotifications"
                class="p-2 rounded-full text-gray-600 hover:bg-gray-100 relative transition-colors"
                style="background-color: #f3f3f3"
                aria-label="Notifications"
              >
                <span class="material-icons text-lg">notifications</span>
                <!-- Notification Badge -->
                <span class="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>

              <!-- Mobile Profile -->
              <div class="relative">
                <button
                  @click="toggleDropdown"
                  class="flex items-center space-x-1 p-1 rounded-md hover:bg-gray-100 transition-colors"
                  style="background-color: #f3f3f3"
                  aria-label="Profile menu"
                >
                  <img
                    src="https://randomuser.me/api/portraits/men/1.jpg"
                    alt="Profile"
                    class="w-8 h-8 rounded-full border-2 border-gray-300"
                  />
                  <span class="material-icons text-gray-600 text-lg">
                    {{ dropdownVisible ? 'arrow_drop_up' : 'arrow_drop_down' }}
                  </span>
                </button>
              </div>
            </div>
          </div>

          <!-- Mobile Search Expanded -->
          <div v-if="isMobileSearchOpen" class="lg:hidden px-3 pb-3">
            <div class="relative">
              <div
                class="flex items-center w-full border border-gray-300 rounded-md p-1/2 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500"
                style="background-color: #f3f3f3"
              >
                <input
                  type="text"
                  placeholder="search here..."
                  class="w-full p-2.5 focus:outline-none rounded-md bg-transparent"
                  @blur="handleMobileSearchBlur"
                  ref="mobileSearchInput"
                />
                <button class="ml-2 p-1 hover:bg-gray-200 rounded" @click="performSearch">
                  <span class="material-icons text-gray-600">search</span>
                </button>
              </div>
              <!-- Close search button -->
              <button
                @click="isMobileSearchOpen = false"
                class="absolute -top-1 -right-1 p-1 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
                aria-label="Close search"
              >
                <span class="material-icons text-sm">close</span>
              </button>
            </div>
          </div>

          <!-- Desktop Header -->
          <div class="hidden lg:flex items-center justify-between p-4">
            <!-- Search Bar di kiri (Desktop) -->
            <div
              class="flex items-center w-full max-w-xl border border-gray-300 rounded-md p-1/2 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500"
              style="background-color: #f3f3f3"
            >
              <input
                type="text"
                placeholder="search here..."
                class="w-full p-2.5 focus:outline-none rounded-md bg-transparent"
                @keyup.enter="performSearch"
              />
              <!-- Ikon Search di kanan -->
              <button class="ml-2 p-1 hover:bg-gray-200 rounded" @click="performSearch">
                <span class="material-icons text-gray-600">search</span>
              </button>
            </div>

            <!-- Profil Pengguna di kanan (Desktop) -->
            <div class="flex items-center space-x-4 ml-4">
              <button
                @click="showNotifications"
                class="rounded-full p-2 text-gray-600 flex items-center justify-center hover:bg-gray-200 transition-colors relative"
                style="background-color: #f3f3f3"
                aria-label="Notifications"
              >
                <span class="material-icons">notifications</span>
                <!-- Notification Badge -->
                <span class="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>

              <button
                @click="showSettings"
                class="rounded-full p-2 text-gray-600 flex items-center justify-center hover:bg-gray-200 transition-colors"
                style="background-color: #f3f3f3"
                aria-label="Settings"
              >
                <span class="material-icons">settings</span>
              </button>

              <!-- Profil dengan background menyatu -->
              <div
                class="relative flex items-center py-1 px-2 rounded-md hover:bg-gray-200 transition-colors cursor-pointer"
                style="background-color: #f3f3f3"
              >
                <img
                  src="https://randomuser.me/api/portraits/men/1.jpg"
                  alt="Profile"
                  class="w-10 h-10 rounded-full border-2 border-gray-300 cursor-pointer"
                  @click="toggleDropdown"
                />
                <span class="ml-2 text-sm font-medium text-gray-700 hidden xl:block">Admin</span>
                <button
                  class="ml-1 flex items-center justify-center p-1 rounded hover:bg-gray-300 transition-colors"
                  @click="toggleDropdown"
                  aria-label="Profile dropdown"
                >
                  <span class="material-icons text-gray-600 text-base">
                    {{ dropdownVisible ? 'arrow_drop_up' : 'arrow_drop_down' }}
                  </span>
                </button>
              </div>
            </div>
          </div>

          <!-- Dropdown Menu (Shared for Mobile & Desktop) -->
          <div
            v-if="dropdownVisible"
            :class="[
              'absolute right-3 lg:right-4 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50',
              'transform transition-all duration-200 ease-out',
              dropdownVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95',
            ]"
            @click.stop
          >
            <ul class="py-1">
              <!-- Mobile Only: Settings -->
              <li class="lg:hidden">
                <button
                  @click="handleSettingsClick"
                  class="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center transition-colors"
                >
                  <span class="material-icons mr-2 text-lg">settings</span>
                  Settings
                </button>
              </li>
              <li class="lg:hidden border-t border-gray-100"></li>

              <!-- Shared Options -->
              <li>
                <button
                  @click="handleProfileClick"
                  class="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center transition-colors"
                >
                  <span class="material-icons mr-2 text-lg">person</span>
                  Profile
                </button>
              </li>
              <li>
                <button
                  @click="handleHelpClick"
                  class="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center transition-colors"
                >
                  <span class="material-icons mr-2 text-lg">help</span>
                  Help
                </button>
              </li>
              <li class="border-t border-gray-100"></li>
              <li>
                <button
                  @click="handleLogoutClick"
                  class="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 flex items-center transition-colors"
                >
                  <span class="material-icons mr-2 text-lg">logout</span>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>

        <!-- Komponen halaman yang sedang aktif -->
        <div class="flex-1 overflow-auto bg-gray-50">
          <div class="p-3 lg:p-6">
            <router-view />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Impor komponen Header saja, sidebar sudah built-in
import Header from './components/Header.vue'
import { useRouter, useRoute } from 'vue-router'
import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue'

const router = useRouter()
const route = useRoute()

// State management
const dropdownVisible = ref(false)
const isMobileSidebarOpen = ref(false)
const isMobileSearchOpen = ref(false)
const mobileSearchInput = ref(null)
const isMembershipOpen = ref(false)
const isAccountingOpen = ref(false)
const isSettingsOpen = ref(false)

const toggleAccounting = () => {
  isAccountingOpen.value = !isAccountingOpen.value
}


const toggleSettings = () => {
  isSettingsOpen.value = !isSettingsOpen.value
}


// Mobile detection
const isMobile = ref(false)
const MOBILE_BREAKPOINT = 1024

// Accounting submenu items
const accountingItems = [
  { path: '/accounting/journal-entry', name: 'Journal Entry' },
   { path: '/accounting/book-model', name: 'Book Model' },
  { path: '/accounting/fixed-asset', name: 'Fixed Asset' },
  { path: '/accounting/payable', name: 'Payable' },
  { path: '/accounting/receivable', name: 'Receivable' },
]

// Membership submenu items
const membershipItems = [
  { path: '/membership/member-master-data', name: 'Member Master Data' },
  { path: '/membership/pinjaman', name: 'Pinjaman' },
  { path: '/membership/simpanan', name: 'Simpanan' },
  { path: '/membership/member-self-service', name: 'Member Self Service' },
  { path: '/membership/proses-shu', name: 'Proses SHU' },
  { path: '/membership/membership-setting', name: 'Membership Setting' },
  { path: '/membership/reporting', name: 'Reporting' },
]
// Settings submenu items
const settingsItems = [
  { path: '/settings/currency', name: 'Currency' },
  { path: '/settings/company', name: 'Company' },
  { path: '/settings/document', name: 'Document' },
  { path: '/settings/notification', name: 'Notification' },
  { path: '/settings/language', name: 'Language' },
  { path: '/settings/reference', name: 'Reference' },
  { path: '/settings/currency-rate', name: 'Currency Rate' },
]

// Computed
const isActiveRoute = (path) => {
  if (path === '/') {
    return route.path === '/'
  }
  return route.path.startsWith(path)
}

// Sidebar methods
const toggleMobileSidebar = () => {
  isMobileSidebarOpen.value = !isMobileSidebarOpen.value
}

const closeMobileSidebar = () => {
  isMobileSidebarOpen.value = false
}

const closeSidebarOnMobile = () => {
  if (isMobile.value) {
    closeMobileSidebar()
  }
}

const toggleMembership = () => {
  isMembershipOpen.value = !isMembershipOpen.value
}

// Other methods
const toggleDropdown = () => {
  dropdownVisible.value = !dropdownVisible.value
}

const performSearch = () => {
  console.log('Performing search...')
}

const showNotifications = () => {
  console.log('Notifications clicked!')
}

const showSettings = () => {
    router.push('/settings/currency')
}

const logout = () => {
  if (confirm('Are you sure you want to logout?')) {
    localStorage.clear()
    sessionStorage.clear()
    router.push('/login')
  }
}

// Dropdown menu handlers
const handleSettingsClick = () => {
  showSettings()
  dropdownVisible.value = false
}

const handleProfileClick = () => {
  console.log('Profile clicked!')
  dropdownVisible.value = false
}

const handleHelpClick = () => {
  console.log('Help clicked!')
  dropdownVisible.value = false
}

const handleLogoutClick = () => {
  dropdownVisible.value = false
  logout()
}

const handleMobileSearchBlur = () => {
  setTimeout(() => {
    isMobileSearchOpen.value = false
  }, 200)
}

// Event handlers
const handleClickOutside = (event) => {
  const dropdown = event.target.closest('[data-dropdown]')
  const dropdownTrigger =
    event.target.closest('[aria-label="Profile menu"]') ||
    event.target.closest('[aria-label="Profile dropdown"]')

  if (!dropdown && !dropdownTrigger) {
    dropdownVisible.value = false
  }
}

const handleEscapeKey = (event) => {
  if (event.key === 'Escape') {
    dropdownVisible.value = false
    isMobileSidebarOpen.value = false
    isMobileSearchOpen.value = false
  }
}

const handleResize = () => {
  const wasMobile = isMobile.value
  isMobile.value = window.innerWidth < MOBILE_BREAKPOINT

  if (wasMobile && !isMobile.value) {
    isMobileSidebarOpen.value = false
    isMobileSearchOpen.value = false
  }
}

const focusMobileSearch = () => {
  if (isMobileSearchOpen.value) {
    nextTick(() => {
      if (mobileSearchInput.value) {
        mobileSearchInput.value.focus()
      }
    })
  }
}

// Watchers
watch(isMobileSearchOpen, focusMobileSearch)

// Auto-open membership submenu if on membership route
watch(
  () => route.path,
  (newPath) => {
    if (newPath.startsWith('/membership')) {
      isMembershipOpen.value = true
    }
       if (newPath.startsWith('/accounting')) {
      isAccountingOpen.value = true
    }
    if (newPath.startsWith('/settings')) {
      isSettingsOpen.value = true
    }
  },
  { immediate: true },
)

onMounted(() => {
  handleResize()
  document.addEventListener('click', handleClickOutside)
  document.addEventListener('keydown', handleEscapeKey)
  window.addEventListener('resize', handleResize)

  // Auto-open membership submenu if on membership route
  if (route.path.startsWith('/membership')) {
    isMembershipOpen.value = true
  }
   if (route.path.startsWith('/accounting')) {
    isAccountingOpen.value = true
  }
  if (route.path.startsWith('/settings')) {
    isSettingsOpen.value = true
  }
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('keydown', handleEscapeKey)
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
/* Custom scrollbar */
nav::-webkit-scrollbar {
  width: 4px;
}

nav::-webkit-scrollbar-track {
  background: transparent;
}

nav::-webkit-scrollbar-thumb {
  background: #e5e7eb;
  border-radius: 2px;
}

nav::-webkit-scrollbar-thumb:hover {
  background: #d1d5db;
}

/* Ensure proper text truncation */
.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Mobile touch optimization */
@media (max-width: 1024px) {
  .overflow-auto {
    -webkit-overflow-scrolling: touch;
  }
}

/* Focus styles for accessibility */
button:focus {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}
</style>
