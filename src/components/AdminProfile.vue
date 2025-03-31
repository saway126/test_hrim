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