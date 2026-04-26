import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    // načtení uživatele při refreshi
    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    // 🔐 LOGIN
    const login = (email, password) => {
        const users = JSON.parse(localStorage.getItem("users")) || [];

        const foundUser = users.find(
            (u) => u.email === email && u.password === password
        );

        if (!foundUser) {
            alert("Špatný email nebo heslo");
            return false;
        }

        setUser(foundUser);
        localStorage.setItem("user", JSON.stringify(foundUser));
        return true;
    };

    const register = (firstName, lastName, email, password) => {
        const users = JSON.parse(localStorage.getItem("users")) || [];

        const exists = users.find((u) => u.email === email);

        if (exists) {
            alert("Uživatel už existuje");
            return false;
        }

        const newUser = { firstName, lastName, email, password };

        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));

        setUser(newUser);
        localStorage.setItem("user", JSON.stringify(newUser));

        return true;
    };

    // 🚪 LOGOUT
    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;