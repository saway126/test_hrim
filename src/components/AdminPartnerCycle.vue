<template>
    <div class="p-6">
      <h2 class="text-2xl font-bold mb-4">협력사 갱신 주기 설정</h2>
      <AdminTabs />
  
      <div class="bg-white p-6 rounded-xl shadow space-y-4">
        <label class="block font-semibold mb-1">갱신 주기 선택</label>
        <select v-model="partnerCycle" class="w-full border p-2 rounded">
          <option value="yearly">1년</option>
          <option value="half">반기</option>
          <option value="quarter">분기</option>
        </select>
  
        <button class="bg-blue-600 text-white px-4 py-2 rounded" @click="savePartnerCycle">
          저장
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import AdminTabs from './AdminTabs.vue'
  import { ref } from 'vue'
  
  const partnerCycle = ref('yearly')
  
  const savePartnerCycle = () => {
    console.log('[SALES_PARTNER_01] 협력사 주기 저장:', partnerCycle.value)
    // TODO: axios.post('/api/partner-cycle', { cycle: partnerCycle.value })
  }
  </script>
  