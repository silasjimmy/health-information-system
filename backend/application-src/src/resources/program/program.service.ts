import { Injectable } from '@nestjs/common';
import { CreateProgramDto, UpdateProgramDto } from './dto/program.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Program } from './entities/program.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class ProgramService {
  constructor(
    @InjectRepository(Program)
    private readonly programRepository: Repository<Program>,
  ) {}

  /**
   * Creates a new program record in the database
   * @param createProgramDto program's information
   * @returns A resolved promise containing the newly created program details
   */
  create(
    createProgramDto: CreateProgramDto,
  ): Promise<CreateProgramDto & Program> {
    return this.programRepository.save(createProgramDto);
  }

  /**
   * Retrieves all programs from the database
   * @returns A resolved promise containing an array of all programs in the database
   */
  findAll(): Promise<Program[]> {
    return this.programRepository.find();
  }

  /**
   * Retrieves a single program record by ID from the database
   * @param id ID of the program to retrieve
   * @returns A resolved promise containing the retireved program details,
   * null if the program is not found
   */
  findOneById(id: number): Promise<Program | null> {
    return this.programRepository.findOneBy({ id });
  }

  /**
   * Updates a single program record in the database by ID
   * @param id program ID
   * @param updateProgramDto program details to update with
   * @returns A resolved promise containing information of the number of rows updated
   */
  update(
    id: number,
    updateProgramDto: UpdateProgramDto,
  ): Promise<UpdateResult> {
    return this.programRepository.update(id, updateProgramDto);
  }

  /**
   * Deletes a single program from the database by ID
   * @param id program ID
   * @returns A resolved promises containing information of the number of rows deleted
   */
  remove(id: number): Promise<DeleteResult> {
    return this.programRepository.delete(id);
  }
}
