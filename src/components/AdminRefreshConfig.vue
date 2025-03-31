<template>
    <div class="p-6">
      <h2 class="text-2xl font-bold mb-4">갱신 주기 설정</h2>
      <AdminTabs />
  
      <div class="bg-white p-6 rounded-xl shadow space-y-4">
        <div>
          <label class="block font-semibold mb-1">갱신 주기</label>
          <select v-model="selectedCycle" class="w-full border rounded p-2">
            <option value="daily">매일</option>
            <option value="weekly">매주</option>
            <option value="monthly">매월</option>
            <option value="custom">직접 설정</option>
          </select>
        </div>
  
        <div v-if="selectedCycle === 'weekly' || selectedCycle === 'custom'">
          <label class="block font-semibold mb-1">요일 선택</label>
          <select v-model="selectedDay" class="w-full border rounded p-2">
            <option value="mon">월요일</option>
            <option value="tue">화요일</option>
            <option value="wed">수요일</option>
            <option value="thu">목요일</option>
            <option value="fri">금요일</option>
          </select>
        </div>
  
        <div>
          <label class="block font-semibold mb-1">시간 선택</label>
          <input type="time" v-model="selectedTime" class="w-full border rounded p-2" />
        </div>
  
        <button class="mt-4 bg-blue-600 text-white px-4 py-2 rounded" @click="saveConfig">
          저장하기
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import AdminTabs from './AdminTabs.vue'
  import { ref } from 'vue'
  
  const selectedCycle = ref('weekly')
  const selectedDay = ref('mon')
  const selectedTime = ref('09:00')
  
  const saveConfig = () => {
    console.log('주기:', selectedCycle.value)
    console.log('요일:', selectedDay.value)
    console.log('시간:', selectedTime.value)
    // TODO: axios로 API 전송
  }
  </script>
  