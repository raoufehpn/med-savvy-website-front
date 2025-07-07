import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ar' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.services': 'Services',
    'nav.blog': 'Blog',
    'nav.contact': 'Contact',
    'nav.admin': 'Admin',
    
    // Hero Section
    'hero.badge': 'Trusted Healthcare Provider',
    'hero.title': 'Excellence in Medical Care',
    'hero.description': 'Providing comprehensive healthcare solutions with cutting-edge technology and compassionate care for over 15 years.',
    'hero.book': 'Book Appointment',
    'hero.learn': 'Learn More',
    'hero.years': 'Years Experience',
    'hero.patients': 'Patients Treated',
    'hero.emergency': 'Emergency Care',
    
    // Appointment Booking
    'booking.title': 'Book Your Appointment',
    'booking.name': 'Full Name',
    'booking.phone': 'Phone Number',
    'booking.email': 'Email (Optional)',
    'booking.nationalId': 'National ID',
    'booking.appointmentType': 'Appointment Type',
    'booking.doctor': 'Select Doctor',
    'booking.date': 'Preferred Date',
    'booking.time': 'Preferred Time',
    'booking.message': 'Additional Message',
    'booking.submit': 'Book Appointment',
    'booking.success': 'Appointment booked successfully!',
    'booking.error': 'Failed to book appointment. Please try again.',
    
    // Admin Dashboard
    'admin.dashboard': 'Admin Dashboard',
    'admin.appointments': 'Appointments',
    'admin.doctors': 'Doctors',
    'admin.settings': 'Settings',
    'admin.blog': 'Blog Management',
    'admin.patients': 'Patients',
    
    // Admin Authentication
    'admin.login.title': 'Admin Login',
    'admin.login.subtitle': 'Access your clinic dashboard',
    'admin.login.email': 'Email Address',
    'admin.login.password': 'Password',
    'admin.login.sign_in': 'Sign In',
    'admin.login.signing_in': 'Signing in...',
    'admin.logout': 'Logout',
    
    // Blog
    'blog.title': 'Our Blog',
    'blog.readMore': 'Read More',
    'blog.categories': 'Categories',
    'blog.search': 'Search articles...',
    'blog.backToBlog': 'Back to Blog',
    'blog.allCategories': 'All Categories',
    'blog.noPosts': 'No blog posts found.',
    'blog.subtitle': 'Stay updated with the latest health tips and clinic news',
  },
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.about': 'عنا',
    'nav.services': 'الخدمات',
    'nav.blog': 'المدونة',
    'nav.contact': 'اتصل بنا',
    'nav.admin': 'الإدارة',
    
    // Hero Section
    'hero.badge': 'مقدم رعاية صحية موثوق',
    'hero.title': 'التميز في الرعاية الطبية',
    'hero.description': 'نقدم حلول رعاية صحية شاملة بأحدث التقنيات والرعاية الرحيمة لأكثر من 15 عامًا.',
    'hero.book': 'احجز موعد',
    'hero.learn': 'اعرف المزيد',
    'hero.years': 'سنوات خبرة',
    'hero.patients': 'مريض معالج',
    'hero.emergency': 'رعاية طوارئ',
    
    // Appointment Booking
    'booking.title': 'احجز موعدك',
    'booking.name': 'الاسم الكامل',
    'booking.phone': 'رقم الهاتف',
    'booking.email': 'البريد الإلكتروني (اختياري)',
    'booking.nationalId': 'رقم الهوية',
    'booking.appointmentType': 'نوع الموعد',
    'booking.doctor': 'اختر الطبيب',
    'booking.date': 'التاريخ المفضل',
    'booking.time': 'الوقت المفضل',
    'booking.message': 'رسالة إضافية',
    'booking.submit': 'احجز الموعد',
    'booking.success': 'تم حجز الموعد بنجاح!',
    'booking.error': 'فشل في حجز الموعد. يرجى المحاولة مرة أخرى.',
    
    // Admin Dashboard
    'admin.dashboard': 'لوحة الإدارة',
    'admin.appointments': 'المواعيد',
    'admin.doctors': 'الأطباء',
    'admin.settings': 'الإعدادات',
    'admin.blog': 'إدارة المدونة',
    'admin.patients': 'المرضى',
    
    // Admin Authentication
    'admin.login.title': 'تسجيل دخول الإدارة',
    'admin.login.subtitle': 'ادخل إلى لوحة تحكم العيادة',
    'admin.login.email': 'عنوان البريد الإلكتروني',
    'admin.login.password': 'كلمة المرور',
    'admin.login.sign_in': 'تسجيل الدخول',
    'admin.login.signing_in': 'جاري تسجيل الدخول...',
    'admin.logout': 'تسجيل الخروج',
    
    // Blog
    'blog.title': 'مدونتنا',
    'blog.readMore': 'اقرأ المزيد',
    'blog.categories': 'الفئات',
    'blog.search': 'البحث في المقالات...',
    'blog.backToBlog': 'العودة للمدونة',
    'blog.allCategories': 'جميع الفئات',
    'blog.noPosts': 'لم يتم العثور على مقالات.',
    'blog.subtitle': 'ابق على اطلاع بأحدث النصائح الصحية وأخبار العيادة',
  },
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.about': 'À propos',
    'nav.services': 'Services',
    'nav.blog': 'Blog',
    'nav.contact': 'Contact',
    'nav.admin': 'Admin',
    
    // Hero Section
    'hero.badge': 'Fournisseur de soins de santé de confiance',
    'hero.title': 'Excellence en soins médicaux',
    'hero.description': 'Fournir des solutions de soins de santé complètes avec une technologie de pointe et des soins compatissants depuis plus de 15 ans.',
    'hero.book': 'Réserver un rendez-vous',
    'hero.learn': 'En savoir plus',
    'hero.years': 'Années d\'expérience',
    'hero.patients': 'Patients traités',
    'hero.emergency': 'Soins d\'urgence',
    
    // Appointment Booking
    'booking.title': 'Réservez votre rendez-vous',
    'booking.name': 'Nom complet',
    'booking.phone': 'Numéro de téléphone',
    'booking.email': 'Email (Optionnel)',
    'booking.nationalId': 'Carte d\'identité nationale',
    'booking.appointmentType': 'Type de rendez-vous',
    'booking.doctor': 'Sélectionner un médecin',
    'booking.date': 'Date préférée',
    'booking.time': 'Heure préférée',
    'booking.message': 'Message supplémentaire',
    'booking.submit': 'Réserver le rendez-vous',
    'booking.success': 'Rendez-vous réservé avec succès !',
    'booking.error': 'Échec de la réservation du rendez-vous. Veuillez réessayer.',
    
    // Admin Dashboard
    'admin.dashboard': 'Tableau de bord Admin',
    'admin.appointments': 'Rendez-vous',
    'admin.doctors': 'Médecins',
    'admin.settings': 'Paramètres',
    'admin.blog': 'Gestion du blog',
    'admin.patients': 'Patients',
    
    // Admin Authentication
    'admin.login.title': 'Connexion Admin',
    'admin.login.subtitle': 'Accédez à votre tableau de bord clinique',
    'admin.login.email': 'Adresse e-mail',
    'admin.login.password': 'Mot de passe',
    'admin.login.sign_in': 'Se connecter',
    'admin.login.signing_in': 'Connexion en cours...',
    'admin.logout': 'Déconnexion',
    
    // Blog
    'blog.title': 'Notre Blog',
    'blog.readMore': 'Lire la suite',
    'blog.categories': 'Catégories',
    'blog.search': 'Rechercher des articles...',
    'blog.backToBlog': 'Retour au Blog',
    'blog.allCategories': 'Toutes les catégories',
    'blog.noPosts': 'Aucun article de blog trouvé.',
    'blog.subtitle': 'Restez informé des derniers conseils de santé et actualités de la clinique',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    // Auto-detect language based on browser settings on first load
    const storedLang = localStorage.getItem('preferred-language');
    if (storedLang && ['en', 'ar', 'fr'].includes(storedLang)) {
      setLanguage(storedLang as Language);
    } else {
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.startsWith('ar')) {
        setLanguage('ar');
      } else if (browserLang.startsWith('fr')) {
        setLanguage('fr');
      } else {
        setLanguage('en');
      }
    }
  }, []);

  useEffect(() => {
    // Apply RTL for Arabic and store preference
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    localStorage.setItem('preferred-language', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};