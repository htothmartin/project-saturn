package com.szte.saturn.services;

import io.minio.BucketExistsArgs;
import io.minio.GetPresignedObjectUrlArgs;
import io.minio.MakeBucketArgs;
import io.minio.MinioClient;
import io.minio.PutObjectArgs;
import io.minio.http.Method;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;
import java.util.concurrent.TimeUnit;

@Service
public class MinioService {

    private final MinioClient minioClient;

    @Value("${minio.bucket-name}")
    private String bucketName;

    @Value("${minio.exipry-time-in-minutes}")
    private int expiryTimeInMinutes;

    public MinioService(final MinioClient minioClient) {
        this.minioClient = minioClient;
    }

    public  String uploadFile(final MultipartFile file) {
        try {

            boolean found = minioClient.bucketExists(BucketExistsArgs
                    .builder()
                    .bucket(bucketName)
                    .build());
            if (!found) {
                minioClient.makeBucket(MakeBucketArgs.builder().bucket(bucketName).build());
            }

            String fileName = "profile-pictures/" + UUID.randomUUID();

            minioClient.putObject(PutObjectArgs.builder()
                    .bucket(bucketName)
                    .object(fileName)
                    .stream(file.getInputStream(), file.getSize(), -1)
                    .contentType(file.getContentType())
                    .build());

            return fileName;

        } catch (Exception e) {
            throw new RuntimeException("File upload failed", e);
        }
    }

    public String generatePreSignedUrl(final String objectName) {

        try {
            final String preSignedUrl =  minioClient.getPresignedObjectUrl(
                    GetPresignedObjectUrlArgs.builder()
                            .method(Method.GET)
                            .bucket(bucketName)
                            .object(objectName)
                            .expiry(expiryTimeInMinutes, TimeUnit.MINUTES)
                            .build());
            if(preSignedUrl.contains("minio:9000")) {
                return preSignedUrl.replace("minio:9000", "localhost/storage");
            }
            return preSignedUrl;

        } catch (Exception e) {
            throw new RuntimeException("Failed to generate pre signed URL", e);
        }
    }

}
