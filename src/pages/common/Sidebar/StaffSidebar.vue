<script setup>
const props = defineProps({
  isOpen: Boolean,
});

const menuItems = [
  { path: "/partner/1", label: "기업 ESG 현황" },
  { path: "/educationList/1", label: "ESG 교육 활동" },
  { path: "/activityList", label: "ESG 기타 활동" },
  { path: "/campaignlist", label: "ESG 사내 캠페인 활동" },
  { path: "/staffSearch", label: "피드백" },
  { path: "/calendar", label: "캘린더" },
];
</script>

<template>
  <aside
    class="fixed top-16 left-0 w-64 h-full bg-gradient-to-b from-slate-800 to-slate-900 text-white z-20 shadow-2xl border-r border-slate-700 transform transition-transform duration-300 ease-in-out"
    :class="{
      '-translate-x-full': !isOpen,
      'translate-x-0': isOpen,
    }"
  >
    <nav class="mt-5">
      <ul class="p-4 space-y-1">
        <li v-for="item in menuItems" :key="item.path">
          <router-link
            :to="item.path"
            class="block px-4 py-2 rounded-md transition duration-200 hover:bg-slate-700 hover:shadow-md hover:scale-[1.01] border-l-4"
            :class="{
              'border-emerald-400 bg-slate-700 font-semibold':
                $route.path === item.path,
              'border-transparent': $route.path !== item.path,
            }"
          >
            {{ item.label }}
          </router-link>
        </li>
      </ul>
    </nav>
  </aside>
</template>