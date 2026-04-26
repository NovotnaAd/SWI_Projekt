import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import "./Checkout.css";

function Checkout() {
    const { cart, setCart } = useContext(CartContext);

    const [orderData, setOrderData] = useState(null);

    const [form, setForm] = useState({
        name: "",
        email: "",
        address: "",
        city: "",
        zip: "",
        delivery: "zasilkovna",
        payment: "card",
    });

    const [orderDone, setOrderDone] = useState(false);

    const totalProducts = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const deliveryPrice =
        form.delivery === "kuryr" ? 120 : 70;

    const totalPrice = totalProducts + deliveryPrice;

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!form.name || !form.email || !form.address) {
            alert("Vyplň všechna pole");
            return;
        }

        const order = {
            id: Date.now(),
            items: cart,
            customer: form,
            total: totalPrice,
        };

        setOrderData(order); // 🔥 uložíme do state
        setOrderDone(true);
        setCart([]);
    };

    if (orderDone && orderData) {
        return (
            <div className="order-page">

                <h1 className="order-title">
                    Děkujeme za objednávku!
                </h1>

                <p className="order-sub">
                    Vaše objednávka byla úspěšně vytvořena.
                </p>

                <div className="order-box">

                    <h2>Rekapitulace objednávky</h2>

                    <div className="order-items">
                        {orderData.items.map((item, i) => (
                            <div key={i} className="order-item">

                                <div className="order-left">
                                    <span className="order-name">{item.name}</span>
                                    <span className="order-qty">{item.quantity}×</span>
                                </div>

                                <div className="order-price">
                                    {item.price * item.quantity} Kč
                                </div>

                            </div>
                        ))}
                    </div>

                    <div className="order-divider"></div>

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

                {/* LEFT */}
                <form className="checkout-form" onSubmit={handleSubmit}>

                    {/* 👤 OSOBNÍ ÚDAJE */}
                    <h2>Kontaktní údaje</h2>

                    <input
                        type="text"
                        name="name"
                        placeholder="Jméno"
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="surname"
                        placeholder="Příjmení"
                        onChange={handleChange}
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                    />

                    {/* 📦 ADRESA */}
                    <h2>Doručovací adresa</h2>

                    <input
                        type="text"
                        name="address"
                        placeholder="Ulice a číslo"
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="city"
                        placeholder="Město"
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="zip"
                        placeholder="PSČ"
                        onChange={handleChange}
                    />

                    {/* DOPRAVA */}
                    <h2>Doprava</h2>

                    <div className="option-list">
                        {[
                            { id: "zasilkovna", name: "Zásilkovna", price: 70, desc: "Výdejní místo" },
                            { id: "kuryr", name: "Kurýr", price: 120, desc: "Doručení domů" },
                            { id: "osobni", name: "Osobní odběr", price: 0, desc: "Zdarma" }
                        ].map(option => (
                            <div
                                key={option.id}
                                className={`option-row ${form.delivery === option.id ? "active" : ""}`}
                                onClick={() => setForm({ ...form, delivery: option.id })}
                            >
                                <div>
                                    <h3>{option.name}</h3>
                                    <p>{option.desc}</p>
                                </div>

                                <span>{option.price} Kč</span>
                            </div>
                        ))}
                    </div>


                    {/* PLATBA */}
                    <h2>Platba</h2>

                    <div className="option-list">
                        {[
                            { id: "card", name: "Karta", desc: "Online platba" },
                            { id: "apple", name: "Apple Pay", desc: "Rychlá platba" },
                            { id: "google", name: "Google Pay", desc: "Rychlá platba" },
                            { id: "dobirka", name: "Dobírka", desc: "Platba při převzetí" }
                        ].map(option => (
                            <div
                                key={option.id}
                                className={`option-row ${form.payment === option.id ? "active" : ""}`}
                                onClick={() => setForm({ ...form, payment: option.id })}
                            >
                                <div>
                                    <h3>{option.name}</h3>
                                    <p>{option.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {form.payment === "card" && (
                        <div className="card-box">

                            <input
                                type="text"
                                placeholder="Číslo karty"
                                className="card-input"
                            />

                            <div className="card-row">
                                <input
                                    type="text"
                                    placeholder="MM/YY"
                                    className="card-input"
                                />

                                <input
                                    type="text"
                                    placeholder="CVC"
                                    className="card-input"
                                />
                            </div>

                        </div>
                    )}

                    <button type="submit" className="checkout-submit">
                        Dokončit objednávku
                    </button>

                </form>

                {/* RIGHT - SUMMARY */}
                <div className="checkout-summary">

                    <h2>Souhrn</h2>

                    {cart.map((item, i) => (
                        <div key={i} className="summary-item">
                            <span>{item.name}</span>
                            <span>{item.quantity}×</span>
                        </div>
                    ))}

                    <div className="summary-row">
                        <span>Doprava</span>
                        <span>{deliveryPrice} Kč</span>
                    </div>

                    <div className="total">
                        Celkem: {totalPrice} Kč
                    </div>

                </div>

            </div>

        </div>
    );
}

export default Checkout;