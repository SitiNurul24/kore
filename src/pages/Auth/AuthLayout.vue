<script setup>
import { RouterView } from 'vue-router'
</script>
<template>
  <div class="min-h-screen grid grid-cols-1 lg:grid-cols-2">
    <!-- Left Side (Form Slot) -->
    <div class="flex items-start justify-center px-6 lg:px-20">
      <div class="w-full max-w-md">
        <RouterView />
      </div>
    </div>

    <!-- Right Side  -->
    <div
      class="hidden lg:flex items-center justify-center bg-gradient-to-br from-primary to-secondary text-white px-10"
    >
      <div class="max-w-md">
        <div class="flex items-center gap-3 mb-4">
          <svg
            class="h-6 w-6 text-yellow-300"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span class="text-sm uppercase font-bold tracking-wide text-yellow-300"
            >GCG Akor ERP</span
          >
        </div>

        <h2 class="text-4xl font-extrabold leading-snug mb-6 drop-shadow-md">
          Tingkatkan Kinerja Koperasi<br />
          dengan <span class="text-yellow-300">ERP GCG Akor</span>
        </h2>

        <blockquote class="text-white/80 italic border-l-4 border-yellow-300 pl-4 mt-6">
          “Aplikasi Koperasi <span class="font-bold text-yellow-300">Cloud ERP</span> yang
          <span class="font-bold text-yellow-300">inovatif</span>,
          <span class="font-bold text-yellow-300">fleksibel</span>, dan
          <span class="font-bold text-yellow-300">terintegrasi</span> — dirancang untuk
          <u>mendukung transformasi digital koperasi</u> di seluruh Indonesia.”
        </blockquote>

        <div class="mt-8 space-y-3 text-white/90 text-sm">
          <p class="flex items-center gap-2">
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16 12H8m0 0v8m0-8V4m0 0l-4 4m4-4l4 4"
              />
            </svg>
            <span>sales@gcgakor.id</span>
          </p>
          <p class="flex items-center gap-2">
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 3v1m0 16v1m8.66-9H21M3 12h1m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707"
              />
            </svg>
            <a href="https://www.gcgakor.id" class="text-blue-500 hover:underline"
              >www.gcgakor.id</a
            >
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
