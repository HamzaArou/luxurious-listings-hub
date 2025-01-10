import { supabase } from "@/integrations/supabase/client";
import { Toast } from "@/components/ui/toast";

export async function uploadFile(
  file: File, 
  bucket: "project-images" | "project-plans",
  showToast: (toast: Toast) => void
) {
  try {
    // First check if we have an authenticated session
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError || !session) {
      console.error("Authentication error:", sessionError);
      throw new Error("You must be authenticated to upload files");
    }

    // Log the file details
    console.log("File details:", {
      name: file.name,
      type: file.type,
      size: file.size,
      bucket: bucket
    });

    const fileExt = file.name.split(".").pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;

    // Attempt the file upload
    const { data, error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: true,
        contentType: file.type
      });

    if (uploadError) {
      console.error("Upload error details:", uploadError);
      throw uploadError;
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

  } catch (error: any) {
    console.error("Error in uploadFile:", error);
    
    // Show toast with error message
    showToast({
      title: "Upload Error",
      description: error.message || "Failed to upload file",
      variant: "destructive",
    });
    
    throw error;
  }
}

export async function uploadMultipleFiles(
  files: FileList,
  bucket: "project-images" | "project-plans",
  showToast: (toast: Toast) => void
) {
  console.log(`Uploading ${files.length} files to ${bucket}`);
  const urls: string[] = [];
  
  for (let i = 0; i < files.length; i++) {
    try {
      const url = await uploadFile(files[i], bucket, showToast);
      urls.push(url);
    } catch (error) {
      console.error(`Error uploading file ${i + 1}:`, error);
      throw error; // Re-throw to handle in the form submission
    }
  }

  console.log(`Successfully uploaded ${urls.length} files`);
  return urls;
}