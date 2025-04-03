<!-- src/views/ActivityManageView.vue -->
<template>
    <div class="flex h-screen">
      <!-- 사이드바 -->
      <aside class="w-64 bg-gradient-to-b from-blue-500 to-blue-600 text-white">
        <div class="text-3xl font-extrabold p-6 flex items-center space-x-2">
          <span>IM HR</span>
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </div>
        <ul class="text-sm space-y-1 pl-4">
          <li>🏢 회사 정보</li>
          <li>📊 ESG 지표 관리</li>
          <li>📝 ESG 성과 등록</li>
          <li>📈 ESG 성과 분석</li>
          <li>🔍 공급망진단</li>
          <li>📄 리포트 관리</li>
          <li>💼 처교실</li>
          <li>🏫 처교실</li>
          <li>⚙️ 시스템러</li>
        </ul>
      </aside>
  
      <!-- 메인 콘텐츠 -->
      <main class="flex-1 bg-gray-50 relative">
        <div class="flex justify-end items-center px-6 py-4 bg-white shadow">
          <span class="mr-2 text-lg font-semibold">홍길동 님</span>
          <button class="text-yellow-400">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
          <button class="ml-4 text-sm text-gray-600 hover:underline" @click="logout">로그아웃</button>
        </div>
  
        <div class="p-8 text-gray-400 text-center">
          <p class="text-sm">반려</p>
        </div>
      </main>
    </div>
  </template>
  
  <script setup>
  const logout = () => {
    alert("로그아웃 되었습니다.")
    // 실제 로그아웃 로직 추가 (예: token 삭제, 페이지 이동 등)
  }
  </script>
  