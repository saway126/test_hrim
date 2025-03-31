<template>
    <div class="p-6">
      <h2 class="text-2xl font-bold mb-4">리포트 상세 보기</h2>
  
      <div class="bg-white p-6 rounded-xl shadow space-y-4">
        <!-- 1. 기본 정보 -->
        <section>
          <h3 class="text-lg font-semibold">1. 기본 정보</h3>
          <p>성명: {{ report.name }}</p>
          <p>직급: {{ report.rank }}</p>
          <p>대상 기간: {{ report.period }}</p>
          <p>총 ESG 점수: {{ report.esgScore }}</p>
          <p>ESG 등급: {{ report.esgGrade }}</p>
        </section>
  
        <!-- 2. 활동 내역 -->
        <section>
          <h3 class="text-lg font-semibold">2. 활동 기반 활동 내역</h3>
          <ul class="list-disc list-inside">
            <li v-for="(activity, index) in report.activities" :key="index">{{ activity }}</li>
          </ul>
        </section>
  
        <!-- 3. 정성적 평가 -->
        <section>
          <h3 class="text-lg font-semibold">3. 정성적 평가</h3>
          <p>{{ report.feedback }}</p>
        </section>
  
        <!-- 4. 성과 및 영향도 분석 -->
        <section>
          <h3 class="text-lg font-semibold">4. 성과 및 영향도 분석</h3>
          <ul class="list-disc list-inside">
            <li>ESG 순위: {{ report.esgRank }}</li>
            <li>평균 대비 참여율: {{ report.participation }}%</li>
            <li>ESG 성장 곡선: {{ report.growth }}</li>
          </ul>
        </section>
  
        <!-- 5. 종합 평가 -->
        <section>
          <h3 class="text-lg font-semibold">5. 종합 평가</h3>
          <p>등급 총평: {{ report.summary }}</p>
          <p>교육/행동 제안: {{ report.recommendation }}</p>
        </section>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRoute } from 'vue-router'
  
  const route = useRoute()
  const reportId = route.params.id
  
  // 임시 더미 데이터
  const report = ref({
    name: '홍길동',
    rank: '과장',
    period: '2024.01 ~ 2024.03',
    esgScore: 87,
    esgGrade: 'A',
    activities: ['ESG 캠페인 참여', '기부 활동', '사내 교육 수료'],
    feedback: '성실하고 적극적으로 참여했습니다.',
    esgRank: '상위 10%',
    participation: 92,
    growth: '꾸준한 성장 추세',
    summary: '우수한 ESG 성과를 보였습니다.',
    recommendation: 'ESG 리더 양성 교육 추천'
  })
  </script>
  