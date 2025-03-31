<template>
    <div class="p-6">
      <h2 class="text-2xl font-bold mb-4">권한 설정</h2>
      <AdminTabs />
  
      <PermissionTable
        v-model="permissions"
        :permissionList="['ESG 지표 관리', '리포트 관리', '시스템 설정', '사용자 관리']"
      />
    </div>
  </template>
  
  <script setup>
  import AdminTabs from './AdminTabs.vue'
  import PermissionTable from './PermissionTable.vue'
  import { ref } from 'vue'
  
  const permissions = ref([])
  </script>
  