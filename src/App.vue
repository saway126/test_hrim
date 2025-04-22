<script setup>
import { useRoute } from "vue-router";
import { ref, computed } from "vue";

import Header from "./pages/common/Header.vue";
import ManagerSidebar from "./pages/common/Sidebar/ManagerSidebar.vue";
import StaffSidebar from "./pages/common/Sidebar/StaffSidebar.vue";
import ExecutiveSidebar from "./pages/common/Sidebar/ExecutiveSidebar.vue";
import NotificationDetail from "./pages/common/Notification/NotificationDetail.vue";
import NotificationList from "./pages/common/Notification/NotificationList.vue";

const isSidebarOpen = ref(true);
const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

const route = useRoute();
const hideLayout = computed(() => route.meta?.hideLayout === true);

const role = ref(
  JSON.parse(localStorage.getItem("userInfo"))?.role || "manager"
);

const sidebarComponent = computed(() => {
  switch (role.value) {
    case "manager":
      return ManagerSidebar;
    case "executive":
      return ExecutiveSidebar;
    case "staff":
      return StaffSidebar;
  }
});

const showNotiPopup = ref(false);
const selectedNotification = ref(null);
const notifications = ref([
  {
    title: "워크숍 일정 등록됨",
    content: "4월 워크숍이 등록되었습니다.",
    read: false,
    link: "/calendar/1",
  },
  {
    title: "활동 보고서 제츨 안내",
    content: "활동 보고서 제출 기한이 곧 마감됩니다.",
    read: true,
    link: "/educationList/1",
  },
  {
    title: "활동 보고서 제츨 안내",
    content: "활동 보고서 제출 기한이 곧 마감됩니다.",
    read: true,
    link: "/educationList/1",
  },
  {
    title: "활동 보고서 제츨 안내",
    content: "활동 보고서 제출 기한이 곧 마감됩니다.",
    read: true,
    link: "/educationList/1",
  },
  {
    title: "활동 보고서 제츨 안내",
    content: "활동 보고서 제출 기한이 곧 마감됩니다.",
    read: true,
    link: "/educationList/1",
  },
  {
    title: "활동 보고서 제츨 안내",
    content: "활동 보고서 제출 기한이 곧 마감됩니다.",
    read: true,
    link: "/educationList/1",
  },


]);

const toggleNoti = () => (showNotiPopup.value = !showNotiPopup.value);

const openDetail = (noti) => {
  selectedNotification.value = noti;
  noti.read = true;
};

const closeDetail = () => (selectedNotification.value = null);

</script>

<template>
  <div>
    <Header
      v-if="!hideLayout"
      @toggle-sidebar="toggleSidebar"
      @toggle-noti="toggleNoti"
    />

    <NotificationList
      v-if="showNotiPopup"
      :notifications="notifications"
      @open-detail="openDetail"
      class="z-30"
    />

    <NotificationDetail
      v-if="selectedNotification"
      :notification="selectedNotification"
      @close="closeDetail"
      class="z-40"
    />

    <div class="flex" :class="{ 'pt-16': !hideLayout }">
      <component
        v-if="!hideLayout"
        :is="sidebarComponent"
        :isOpen="isSidebarOpen"
      />

      <main
        class="flex-1 min-h-screen transition-all duration-300"
        :class="{
          'ml-0': !isSidebarOpen || hideLayout,
          'ml-64': isSidebarOpen && !hideLayout,
        }"
      >
        <router-view />
      </main>
    </div>
  </div>
</template>
