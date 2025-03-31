<template>
    <div class="p-6">
      <h2 class="text-2xl font-bold mb-4">권한 설정</h2>
      <AdminTabs />
  
      <PermissionTable
        v-model="permissions"
        :permissionList="['임원 권한', '관리자 권한', '사원 권한', ]"
      />
    </div>
  </template>
  
  <script setup>
  import AdminTabs from './AdminTabs.vue'
  import PermissionTable from './PermissionTable.vue'
  import { ref } from 'vue'
  
  const permissions = ref([])
  </script>
  