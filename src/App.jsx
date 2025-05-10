// src/App.jsx
import React, { useState, useEffect, useRef } from "react";
import { auth, db } from "./firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

import Nav from './components/Nav/Nav.jsx';
import Home from './components/Home/Home.jsx';
import './App.css';
import SecondPagetitle from './components/SecondPage/SecondPagetitle.jsx';
import Card from './components/Card/Card.jsx';
import Badgedetails from './components/SecondPage/Badgesdetails.jsx';
import User from './components/User/User.jsx';
import Footer from './components/Footer/Footer.jsx';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import Planner from './components/Planner/Planner.jsx';
import LeaderBoard from './components/LeaderBoard/Leaderboard.jsx';
import Badges from "./components/Badges/Badges.jsx";

function App() {
  const [user, setUser] = useState(null);
  const [points, setPoints] = useState(0);
  const [visitedPlaces, setVisitedPlaces] = useState([]);

  const swiperRef = useRef(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const userRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const data = userSnap.data();
          setPoints(data.points || 0);
          setVisitedPlaces(data.visitedPlaces || []);
        }
      } else {
        setUser(null);
        setPoints(0);
        setVisitedPlaces([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleVisit = async (placeName, earnedPoints) => {
    if (visitedPlaces.includes(placeName)) return;

    const newPoints = points + earnedPoints;
    const newVisited = [...visitedPlaces, placeName];

    setPoints(newPoints);
    setVisitedPlaces(newVisited);

    if (user) {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        points: newPoints,
        visitedPlaces: newVisited,
      });
    }
  };

  const scrollLeft = () => {
    if (swiperRef.current) {
      swiperRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (swiperRef.current) {
      swiperRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  const arr = [
    { image: "./CardImages/charminar.jpg", title: "Charminar", desc: "Historic monument in Hyderabad", a: "https://youtu.be/SlAgmzFovXk?feature=shared", points: 15 },
    { image: "./CardImages/hussiansagarlake.webp", title: "TankBund", desc: "Scenic waterfront road", a: "https://youtu.be/DBkqqV1qmMo?si=Bs4n-KnDtNNUa1z1", points: 10 },
    { image: "./CardImages/golcondafort.jpg", title: "Golconda", desc: "Ancient fort with rich history", a: "https://youtu.be/jADQ6WPDaw4?si=P3deZbCjI0sHqtrB", points: 15 },
    { image: "./CardImages/birlamandir.png", title: "Popular Temple", desc: "Popular Temple near tankbund on a hill.", a: "https://youtu.be/y2jSFreX1jc?si=XiOKSG99V66cQ0HZ", points: 5 },
    { image: "./CardImages/birla-science-center.webp", title: "Birla Science center", desc: "Popular science museum", a: "https://youtu.be/tt3oG7x48Ro?si=zny69jICJ0G2buyz", points: 5 },
    { image: "./CardImages/nehruzoopark.jpg", title: "Zoo park", desc: "World renowned zoo park", a: "https://youtu.be/XY6PlzeKWjQ?feature=shared", points: 5 },
    { image: "./CardImages/ramoji.avif", title: "Ramoji Film City", desc: "World's largest film city.", a: "https://youtu.be/DBkqqV1qmMo?si=Bs4n-KnDtNNUa1z1", points: 5 },
  ];

  return (
    <>
      <Nav user={user} points={points} />
      <div style={{ padding: "3rem" }}>
        <section id="home"><Home /></section>
      </div>

      <br /><br /><br /><br /><br />
      <hr /><section id="game">
        <Badgedetails />
      </section>
      <hr /><Badges points={points} />
      <hr />
      <section id="login">
        <User />
      </section>
      <hr />
      <section id="planner">
        <Planner />
      </section>
      <hr />
      <SecondPagetitle />

      {/* Swiper-style place cards */}
      <div style={{ position: "relative", marginBottom: "8rem" }}>
        <button className="swiper-button swiper-button-left" onClick={scrollLeft}>◀</button>

        <div className="swiper-wrapper" ref={swiperRef}>
          {arr.map((value, index) => (
            <Card
              key={index}
              data={value}
              onVisit={handleVisit}
              visited={visitedPlaces.includes(value.title)}
            />
          ))}
        </div>

        <button className="swiper-button swiper-button-right" onClick={scrollRight}>▶</button>
      </div>

      <hr /><br /><br /><br />
      <section id="leaderboard">
        <LeaderBoard />
      </section>
      <br /><br /><br />
      <hr />
      <Footer />
    </>
  );
}

export default App;
