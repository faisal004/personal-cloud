import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { auth } from "../../../auth";
import { db, files, images } from "@repo/db";
const f = createUploadthing();


// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
    // Define as many FileRoutes as you like, each with a unique routeSlug
    imageUploader: f({ image: { maxFileSize: "4MB" } })
        .middleware(async () => {
            // This code runs on your server before upload
            const session = await auth()
            // If you throw, the user will not be able to upload
            if (!session?.user) throw new UploadThingError("Unauthorized");

            // Whatever is returned here is accessible in onUploadComplete as `metadata`
            return { userId: session?.user.id };
        })
        .onUploadComplete(async ({ metadata, file }) => {
            // This code RUNS ON YOUR SERVER after upload
            console.log("Upload complete for userId:", typeof(metadata.userId),file.url);
            await db.insert(images).values({           
                url: file.url,
                userId: metadata?.userId as string,
            });
       
            
            console.log("file url", file.url);

            // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
            return { uploadedBy: metadata.userId };
        }),
        fileUploader: f({ "application/pdf": { maxFileSize: "4MB" } })
        .middleware(async () => {
            // This code runs on your server before upload
            const session = await auth()
            // If you throw, the user will not be able to upload
            if (!session?.user) throw new UploadThingError("Unauthorized");

            // Whatever is returned here is accessible in onUploadComplete as `metadata`
            return { userId: session?.user.id };
        })
        .onUploadComplete(async ({ metadata, file }) => {
            // This code RUNS ON YOUR SERVER after upload
            console.log("Upload complete for userId:", typeof(metadata.userId),file.url);
            await db.insert(files).values({           
                url: file.url,
                userId: metadata?.userId as string,
            });
       
            
            console.log("file url", file.url);

            // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
            return { uploadedBy: metadata.userId };
        }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
