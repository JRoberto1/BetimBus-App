import { NextResponse } from 'next/server';

// Simple in-memory cache to prevent abuse of Nominatim
// Note: In serverless environments (Vercel Node runtime), this cache persists
// across some requests handled by the same cold instance, providing best-effort caching.
const geocodeCache = new Map<string, { address: string, cachedAt: number }>();
const CACHE_TTL = 1000 * 60 * 60 * 24; // 24 hours

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');

  if (!lat || !lon) {
    return NextResponse.json({ error: 'Lat and lon are required' }, { status: 400 });
  }

  // Round coordinates to 3 decimal places (approx 111 meters precision). 
  // This clusters nearby queries and massively increases cache hits,
  // protecting OSM servers while keeping enough precision to identify the street.
  const precision = 3;
  const roundedLat = parseFloat(lat).toFixed(precision);
  const roundedLon = parseFloat(lon).toFixed(precision);
  const cacheKey = `${roundedLat},${roundedLon}`;

  if (geocodeCache.has(cacheKey)) {
    const cached = geocodeCache.get(cacheKey)!;
    if (Date.now() - cached.cachedAt < CACHE_TTL) {
      return NextResponse.json({ address: cached.address, cached: true });
    } else {
      geocodeCache.delete(cacheKey);
    }
  }

  try {
    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`;
    
    const response = await fetch(url, {
      headers: {
        // Nominatim strict usage policy requires a valid User-Agent
        'User-Agent': 'BetimBus-App/1.0 (betimbus@app.com)' 
      }
    });

    if (!response.ok) {
       throw new Error(`Nominatim API error: ${response.status}`);
    }

    const data = await response.json();
    
    const addressInfo = data.address || {};
    
    // Priority: Road -> Suburb -> Neighbourhood
    const street = addressInfo.road || addressInfo.suburb || addressInfo.neighbourhood || 'Via não mapeada';
    const neighborhood = addressInfo.suburb || addressInfo.neighbourhood || addressInfo.city_district || '';
    
    let displayAddress = street;
    if (neighborhood && !street.includes(neighborhood) && street !== neighborhood) {
      displayAddress = `${street}, ${neighborhood}`;
    }

    // Cache the resolved string
    geocodeCache.set(cacheKey, { address: displayAddress, cachedAt: Date.now() });

    return NextResponse.json({ address: displayAddress, cached: false });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to geocode', fallback: 'Localização Desconhecida' }, { status: 500 });
  }
}
