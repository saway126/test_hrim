<script setup>
import { X } from 'lucide-vue-next'
import { ref } from 'vue';

defineProps({
  visible: Boolean,
  event: Object
})

defineEmits(['close'])

// 권한 부여 하는 코드 
const userRole = ref(JSON.parse(localStorage.getItem('userInfo'))?.role || 'manager')
// manager executive staff `'${{변수명}}'` v-if="userRole === 'manager'"
</script>

<template>
  <div v-if="visible" class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-40">
    <div class="bg-white rounded-xl w-[400px] p-4 relative">
      <button class="absolute top-3 right-3 text-gray-500" @click="$emit('close')">
        <X class="w-5 h-5" />
      </button>

      <h2 class="text-lg font-bold mb-4">이벤트 상세</h2>
      <div class="space-y-2">
        <div><span class="font-semibold">제목:</span> {{ event.title }}</div>
        <div><span class="font-semibold">내용:</span> {{ event.content }}</div>
        <div :style="{ color: event.color }"><span class="font-semibold">시작일:</span> {{ event.startDate }}</div>
        <div :style="{ color: event.color }"><span class="font-semibold">종료일:</span> {{ event.endDate }}</div>
      </div>

      <div class="flex justify-end gap-2 mt-4" v-if="userRole === 'manager'">
        <button @click="$emit('delete-event', event)" class="px-3 py-1 rounded bg-gray-300">
          삭제
        </button>

        <button @click="$emit('add-event', event)" class="px-3 py-1 rounded bg-slate-500 text-white">
          수정
        </button>
      </div>
    </div>
  </div>
</template>