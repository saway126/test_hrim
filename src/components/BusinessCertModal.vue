<template>
    <!-- 배경 + 중앙 정렬 -->
    <div class="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div class="bg-white rounded-lg shadow-lg p-8 w-[500px] max-w-full">
        <h2 class="text-center text-xl font-semibold mb-6">사업자 등록 증명</h2>
  
        <!-- 이미지 -->
        <div class="flex justify-center space-x-4 mb-4">
          <img :src="sampleTrue" alt="사업자등록증명원" class="w-28 border rounded shadow" />
          <img :src="sampleFalse" alt="사업자등록증 X" class="w-28 border rounded shadow opacity-50" />
        </div>
  
        <!-- 사업자번호 입력 -->
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">사업자등록번호</label>
          <input v-model="businessNumber" type="text" maxlength="10"
                 placeholder="사업자 등록번호 직접 입력 (10자리)"
                 class="w-full border px-4 py-2 rounded focus:outline-none focus:ring focus:ring-blue-200" />
        </div>
  
        <!-- 파일 선택 + 인증 나중에 -->
        <div class="text-center space-y-2">
          <input type="file" ref="fileInput" @change="handleFileUpload" class="hidden" />
          <button @click="$refs.fileInput.click()" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">파일 선택</button>
  
          <div class="flex justify-center items-center space-x-2 mt-2">
            <input type="checkbox" v-model="defer" id="defer" />
            <label for="defer" class="text-sm">다음에 인증할게요</label>
          </div>
        </div>
  
        <!-- 버튼 -->
        <div class="flex justify-end space-x-4 mt-6">
          <button @click="$emit('close')" class="text-gray-600 hover:underline">취소</button>
          <button @click="submit" class="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">확인</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import sampleTrue from '@/assets/sample_cert_true.png'
  import sampleFalse from '@/assets/sample_cert_false.png'
  
  const emit = defineEmits(['close', 'submit'])
  
  const businessNumber = ref('')
  const defer = ref(false)
  
  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    console.log('첨부된 파일:', file)
  }
  
  const submit = () => {
    if (!businessNumber.value && !defer.value) {
      alert('사업자번호를 입력하거나 다음에 인증할게요를 체크해주세요.')
      return
    }
  
    emit('submit', {
      businessNumber: businessNumber.value,
      defer: defer.value
    })
  
    emit('close')
  }
  </script>
  