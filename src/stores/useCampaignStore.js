import axios from "axios";
import { defineStore } from "pinia";

export const useCampaignStore = defineStore('campaign', {
  state: () => (
    {
      campaigns: [],
    }
  ),

  actions: {
    async register(formData) {
      const response = await axios.post("/api/campaign/register", formData);
      console.log(response.data.message);
      return response.data;
    },

    async campaignfetchMemberList(idx) {
      const response = await axios.get(`/api/campaign/memberList/${idx}`)
      console.log(response.data.message);
      this.campaigns = response.data.data;
      return response.data.data;
    },

    async campaignMemberupdate(idx, formData) {
      const response = await axios.put(`/api/campaign/update/${idx}`, formData);
      console.log(response.data.message);
      return response.data.data
    }
  }
});