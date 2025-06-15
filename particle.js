class ParticleSystem {
    constructor(container) {
        this.container = container;
        this.particles = [];
        this.logo = null;
        this.init();
    }

    init() {
        this.findLogo();
        this.createParticles();
        this.animate();
    }

    findLogo() {
        this.logo = this.container.querySelector('img[alt="Logo"]');
    }

    getLogoBounds() {
        if (!this.logo) return null;
        
        const logoRect = this.logo.getBoundingClientRect();
        const containerRect = this.container.getBoundingClientRect();
        
        return {
            left: logoRect.left - containerRect.left,
            top: logoRect.top - containerRect.top,
            right: logoRect.right - containerRect.left,
            bottom: logoRect.bottom - containerRect.top,
            width: logoRect.width,
            height: logoRect.height
        };
    }

    checkLogoCollision(particle) {
        const logoBounds = this.getLogoBounds();
        if (!logoBounds) return false;

        const particleLeft = particle.x;
        const particleRight = particle.x + particle.size;
        const particleTop = particle.y;
        const particleBottom = particle.y + particle.size;

        if (particleRight > logoBounds.left && 
            particleLeft < logoBounds.right && 
            particleBottom > logoBounds.top && 
            particleTop < logoBounds.bottom) {
            
            const overlapLeft = particleRight - logoBounds.left;
            const overlapRight = logoBounds.right - particleLeft;
            const overlapTop = particleBottom - logoBounds.top;
            const overlapBottom = logoBounds.bottom - particleTop;
            
            const minOverlap = Math.min(overlapLeft, overlapRight, overlapTop, overlapBottom);
            
            if (minOverlap === overlapLeft || minOverlap === overlapRight) {
                particle.vx *= -1;
                if (minOverlap === overlapLeft) {
                    particle.x = logoBounds.left - particle.size;
                } else {
                    particle.x = logoBounds.right;
                }
            } else {
                particle.vy *= -1;
                if (minOverlap === overlapTop) {
                    particle.y = logoBounds.top - particle.size;
                } else {
                    particle.y = logoBounds.bottom;
                }
            }
            return true;
        }
        return false;
    }

    createParticles() {
        const colors = ['#ffbe05', '#ffffff', '#020c5d'];
        const particlesPerColor = 20;

        colors.forEach(color => {
            for (let i = 0; i < particlesPerColor; i++) {
                const speedMultiplier = Math.random() * 3 + 0.2;
                const direction = Math.random() * Math.PI * 2;
                this.particles.push({
                    x: Math.random() * this.container.offsetWidth,
                    y: Math.random() * this.container.offsetHeight,
                    vx: Math.cos(direction) * speedMultiplier,
                    vy: Math.sin(direction) * speedMultiplier,
                    size: Math.random() * 3 + 2,
                    color: color,
                    element: this.createParticleElement(color)
                });
            }
        });
    }

    createParticleElement(color) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.backgroundColor = color;
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.opacity = '0.7';
        this.container.appendChild(particle);
        return particle;
    }

    updateParticle(particle) {
        particle.x += particle.vx;
        particle.y += particle.vy;

        this.checkLogoCollision(particle);

        if (particle.x <= 0 || particle.x >= this.container.offsetWidth - particle.size) {
            particle.vx *= -1;
            particle.x = Math.max(0, Math.min(this.container.offsetWidth - particle.size, particle.x));
        }

        if (particle.y <= 0 || particle.y >= this.container.offsetHeight - particle.size) {
            particle.vy *= -1;
            particle.y = Math.max(0, Math.min(this.container.offsetHeight - particle.size, particle.y));
        }

        particle.element.style.left = particle.x + 'px';
        particle.element.style.top = particle.y + 'px';
    }

    animate() {
        this.particles.forEach(particle => {
            this.updateParticle(particle);
        });
        requestAnimationFrame(() => this.animate());
    }

    resize() {
        this.particles.forEach(particle => {
            particle.x = Math.min(particle.x, this.container.offsetWidth - particle.size);
            particle.y = Math.min(particle.y, this.container.offsetHeight - particle.size);
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const banner = document.querySelector('.banner');
    if (banner) {
        const particleSystem = new ParticleSystem(banner);
        
        window.addEventListener('resize', () => {
            particleSystem.resize();
        });
    }
}); 