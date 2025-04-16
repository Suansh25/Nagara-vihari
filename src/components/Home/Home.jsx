import { useEffect } from 'react';
import './Home.css';
import HydImage from '../../../public/HomeImages/Hyd.jpg';
import TravelDoodle from '../../../public/HomeImages/travel-doodle.jpg';

function Home() {
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    if (entry.target.classList.contains('feature-card')) {
                        entry.target.style.transitionDelay = `${entry.target.dataset.delay}s`;
                    }
                }
            });
        }, { threshold: 0.1 });

        const cards = document.querySelectorAll('.feature-card');
        cards.forEach((card, index) => {
            card.dataset.delay = index * 0.2;
            observer.observe(card);
        });

        return () => cards.forEach(card => observer.unobserve(card));
    }, []);

    return (
        <div className="travel-app-home">
            <section id="home" className="hero-section">
                <div
                    className="hero-banner"
                    style={{
                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${HydImage})`
                    }}
                >
                    <div className="hero-content">
                        <h1>Discover Hyderabad Like Never Before</h1>
                        <p>Turn your city exploration into an exciting game with rewards and challenges!</p>
                        <div className="cta-buttons">
                            <a href="#game" className="btn explore-btn">Start Exploring</a>
                            <a href="#planner" className="btn plan-btn">Plan Your Trip</a>
                        </div>
                    </div>
                </div>
                
                <div className="features-section">
                    <div className="travel-doodle-bg" style={{ backgroundImage: `url(${TravelDoodle})` }}></div>
                    <div className="section-header">
                        <h2>Your Hyderabad Adventure Awaits</h2>
                        <p>Explore the city with these amazing features</p>
                    </div>
                    
                    <div className="feature-cards-container">
                        {/* Passport Theme Card */}
                        <div className="feature-card passport-theme" data-delay="0">
                            <div className="card-icon">
                                <div className="passport-stamp"></div>
                                <svg viewBox="0 0 24 24" className="passport-svg">
                                    <path d="M19,4H17.9A5.009,5.009,0,0,0,13,0H11A5.009,5.009,0,0,0,6.1,4H5A5.006,5.006,0,0,0,0,9V19a5.006,5.006,0,0,0,5,5H19a5.006,5.006,0,0,0,5-5V9A5.006,5.006,0,0,0,19,4ZM12,2h1a3,3,0,0,1,2.816,2H9.184A3,3,0,0,1,11,2ZM5,6H19a3,3,0,0,1,3,3v8a3,3,0,0,1-3,3H5a3,3,0,0,1-3-3V9A3,3,0,0,1,5,6ZM10.69,8.65,14.71,9.3a.5.5,0,0,1,.39.39l.65,4a.51.51,0,0,1-.14.45.49.49,0,0,1-.45.14l-4-.64a.51.51,0,0,1-.39-.39l-.65-4a.5.5,0,0,1,.14-.45A.48.48,0,0,1,10.69,8.65ZM12,13.5A1.5,1.5,0,1,1,13.5,12,1.5,1.5,0,0,1,12,13.5Z"/>
                                </svg>
                            </div>
                            <h3>Passport to Adventure</h3>
                            <p>Collect virtual stamps in your digital passport as you complete challenges at Hyderabad's iconic landmarks. Level up and unlock special rewards!</p>
                            <div className="travel-stickers">
                                <span className="sticker">🏰</span>
                                <span className="sticker">🍜</span>
                                <span className="sticker">📸</span>
                            </div>
                            <div className="glow-effect"></div>
                        </div>

                        {/* Suitcase Theme Card */}
                        <div className="feature-card suitcase-theme" data-delay="0.2">
                            <div className="card-icon">
                                <svg viewBox="0 0 24 24" className="suitcase-svg">
                                    <path d="M19,6H16V5a2,2,0,0,0-2-2H10A2,2,0,0,0,8,5V6H5A3,3,0,0,0,2,9V19a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3V9A3,3,0,0,0,19,6ZM10,5h4V6H10ZM20,19a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V12.82A3,3,0,0,0,7,13a3,3,0,0,0,2.92-2.28,2,2,0,0,0,4.16,0A3,3,0,0,0,17,13a3,3,0,0,0,3-1.18ZM12,13a1,1,0,1,1,1-1A1,1,0,0,1,12,13Z"/>
                                </svg>
                            </div>
                            <h3>Smart Travel Planner</h3>
                            <p>Our intelligent suitcase packs the perfect itinerary! Get personalized recommendations for attractions, food, and routes based on your time and budget.</p>
                            <div className="travel-stickers">
                                <span className="sticker">💰</span>
                                <span className="sticker">🗓️</span>
                                <span className="sticker">🚕</span>
                            </div>
                            <div className="glow-effect"></div>
                        </div>

                        {/* Compass Theme Card */}
                        <div className="feature-card compass-theme" data-delay="0.4">
                            <div className="card-icon">
                                <div className="compass-needle"></div>
                                <svg viewBox="0 0 24 24" className="compass-svg">
                                    <path d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8,8,0,0,1,12,20ZM10.69,8.65,14.71,9.3a.5.5,0,0,1,.39.39l.65,4a.51.51,0,0,1-.14.45.49.49,0,0,1-.45.14l-4-.64a.51.51,0,0,1-.39-.39l-.65-4a.5.5,0,0,1,.14-.45A.48.48,0,0,1,10.69,8.65ZM12,13.5A1.5,1.5,0,1,1,13.5,12,1.5,1.5,0,0,1,12,13.5Z"/>
                                </svg>
                            </div>
                            <h3>Local Guide Compass</h3>
                            <p>Never get lost in Hyderabad! Our smart compass points you to hidden gems, answers your travel questions, and helps you discover authentic local experiences.</p>
                            <div className="travel-stickers">
                                <span className="sticker">🤔</span>
                                <span className="sticker">📍</span>
                                <span className="sticker">🍴</span>
                            </div>
                            <div className="glow-effect"></div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;