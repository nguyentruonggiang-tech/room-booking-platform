import { axiosInstance } from "@/services/axios";
import { API_ENDPOINTS } from "@/services/endpoints";
import type { PhanTrang, ViTriViewModel } from "@/features/locations/types/location.type";

export const locationService = {
  getPaging: (pageIndex = 1, pageSize = 12, keyword = ""): Promise<PhanTrang<ViTriViewModel>> =>
    axiosInstance
      .get(`${API_ENDPOINTS.locations}/phan-trang-tim-kiem`, {
        params: { pageIndex, pageSize, keyword },
      })
      .then((res) => res.data.content),
};
