<template>
  <div class="page-container">
    <EmployeeTable
      :employees="data.data"
      :total="data.total"
      :loading="loading"
      v-model:currentPage="currentPage"
      @edit="openEditForm"
    />

    <div class="button-wrapper">
      <button class="table-button" @click="openCreateForm">
        Добавить сотрудника
      </button>
    </div>

    <EmployeeForm
      v-if="showForm"
      :employee="selectedEmployee"
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
  if (emp.id) {
    await $fetch(`/api/employees/${emp.id}`, {
      method: "PUT" as any,
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
};

const closeForm = () => {
  showForm.value = false;
};
</script>
