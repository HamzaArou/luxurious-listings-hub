import { supabase } from "@/integrations/supabase/client";

export async function uploadFile(file: File, bucket: "project-images" | "project-plans") {
  const fileExt = file.name.split(".").pop();
  const fileName = `${crypto.randomUUID()}.${fileExt}`;

  const { error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(fileName, file);

  if (uploadError) throw uploadError;

  const { data: { publicUrl } } = supabase.storage
    .from(bucket)
    .getPublicUrl(fileName);

  return publicUrl;
}

export async function uploadFiles(files: FileList, bucket: "project-images" | "project-plans") {
  const urls: string[] = [];
  
  for (let i = 0; i < files.length; i++) {
    const url = await uploadFile(files[i], bucket);
    urls.push(url);
  }

  return urls;
}