export declare enum UserRole {
    ADMIN = "admin",
    USER = "user"
}
export declare class UpdateUserDto {
    name: string;
    email: string;
    role: UserRole;
    created_at?: Date;
}
