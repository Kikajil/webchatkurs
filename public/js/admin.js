document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = '/login.html';
        return;
    }

    const usersTableBody = document.querySelector('#usersTable tbody');
    const addUserForm = document.getElementById('addUserForm');

    const fetchUsers = async () => {
        try {
            const response = await fetch('/api/users', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const users = await response.json();

            usersTableBody.innerHTML = '';
            users.forEach(user => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${user.username}</td>
                    <td>${user.firstNmame}</td>
                    <td>${user.lastNmame}</td>
                    <td>${user.role}</td>
                    <td>
                        <button onclick="deleteUser(${user.id})">Delete</button>
                        <button onclick="updateRole(${user.id})">Make Organizer</button>
                    </td>
                `;
                usersTableBody.appendChild(row);
            });
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const deleteUser = async (id) => {
        try {
            const response = await fetch(`/api/users/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.status === 200) {
                fetchUsers();
            } else {
                console.error('Error deleting user');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const updateRole = async (id) => {
        try {
            const response = await fetch(`/api/users/${id}/role`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ role: 'organizer' })
            });

            if (response.status === 200) {
                fetchUsers();
            } else {
                console.error('Error updating role');
            }
        } catch (error) {
            console.error('Error updating role:', error);
        }
    };

    addUserForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(addUserForm);
        const data = {
            username: formData.get('username'),
            password: formData.get('password'),
            firstNmame: formData.get('firstNmame'),
            lastNmame: formData.get('lastNmame'),
            role: formData.get('role')
        };

        try {
            const response = await fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.status === 201) {
                fetchUsers();
                addUserForm.reset();
            } else {
                console.error('Error adding user');
            }
        } catch (error) {
            console.error('Error adding user:', error);
        }
    });

    document.getElementById('logout').addEventListener('click', () => {
        localStorage.removeItem('token');
        window.location.href = '/login.html';
    });

    fetchUsers();
});
