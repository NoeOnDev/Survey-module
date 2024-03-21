import React from 'react';

function LoginForm() {
    const handleLogin = () => {
        window.location.href = 'http://localhost:9020/auth/google';
    };

    return (
        <div>
            <h1>Login</h1>
            <button onClick={handleLogin}>Iniciar sesión con Google</button>
        </div>
    );
}

export default LoginForm;