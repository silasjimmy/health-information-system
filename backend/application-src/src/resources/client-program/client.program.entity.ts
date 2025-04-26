import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Client } from '../client/entities/client.entity';
import { Program } from '../program/entities/program.entity';

@Entity('client_program')
/**
 * Defines the client program relationship
 */
export class ClientProgram {
  @PrimaryColumn()
  clientId: number;

  @PrimaryColumn()
  programId: number;

  @ManyToOne(() => Client, (client) => client.programs, { onDelete: 'CASCADE' }) // Delete the relationship once either of the entities is deleted
  @JoinColumn([{ name: 'clientId', referencedColumnName: 'id' }])
  clients: Client[];

  @ManyToOne(() => Program, (program) => program.clients, {
    onDelete: 'CASCADE',
  }) // Delete the relationship once either of the entities is deleted
  @JoinColumn([{ name: 'programId', referencedColumnName: 'id' }])
  programs: Program[];
}
