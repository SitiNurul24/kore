<template>
  <!-- Tombol yang dapat digunakan ulang -->
  <button
    :class="buttonClass"
    :style="buttonStyle"
    @click="handleClick"
    class="flex items-center justify-center font-semibold text-sm transition hover:opacity-80"
  >
    <span v-if="icon" class="material-icons mr-2 text-base">{{ icon }}</span>
    {{ text }}
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    default: null,
  },
  color: {
    type: String,
    default: 'bg-blue-500',
  },
  size: {
    type: String,
    default: 'px-6 py-2',
  },
  onClick: {
    type: Function,
    default: () => {},
  },
})

const buttonClass = computed(() => {
  return `${props.color} text-white rounded-md ${props.size} shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${props.color}`
})

const buttonStyle = computed(() => {
  return {
    'box-shadow': '0 2px 8px 0 rgba(0, 162, 220, 0.2)', // Optional shadow effect
  }
})

const handleClick = () => {
  props.onClick()
}
</script>

<style scoped>
/* Optional: Styling for the button can be defined here */
</style>
