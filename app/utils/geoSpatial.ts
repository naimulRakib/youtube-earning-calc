// Haversine Formula to calculate distance between two GPS points in Kilometers
export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
}

function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}

// Function to find the nearest industrial danger
export function getPollutionRisk(userLat: number, userLon: number, zoneData: any) {
  let highestRisk = { type: "None", distance: 9999, message: "Safe Zone" };

  if (!zoneData.industrial_hotspots) return highestRisk;

  for (const spot of zoneData.industrial_hotspots) {
    const dist = calculateDistance(userLat, userLon, spot.coordinates.lat, spot.coordinates.lng);
    
    // Check if user is inside the danger radius (converted meters to km)
    const dangerRadiusKm = spot.danger_radius_meter / 1000;

    if (dist < highestRisk.distance) {
      // Logic: If distance is less than danger radius + buffer, it's a risk
      if (dist <= dangerRadiusKm) {
        highestRisk = {
          type: spot.type,
          distance: parseFloat(dist.toFixed(2)),
          message: `CRITICAL: ${dist.toFixed(2)}km from ${spot.name}. High risk of ${spot.pollutants.join(", ")}.`
        };
      } else if (dist <= dangerRadiusKm * 2) {
        highestRisk = {
          type: spot.type,
          distance: parseFloat(dist.toFixed(2)),
          message: `WARNING: ${dist.toFixed(2)}km from ${spot.name}. Moderate risk of air drift.`
        };
      }
    }
  }
  return highestRisk;
}