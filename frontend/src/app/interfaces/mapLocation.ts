export interface MapLocation {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    category: string
}

export interface ApiResponse {
    error: boolean;
    status: number;
    body: MapLocation[]
}
