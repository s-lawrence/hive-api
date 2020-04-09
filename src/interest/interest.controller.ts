import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
  Patch,
  Delete,
} from "@nestjs/common";
import { InterestService } from "./interest.service";
import { Interest } from "./interest.entity";
import { CreateInterestDto } from "./dto/create-interest.dto";
import { AuthGuard } from "@nestjs/passport";
import { UpdateInterestDto } from "./dto/update-interest.dto";
import { DeleteResult } from "typeorm";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";

/**
 * Interest Controller - Immediate interaction with client
 * side requests regarding Interest data.
 * @requires InterestService
 */
@ApiBearerAuth()
@ApiTags("Interests")
@UseGuards(AuthGuard())
@Controller("interest")
export class InterestController {
  constructor(private interestService: InterestService) {}

  /**
   * Calls InterestService to initiate interest creation.
   * @param createInterestDto - Data transfer object restricting the data accepted
   *                            for Interest creation.
   * @returns Promise<Interest>
   */
  @Post("/create")
  createInterest(
    @Body(ValidationPipe) createInterestDto: CreateInterestDto
  ): Promise<Interest> {
    return this.interestService.createInterest(createInterestDto);
  }

  /**
   * Calls InterestService to retrieve interest based by name provided.
   * @param name - Name of the interest to retrieve
   * @returns Promise<Interest>
   */
  @Get("/:name")
  getInterest(@Param("name") name: string): Promise<Interest> {
    return this.interestService.getInterest(name.toLowerCase());
  }

  /**
   * Calls InterestService to initiate interest update.
   * @param name - Name of the interest to update
   * @param updateInterestDto - Data transfer object restricting the data accepted
   *                            for updating interest.
   * @returns Promise<Interest>
   */
  @Patch("/:name")
  updateInterest(
    @Param("name") name: string,
    @Body(ValidationPipe) updateInterestDto: UpdateInterestDto
  ): Promise<Interest> {
    return this.interestService.updateInterest(
      name.toLowerCase(),
      updateInterestDto
    );
  }

  /**
   * Calls InterestService to initiate deletion of interest.
   * @param name - Name of the interest to delete
   * @returns Promise<DeleteResult>
   */
  @Delete("/:name")
  deleteInterest(@Param("name") name: string): Promise<DeleteResult> {
    return this.interestService.deleteInterest(name.toLowerCase());
  }
}
