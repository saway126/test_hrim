<template>
    <div class="p-6">
      <h2 class="text-2xl font-bold mb-4">탈퇴 처리</h2>
      <AdminTabs />
  
      <textarea
        placeholder="탈퇴 사유를 입력하세요..."
        class="w-full p-3 border rounded-md mb-4"
      ></textarea>
      <button class="bg-red-500 text-white px-4 py-2 rounded">탈퇴 처리</button>
    </div>
  </template>
  
  <script setup>
  import AdminTabs from './AdminTabs.vue'
  </script>
  