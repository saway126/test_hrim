<template>
    <div class="flex h-screen">
      <!-- 사이드바 -->
      <aside class="w-60 bg-gradient-to-b from-blue-500 to-blue-600 text-white p-4">
        <h1 class="text-3xl font-bold mb-6">IM HR</h1>
        <ul class="space-y-2 text-sm">
          <li v-for="menu in menus" :key="menu">
            <button class="w-full text-left hover:underline">▼ {{ menu }}</button>
          </li>
        </ul>
      </aside>
  
      <!-- 본문 -->
      <main class="flex-1 bg-gray-50 p-8">
        <!-- 상단 헤더 -->
        <header class="flex justify-between items-center mb-8">
          <h2 class="text-2xl font-semibold">회원 프로필</h2>
          <div class="flex items-center space-x-4">
            <span class="text-lg font-semibold">홍길동 님</span>
            <span class="text-yellow-400 text-xl">🔔</span>
          </div>
        </header>
  
        <!-- 프로필 카드 -->
        <div class="bg-white shadow-md rounded-lg p-6 flex justify-between items-start">
          <!-- 왼쪽 프로필 -->
          <div class="space-y-4">
            <h3 class="text-xl font-bold">{{ user.name }}</h3>
            <p class="text-gray-500">{{ user.email }}</p>
            <select class="border rounded px-4 py-2" v-model="user.department">
              <option disabled value="">부서를 선택하세요</option>
              <option v-for="dept in departments" :key="dept">{{ dept }}</option>
            </select>
            <p class="text-sm text-gray-400 mt-4">등록일: {{ user.registeredAt }}</p>
          </div>
  
          <!-- 오른쪽 권한 -->
          <div>
            <h4 class="font-semibold mb-2">접근 권한</h4>
            <div class="grid grid-cols-2 gap-2">
              <label v-for="permission in permissions" :key="permission" class="flex items-center space-x-2">
                <input type="checkbox" v-model="user.permissions" :value="permission" />
                <span>{{ permission }}</span>
              </label>
            </div>
          </div>
        </div>
  
        <!-- 버튼 -->
        <div class="mt-8 flex justify-end space-x-4">
          <button class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded" @click="save">저장</button>
          <button class="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded" @click="terminate">탈퇴 처리</button>
        </div>
      </main>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const menus = ['회원관리', 'ESG 성과 등록', 'E56 성과 분석', '공급망진단', '리포트 관리', '처교실', '시스템러']
  
  const user = ref({
    name: '홍길동',
    email: 'admin@example.com',
    department: '',
    registeredAt: '2024.03.01',
    permissions: []
  })
  
  const departments = ['인사팀', '재무팀', 'ESG팀', '기획팀']
  
  const permissions = ['임원 권한', '사원 권한', '관리자 권한', '슈퍼 관리자 권한']
  
  const save = () => {
    alert('권한 저장 완료!')
    console.log('선택된 권한:', user.value.permissions)
  }
  
  const terminate = () => {
    const confirmed = confirm('정말 탈퇴 처리하시겠습니까?')
    if (confirmed) {
      alert('탈퇴 처리 완료')
    }
  }
  </script>
  