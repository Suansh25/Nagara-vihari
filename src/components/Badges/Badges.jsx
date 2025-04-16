import React, { useEffect, useState } from 'react';
import './Badges.css';
import { auth, db } from '../../firebaseConfig';
import { doc, onSnapshot } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const locationBadges = [
  {
    id: 1,
    title: 'Bronze Explorer',
    image: 'public/BadgeImages/bronze.png',
    minPoints: 25,
    type: 'bronze',
    description: 'Visited 5+ locations in Hyderabad',
    color: '#cd7f32'
  },
  {
    id: 2,
    title: 'Silver Explorer',
    image: 'public/BadgeImages/silver.png',
    minPoints: 50,
    type: 'silver',
    description: 'Visited 10+ locations in Hyderabad',
    color: '#c0c0c0'
  },
  {
    id: 3,
    title: 'Gold Explorer',
    image: 'public/BadgeImages/gold.png',
    minPoints: 100,
    type: 'gold',
    description: 'Visited 20+ locations in Hyderabad',
    color: '#ffd700'
  },
  {
    id: 4,
    title: 'Platinum Explorer',
    image: 'public/BadgeImages/platinum.png',
    minPoints: 150,
    type: 'platinum',
    description: 'Visited 30+ locations in Hyderabad',
    color: '#e5e4e2'
  },
  {
    id: 5,
    title: 'Diamond Explorer',
    image: 'public/BadgeImages/diamond.png',
    minPoints: 200,
    type: 'diamond',
    description: 'Visited 40+ locations in Hyderabad',
    color: '#b9f2ff'
  },
  {
    id: 6,
    title: 'Heroic Explorer',
    image: 'public/BadgeImages/champ.png',
    minPoints: 300,
    type: 'heroic',
    description: 'Visited 50+ locations in Hyderabad',
    color: '#ff4d4d'
  },
];

function Badges() {
  const [points, setPoints] = useState(null);
  const [currentBadge, setCurrentBadge] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        const unsubscribeSnapshot = onSnapshot(userRef, (docSnap) => {
          if (docSnap.exists()) {
            const userData = docSnap.data();
            const userPoints = userData.points || 0;
            setPoints(userPoints);

            let highestBadge = null;
            locationBadges.forEach(badge => {
              if (userPoints >= badge.minPoints) {
                if (!highestBadge || badge.minPoints > highestBadge.minPoints) {
                  highestBadge = badge;
                }
              }
            });
            setCurrentBadge(highestBadge);
          } else {
            setPoints(0);
            setCurrentBadge(null);
          }
          setLoading(false);
        });

        return () => unsubscribeSnapshot();
      } else {
        setPoints(0);
        setCurrentBadge(null);
        setLoading(false);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  return (
    <section className="badges-section">
      <div className="badges-content">
        <h2 className="badges-title">Explorer Achievement Badges</h2>
        <p className="badges-subtitle">
          Collect badges by exploring Hyderabad's historic and cultural sites
        </p>

        {loading ? (
          <p className="loading-message">Loading your explorer progress...</p>
        ) : (
          <>
            <div className="current-badge-section">
              <h3 className="current-badge-title">
                {currentBadge ? (
                  <>
                    🏆 Your Current Rank: {currentBadge.title}
                    <span className="points-display">{points} Explorer Points</span>
                  </>
                ) : (
                  'Start your adventure to earn your first badge!'
                )}
              </h3>
            </div>

            <div className="badges-container">
              {locationBadges.map((badge) => {
                const unlocked = points >= badge.minPoints;

                if (!unlocked) {
                  return (
                    <div key={badge.id} className="badge-card locked-placeholder">
                      <div className="badge-header">
                        <h3 className="badge-title">Mystery Badge</h3>
                        <div className="points-requirement">
                          {badge.minPoints} pts required
                        </div>
                      </div>
                      
                      <div className="badge-image-container">
                        <div className="mystery-badge">?</div>
                      </div>
                      
                      <div className="badge-info">
                        <p className="badge-description">Keep exploring to discover this badge!</p>
                        <div className="badge-status">
                          <span className="status-locked">🔒 Locked</span>
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <div 
                    key={badge.id} 
                    className={`badge-card ${badge.type}-card unlocked`}
                    style={{ '--badge-color': badge.color }}
                  >
                    <div className="badge-header">
                      <h3 className="badge-title">{badge.title}</h3>
                      <div className="points-requirement">
                        {badge.minPoints} pts required
                      </div>
                    </div>
                    
                    <div className="badge-image-container">
                      <img
                        src={badge.image}
                        alt={badge.title}
                        className="badge-image"
                      />
                    </div>
                    
                    <div className="badge-info">
                      <p className="badge-description">{badge.description}</p>
                      <div className="badge-status">
                        <span className="status-unlocked">✓ Unlocked</span>
                      </div>
                      <div className="achieved-points">
                        Achieved with {points} points
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default Badges;