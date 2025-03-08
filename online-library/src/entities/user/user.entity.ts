import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 255, type: 'varchar' })
    name: string;

    @Column({ unique: true, length: 255, type: 'varchar' })
    email: string;

    @Column({ type: 'enum', enum: ['user', 'admin'], default: 'user' })
    role: 'user' | 'admin';

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;
}
