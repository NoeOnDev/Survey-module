import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import styles from '../../assets/styles/authStyles.module.css';
import verificationStyles from "../../assets/styles/verificationCodeStyles.module.css";

function LoginForm() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isFadingOut, setIsFadingOut] = useState(false);
    const inputsRefs = useRef([]);

    if (inputsRefs.current.length === 0) {
        inputsRefs.current = Array(6).fill().map((_, i) => inputsRefs.current[i] ?? React.createRef());
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleLocalLogin = async (event) => {
        event.preventDefault();

        const response = await fetch('http://localhost:9020/auth/local', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        });

        const data = await response.json();

        if (response.ok) {
            alert(data.message);
            setIsModalOpen(true);
        } else {
            alert(`Error: ${data.message}`);
        }
    };

    const handleGoogleLogin = (event) => {
        event.preventDefault();
        const googleAuthURL = 'http://localhost:9020/auth/google';
        window.location.href = googleAuthURL;
    };

    const focusNext = (event, i) => {
        const val = event.target.value;
        if (!/^\d$/.test(val)) {
            event.target.value = '';
            return;
        }
    
        if (val.length === 1 && i < inputsRefs.current.length - 1) {
            inputsRefs.current[i + 1].current.focus();
        }
    
        if (val.length === 1 && i === inputsRefs.current.length - 1) {
            const arePreviousFieldsFilled = inputsRefs.current.slice(0, i).every(input => /^\d$/.test(input.current.value));
            if (arePreviousFieldsFilled) {
                const code = inputsRefs.current.map(input => input.current.value).join('');
                verifyCode(email, code);
            }
        }
    };

    const focusPrev = (event, i) => {
        if (event.key === 'Backspace' && event.target.value === '' && i > 0) {
            inputsRefs.current[i - 1].current.focus();
        }
    };

    const handleCloseModal = () => {
        setIsFadingOut(true);
        setTimeout(() => {
            setIsModalOpen(false);
            setIsFadingOut(false);
        }, 500);
    };

    async function verifyCode(email, code) {
        try {
            const response = await fetch('http://localhost:9020/auth/verify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, code })
            });
            const data = await response.json();
            if (response.ok) {
                navigate('/home');
            } else {
                inputsRefs.current.forEach(input => {
                    input.current.value = '';
                });
                console.error('Error verifying code:', data.message);
            }
        } catch (error) {
            console.error('Error verifying code:', error);
        }
    }

    useEffect(() => {
        if (isModalOpen && inputsRefs.current[0].current) {
            inputsRefs.current[0].current.focus();
        }
    }, [isModalOpen]);

    return (
        <div className={styles.container}>
            <form action="" className={styles.form}>
                <p>
                    Welcome
                </p>
                <span>
                    Get started with your email below
                </span>
                <input type="email" placeholder="Email" name="email" value={email} onChange={handleEmailChange} />
                <button onClick={handleLocalLogin} className={styles.oauthButton}>
                    Continue
                    <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m6 17 5-5-5-5"></path><path d="m13 17 5-5-5-5"></path>
                    </svg>
                </button>
                <div className={styles.separator}>
                    <div></div>
                    <span>OR</span>
                    <div></div>
                </div>
                <button onClick={handleGoogleLogin} className={styles.oauthButton}>
                    <svg className={styles.icon} viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
                        <path d="M1 1h22v22H1z" fill="none"></path>
                    </svg>
                    Continue with Google
                </button>
            </form>
            <Modal
                className={`${verificationStyles.modal} ${isFadingOut ? verificationStyles.fadeOut : ''}`}
                isOpen={isModalOpen}
                onRequestClose={handleCloseModal}
                shouldFocusAfterRender={true}
                shouldReturnFocusAfterClose={true}
                shouldCloseOnOverlayClick={true}
                ariaHideApp={false}>
                <div className={verificationStyles.container}>
                    <button
                        className={verificationStyles.closeButton}
                        onClick={handleCloseModal}
                    >
                        X
                    </button>
                    <form className={verificationStyles.form}>
                        <p>
                            Verification Code
                        </p>
                        <span>
                            Enter the verification code sent to your email
                        </span>
                        <div className={verificationStyles.inputFields}>
                            {inputsRefs.current.map((inputRef, i) => (
                                <input
                                    key={i}
                                    ref={inputRef}
                                    maxLength="1"
                                    type="tel"
                                    placeholder=""
                                    onChange={(event) => focusNext(event, i)}
                                    onKeyDown={(event) => focusPrev(event, i)}
                                />
                            ))}
                        </div>
                        <span>Didn't receive the code?</span>
                    </form>
                </div>
            </Modal>
        </div>
    );
}

export default LoginForm;