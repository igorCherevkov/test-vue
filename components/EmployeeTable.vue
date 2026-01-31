<template>
  <div class="table-container">
    <div class="table-scroll">
      <table>
        <caption>
          Сотрудники
        </caption>
        <thead>
          <tr>
            <th>Имя</th>
            <th>Фамилия</th>
            <th>Стаж</th>
            <th>Возраст</th>
            <th>Адрес</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="employee in employees"
            :key="employee.id"
            @click="$emit('edit', employee)"
          >
            <td>{{ employee.firstName }}</td>
            <td>{{ employee.lastName }}</td>
            <td>{{ employee.experience }}</td>
            <td>{{ employee.age }}</td>
            <td>{{ employee.address }}</td>
          </tr>

          <tr v-if="!employees.length && !loading">
            <td>Нет данных</td>
          </tr>

          <tr v-if="loading">
            ...загрузка
          </tr>
        </tbody>
      </table>
    </div>

    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1 || loading">
        ←
      </button>
      <span>{{ props.total ? currentPage : 0 }} / {{ totalPages }}</span>
      <button
        @click="nextPage"
        :disabled="currentPage === totalPages || loading"
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

const nextPage = () => {
  if (props.currentPage < totalPages.value)
    emit("update:currentPage", props.currentPage + 1);
};

const prevPage = () => {
  if (props.currentPage > 1) emit("update:currentPage", props.currentPage - 1);
};
</script>
