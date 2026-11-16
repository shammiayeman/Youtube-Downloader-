import { app, BrowserWindow, ipcMain, dialog, Menu } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { Ytdl, Quality } from '@distube/ytdl-core';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const yt = new Ytdl(); // Initialize the downloader instance

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 500,
    height: 400,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  Menu.setApplicationMenu(null); // Remove default menu for a cleaner look
  mainWindow.loadFile('index.html');
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// Handle download trigger from renderer
ipcMain.handle('download-video', async (event, url) => {
  try {
    const ytRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
    if (!url || !ytRegex.test(url)) {
      return { success: false, message: 'Invalid YouTube URL' };
    }

    // Prompt user where to save the file
    const { filePath } = await dialog.showSaveDialog({
      defaultPath: 'video.mp4',
      filters: [{ name: 'Videos', extensions: ['mp4'] }]
    });

    if (!filePath) return { success: false, message: 'Download cancelled' };

    // Fetch video info and stream using the modern instance API
    const info = await yt.getInfo(url);
    const videoStream = yt.download(info, { quality: Quality.HighestVideo });
    const fileStream = fs.createWriteStream(filePath);

    videoStream.pipe(fileStream);

    return new Promise((resolve) => {
      fileStream.on('finish', () => resolve({ success: true, message: 'Downloaded successfully!' }));
      fileStream.on('error', (err) => resolve({ success: false, message: err.message }));
    });
  } catch (err) {
    return { success: false, message: err.message };
  }
});