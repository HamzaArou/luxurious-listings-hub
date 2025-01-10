import { supabase } from "@/integrations/supabase/client";

export async function uploadFile(file: File, bucket: "project-images" | "project-plans") {
  try {
    // First check if we have an authenticated session
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError) {
      console.error("Session error:", sessionError);
      throw new Error("Authentication error: " + sessionError.message);
    }

    if (!session) {
      console.error("No active session found");
      throw new Error("You must be authenticated to upload files");
    }

    console.log("Authenticated user ID:", session.user.id);
    console.log("Attempting to upload file to bucket:", bucket);

    const fileExt = file.name.split(".").pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;

    // Log the file details
    console.log("File details:", {
      name: fileName,
      type: file.type,
      size: file.size,
      bucket: bucket
    });

    // Attempt the file upload with explicit content type
    const { error: uploadError, data } = await supabase.storage
      .from(bucket)
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: false,
        contentType: file.type
      });

    if (uploadError) {
      console.error("Upload error details:", uploadError);
      throw new Error(`Upload failed: ${uploadError.message}`);
    }

    if (!data?.path) {
      throw new Error("Upload succeeded but no path returned");
    }

    // Get the public URL for the uploaded file
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(data.path);

    console.log("File uploaded successfully. Public URL:", publicUrl);
    return publicUrl;
  } catch (error) {
    console.error("Error in uploadFile:", error);
    throw error;
  }
}

export async function uploadFiles(files: FileList, bucket: "project-images" | "project-plans") {
  console.log(`Starting batch upload of ${files.length} files to ${bucket}`);
  const urls: string[] = [];
  
  for (let i = 0; i < files.length; i++) {
    const url = await uploadFile(files[i], bucket);
    urls.push(url);
  }

  console.log(`Successfully uploaded ${urls.length} files`);
  return urls;
}