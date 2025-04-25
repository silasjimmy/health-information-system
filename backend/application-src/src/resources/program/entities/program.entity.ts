import { Client } from 'src/resources/client/entities/client.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

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

  @ManyToMany(() => Client, (client) => client.programs)
  clients: Client[];
}
