document.getElementById('downloadBtn').addEventListener('click', async () => {
  const url = document.getElementById('urlInput').value.trim();
  const status = document.getElementById('status');

  if (!url) {
    status.innerText = 'Please enter a URL!';
    status.style.color = 'red';
    return;
  }

  status.innerText = 'Downloading... Please wait.';
  status.style.color = 'blue';

  const result = await window.api.downloadVideo(url);

  status.innerText = result.message;
  status.style.color = result.success ? 'green' : 'red';
});