-- Create admin users table for authentication
CREATE TABLE public.admin_users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  name TEXT,
  is_active BOOLEAN DEFAULT true,
  failed_login_attempts INTEGER DEFAULT 0,
  locked_until TIMESTAMP WITH TIME ZONE,
  last_login_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Admin users can view their own data" 
ON public.admin_users 
FOR SELECT 
USING (id = auth.uid());

CREATE POLICY "Admin users can update their own data" 
ON public.admin_users 
FOR UPDATE 
USING (id = auth.uid());

-- Add trigger for updated_at
CREATE TRIGGER update_admin_users_updated_at
BEFORE UPDATE ON public.admin_users
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

-- Add slug and SEO fields to blog_posts
ALTER TABLE public.blog_posts 
ADD COLUMN meta_title_en TEXT,
ADD COLUMN meta_title_ar TEXT,
ADD COLUMN meta_title_fr TEXT,
ADD COLUMN meta_description_en TEXT,
ADD COLUMN meta_description_ar TEXT,
ADD COLUMN meta_description_fr TEXT,
ADD COLUMN tags TEXT[];

-- Add working hours and other details to doctors
ALTER TABLE public.doctors 
ADD COLUMN bio TEXT,
ADD COLUMN photo_url TEXT,
ADD COLUMN working_hours JSONB DEFAULT '{"monday":{"start":"09:00","end":"17:00"},"tuesday":{"start":"09:00","end":"17:00"},"wednesday":{"start":"09:00","end":"17:00"},"thursday":{"start":"09:00","end":"17:00"},"friday":{"start":"09:00","end":"17:00"},"saturday":{"start":"09:00","end":"13:00"},"sunday":{"start":"","end":""}}';

-- Insert default admin user (password will be set via edge function)
INSERT INTO public.admin_users (email, password_hash, name) 
VALUES ('admin@clinic.com', '', 'Clinic Administrator')
ON CONFLICT (email) DO NOTHING;