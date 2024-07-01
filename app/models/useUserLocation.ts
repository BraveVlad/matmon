import { useEffect, useState } from "react";
import {
	requestForegroundPermissionsAsync,
	LocationObject,
	enableNetworkProviderAsync,
	getCurrentPositionAsync,
	Accuracy,
} from "expo-location";

export default function useUserLocation() {
	const [location, setLocation] = useState<LocationObject>();

	function handleOnLocationChange(location: LocationObject) {
		setLocation(location);
	}

	useEffect(() => {
		async function fetchLocation() {
			console.log(`Requesting location...`);

			const { status } = await requestForegroundPermissionsAsync();
			if (status !== "granted") {
				console.log(`Permission to location was denied. status:`);
				console.log(status);
				alert(`Permission to location was denied`);
				return;
			}

			/*
            Asks the user to turn on high accuracy location mode which enables network provider that uses Google Play services to improve location accuracy and location-based services.
            */
			await enableNetworkProviderAsync();

			// let location = await Location.getLastKnownPositionAsync({});
			const location = await getCurrentPositionAsync({
				accuracy: Accuracy.BestForNavigation,
			});

			handleOnLocationChange(location);
		}

		fetchLocation();
	}, []);

	return {
		userLocation: location,
	};
}
