import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProgramService } from './program.service';
import { CreateProgramDto, UpdateProgramDto } from './dto/program.dto';
import { ErrorResult, SuccessResult } from 'src/utils/common.util';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('program')
@Controller('programs')
export class ProgramController {
  constructor(private readonly programService: ProgramService) {}

  @Post('program')
  @ApiBody({
    description: 'Create new program payload',
    type: CreateProgramDto,
  })
  @ApiResponse({
    description: 'Program added successfully',
    status: 201,
  })
  @ApiResponse({
    description: 'Bad request',
    status: 400,
  })
  async create(
    @Body() payload: CreateProgramDto,
  ): Promise<SuccessResult | ErrorResult> {
    try {
      const res = await this.programService.create(payload);

      return {
        status: 201,
        message: 'Program added successfully',
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

  @Get('all')
  @ApiResponse({
    description: 'Programs retrieved successfully',
    status: 200,
  })
  @ApiResponse({
    description: 'Internal server error',
    status: 500,
  })
  async findAll(): Promise<SuccessResult | ErrorResult> {
    try {
      const res = await this.programService.findAll();

      return {
        status: 200,
        message: 'Programs retrieved successfully',
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

  @Get('program/:id')
  @ApiResponse({
    description: 'Program retrieved successfully',
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
      const res = await this.programService.findOneById(id);

      return {
        status: 200,
        message: 'Program retrieved successfully',
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

  @Patch('program/:id')
  @ApiResponse({
    description: 'Program updated successfully',
    status: 200,
  })
  @ApiResponse({
    description: 'Internal server error',
    status: 500,
  })
  async update(
    @Param('id') id: number,
    @Body() payload: UpdateProgramDto,
  ): Promise<SuccessResult | ErrorResult> {
    try {
      const res = await this.programService.update(id, payload);

      return {
        status: 200,
        message: 'Program updated successfully',
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

  @Delete('program/:id')
  @ApiResponse({
    description: 'Program deleted successfully',
    status: 200,
  })
  @ApiResponse({
    description: 'Internal server error',
    status: 500,
  })
  async remove(@Param('id') id: number): Promise<SuccessResult | ErrorResult> {
    try {
      const res = await this.programService.remove(id);

      return {
        status: 200,
        message: 'Program deleted successfully',
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
