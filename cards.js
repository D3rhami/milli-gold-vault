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
        
        if (index === 1) {
            card.classList.add('card1');
            this.createTimeCard(card);
        } else {
        const cardNumber = document.createElement('div');
        cardNumber.className = 'card-number';
        cardNumber.textContent = index;
            card.appendChild(cardNumber);
        }
        
        return card;
    }

    createTimeCard(card) {
        const now = new Date();
        const tehranTime = new Date(now.toLocaleString("en-US", {timeZone: "Asia/Tehran"}));
        
        const timeDiv = document.createElement('div');
        timeDiv.className = 'card-title-time';
        timeDiv.textContent = tehranTime.toLocaleTimeString('fa-IR', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        
        const dateContainer = document.createElement('div');
        dateContainer.className = 'date-container';
        
        const div1 = document.createElement('div');
        div1.className = 'div1';
        
        const solarDateDiv = document.createElement('div');
        solarDateDiv.className = 'card-solar-date';
        const solarDateData = this.getFormattedSolarDate(tehranTime);
        solarDateDiv.textContent = solarDateData.date;
        
        const gregorianDateDiv = document.createElement('div');
        gregorianDateDiv.className = 'card-gregorian-date';
        const gregorianDateData = this.getFormattedGregorianDate(tehranTime);
        gregorianDateDiv.textContent = gregorianDateData.date;
        
        div1.appendChild(solarDateDiv);
        div1.appendChild(gregorianDateDiv);
        
        const div2 = document.createElement('div');
        div2.className = 'div2';
        
        const solarWeekDiv = document.createElement('div');
        solarWeekDiv.className = 'solar-week';
        solarWeekDiv.textContent = solarDateData.weekName;
        
        const gregorianWeekDiv = document.createElement('div');
        gregorianWeekDiv.className = 'gregorian-week';
        gregorianWeekDiv.textContent = gregorianDateData.weekName;
        
        div2.appendChild(solarWeekDiv);
        div2.appendChild(gregorianWeekDiv);
        
        dateContainer.appendChild(div1);
        dateContainer.appendChild(div2);
        
        card.appendChild(timeDiv);
        card.appendChild(dateContainer);
        
        setInterval(() => {
            const currentTime = new Date();
            const currentTehranTime = new Date(currentTime.toLocaleString("en-US", {timeZone: "Asia/Tehran"}));
            timeDiv.textContent = currentTehranTime.toLocaleTimeString('fa-IR', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });

            const newSolarDateData = this.getFormattedSolarDate(currentTehranTime);
            solarDateDiv.textContent = newSolarDateData.date;
            solarWeekDiv.textContent = newSolarDateData.weekName;
            
            const newGregorianDateData = this.getFormattedGregorianDate(currentTehranTime);
            gregorianDateDiv.textContent = newGregorianDateData.date;
            gregorianWeekDiv.textContent = newGregorianDateData.weekName;
        }, 1000);
    }


    getFormattedSolarDate(date) {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        
        const persianMonthNames = [
            'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
            'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
        ];
        
        const persianDayNames = [
            'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه', 'شنبه'
        ];
        
        if (typeof farvardin !== 'undefined' && farvardin.gregorianToSolar) {
            const solarArray = farvardin.gregorianToSolar(year, month, day, 'array');
            if (Array.isArray(solarArray)) {
                const dayOfWeek = persianDayNames[date.getDay()];
                const monthName = persianMonthNames[solarArray[1] - 1];
                return {
                    date: `${solarArray[2]} ${monthName} ${solarArray[0]}`,
                    weekName: dayOfWeek
                };
            }
        }
        
        return {
            date: 'تاریخ شمسی',
            weekName: ''
        };
    }

    getFormattedGregorianDate(date) {
        const englishMonthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        
        const englishDayNames = [
            'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
        ];
        
        const dayOfWeek = englishDayNames[date.getDay()];
        const monthName = englishMonthNames[date.getMonth()];
        const day = date.getDate();
        const year = date.getFullYear();
        
        return {
            date: `${year} ${monthName} ${day}`,
            weekName: dayOfWeek
        };
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