// import { defineStore } from "pinia";
// import type { Category } from "../types/category";

// export const useCategoryStore = defineStore("categories", {
//   state: () => ({
//     categories: [] as Category[],
//   }),
//   actions: {
//     addCategory(parentId?: string) {
//       const newCategory: Category = {
//         id: crypto.randomUUID(),
//         name: "",
//         children: [],
//         parentIds: parentId ? [parentId] : [],
//         isLinked: !!parentId,
//       };

//       if (parentId) {
//         const parent = this.findById(parentId);
//         parent?.children.push(newCategory);
//       } else {
//         this.categories.push(newCategory);
//       }
//     },

//     findById(id: string): Category | undefined {
//       const search = (list: Category[]): Category | undefined => {
//         for (const cat of list) {
//           if (cat.id === id) return cat;
//           const child = search(cat.children);
//           if (child) return child;
//         }
//         return undefined;
//       };
//       return search(this.categories);
//     },

//     updateCategory(id: string, data: Partial<Category>) {
//       const cat = this.findById(id);
//       if (cat) Object.assign(cat, data);
//     },

//     linkCategory(subId: string, toParentId: string) {
//       const sub = this.findById(subId);
//       const parent = this.findById(toParentId);
//       if (sub && parent && !sub.parentIds.includes(toParentId)) {
//         sub.parentIds.push(toParentId);
//         parent.children.push(sub);
//         sub.isLinked = true;
//       }
//     },

//     unlinkCategory(subId: string, fromParentId: string) {
//       const sub = this.findById(subId);
//       const parent = this.findById(fromParentId);
//       if (sub && parent) {
//         sub.parentIds = sub.parentIds.filter((id) => id !== fromParentId);
//         parent.children = parent.children.filter((child) => child.id !== subId);
//         if (sub.parentIds.length === 0) sub.isLinked = false;
//       }
//     },
//   },
// });
