import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { getArticlesPageInited } from '../../selectors/articlePageSelectors';
import { fetchArticlesList } from '../fetchArticleList/fetchArticleList';
import { articlesPageActions } from '../../slices/articlesPageSlice';

export const initArticlesPage = createAsyncThunk<
  void,
  void,
  ThunkConfig<string>
  >(
    'articlesPage/initArticlesPage',
    async (_, thunkApi) => {
      const { getState, dispatch } = thunkApi;
      const inited = getArticlesPageInited(getState());

      if (!inited) {
        dispatch(articlesPageActions.initState());
        dispatch(fetchArticlesList({
          page: 1,
        }));
      }
    },
  );
