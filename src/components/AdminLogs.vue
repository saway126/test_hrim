<template>
    <div class="p-6">
      <h2 class="text-2xl font-bold mb-4">로그 기록</h2>
      <AdminTabs />
  
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
  </template>
  
  <script setup>
  import AdminTabs from './AdminTabs.vue'
  </script>
  