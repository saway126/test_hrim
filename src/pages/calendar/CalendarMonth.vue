<script setup>
import { computed } from "vue";

const props = defineProps({
  year: Number,
  month: Number,
  events: {
    type: Array,
    default: () => [],
  },
});
const emit = defineEmits(["date-click"]);

const today = new Date();

function formatDate(y, m, d) {
  const date = new Date(y, m - 1, d);
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function getCalendarDates(y, m) {
  const dates = [];
  const firstDay = new Date(y, m - 1, 1);
  const startDay = firstDay.getDay();
  const daysInMonth = new Date(y, m, 0).getDate();
  const prevMonthDays = new Date(y, m - 1, 0).getDate();

  for (let i = startDay - 1; i >= 0; i--) {
    const d = prevMonthDays - i;
    dates.push({ day: d, monthOffset: -1, fullDate: formatDate(y, m - 1, d) });
  }

  for (let i = 1; i <= daysInMonth; i++) {
    const isToday =
      y === today.getFullYear() &&
      m === today.getMonth() + 1 &&
      i === today.getDate();
    dates.push({
      day: i,
      monthOffset: 0,
      fullDate: formatDate(y, m, i),
      today: isToday,
    });
  }

  const remain = dates.length % 7;
  if (remain !== 0) {
    for (let i = 1; i <= 7 - remain; i++) {
      dates.push({ day: i, monthOffset: 1, fullDate: formatDate(y, m + 1, i) });
    }
  }

  return dates;
}

const calendarDates = computed(() => getCalendarDates(props.year, props.month));

function getEventsForDate(date) {
  return props.events.filter((e) => e.date === date);
}
</script>

<template>
  <div class="bg-white mx-auto">
    <div class="grid grid-cols-7 text-base font-bold overflow-hidden">
      <div
        v-for="(day, i) in ['일', '월', '화', '수', '목', '금', '토']"
        :key="i"
        class="text-center py-2 border border-neutral-200"
        :class="{ 'text-red-500': i === 0, 'text-blue-500': i === 6 }"
      >
        {{ day }}
      </div>
    </div>

    <!-- 날짜 셀 -->
    <div class="grid grid-cols-7 border-neutral-200">
      <div
        v-for="(date, index) in calendarDates"
        :key="index"
        class="h-32 border border-neutral-200 relative px-2 py-1 cursor-pointer"
        :class="{
          'bg-slate-100 text-whiet opacity-50': date.today,
          'text-zinc-400': date.monthOffset !== 0,
        }"
        @click="$emit('date-click', date.fullDate)"
      >
        <!-- 날짜 숫자(동그라미) - absolute로 고정 -->
        <div class="absolute top-2 left-2 z-10">
          <span
            v-if="getEventsForDate(date.fullDate).length > 3"
            class="inline-flex items-center justify-center w-6 h-6 text-sm font-bold text-zinc-800 bg-violet-100 rounded-full"
          >
            {{ date.day }}
          </span>
          <span v-else class="text-sm text-zinc-800">
            {{ date.day }}
          </span>
        </div>

        <!-- 이벤트 바 - padding-top으로 날짜 숫자 공간 확보 -->
        <div class="pt-8">
          <div
            v-for="event in getEventsForDate(date.fullDate).slice(0, 3)"
            :key="event.title + event.time"
            class="mt-1"
          >
            <div
              class="flex items-center min-w-0 h-6 px-1 rounded-md text-xs font-bold text-white truncate"
              :style="{ backgroundColor: event.color }"
            >
              {{ event.title }} ({{ event.time }})
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>