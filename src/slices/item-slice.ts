import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Item {
  id: string;
  name: string;
  type: string;
  category?: string;
  serialNumber: string;
  barcode: string;
  assignedTo?: string;
  locationId: string;
  status: string;
  stock?: number;
  minimumStock?: number;
  unit?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface ItemState {
    currentItem: Item | null;
    items: Item[];
    searchResults: Item[];
    isLoading: boolean;
    error: string | null;
}

const initialState: ItemState = {
    currentItem: null,
    items: [],
    searchResults: [],
    isLoading: false,
    error: null,
}

const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    setCurrentItem: (state, action: PayloadAction<Item | null>) => {
        state.currentItem = action.payload;
    },
    setItems: (state, action: PayloadAction<Item[]>) => {
        state.items = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
        state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
        state.error = action.payload;
    }
  },    
});

export const {
  setCurrentItem,
  setItems,
  setLoading,
  setError
} = itemSlice.actions

export const selectCurrentItem = (state: {items: ItemState}) => state.items.currentItem;
export const selectAllItems = (state: {items: ItemState}) => state.items.items;
export const selectItemsLoading = (state: {items: ItemState}) => state.items.isLoading;
export const selectItemsError = (state: {items: ItemState}) => state.items.error;   

export default itemSlice.reducer;