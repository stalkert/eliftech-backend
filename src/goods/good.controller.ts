import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { GoodService } from './good.service';
import { Good } from './schemas/good.schema';
import { Roles } from '../core/decorators/roles.decorator';
import { Role } from '../core/roles/role.model';
import { GoodDto } from './dto/good.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Direction } from '../core/models/sorting';
import { List } from '../core/models/list';

@Controller('api/goods')
export class GoodController {
  constructor(private goodService: GoodService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @Roles(Role.Admin, Role.SuperAdmin)
  createGood(@Body() goodDto: GoodDto): Promise<Good | null> {
    return this.goodService.create(goodDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @Roles(Role.Admin, Role.SuperAdmin)
  getAllWithPagination(
    @Query('page') page: number,
    @Query('size') limit: number,
    @Query('field') field: string,
    @Query('direction') direction: Direction,
    @Query('search') search: string,
  ): Promise<List<Good>> {
    return this.goodService.getAllWithPagination(page, limit, field, direction, search);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @Roles(Role.Admin, Role.SuperAdmin)
  getGood(@Param('id') id: string): Promise<Good> {
    return this.goodService.getGood(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @Roles(Role.Admin, Role.SuperAdmin)
  updateGood(@Param('id') id: string, @Body() goodDto: GoodDto): Promise<Good> {
    return this.goodService.update(id, goodDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @Roles(Role.Admin, Role.SuperAdmin)
  deleteGood(@Param('id') id: string): Promise<Good> {
    return this.goodService.delete(id);
  }
}
