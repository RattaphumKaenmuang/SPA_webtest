function get_sysinfo() {
    fetch('/api/sysinfo')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => set_sysinfo_block(data))
        .catch(error => console.error('Error fetching info:', error));
}

function set_sysinfo_block(data) {
    document.getElementById('hostname').textContent = `${data.hostname}`;
    document.getElementById('platform').textContent = `${data.platform}`;
    document.getElementById('arch').textContent = `${data.arch}`;
    document.getElementById('release').textContent = `${data.release}`;
    document.getElementById('uptime').textContent = `${data.uptime}`;
    document.getElementById('totalMemory').textContent = `${data.totalMemory} MB`;
    document.getElementById('freeMemory').textContent = `${data.freeMemory} MB`;
}

document.addEventListener('DOMContentLoaded', () => {
    get_sysinfo();
});