"use client";

import { Loader } from "@googlemaps/js-api-loader";
import { useEffect, useRef, useState } from "react";
import markerSvg from "../app/location-pin.png";


export default function Map({ landData }: { landData: LandData[] }) {
    const mapRef = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<google.maps.Map | null>(null); 
    const markersRef = useRef<google.maps.Marker[]>([]);

    useEffect(() => {
        const initMap = async () => {
            const loader = new Loader({
                apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
                version: "weekly",
            });

            const { Map } = await loader.importLibrary("maps");

            const mapOptions: google.maps.MapOptions = {
                center: { lat: 17.385044, lng: 78.486671 }, 
                zoom: 8,
            };

            const newMap = new Map(mapRef.current as HTMLDivElement, mapOptions);
            setMap(newMap);
        };

        initMap();
    }, []);

    useEffect(() => {
        if (map && landData.length) {
            markersRef.current.forEach((marker) => marker.setMap(null));
            markersRef.current = [];

            landData.forEach((land) => {
                const marker = new google.maps.Marker({
                    position: {
                        lat: parseFloat(land.lat),
                        lng: parseFloat(land.long),
                    },
                    map: map,
                    title: `Land ID: ${land.id}`,
                    icon: {
                        url: markerSvg.src,
                        scaledSize: new google.maps.Size(20, 20),
                    }
                });

                const infoWindowContent = `
                    <div class="p-4 max-w-xs bg-white rounded-lg shadow-md">
                        <h3 class="text-lg font-bold text-orange-600 mb-2">Land ID: ${land.id}</h3>
                        <p class="text-gray-700 mb-1">
                        <strong class="font-semibold text-gray-900">Acres:</strong> ${land.total_land_size_in_acres.acres}
                        </p>
                        <p class="text-gray-700 mb-1">
                        <strong class="font-semibold text-gray-900">Price per Acre:</strong> ₹${land.price_per_acre_crore.lakh} Lakhs
                        </p>
                        <p class="text-gray-700 mb-1">
                        <strong class="font-semibold text-gray-900">Status:</strong> <span class="${land.status === "active" ? "text-green-500" : "text-red-500"}">${land.status}</span>
                        </p>
                        <p class="text-gray-700 mb-1">
                        <strong class="font-semibold text-gray-900">Seller Type:</strong> ${land.seller_type}
                        </p>
                        <p class="text-gray-700 mb-1">
                        <strong class="font-semibold text-gray-900">Village:</strong> ${land.division_slugs.village}
                        </p>
                        <p class="text-gray-700">
                        <strong class="font-semibold text-gray-900">Highway Facing:</strong> ${land.highway_facing ? "Yes" : "No"}
                        </p>
                    </div>
                    `;


                const infoWindow = new google.maps.InfoWindow({
                    content: infoWindowContent,
                });

                marker.addListener("click", () => {
                    infoWindow.open(map, marker);
                });

                markersRef.current.push(marker);
            });
        }
    }, [map, landData]); 


    return (
        <div
            className="h-96 w-full"
            ref={mapRef}
            style={{ height: "500px", width: "100%" }}
        ></div>
    );
}
