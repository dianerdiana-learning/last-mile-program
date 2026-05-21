function main() {
  const fetchBtn = document.getElementById('fetch-btn');
  const container = document.getElementById('data-container');

  // Subtask 4.1: Add Event Listener
  fetchBtn.addEventListener('click', getUsers);

  async function getUsers() {
    // Subtask 5.3: Add Loading Indicator
    container.innerHTML = '<p class="loading">Fetching data from API...</p>';

    try {
      // Subtask 4.2 & 4.3: Fetch and Convert to JSON
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/users',
      );

      if (!response.ok) throw new Error('Network response was not ok');

      const users = await response.json();

      // Subtask 5.1: Dynamically Create Elements
      displayUsers(users);
    } catch (error) {
      // Subtask 5.2: Handle Errors
      container.innerHTML = `<p class="error">Error: ${error.message}</p>`;
    }
  }

  function displayUsers(users) {
    container.innerHTML = ''; // Clear loading message

    users.forEach((user) => {
      const card = document.createElement('div');
      card.className = 'user-card';
      card.innerHTML = `
                    <strong>${user.name}</strong><br>
                    <small>📧 ${user.email}</small><br>
                    <small>🏢 ${user.company.name}</small>
                `;
      container.appendChild(card);
    });
  }
}

document.addEventListener('DOMContentLoaded', main);
