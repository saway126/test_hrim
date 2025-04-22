<script setup>
import { ref, reactive, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import { useProductStore } from '../../stores/useProductStore';

const router = useRouter();
const route = useRoute();
const productStore = useProductStore();

const idx = route.query.idx;
const mode = ref(route.query.mode || (idx ? "view" : "create"));

const form = reactive({
  idx: "",
  productName: "",
  ecoCertified: false,
  certificationType: "",
  energyGrade: "1등급",
  recyclable: false,
  bioMaterial: false,
  lowCarbonProcess: false,
  unitPrice: 0,
  salesQty: 0,
  imagePath: "",
  companyIdx: "",
  serialNumber: "",
  growthRate: 0,

});

const imageFile = ref(null);
const handleFileChange = (e) => { imageFile.value = e.target.files[0]; };

onMounted(async () => {
  if (mode.value !== "create" && idx) {
    try {
      const res = await axios.get(`/api/product/detail/${idx}`);
      console.log(res.data.data);// Debugging line
      const data = res.data.data;
      form.productName = data.productName;//제품명
      form.idx = data.idx;//제품 고유idx
      form.ecoCertified = data.ecoCertified;//환경 인증 여부
      form.certificationType = data.certificationType;//인증 종류
      form.energyGrade = data.energyGrade;// 에너지 효율 등급
      form.recyclable = data.recyclable;// 재활용 가능 여부
      form.bioMaterial = data.bioMaterial;// 생분해성 소재 여부
      form.lowCarbonProcess = data.lowCarbonProcess;// 탄소 저감형 공정 여부
      form.unitPrice = data.unitPrice;// 단가
      form.salesQty = data.salesQty;// 판매 수량
      form.imgePath = data.imgePath;// 이미지 경로 (서버에서 처리)
      form.companyIdx = data.companyIdx;// 회사 고유 idx
      form.serialNumber = data.serialNumber;// 시리얼 넘버
    } catch (err) {
      alert("데이터 불러오기 실패");
    }
  }
});

const handleSubmit = async () => {
  if (!imageFile.value) return alert("이미지를 선택해주세요.");

  const dto = {
    productIdx: form.idx, //제품 고유idx
    productName: form.productName, //제품명
    ecoCertified: form.ecoCertified, //환경 인증 여부
    certificationType: form.certificationType, //인증 종류
    energyGrade: form.energyGrade, // 에너지 효율 등급
    recyclable: form.recyclable, // 재활용 가능 여부
    bioMaterial: form.bioMaterial, // 생분해성 소재 여부
    lowCarbonProcess: form.lowCarbonProcess, // 탄소 저감형 공정 여부
    unitPrice: form.unitPrice, // 단가
    salesQty: form.salesQty, // 판매 수량
    imgePath: form.imagePath, // 이미지 경로 (서버에서 처리)
    companyIdx: form.companyIdx, // 회사 고유 idx
    serialNumber: form.serialNumber, // 시리얼 넘버
  };
  console.log("DTO:", dto); // Debugging line
  console.log("Image File:", imageFile.value); // Debugging line
  console.log("Form:", form); // Debugging line
  console.log("idx:", idx); // Debugging line
  const formData = new FormData();
  formData.append("dto", new Blob([JSON.stringify(dto)], { type: "application/json" }));
  console.log("FormData:", formData); // Debugging line
  console.log("FormData Image File:", imageFile.value); // Debugging line
  //formData.append("image", imageFile.value);

  try {
    await axios.put(`/api/product/${idx}`, form);
    alert("등록 완료!");
    router.push(`/productList/${form.companyIdx}`);
  } catch (err) {
    alert("등록 실패. 콘솔을 확인해주세요.");
    console.error(err);
  }
};

const handleUpdate = async () => {
  try {
    await axios.put(`/api/product/${idx}`, form);
    alert("수정 완료!");
    router.push(`/productList/${form.companyIdx}`);
  } catch (err) {
    alert("수정 실패");
  }
};

const handleDelete = async () => {
  if (confirm("정말 삭제하시겠습니까?")) {
    try {
      await axios.delete(`/api/product/${idx}`);
      alert("삭제 완료!");
      router.push(`/productList/${form.idx}`);
    } catch (err) {
      alert("삭제 실패");
    }
  }
};
</script>
<template>
  <div class="bg-gray-50 p-10 min-h-screen">
    <pre class="bg-gray-100 p-4 rounded mt-10 text-sm">{{ product }}</pre>
    <div class="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow">
      <h2 class="text-blue-600 font-semibold mb-6">
        {{ mode === 'edit' ? '제품 수정' : mode === 'view' ? '제품 상세 보기' : '제품 등록' }}
      </h2>

      <form class="space-y-5" @submit.prevent="mode === 'edit' ? handleUpdate() : handleSubmit()">
        <!-- 제품 이름 -->
        <div>
          <label class="block font-medium" for="productName">제품 이름</label>
          <input
            id="productName"
            v-model="form.productName"
            :disabled="mode === 'view'"
            type="text"
            class="w-full border rounded px-3 py-2 mt-1"
          />
        </div>

        <!-- 시리얼 넘버 -->
        <div>
          <label class="block font-medium" for="serialNumber">시리얼 넘버</label>
          <input
            id="serialNumber"
            v-model="form.serialNumber"
            :disabled="mode === 'view'"
            type="text"
            class="w-full border rounded px-3 py-2 mt-1"
          />
        </div>

        <!-- 환경 인증 여부 -->
        <div class="flex items-center gap-2">
          <label class="font-medium">환경 인증 여부</label>
          <input v-model="form.ecoCertified" :disabled="mode === 'view'" type="checkbox" />
        </div>

        <!-- 인증 타입 -->
        <div>
          <label class="block font-medium" for="certificationType">환경 인증 타입</label>
          <input
            id="certificationType"
            v-model="form.certificationType"
            :disabled="mode === 'view'"
            type="text"
            class="w-full border rounded px-3 py-2 mt-1"
          />
        </div>

        <!-- 에너지 효율 등급 -->
        <div>
          <label class="block font-medium">에너지 효율 등급</label>
          <select
            v-model="form.energyGrade"
            :disabled="mode === 'view'"
            class="w-full border rounded px-3 py-2 mt-1"
          >
            <option value="1등급">1등급</option>
            <option value="2등급">2등급</option>
            <option value="3등급">3등급</option>
            <option value="4등급">4등급</option>
            <option value="5등급">5등급</option>
          </select>
        </div>

        <!-- 재활용 가능 여부 -->
        <div class="flex items-center gap-2">
          <label class="font-medium">재활용 가능 여부</label>
          <input v-model="form.recyclable" :disabled="mode === 'view'" type="checkbox" />
        </div>

        <!-- 생분해/친환경 원료 -->
        <div class="flex items-center gap-2">
          <label class="font-medium">생분해/친환경 원료</label>
          <input v-model="form.bioMaterial" :disabled="mode === 'view'" type="checkbox" />
        </div>

        <!-- 탄소 저감형 공정 여부 -->
        <div class="flex items-center gap-2">
          <label class="font-medium">탄소 저감형 공정 여부</label>
          <input v-model="form.hasLowCarbonProcess" :disabled="mode === 'view'" type="checkbox" />
        </div>

        <!-- 단가 -->
        <div>
          <label class="block font-medium" for="unitPrice">단가</label>
          <input
            id="unitPrice"
            v-model.number="form.unitPrice"
            :disabled="mode === 'view'"
            type="number"
            class="w-full border rounded px-3 py-2 mt-1"
          />
        </div>

        <!-- 판매 수량 -->
        <div>
          <label class="block font-medium" for="salesQty">판매 수량</label>
          <input
            id="salesQty"
            v-model.number="form.salesQty"
            :disabled="mode === 'view'"
            type="number"
            class="w-full border rounded px-3 py-2 mt-1"
          />
        </div>

        <!-- 증가율 -->
        <div>
          <label class="block font-medium" for="growth">전월/전분기 증가율</label>
          <input
            id="growth"
            v-model="form.growthRate"
            :disabled="mode === 'view'"
            type="text"
            class="w-full border rounded px-3 py-2 mt-1"
          />
        </div>

        <!-- 이미지 업로드 -->
        <div v-if="mode !== 'view'">
          <label class="block font-medium">제품 이미지</label>
          <input type="file" @change="handleFileChange" class="mt-1" />
        </div>

        <!-- 버튼 -->
        <div class="flex justify-end gap-3 pt-4">
          <button
            v-if="mode === 'create'"
            class="bg-green-600 text-white px-4 py-2 rounded"
            type="submit"
          >
            등록
          </button>

          <button
            v-if="mode === 'edit'"
            class="bg-blue-600 text-white px-4 py-2 rounded"
            type="submit"
          >
            수정
          </button>

          <button
            v-if="mode !== 'create'"
            class="bg-red-600 text-white px-4 py-2 rounded"
            @click="handleDelete"
          >
            삭제
          </button>

          <button
            @click="$router.push('/productList')"
            class="border border-gray-400 px-4 py-2 rounded hover:bg-gray-100"
          >
            취소
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
