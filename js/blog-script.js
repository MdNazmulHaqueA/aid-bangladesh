const faqQuestions = document.querySelectorAll('.faq-question');
faqQuestions.forEach(item => {
  item.addEventListener('click', () => {
    faqQuestions.forEach(q => {
      if (q !== item) {
        q.parentNode.classList.remove('open');
      }
    });
    const faqContainer = item.parentNode;
    faqContainer.classList.toggle('open');
  });
});
