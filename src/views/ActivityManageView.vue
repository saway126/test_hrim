<!-- src/views/ActivityApprovalView.vue -->
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
  
      <!-- 메인 영역 -->
      <main class="flex-1 p-8 bg-[#FFFCFC] text-gray-800">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-semibold text-blue-600">ESG 활동 승인</h2>
          <div class="flex items-center space-x-4">
            <span class="text-lg font-medium">홍길동 님</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </div>
        </div>
  
        <!-- 활동 상세 정보 -->
        <div class="mb-4">
          <input type="text" v-model="activity.title"
                 class="w-2/3 border p-2 text-lg rounded" placeholder="제목" />
          <input type="text" v-model="activity.topic"
                 class="ml-2 border p-2 rounded w-1/5" placeholder="주제" />
        </div>
  
        <p class="mb-1">게시자: {{ activity.author }} (아이디)</p>
        <p class="mb-1">게시날짜: {{ activity.date }}</p>
  
        <!-- 첨부파일 -->
        <div class="mb-2">
          <p class="font-semibold mt-2">첨부파일</p>
          <ul class="list-disc ml-6 text-blue-600">
            <li v-for="(file, index) in activity.files" :key="index">{{ file }}</li>
          </ul>
        </div>
  
        <!-- 내용 영역 (예: 이미지 또는 설명) -->
        <div class="border mt-4 h-60 bg-white rounded"></div>
  
        <!-- 버튼 영역 -->
        <div class="flex justify-end space-x-4 mt-6">
          <button class="border border-red-500 text-red-500 px-4 py-2 rounded hover:bg-red-50">반려</button>
          <button class="border border-blue-500 text-blue-500 px-4 py-2 rounded hover:bg-blue-50">승인</button>
        </div>
      </main>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const activity = ref({
    title: '봉사 활동',
    topic: '',
    author: '임꺽정',
    date: '2022-06-21',
    files: ['사진.pdf', '사진.png']
  })
  </script>
  