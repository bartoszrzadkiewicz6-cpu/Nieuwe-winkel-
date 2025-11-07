import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Shop() {
  const [products, setProducts] = useState([
    { id: 1, name: "Kawa Ziarnista", price: 39 },
    { id: 2, name: "Herbata Jaśminowa", price: 29 },
    { id: 3, name: "Czekolada 70%", price: 19 }
  ]);

  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLogin, setShowLogin] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');

  function addToCart(item) {
    setCart([...cart, item]);
  }

  function handleLogin() {
    if (loginEmail && loginPassword) {
      setUser({ email: loginEmail });
      setShowLogin(false);
    }
  }

  const total = cart.reduce((s, p) => s + p.price, 0);

  function processPayment(method) {
    setPaymentMethod(method);
    setShowPayment(true);
    setCart([]); // symulacja opłacenia koszyka
  }

  return (
    <div className="min-h-screen p-8 grid gap-6 bg-neutral-100">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Mój Sklep</h1>
        {!user ? (
          <Button onClick={() => setShowLogin(true)} className="rounded-2xl p-2">Zaloguj</Button>
        ) : (
          <div className="text-lg flex gap-2">
            Witaj, {user.email}
            <Button onClick={() => setShowAdmin(!showAdmin)} className="rounded-2xl p-2">{showAdmin ? "Zamknij panel" : "Panel admina"}</Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map(p => (
          <Card key={p.id} className="shadow-md rounded-2xl">
            <CardContent className="p-4 grid gap-2">
              <div className="text-xl font-semibold">{p.name}</div>
              <div className="text-lg">{p.price} zł</div>
              <Button onClick={() => addToCart(p)} className="rounded-2xl p-2">Dodaj do koszyka</Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="shadow-md rounded-2xl mt-6">
        <CardContent className="p-4 grid gap-2">
          <h2 className="text-2xl font-semibold">Koszyk</h2>
          {cart.length === 0 && <div>Koszyk jest pusty</div>}
          {cart.map((item, i) => (
            <div key={i}>{item.name} — {item.price} zł</div>
          ))}
          <div className="font-bold text-xl mt-2">Razem: {total} zł</div>
          {cart.length > 0 && (
            <div className="grid gap-2 mt-2">
              <Button onClick={() => processPayment('PayPal')} className="rounded-2xl p-2">Zapłać PayPal</Button>
              <Button onClick={() => processPayment('Blik')} className="rounded-2xl p-2">Zapłać Blik</Button>
              <Button onClick={() => processPayment('Karta')} className="rounded-2xl p-2">Zapłać Kartą</Button>
            </div>
          )}
        </CardContent>
      </Card>

      {showPayment && (
        <Card className="shadow-md rounded-2xl p-6 max-w-sm mx-auto mt-6">
          <CardContent className="grid gap-4">
            <h2 className="text-xl font-semibold">Płatność zrealizowana</h2>
            <div>Wybrana metoda: {paymentMethod}</div>
            <Button onClick={() => setShowPayment(false)} className="rounded-2xl p-2 mt-2">OK</Button>
          </CardContent>
        </Card>
      )}

      {showLogin && (
        <Card className="shadow-md rounded-2xl p-6 max-w-sm mx-auto mt-6">
          <CardContent className="grid gap-4">
            <h2 className="text-xl font-semibold">Logowanie</h2>
            <input className="p-2 rounded border" placeholder="Email" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} />
            <input className="p-2 rounded border" placeholder="Hasło" type="password" value={loginPassword} onChange={e => setLoginPassword(e.target.value)} />
            <Button onClick={handleLogin} className="rounded-2xl p-2">Zaloguj</Button>
          </CardContent>
        </Card>
      )}

      {showAdmin && (
        <Card className="shadow-md rounded-2xl p-6 mt-6">
          <CardContent className="grid gap-4">
            <h2 className="text-2xl font-semibold">Panel administratora</h2>
            <form className="grid gap-2" onSubmit={e => {
              e.preventDefault();
              const name = e.target.name.value;
              const price = Number(e.target.price.value);
              if(name && price){
                setProducts([...products, { id: Date.now(), name, price }]);
                e.target.reset();
              }
            }}>
              <input className="p-2 rounded border" name="name" placeholder="Nazwa produktu" />
              <input className="p-2 rounded border" name="price" placeholder="Cena" type="number" />
              <Button type="submit" className="rounded-2xl p-2">Dodaj produkt</Button>
            </form>
          </CardContent>
        </Card>
      )}

    </div>
  );
}
