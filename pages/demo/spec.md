# 頁面結構

實現新增、列表、修改資料的功能

## 功能要求

- 列表: 用列表方式顯示，頁面讀取時，需要有 loading 狀態
- 新增: 用表單方式建立
- 修改: 用表單方式修改資料，與新增共用頁面

## 欄位要求

- 取得所有: id,name,age,按鈕(編輯)
- 建立單筆: name,age
- 更新單筆: name,age

## 實現檔案

- 主頁面元件: 
    - pages/demo/index.vue: 呈現列表資料的頁面
    - pages/demo/add.vue: 新增與修改資料的頁面，如果網址有帶入 id，則為修改，要先去取得單一資料。
- 邏輯處理: composables/useDemo.ts
    - 負責邏輯，管理 UI 狀態
    - 處理錯誤訊息
    - 處理表單驗證邏輯
    - 提供表單提交方法
    - 管理 UI 狀態
- API 呼叫: utils/demoService.ts
    - 服務層，負責 API 串接
    - 使用 JSONP 方式處理 POST/PUT 請求，繞過 CORS 限制
    - 提供錯誤處理

## API

- 取得所有資料:

```
curl -L "https://script.google.com/macros/s/AKfycbxVzNySL1Y1-cX68CkUQwIxd3_GbTq4xYcLX_kt1deaiqUryOe-35fRm66hcWOsV5dc/exec?action=get&callba
ck=myCallback"

myCallback({"success":true,"data":[{"id":1,"name":"張三","age":25}],"error":null})% 
```

- 取得單一資料:

```
curl -L "https://script.google.com/macros/s/AKfycbxVzNySL1Y1-cX68CkUQwIxd3_GbTq4xYcLX_kt1deaiqUryOe-35fRm66hcWOsV5dc/exec?action=get&id=1&c
allback=myCallback"

myCallback({"success":true,"data":{"id":1,"name":"張三","age":25},"error":null})% 
```

- 新增 (通過 JSONP 實現):

```
curl -L "https://script.google.com/macros/s/AKfycbxVzNySL1Y1-cX68CkUQwIxd3_GbTq4xYcLX_kt1deaiqUryOe-35fRm66hcWOsV5dc/exec?action=post" --da
ta-urlencode "data={\"name\":\"張三\",\"age\":25}" --data-urlencode "callback=myCallback" -G

myCallback({"success":true,"data":{"id":2,"name":"張三","age":25},"error":null})% 
```

- 修改 (通過 JSONP 實現):

```
curl -L "https://script.google.com/macros/s/AKfycbxVzNySL1Y1-cX68CkUQwIxd3_GbTq4xYcLX_kt1deaiqUryOe-35fRm66hcWOsV5dc/exec?action=put" --dat
a-urlencode "data={\"id\":1,\"name\":\"李四\",\"age\":30}" --data-urlencode "callback=myCallback" -G

myCallback({"success":true,"data":{"id":1,"name":"李四","age":30},"error":null})% 
```

## 備註

- 使用 tailwindcss 排版
- 應用 JSONP 技術繞過 CORS 限制，不依賴伺服器代理
