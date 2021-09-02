

import { StringSchema } from "yup";

export interface User {
    Username: string;
    Password: string;
    Email: string;
    City: string;
    Zip: string;
}

export interface UserCredentials {
    Username: string;
    Password: string;
}