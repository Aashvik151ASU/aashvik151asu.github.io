function flipCard(event, cardId) {
    const cardInner = document.getElementById(cardId);
    cardInner.style.transform = cardInner.style.transform === 'rotateY(180deg)' ? 'rotateY(0deg)' : 'rotateY(180deg)';
}
