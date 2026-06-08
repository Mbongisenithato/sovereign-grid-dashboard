'use client';
import { useState, useEffect } from 'react';

export default function Dashboard() {
  const [state, setState] = useState({ status: "OPERATIONAL", pending_action: null });
  const [prompt, setPrompt] = useState("");

  const refreshState = async () => {
    try {
      const res = await fetch('/api/state');
      const data = await res.json();
      setState(data);
    } catch (err) { console.error(err); }
  };

  const handleSend = async () => {
    await fetch('/api/ask', {
      method: 'POST',
      body: JSON.stringify({ prompt }),
      headers: { 'Content-Type': 'application/json' }
    });
    refreshState();
  };

  const handleApprove = async () => {
    await fetch('/api/approve', { method: 'POST' });
    refreshState();
  };

  useEffect(() => { refreshState(); }, []);

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Sovereign Event Grid</h1>
      
      <div className="mt-4 p-4 border rounded">
        <h2 className="font-bold">System Status: {state.status}</h2>
        {state.status === "PENDING_APPROVAL" && (
          <button 
            className="bg-green-600 text-white p-2 mt-2 rounded"
            onClick={handleApprove}
          >
            Approve Pending Action
          </button>
        )}
      </div>

      <textarea 
        className="border p-2 w-full mt-4 text-black"
        placeholder="Enter agent prompt..."
        onChange={(e) => setPrompt(e.target.value)} 
      />
      <button className="bg-blue-500 text-white p-2 mt-2" onClick={handleSend}>
        Dispatch Agent
      </button>
      
      <div className="mt-6 border p-4">
        <h2 className="font-semibold">Current Grid State:</h2>
        <pre className="bg-gray-100 p-4 mt-2">{JSON.stringify(state, null, 2)}</pre>
      </div>
    </main>
  );
}