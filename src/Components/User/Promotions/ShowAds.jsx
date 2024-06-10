import React, { useEffect, useState } from "react";
import { Carousel } from "flowbite-react";
import { AnimatedPinDemo } from "../../External/AnimatedPin";
import { getHomeAds } from "../../../services/services";

function ShowAds() {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHomeAds = async () => {
      try {
        const homeAds = await getHomeAds();
        if (homeAds && homeAds.length > 0) {
          setAds(homeAds);
        } else {
          setError("No ads found");
        }
      } catch (error) {
        setError("Failed to fetch ads");
      } finally {
        setLoading(false);
      }
    };
    fetchHomeAds();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="h-96 w-full">
        
      <Carousel slideInterval={2000}>
        {ads.length > 0 && ads[0].images.map((image, index) => (
          <div
            key={index}
            className="h-full w-full flex items-center justify-center"
          >
            <AnimatedPinDemo image={image} />
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default ShowAds;
