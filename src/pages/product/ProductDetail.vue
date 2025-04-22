<template>
  <div class="container mx-auto p-4 space-y-6">
    <h1 class="text-2xl font-bold">상품 상세 페이지</h1>
    <p class="text-gray-600">상품 ID: {{ productId }}</p>

    <!-- 상품 상세 정보 -->
    <section class="bg-white shadow-md rounded-lg p-6 space-y-4">
      <div>
        <h2 class="text-xl font-semibold">상품 이름</h2>
        <p class="text-gray-700">상품 설명</p>
      </div>
      <button class="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
        장바구니에 담기
      </button>
    </section>

    <!-- 상품 리뷰 -->
    <section>
      <h2 class="text-lg font-semibold mb-2">상품 리뷰</h2>
      <ul class="list-disc pl-5 space-y-1 text-gray-700">
        <li>리뷰 1</li>
        <li>리뷰 2</li>
        <li>리뷰 3</li>
      </ul>
    </section>

    <!-- 상품 Q&A -->
    <section>
      <h2 class="text-lg font-semibold mb-2">상품 Q&A</h2>
      <ul class="list-disc pl-5 space-y-1 text-gray-700">
        <li>Q&A 1</li>
        <li>Q&A 2</li>
        <li>Q&A 3</li>
      </ul>
    </section>
  </div>
</template>

<script>
export default {
  props: {
    productId: {
      type: [String, Number],
      required: true
    }
  },
  setup(props) {
    console.log("🔍 제품 ID:", props.productId);

    // 이후 fetchProduct 등 로직 추가 가능
    return {
      productId: props.productId
    };
  }
}
</script>
