<template>
    <div class="flex h-screen bg-gray-50">
      <!-- Sidebar -->
      <aside class="w-64 bg-gradient-to-b from-blue-500 to-blue-600 text-white p-4">
        <h1 class="text-3xl font-bold mb-6">IM HR</h1>
        <ul class="space-y-2 text-sm">
          <li>
            <button class="flex items-center w-full justify-between">회사 정보 <span>▼</span></button>
          </li>
          <li>
            <button class="flex items-center w-full justify-between">ESG 지표 관리 <span>▼</span></button>
          </li>
          <li>
            <button class="flex items-center w-full justify-between">ESG 성과 등록 <span>▼</span></button>
          </li>
          <li>
            <button class="flex items-center w-full justify-between">E5G 성과 분석 <span>▼</span></button>
          </li>
          <li>
            <button class="flex items-center w-full justify-between">공급망진단 <span>▼</span></button>
          </li>
          <li>
            <button class="flex items-center w-full justify-between">리포트 관리 <span>▼</span></button>
          </li>
          <li>
            <button class="flex items-center w-full justify-between">처교실 <span>▼</span></button>
          </li>
          <li>
            <button class="flex items-center w-full justify-between">시스템러 <span>▼</span></button>
          </li>
        </ul>
      </aside>
  
      <!-- Main Content -->
      <main class="flex-1 p-10">
        <div class="flex justify-between items-center mb-8">
          <h2 class="text-xl font-semibold text-blue-600">ESG 캠페인</h2>
          <div class="text-gray-700 font-medium">홍길동 님 🔔</div>
        </div>
  
        <div class="space-y-4">
          <input type="text" class="w-full border px-4 py-2 rounded" value="ESG 캠페인 1" />
  
          <div class="flex items-center space-x-4">
            <label class="text-sm text-gray-600">날짜 :</label>
            <input type="date" class="border px-2 py-1 rounded" />
            <input type="date" class="border px-2 py-1 rounded" />
            <button class="bg-blue-500 text-white px-4 py-1 rounded">검색</button>
          </div>
  
          <div class="border rounded">
            <table class="w-full text-left">
              <thead class="bg-blue-100">
                <tr>
                  <th class="px-4 py-2"><input type="checkbox" /></th>
                  <th class="px-4 py-2">아이디</th>
                  <th class="px-4 py-2">이름</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in campaignList" :key="index" class="border-t">
                  <td class="px-4 py-2"><input type="checkbox" /></td>
                  <td class="px-4 py-2">{{ item.id }}</td>
                  <td class="px-4 py-2">{{ item.name }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  </template>
  
  <script setup>
  const campaignList = [
    { id: 'test4', name: 'test4' },
    { id: 'test3', name: 'test3' },
    { id: 'test2', name: 'test2' },
    { id: 'test1', name: 'test1' },
    { id: 'test', name: 'test' },
  ]
  </script>
  
  <style scoped>
  input[type="text"], input[type="date"] {
    @apply border border-gray-300 rounded px-2 py-1;
  }
  </style>
  