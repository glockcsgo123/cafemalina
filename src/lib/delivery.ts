export const CAFE_COORDS = { lat: 51.647, lng: 35.951 }

export const DELIVERY_ZONES = [
  { id: 1, radius: 2,  minOrder: 1500, color: "#22c55e", label: "Зона 1" },
  { id: 2, radius: 5,  minOrder: 1800, color: "#eab308", label: "Зона 2" },
  { id: 3, radius: 10, minOrder: 2100, color: "#f97316", label: "Зона 3" },
  { id: 4, radius: 18, minOrder: 2400, color: "#ef4444", label: "Зона 4" },
] as const

export type DeliveryZone = {
  id: number
  radius: number
  minOrder: number
  color: string
  label: string
}

export function getDistanceKm(
  lat1: number, lng1: number,
  lat2: number, lng2: number,
): number {
  const R = 6371
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLng = (lng2 - lng1) * Math.PI / 180
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

export function getDeliveryZone(
  lat: number,
  lng: number,
  zones: { radius: number; minOrder: number; color: string; label: string; id: number }[] = DELIVERY_ZONES as unknown as DeliveryZone[],
): DeliveryZone | null {
  const dist = getDistanceKm(CAFE_COORDS.lat, CAFE_COORDS.lng, lat, lng)
  return (zones.find(z => dist <= z.radius) as DeliveryZone) ?? null
}

export async function geocodeAddress(
  address: string,
): Promise<{ lat: number; lng: number } | null> {
  const apiKey = process.env.NEXT_PUBLIC_YANDEX_MAPS_API_KEY
  if (!apiKey) return null
  const query = encodeURIComponent(`Курская область, ${address}`)
  const url = `https://geocode-maps.yandex.ru/1.x/?apikey=${apiKey}&geocode=${query}&format=json&results=1`
  try {
    const res = await fetch(url)
    const data = await res.json()
    const pos =
      data?.response?.GeoObjectCollection?.featureMember?.[0]?.GeoObject?.Point?.pos
    if (!pos) return null
    const [lng, lat] = pos.split(" ").map(Number)
    return { lat, lng }
  } catch {
    return null
  }
}
