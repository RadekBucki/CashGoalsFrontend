import { Category, CategoryInput } from '@/graphql';

const findCategoryById = (
  categoryIdToBeFound: number,
  categoriesList: CategoryInput[] | Category[],
): CategoryInput | Category | null => {
  // eslint-disable-next-line no-restricted-syntax
  for (const category of categoriesList) {
    if (category.id === categoryIdToBeFound) {
      return category;
    }
    const foundChild = findCategoryById(categoryIdToBeFound, category.children);
    if (foundChild) {
      return foundChild;
    }
  }
  return null;
};

const findCategoryParent = <T extends CategoryInput | Category>(
  category: T | null,
  categoriesList: T[],
): T | null => {
  if (!category) {
    return null;
  }
  // eslint-disable-next-line no-restricted-syntax
  for (const categoryFromList of categoriesList) {
    if ((categoryFromList.children as T[]).includes(category)) {
      return categoryFromList;
    }
    const foundChild = findCategoryParent(category, categoryFromList.children);
    if (foundChild) {
      return foundChild as T;
    }
  }
  return null;
};

const findCategory = (
  category: CategoryInput | Category | null,
  categoriesList: CategoryInput[] | Category[],
): CategoryInput | Category | null => {
  if (!category) {
    return null;
  }
  // eslint-disable-next-line no-restricted-syntax
  for (const categoryFromList of categoriesList) {
    if (category === categoryFromList) {
      return categoryFromList;
    }
    const foundChild = findCategory(category, categoryFromList.children);
    if (foundChild) {
      return foundChild;
    }
  }
  return null;
};

export { findCategoryById, findCategoryParent, findCategory };
