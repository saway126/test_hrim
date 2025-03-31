<template>
    <div class="p-6">
      <h2 class="text-2xl font-bold text-blue-700 mb-6">친환경 제품 상세 보기</h2>
  
      <div class="flex flex-col md:flex-row items-start gap-8 bg-white p-6 rounded-xl shadow">
        <img :src="product.imageUrl" alt="제품 이미지" class="w-64 h-auto rounded border" />
  
        <ul class="text-gray-700 text-lg space-y-2">
          <li>제품명 : {{ product.name }}</li>
          <li>단가 : {{ product.price.toLocaleString() }} 원</li>
          <li>판매수량 : {{ product.quantity.toLocaleString() }}개</li>
          <li>친환경 제품 매출 : {{ product.ecoSales.toLocaleString() }} 만원</li>
          <li>전월 대기 증가율 : {{ product.monthlyIncrease }}%</li>
          <li>전분기 대기 증가율 : {{ product.quarterlyIncrease }}%</li>
          <li>총 매출액 : {{ product.totalSales.toLocaleString() }} 만원</li>
          <li>제품 등급 : {{ product.grade }}</li>
        </ul>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRoute } from 'vue-router'
  
  const route = useRoute()
  const productId = route.params.id
  
  const product = ref({
    id: productId,
    name: '1회용 주방 수세미',
    imageUrl: '/eco-product.png',
    price: 10000,
    quantity: 1000,
    ecoSales: 3000,
    monthlyIncrease: 3,
    quarterlyIncrease: 7,
    totalSales: 5000,
    grade: '우수'
  })
  </script>
  