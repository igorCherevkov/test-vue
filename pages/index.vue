<template>
  <div class="page-container">
    <div v-if="loading && !data.data.length" class="loading-overlay">
      <div class="spinner"></div>
      <p>Загрузка данных...</p>
    </div>

    <EmployeeTable
      :employees="data.data"
      :total="data.total"
      :loading="loading"
      v-model:currentPage="currentPage"
      @edit="openEditForm"
    />

    <div class="button-wrapper">
      <button class="table-button" @click="openCreateForm" :disabled="loading">
        Добавить сотрудника
      </button>
    </div>

    <EmployeeForm
      v-if="showForm"
      :employee="selectedEmployee"
      :loading="formLoading"
      @save="saveEmployee"
      @close="closeForm"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import "~/assets/styles/index.css";
import EmployeeForm from "~/components/EmployeeForm.vue";
import EmployeeTable from "~/components/EmployeeTable.vue";
import { ITEMS_PER_PAGE } from "~/constants";
import type { Employee, EmployeeRequest } from "~/types";

const selectedEmployee = ref<Employee | null>(null);
const showForm = ref(false);
const currentPage = ref(1);
const formLoading = ref(false);

const {
  data,
  pending: loading,
  refresh,
} = useFetch<EmployeeRequest>("/api/employees", {
  query: { page: currentPage, limit: ITEMS_PER_PAGE },
  default: () => ({
    data: [],
    total: 0,
    page: 1,
    limit: ITEMS_PER_PAGE,
  }),
});

const openCreateForm = () => {
  selectedEmployee.value = null;
  showForm.value = true;
};

const openEditForm = (emp: Employee) => {
  selectedEmployee.value = { ...emp };
  showForm.value = true;
};

const saveEmployee = async (emp: Employee) => {
  formLoading.value = true;

  try {
    if (emp.id) {
      await $fetch(`/api/employees/${emp.id}`, {
        method: "PUT",
        body: emp,
      });
    } else {
      await $fetch(`/api/employees`, {
        method: "POST",
        body: emp,
      });
    }

    showForm.value = false;
    await refresh();
  } catch (err: any) {
    console.error("Ошибка сохранения:", err);
  } finally {
    formLoading.value = false;
  }
};

const closeForm = () => {
  if (!formLoading.value) {
    showForm.value = false;
  }
};
</script>
