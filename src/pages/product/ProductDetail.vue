<script setup>
const props = defineProps({ productId: [String, Number] });
console.log("🔍 제품 ID:", props.productId);
</script>
<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">상품 상세 페이지</h1>
    <p>상품 ID: {{ productId }}</p>
    <!-- 상품 상세 정보 표시 -->
    <div class="bg-white shadow-md rounded-lg p-6">
      <h2 class="text-xl font-semibold mb-2">상품 이름</h2>
      <p class="text-gray-700">상품 설명</p>
      <button class="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
        장바구니에 담기
      </button>
    </div>
  </div>
    <div class="mt-4">
      <h2 class="text-lg font-semibold">상품 리뷰</h2>
      <ul class="list-disc pl-5">
        <li>리뷰 1</li>
        <li>리뷰 2</li>
        <li>리뷰 3</li>
      </ul>
    </div>
    <div class="mt-4">
      <h2 class="text-lg font-semibold">상품 Q&A</h2>
      <ul class="list-disc pl-5">
        <li>Q&A 1</li>
        <li>Q&A 2</li>
        <li>Q&A 3</li>
      </ul>