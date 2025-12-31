import { createClient } from '@supabase/supabase-js';

// তোমার .env.local ফাইল থেকে কীগুলো নাও
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * ফাইল আপলোড করে এবং পাবলিক URL রিটার্ন করে
 * @param file - ইউজার যে ফাইলটি সিলেক্ট করেছে
 * @returns {Promise<string | null>} - ইমেজের পাবলিক লিঙ্ক
 */
export async function uploadImage(file: File): Promise<string | null> {
  try {
    // ১. ফাইলের নাম ইউনিক করা (যাতে এক নামে দুই ফাইল না হয়)
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `hackathon_images/${fileName}`;

    // ২. সুপাবেসে আপলোড করা
    const { error: uploadError } = await supabase.storage
      .from('uploads') // তোমার বাকেটের নাম
      .upload(filePath, file);

    if (uploadError) {
      console.error('Upload Error:', uploadError);
      return null;
    }

    // ৩. পাবলিক লিঙ্ক বের করা
    const { data } = supabase.storage
      .from('uploads')
      .getPublicUrl(filePath);

    return data.publicUrl;

  } catch (error) {
    console.error('Unexpected Error:', error);
    return null;
  }
}