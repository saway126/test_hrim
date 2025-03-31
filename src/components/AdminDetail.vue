<template>
    <div class="flex flex-col lg:flex-row">
      <aside class="w-full lg:w-64 bg-blue-600 text-white min-h-screen p-4">
        <h1 class="text-2xl font-bold mb-6">IM HR</h1>
        <!-- 사이드 메뉴 생략 -->
      </aside>
  
      <main class="flex-1 bg-gray-100 p-8">
        <div class="mb-6">
          <h2 class="text-2xl font-semibold">관리자 상세</h2>
          <p class="text-gray-500">홈 > 시스템관리 > 관리자 목록 > 관리자 상세</p>
        </div>
  
        <ProfileCard
          name="홍길동"
          email="admin@example.com"
          phone="010-1234-5678"
          team="인사관리팀"
          role="시스템 관리자"
          status="활성"
          createdAt="2024.03.01"
          profileImage="/profile.png"
        />
  
        <Tabs v-model="activeTab" :tabs="['권한 설정', '로그 기록', '탈퇴 처리']" />
  
        <PermissionTable
          v-if="activeTab === '권한 설정'"
          v-model="permissions"
          :permissionList="['ESG 지표 관리', '리포트 관리', '시스템 설정', '사용자 관리']"
        />
  
        <div v-if="activeTab === '로그 기록'" class="bg-white p-6 rounded-xl shadow">
          <h4 class="text-lg font-semibold mb-4">로그 기록</h4>
          <table class="w-full text-sm text-left border">
            <thead>
              <tr class="bg-gray-100">
                <th class="p-2">날짜</th>
                <th class="p-2">IP</th>
                <th class="p-2">활동 내용</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="p-2">2025-03-30</td>
                <td class="p-2">192.168.0.1</td>
                <td class="p-2">로그인</td>
              </tr>
            </tbody>
          </table>
        </div>
  
        <div v-if="activeTab === '탈퇴 처리'" class="bg-white p-6 rounded-xl shadow">
          <h4 class="text-lg font-semibold mb-2">탈퇴 처리</h4>
          <textarea placeholder="탈퇴 사유를 입력하세요..." class="w-full p-3 border rounded-md mb-4"></textarea>
          <button class="bg-red-500 text-white px-4 py-2 rounded">탈퇴 처리</button>
        </div>
      </main>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import ProfileCard from './ProfileCard.vue'
  import Tabs from './Tabs.vue'
  import PermissionTable from './PermissionTable.vue'
  
  const activeTab = ref('권한 설정')
  const permissions = ref([])
  </script>
  