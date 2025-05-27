export interface Category {
  id: string;
  name: string;
  children: Category[];
  isBaseCategory?: boolean;
  isLinked?: boolean;
  parentIds?: string[];
}
