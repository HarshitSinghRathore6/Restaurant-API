
        const registerForm = document.getElementById('registerForm');
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const userName = document.getElementById('userName').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const password = document.getElementById('password').value;

            try {
                const response = await fetch('/api/v1/user/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ userName, email, phone, password })
                });
                const data = await response.json();
                if (response.ok) {
                    document.getElementById('registerResult').textContent = data.message;
                } else {
                    throw new Error(data.error);
                }
            } catch (error) {
                document.getElementById('registerResult').textContent = `Error registering user: ${error.message}`;
            }
        });
