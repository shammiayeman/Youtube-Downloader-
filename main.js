import { app, BrowserWindow, ipcMain, dialog, Menu } from 'electron';//app, BrowserWindow, ipcMain, dialog আসে electron থেকে—উইন্ডো বানানো, IPC মেসেজ ধরা এবং Save ডায়ালগ দেখানোর জন্য।
import path from 'path';//path, fileURLToPath, fs হলো Node.js-এর বিল্ট-ইন মডিউল (ফাইল পাথ ঠিক করা ও কম্পিউটারের ডিস্কে ফাইল লেখার জন্য)।
import { fileURLToPath } from 'url';
import fs from 'fs';
import { Ytdl, Quality } from '@distube/ytdl-core';//ytdl r quality ashe @distube/ytdl-core

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const yt = new Ytdl(); // Initialize the downloader instance(downloader obejct toiri kora hy )

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 500,//500*400 pixel er window banano hoyeche 
    height: 400,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),//main r preload jukto hoyeche
      contextIsolation: true,//ei duiti rakha hy sequirity er jonno jate web sorasori node js er khomota na pay
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
ipcMain.handle('download-video', async (event, url) => {//renderer theke download video call ele ei function ti cole 
  try {
    const ytRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;//url thikmoto youtube.comba youtu.be er kina check kore vull hole message show kore 
    if (!url || !ytRegex.test(url)) {
      return { success: false, message: 'Invalid YouTube URL' };
    }

    // Prompt user where to save the file
    const { filePath } = await dialog.showSaveDialog({//dialog.showSaveDialog(...) খুলে ইউজারকে জিজ্ঞেস করে ভিডিওটি কোথায় ও কী নামে (ডিফল্ট video.mp4) সেভ করবে। ইউজার Cancel করলে { success: false, message: 'Download cancelled' } ফেরত দেয়।
      defaultPath: 'video.mp4',
      filters: [{ name: 'Videos', extensions: ['mp4'] }]
    });

    if (!filePath) return { success: false, message: 'Download cancelled' };

    // Fetch video info and stream using the modern instance API
    const info = await yt.getInfo(url);//video tottho ane 
    const videoStream = yt.download(info, { quality: Quality.HighestVideo });//video strem ney
    const fileStream = fs.createWriteStream(filePath);//fs.createWriteStream(filePath) দিয়ে সেই ফাইলে লেখে (pipe).

    videoStream.pipe(fileStream);

    return new Promise((resolve) => {
      fileStream.on('finish', () => resolve({ success: true, message: 'Downloaded successfully!' }));
      fileStream.on('error', (err) => resolve({ success: false, message: err.message }));
    });//ফাইল লেখা শেষ হলে 'finish' ইভেন্টে { success: true, message: 'Downloaded successfully!' } রিটার্ন করে। কোনো এরর হলে catch ব্লক ধরে নিয়ে মেসেজ ফেরত দেয়।
  } catch (err) {
    return { success: false, message: err.message };
  }
});