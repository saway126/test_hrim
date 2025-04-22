<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import CalendarHeader from "./CalendarHeader.vue";
import CalendarMonth from "./CalendarMonth.vue";
import AddEvent from "./Event/AddEvent.vue";
import EventByDateDetail from "./Event/EventByDateDetail.vue";
import EventDetail from "./Event/EventDetail.vue";
import { useCalendarStore } from "../../stores/useCalendarStore";

const route = useRoute();
const calendarStore = useCalendarStore();

const today = new Date();
const year = ref(today.getFullYear());
const month = ref(today.getMonth() + 1);
const events = computed(() => calendarStore.monthevent);

const showAddModal = ref(false);
const showDetailModal = ref(false);
const selectedDate = ref(null);
const selectedEvent = ref(null);
const showEventInfoModal = ref(false);
// 특정 날짜의 이벤트 리스트 데이터 담기
const dayEvents = computed(() => calendarStore.dayevent);

// 자동으로 events 변경 추적
const normalizedEvents = computed(() => {
  return events.value.flatMap((e) => {
    if (!e.startDate || !e.endDate) return [];

    const start = new Date(e.startDate);
    const end = new Date(e.endDate);
    const days = [];

    for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
      days.push({
        ...e,
        date: d.toISOString().split("T")[0],
      });
    }
    return days;
  });
});

// 버튼 클릭시 실행 되어 데이터를 담는 코드
function handleEventClick(event) {
  selectedEvent.value = event;
  showEventInfoModal.value = true;
  showAddModal.value = false;
}

// 데이터 불러오는 버튼 발동 코드
async function handleDateClick(date) {
  selectedDate.value = date;
  await calendarStore.dayevents(date);
  showDetailModal.value = true;
}


function handleEditEvent(event) {
  selectedEvent.value = event;
  showAddModal.value = true;
  showEventInfoModal.value = false;
  openAddEvent(event.date);
  console.log("handle-open : ", event.date);
}

// date가 없으면 오늘 날짜로
function openAddEvent(date = null) {
  if (date) {
    selectedDate.value = date;
  } 
  showAddModal.value = true;

  console.log("openAddEvent - 최종 selectedDate:", selectedDate.value);
}

async function deleteEvent(event) {
  try {
    const currentDate = selectedDate.value;
    await calendarStore.eventdelete(event.idx);

    // 1. 월 데이터 재요청
    await calendarStore.monthevents(year.value, month.value);

    await calendarStore.dayevents(currentDate);

    showEventInfoModal.value = false;
  } catch (error) {
    console.error("이벤트 삭제 실패:", error);
  }
}

// 저번달
async function prevMonth() {
  if (month.value === 1) {
    month.value = 12;
    year.value--;
  } else {
    month.value--;
  }
  await calendarStore.monthevents(year.value, month.value);
}

// 다음달
async function nextMonth() {
  if (month.value === 12) {
    month.value = 1;
    year.value++;
  } else {
    month.value++;
  }
  await calendarStore.monthevents(year.value, month.value);
}

onMounted(async () => {
  await calendarStore.monthevents(year.value, month.value);
});
</script>

<template>
  <div class="w-full min-h-screen bg-white px-2 sm:px-10 md:px-20 pt-5">
    <div
      class="max-w-screen-xl mx-auto rounded-xl border border-gray-200 p-4 shadow-m"
    >
      <CalendarHeader
        :year="year"
        :month="month"
        @prev="prevMonth"
        @next="nextMonth"
        @open-add="openAddEvent()"
      />

      <CalendarMonth
        :year="year"
        :month="month"
        :events="normalizedEvents"
        @date-click="handleDateClick"
      />
    </div>

    <AddEvent
      :visible="showAddModal"
      :date="selectedDate"
      :event="selectedEvent"
      @close="
        () => {
          showAddModal = false;
          selectedEvent = null;
        }
      "
      @save="
        () => {
          calendarStore.monthevents(year, month);
          calendarStore.dayevents(selectedDate);
        }
      "
    />

    <EventByDateDetail
      :visible="showDetailModal"
      :date="selectedDate"
      :events="dayEvents"
      @close="
        () => {
          showDetailModal = false;
        }
      "
      @add-event="openAddEvent"
      @event-click="handleEventClick"
    />

    <EventDetail
      :visible="showEventInfoModal"
      :event="selectedEvent"
      @close="showEventInfoModal = false"
      @delete-event="deleteEvent"
      @add-event="handleEditEvent"
    />
  </div>
</template>