export interface RegisterDTO {
    username: string;
    email: string;
    password: string;
    typeOfUser:boolean
}

export interface LoginDTO {
    username: string;
    password: string;
}