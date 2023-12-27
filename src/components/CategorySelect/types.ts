import { CategoryInput } from '@/graphql';

export type CategoryInputWrapper = {
  category: CategoryInput;
  parent: CategoryInput | null;
  level: number;
}
