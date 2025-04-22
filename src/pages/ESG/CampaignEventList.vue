<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { Search } from "lucide-vue-next";
import { useCalendarStore } from "../../stores/useCalendarStore";
import MemberList from "./CampaignMemberList.vue";

const calendarStore = useCalendarStore();

const currentPage = ref(0);
const totalPages = ref(0); // 응갑 받은 총 페이지 수
const searchQuery = ref(""); // 검색

// 이벤트 가져오기
const fetchCampaigns = async () => {
  totalPages.value = await calendarStore.companyeventList(
    currentPage.value,
    10
  );
};

// 페이지가 바뀌거나 처음 로딩될 때 데이터 가져오기
watch(currentPage, fetchCampaigns);
onMounted(fetchCampaigns);

// 검색 필터
const filteredCampaigns = computed(() =>
  calendarStore.pageEventList.filter((c) =>
    (c.title || "").toLowerCase().includes(searchQuery.value.toLowerCase())
  )
);

// 모달
const showModal = ref(false);
const selectedCampaign = ref(null);

// 캠페인 클릭 시
const openModal = (campaign) => {
  selectedCampaign.value = campaign;
  showModal.value = true;
  console.log("캠페인:", selectedCampaign.value);
};

const closeModal = () => {
  showModal.value = false;
};

// 페이지 권한 설정
const userRole = ref(
  JSON.parse(localStorage.getItem("userInfo"))?.role || "manager"
);
// manager executive staff `'${{변수명}}'` v-if="userRole === 'manager'"
</script>


<template>
  <div class="px-8 py-6 bg-gray-50 min-h-screen">
    <!-- 페이지 제목 -->
    <h2 class="text-4xl font-bold text-slate-800 text-center mb-8">
      사내 캠페인 리스트
    </h2>

    <!-- 검색창 -->
    <div
      class="max-w-2xl mx-auto bg-white p-4 rounded-md shadow-md flex items-center gap-3 mb-8"
    >
      <Search color="black" :size="30" />

      <input
        type="text"
        v-model="searchQuery"
        placeholder="캠페인명 검색"
        class="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
      />

      <button
        class="bg-slate-800 text-white px-6 py-2 rounded hover:bg-slate-900 transition"
      >
        검색
      </button>
    </div>

    <!-- 리스트 테이블 -->
    <div class="bg-white rounded-lg shadow overflow-hidden max-w-4xl mx-auto">
      <table class="min-w-full text-sm text-slate-800 text-center">
        <thead class="bg-slate-100 border-b border-gray-200">
          <tr>
            <th class="py-3 px-6">제목</th>
            <th class="py-3 px-6">날짜</th>
            <th class="py-3 px-6" v-if="userRole === 'manager'">사원 추가</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(event, idx) in filteredCampaigns"
            :key="idx"
            class="border-b hover:bg-slate-50 cursor-pointer transition"
          >
            <td class="py-3 px-6 font-medium" @click="openModal(event)">
              {{ event.title }}
            </td>

            <td class="py-3 px-6 text-slate-500 whitespace-nowrap">
              {{ event.startDate }} ~ {{ event.endDate }}
            </td>

            <td class="py-3 px-6" v-if="userRole === 'manager'">
              <router-link
                :to="`/memberadd/${event.idx}`"
                class="bg-slate-800 text-white px-4 py-1 rounded hover:bg-slate-900 transition mb-3 whitespace-nowrap"
              >
                사원 추가
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 페이지네이션 -->
    <div class="flex justify-center mt-8 space-x-2 text-sm">
      <button
        class="px-3 py-1 bg-slate-700 text-white rounded hover:bg-slate-900"
        :disabled="currentPage === 0"
        @click="currentPage--"
      >
        ← 이전
      </button>

      <button
        v-for="page in totalPages"
        :key="page"
        @click="currentPage = page - 1"
        :class="[
          'px-3 py-1 rounded',
          currentPage === page - 1
            ? 'bg-slate-800 text-white'
            : 'bg-slate-100 hover:bg-slate-200',
        ]"
      >
        {{ page }}
      </button>

      <button
        class="px-3 py-1 bg-slate-700 text-white rounded hover:bg-slate-900"
        :disabled="currentPage === totalPages - 1"
        @click="currentPage++"
      >
        다음 →
      </button>
    </div>

    <MemberList
      v-if="showModal"
      :campaign="selectedCampaign"
      @close="closeModal"
    />
  </div>
</template>