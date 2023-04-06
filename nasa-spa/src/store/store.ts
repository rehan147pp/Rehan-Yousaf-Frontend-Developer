import { Action, PayloadAction, Store, configureStore, createSlice } from "@reduxjs/toolkit";
import { Capsule as Capsule } from "../interfaces/capsule.interface";

export interface AppState {
  capsules: Capsule[];
  loading: boolean;
  filterValues: {
    originalLaunchUnix: number | null;
    type: string;
    status: string;
  };
  currentPage: number;
  pageSize: 5 | 10 | 20 | 50;
  totalFilteredCapsules: number;
  filteredCapsules: Capsule[];
  authenticated: boolean;
}

const initialState: AppState = {
  authenticated: false,
  capsules: [],
  loading: false,
  filterValues: {
    originalLaunchUnix: -1,
    type: '',
    status: ''
  },
  currentPage: 0,
  pageSize: 20,
  totalFilteredCapsules: 0,
  filteredCapsules: []
};

const capsulesSlice = createSlice({
  name: 'capsules',
  initialState,
  reducers: {
    setAuthenticated: (state: AppState, action: PayloadAction<boolean>) => {
      state.authenticated = action.payload;
    },
    setCapsules: (state: AppState, action: PayloadAction<Capsule[]>) => {
      state.capsules = action.payload;
      state.filteredCapsules = state.capsules.slice(0, state.pageSize);
      state.currentPage = 0;
      state.totalFilteredCapsules = state.filteredCapsules.length;
    },
    setIsLoading: (state: AppState, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    applyFilter: (state: AppState, action: PayloadAction<{
      originalLaunchUnix: number | null;
      type: string;
      status: string;
    }>) => {
      console.log('action payload', action.payload);
      state.filterValues = action.payload;
      state.filteredCapsules = state.capsules.filter(
        (c) => {
          if(!state.filterValues.status) {
            return true;
          }
          console.log(c.status, 'includes', state.filterValues.status);
          return c.status.trim().toLowerCase().includes(state.filterValues.status);
        }
      ).filter(
        (c) => {
          if(!state.filterValues.type) {
            return true;
          }
          console.log(c.type, 'includes', state.filterValues.type);
          return c.type.trim().toLowerCase().includes(state.filterValues.type);
        }
      ).filter(
        (c) => {
          if(!state.filterValues.originalLaunchUnix) {
            return true;
          }
          return new Date(c.original_launch_unix).toDateString() == new Date(state.filterValues.originalLaunchUnix).toDateString();
        }
      );
      state.totalFilteredCapsules = state.filteredCapsules.length;
      state.currentPage = 0;
    },
    prevPage: (state: AppState) => {
      if(state.currentPage === 0) {
        return state;
      }
      state.currentPage--;
    },
    nextPage: (state: AppState) => {
      const firstIndexOnNextPage = state.currentPage * state.pageSize + state.pageSize;
      if(firstIndexOnNextPage >= state.totalFilteredCapsules) {
        return state;
      }
      state.currentPage++;
    }
  }
});

const store = configureStore({
  reducer: capsulesSlice.reducer
});

export const actions = capsulesSlice.actions;

export default store;
