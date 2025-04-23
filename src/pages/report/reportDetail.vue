<template>
    <div class="flex h-screen">
  
      <!-- Main Content -->
      <main class="flex-1 bg-white p-8">
        <header class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold">리포트 상세 보기</h2>
        </header>
  
        <!-- Split Layout -->
        <div class="flex gap-8">
          <!-- Left: 기본 정보 및 피드백 -->
          <section class="w-1/2 flex flex-col justify-between" :style="{ minHeight: rightSectionHeight + 'px' }">
            <!-- Report Info -->
            <div class="mb-8">
              <h3 class="text-xl font-semibold mb-2">1. 기본 정보</h3>
              <ul class="list-disc list-inside pl-4">
                <li>성명: 홍길동</li>
                <li>직급: 과장</li>
                <li>대상 기간: 2024.01 ~ 2024.03</li>
                <li>총 ESG 인사 평가 점수: 87</li>
              </ul>
            </div>
  
            <!-- Feedback -->
            <div class="mb-8">
              <h3 class="text-xl font-semibold mb-2">2. 피드백 내용</h3>
              <ul class="list-disc list-inside pl-4">
                <li>성실하고 적극적으로 참여했습니다.</li>
                <li>열심히 하는 모습이 보기 좋네요.</li>
              </ul>
            </div>
          </section>
  
          <!-- Right: 활동 내역 -->
          <section class="w-1/2" ref="rightSection">
            <h3 class="text-xl font-semibold mb-4">회원 활동 내역</h3>
            <table class="w-full border">
              <thead>
                <tr class="bg-gray-100">
                  <th class="text-left p-2">주제</th>
                  <th class="text-left p-2">날짜</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(activity, index) in activities" :key="index" class="border-t">
                  <td class="p-2">{{ activity.topic }}</td>
                  <td class="p-2">{{ activity.date }}</td>
                </tr>
              </tbody>
            </table>
            <div class="flex justify-center items-center mt-4 space-x-2">
              <button disabled class="text-gray-400">← 이전</button>
              <button class="bg-black text-white px-2 py-1 rounded">1</button>
              <button>2</button>
              <button>3</button>
              <span>...</span>
              <button>67</button>
              <button>68</button>
              <button class="text-blue-600">다음 →</button>
            </div>
          </section>
        </div>
      </main>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, nextTick } from 'vue';
  
  const activities = [
    { topic: '활동내역1', date: '2025.01.12' },
    { topic: '활동내역2', date: '2025.01.12' },
    { topic: '활동내역3', date: '2025.01.14' },
    { topic: '활동 내역 3', date: '2025.01.14' },
    { topic: '피드백 2', date: '2025.01.14' },
    { topic: '피드백 3', date: '2025.01.14' }
  ];
  
  const rightSection = ref(null);
  const rightSectionHeight = ref(0);
  
  onMounted(async () => {
    await nextTick();
    if (rightSection.value) {
      rightSectionHeight.value = rightSection.value.offsetHeight;
    }
  });
  </script>
  
  <style scoped>
  table th, table td {
    border: 1px solid #ccc;
  }
  </style>