// Selecting DOM Elements
const donationButton = document.getElementById('donation-btn');
const historyButton = document.getElementById('history-btn');
const campaignContainer = document.getElementById('campaign-container');
const historyContainer = document.getElementById('history-container');

// Default Behavior or values
historyContainer.style.display = 'none';
donationButton.classList.add('btn-primary');
historyButton.classList.add('btn-outlined');

// helper functions
function toggleTabs(showElement, hideElement, activeButton, inactiveButton) {
  const isCurrentlyVisible = showElement.style.display === 'block';
  if (!isCurrentlyVisible) {
    showElement.style.display = 'block';
    hideElement.style.display = 'none';
    activeButton.classList.add('btn-primary');
    activeButton.classList.remove('btn-outlined');
    inactiveButton.classList.remove('btn-primary');
    inactiveButton.classList.add('btn-outlined');
  }
}

// Event Listeners
donationButton.addEventListener('click', function () {
  toggleTabs(
    campaignContainer,
    historyContainer,
    donationButton,
    historyButton
  );
});
historyButton.addEventListener('click', function () {
  toggleTabs(
    historyContainer,
    campaignContainer,
    historyButton,
    donationButton
  );
});
