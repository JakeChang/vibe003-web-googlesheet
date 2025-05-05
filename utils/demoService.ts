/**
 * Demo服務層 - 負責處理API呼叫
 * 使用JSONP方式處理POST/PUT請求，繞過CORS限制
 */

interface DemoItem {
  id?: number;
  name: string;
  age: number;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  error: string | null;
}

// API URL
const API_URL = 'https://script.google.com/macros/s/AKfycbxVzNySL1Y1-cX68CkUQwIxd3_GbTq4xYcLX_kt1deaiqUryOe-35fRm66hcWOsV5dc/exec';

/**
 * 生成唯一的回調函數名稱
 */
const generateCallbackName = (): string => {
  return `jsonpCallback_${Date.now()}_${Math.floor(Math.random() * 1000000)}`;
}

/**
 * 創建JSONP請求
 */
const createJsonpRequest = <T>(url: string): Promise<T> => {
  return new Promise((resolve, reject) => {
    const callbackName = generateCallbackName();
    const script = document.createElement('script');
    const urlWithCallback = `${url}&callback=${callbackName}`;
    
    // 添加回調函數到全局
    (window as any)[callbackName] = (response: ApiResponse<T>) => {
      // 清理
      document.body.removeChild(script);
      delete (window as any)[callbackName];
      
      if (response.success) {
        resolve(response.data);
      } else {
        reject(new Error(response.error || '未知錯誤'));
      }
    };
    
    // 配置腳本標籤
    script.src = urlWithCallback;
    script.onerror = () => {
      document.body.removeChild(script);
      delete (window as any)[callbackName];
      reject(new Error('JSONP 請求失敗'));
    };
    
    // 添加到DOM
    document.body.appendChild(script);
  });
}

/**
 * 獲取所有項目
 */
export const getAllItems = (): Promise<DemoItem[]> => {
  const url = `${API_URL}?action=get`;
  return createJsonpRequest<DemoItem[]>(url);
}

/**
 * 獲取單個項目
 */
export const getItemById = (id: number): Promise<DemoItem> => {
  const url = `${API_URL}?action=get&id=${id}`;
  return createJsonpRequest<DemoItem>(url);
}

/**
 * 創建新項目
 */
export const createItem = (item: DemoItem): Promise<DemoItem> => {
  const url = `${API_URL}?action=post&data=${encodeURIComponent(JSON.stringify(item))}`;
  return createJsonpRequest<DemoItem>(url);
}

/**
 * 更新項目
 */
export const updateItem = (item: DemoItem): Promise<DemoItem> => {
  if (!item.id) {
    return Promise.reject(new Error('更新項目必須包含ID'));
  }
  
  const url = `${API_URL}?action=put&data=${encodeURIComponent(JSON.stringify(item))}`;
  return createJsonpRequest<DemoItem>(url);
}

// 導出接口類型
export type { DemoItem, ApiResponse }; 