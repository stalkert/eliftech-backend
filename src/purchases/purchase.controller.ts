import { Body, Controller, Delete, Get, Param, Post, UseGuards, Request, Patch } from '@nestjs/common';
import { Roles } from '../core/decorators/roles.decorator';
import { Role } from '../core/roles/role.model';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { JwtPayload } from '../core/strategy/jwt.strategy';
import { PurchaseService } from './purchase.service';
import { PurchaseGoodItem } from './dto/purchase.dto';
import { Purchase } from './schemas/purchase.schema';

@Controller('api/purchase')
export class PurchaseController {
  constructor(private purchaseService: PurchaseService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @Roles(Role.Admin, Role.SuperAdmin, Role.User)
  getPurchase(@Request() req: { user: JwtPayload }): Promise<PurchaseGoodItem[]> {
    return this.purchaseService.getPurchase(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('add')
  @Roles(Role.Admin, Role.SuperAdmin, Role.User)
  addGoodToPurchase(@Request() req: { user: JwtPayload }, @Body('goodId') goodId: string): Promise<Purchase> {
    return this.purchaseService.addGoodToPurchase(req.user.userId, goodId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':goodId')
  @Roles(Role.Admin, Role.SuperAdmin, Role.User)
  updateGoodFromPurchase(@Request() req: { user: JwtPayload }, @Param('goodId') goodId: string): Promise<Purchase> {
    return this.purchaseService.update(req.user.userId, goodId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':goodId')
  @Roles(Role.Admin, Role.SuperAdmin, Role.User)
  deleteGoodFromPurchase(@Request() req: { user: JwtPayload }, @Param('goodId') goodId: string): Promise<Purchase> {
    return this.purchaseService.delete(req.user.userId, goodId);
  }
}
