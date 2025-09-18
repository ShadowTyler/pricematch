import { useState } from "react";

function App() {
  const [parts, setParts] = useState([{ id: 1, sku: "", price: "" }]);

  const addPart = () =>
    setParts([...parts, { id: Date.now(), sku: "", price: "" }]);

  const updatePart = (id, field, value) =>
    setParts(parts.map(p => (p.id === id ? { ...p, [field]: value } : p)));

  const removePart = (id) => setParts(parts.filter(p => p.id !== id));

  const total = parts.reduce((sum, p) => sum + (parseFloat(p.price) || 0), 0);
  const refund = total * 0.15;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 p-6">
      <header className="max-w-4xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-slate-800">💲 PriceMatch UI</h1>
        <p className="text-slate-500">Simple calculator with modern design</p>
      </header>

      <main className="max-w-4xl mx-auto bg-white rounded-xl shadow p-6">
        {parts.map((part) => (
          <div
            key={part.id}
            className="grid grid-cols-12 gap-3 items-center border-b py-3"
          >
            <input
              type="text"
              placeholder="SKU"
              value={part.sku}
              onChange={(e) => updatePart(part.id, "sku", e.target.value)}
              className="col-span-5 border rounded px-2 py-1"
            />
            <input
              type="number"
              placeholder="0.00"
              value={part.price}
              onChange={(e) => updatePart(part.id, "price", e.target.value)}
              className="col-span-4 border rounded px-2 py-1 text-right"
            />
            <div className="col-span-2 text-right font-medium">
              ${(parseFloat(part.price) || 0).toFixed(2)}
            </div>
            <button
              onClick={() => removePart(part.id)}
              className="col-span-1 text-red-500 hover:underline"
            >
              ✕
            </button>
          </div>
        ))}

        <div className="mt-4 flex gap-2">
          <button
            onClick={addPart}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            + Add Part
          </button>
          <button
            onClick={() => setParts([{ id: 1, sku: "", price: "" }])}
            className="px-4 py-2 bg-slate-200 rounded"
          >
            Reset
          </button>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="p-4 bg-slate-50 rounded">
            <div className="text-sm text-slate-500">Subtotal</div>
            <div className="text-2xl font-semibold">${total.toFixed(2)}</div>
          </div>
          <div className="p-4 bg-slate-50 rounded">
            <div className="text-sm text-slate-500">Estimated Refund</div>
            <div className="text-2xl font-semibold">${refund.toFixed(2)}</div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
