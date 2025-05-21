import { Body, Controller, Delete, Get, Param, Post, UseGuards, Request, Patch } from '@nestjs/common';
import { Roles } from '../core/decorators/roles.decorator';
import { Role } from '../core/roles/role.model';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { JwtPayload } from '../core/strategy/jwt.strategy';
import { FridgeService } from './fridge.service';
import { FridgeGoodItem } from './dto/fridge.dto';
import { Fridge } from './schemas/fridge.schema';

@Controller('api/fridge')
export class FridgeController {
  constructor(private fridgeService: FridgeService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @Roles(Role.Admin, Role.SuperAdmin, Role.User)
  getGoodsInFridge(@Request() req: { user: JwtPayload }): Promise<FridgeGoodItem[]> {
    return this.fridgeService.getGoodsInFridge(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('add')
  @Roles(Role.Admin, Role.SuperAdmin, Role.User)
  addGoodToFridge(@Request() req: { user: JwtPayload }, @Body('goodId') goodId: string): Promise<Fridge> {
    return this.fridgeService.addGoodToFridge(req.user.userId, goodId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':goodId')
  @Roles(Role.Admin, Role.SuperAdmin, Role.User)
  updateGoodInFridge(@Request() req: { user: JwtPayload }, @Param('goodId') goodId: string): Promise<Fridge> {
    return this.fridgeService.update(req.user.userId, goodId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':goodId')
  @Roles(Role.Admin, Role.SuperAdmin, Role.User)
  deleteGoodFromFridge(@Request() req: { user: JwtPayload }, @Param('goodId') goodId: string): Promise<Fridge> {
    return this.fridgeService.delete(req.user.userId, goodId);
  }
}
