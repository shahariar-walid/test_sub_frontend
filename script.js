document.getElementById('subscriptionForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent form from refreshing the page
  
    const emailInput = document.getElementById('email');
    const email = emailInput.value.trim();
  
    try {
      const response = await fetch('http://localhost:3000/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        document.getElementById('statusMessage').textContent = result.message;
        emailInput.value = ''; // Clear the input
      } else {
        document.getElementById('statusMessage').textContent = result.message;
      }
    } catch (error) {
      console.error('Error subscribing:', error);
      document.getElementById('statusMessage').textContent = 'Something went wrong. Please try again!';
    }
  });
  