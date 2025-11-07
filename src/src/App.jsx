import { useState } from "react";

export default function App() {
  const products = [
    { id: 1, name: "Kawa Ziarnista", price: 39 },
    { id: 2, name: "Herbata Jaśminowa", price: 29 },
    { id: 3, name: "Czekolada 70%", price: 19 }
  ];

  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [show, setShow] = useState(false);

  function addToCart(p) {
    setCart([...cart, p]);
  }

  function submit() {
    if (email && pass) {
      setUser({ email });
      setShow(false);
    }
  }

  const total = cart.reduce((s, p) => s + p.price, 0);

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h1>Mój Sklep</h1>

      {!user ? (
        <button onClick={() => setShow(true)}>Zaloguj</button>
      ) : (
        <div>Witaj, {user.email}</div>
      )}

      <h2>Produkty</h2>
      {products.map(p => (
        <div key={p.id} style={{ marginBottom: 10 }}>
          {p.name} - {p.price} zł
          <button onClick={() => addToCart(p)} style={{ marginLeft: 10 }}>
            Dodaj
          </button>
        </div>
      ))}

      <h2>Koszyk</h2>
      {cart.length === 0 && <div>Pusty</div>}
      {cart.map((i, k) => (
        <div key={k}>{i.name} — {i.price} zł</div>
      ))}
      <strong>Razem: {total} zł</strong>

      {show && (
        <div style={{ marginTop: 20, padding: 10, border: "1px solid #999" }}>
          <h3>{mode === "login" ? "Logowanie" : "Rejestracja"}</h3>
          <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} /><br/>
          <input placeholder="Hasło" type="password" value={pass} onChange={e => setPass(e.target.value)} /><br/>
          <button onClick={submit}>OK</button>
        </div>
      )}
    </div>
  );
}
