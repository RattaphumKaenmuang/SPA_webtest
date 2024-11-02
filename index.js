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

function get_students() {
    fetch('/api/students')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`)
            }
            return response.json();
        })
        .then(data => set_students_table(data))
        .catch(error => console.error('Error fetching students:', error))
}

function set_students_table(students) {
    const tbody = document.querySelector('#students-table tbody');
    tbody.innerHTML = ''; // Clear existing rows

    students.forEach(student => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.surname}</td>
            <td>${student.year}</td>
            <td>${student.ID}</td>
            <td>${student.GPA}</td>
        `;
        tbody.appendChild(row);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    get_sysinfo();
    get_students();
});

document.getElementById('student-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const student = {
        name: document.getElementById('name').value,
        surname: document.getElementById('surname').value,
        year: parseInt(document.getElementById('year').value),
        ID: document.getElementById('ID').value,
        GPA: parseFloat(document.getElementById('GPA').value)
    };

    fetch('/api/add_student', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(student)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Student added:', data);
        get_students(); // Refresh the student list
    })
    .catch(error => console.error('Error adding student:', error));
});