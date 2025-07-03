<template>
  <div class="btns-wrap">
    <button @click="changeActiveStatus('pending')">На модерацію</button>
    <button @click="changeActiveStatus('blocked')">Заблоковані</button>
    <button @click="changeActiveStatus('success')">На платфомі</button>
  </div>

  <DxDataGrid
    :data-source="renderData"
    key-expr="user_id"
    :paging="{ pageSize: 5 }"
    :remote-operations="false"
    :filter-row="{ visible: true, applyFilter: 'auto' }"
    :show-borders="true"
    :show-column-lines="true"
    :show-row-lines="true"
  >
    <DxColumn
      data-field="icon"
      :cell-template="iconCellTemplate"
      caption="Фото"
    />

    <DxColumn data-field="id" caption="ID" />
    <DxColumn data-field="title" caption="Назва" />
    <DxColumn data-field="price" caption="Ціна" />
    <DxColumn data-field="location" caption="Локація" />
    <DxColumn data-field="created_at" data-type="date" caption="Дата" />
    <DxColumn data-field="user_id" caption="Користувач" />
    <DxColumn data-field="status" caption="Статус" />
    <!-- ------ -->

    <DxColumn caption="Дія" :cell-template="actionCellTemplate" />
    <DxColumn caption="Більше" :cell-template="actionCellTemplate" />
  </DxDataGrid>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { DxDataGrid, DxColumn } from "devextreme-vue/data-grid";

function handleEdit(cellInfo: any) {
  alert(`Натиснуто: ${cellInfo.data.username}`);
}

const status = ref("pending");

function changeActiveStatus(newStatus: string) {
  status.value = newStatus;
}

function actionCellTemplate(cellElement: any, cellInfo: any) {
  const wrapper = document.createElement("div");
  wrapper.style = `
  display: flex;
  gap:15px;
  `;

  const button = document.createElement("button");
  const button2 = document.createElement("button");

  button.innerText = "Х";
  button.className = "action-button";
  button.onclick = () => handleEdit(cellInfo);

  button2.innerText = "ок";
  button2.className = "action-button";
  button2.onclick = () => handleEdit(cellInfo);

  wrapper.appendChild(button);
  wrapper.appendChild(button2);

  cellElement.appendChild(wrapper);
}

function iconCellTemplate(cellElement: any, cellInfo: any) {
  const img = document.createElement("img");
  img.src = cellInfo.data.icon;
  img.style.width = "56px";
  img.style.height = "56px";
  cellElement.appendChild(img);
}

const dataSource = ref([
  {
    id: 1,
    icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/PS2-Versions.png/1200px-PS2-Versions.png",
    title: "PlayStation 2",
    price: "19 993 UAH",
    location: "Kyiv",
    created_at: "2025-05-10",
    user_id: 1,
    status: "pending",
  },
  {
    id: 2,
    icon: "data:image/jpeg;base64,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",
    title: "PlayStation 2",
    price: "19 993 UAH",
    location: "Kyiv",
    created_at: "2025-05-10",
    user_id: 1,
    status: "success",
  },
  {
    id: 3,
    icon: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTysal-4qrAbPIU7pFPoL3YGx9iBQLxg1q67FcELUnlUB6JahBE2Kr6CmQC1TyQ8nkDvK-VJ20ThRt3LjEO7E-4nP2GcyaPVauKHVtQhyblu8oknY9vqq3AatMdHR1nOhF5Jt0NOQ&usqp=CAc",
    title: "PlayStation 2",
    price: "19 993 UAH",
    location: "Kyiv",
    created_at: "2025-05-10",
    user_id: 1,
    status: "pending",
  },
  {
    id: 4,
    icon: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRrehjJ3ege1-JFqZ4VcBWxQu4gwfkV6ZSX-s6VSgaK65USp9abZHq2hb8BrqLb_aZJVOefHnAvBx1Bi5DzioROBimGvolhZid5-n170dB6G8wQtZkdO5cIF2gBRjZF3R7_Hp07CH0&usqp=CAc",
    title: "PlayStation 2",
    price: "19 993 UAH",
    location: "Kyiv",
    created_at: "2025-05-10",
    user_id: 1,
    status: "pending",
  },
  {
    id: 5,
    icon: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRrehjJ3ege1-JFqZ4VcBWxQu4gwfkV6ZSX-s6VSgaK65USp9abZHq2hb8BrqLb_aZJVOefHnAvBx1Bi5DzioROBimGvolhZid5-n170dB6G8wQtZkdO5cIF2gBRjZF3R7_Hp07CH0&usqp=CAc",
    title: "PlayStation 2",
    price: "19 993 UAH",
    location: "Kyiv",
    created_at: "2025-05-10",
    user_id: 1,
    status: "pending",
  },
  {
    id: 6,
    icon: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRrehjJ3ege1-JFqZ4VcBWxQu4gwfkV6ZSX-s6VSgaK65USp9abZHq2hb8BrqLb_aZJVOefHnAvBx1Bi5DzioROBimGvolhZid5-n170dB6G8wQtZkdO5cIF2gBRjZF3R7_Hp07CH0&usqp=CAc",
    title: "PlayStation 2",
    price: "19 993 UAH",
    location: "Kyiv",
    created_at: "2025-05-10",
    user_id: 1,
    status: "pending",
  },
  {
    id: 7,
    icon: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRrehjJ3ege1-JFqZ4VcBWxQu4gwfkV6ZSX-s6VSgaK65USp9abZHq2hb8BrqLb_aZJVOefHnAvBx1Bi5DzioROBimGvolhZid5-n170dB6G8wQtZkdO5cIF2gBRjZF3R7_Hp07CH0&usqp=CAc",
    title: "PlayStation 2",
    price: "19 993 UAH",
    location: "Kyiv",
    created_at: "2025-05-10",
    user_id: 1,
    status: "pending",
  },
  {
    id: 8,
    icon: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRrehjJ3ege1-JFqZ4VcBWxQu4gwfkV6ZSX-s6VSgaK65USp9abZHq2hb8BrqLb_aZJVOefHnAvBx1Bi5DzioROBimGvolhZid5-n170dB6G8wQtZkdO5cIF2gBRjZF3R7_Hp07CH0&usqp=CAc",
    title: "PlayStation 2",
    price: "19 993 UAH",
    location: "Kyiv",
    created_at: "2025-05-10",
    user_id: 1,
    status: "pending",
  },
  {
    id: 9,
    icon: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRrehjJ3ege1-JFqZ4VcBWxQu4gwfkV6ZSX-s6VSgaK65USp9abZHq2hb8BrqLb_aZJVOefHnAvBx1Bi5DzioROBimGvolhZid5-n170dB6G8wQtZkdO5cIF2gBRjZF3R7_Hp07CH0&usqp=CAc",
    title: "PlayStation 2",
    price: "19 993 UAH",
    location: "Kyiv",
    created_at: "2025-05-10",
    user_id: 1,
    status: "pending",
  },
  {
    id: 10,
    icon: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRrehjJ3ege1-JFqZ4VcBWxQu4gwfkV6ZSX-s6VSgaK65USp9abZHq2hb8BrqLb_aZJVOefHnAvBx1Bi5DzioROBimGvolhZid5-n170dB6G8wQtZkdO5cIF2gBRjZF3R7_Hp07CH0&usqp=CAc",
    title: "PlayStation 2",
    price: "19 993 UAH",
    location: "Kyiv",
    created_at: "2025-05-10",
    user_id: 1,
    status: "success",
  },
  {
    id: 11,
    icon: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRrehjJ3ege1-JFqZ4VcBWxQu4gwfkV6ZSX-s6VSgaK65USp9abZHq2hb8BrqLb_aZJVOefHnAvBx1Bi5DzioROBimGvolhZid5-n170dB6G8wQtZkdO5cIF2gBRjZF3R7_Hp07CH0&usqp=CAc",
    title: "PlayStation 2",
    price: "19 993 UAH",
    location: "Kyiv",
    created_at: "2025-05-10",
    user_id: 1,
    status: "blocked",
  },
  {
    id: 12,
    icon: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRrehjJ3ege1-JFqZ4VcBWxQu4gwfkV6ZSX-s6VSgaK65USp9abZHq2hb8BrqLb_aZJVOefHnAvBx1Bi5DzioROBimGvolhZid5-n170dB6G8wQtZkdO5cIF2gBRjZF3R7_Hp07CH0&usqp=CAc",
    title: "PlayStation 2",
    price: "19 993 UAH",
    location: "Kyiv",
    created_at: "2025-05-10",
    user_id: 1,
    status: "pending",
  },
  {
    id: 13,
    icon: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRrehjJ3ege1-JFqZ4VcBWxQu4gwfkV6ZSX-s6VSgaK65USp9abZHq2hb8BrqLb_aZJVOefHnAvBx1Bi5DzioROBimGvolhZid5-n170dB6G8wQtZkdO5cIF2gBRjZF3R7_Hp07CH0&usqp=CAc",
    title: "PlayStation 2",
    price: "19 993 UAH",
    location: "Kyiv",
    created_at: "2025-05-10",
    user_id: 1,
    status: "pending",
  },
  {
    id: 14,
    icon: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRrehjJ3ege1-JFqZ4VcBWxQu4gwfkV6ZSX-s6VSgaK65USp9abZHq2hb8BrqLb_aZJVOefHnAvBx1Bi5DzioROBimGvolhZid5-n170dB6G8wQtZkdO5cIF2gBRjZF3R7_Hp07CH0&usqp=CAc",
    title: "PlayStation 2",
    price: "19 993 UAH",
    location: "Kyiv",
    created_at: "2025-05-10",
    user_id: 1,
    status: "pending",
  },
  {
    id: 4,
    icon: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRrehjJ3ege1-JFqZ4VcBWxQu4gwfkV6ZSX-s6VSgaK65USp9abZHq2hb8BrqLb_aZJVOefHnAvBx1Bi5DzioROBimGvolhZid5-n170dB6G8wQtZkdO5cIF2gBRjZF3R7_Hp07CH0&usqp=CAc",
    title: "PlayStation 2",
    price: "19 993 UAH",
    location: "Kyiv",
    created_at: "2025-05-10",
    user_id: 1,
    status: "pending",
  },
  {
    id: 15,
    icon: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRrehjJ3ege1-JFqZ4VcBWxQu4gwfkV6ZSX-s6VSgaK65USp9abZHq2hb8BrqLb_aZJVOefHnAvBx1Bi5DzioROBimGvolhZid5-n170dB6G8wQtZkdO5cIF2gBRjZF3R7_Hp07CH0&usqp=CAc",
    title: "PlayStation 2",
    price: "19 993 UAH",
    location: "Kyiv",
    created_at: "2025-05-10",
    user_id: 1,
    status: "pending",
  },
  {
    id: 16,
    icon: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRrehjJ3ege1-JFqZ4VcBWxQu4gwfkV6ZSX-s6VSgaK65USp9abZHq2hb8BrqLb_aZJVOefHnAvBx1Bi5DzioROBimGvolhZid5-n170dB6G8wQtZkdO5cIF2gBRjZF3R7_Hp07CH0&usqp=CAc",
    title: "PlayStation 2",
    price: "19 993 UAH",
    location: "Kyiv",
    created_at: "2025-05-10",
    user_id: 1,
    status: "pending",
  },
  {
    id: 17,
    icon: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRrehjJ3ege1-JFqZ4VcBWxQu4gwfkV6ZSX-s6VSgaK65USp9abZHq2hb8BrqLb_aZJVOefHnAvBx1Bi5DzioROBimGvolhZid5-n170dB6G8wQtZkdO5cIF2gBRjZF3R7_Hp07CH0&usqp=CAc",
    title: "PlayStation 2",
    price: "19 993 UAH",
    location: "Kyiv",
    created_at: "2025-05-10",
    user_id: 1,
    status: "pending",
  },
  {
    id: 18,
    icon: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRrehjJ3ege1-JFqZ4VcBWxQu4gwfkV6ZSX-s6VSgaK65USp9abZHq2hb8BrqLb_aZJVOefHnAvBx1Bi5DzioROBimGvolhZid5-n170dB6G8wQtZkdO5cIF2gBRjZF3R7_Hp07CH0&usqp=CAc",
    title: "PlayStation 2",
    price: "19 993 UAH",
    location: "Kyiv",
    created_at: "2025-05-10",
    user_id: 1,
    status: "pending",
  },
  {
    id: 19,
    icon: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRrehjJ3ege1-JFqZ4VcBWxQu4gwfkV6ZSX-s6VSgaK65USp9abZHq2hb8BrqLb_aZJVOefHnAvBx1Bi5DzioROBimGvolhZid5-n170dB6G8wQtZkdO5cIF2gBRjZF3R7_Hp07CH0&usqp=CAc",
    title: "PlayStation 2",
    price: "19 993 UAH",
    location: "Kyiv",
    created_at: "2025-05-10",
    user_id: 1,
    status: "pending",
  },
  {
    id: 20,
    icon: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRrehjJ3ege1-JFqZ4VcBWxQu4gwfkV6ZSX-s6VSgaK65USp9abZHq2hb8BrqLb_aZJVOefHnAvBx1Bi5DzioROBimGvolhZid5-n170dB6G8wQtZkdO5cIF2gBRjZF3R7_Hp07CH0&usqp=CAc",
    title: "PlayStation 2",
    price: "19 993 UAH",
    location: "Kyiv",
    created_at: "2025-05-10",
    user_id: 1,
    status: "success",
  },
]);

const renderData = computed(() => {
  return dataSource.value.filter((item) => item.status === status.value);
});
</script>

<style>
.action-button {
  padding: 5px 10px;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btns-wrap {
  margin: 12px 0;
  display: flex;
  gap: 10px;
}

.btns-wrap button {
  height: 48px;
  background: rgba(47, 60, 73, 1) 0% 0% no-repeat padding-box;
  background: rgba(47, 60, 73, 1) 0% 0% no-repeat padding-box;
  border-radius: 8px;
  opacity: 1;
  color: white;
  border: none;
  cursor: pointer;
  width: 100%;
}
</style>
