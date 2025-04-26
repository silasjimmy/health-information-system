import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientProgram } from './client.program.entity';
import { Repository } from 'typeorm';
import { CreateClientProgramDto } from './client.program.dto';

@Injectable()
export class ClientProgramService {
  constructor(
    @InjectRepository(ClientProgram)
    private readonly clientProgramRepository: Repository<ClientProgram>,
  ) {}

  /**
   * Creates a new client program record in the database
   * @param createClientProgramDto client and program IDs
   * @returns A resolved promise containing the newly created client program relationship
   */
  create(
    createClientProgramDto: CreateClientProgramDto,
  ): Promise<CreateClientProgramDto & ClientProgram> {
    return this.clientProgramRepository.save(createClientProgramDto);
  }
}
