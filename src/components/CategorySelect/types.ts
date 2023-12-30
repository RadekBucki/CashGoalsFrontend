import { Category, CategoryInput } from '@/graphql';

export type CategoryInputWrapper = {
  category: CategoryInput | Category;
  parent: CategoryInput | Category | null;
  level: number;
}
