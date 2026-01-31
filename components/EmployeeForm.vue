<template>
  <div class="form-container" @click.self="close">
    <form class="form" @submit.prevent="submitForm">
      <h2 class="form-title">
        {{
          employee ? "Изменить информацию о сотруднике" : "Добавить сотрудника"
        }}
      </h2>
      <div class="form-group">
        <label for="firstName">Имя</label>
        <input
          id="firstName"
          v-model="localEmployee.firstName"
          placeholder="Введите имя"
          @invalid="
            (e: Event) =>
              (e.target as HTMLInputElement).setCustomValidity('Введите имя')
          "
          @input="
            (e: Event) => (e.target as HTMLInputElement).setCustomValidity('')
          "
          required
        />
      </div>

      <div class="form-group">
        <label for="lastName">Фамилия</label>
        <input
          id="lastName"
          v-model="localEmployee.lastName"
          placeholder="Введите фамилию"
          @invalid="
            (e: Event) =>
              (e.target as HTMLInputElement).setCustomValidity(
                'Введите фамилию',
              )
          "
          @input="
            (e: Event) => (e.target as HTMLInputElement).setCustomValidity('')
          "
          required
        />
      </div>

      <div class="form-group">
        <label for="age">Возраст</label>
        <input
          id="age"
          type="number"
          min="0"
          v-model.number="localEmployee.age"
          @input="
            (e: Event) => {
              const target = e.target as HTMLInputElement;
              if (target.value === '') {
                target.setCustomValidity('Введите возраст');
              } else if (+target.value < 0 || +target.value > 100) {
                target.setCustomValidity('Некорректный возраст');
              } else {
                target.setCustomValidity('');
              }
            }
          "
          @invalid="
            (e: Event) => {
              const target = e.target as HTMLInputElement;
              if (target.value === '')
                target.setCustomValidity('Введите возраст');
              else if (+target.value < 0 || +target.value > 100)
                target.setCustomValidity('Некорректный возраст');
            }
          "
          required
        />
      </div>

      <div class="form-group">
        <label for="experience">Стаж</label>
        <input
          id="experience"
          type="number"
          min="0"
          max="100"
          v-model.number="localEmployee.experience"
          @input="
            (e: Event) => {
              const target = e.target as HTMLInputElement;
              if (target.value === '') {
                target.setCustomValidity('Введите стаж');
              } else if (+target.value < 0 || +target.value > 100) {
                target.setCustomValidity('Некорректный стаж');
              } else {
                target.setCustomValidity('');
              }
            }
          "
          @invalid="
            (e: Event) => {
              const target = e.target as HTMLInputElement;
              if (target.value === '') target.setCustomValidity('Введите стаж');
              else if (+target.value < 0 || +target.value > 100)
                target.setCustomValidity('Некорректный стаж');
            }
          "
          required
        />
      </div>

      <div class="form-group">
        <label for="address">Адрес</label>
        <input
          id="address"
          v-model="localEmployee.address"
          placeholder="Введите адрес"
          @invalid="
            (e: Event) =>
              (e.target as HTMLInputElement).setCustomValidity('Введите адрес')
          "
          @input="
            (e: Event) => (e.target as HTMLInputElement).setCustomValidity('')
          "
          required
        />
      </div>

      <div class="form-actions">
        <button type="submit" class="btn-save">Сохранить</button>
        <button type="button" class="btn-cancel" @click="close">Закрыть</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, watch, toRaw } from "vue";

import "~/assets/styles/employee-form.css";
import type { Employee } from "~/types";

const props = defineProps<{
  employee: Employee | null;
}>();

const emit = defineEmits<{
  (e: "save", employee: Employee): void;
  (e: "close"): void;
}>();

const localEmployee = reactive<Employee>({
  id: "",
  firstName: "",
  lastName: "",
  experience: 0,
  age: 0,
  address: "",
});

watch(
  () => props.employee,
  (newEmp) => {
    if (newEmp) {
      Object.assign(localEmployee, newEmp);
    } else {
      Object.assign(localEmployee, {
        id: "",
        firstName: "",
        lastName: "",
        experience: 0,
        age: 0,
        address: "",
      });
    }
  },
  { immediate: true },
);

const submitForm = () => {
  emit("save", toRaw(localEmployee));
};

const close = () => {
  emit("close");
};
</script>
