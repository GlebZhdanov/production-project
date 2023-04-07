import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { ArticleListItemSkeleton } from 'entities/Article/ui/ArticleListItem/ArticleListItemSkeleton';
import { ArticleListItem } from '../../ui/ArticleListItem/ArticleListItem';
import cls from './ArticleList.module.scss';
import { Article, ArticleView } from '../../model/types/artical';

interface ArticleListProps {
  className?: string;
  articles: Article[];
  isLoading?: boolean;
  view?: ArticleView;
}

const getSkeleton = (view: ArticleView) => new Array(view === ArticleView.SMALL ? 9 : 3)
  .fill(0)
  .map((item, index) => (
    <ArticleListItemSkeleton className={cls.card} key={index} view={view} />
  ));

export const ArticleList = memo((props: ArticleListProps) => {
  const {
    className,
    articles,
    isLoading,
    view = ArticleView.SMALL,
  } = props;

  const renderArticle = (article: Article) => (
    <ArticleListItem
      article={article}
      view={view}
      className={cls.card}
      key={article.id}
    />
  );

  return (
    <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
      {articles.length > 0
        ? articles.map(renderArticle)
        : null}
      {isLoading && getSkeleton(view)}
    </div>
  );
});
