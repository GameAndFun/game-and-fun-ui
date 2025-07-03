<template>
  <!-- :pager="{
      showPageSizeSelector: true,
      allowedPageSizes: [1, 2, 3],
      showInfo: true,
    }" -->
  <DxDataGrid
    :data-source="dataSource"
    key-expr="user_id"
    :show-borders="true"
    :paging="{ pageSize: 10 }"
    :remote-operations="false"
    :filter-row="{ visible: true, applyFilter: 'auto' }"
  >
    <!-- <DxColumn data-field="user_id" caption="ID" /> -->
    <DxColumn data-field="user_id" />

    <DxColumn data-field="created_at" data-type="date" />
    <DxColumn data-field="is_deleted" />
    <DxColumn data-field="updated_at" />
    <DxColumn data-field="user_role" />
    <DxColumn data-field="username" />
    <DxColumn caption="Дія" :cell-template="actionCellTemplate" />
  </DxDataGrid>
</template>

<script setup lang="ts">
import DataSource from "devextreme/data/data_source";
import CustomStore from "devextreme/data/custom_store";
import { useAdminUsers } from "@/store/admin/useAdminUsers";
import { DxDataGrid, DxColumn } from "devextreme-vue/data-grid";

function handleEdit(cellInfo: any) {
  alert(`Натиснуто: ${cellInfo.data.username}`);
}

function actionCellTemplate(cellElement: any, cellInfo: any) {
  const button = document.createElement("button");
  button.innerText = "Редагувати";
  button.className = "action-button";
  button.onclick = () => handleEdit(cellInfo);
  cellElement.appendChild(button);
}

const dataSource = new DataSource({
  store: new CustomStore({
    key: "user_id",
    load: async () => {
      try {
        const adminUsersStore = useAdminUsers();
        const data = await adminUsersStore.fetchUsers();

        return {
          data,
          totalCount: data.length,
        };
      } catch (error) {
        console.error("Load error:", error);
        throw "Data loading error";
      }
    },
  }),
});
</script>

<style scoped>
.dx-datagrid-rowsview td {
  border-right: 1px solid #d3d3d3;
}

.dx-datagrid-headers .dx-header-row td {
  border-right: 1px solid #d3d3d3;
}
</style>
