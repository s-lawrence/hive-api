import { Injectable } from "@nestjs/common";
import * as S3 from "aws-sdk/clients/s3";

@Injectable()
export class MediaService {
  uploadFile(file): Promise<S3.ManagedUpload.SendData> {
    if (!file) {
      return new Promise(resolve => resolve());
    }
    var upload = new S3.ManagedUpload({
      params: {
        Bucket: "hive.media.storage",
        Key: `media/${file.name || file.originalname || file.size.toString()}`,
        Body: file.buffer,
        ACL: "public-read",
        ContentDisposition: "inline",
        ContentType: file.contentType || file.mimetype || "image/jpeg",
        ContentEncoding: file.encoding
      }
    });

    return upload.promise();
  }
}
