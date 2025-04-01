<template>
    <div class="grid grid-cols-1 gap-6 p-4 max-w-4xl mx-auto">
      <!-- ESG 실천 기록 카드 -->
      <div class="bg-white rounded-xl shadow p-4 space-y-4">
        <h2 class="text-xl font-semibold">나의 ESG 실천 현황</h2>
        <div class="space-y-2">
          <p>이번 달 점수: <strong>75점</strong></p>
          <progress class="w-full" :value="75" max="100">75%</progress>
        </div>
        <div class="grid grid-cols-2 gap-2">
          <button class="border rounded px-4 py-2">텀블러 사용</button>
          <button class="border rounded px-4 py-2">대중교통 이용</button>
          <button class="border rounded px-4 py-2">종이 없는 회의</button>
          <button class="border rounded px-4 py-2">잔반 줄이기</button>
        </div>
        <button class="w-full bg-blue-600 text-white py-2 rounded">오늘 실천 완료 기록하기</button>
      </div>
  
      <!-- 부서별 점수 랭킹 -->
      <div class="bg-white rounded-xl shadow p-4">
        <h2 class="text-xl font-semibold mb-4">부서별 ESG 점수 랭킹</h2>
        <BarChart :chart-data="chartData" :options="chartOptions" class="h-64" />
      </div>
  
      <!-- ESG 카테고리 대시보드 -->
      <div>
        <div class="grid grid-cols-3 gap-2 mb-2">
          <button @click="activeTab = 'eco'" :class="tabButtonClass('eco')">환경</button>
          <button @click="activeTab = 'social'" :class="tabButtonClass('social')">사회</button>
          <button @click="activeTab = 'gov'" :class="tabButtonClass('gov')">지배구조</button>
        </div>
        <div v-if="activeTab === 'eco'" class="bg-white rounded-xl shadow p-4 mt-4">
          환경 점수 분석 그래프
        </div>
        <div v-if="activeTab === 'social'" class="bg-white rounded-xl shadow p-4 mt-4">
          사회적 책임 활동 통계
        </div>
        <div v-if="activeTab === 'gov'" class="bg-white rounded-xl shadow p-4 mt-4">
          준법 및 컴플라이언스 활동 분석
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { Bar } from 'vue-chartjs'
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale
  } from 'chart.js'
  
  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
  
  const activeTab = ref('eco')
  
  const tabButtonClass = (tab) => {
    return `rounded px-4 py-2 text-center border ${activeTab.value === tab ? 'bg-blue-500 text-white' : 'bg-white'}`
  }
  
  const chartData = {
    labels: ['1팀', '2팀', '3팀'],
    datasets: [
      {
        label: '점수',
        backgroundColor: '#3b82f6',
        data: [80, 92, 65]
      }
    ]
  }
  
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
  
  const BarChart = Bar
  </script>
  
  <style scoped>
  button:focus {
    outline: none;
  }
  </style>
  