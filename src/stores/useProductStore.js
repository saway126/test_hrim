// src/stores/useProductStore.js
import { defineStore } from 'pinia';
import axios from 'axios';

export const useProductStore = defineStore('product', {
  state: () => ({
    productList: [],
  }),

  actions: {
    /**
     * ✅ 제품 등록
     */
    async regist(formData) {
      try {
        const response = await axios.post("/api/product/regist", formData, {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        });
        return response.data;
      } catch (error) {
        console.error("제품 등록 실패", error);
        throw error;
      }
    },

    /**
     * ✅ 회사별 제품 리스트 조회
     */
    async listByCompany(companyIdx) {
      try {
        const response = await axios.get(`/api/product/company/${companyIdx}`);
        this.productList = response.data.data;
      } catch (error) {
        console.error("제품 리스트 조회 실패", error);
      }
    },

    /**
     * ✅ 페이지네이션 포함 제품 전체 리스트 (사용 안할 시 생략 가능)
     */
    async list(page = 1, size = 5) {
      try {
        const response = await axios.get(`/api/product/product?page=${page}&size=${size}`);
        this.productList = response.data.data;
      } catch (error) {
        console.error("페이지 제품 리스트 조회 실패", error);
      }
    },
  },
});
