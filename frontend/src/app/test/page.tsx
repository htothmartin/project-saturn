'use client';

import { useState, useEffect, useRef } from 'react';

export default function TestPage() {
  const [count, setCount] = useState(0);

  // A ref, amely a legfrissebb count értéket fogja tárolni
  const countRef = useRef(count);

  // Frissítsük a ref értékét, amikor a count változik
  useEffect(() => {
    console.log('dsa');
    countRef.current = count;
  }, [count]);

  // Az event listener callback, ami a ref értékét logolja
  const handleClick = () => {
    console.log('Current count:', countRef.current);
  };

  // Csak egyszer adjuk hozzá a listener-t, amikor a komponens betöltődik
  useEffect(() => {
    console.log('this tuns');
    window.addEventListener('click', handleClick);

    // Takarítás az event listener eltávolításával
    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, []); // Üres függőségi lista biztosítja, hogy csak egyszer fusson le

  return (
    <div>
      <h1>Dummy Page for Testing useRef</h1>
      <label>
        Enter count value:
        <input
          type="number"
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
        />
      </label>
      <p>Click anywhere on the window to log the current count value.</p>
    </div>
  );
}
