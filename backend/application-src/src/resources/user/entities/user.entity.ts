import { UserRole } from 'src/utils/common.util';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('user')
/**
 * Defines the user table
 */
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 'HMS User' })
  fullName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  photoUrl: string;

  @Column({ default: true })
  isLoggedIn: boolean;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.NURSE })
  role: UserRole;

  @CreateDateColumn()
  createdAt: Date;
}
