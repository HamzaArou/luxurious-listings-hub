import { supabase } from "@/integrations/supabase/client";

export async function uploadFile(file: File, bucket: "project-images" | "project-plans") {
  try {
    console.log(`Attempting to upload file to bucket ${bucket}`);

    // First check if we have an authenticated session
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError || !session) {
      console.error("Authentication error:", sessionError);
      throw new Error("You must be authenticated to upload files");
    }

    const fileExt = file.name.split(".").pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;

    // Attempt the file upload
    const { error: uploadError, data } = await supabase.storage
      .from(bucket)
      .upload(fileName, file, {
        upsert: false,
        contentType: file.type
      });

    if (uploadError) {
      console.error("Upload error:", uploadError);
      throw uploadError;
    }

    if (!data?.path) {
      throw new Error("Upload succeeded but no path returned");
    }

    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(data.path);

    console.log("File uploaded successfully:", publicUrl);
    return publicUrl;
  } catch (error) {
    console.error("Error in uploadFile:", error);
    throw error;
  }
}

export async function uploadFiles(files: FileList, bucket: "project-images" | "project-plans") {
  const urls: string[] = [];
  
  for (let i = 0; i < files.length; i++) {
    const url = await uploadFile(files[i], bucket);
    urls.push(url);
  }

  return urls;
}