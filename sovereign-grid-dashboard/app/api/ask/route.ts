async function sendPromptToAgent(userPrompt: string) {
  try {
    const response = await fetch('/api/ask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: userPrompt }),
    });

    const data = await response.json();
    console.log("Server response:", data);
  } catch (error) {
    console.error("Error sending prompt:", error);
  }
}