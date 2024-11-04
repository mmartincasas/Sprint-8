export interface User {
    id: number,
    first: string,
    last: string,
    email: string,
    phone: string,
    location: string,
    hobby: string
}

export interface ApiResponse {
    error: boolean;
    status: number;
    body: User[]
}
