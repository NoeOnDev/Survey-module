import styles from "../../assets/styles/verificationCodeStyles.module.css";

function VerificationCodeForm() {
    return (
        <div className={styles.container}>
            <form className={styles.form}>
                <div className={styles.inputFields}>
                    <input maxLength="1" type="tel" placeholder="" />
                    <input maxLength="1" type="tel" placeholder="" />
                    <input maxLength="1" type="tel" placeholder="" />
                    <input maxLength="1" type="tel" placeholder="" />
                    <input maxLength="1" type="tel" placeholder="" />
                    <input maxLength="1" type="tel" placeholder="" />
                </div>
            </form>
        </div>
    );
}

export default VerificationCodeForm;