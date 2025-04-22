<script setup>
import { ref, watch } from "vue";
import { X } from "lucide-vue-next";

const props = defineProps({
  visible: Boolean,
  events: {
    type: Array,
    default: () => [],
  },
  date: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["close", "save", "add-event", "event-click"]);

const localEvents = ref([...props.events]);

watch(
  () => props.events,
  (newVal) => {
    localEvents.value = [...newVal];
  },
  { immediate: true, deep: true }
);

const userRole = ref(
  JSON.parse(localStorage.getItem("userInfo"))?.role || "manager"
);
// manager executive staff `'${{변수명}}'` v-if="userRole === 'manager'"
</script>

<template>
  <div
    v-if="visible"
    class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-30"
  >
    <div class="bg-white rounded-xl w-[400px] p-4 relative">
      <button
        class="absolute top-3 right-3 text-gray-500"
        @click="$emit('close')"
      >
        <X class="w-5 h-5" />
      </button>

      <h2 class="text-lg font-bold mb-4">{{ date }} 일정</h2>

      <!-- 일정 리스트 -->
      <div class="mb-2 max-h-60 overflow-y-auto">
        <div
          v-for="event in events"
          :key="event.title + event.time"
          class="mb-2 p-2 rounded border"
          :style="{ color: event.color }"
          @click="$emit('event-click', event)"
        >
          <div class="font-bold">{{ event.title }}</div>
          <div class="text-lg text-slate-700">{{ event.content }}</div>
          <div class="text-sm text-gray-500">{{ event.time }}</div>
        </div>
        
      </div>

      <div v-if="!events.length" class="text-gray-400 text-sm">
        등록된 일정이 없습니다.
      </div>

      <button
        @click="$emit('add-event', date)"
        class="bg-slate-600 text-white mt-3 px-2 py-1 rounded-lg hover:bg-slate-800"
        v-if="userRole === 'manager'"
      >
        + 일정 추가
      </button>

      <button @click="$emit('close')"
        class="bg-slate-500 text-white ml-3 mt-3 px-2 py-1 rounded-lg hover:bg-slate-500">
          닫기
        </button>
    </div>
  </div>
</template>