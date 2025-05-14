import mbxGeocoding from '@mapbox/mapbox-sdk/services/geocoding';

const geocodingClient = mbxGeocoding({ accessToken: import.meta.env.VITE_MAPBOX_TOKEN });

export async function geocodeAddress(address) {
  if (!address || typeof address !== 'string') {
    console.error('Invalid address provided to geocodeAddress:', address);
    return null;
  }

  try {
    const response = await geocodingClient
      .forwardGeocode({
        query: address,
        limit: 1,
      })
      .send();

    const match = response.body?.features?.[0];
    if (!match || !match.center) {
      console.warn('No geocode match found for address:', address);
      return null;
    }

    return match.center; // [lng, lat]
  } catch (error) {
    console.error('Error during geocoding:', error.message || error);
    return null;
  }
}
