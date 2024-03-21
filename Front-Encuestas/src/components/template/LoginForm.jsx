import React from 'react';

function LoginForm() {
    const handleLogin = () => {
        // Redirige al usuario a la ruta de autenticación de Google en el backend
        window.location.href = 'http://localhost:9020/auth/google'; // Asegúrate de cambiar esto a la URL de tu backend
    };

    return (
        <div>
            <h1>Login</h1>
            <button onClick={handleLogin}>Iniciar sesión con Google</button>
        </div>
    );
}

export default LoginForm;