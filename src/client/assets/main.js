const form = document.getElementById('register-form');
const outputs = document.querySelectorAll('.output');

// listen for submit on form
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const domain = document.getElementById('domain').value.trim();

  if (!domain) {
    outputs[0].textContent = 'Please enter a domain.';
    return;
  }

  // make POST request to server
  try {
    const resp = await fetch('/api/internal/register-domain', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ domain }),
    });

    const data = await resp.json();

    if (!resp.ok) {
      outputs.forEach((el) => {
        el.textContent = `Error: ${data.error || resp.statusText}`;
      });
      return;
    }
    console.log('public key:', data.pubKey);

    // display public key to user
    outputs.forEach((el) => {
      el.textContent = data.pubKey;
    });
  } catch (error) {
    console.log('Error while registering domain:', error);
    output.textContent = 'Error while registering domain.';
  }
});
