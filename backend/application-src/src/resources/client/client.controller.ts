import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto, UpdateClientDto } from './dto/client.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ErrorResult, SuccessResult } from 'src/utils/common.util';

@ApiTags('client')
@Controller('clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

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
          console.log(id);
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

  @ApiResponse({
    description: 'Clients retrieved successfully',
    status: 200,
  })
  @ApiResponse({
    description: 'Internal server error',
    status: 500,
  })
  @Get('all')
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

  @ApiResponse({
    description: 'Client retrieved successfully',
    status: 200,
  })
  @ApiResponse({
    description: 'Internal server error',
    status: 500,
  })
  @Get('client/:id')
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
