<!-- NotificationPopup.vue -->
<template>
  <div
    class="absolute right-6 z-30 w-96"
    :style="{ top: `${topOffset}px` }"
  >
    <div class="bg-slate-200 rounded-lg shadow-lg border border-gray-200 overflow-hidden">
      <div class="p-4 max-h-80 overflow-y-auto space-y-2" @scroll="onNotiScroll">
        <div
          v-for="(noti, index) in notificationStore.notifications"
          :key="index"
          @click="openDetail(noti)"
          class="p-3 rounded cursor-pointer hover:bg-gray-100 transition flex justify-between items-center"
          :class="noti.read ? 'text-gray-400' : 'text-gray-800 font-semibold'"
        >
          <span>{{ noti.title }}</span>
          <button @click.stop="deleteNoti(index)">
            <Trash class="w-4 h-4 text-gray-400 hover:text-red-500" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Trash } from "lucide-vue-next";
import { defineEmits,ref, onMounted, onBeforeUnmount } from "vue";
import { useStompStore } from '../../../stores/useStompStore'
import { useNotificationStore } from '../../../stores/useNotificationStore';

// 무한 스크롤용 변수
const notificationStore= useNotificationStore();
const page=ref(0);


const emit = defineEmits(["open-detail"]);

const props = defineProps({
  notifications: Array,
});

const openDetail = (noti) => {
  emit("open-detail", noti);
};

const deleteNoti = (index) => {
  props.notifications.splice(index, 1);
};

const stomp = useStompStore()





// 화면 조정
const topOffset = ref(64) // 초기 top 위치
const prevScrollTop = ref(0)
let isWaiting = false

const handleScroll = () => {
  topOffset.value = 64 + window.scrollY // 항상 현재 스크롤에 맞게 top 위치 변경
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  notificationStore.getMyNotifications(page.value);
  page.value=page.value+1;
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})


// 알림창 무한 스크롤


const onNotiScroll = (event) => {
  const target = event.target
  const currentScrollTop = target.scrollTop
  const scrollBottom = currentScrollTop + target.clientHeight
  const isAtBottom = scrollBottom >= target.scrollHeight - 1

  const isScrollingDown = currentScrollTop > prevScrollTop.value
  prevScrollTop.value = currentScrollTop

  if (isScrollingDown && isAtBottom && !isWaiting) {
    console.log('📢 아래로 스크롤하여 마지막 요소에 도달했습니다!')
    notificationStore.getMyNotifications(page.value);
    isWaiting = true

    // ✅ 1초 후에 다시 이벤트 허용
    setTimeout(() => {
      page.value=page.value+1;
      isWaiting = false
    }, 150)
  }
}
</script>