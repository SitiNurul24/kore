<template>
    <div
      class="flex items-center justify-center h-screen bg-gradient-to-tr from-blue-100 to-blue-300 animate-fadeIn"
    >
      <div class="flex flex-col items-center justify-center gap-4">
        <img
          :src="con.images.logo"
          alt="Akor Logo"
          class="h-24 w-24 animate-spin-slow"
        />
        <div class="flex gap-1">
          <div class="w-2 h-2 rounded-full bg-blue-600 animate-bounce delay-0"></div>
          <div class="w-2 h-2 rounded-full bg-blue-600 animate-bounce delay-150"></div>
          <div class="w-2 h-2 rounded-full bg-blue-600 animate-bounce delay-300"></div>
        </div>
        <p class="text-sm text-slate-500 font-medium">Mohon tunggu sebentar...</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import con from '@/constants'
  
  const router = useRouter()
  
  onMounted(() => {
    setTimeout(() => {
      router.push('/login')
    }, 3000)
  })
  </script>
  
  <style scoped>
  @keyframes spin-slow {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  
  .animate-spin-slow {
    animation: spin-slow 3s linear infinite;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
  
  .animate-fadeIn {
    animation: fadeIn 0.8s ease-out forwards;
  }
  

  .delay-0 {
    animation-delay: 0ms;
  }
  .delay-150 {
    animation-delay: 150ms;
  }
  .delay-300 {
    animation-delay: 300ms;
  }
  </style>