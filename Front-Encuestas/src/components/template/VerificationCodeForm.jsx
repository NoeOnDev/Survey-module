import React, { useRef } from 'react';
import styles from "../../assets/styles/verificationCodeStyles.module.css";

function VerificationCodeForm() {
    const inputs = Array(6).fill(0).map(() => useRef(null));

    const focusNext = (event, i) => {
        const val = event.target.value;
        if (!/^\d$/.test(val)) {
            event.target.value = '';
            return;
        }

        if (val.length === 1 && i < inputs.length - 1) {
            inputs[i + 1].current.focus();
        }
    };

    const focusPrev = (event, i) => {
        if (event.key === 'Backspace' && event.target.value === '' && i > 0) {
            inputs[i - 1].current.focus();
        }
    };

    return (
        <div className={styles.container}>
            <form className={styles.form}>
                <p>
                    Verification Code
                </p>
                <span>
                    Enter the verification code sent to your email
                </span>
                <div className={styles.inputFields}>
                    {inputs.map((inputRef, i) => (
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
    );
}

export default VerificationCodeForm;
