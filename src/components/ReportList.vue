<template>
    <div class="p-6">
      <h2 class="text-2xl font-bold mb-4">인사 리포트 리스트</h2>
  
      <div class="bg-white p-4 rounded-xl shadow mb-6 flex flex-col md:flex-row md:items-end gap-4">
        <div class="flex-1">
          <label class="block font-semibold">직원 이름</label>
          <input v-model="search.name" type="text" class="w-full border rounded p-2" placeholder="이름 입력" />
        </div>
        <div class="flex-1">
          <label class="block font-semibold">아이디</label>
          <input v-model="search.userId" type="text" class="w-full border rounded p-2" placeholder="아이디 입력" />
        </div>
        <div class="flex-1">
          <label class="block font-semibold">고유번호 (IDX)</label>
          <input v-model="search.idx" type="text" class="w-full border rounded p-2" placeholder="IDX 입력" />
        </div>
        <button class="bg-blue-600 text-white px-4 py-2 rounded" @click="fetchReports">검색</button>
      </div>
  
      <table class="w-full border text-sm">
        <thead class="bg-gray-100">
          <tr>
            <th class="p-2">이름</th>
            <th class="p-2">아이디</th>
            <th class="p-2">직급</th>
            <th class="p-2">기간</th>
            <th class="p-2">상세보기</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="report in reports" :key="report.id" class="border-t">
            <td class="p-2">{{ report.name }}</td>
            <td class="p-2">{{ report.userId }}</td>
            <td class="p-2">{{ report.rank }}</td>
            <td class="p-2">{{ report.period }}</td>
            <td class="p-2">
              <router-link :to="`/report/${report.id}`" class="text-blue-600 underline">상세보기</router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const search = ref({ name: '', userId: '', idx: '' })
  const reports = ref([
    { id: 1, name: '홍길동', userId: 'gildong', rank: '과장', period: '2024.01 ~ 2024.03' },
    { id: 2, name: '김영희', userId: 'younghee', rank: '대리', period: '2024.01 ~ 2024.03' }
  ])
  
  const fetchReports = () => {
    console.log('검색조건:', search.value)
    // TODO: 실제 API 요청으로 데이터 가져오기
  }
  </script>
  