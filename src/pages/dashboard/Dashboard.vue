<template>
    <div class="bg-gray-50 p-6 font-sans max-w-6xl mx-auto">
      <h1 class="text-2xl font-bold mb-6">
        회사 ESG <span class="text-gray-500">2022</span>
      </h1>
  
      <!-- ESG 요약 -->
      <div class="grid grid-cols-3 gap-4 mb-6">
        <div v-for="(item, index) in esgData" :key="index" class="bg-white p-4 rounded-xl shadow h-40 flex items-center justify-center relative">
          <canvas :id="`chart${item.label}`" class="w-24 h-24"></canvas>
          <div class="flex absolute bottom-2 text-center text-xl font-semibold" :style="{ color: item.color }">
            {{ item.label }} :
            <div class="text-gray-300 ml-2">{{ item.value }}</div>
          </div>
        </div>
      </div>
  
      <!-- 이달의 사원 -->
      <div class="bg-white p-4 rounded-xl shadow mb-6">
        <h2 class="text-xl font-bold mb-4">이달의 사원</h2>
        <div class="flex space-x-6">
          <div v-for="(employee, index) in employees" :key="index">
            🥇 {{ employee.name }}<br />코멘트 개수: {{ employee.comments }}
          </div>
        </div>
      </div>
  
      <div class="flex gap-4 max-w-6xl mx-auto w-full items-stretch">
        <!-- 왼쪽: 부서 리스트 -->
        <div class="bg-white rounded-xl shadow p-2 text-sm w-48 shrink-0 flex flex-col justify-between">
          <div>
            <h3 class="font-bold mb-3 text-gray-700">부서별 ESG</h3>
            <ul class="divide-y divide-gray-200 border rounded-md overflow-hidden">
              <li v-for="(dept, index) in paginatedDepartments" :key="index" class="px-3 py-2 hover:bg-gray-50 flex items-center gap-2">
                📁 {{ dept }}
              </li>
            </ul>
          </div>
          <div class="flex justify-between mt-2 text-xs text-gray-600">
            <button @click="prevPage" :disabled="currentPage === 1" class="hover:underline disabled:opacity-30">이전</button>
            <span>{{ currentPage }} / {{ totalPages }}</span>
            <button @click="nextPage" :disabled="currentPage === totalPages" class="hover:underline disabled:opacity-30">다음</button>
          </div>
        </div>
  
        <!-- 가운데: 참여율 + 그래프 -->
        <div class="bg-white rounded-xl shadow p-4 relative flex-1 min-w-0 flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between mb-4">
              <h3 class="font-bold text-lg">전체 참여율</h3>
              <span class="flex items-center justify-center space-x-4 text-gray-500 text-2xl font-semibold">
                <button class="hover:text-black transition">&lsaquo;</button>
                <span>2025.01</span>
                <button class="hover:text-black transition">&rsaquo;</button>
              </span>
            </div>
            <div class="flex flex-col items-center">
              <div class="w-48 h-48 relative mb-4">
                <canvas id="gaugeChart" class="absolute top-0 left-0 w-full h-full"></canvas>
                <div class="absolute inset-0 flex items-end justify-center pb-10 text-lg font-semibold text-green-600">
                  74.6
                </div>
              </div>
              <div class="w-full h-40">
                <canvas id="barChart"></canvas>
              </div>
            </div>
          </div>
        </div>
  
        <!-- 오른쪽: ESG 점수 -->
        <div class="flex flex-col space-y-4 w-80 shrink-0">
          <h2><strong>영역별 점수 변동 추이</strong></h2>
          <div v-for="(trend, index) in trends" :key="index" :class="`p-4 rounded-xl shadow ${trend.bg}`">
            <p class="text-xs text-gray-600 mb-1">기준대비 {{ trend.percent }}%</p>
            <h4 :class="`font-bold ${trend.color}`">{{ trend.title }}</h4>
            <p class="text-2xl font-semibold">{{ trend.score }}</p>
            <p class="text-sm text-gray-500">전년대비 ▲ {{ trend.diff }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  import Chart from 'chart.js/auto';
  
  const esgData = [
    { label: 'E', value: 55.2, color: '#D1FAE5' },
    { label: 'S', value: 73.9, color: '#DBEAFE' },
    { label: 'G', value: 80.6, color: '#EDE9FE' },
  ];
  
  const employees = [
    { name: '홍길동', comments: 100 },
    { name: '임꺽정', comments: 99 },
    { name: '너구리', comments: 98 },
  ];
  
  const departments = [
    '경영, 전략 부서',
    '영업, 마케팅 부서',
    '연구, 개발 부서',
    '생산, 품질관리 부서',
    '인사총무, 지원 부서',
    'ESG 부서',
    '재무 부서',
    '기획 부서',
    'IT 부서',
    '고객지원 부서'
  ];
  
  const itemsPerPage = 10;
  const currentPage = ref(1);
  const totalPages = computed(() => Math.ceil(departments.length / itemsPerPage));
  const paginatedDepartments = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    return departments.slice(start, start + itemsPerPage);
  });
  
  function prevPage() {
    if (currentPage.value > 1) currentPage.value--;
  }
  
  function nextPage() {
    if (currentPage.value < totalPages.value) currentPage.value++;
  }
  
  const trends = [
    { percent: 1.1, title: '환경 Environmental', score: 55.2, diff: 1.1, bg: 'bg-green-100', color: 'text-green-600' },
    { percent: 40, title: '사회 Social', score: 73.9, diff: 1.77, bg: 'bg-blue-100', color: 'text-blue-600' },
    { percent: 47, title: '지배구조 Governance', score: 80.6, diff: 2.8, bg: 'bg-purple-100', color: 'text-purple-600' }
  ];
  
  function createGaugeChart(ctx, value, color) {
    return new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['점수', '남은 비율'],
        datasets: [{
          data: [value, 100 - value],
          backgroundColor: [color, '#F4F4F4'],
          borderWidth: 0
        }]
      },
      options: {
        rotation: -90,
        cutout: '70%',
        circumference: 180,
        plugins: {
          legend: { display: false },
          tooltip: { enabled: false }
        },
        responsive: true,
        maintainAspectRatio: false,
      }
    });
  }
  
  onMounted(() => {
    esgData.forEach(item => {
      const ctx = document.getElementById(`chart${item.label}`);
      createGaugeChart(ctx, item.value, item.color);
    });
  
    new Chart(document.getElementById('gaugeChart'), {
      type: 'doughnut',
      data: {
        labels: ['참여율', '남은 비율'],
        datasets: [{
          data: [74.6, 100 - 74.6],
          backgroundColor: ['#4ade80', '#e5e7eb'],
          borderWidth: 0
        }]
      },
      options: {
        rotation: -90,
        circumference: 180,
        cutout: '70%',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { enabled: false }
        }
      }
    });
  
    new Chart(document.getElementById('barChart'), {
      type: 'bar',
      data: {
        labels: ['E', 'S', 'G'],
        datasets: [{
          label: '참여율',
          data: [74.6, 74.6, 74.6],
          backgroundColor: ['#D1FAE5', '#DBEAFE', '#EDE9FE'],
          barThickness: 40
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            ticks: { color: '#6b7280' }
          },
          x: {
            ticks: { color: '#0000' }
          }
        },
        plugins: {
          legend: { display: false },
          customLabelColor: {
            colors: ['#D1FAE5', '#DBEAFE', '#EDE9FE']
          }
        },
        responsive: true,
        maintainAspectRatio: false
      },
      plugins: [{
        id: 'customLabelColor',
        afterDraw: chart => {
          const { ctx, chartArea, scales } = chart;
          const xAxis = scales.x;
          const yBottom = chartArea.bottom + 20;
          const labels = chart.data.labels;
          const colors = chart.options.plugins.customLabelColor.colors;
          labels.forEach((label, i) => {
            const x = xAxis.getPixelForTick(i);
            ctx.fillStyle = colors[i];
            ctx.font = 'bold 14px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(label, x, yBottom);
          });
        }
      }]
    });
  });
  </script>
  
  <style scoped>
  </style>