import { ref, reactive, computed } from 'vue';
import { getAllItems, getItemById, createItem, updateItem, type DemoItem } from '~/utils/demoService';

export const useDemo = () => {
  // 列表狀態
  const items = ref<DemoItem[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  // 表單狀態
  const formData = reactive<DemoItem>({
    name: '',
    age: 0
  });
  
  // 表單錯誤
  const formErrors = reactive({
    name: '',
    age: ''
  });
  
  // 表單提交狀態
  const isSubmitting = ref(false);
  const submitError = ref<string | null>(null);
  
  // 表單是否有效
  const isFormValid = computed(() => {
    return !formErrors.name && !formErrors.age;
  });
  
  /**
   * 重置表單
   */
  const resetForm = () => {
    formData.name = '';
    formData.age = 0;
    formData.id = undefined;
    formErrors.name = '';
    formErrors.age = '';
    submitError.value = null;
  };
  
  /**
   * 載入單一項目數據
   */
  const loadItem = async (id: number) => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const data = await getItemById(id);
      formData.id = data.id;
      formData.name = data.name;
      formData.age = data.age;
      return data;
    } catch (err) {
      error.value = (err as Error).message;
      return null;
    } finally {
      isLoading.value = false;
    }
  };
  
  /**
   * 載入所有項目
   */
  const loadItems = async () => {
    isLoading.value = true;
    error.value = null;
    
    try {
      items.value = await getAllItems();
    } catch (err) {
      error.value = (err as Error).message;
      items.value = [];
    } finally {
      isLoading.value = false;
    }
  };
  
  /**
   * 驗證表單
   */
  const validateForm = (): boolean => {
    let isValid = true;
    
    // 驗證名稱
    if (!formData.name.trim()) {
      formErrors.name = '名稱不能為空';
      isValid = false;
    } else if (formData.name.length > 50) {
      formErrors.name = '名稱不能超過50個字符';
      isValid = false;
    } else {
      formErrors.name = '';
    }
    
    // 驗證年齡
    if (formData.age <= 0) {
      formErrors.age = '年齡必須大於0';
      isValid = false;
    } else if (formData.age > 150) {
      formErrors.age = '年齡不能超過150';
      isValid = false;
    } else {
      formErrors.age = '';
    }
    
    return isValid;
  };
  
  /**
   * 提交表單
   */
  const submitForm = async (): Promise<boolean> => {
    // 先驗證表單
    if (!validateForm()) {
      return false;
    }
    
    isSubmitting.value = true;
    submitError.value = null;
    
    try {
      if (formData.id) {
        // 更新現有項目
        await updateItem({ ...formData });
      } else {
        // 創建新項目
        await createItem({ ...formData });
      }
      
      resetForm();
      return true;
    } catch (err) {
      submitError.value = (err as Error).message;
      return false;
    } finally {
      isSubmitting.value = false;
    }
  };
  
  return {
    // 數據
    items,
    formData,
    formErrors,
    isLoading,
    isSubmitting,
    error,
    submitError,
    isFormValid,
    
    // 方法
    loadItems,
    loadItem,
    submitForm,
    validateForm,
    resetForm
  };
}; 