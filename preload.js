const { contextBridge, ipcRenderer } = require('electron');//contex bridege diye main and renderer k connection estab hy

contextBridge.exposeInMainWorld('api', {
  downloadVideo: (url) => ipcRenderer.invoke('download-video', url)
});//preload.js চলে index.html লোড হওয়ার ঠিক আগে। এর কাজ হলো main.js এবং renderer.js-এর মাঝে একটি নিরাপদ রাস্তা তৈরি করা।
//contextBridge.exposeInMainWorld('api', ...): ব্রাউজার/Renderer-এর window অবজেক্টে api নামে একটি নিরাপদ অবজেক্ট যুক্ত করে
// ipcRenderer.invoke('download-video', url): url নিয়ে main.js-এর 'download-video' হ্যান্ডলারে পাঠায় এবং কাজ শেষ হলে ফলাফল (Promise) ফিরিয়ে আনে।