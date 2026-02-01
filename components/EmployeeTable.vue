<template>
  <div class="table-container">
    <div class="table-scroll">
      <table>
        <caption>
          Сотрудники
        </caption>
        <thead>
          <tr>
            <th>№</th>
            <th>Имя</th>
            <th>Фамилия</th>
            <th>Стаж</th>
            <th>Возраст</th>
            <th>Адрес</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(employee, index) in employees"
            :key="employee.id"
            @click="$emit('edit', employee)"
            :class="{ 'disabled-row': loading }"
          >
            <td class="number-cell">{{ getEmployeeNumber(index) }}</td>
            <td>{{ employee.firstName }}</td>
            <td>{{ employee.lastName }}</td>
            <td>{{ employee.experience }}</td>
            <td>{{ employee.age }}</td>
            <td>{{ employee.address }}</td>
          </tr>

          <tr v-if="!employees.length && !loading">
            <td colspan="6" class="empty-message">Нет данных</td>
          </tr>

          <tr v-if="loading && employees.length">
            <td colspan="6" class="loading-row">
              <div class="table-loader"></div>
              Обновление данных...
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="pagination">
      <button
        @click="prevPage"
        :disabled="currentPage === 1 || loading"
        class="pagination-btn"
      >
        ←
      </button>
      <span>{{ props.total ? currentPage : 0 }} / {{ totalPages }}</span>
      <button
        @click="nextPage"
        :disabled="currentPage === totalPages || loading"
        class="pagination-btn"
      >
        →
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import "~/assets/styles/employees-table.css";
import { ITEMS_PER_PAGE } from "~/constants";
import type { Employee } from "~/types";

const props = defineProps<{
  employees: Employee[];
  total: number;
  loading: boolean;
  currentPage: number;
}>();

const emit = defineEmits<{
  (e: "edit", emp: Employee): void;
  (e: "update:currentPage", currentPage: number): void;
}>();

const totalPages = computed(() => {
  return props.total > 0 ? Math.ceil(props.total / ITEMS_PER_PAGE) : 0;
});

const getEmployeeNumber = (index: number) => {
  return (props.currentPage - 1) * ITEMS_PER_PAGE + index + 1;
};

const nextPage = () => {
  if (props.currentPage < totalPages.value)
    emit("update:currentPage", props.currentPage + 1);
};

const prevPage = () => {
  if (props.currentPage > 1) emit("update:currentPage", props.currentPage - 1);
};
</script>
