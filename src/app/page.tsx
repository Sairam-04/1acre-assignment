"use client"

import Map from "@/components/map";
import axios from "axios";
import { useEffect, useState } from "react";


export default function Home() {
  const [landData, setLandData] = useState<LandData[]>([]); // Store land data

  const fetchLandData = async () => {
    try {
      const response = await axios.get(
        "https://prod-be.1acre.in/lands/landmaps/?seller_id=211"
      );
      setLandData(response.data); // Store the fetched data in state
    } catch (error) {
      console.error("Error fetching land data:", error);
    }
  };

  useEffect(() => {
    fetchLandData();
  }, [])
  return (
    <div className="w-full h-screen flex flex-col bg-white text-black">
      <div className="w-full h-[9vh] flex items-center text-2xl bg-white font-semibold px-5 py-2 shadow-lg">
        <span className="bg-yellow-300">1a</span>
        <span>cre</span>
        <span className="text-gray-400">.in</span>
      </div>
      <div className="w-4/5 mx-auto p-2 border border-black my-4 ">
        <Map landData={landData} />
      </div>
    </div>
  );
}
