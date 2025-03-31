<template>
    <div class="p-6">
      <h2 class="text-2xl font-bold mb-4">관리자 프로필</h2>
  
      <!-- ✅ 탭 메뉴 -->
      <nav class="mb-6 flex space-x-4 border-b pb-2">
        <router-link
          to="/admin/1/profile"
          class="text-sm"
          :class="$route.path.includes('/profile') ? 'text-blue-600 font-bold' : 'text-gray-500'"
        >
          프로필
        </router-link>
  
        <router-link
          to="/admin/1/permissions"
          class="text-sm"
          :class="$route.path.includes('/permissions') ? 'text-blue-600 font-bold' : 'text-gray-500'"
        >
          권한 설정
        </router-link>
  
        <router-link
          to="/admin/1/logs"
          class="text-sm"
          :class="$route.path.includes('/logs') ? 'text-blue-600 font-bold' : 'text-gray-500'"
        >
          로그 기록
        </router-link>
  
        <router-link
          to="/admin/1/deactivate"
          class="text-sm"
          :class="$route.path.includes('/deactivate') ? 'text-blue-600 font-bold' : 'text-gray-500'"
        >
          탈퇴 처리
        </router-link>
      </nav>
  
      <!-- ✅ 프로필 카드 내용 -->
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
    </div>
  </template>
  
  <script setup>
  import { useRoute } from 'vue-router'
  import ProfileCard from './ProfileCard.vue'
  </script>
