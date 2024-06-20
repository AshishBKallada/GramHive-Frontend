import React, { useEffect, useState } from "react";
import { getHomeAds } from "../../../services/services";
import { FollowingPointerDemo } from "../../External/FollowingPointerDemo";

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
    <div style={{marginRight:"535px"}} className="mt-5 p-4">
      <div className="max-w-xl mx-auto">
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {ads.length > 0 &&
              ads[ads.length - 1].images.map((image, index) => (
                <div key={index} className="w-full h-full">
                  <FollowingPointerDemo image={image} />
                </div>
              ))}
          </div>
      </div>
    </div>
  );
}

export default ShowAds;
