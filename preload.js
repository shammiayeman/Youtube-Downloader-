const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  downloadVideo: (url) => ipcRenderer.invoke('download-video', url)
});