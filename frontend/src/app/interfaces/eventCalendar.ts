export interface EventCalendar {
    id: number,
    title: string,
    description: string,
    start: string,
    end: string,
    color: string | null
}

export interface ApiResponse {
    error: boolean;
    status: number;
    body: EventCalendar[]
}
