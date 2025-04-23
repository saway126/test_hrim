<script setup>
import { ref, computed } from "vue";
import { Search } from "lucide-vue-next";
import PartnerDelete from "./PartnerDelete.vue";
import PartnerRegist from "./PartnerRegist.vue";

const search = ref("");
const page = ref(1);
const perPage = 6;

const deleteModal = ref(false);
const selectedCompanyIndex = ref(null);
const registerModule = ref(false);

const openDeleteModal = (index) => {
  selectedCompanyIndex.value = index;
  deleteModal.value = true;
};

const deleteCompany = () => {
  if (selectedCompanyIndex.value !== null) {
    companies.value.splice(selectedCompanyIndex.value, 1);
    selectedCompanyIndex.value = null;
    deleteModal.value = false;
  }
};

const addPartners = (newPartners) => {
  newPartners.forEach(partner => {
    companies.value.push({
      name: partner.name,
      totalGrade: '-', environment: '-', social: '-', governance: '-', score: 0
    })
  })
  registerModule.value = false
}


const companies = ref([
  {
    name: "AJ네트웍스",
    totalGrade: "B+",
    environment: "C",
    social: "A",
    governance: "B+",
    score: 70,
  },
  {
    name: "AK홀딩스",
    totalGrade: "A",
    environment: "A",
    social: "A+",
    governance: "B+",
    score: 72,
  },
  {
    name: "BGF",
    totalGrade: "A",
    environment: "A",
    social: "A+",
    governance: "B+",
    score: 75,
  },
  {
    name: "BGF리테일",
    totalGrade: "A",
    environment: "A",
    social: "A+",
    governance: "A",
    score: 80,
  },
  {
    name: "BNK금융지주",
    totalGrade: "A",
    environment: "A+",
    social: "A+",
    governance: "A",
    score: 80,
  },
  {
    name: "BYC",
    totalGrade: "D",
    environment: "D",
    social: "D",
    governance: "C",
    score: 60,
  },
]);

const filteredData = computed(() => {
  return companies.value.filter((company) =>
    company.name.includes(search.value.trim())
  );
});

const pagedData = computed(() => {
  const start = (page.value - 1) * perPage;
  return filteredData.value.slice(start, start + perPage);
});

const totalPages = computed(() => {
  return Math.ceil(filteredData.value.length / perPage);
});

const onSearch = () => {
  console.log(`검색어: ${search.value}`);
  page.value = 1;
};

const userRole = ref(JSON.parse(localStorage.getItem('userInfo'))?.role || 'manager')
// manager executive staff `'${{변수명}}'` v-if="userRole === 'manager'"
</script>

<template>
  <div class="p-8 bg-gray-50 min-h-screen">
    <h1 class="text-4xl font-bold text-slate-800 mb-8 text-center">
      협력사 리스트
    </h1>

    <!-- 검색창 -->
    <div
      class="max-w-2xl mx-auto bg-white p-4 rounded-md shadow-md flex items-center gap-3 mb-3"
    >
      <Search color="black" :size="30" />

      <input
        type="text"
        placeholder="검색어를 입력하세요"
        class="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
      />

      <button
        class="bg-slate-800 text-white px-6 py-2 rounded hover:bg-slate-900 transition"
      >
        검색
      </button>
    </div>

    <div class="flex justify-end" v-if="userRole === 'manager'">
      <button
        @click="registerModule = true"
        class="bg-slate-800 text-white px-4 py-1 rounded hover:bg-slate-900 transition mb-3"
      >
        협력사 추가
      </button>
    </div>

    <!-- 테이블 -->
    <div class="overflow-x-auto bg-white rounded shadow">
      <table class="w-full table-auto text-center">
        <thead class="bg-slate-100 text-slate-700">
          <tr>
            <th class="p-3 border" rowspan="2">회사명</th>
            <th class="p-3 border" colspan="4">KCGS</th>
            <th class="p-3 border">IMHR</th>
            <th class="p-3 border" rowspan="2" v-if="userRole === 'manager'">삭제</th>
          </tr>
          <tr>
            <th class="p-2 border">종합등급</th>
            <th class="p-2 border">환경</th>
            <th class="p-2 border">사회</th>
            <th class="p-2 border">지배구조</th>
            <th class="p-2 border">총점</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(company, index) in pagedData"
            :key="index"
            class="hover:bg-slate-50 border-b"
          >
            <router-link to="/partner/1">
              <td class="p-2">{{ company.name }}</td>
            </router-link>

            <td class="p-2">{{ company.totalGrade }}</td>
            <td class="p-2">{{ company.environment }}</td>
            <td class="p-2">{{ company.social }}</td>
            <td class="p-2">{{ company.governance }}</td>
            <td class="p-2">{{ company.score }}</td>

            <td class="p-2" v-if="userRole === 'manager'">
              <button
                class="bg-red-500 text-white text-sm px-3 py-1 rounded hover:bg-red-600 transition"
                @click="openDeleteModal(index)"
              >
                삭제
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 페이지네이션 -->
    <div class="flex justify-center items-center mt-6 space-x-2 text-sm">
      <button
        class="px-3 py-1 bg-slate-700 text-white rounded disabled:opacity-40 disabled:cursor-not-allowed"
        :disabled="page === 1"
        @click="page--"
      >
        ← 이전
      </button>
      <button
        v-for="p in totalPages"
        :key="p"
        class="px-3 py-1 border rounded"
        :class="{ 'font-bold bg-slate-800 text-white': p === page }"
        @click="page = p"
      >
        {{ p }}
      </button>
      <button
        class="px-3 py-1 bg-slate-700 text-white rounded disabled:opacity-40 disabled:cursor-not-allowed"
        :disabled="page === totalPages"
        @click="page++"
      >
        다음 →
      </button>
    </div>

    <PartnerDelete
      :visible="deleteModal"
      @close="deleteModal = false"
      @confirm="deleteCompany"
    />

    <PartnerRegist
      :visible="registerModule"
      @close="registerModule = false"
      @confirm="addPartners"
    />
  </div>
</template>