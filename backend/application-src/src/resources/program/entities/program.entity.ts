import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('program')
/**
 * Defines the program table
 */
export class Program {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  label: string;

  @Column()
  value: string;

  @Column()
  description: string;

  @Column()
  users: string;
}
