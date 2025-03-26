package com.szte.saturn.services;

import io.minio.*;
import io.minio.http.Method;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;
import java.util.concurrent.TimeUnit;

@Service
public class MinioService {


    private final MinioClient minioClient;

    public MinioService(MinioClient minioClient) {
        this.minioClient = minioClient;
    }

    public  String uploadFile(MultipartFile file) {
        try {

            boolean found = minioClient.bucketExists(BucketExistsArgs.builder().bucket("saturn").build());
            if (!found) {
                minioClient.makeBucket(MakeBucketArgs.builder().bucket("saturn").build());
            }

            String fileName = "profile-pictures/" + UUID.randomUUID();

            minioClient.putObject(PutObjectArgs.builder()
                    .bucket("saturn")
                    .object(fileName)
                    .stream(file.getInputStream(), file.getSize(), -1)
                    .contentType(file.getContentType())
                    .build());

            String url = minioClient.getPresignedObjectUrl(GetPresignedObjectUrlArgs.builder()
                    .bucket("saturn")
                    .object(fileName)
                    .method(Method.GET) // Set the HTTP method to GET
                    .expiry(60 * 60) // URL expiry time in seconds (1 hour)
                    .build());



            return fileName;

        } catch (Exception e) {
            throw new RuntimeException("File upload failed", e);
        }
    }

    public String generatePresignedUrl(String objectName) {
        try {
            return minioClient.getPresignedObjectUrl(
                    GetPresignedObjectUrlArgs.builder()
                            .method(Method.GET)
                            .bucket("saturn")
                            .object(objectName)
                            .expiry(30, TimeUnit.MINUTES)
                            .build()
            );
        } catch (Exception e) {
            throw new RuntimeException("Failed to generate presigned URL", e);
        }
    }

}
