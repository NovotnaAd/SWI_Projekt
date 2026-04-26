import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

function Login() {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        // basic validace
        if (!email.trim() || !password.trim()) {
            alert("Vyplň všechna pole");
            return;
        }

        // vyčištění dat
        const cleanEmail = email.trim().toLowerCase();
        const cleanPassword = password.trim();

        // login
        const success = login(cleanEmail, cleanPassword);

        // přesměrování jen pokud OK
        if (success) {
            navigate("/");
        }
    };

    return (
        <div className="login-page">

            <div className="login-box">

                <h1>Přihlášení</h1>

                <form onSubmit={handleSubmit} className="login-form">

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
                        Přihlásit se
                    </button>

                </form>

                <p style={{ marginTop: "10px" }}>
                    Nemáš účet? <Link to="/register">Registruj se</Link>
                </p>

            </div>

        </div>
    );
}

export default Login;