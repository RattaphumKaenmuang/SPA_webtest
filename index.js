const API_URL = "http://127.0.0.1:6969"

document.addEventListener('DOMContentLoaded', () => {
    fetch(API_URL + '/sysinfo')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            document.getElementById('hostname').textContent = `${data.hostname}`;
            document.getElementById('platform').textContent = `${data.platform}`;
            document.getElementById('arch').textContent = `${data.arch}`;
            document.getElementById('release').textContent = `${data.release}`;
            document.getElementById('uptime').textContent = `${data.uptime}`;
            document.getElementById('totalMemory').textContent = `${data.totalMemory} MB`;
            document.getElementById('freeMemory').textContent = `${data.freeMemory} MB`;
        })
        .catch(error => console.error('Error fetching info:', error));
})