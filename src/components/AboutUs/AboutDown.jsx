import "./AboutDown.css";


function AboutDown() {
    const handleScrollToTop = () => {
        window.scrollTo({
          top: 80,
          behavior: 'smooth', // For smooth scrolling
        });
      };

  return (
    <div className="about-down" id="about">
      <h2>WildXperience, Your Gateway to Extraordinary Adventures</h2>
      <p>At WildXperience, we are your gateway to a world of extraordinary adventures, rich cultural immersion, and delectable culinary journeys. We understand that when it comes to planning your dream adventures, trust is paramount. We're not just another travel agency; we're a passionate team of seasoned globetrotters with a deep love for exploration.</p>

      <h2>Our Distinctive Promise</h2>
      <p>Our journey begins with a simple promise: we travel extensively, immersing ourselves in diverse cultures, traversing varied landscapes, and seeking extraordinary experiences. It's this firsthand knowledge that sets us apart. We're not just selling destinations; we're offering a piece of our own wanderlust-infused souls.</p>



      <h2>Your Trusted Partner</h2>
      <p>When you choose WildXperience, you're not just purchasing an adventure; you're investing in a relationship built on trust. Our commitment to providing exceptional service is unwavering. We meticulously plan every detail of your journey, ensuring that it aligns perfectly with your desires.</p>

      <p>Why trust WildXperience? Because we're more than a travel agency, we're your partners in crafting experiences that will leave an indelible mark on your heart and soul. Let WildXperience turn your wanderlust into reality; together, we'll embark on the journey of a lifetime, filled with Xtreme thrills, cultural immersion, and gastronomic delights.</p>
      <button type="button" onClick={handleScrollToTop} >Explore Destinations</button>

    </div>
    
  );
}

export default AboutDown;
