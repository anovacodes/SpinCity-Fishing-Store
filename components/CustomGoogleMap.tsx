"use client"

import React, { FC, useCallback, useState } from "react"
import type { Location } from "@/lib/shopify/types"
import { GoogleMap, useJsApiLoader, MarkerF } from "@react-google-maps/api"

interface CustomGoogleMapProps {
    location?: Location
}

const styles = [
    {
        featureType: "administrative",
        elementType: "all",
        stylers: [
            {
                saturation: "-100"
            }
        ]
    },
    {
        featureType: "administrative.province",
        elementType: "all",
        stylers: [
            {
                visibility: "off"
            }
        ]
    },
    {
        featureType: "landscape",
        elementType: "all",
        stylers: [
            {
                saturation: -100
            },
            {
                lightness: 65
            },
            {
                visibility: "on"
            }
        ]
    },
    {
        featureType: "poi",
        elementType: "all",
        stylers: [
            {
                saturation: -100
            },
            {
                lightness: "50"
            },
            {
                visibility: "simplified"
            }
        ]
    },
    {
        featureType: "road",
        elementType: "all",
        stylers: [
            {
                saturation: "-100"
            }
        ]
    },
    {
        featureType: "road.highway",
        elementType: "all",
        stylers: [
            {
                visibility: "simplified"
            }
        ]
    },
    {
        featureType: "road.arterial",
        elementType: "all",
        stylers: [
            {
                lightness: "30"
            }
        ]
    },
    {
        featureType: "road.local",
        elementType: "all",
        stylers: [
            {
                lightness: "40"
            }
        ]
    },
    {
        featureType: "transit",
        elementType: "all",
        stylers: [
            {
                saturation: -100
            },
            {
                visibility: "simplified"
            }
        ]
    },
    {
        featureType: "water",
        elementType: "geometry",
        stylers: [
            {
                hue: "#ffff00"
            },
            {
                lightness: -25
            },
            {
                saturation: -97
            }
        ]
    },
    {
        featureType: "water",
        elementType: "labels",
        stylers: [
            {
                lightness: -25
            },
            {
                saturation: -100
            }
        ]
    }
]

const CustomGoogleMap: FC<CustomGoogleMapProps> = ({ location }) => {
    const [map, setMap] = useState(null)
    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!
    })

    const onLoad = useCallback((map: any) => {
        map.setZoom(6)
        setMap(map)
    }, [])

    const onUnmount = useCallback(() => {
        setMap(null)
    }, [])

    if (!location) return null

    const { address } = location

    return (
        <div className="rounded-xl overflow-hidden">
            {isLoaded ? (
                <GoogleMap
                    mapContainerStyle={{ height: "500px" }}
                    center={{
                        lat: address?.latitude ?? -3.745,
                        lng: address?.longitude ?? -38.523
                    }}
                    zoom={10}
                    onLoad={onLoad}
                    onUnmount={onUnmount}
                    options={{ styles }}
                >
                    <MarkerF
                        position={{
                            lat: address?.latitude ?? -3.745,
                            lng: address?.longitude ?? -38.523
                        }}
                    />
                </GoogleMap>
            ) : (
                <></>
            )}
        </div>
    )
}

export default React.memo(CustomGoogleMap)
