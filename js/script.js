// common functions are: getHtmlElement, selectHtmlElement, toggleTabs, toggleModal, updateAvailableFunds
// updateDonationAndDonateHistory function can be considered as a common function because it is used inside a loop. Consequently, the functions inside the updateDonationAndDonateHistory are also reused

let totalFunds = 5500;

// common functions
function getHtmlElementById(id) {
  return document.getElementById(id);
}
function selectHtmlElementByQuery(selector, isAll = false) {
  return isAll
    ? document.querySelectorAll(selector)
    : document.querySelector(selector);
}

// Selecting DOM Elements
const donationButton = getHtmlElementById('donation-btn');
const historyButton = getHtmlElementById('history-btn');
const campaignContainer = getHtmlElementById('campaign-container');
const historyContainer = getHtmlElementById('history-container');
const availableFunds = getHtmlElementById('fund-available');
const donationCards = selectHtmlElementByQuery('.donation-card-content', true);
const modal = getHtmlElementById('donation-modal');
const closeModalButton = getHtmlElementById('close-modal');
const overlay = selectHtmlElementByQuery('.modal-overlay');
const mainContent = getHtmlElementById('main-content');

// helper functions
function toggleTabs({
  showElement,
  hideElement,
  activeButton,
  inactiveButton
}) {
  if (showElement.style.display !== 'block') {
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

// initial fund calculation and post-donation fund updater function
function updateAvailableFunds(donationAmount = 0) {
  if (donationAmount === 0) {
    donationCards.forEach(card => {
      const amountElement = card.querySelector('.donation-status span');
      totalFunds -= Number(amountElement.textContent);
    });
  } else {
    totalFunds -= donationAmount;
  }
  availableFunds.textContent = totalFunds;
}
updateAvailableFunds();

function addHistoryItem(amount, campaignTitle) {
  const historyItem = `
    <div class="history-item">
       <h5>${amount} Taka is donated for ${campaignTitle}</h5>
       <p>Date: ${new Date().toString()}</p>
    </div>
  `;
  historyContainer.innerHTML += historyItem;
}

function toggleModal(isVisible) {
  modal.style.display = isVisible ? 'flex' : 'none';
  overlay.style.display = isVisible ? 'block' : 'none';
  mainContent.classList.toggle('modal-blur', isVisible);
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
    updateAvailableFunds(inputValue);
    addHistoryItem(inputValue, campaignTitle);
    toggleModal(true);
    input.value = '';
  } else {
    input.value = '';
  }
}

// Event Listeners
donationButton.addEventListener('click', () => {
  toggleTabs({
    showElement: campaignContainer,
    hideElement: historyContainer,
    activeButton: donationButton,
    inactiveButton: historyButton
  });
});
historyButton.addEventListener('click', () => {
  toggleTabs({
    showElement: historyContainer,
    hideElement: campaignContainer,
    activeButton: historyButton,
    inactiveButton: donationButton
  });
});
document.querySelectorAll('.donation-card').forEach(card => {
  const donateButton = card.querySelector('button');
  donateButton.addEventListener('click', function () {
    updateDonationAndDonateHistory(card);
  });
});
closeModalButton.addEventListener('click', () => toggleModal(false));