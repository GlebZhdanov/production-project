import {
  ArticleDetailsRecommendationsSchema,
} from './ArticleDetailsRecommendationsSchema';

import {
  ArticleDetailsCommentSchema,
} from './ArticleDetailsCommentSchema';

export interface ArticleDetailsPageSchema {
  comments: ArticleDetailsCommentSchema;
  recommendations: ArticleDetailsRecommendationsSchema;
}
