<script setup>
import { ref, watch } from "vue";
import { X } from "lucide-vue-next";
import { useCalendarStore } from "../../../stores/useCalendarStore";

const emit = defineEmits(["close", "save", "add-event"]);
const calendarStore = useCalendarStore();

const props = defineProps({
  visible: Boolean,
  date: String,
  event: Object,
});

const initialForm = {
  title: "",
  time: "",
  content: "",
  startDate: "",
  endDate: "",
  color: "#f87171",
};

const form = ref({ ...initialForm });

const resetForm = () => {
  form.value = {
    ...initialForm,
    startDate: props.date || "",
    endDate: props.date || "",
  };
};

watch(() => props.visible, (newVal) => {
  if (newVal) {
    form.value = {
      title: props.event?.title || '',
      content: props.event?.content || '',
      color: props.event?.color || '#f87171',
      startDate: props.event?.startDate || props.date || '',
      endDate: props.event?.endDate || props.date || '',
    }
  } else {
    // 모달이 닫힐 때도 form을 초기화
    resetForm();
  }
});

const colorOptions = [
  "#f87171",
  "#fb923c",
  "#facc15",
  "#4ade80",
  "#60a5fa",
  "#a78bfa",
  "#a3a3a3",
  "#64748b",
  "#000000",
];

async function save() {
  if (!form.value.title || !form.value.startDate || !form.value.endDate) return;

  try {
    if (props.event) {
      // 수정 모드
      await calendarStore.update(props.event.idx, form.value);
      emit("save", { id: props.event.idx, ...form.value });
    } else {
      // 추가 모드
      await calendarStore.regist({ ...form.value });
      emit("save", { ...form.value });
    }

    emit("close");
  } catch (error) {
    console.error("일정 저장 실패:", error);
  }
}
</script>

<template>
  <div
    v-if="visible"
    class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
  >
    <div class="bg-white rounded-xl w-[400px] p-4 relative">
      <button
        class="absolute top-3 right-3 text-gray-500"
        @click="$emit('close')"
      >
        <X class="w-5 h-5" />
      </button>

      <h2 class="text-lg font-bold mb-3">
        {{ props.event ? "일정 수정" : "일정 추가" }}
      </h2>

      <div class="space-y-3">
        <input
          v-model="form.title"
          placeholder="제목"
          class="w-full border px-2 py-1 rounded"
        />
        <input
          v-model="form.content"
          placeholder="메모"
          class="w-full border px-2 py-1 rounded"
        />
        <input
          type="date"
          v-model="form.startDate"
          class="w-full border px-2 py-1 rounded"
        />
        <input
          type="date"
          v-model="form.endDate"
          class="w-full border px-2 py-1 rounded"
        />

        <!-- 색상 선택 -->
        <div class="flex flex-wrap gap-2">
          <div
            v-for="color in colorOptions"
            :key="color"
            :style="{ backgroundColor: color }"
            class="w-6 h-6 rounded-full cursor-pointer border-2"
            :class="{ 'border-black': form.color === color }"
            @click="form.color = color"
          ></div>
        </div>
      </div>

      <div class="flex justify-end gap-2 mt-4">
        <button @click="$emit('close')" class="px-3 py-1 rounded bg-gray-300">
          취소
        </button>
        <button @click="save" class="px-3 py-1 rounded bg-slate-600 text-white">
          {{ props.event ? "수정 완료" : "추가" }}
        </button>
      </div>
    </div>
  </div>
</template>