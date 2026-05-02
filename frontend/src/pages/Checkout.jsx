import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext.jsx";
import { API_BASE_URL } from '../apiConfig';
import "./Checkout.css";

function Checkout() {
    const { user } = useContext(AuthContext);
    const { cart, setCart } = useContext(CartContext);

    const [orderData, setOrderData] = useState(null);
    const [orderDone, setOrderDone] = useState(false);

    const [form, setForm] = useState({
        name: "",
        surname: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        zip: "",
        country: "",
        delivery: "zasilkovna",
        payment: "card",
    });

    const totalProducts = cart.reduce(
        (sum, item) => sum + item.cena * item.quantity,
        0
    );

    const deliveryPrice = form.delivery === "kuryr" ? 120 : 70;
    const totalPrice = totalProducts + deliveryPrice;

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !form.name ||
            !form.surname ||
            !form.email ||
            !form.phone ||
            !form.address ||
            !form.city ||
            !form.zip ||
            !form.country
        ) {
            alert("Vyplň všechna pole");
            return;
        }

        const order = {
            userId: user.id,
            deliveryAddress: `${form.address}, ${form.city}, ${form.zip}, ${form.country}`,
            notes: `Doprava: ${form.delivery}, Platba: ${form.payment}`,
            items: cart.map(item => ({
                productId: item.id,
                quantity: item.quantity,
                unitPrice: item.cena,
                totalPrice: item.cena * item.quantity,
            }))
        };

        try {
            const token = localStorage.getItem("token");

            const res = await fetch(`${API_BASE_URL}/orders`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(order),
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.message || "Chyba objednávky");
                return;
            }

            setOrderData({ items: cart, total: totalPrice, delivery: form.delivery, payment: form.payment });
            setOrderDone(true);
            setCart([]);
        } catch (err) {
            console.error(err);
            alert("Server error");
        }
    };

    if (orderDone && orderData) {
        return (
            <div className="order-page">
                <h1 className="order-title">Děkujeme za objednávku!</h1>
                <p className="order-sub">Vaše objednávka byla úspěšně vytvořena.</p>

                <div className="order-box">
                    <h2>Rekapitulace objednávky</h2>

                    <div className="order-items">
                        {orderData.items.map((item, i) => (
                            <div key={i} className="order-item">
                                <div className="order-left">
                                    <span>{item.nazev}</span>
                                    <span>{item.quantity}×</span>
                                </div>
                                <div>{item.cena * item.quantity} Kč</div>
                            </div>
                        ))}
                    </div>

                    <div className="order-divider" />

                    <div className="order-item">
                        <span>Doprava</span>
                        <span>{orderData.delivery === "kuryr" ? "Kurýr" : "Zásilkovna"}</span>
                    </div>

                    <div className="order-item">
                        <span>Platba</span>
                        <span>
                            {orderData.payment === "card" && "Platební karta"}
                            {orderData.payment === "dobírka" && "Dobírka"}
                            {orderData.payment === "prevod" && "Bankovní převod"}
                        </span>
                    </div>

                    <div className="order-divider" />

                    <div className="order-total-row">
                        <span>Celkem</span>
                        <span>{orderData.total} Kč</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="checkout-page">
            <h1 className="checkout-title">Pokladna</h1>

            <div className="checkout-layout">

                <form className="checkout-form" onSubmit={handleSubmit}>
                    <h2>Kontaktní údaje</h2>
                    <input name="name" placeholder="Jméno" onChange={handleChange} />
                    <input name="surname" placeholder="Příjmení" onChange={handleChange} />
                    <input name="email" placeholder="Email" onChange={handleChange} />
                    <input name="phone" placeholder="Telefon" onChange={handleChange} />

                    <h2>Adresa</h2>
                    <input name="address" placeholder="Ulice" onChange={handleChange} />
                    <input name="city" placeholder="Město" onChange={handleChange} />
                    <input name="zip" placeholder="PSČ" onChange={handleChange} />
                    <input name="country" placeholder="Stát" onChange={handleChange} />

                    <h2>Doprava</h2>
                    <div className="option-list">
                        <div
                            className={`option-row ${form.delivery === "zasilkovna" ? "active" : ""}`}
                            onClick={() => setForm({ ...form, delivery: "zasilkovna" })}
                        >
                            <div>
                                <h3>Zásilkovna</h3>
                                <p>Vyzvednutí na pobočce</p>
                            </div>
                            <span>70 Kč</span>
                        </div>

                        <div
                            className={`option-row ${form.delivery === "kuryr" ? "active" : ""}`}
                            onClick={() => setForm({ ...form, delivery: "kuryr" })}
                        >
                            <div>
                                <h3>Kurýr</h3>
                                <p>Doručení na adresu</p>
                            </div>
                            <span>120 Kč</span>
                        </div>
                    </div>

                    <h2>Platba</h2>
                    <div className="option-list">
                        <div
                            className={`option-row ${form.payment === "card" ? "active" : ""}`}
                            onClick={() => setForm({ ...form, payment: "card" })}
                        >
                            <div>
                                <h3>Platební karta</h3>
                                <p>Visa, Mastercard, Amex</p>
                            </div>
                            <span>Zdarma</span>
                        </div>

                        <div
                            className={`option-row ${form.payment === "dobírka" ? "active" : ""}`}
                            onClick={() => setForm({ ...form, payment: "dobírka" })}
                        >
                            <div>
                                <h3>Dobírka</h3>
                                <p>Platba při převzetí</p>
                            </div>
                            <span>Zdarma</span>
                        </div>

                        <div
                            className={`option-row ${form.payment === "prevod" ? "active" : ""}`}
                            onClick={() => setForm({ ...form, payment: "prevod" })}
                        >
                            <div>
                                <h3>Bankovní převod</h3>
                                <p>Platba předem na účet</p>
                            </div>
                            <span>Zdarma</span>
                        </div>
                    </div>

                    <button type="submit" className="checkout-submit">
                        Dokončit objednávku
                    </button>
                </form>

                <div className="checkout-summary">
                    <h2>Souhrn</h2>
                    {cart.map((item, i) => (
                        <div key={i} className="summary-item">
                            <span>{item.nazev} ({item.quantity}×)</span>
                            <span>{item.cena * item.quantity} Kč</span>
                        </div>
                    ))}
                    <div className="summary-row">
                        <span>Doprava</span>
                        <span>{deliveryPrice} Kč</span>
                    </div>
                    <div className="summary-row total">
                        <span>Celkem</span>
                        <span>{totalPrice} Kč</span>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Checkout;