export interface Chart {
    id: number,
    month: string,
    year: number,
    visits: number
}

export interface ApiResponse {
    error: boolean;
    status: number;
    body: Chart[]
}
