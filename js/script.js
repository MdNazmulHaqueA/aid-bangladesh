let totalFunds = 5500;

// Selecting DOM Elements
const donationButton = document.getElementById('donation-btn');
const historyButton = document.getElementById('history-btn');
const campaignContainer = document.getElementById('campaign-container');
const historyContainer = document.getElementById('history-container');
const availableFunds = document.getElementById('fund-available');
const donationCards = document.querySelectorAll('.donation-card-content');

// Default Behavior or values
historyContainer.style.display = 'none';
donationButton.classList.add('btn-primary');
historyButton.classList.add('btn-outlined');

function calculateInitialDonations() {
  let initialDonations = 0;
  donationCards.forEach(card => {
    const amountElement = card.querySelector('.donation-status span');
    initialDonations += Number(amountElement.textContent);
  });
  return initialDonations;
}
totalFunds  -= calculateInitialDonations();
availableFunds.textContent = totalFunds;

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

function validateInputValue(val) {
  if (isNaN(val) || val <= 0) {
    alert('Please enter a valid positive donation amount.');
    return false;
  }
  if (totalFunds - val < 0) {
    alert('Insufficient funds!');
    return false;
  }
  return true;
}

function calculateTotal(inputValue) {
  totalFunds -= inputValue;
  availableFunds.textContent = totalFunds;
}

function addHistoryItem(amount, campaignTitle) { 
  const historyItem = `
    <div class="history-item">
       <h5>${amount} Taka is donated for ${campaignTitle}</h5>
       <p>Date: ${new Date().toString()}</p>
    </div>
  `;
  historyContainer.innerHTML += historyItem;
}

function updateDonationAndDonateHistory(card) {
  const input = card.querySelector('.donate-input');
  const amountElement = card.querySelector('.donation-status span');
  const campaignTitle = card.querySelector(
    '.donation-card-content h5'
  ).textContent;
  const inputValue = Number(input.value);
  if (validateInputValue(inputValue)) {
    let currentDonation = Number(amountElement.textContent);
    currentDonation += inputValue;
    amountElement.textContent = currentDonation;
    calculateTotal(inputValue);
    addHistoryItem(inputValue, campaignTitle);
    input.value = '';
  } else {
    input.value = '';
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
document.querySelectorAll('.donation-card').forEach(card => {
  const donateButton = card.querySelector('button');
  donateButton.addEventListener('click', function () {
    updateDonationAndDonateHistory(card);
  });
});
