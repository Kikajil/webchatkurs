document.addEventListener('DOMContentLoaded', () => {
    const createConferenceBtn = document.getElementById('createConferenceBtn');
    const joinConferenceBtn = document.getElementById('joinConferenceBtn');
    const createConferenceModal = document.getElementById('createConferenceModal');
    const closeBtn = document.querySelector('.close');
    const createConferenceForm = document.getElementById('createConferenceForm');

    createConferenceBtn.addEventListener('click', () => {
        createConferenceModal.style.display = 'block';
    });

    closeBtn.addEventListener('click', () => {
        createConferenceModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === createConferenceModal) {
            createConferenceModal.style.display = 'none';
        }
    });

    createConferenceForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(createConferenceForm);
        const data = {
            name: formData.get('name'),
            constraints: Array.from(formData.getAll('constraints'))
        };

        try {
            const response = await fetch('/api/rooms', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (response.status === 201) {
                alert('Conference created successfully');
                createConferenceModal.style.display = 'none';
                window.location.href = `/new?room=${result.room.id}`;
            } else {
                console.error('Error creating conference:', result.message);
            }
        } catch (error) {
            console.error('Error creating conference:', error);
        }
    });

    joinConferenceBtn.addEventListener('click', () => {
        const roomId = prompt('Enter room ID:');
        if (roomId) {
            window.location.href = `/new?room=${roomId}`;
        }
    });
});
