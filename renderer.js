document.getElementById('downloadBtn').addEventListener('click', async () => {//button e click korle vitorer async function ti cole
  const url = document.getElementById('urlInput').value.trim();//urlInput থেকে লেখা নিয়ে .trim() দিয়ে বাড়তি স্পেস কাটে। খালি থাকলে 'Please enter a URL!' লাল রঙে দেখিয়ে ওখানেই থেমে যায় (return)।
  const status = document.getElementById('status');

  if (!url) {
    status.innerText = 'Please enter a URL!';
    status.style.color = 'red';
    return;
  }

  status.innerText = 'Downloading... Please wait.';
  status.style.color = 'blue';

  const result = await window.api.downloadVideo(url);//preload.js-এর মাধ্যমে main.js-এ ডাউনলোড রিকোয়েস্ট পাঠায় এবং শেষ হওয়া পর্যন্ত অপেক্ষা করে।

  status.innerText = result.message;
  status.style.color = result.success ? 'green' : 'red';//main.js থেকে আসা result.message টেক্সট হিসেবে দেখায় এবং result.success সত্য হলে সবুজ (green), না হলে লাল (red) রঙ করে।
});//index.html + style.css + renderer.js = ফ্রন্টএন্ড / UI অংশ।
//preload.js = নিরাপদ ব্রিজ (contextBridge + ipcRenderer.invoke)।
//main.js = ব্যাকএন্ড / Main Process (BrowserWindow + dialog.showSaveDialog + ipcMain.handle + @distube/ytdl-core + fs)।