import { supabase } from "./";

export const uploadReceipt = async (
  file: File,
  customName?: string
): Promise<string | null> => {
  const fileName = customName
    ? customName.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9.-]/g, "")
    : `${Date.now()}-${file.name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9.-]/g, "")}`;

  const { error } = await supabase.storage
    .from("receipts")
    .upload(fileName, file);

  if (error) {
    console.error("Error uploading receipt:", error.message);
    return null;
  }

  const { data: urlData } = supabase.storage
    .from("receipts")
    .getPublicUrl(fileName);

  return urlData?.publicUrl || null;
};
