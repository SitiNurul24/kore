<template>
  <!-- Modal Overlay -->
  <div
    v-if="showModal"
    class="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50"
    @click="handleClose"
  >
    <!-- Modal Content -->
    <div class="bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-4xl" @click.stop>
      <!-- Modal Header -->
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold">{{ title }}</h2>
        <button @click="handleClose" class="text-gray-600 hover:text-gray-800">
          <span class="material-icons">close</span>
        </button>
      </div>

      <!-- Modal Body: Tabel -->
      <div class="mb-4">
        <slot></slot>
        <!-- Slot untuk konten dinamis, di sini kita akan menampilkan tabel -->
      </div>

      <!-- Modal Footer -->
      <div class="flex justify-end space-x-4">
        <button @click="handleClose" class="bg-gray-300 text-gray-700 px-4 py-2 rounded-md">
          Cancel
        </button>
        <button @click="handleConfirm" class="bg-blue-500 text-white px-4 py-2 rounded-md">
          Confirm
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: 'Modal Title',
  },
  showModal: {
    type: Boolean,
    required: true,
  },
  onConfirm: {
    type: Function,
    default: () => {},
  },
})

const emit = defineEmits(['update:showModal'])

const handleClose = () => {
  // Emit an event to close the modal
  emit('update:showModal', false)
}

const handleConfirm = () => {
  // Call the onConfirm function passed from parent
  props.onConfirm()

  // Close the modal after confirmation
  handleClose()
}
</script>

<style scoped>
/* Gaya untuk modal */
/* .modal-overlay {
  @apply fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50;
}
.modal-content {
  @apply bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-4xl;
} */
</style>
