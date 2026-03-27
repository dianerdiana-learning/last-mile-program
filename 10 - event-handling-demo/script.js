function main() {
  // Subtask 4.1: Access DOM Elements
  const clickBtn = document.getElementById('click-btn');
  const textInput = document.getElementById('text-input');
  const selectMenu = document.getElementById('select-menu');
  const demoForm = document.getElementById('demo-form');
  const mouseZone = document.getElementById('mouse-zone');
  const output = document.getElementById('output-area');

  // Helper to log to the display area
  const log = (msg) => {
    output.innerHTML = `<strong>Last Event:</strong> ${msg}`;
  };

  // Subtask 4.2: click Event
  clickBtn.addEventListener('click', () => {
    log('Button was clicked! 🖱️');
  });

  // Subtask 4.3: input and change Events
  textInput.addEventListener('input', (e) => {
    log(`Input changing: ${e.target.value}`);
  });

  selectMenu.addEventListener('change', (e) => {
    log(`Selection changed to: ${e.target.value}`);
  });

  // Subtask 4.4: submit Event
  demoForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent reload
    const val = document.getElementById('form-data').value;
    log(`Form submitted with: ${val} (Reload prevented)`);
  });

  // Subtask 4.5: keyup Event
  textInput.addEventListener('keyup', (e) => {
    console.log(`Key pressed: ${e.key}`); // Logging to console for clarity
  });

  // Subtask 4.6: mouseover and mouseout Events
  mouseZone.addEventListener('mouseover', () => {
    mouseZone.style.borderColor = 'var(--secondary)';
    log('Mouse entered the zone! 🎯');
  });

  mouseZone.addEventListener('mouseout', () => {
    mouseZone.style.borderColor = '#eee';
    log('Mouse left the zone.');
  });

  // Subtask 4.7: focus and blur Events
  const inputs = document.querySelectorAll('input');
  inputs.forEach((input) => {
    input.addEventListener('focus', () => {
      input.classList.add('highlight');
    });
    input.addEventListener('blur', () => {
      input.classList.remove('highlight');
    });
  });
}

document.addEventListener('DOMContentLoaded', main);
