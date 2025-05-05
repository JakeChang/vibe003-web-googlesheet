<template>
  <div class="container mx-auto px-4 py-12">
    <div class="max-w-3xl mx-auto">
      <h1 class="text-3xl font-bold mb-6 text-center">Google Sheet 網頁應用</h1>
      
      <div class="bg-white shadow-md rounded-lg p-6">
        <h2 class="text-xl font-semibold mb-4">功能示範</h2>
        
        <div class="grid gap-4">
          <NuxtLink 
            to="/demo" 
            class="block p-4 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded transition flex items-center"
          >
            <div class="flex-1">
              <h3 class="font-medium">演示功能</h3>
              <p class="text-sm text-gray-600">透過 JSONP 實現的新增、列表、修改功能</p>
            </div>
            <div class="text-blue-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
              </svg>
            </div>
          </NuxtLink>
        </div>
      </div>
      
      <div class="mt-8 text-center text-gray-500 text-sm">
        <p>使用 Nuxt.js 與 Google Sheet 作為後端資料庫</p>
      </div>
    </div>
  </div>
</template>
