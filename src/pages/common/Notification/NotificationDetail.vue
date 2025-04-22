<template>
  <div class="fixed inset-0 flex items-center justify-center z-40 bg-black/30">
    <div class="bg-slate-300 rounded-xl p-6 w-[400px] shadow-xl relative">
      <button @click="$emit('close')" class="absolute top-3 right-3">
        <X class="w-5 h-5 text-gray-500 hover:text-red-500" />
      </button>
      <h2 class="text-lg font-bold mb-2">알림 상세</h2>
      <p class="text-gray-700 mb-4">{{ notification.content }}</p>

      <div class="flex justify-end space-x-2">
        <button
          class="bg-white text-gray-700 px-4 py-1 rounded"
          @click="$emit('close')"
        >
          닫기
        </button>
        <button
          class="bg-blue-500 text-white px-4 py-1 rounded"
          @click="goToLink"
        >
          이동
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { X } from 'lucide-vue-next'

const props = defineProps({
  notification: Object
})

const goToLink = () => {
  if (props.notification.link) {
    window.location.href = props.notification.link
  }
  showNotiPopup.value = false;
}
</script>