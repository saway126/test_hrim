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
        <!-- 헤더 -->
        <header class="flex justify-end items-center px-6 py-4 border-b bg-white">
          <span class="text-lg font-semibold">홍길동 님</span>
          <span class="text-yellow-400 text-xl ml-4">🔔</span>
        </header>
  
        <!-- 검색창 -->
        <div class="flex justify-center mt-8 mb-4">
          <div class="flex items-center space-x-2 w-1/2">
            <input type="text" v-model="searchText" placeholder="아이디로 검색" class="w-full px-4 py-2 border rounded" />
            <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" @click="searchUser">검색</button>
          </div>
        </div>
  
        <!-- 테이블 -->
        <div class="mx-8 bg-white rounded-lg overflow-hidden">
          <table class="w-full text-center border-collapse">
            <thead class="border-b text-gray-700">
              <tr class="bg-gray-100">
                <th class="py-3">순번</th>
                <th>상태</th>
                <th>아이디</th>
                <th>이름</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(user, index) in filteredUsers" :key="user.id" class="border-b hover:bg-gray-50">
                <td class="py-2">{{ user.order }}</td>
                <td>
                  <span
                    class="px-2 py-1 rounded text-white text-sm font-semibold"
                    :class="{
                      'bg-gray-500': user.status === '대기 중',
                      'bg-green-500': user.status === '승인',
                      'bg-red-500': user.status === '승인 반려'
                    }"
                  >
                    {{ user.status }}
                  </span>
                </td>
                <td>{{ user.id }}</td>
                <td>{{ user.name }}</td>
              </tr>
            </tbody>
          </table>
        </div>
  
        <!-- 페이지네이션 (디자인용, 기능 X) -->
        <div class="flex justify-center mt-6 text-sm">
          <button class="px-2">&larr; 이전</button>
          <button v-for="page in 5" :key="page" class="px-2" :class="{ 'font-bold': page === 1 }">{{ page }}</button>
          <span class="px-2">...</span>
          <button class="px-2">다음 &rarr;</button>
        </div>
      </main>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  
  const menus = ['회원관리', 'ESG 성과 등록', 'ESG 성과 분석', '공급망진단', '리포트 관리', '처교실', '시스템러']
  
  const searchText = ref('')
  
  const users = ref([
    { order: 7, status: '대기 중', id: 'test7', name: 'test7' },
    { order: 6, status: '대기 중', id: 'test6', name: 'test6' },
    { order: 5, status: '승인 반려', id: 'test5', name: 'test5' },
    { order: 4, status: '승인', id: 'test4', name: 'test4' },
    { order: 3, status: '승인', id: 'test3', name: 'test3' },
    { order: 2, status: '승인', id: 'test2', name: 'test2' },
    { order: 1, status: '승인', id: 'test1', name: 'test1' },
    { order: 0, status: '승인', id: 'test', name: 'test' }
  ])
  
  const filteredUsers = computed(() => {
    return users.value.filter(u => u.id.includes(searchText.value))
  })
  
  const searchUser = () => {
    // 실제 API 연동 시 axios로 검색 호출 가능
    console.log(`검색: ${searchText.value}`)
  }
  </script>
  