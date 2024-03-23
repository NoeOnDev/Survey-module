import React from 'react';
import styles from '../../assets/styles/authStyles.module.css';

function LoginForm() {
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.cardSwitch}>
                    <label className={styles.switch}>
                        <input type="checkbox" className={styles.toggle} />
                        <span className={styles.slider}></span>
                        <span className={styles.cardSide}></span>
                        <div className={styles.flipCardInner}>
                            <div className={styles.flipCardFront}>
                                <div className={styles.title}>Log in</div>
                                <form className={styles.flipCardForm} action="">
                                    <input className={styles.flipCardInput} name="email" placeholder="Email" type="email" />
                                    <input className={styles.flipCardInput} name="password" placeholder="Password" type="password" />
                                    <button className={styles.flipCardBtn}>Let`s go!</button>
                                </form>
                            </div>
                            <div className={styles.flipCardBack}>
                                <div className={styles.title}>Sign up</div>
                                <form className={styles.flipCardForm} action="">
                                    <input className={styles.flipCardInput} placeholder="Name" type="name" />
                                    <input className={styles.flipCardInput} name="email" placeholder="Email" type="email" />
                                    <input className={styles.flipCardInput} name="password" placeholder="Password" type="password" />
                                    <button className={styles.flipCardBtn}>Confirm!</button>
                                </form>
                            </div>
                        </div>
                    </label>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;