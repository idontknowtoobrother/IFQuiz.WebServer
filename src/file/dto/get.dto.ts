import { StreamableFile } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { Readable } from "stream";

export class GetImageDto {
    @ApiProperty({
        description: "image url",
        type: String,
        example: "googlelogo_color_272x92dp.png"
    })
    readonly imageUrl: string
}

export class FileResponseDto {
    @ApiProperty({ type: 'string', format: 'binary' })
    file: StreamableFile;
}