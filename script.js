async function subscribe() {
  const emailInput = document.getElementById("email");
  const email = emailInput.value;

  if (!email) {
    alert("Please enter an email!");
    return;
  }

  try {
    const response = await fetch('https://subscription-g19p.onrender.com/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });

    const result = await response.json();
    if (response.ok) {
      alert(result.message);
      emailInput.value = "";
    } else {
      alert(result.message);
    }
  } catch (error) {
    alert("An error occurred. Please try again!");
    console.error(error);
  }
}

async function fetchSubscriptions() {
  try {
    const response = await fetch('https://subscription-g19p.onrender.com/api/subscriptions');
    if (!response.ok) {
      throw new Error("Failed to fetch subscriptions");
    }

    const data = await response.json();
    const resultDiv = document.getElementById("subscription-list");
    resultDiv.innerHTML = ""; // Clear previous results

    if (data.length === 0) {
      resultDiv.innerHTML = "<p>No subscriptions found.</p>";
    } else {
      const list = document.createElement("ul");
      data.forEach((entry) => {
        const listItem = document.createElement("li");
        listItem.textContent = `Email: ${entry.email}`;
        list.appendChild(listItem);
      });
      resultDiv.appendChild(list);
    }
  } catch (error) {
    alert("An error occurred while fetching subscriptions!");
    console.error(error);
  }
}
