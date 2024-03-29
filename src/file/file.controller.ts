import {
	Query,
	Body,
	Controller,
	Get,
	Header,
	Post,
	Req,
	Res,
	StreamableFile,
	UploadedFile,
	UseGuards,
	UseInterceptors,
	Logger,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage, MulterError } from 'multer';
import * as path from 'path';
import { FileService } from './file.service';
import { v4 as uuidv4 } from 'uuid';
import { createReadStream, existsSync } from 'fs';
import { join } from 'path';
import { UploadQuizCoverImageDto } from './dto/quiz-image.dto';

import { Query as ExpressQuery } from 'express-serve-static-core';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiCreatedResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { UploadImageResponseDto, UploadQuestionImageDto, UploadQuestionImageResponseDto } from './dto/upload.dto';
import { GetImageDto } from './dto/get.dto';

@ApiTags('File')
@ApiBearerAuth()
@Controller('file')
export class FileController {
	constructor(private fileService: FileService) { }
	private readonly logger = new Logger(FileController.name);

	@Post('/upload/profile-image')
	@UseGuards(AuthGuard())
	@ApiCreatedResponse({
		description: 'Uploaded profile image',
		type: UploadImageResponseDto,
	})
	@ApiConsumes('multipart/form-data')
	@ApiBody({
		schema: {
			type: 'object',
			properties: {
				'profile-image': {
					type: 'string',
					format: 'binary',
				},
			},
		},
	})
	@UseInterceptors(
		FileInterceptor('profile-image', {
			storage: diskStorage({
				destination: 'resources/profile-image',
				filename: (req, file, cb) => {
					const filename = uuidv4();
					const ext = path.parse(file.originalname).ext;
					cb(null, `${filename}${ext}`);
				},
			}),
			fileFilter: (req, file, cb) => {
				if (file.originalname.match(/^.*\.(jpg|png|jpeg|gif)$/)) cb(null, true);
				else cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
			},
			limits: { fileSize: 4e6 },
		}),
	)
	async uploadProfileImage(
		@Req()
		req,
		@UploadedFile()
		file: Express.Multer.File,
	): Promise<UploadImageResponseDto> {
		return await this.fileService.updateProfileImage(
			req.user._id,
			file.filename,
		)
	}

	@Get('/get/profile-image')
	@UseGuards(AuthGuard())
	@ApiCreatedResponse({
		description: 'Get profile image',
		type: StreamableFile,
	})
	getProfileImage(@Req() req, @Res({ passthrough: true }) res): StreamableFile {
		this.logger.log(`/get/profile-image: ${req.user.imageUrl}`);

		if (!req.user.imageUrl) {
			const file = createReadStream(
				join(process.cwd(), './resources/static-image/profile-image.png'),
			);
			res.set({
				'Content-Type': 'image/png',
				'Content-Disposition': 'attachment; filename="profile-image.png"',
			});
			return new StreamableFile(file);
		}

		const filePath = join(
			process.cwd(),
			'./resources/profile-image/',
			req.user.imageUrl,
		);
		if (existsSync(filePath)) {
			const file = createReadStream(filePath);
			const fileType = req.user.imageUrl.match(/\.([^.]+)$/)[1];
			res.set({
				'Content-Type': `image/${fileType}`,
				'Content-Disposition': `attachment; filename="${req.user.imageUrl}"`,
			});
			return new StreamableFile(file);
		}

		const file = createReadStream(
			join(process.cwd(), './resources/static-image/profile-image.png'),
		);
		res.set({
			'Content-Type': 'image/png',
			'Content-Disposition': 'attachment; filename="profile-image.png"',
		});
		return new StreamableFile(file);
	}

	@Get('/get/question-image')
	@ApiCreatedResponse({
		description: 'Get question image',
		type: StreamableFile,
	})
	@ApiQuery({
		type: UploadQuizCoverImageDto,
	})
	getQuestionImage(
		@Query()
		query: ExpressQuery,
		@Res({ passthrough: true })
		res,
	): StreamableFile {
		const imageUrl = query.imageUrl as string;
		this.logger.log(`/get/question-image: ${imageUrl}`);
		if (!imageUrl) {
			res.status(200);
			return;
		}

		const filePath = join(
			process.cwd(),
			'./resources/question-image/',
			imageUrl,
		);

		if (existsSync(filePath)) {
			const file = createReadStream(filePath);
			const fileType = imageUrl.match(/\.([^.]+)$/)[1];
			res.set({
				'Content-Type': `image/${fileType}`,
				'Content-Disposition': `attachment; filename="${imageUrl}"`,
			});
			return new StreamableFile(file);
		}

		const file = createReadStream(
			join(process.cwd(), './resources/static-image/quiz-image.png'),
		);
		res.set({
			'Content-Type': 'image/png',
			'Content-Disposition': 'attachment; filename="quiz-image.png"',
		});
		return new StreamableFile(file);
	}


	@Get('/get/quiz-cover-image')
	@ApiCreatedResponse({
		description: 'Get quiz cover image',
		type: StreamableFile,
	})
	@ApiQuery({
		type: GetImageDto,
	})
	getQuizCoverImage(
		@Query()
		query: ExpressQuery,
		@Res({ passthrough: true })
		res,
	): StreamableFile {
		const imageUrl = query.imageUrl as string;
		this.logger.log(`/get/quiz-cover-image: ${imageUrl}`);

		if (!imageUrl) {
			res.status(200);
			return;
		}

		const filePath = join(
			process.cwd(),
			'./resources/quiz-cover-image/',
			imageUrl,
		);
		if (existsSync(filePath)) {
			const file = createReadStream(filePath);
			const fileType = imageUrl.match(/\.([^.]+)$/)[1];
			res.set({
				'Content-Type': `image/${fileType}`,
				'Content-Disposition': `attachment; filename="${imageUrl}"`,
			});
			return new StreamableFile(file);
		}

		const file = createReadStream(
			join(process.cwd(), './resources/static-image/quiz-image.png'),
		);
		res.set({
			'Content-Type': 'image/png',
			'Content-Disposition': 'attachment; filename="quiz-image.png"',
		});
		return new StreamableFile(file);
	}

	@Post('/upload/quiz-cover-image')
	@UseGuards(AuthGuard())
	@ApiCreatedResponse({
		description: 'Uploaded quiz cover image',
		type: UploadImageResponseDto,
	})
	@ApiConsumes('multipart/form-data')
	@ApiBody({
		schema: {
			type: 'object',
			properties: {
				quizId: { type: 'string' },
				'quiz-cover-image': {
					type: 'string',
					format: 'binary',
				},
			},
		},
	})
	@UseInterceptors(
		FileInterceptor('quiz-cover-image', {
			storage: diskStorage({
				destination: 'resources/quiz-cover-image',
				filename: (req, file, cb) => {
					const filename = uuidv4();
					const ext = path.parse(file.originalname).ext;
					cb(null, `${filename}${ext}`);
				},
			}),
			fileFilter: (req, file, cb) => {
				if (file.originalname.match(/^.*\.(jpg|png|jpeg|gif)$/)) cb(null, true);
				else cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
			},
			limits: { fileSize: 4e6 },
		}),
	)
	async uploadQuizCoverImage(
		@Req()
		req,
		@UploadedFile()
		file: Express.Multer.File,
		@Body()
		body: UploadQuizCoverImageDto,
	): Promise<UploadImageResponseDto> {
		return await this.fileService.uploadQuizCoverImage(
			req.user._id,
			body.quizId,
			file.filename,
		)
	}

	@Post('/upload/question-image')
	@UseGuards(AuthGuard())
	@ApiCreatedResponse({
		description: 'Uploaded question image',
		type: UploadQuestionImageResponseDto,
	})
	@ApiConsumes('multipart/form-data')
	@ApiBody({
		schema: {
			type: 'object',
			properties: {
				questionId: { type: 'number' },
				'question-image': {
					type: 'string',
					format: 'binary',
				},
			},
		},
	})
	@UseInterceptors(
		FileInterceptor('question-image', {
			storage: diskStorage({
				destination: 'resources/question-image',
				filename: (req, file, cb) => {
					const filename = uuidv4();
					const ext = path.parse(file.originalname).ext;
					cb(null, `${filename}${ext}`);
				},
			}),
			fileFilter: (req, file, cb) => {
				if (file.originalname.match(/^.*\.(jpg|png|jpeg|gif)$/)) cb(null, true);
				else cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
			},
			limits: { fileSize: 4e6 },
		}),
	)
	async uploadQuestionImage(
		@Req()
		req,
		@UploadedFile()
		file: Express.Multer.File,
		@Body()
		body: UploadQuestionImageDto,
	): Promise<UploadQuestionImageResponseDto> {
		return this.fileService.uploadQuestionImage(
			req.user._id,
			body.questionId,
			file?.filename
		)
	}

}
