document.getElementById('messageForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const message = document.getElementById('message').value;

    // Save message to the server
    const response = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, message }),
    });

    if (response.ok) {
        alert('Message saved!');
        fetchMessages(); // Refresh message list
    } else {
        alert('Error saving message.');
    }
});

// Fetch and display messages
async function fetchMessages() {
    const response = await fetch('/api/messages');
    const messages = await response.json();
    const messagesDiv = document.getElementById('messages');
    messagesDiv.innerHTML = messages
        .map((msg) => `<p><strong>${msg.name}</strong>: ${msg.message}</p>`)
        .join('');
}

// Load messages on page load
fetchMessages();
