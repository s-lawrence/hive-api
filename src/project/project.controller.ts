import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
  Param,
  Get,
  Patch,
  Delete,
  UseInterceptors,
  UploadedFile,
} from "@nestjs/common";
import s3Storage = require("multer-s3");
import { FileInterceptor } from "@nestjs/platform-express";
import { ProjectDto } from "./dto/project.dto";
import { AuthGuard } from "@nestjs/passport";
import { ProjectService } from "./project.service";
import { Project } from "./project.entity";
import { UpdateProjectDto } from "./dto/update-project-dto";
import { DeleteResult } from "typeorm";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { S3 } from "aws-sdk";

@ApiBearerAuth()
@ApiTags("Project")
@UseGuards(AuthGuard())
@Controller("project")
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Get()
  getProjects(): Promise<Project[]> {
    return this.projectService.getProjects();
  }

  @Post("/create/:userId")
  @UseInterceptors(
    FileInterceptor("media", {
      storage: s3Storage({
        s3: new S3(),
        bucket: "hive.media.storage/media",
        acl: "public-read",
        key: function(req, file, cb) {
          cb(null, Date.now() + file.originalname); //use Date.now() for unique file keys
        },
        contentType: function (req, file, cb) {
          cb(null, file.mimetype); //use Date.now() for unique file keys
          },
      }),
    })
  )
  createProject(
    @Param("userId") userId: string,
    @Body(ValidationPipe) projectDto: ProjectDto,
    @UploadedFile() media
  ): Promise<Project> {
    return this.projectService.createProject(userId, projectDto, media);
  }

  @Get("/:id")
  getProjectById(@Param("id") id: string): Promise<Project> {
    return this.projectService.getProjectById(id);
  }

  @Patch("/:id/user/:userId")
  updateProjectById(
    @Param("id") id: string,
    @Param("userId") userId: string,
    @Body(ValidationPipe) updateProjectDto: UpdateProjectDto
  ): Promise<Project> {
    return this.projectService.updateProjectById(id, userId, updateProjectDto);
  }

  @Delete("/:id/user/:userId")
  deleteProjectById(
    @Param("id") id: string,
    @Param("userId") userId: string
  ): Promise<DeleteResult> {
    return this.projectService.deleteProjectById(id, userId);
  }
}
