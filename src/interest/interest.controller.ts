import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
  Patch,
  Delete
} from "@nestjs/common";
import { InterestService } from "./interest.service";
import { Interest } from "./interest.entity";
import { CreateInterestDto } from "./dto/create-interest.dto";
import { AuthGuard } from "@nestjs/passport";
import { UpdateInterestDto } from "./dto/update-interest.dto";
import { DeleteResult } from "typeorm";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";

@ApiBearerAuth()
@ApiTags('Interests')
@UseGuards(AuthGuard())
@Controller("interest")
export class InterestController {
  constructor(private interestService: InterestService) {}

  @Post("/create")
  createInterest(@Body(ValidationPipe) createInterestDto: CreateInterestDto) {
    return this.interestService.createInterest(createInterestDto);
  }

  @Get("/:name")
  getInterest(@Param("name") name: string): Promise<Interest> {
    return this.interestService.getInterest(name.toLowerCase());
  }

  @Patch("/:name")
  updateInterest(
    @Param("name") name: string,
    @Body(ValidationPipe) updateInterestDto: UpdateInterestDto
  ): Promise<Interest> {
    return this.interestService.updateInterest(name.toLowerCase(), updateInterestDto);
  }

  @Delete("/:name")
  deleteInterest(@Param("name") name: string): Promise<DeleteResult> {
    return this.interestService.deleteInterest(name.toLowerCase());
  }

}
