'use client';
import { useState, useEffect } from 'react';

export default function Dashboard() {
  const [state, setState] = useState({ status: "OPERATIONAL", pending_action: null });
  const [prompt, setPrompt] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const refreshState = async () => {
    try {
      const res = await fetch('/api/state');
      const data = await res.json();
      setState(data);
    } catch (err) { console.error("Failed to refresh state:", err); }
  };

  const handleSend = async () => {
    setIsProcessing(true);
    setStatusMessage("Dispatching agent...");
    try {
      await fetch('/api/ask', {
        method: 'POST',
        body: JSON.stringify({ prompt }),
        headers: { 'Content-Type': 'application/json' }
      });
      await refreshState();
      setStatusMessage("Action completed.");
    } catch (err) {
      setStatusMessage("Error: Failed to dispatch.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleApprove = async () => {
    setIsProcessing(true);
    setStatusMessage("Approving action...");
    try {
      await fetch('/api/approve', { method: 'POST' });
      await refreshState();
      setStatusMessage("Action approved.");
    } catch (err) {
      setStatusMessage("Error: Failed to approve.");
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => { refreshState(); }, []);

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Sovereign Event Grid</h1>
      
      {/* Status Alert Message Area */}
      {statusMessage && (
        <div className="my-4 p-2 bg-blue-100 text-blue-800 rounded border border-blue-200">
          {statusMessage}
        </div>
      )}

      <div className="mt-4 p-4 border rounded">
        <h2 className="font-bold">System Status: {state.status}</h2>
        {state.status === "PENDING_APPROVAL" && (
          <button 
            disabled={isProcessing}
            className="flex items-center gap-2 bg-green-600 text-white p-2 mt-2 rounded disabled:opacity-50"
            onClick={handleApprove}
          >
            {isProcessing && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
            {isProcessing ? "Processing..." : "Approve Pending Action"}
          </button>
        )}
      </div>

      <textarea 
        className="border p-2 w-full mt-4 text-black"
        placeholder="Enter agent prompt..."
        onChange={(e) => setPrompt(e.target.value)} 
      />
      
      <button 
        disabled={isProcessing}
        className="flex items-center gap-2 bg-blue-500 text-white p-2 mt-2 rounded disabled:opacity-50" 
        onClick={handleSend}
      >
        {isProcessing && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
        {isProcessing ? "Dispatching..." : "Dispatch Agent"}
      </button>
      
      <div className="mt-6 border p-4">
        <h2 className="font-semibold">Current Grid State:</h2>
        <pre className="bg-gray-100 p-4 mt-2">{JSON.stringify(state, null, 2)}</pre>
      </div>
    </main>
  );
}