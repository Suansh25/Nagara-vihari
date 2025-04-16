import { useEffect } from 'react';
import './Planner.css';

const Planner = () => {
  useEffect(() => {
    // This effect runs when the component mounts
    console.log("Planner component mounted");
    
    return () => {
      // Cleanup if needed when component unmounts
      console.log("Planner component unmounted");
    };
  }, []);

  return (
    <div className="planner-container">
      <iframe 
        src="./Planner/sample.html"
        className="planner-iframe"
        title="Smart Tour Planner"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default Planner;