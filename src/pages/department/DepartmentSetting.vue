<script setup>
import { onMounted, readonly, ref } from 'vue'
import { useDepartmentStore } from '../../stores/useDepartmentStore'
import { useRouter } from 'vue-router';

const router = useRouter();
const departmentStore = useDepartmentStore();
const departments = ref([{ name: '' }]);
const createDepartments = ref([]);
const deleteDepartments = ref([]);

const addDepartment = () => {
  departments.value.push({ idx:'', name: '' });
}

const removeDepartment = (index, idx) => {
  if(idx !== '') {
    deleteDepartments.value.push({idx: idx});
  }
  departments.value.splice(index, 1);
}

const saveForm = async () => {
  createDepartments.value = departments.value.filter(dept => dept.idx === '').map(dept => dept.name);
  console.log('부서 저장:', createDepartments.value, deleteDepartments.value);
  const response = await departmentStore.updateDepartments(
    {createRequests : createDepartments.value, deleteRequests: deleteDepartments.value}
  );
  if(response.data.isSuccess) {
    alert('부서가 저장되었습니다!');
    router.go(0);
  }
}

onMounted(async () => { 
  const response = await departmentStore.fetchDepartments();
  departments.value = response.data.data.departments;
})
</script>

<template>
  <div class="bg-gray-50 p-8">
    <h2 class="text-2xl font-bold mb-6">부서 설정</h2>

    <div v-for="(dept, index) in departments" :key="dept.idx" class="mb-6 border-b pb-6">
      <label class="block font-bold mb-1">부서 {{ index + 1 }}</label>
      <label class="block text-gray-700">부서 명 :</label>
      <input
        v-model="dept.name"
        type="text"
        :readonly="dept.idx !== ''"
        class="border border-gray-300 p-2 rounded w-full mb-3"
        placeholder="부서명을 입력하세요"
      />
      <div class="flex justify-end">
        <button
          class="bg-red-500 text-white px-4 py-1 rounded"
          @click="removeDepartment(index, dept.idx)"
        >
          부서 삭제
        </button>
      </div>
    </div>

    <div class="mb-6">
      <button class="bg-blue-600 text-white px-6 py-2 rounded" @click="addDepartment">
        부서 추가
      </button>
    </div>

    <div class="flex justify-end">
      <button class="bg-green-600 text-white px-6 py-2 rounded" @click="saveForm">
        저장
      </button>
    </div>
  </div>
</template>