import { Program } from 'src/resources/program/entities/program.entity';
import { Gender } from 'src/utils/common.util';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('client')
/**
 * Defines the client table
 */
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  age: number;

  @Column({ type: 'enum', enum: Gender })
  gender: Gender;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => Program, (program) => program.clients, { eager: true }) // Load a client with all related programs
  @JoinTable({
    name: 'client_program',
    joinColumn: {
      name: 'clientId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'programId',
      referencedColumnName: 'id',
    },
  })
  programs: Program[];
}
