import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ClientService } from './client.service';
import {
  CreateClientDto,
  FindClientsByNameDto,
  UpdateClientDto,
} from './dto/client.dto';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ErrorResult, SuccessResult } from 'src/utils/common.util';
import { ProgramService } from '../program/program.service';
import { ClientProgramService } from '../client-program/client-program.service';
import { Program } from '../program/entities/program.entity';
import { AuthGuard } from 'src/guards/auth.guard';

@ApiTags('client')
@ApiBearerAuth()
@Controller('clients')
export class ClientController {
  constructor(
    private readonly clientService: ClientService,
    private readonly programService: ProgramService,
    private readonly clientProgramService: ClientProgramService,
  ) {}

  @UseGuards(AuthGuard)
  @ApiBody({
    description: 'Filter clients by name payload',
    type: FindClientsByNameDto,
  })
  @ApiResponse({
    description: 'Clients retrieved successfully',
    status: 200,
  })
  @ApiResponse({
    description: 'Internal server error',
    status: 500,
  })
  @Post()
  async findAllByName(@Body() payload: FindClientsByNameDto) {
    try {
      const res = await this.clientService.findAllByName(payload);

      return {
        status: 200,
        message: 'Clients retrieved successfully',
        data: res,
      };
    } catch (error) {
      return {
        status: 500,
        message: 'Internal server error',
        error: error,
      };
    }
  }

  @UseGuards(AuthGuard)
  @Post('client')
  @ApiBody({
    description: 'Create new client payload',
    type: CreateClientDto,
  })
  @ApiResponse({
    description: 'Client added successfully',
    status: 201,
  })
  @ApiResponse({
    description: 'Bad request',
    status: 400,
  })
  async create(
    @Body() payload: CreateClientDto,
  ): Promise<SuccessResult | ErrorResult> {
    try {
      const res = await this.clientService.create(payload);

      /**
       * Add programs to the client if provided during registration
       */
      if (payload.programIds) {
        for await (const id of payload.programIds) {
          const program: Program | null =
            await this.programService.findOneById(id);

          if (program)
            // Assign the program to the client
            this.clientProgramService.create({
              clientId: res.id,
              programId: program.id,
            });
          else continue;
        }
      }

      return {
        status: 201,
        message: 'Client added successfully',
        data: res,
      };
    } catch (error) {
      return {
        status: 400,
        message: 'Bad request',
        error: error,
      };
    }
  }

  @UseGuards(AuthGuard)
  @Get('all')
  @ApiResponse({
    description: 'Clients retrieved successfully',
    status: 200,
  })
  @ApiResponse({
    description: 'Internal server error',
    status: 500,
  })
  async findAll(): Promise<SuccessResult | ErrorResult> {
    try {
      const res = await this.clientService.findAll();

      return {
        status: 200,
        message: 'Clients retrieved successfully',
        data: res,
      };
    } catch (error) {
      return {
        status: 500,
        message: 'Internal server error',
        error: error,
      };
    }
  }

  @Get('client/:id')
  @ApiResponse({
    description: 'Client retrieved successfully',
    status: 200,
  })
  @ApiResponse({
    description: 'Internal server error',
    status: 500,
  })
  async findOneById(
    @Param('id') id: number,
  ): Promise<SuccessResult | ErrorResult> {
    try {
      const res = await this.clientService.findOneById(id);

      return {
        status: 200,
        message: 'Client retrieved successfully',
        data: res,
      };
    } catch (error) {
      return {
        status: 500,
        message: 'Internal server error',
        error: error,
      };
    }
  }

  @UseGuards(AuthGuard)
  @Patch('client/:id')
  @ApiResponse({
    description: 'Client updated successfully',
    status: 200,
  })
  @ApiResponse({
    description: 'Internal server error',
    status: 500,
  })
  async update(
    @Param('id') id: number,
    @Body() payload: UpdateClientDto,
  ): Promise<SuccessResult | ErrorResult> {
    try {
      const res = await this.clientService.update(id, payload);

      return {
        status: 200,
        message: 'Client updated successfully',
        data: res.affected,
      };
    } catch (error) {
      return {
        status: 500,
        message: 'Internal server error',
        error: error,
      };
    }
  }

  @UseGuards(AuthGuard)
  @Delete('client/:id')
  @ApiResponse({
    description: 'Client deleted successfully',
    status: 200,
  })
  @ApiResponse({
    description: 'Internal server error',
    status: 500,
  })
  async remove(@Param('id') id: number): Promise<SuccessResult | ErrorResult> {
    try {
      const res = await this.clientService.remove(id);

      return {
        status: 200,
        message: 'Client deleted successfully',
        data: res.affected,
      };
    } catch (error) {
      return {
        status: 500,
        message: 'Internal server error',
        error: error,
      };
    }
  }
}
