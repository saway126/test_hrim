<template>
    <div class="flex h-screen">
      <!-- 사이드바 -->
      <aside class="w-60 bg-gradient-to-b from-blue-500 to-blue-600 text-white p-4">
        <h1 class="text-3xl font-bold mb-6">IM HR</h1>
        <ul class="space-y-2 text-sm">
          <li v-for="menu in menus" :key="menu">
            <button class="w-full text-left hover:underline">
              <span class="mr-2">▼</span>{{ menu }}
            </button>
          </li>
        </ul>
      </aside>
  
      <!-- 본문 -->
      <main class="flex-1 bg-gray-50">
        <header class="flex justify-between items-center px-6 py-4 border-b bg-white">
          <div></div>
          <div class="flex items-center space-x-4">
            <span class="font-semibold text-lg">홍길동 님</span>
            <span class="text-yellow-400 text-xl">🔔</span>
          </div>
        </header>
  
        <section class="flex flex-col items-center justify-center h-full">
          <div class="w-[500px] h-[500px] border-2 border-blue-300 rounded-lg bg-white p-8">
            <div class="space-y-6 text-gray-800">
              <div><strong>이름 :</strong> {{ user.name }}</div>
              <div><strong>아이디 :</strong> {{ user.username }}</div>
              <div><strong>이메일 :</strong> {{ user.email }}</div>
              <div><strong>회사 코드 :</strong> {{ user.companyCode }}</div>
            </div>
          </div>
          <div class="mt-6 flex space-x-8">
            <button class="px-6 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
                    @click="confirmAction('approve')">승인</button>
            <button class="px-6 py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600"
                    @click="confirmAction('reject')">거절</button>
          </div>
        </section>
      </main>
  
      <!-- 모달 -->
      <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
          <p class="mb-4 text-lg font-semibold">정말 {{ modalAction === 'approve' ? '승인' : '거절' }}하시겠습니까?</p>
          <div class="flex justify-center space-x-4">
            <button class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400" @click="showModal = false">취소</button>
            <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" @click="handleAction">
              확인
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import axios from 'axios'
  
  // 메뉴 항목
  const menus = [
    '회사 정보', 'ESG 지표 관리', 'ESG 성과 등록', 'ESG 성과 분석',
    '공급망진단', '리포트 관리', '처교실', '시스템러'
  ]
  
  // 유저 데이터
  const user = ref({
    id: '',
    name: '',
    username: '',
    email: '',
    companyCode: ''
  })
  
  // 모달 관련
  const showModal = ref(false)
  const modalAction = ref('')
  
  // API로 유저 데이터 불러오기
  const fetchUserData = async () => {
    try {
      const { data } = await axios.get('/api/users/pending/1') // 예시 userId: 1
      user.value = data
    } catch (error) {
      console.error('회원 정보 불러오기 실패:', error)
    }
  }
  
  // 승인/거절 클릭 시 모달 띄우기
  const confirmAction = (action) => {
    modalAction.value = action
    showModal.value = true
  }
  
  // 확인 누르면 API 호출
  const handleAction = async () => {
    try {
      const endpoint = `/api/users/${user.value.id}/${modalAction.value}`
      await axios.post(endpoint)
      alert(`회원이 ${modalAction.value === 'approve' ? '승인' : '거절'}되었습니다.`)
      showModal.value = false
    } catch (error) {
      console.error('처리 실패:', error)
      alert('처리에 실패했습니다.')
      showModal.value = false
    }
  }
  
  // 컴포넌트 마운트 시 데이터 불러오기
  onMounted(() => {
    fetchUserData()
  })
  </script>
  
  <style scoped>
  /* 필요 시 추가 */
  </style>
  