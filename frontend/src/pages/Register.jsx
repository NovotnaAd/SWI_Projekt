import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Register() {
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        // validace všech polí
        if (
            !firstName.trim() ||
            !lastName.trim() ||
            !email.trim() ||
            !password.trim()
        ) {
            alert("Vyplň všechna pole");
            return;
        }

        // čištění dat
        const cleanFirstName = firstName.trim();
        const cleanLastName = lastName.trim();
        const cleanEmail = email.trim().toLowerCase();
        const cleanPassword = password.trim();

        // 🔐 registrace
        const success = register(
            cleanFirstName,
            cleanLastName,
            cleanEmail,
            cleanPassword
        );

        if (success) {
            navigate("/");
        }
    };

    return (
        <div className="login-page">
            <div className="login-box">

                <h1>Registrace</h1>

                <form onSubmit={handleSubmit} className="login-form">

                    <input
                        type="text"
                        placeholder="Jméno"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />

                    <input
                        type="text"
                        placeholder="Příjmení"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Heslo"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button type="submit">
                        Vytvořit účet
                    </button>

                </form>

            </div>
        </div>
    );
}

export default Register;