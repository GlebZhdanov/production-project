import { EntityState } from '@reduxjs/toolkit';
import { Article, ArticleView } from 'entities/Article';
import { SortOrder } from 'shared/types';
import { ArticleSortField, ArticleType } from 'entities/Article/model/types/artical';

export interface ArticlesPageSchema extends EntityState<Article>{
  isLoading?: boolean;
  error?: string;
  // Пагинация
  page: number;
  limit: number;
  hasMore: boolean;
  // Фильтры
  view: ArticleView;
  order: SortOrder;
  sort: ArticleSortField;
  search: string;
  type: ArticleType;

  _inited: boolean;
}
