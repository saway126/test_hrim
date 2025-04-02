<template>
    <div class="flex h-screen">
      <!-- 사이드바 -->
      <aside class="w-60 bg-gradient-to-b from-blue-500 to-blue-600 text-white p-4">
        <h1 class="text-3xl font-bold mb-6">IM HR</h1>
        <ul class="space-y-2 text-sm">
          <li v-for="menu in menus" :key="menu">
            <button class="w-full text-left hover:underline"><span>▼</span> {{ menu }}</button>
          </li>
        </ul>
      </aside>
  
      <!-- 본문 -->
      <main class="flex-1 bg-gray-50">
        <header class="flex justify-end items-center px-6 py-4 border-b bg-white">
          <div class="flex items-center space-x-4">
            <span class="text-lg font-semibold">홍길동 님</span>
            <span class="text-yellow-400 text-xl">🔔</span>
          </div>
        </header>
  
        <section class="flex flex-col items-center justify-center h-full">
          <div class="w-[500px] h-[500px] border-2 border-blue-300 rounded-lg bg-white p-8">
            <div class="space-y-6 text-gray-600 text-lg">
              <div><strong>이름 :</strong> {{ user.name }}</div>
              <div><strong>아이디 :</strong> {{ user.id }}</div>
              <div><strong>이메일 :</strong> {{ user.email }}</div>
              <div><strong>회사 코드 :</strong> {{ user.companyCode }}</div>
            </div>
          </div>
  
          <div class="mt-6 flex space-x-8">
            <button class="px-6 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600" @click="approveUser">승인</button>
            <button class="px-6 py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600" @click="rejectUser">거절</button>
          </div>
        </section>
      </main>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const menus = ['회사 정보', 'ESG 지표 관리', 'ESG 성과 등록', 'ESG 성과 분석', '공급망진단', '리포트 관리', '처교실', '시스템러']
  
  const user = ref({
    name: '홍길순',
    id: 'admin123',
    email: 'admin@example.com',
    companyCode: 'IM1234'
  })
  
  const approveUser = () => {
    alert('회원 승인 처리 완료!')
  }
  
  const rejectUser = () => {
    alert('회원 거절 처리 완료!')
  }
  </script>
  
  <style scoped>
  /* 필요 시 여기에 추가 */
  </style>
  