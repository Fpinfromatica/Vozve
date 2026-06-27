// This file exports TypeScript types and interfaces used throughout the application to ensure type safety.

export interface User {
    id: string;
    name: string;
    email: string;
}

export interface Product {
    id: string;
    name: string;
    price: number;
    description?: string;
}

export interface Order {
    id: string;
    userId: string;
    productIds: string[];
    totalAmount: number;
    createdAt: Date;
}

export type ApiResponse<T> = {
    data: T;
    message: string;
    success: boolean;
};