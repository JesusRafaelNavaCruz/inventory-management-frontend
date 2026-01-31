import { apiSlice } from "./apiSlice";

interface Item {
  name: string;
  type: string;
  category?: string;
  serialNumber: string;
  barcode: string;
  assignedTo?: string;
  locationId: string;
  status: string;
  stock?: number;
  minimunStock?: number;
  unit?: string;
}

interface ItemResponse {
  items: Item[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
    nextPage: number;
  };
}

export const itemApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getItems: builder.query<ItemResponse, { offset?: number; limit?: number }>({
      query: (params = {}) => {
        const { offset = 0, limit = 10 } = params;
        return `/items?offset=${offset}&limit=${limit}`;
      },
      providesTags: ["Items"],
    }),
    getItem: builder.query<Item, string>({
        query: (id) => `/items/${id}`, 
        providesTags: ["Items"],
    })
  }),
});

export const {useGetItemQuery, useGetItemsQuery, useLazyGetItemQuery, useLazyGetItemsQuery} = itemApiSlice
