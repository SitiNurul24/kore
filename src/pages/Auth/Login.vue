<template>
  <div
    class="relative min-h-screen w-full bg-cover bg-center"
    style="background-image: url('https://student-activity.binus.ac.id/bic/wp-content/uploads/sites/74/2021/12/Hapag-Lloyd-.png');"
  >
    <!-- Overlay -->
    <div class="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

    <!-- Main Content -->
    <div class="relative z-10 flex justify-between items-center min-h-screen w-full px-6 lg:px-20 gap-8">
      <!-- Login Form - Shifted to the left -->
      <div class="flex flex-col w-full max-w-md mr-auto">
        <div class="flex items-center gap-4 mb-10 mt-20 pl-10">
          <img src="@/assets/images/logo_gcg.png" alt="Logo GCG" class="h-14 w-auto" />
          <h1 class="text-white text-4xl font-medium tracking-wide">KOPERASI</h1>
        </div>

        <div class="glass-card w-full p-10 space-y-10">
          <form @submit.prevent="handleLogin" class="flex flex-col gap-y-8">
            <!-- Username -->
            <div class="flex flex-col gap-y-3">
              <label class="text-white text-2xl font-medium">Nama Pengguna</label>
              <input
                v-model="usn"
                type="text"
                placeholder="Masukkan nama pengguna"
                class="w-full px-5 py-3.5 rounded-lg bg-white/20 text-white placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-[#0158F8]"
              />
            </div>

            <!-- Password -->
            <div class="flex flex-col gap-y-3">
              <label class="text-white text-2xl font-medium">Kata Sandi</label>
              <div class="relative">
                <input
                  v-model="pwd"
                  :type="showPwd ? 'text' : 'password'"
                  placeholder="Masukkan kata sandi"
                  class="w-full px-5 py-3.5 rounded-lg bg-white/20 text-white placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-[#0158F8]"
                />
                <button
                  type="button"
                  class="absolute right-4 top-1/2 -translate-y-1/2 text-white/80"
                  @click="showPwd = !showPwd"
                >
                  <svg v-if="showPwd" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M13.875 18.825a10.05 10.05 0 01-1.875.175C7.373 19 3 14.627 3 12c0-.784.149-1.532.425-2.225M4.5 4.5l15 15" />
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-.698 2.112-2.182 3.905-4.158 5.007" />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Remember -->
            <div class="flex items-center justify-between text-sm text-white mt-1">
              <label class="flex items-center gap-2">
                <input type="checkbox" class="accent-[#0158F8] scale-110" />
                <span>Ingat saya</span>
              </label>
              <a href="#" class="hover:underline">Lupa password?</a>
            </div>

            <!-- Login Button -->
            <button
              type="submit"
              class="w-full py-3 rounded-lg bg-white text-[#0158F8] hover:bg-[#d5d5d5] font-bold text-lg transition transform hover:scale-[1.02]"
              :disabled="loading"
            >
              {{ loading ? 'Memproses...' : 'Masuk' }}
            </button>

            <!-- Error -->
            <p v-if="error" class="text-sm text-[#CB0303] text-center">{{ error }}</p>
          </form>
        </div>
      </div>

      <!-- ✨ Deskripsi Panel Baru - Positioned at the Center (Right Side) and Enlarged -->
      <div
        class="glass-card w-full lg:max-w-2xl p-12 text-white rounded-2xl shadow-xl bg-gradient-to-br from-blue-900 via-blue-700 to-indigo-700 backdrop-blur-lg transition-all duration-500 animate-fade-in"
        style="position: absolute; top: 50%; right: 10%; transform: translateY(-50%);"
      >
        <div class="flex items-center gap-3 mb-4">
          <svg class="h-6 w-6 text-yellow-300" fill="none" stroke="currentColor" stroke-width="2"
            viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span class="text-sm uppercase font-bold tracking-wide text-yellow-300">GCG Akor ERP</span>
        </div>

        <h2 class="text-4xl font-extrabold leading-snug mb-6 drop-shadow-md">
          Tingkatkan Kinerja Koperasi<br />
          dengan <span class="text-yellow-300">ERP GCG Akor</span>
        </h2>

        <blockquote class="text-white/80 italic border-l-4 border-yellow-300 pl-4 mt-6">
          “Aplikasi Koperasi <span class="font-bold text-yellow-300">Cloud ERP</span> yang
          <span class="font-bold text-yellow-300">inovatif</span>,
          <span class="font-bold text-yellow-300">fleksibel</span>,
          dan <span class="font-bold text-yellow-300">terintegrasi</span> — dirancang untuk <u>mendukung transformasi digital koperasi</u> di seluruh Indonesia.”
        </blockquote>

        <div class="mt-8 space-y-3 text-white/90 text-sm">
          <p class="flex items-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M16 12H8m0 0v8m0-8V4m0 0l-4 4m4-4l4 4" />
            </svg>
            <span>sales@gcgakor.id</span>
          </p>
          <p class="flex items-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M12 3v1m0 16v1m8.66-9H21M3 12h1m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />
            </svg>
            <a href="https://www.gcgakor.id" class="text-blue-500 hover:underline">www.gcgakor.id</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import con from '@/constants'
import { ref } from 'vue'
import { loginToGCG, fetchUserInfo } from '@/services/modules/auth'
import { useRouter } from 'vue-router'

const router = useRouter()
const csn = ref('demoakr')
const usn = ref('')
const pwd = ref('')
const loading = ref(false)
const error = ref(null)

async function handleLogin() {
  loading.value = true
  error.value = null
  try {
    if (!usn.value || !pwd.value) {
      error.value = 'Email dan password wajib diisi.'
      loading.value = false
      return
    }
    const { srt, pid } = await loginToGCG({ csn: csn.value, usn: usn.value, pwd: pwd.value })
    const userInfo = await fetchUserInfo(srt)
    localStorage.setItem('user', JSON.stringify(userInfo))
    localStorage.setItem('srt', srt)
    localStorage.setItem('pid', pid)
    router.push('/dashboard')
  } catch (err) {
    error.value = err?.message || 'Login gagal. Cek ulang kredensial kamu.'
  } finally {
    loading.value = false
  }
}
</script>