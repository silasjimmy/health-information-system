import { Injectable } from '@nestjs/common';
import { CreateClientDto, UpdateClientDto } from './dto/client.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
  ) {}

  /**
   * Creates a new client record in the database
   * @param createClientDto client's information
   * @returns A resolved promise containing the newly created client details
   */
  create(createClientDto: CreateClientDto): Promise<CreateClientDto & Client> {
    return this.clientRepository.save(createClientDto);
  }

  /**
   * Retrieves all clients from the database
   * @returns A resolved promise containing an array of all clients in the database
   */
  findAll(): Promise<Client[]> {
    return this.clientRepository.find();
  }

  /**
   * Retrieves a single client record by ID from the database
   * @param id ID of the client to retrieve
   * @returns A resolved promise containing the retireved client details,
   * null if the client is not found
   */
  findOneById(id: number): Promise<Client | null> {
    return this.clientRepository.findOneBy({ id });
  }

  /**
   * Updates a single client record in the database by ID
   * @param id client ID
   * @param updateClientDto client details to update with
   * @returns A resolved promise containing information of the number of rows updated
   */
  update(id: number, updateClientDto: UpdateClientDto): Promise<UpdateResult> {
    return this.clientRepository.update(id, updateClientDto);
  }

  /**
   * Deletes a single client from the database by ID
   * @param id client ID
   * @returns A resolved promises containing information of the number of rows deleted
   */
  remove(id: number) {
    return this.clientRepository.delete(id);
  }
}
