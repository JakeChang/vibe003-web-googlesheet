<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-md mx-auto bg-white p-8 rounded-lg border border-gray-200">
      <div class="flex items-center mb-6">
        <NuxtLink
          to="/demo"
          class="mr-3 text-gray-500 hover:text-gray-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
          </svg>
        </NuxtLink>
        <h1 class="text-xl font-normal text-gray-800">{{ isEditMode ? '編輯項目' : '新增項目' }}</h1>
      </div>

      <!-- 加載中 -->
      <div v-if="isLoading" class="flex justify-center items-center py-12">
        <div class="animate-spin h-8 w-8">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-blue-600">
            <circle cx="12" cy="12" r="10" stroke="#e2e8f0" stroke-width="4" />
            <path d="M12 2a10 10 0 0 1 10 10" stroke-width="4" />
          </svg>
        </div>
      </div>

      <!-- 錯誤提示 -->
      <div v-else-if="error" class="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded mb-6">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">{{ error }}</div>
        </div>
      </div>

      <!-- 表單 -->
      <form v-else @submit.prevent="handleSubmit" class="space-y-6">
        <!-- 姓名 -->
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700 mb-1">姓名</label>
          <input
            id="name"
            v-model="formData.name"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            :class="{ 'border-red-300 focus:ring-red-500 focus:border-red-500': formErrors.name }"
            placeholder="請輸入姓名"
          />
          <p v-if="formErrors.name" class="mt-1 text-xs text-red-600 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
            {{ formErrors.name }}
          </p>
        </div>

        <!-- 年齡 -->
        <div>
          <label for="age" class="block text-sm font-medium text-gray-700 mb-1">年齡</label>
          <input
            id="age"
            v-model.number="formData.age"
            type="number"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            :class="{ 'border-red-300 focus:ring-red-500 focus:border-red-500': formErrors.age }"
            placeholder="請輸入年齡"
          />
          <p v-if="formErrors.age" class="mt-1 text-xs text-red-600 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
            {{ formErrors.age }}
          </p>
        </div>

        <!-- 提交錯誤 -->
        <div v-if="submitError" class="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded">
          <div class="flex">
            <div class="flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="ml-3">{{ submitError }}</div>
          </div>
        </div>

        <!-- 按鈕 -->
        <div class="flex justify-end space-x-3 pt-2">
          <NuxtLink
            to="/demo"
            class="px-6 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-md text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            取消
          </NuxtLink>
          <button
            type="submit"
            class="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            :disabled="isSubmitting"
          >
            <span v-if="isSubmitting" class="flex items-center">
              <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              提交中...
            </span>
            <span v-else>{{ isEditMode ? '保存' : '創建' }}</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useDemo } from '~/composables/useDemo';

const route = useRoute();
const router = useRouter();

// 判斷是否是編輯模式
const isEditMode = computed(() => !!route.query.id);
const itemId = computed(() => {
  const id = route.query.id;
  return id ? Number(id) : undefined;
});

// 使用composable
const {
  formData,
  formErrors,
  isLoading,
  isSubmitting,
  error,
  submitError,
  loadItem,
  submitForm,
  resetForm
} = useDemo();

// 加載數據（如果是編輯模式）
onMounted(async () => {
  resetForm();
  
  if (isEditMode.value && itemId.value) {
    await loadItem(itemId.value);
  }
});

// 提交表單
const handleSubmit = async () => {
  const success = await submitForm();
  
  if (success) {
    // 提交成功後返回列表頁
    router.push('/demo');
  }
};
</script> 