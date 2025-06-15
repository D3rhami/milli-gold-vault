m_repo = "D3rhami"

document.addEventListener('DOMContentLoaded', function () {
    const chartBtns = document.querySelectorAll('.chart-btn');
    const cards = document.querySelectorAll('.card');
    const navBtns = document.querySelectorAll('.nav-btn');
    const actionBtns = document.querySelectorAll('.action-btn');

    chartBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            chartBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });


    function addRippleEffect(buttons) {
        buttons.forEach(btn => {
            btn.addEventListener('click', function (e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;

                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: rgba(255, 255, 255, 0.3);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    pointer-events: none;
                `;

                if (!this.style.position || this.style.position === 'static') {
                    this.style.position = 'relative';
                }
                this.style.overflow = 'hidden';

                this.appendChild(ripple);

                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }

    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    addRippleEffect(navBtns);
    addRippleEffect(actionBtns);
    addRippleEffect(chartBtns);

    const animateChartBars = () => {
        const bars = document.querySelectorAll('.bar');
        bars.forEach((bar, index) => {
            setTimeout(() => {
                bar.style.animation = 'slideUp 0.8s ease-out';
            }, index * 100);
        });
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateChartBars();
                observer.unobserve(entry.target);
            }
        });
    });

    const chartPlaceholder = document.querySelector('.chart-placeholder');
    if (chartPlaceholder) {
        observer.observe(chartPlaceholder);
    }

    window.addEventListener('resize', () => {
        const isMobile = window.innerWidth <= 768;
        const cards = document.querySelector('.cards-grid');
        if (cards) {
            cards.style.gridTemplateColumns = isMobile ? '1fr' : 'repeat(auto-fit, minmax(280px, 1fr))';
        }
    });
}); 