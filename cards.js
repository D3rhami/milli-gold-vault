class CardSystem {
    constructor() {
        this.cards = [];
        this.init();
    }

    init() {
        this.createCards();
        this.addEventListeners();
    }

    createCards() {
        const cardsContainer = document.querySelector('.cards-grid');
        if (!cardsContainer) return;

        cardsContainer.innerHTML = '';

        for (let i = 1; i <= 6; i++) {
            const card = this.createCard(i);
            cardsContainer.appendChild(card);
            this.cards.push(card);
        }
    }

    createCard(index) {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.index = index;
        
        const cardNumber = document.createElement('div');
        cardNumber.className = 'card-number';
        cardNumber.textContent = index;
        
        card.appendChild(cardNumber);
        return card;
    }

    addEventListeners() {
        this.cards.forEach(card => {
            card.addEventListener('click', (e) => {
                this.handleCardClick(e.currentTarget);
            });

            card.addEventListener('mouseenter', (e) => {
                this.handleCardHover(e.currentTarget);
            });

            card.addEventListener('mouseleave', (e) => {
                this.handleCardLeave(e.currentTarget);
            });
        });
    }

    handleCardClick(card) {
        const index = card.dataset.index;
        console.log(`Card ${index} clicked`);
        
        card.style.transform = 'scale(0.95)';
        setTimeout(() => {
            card.style.transform = '';
        }, 150);
    }

    handleCardHover(card) {
        card.style.transform = 'translateY(-2px)';
    }

    handleCardLeave(card) {
        card.style.transform = '';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    new CardSystem();
}); 