import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface News {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  imageUrl?: string;
}

interface NewsState {
  items: News[];
  loading: boolean;
  selectedNews: News | null;
}

const initialState: NewsState = {
  items: [],
  loading: false,
  selectedNews: null,
};

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    setNews: (state, action: PayloadAction<News[]>) => {
      state.items = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    selectNews: (state, action: PayloadAction<News>) => {
      state.selectedNews = action.payload;
    },
    addNews: (state, action: PayloadAction<News>) => {
      state.items.unshift(action.payload);
    },
  },
});

export const { setNews, setLoading, selectNews, addNews } = newsSlice.actions;
export default newsSlice.reducer;
