-- Create appointment types table
CREATE TABLE public.appointment_types (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name_en TEXT NOT NULL,
    name_ar TEXT,
    name_fr TEXT,
    duration_minutes INTEGER NOT NULL DEFAULT 30,
    color TEXT DEFAULT '#3B82F6',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create doctors table
CREATE TABLE public.doctors (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    specialization TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create clinic settings table
CREATE TABLE public.clinic_settings (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    multi_doctor_mode BOOLEAN DEFAULT false,
    require_national_id BOOLEAN DEFAULT false,
    notifications_enabled BOOLEAN DEFAULT true,
    working_hours_start TIME DEFAULT '09:00:00',
    working_hours_end TIME DEFAULT '18:00:00',
    working_days INTEGER[] DEFAULT ARRAY[1,2,3,4,5], -- Monday to Friday
    break_start TIME DEFAULT '12:00:00',
    break_end TIME DEFAULT '13:00:00',
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create availability table for blocking time slots
CREATE TABLE public.availability_blocks (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    doctor_id UUID REFERENCES public.doctors(id) ON DELETE CASCADE,
    start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    end_time TIMESTAMP WITH TIME ZONE NOT NULL,
    reason TEXT,
    type TEXT DEFAULT 'blocked', -- 'blocked', 'holiday', 'break'
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Update appointments table to include new fields
ALTER TABLE public.consultations 
ADD COLUMN appointment_type_id UUID REFERENCES public.appointment_types(id),
ADD COLUMN doctor_id UUID REFERENCES public.doctors(id),
ADD COLUMN national_id TEXT,
ADD COLUMN attended BOOLEAN,
ADD COLUMN no_show_count INTEGER DEFAULT 0,
ADD COLUMN is_blocked BOOLEAN DEFAULT false,
ADD COLUMN duration_minutes INTEGER DEFAULT 30,
ADD COLUMN language TEXT DEFAULT 'en';

-- Create patient tracking table for no-shows
CREATE TABLE public.patients (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT NOT NULL UNIQUE,
    email TEXT,
    national_id TEXT,
    no_show_count INTEGER DEFAULT 0,
    is_blocked BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create blog categories table
CREATE TABLE public.blog_categories (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name_en TEXT NOT NULL,
    name_ar TEXT,
    name_fr TEXT,
    slug TEXT NOT NULL UNIQUE,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create blog posts table
CREATE TABLE public.blog_posts (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    title_en TEXT NOT NULL,
    title_ar TEXT,
    title_fr TEXT,
    content_en TEXT NOT NULL,
    content_ar TEXT,
    content_fr TEXT,
    excerpt_en TEXT,
    excerpt_ar TEXT,
    excerpt_fr TEXT,
    slug TEXT NOT NULL UNIQUE,
    category_id UUID REFERENCES public.blog_categories(id),
    status TEXT DEFAULT 'draft', -- 'draft', 'published', 'scheduled'
    scheduled_at TIMESTAMP WITH TIME ZONE,
    published_at TIMESTAMP WITH TIME ZONE,
    featured_image TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.appointment_types ENABLE row level security;
ALTER TABLE public.doctors ENABLE row level security;
ALTER TABLE public.clinic_settings ENABLE row level security;
ALTER TABLE public.availability_blocks ENABLE row level security;
ALTER TABLE public.patients ENABLE row level security;
ALTER TABLE public.blog_categories ENABLE row level security;
ALTER TABLE public.blog_posts ENABLE row level security;

-- Create RLS policies for appointment types
CREATE POLICY "Anyone can view appointment types" ON public.appointment_types FOR SELECT USING (true);
CREATE POLICY "Admins can manage appointment types" ON public.appointment_types FOR ALL USING (true);

-- Create RLS policies for doctors
CREATE POLICY "Anyone can view active doctors" ON public.doctors FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can manage doctors" ON public.doctors FOR ALL USING (true);

-- Create RLS policies for clinic settings
CREATE POLICY "Anyone can view clinic settings" ON public.clinic_settings FOR SELECT USING (true);
CREATE POLICY "Admins can manage clinic settings" ON public.clinic_settings FOR ALL USING (true);

-- Create RLS policies for availability blocks
CREATE POLICY "Anyone can view availability blocks" ON public.availability_blocks FOR SELECT USING (true);
CREATE POLICY "Admins can manage availability blocks" ON public.availability_blocks FOR ALL USING (true);

-- Create RLS policies for patients
CREATE POLICY "Admins can manage patients" ON public.patients FOR ALL USING (true);

-- Create RLS policies for blog categories
CREATE POLICY "Anyone can view active blog categories" ON public.blog_categories FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can manage blog categories" ON public.blog_categories FOR ALL USING (true);

-- Create RLS policies for blog posts
CREATE POLICY "Anyone can view published blog posts" ON public.blog_posts FOR SELECT USING (status = 'published');
CREATE POLICY "Admins can manage blog posts" ON public.blog_posts FOR ALL USING (true);

-- Create triggers for updated_at
CREATE TRIGGER update_appointment_types_updated_at BEFORE UPDATE ON public.appointment_types FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER update_doctors_updated_at BEFORE UPDATE ON public.doctors FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER update_clinic_settings_updated_at BEFORE UPDATE ON public.clinic_settings FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER update_patients_updated_at BEFORE UPDATE ON public.patients FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON public.blog_posts FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Insert default data
INSERT INTO public.appointment_types (name_en, name_ar, name_fr, duration_minutes, color) VALUES
('Consultation', 'استشارة', 'Consultation', 30, '#3B82F6'),
('Cleaning', 'تنظيف', 'Nettoyage', 45, '#10B981'),
('Whitening', 'تبييض', 'Blanchiment', 60, '#F59E0B'),
('Braces Consultation', 'استشارة تقويم', 'Consultation Orthodontie', 45, '#8B5CF6'),
('Follow-up', 'متابعة', 'Suivi', 20, '#6B7280'),
('Emergency', 'طوارئ', 'Urgence', 30, '#EF4444');

INSERT INTO public.clinic_settings (id) VALUES (gen_random_uuid());

INSERT INTO public.blog_categories (name_en, name_ar, name_fr, slug) VALUES
('Dental Tips', 'نصائح الأسنان', 'Conseils Dentaires', 'dental-tips'),
('Clinic News', 'أخبار العيادة', 'Actualités Clinique', 'clinic-news'),
('Health Awareness', 'التوعية الصحية', 'Sensibilisation Santé', 'health-awareness');

-- Insert a default doctor
INSERT INTO public.doctors (name, specialization) VALUES
('Dr. Smith', 'General Dentist');