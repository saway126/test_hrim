<!-- src/views/DashboardView.vue -->
<template>
    <div class="flex h-screen">
      <!-- 사이드 메뉴 -->
      <aside class="w-64 bg-gradient-to-b from-blue-500 to-blue-600 text-white p-4">
        <h1 class="text-3xl font-bold mb-6">IM HR</h1>
        <nav class="space-y-2 text-sm">
          <ul>
            <li v-for="item in menu" :key="item" class="hover:text-blue-200 cursor-pointer">
              <span class="inline-block w-5">📁</span>{{ item }}
            </li>
          </ul>
          <li class="mt-4 text-white font-bold border-t border-blue-300 pt-2">⚙️ 설정</li>
        </nav>
      </aside>
  
      <!-- 본문 -->
      <div class="flex-1 bg-gray-50 p-6 overflow-y-auto">
        <!-- 상단 -->
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xl font-semibold">종합분석 2022</h2>
          <div class="flex items-center gap-4">
            <span class="text-lg font-medium">관리자 홍길동 님</span>
            <button @click="logout" class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">로그아웃</button>
            <span class="text-yellow-400 text-2xl">🔔</span>
          </div>
        </div>
  
        <!-- 기본 정보 -->
        <div class="grid grid-cols-5 gap-4 text-sm bg-white p-4 rounded shadow mb-4">
          <div><p class="text-gray-500">회사</p><p>한화솔루션(주)</p></div>
          <div><p class="text-gray-500">매출액</p><p>2,187,405 백만원</p></div>
          <div><p class="text-gray-500">산업군</p><p>산업>우주항공과학광</p></div>
          <div><p class="text-gray-500">해당 리포트</p><p>2022</p></div>
          <div><p class="text-gray-500">리포트 생성일</p><p>2023-03-28</p></div>
        </div>
  
        <!-- 그래프 섹션 -->
        <div class="grid grid-cols-2 gap-6 mb-6">
          <!-- 진단 점수 -->
          <div class="bg-white p-4 rounded shadow text-center">
            <p class="text-gray-600 mb-2">ESG 진단 점수</p>
            <p class="text-green-500 text-4xl font-bold">74.6</p>
            <p class="text-red-500 text-sm mt-1">타업체대비 8.5점 높아요!</p>
          </div>
  
          <!-- 점수 추이 -->
          <div class="bg-white p-4 rounded shadow">
            <p class="text-gray-600 mb-2">점수 변화 추이</p>
            <div class="h-40 bg-blue-100 flex items-end p-2 rounded">
              <!-- 그래프 대신 간단한 형태 -->
              <div class="w-full h-full border-l border-b border-blue-300 relative">
                <div class="absolute bottom-0 left-0 w-full h-[70%] bg-blue-400 opacity-30"></div>
              </div>
            </div>
          </div>
        </div>
  
        <!-- 이달의 사원 -->
        <div class="bg-white p-4 rounded shadow mb-6">
          <p class="font-medium mb-4">이달의 사원</p>
          <div class="flex justify-between text-center text-sm">
            <div>
              <p class="text-yellow-500 font-bold">🥇 홍길동</p>
              <p>코멘트 갯수 : 100</p>
            </div>
            <div>
              <p class="text-gray-500 font-bold">🥈 임꺽정</p>
              <p>코멘트 갯수 : 99</p>
            </div>
            <div>
              <p class="text-orange-500 font-bold">🥉 너구리</p>
              <p>코멘트 갯수 : 98</p>
            </div>
          </div>
        </div>
  
        <!-- 점수 영역 -->
        <div class="grid grid-cols-3 gap-4">
          <div class="bg-green-100 text-green-800 p-4 rounded shadow text-center">
            <p class="text-xs mb-1">기준대비 1.1%</p>
            <p class="font-bold">환경 Environmental</p>
            <p class="text-2xl font-bold">55.2</p>
          </div>
          <div class="bg-blue-100 text-blue-800 p-4 rounded shadow text-center">
            <p class="text-xs mb-1">기준대비 40%</p>
            <p class="font-bold">사회 Social</p>
            <p class="text-2xl font-bold">73.9</p>
          </div>
          <div class="bg-purple-100 text-purple-800 p-4 rounded shadow text-center">
            <p class="text-xs mb-1">기준대비 47%</p>
            <p class="font-bold">지배구조 Governance</p>
            <p class="text-2xl font-bold">80.6</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  const menu = [
    'ESG 현황',
    'ESG 사원 관리',
    '친환경 제품 관리',
    '갤러리',
    'ESG 활동 관리',
    '교육 관리',
    '사내 캠페인 관리',
    '협력사 관리'
  ]
  
  const logout = () => {
    alert('로그아웃되었습니다.')
    // 이후 router.push('/login') 같은 리디렉션 처리 가능
  }
  </script>
  