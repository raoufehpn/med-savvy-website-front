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
    'nav.pricing': 'Pricing',
    'nav.faqs': 'FAQs',
    
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
    
    // Services Section
    'services.title': 'Comprehensive',
    'services.subtitle': 'Medical Services', 
    'services.description': 'From routine check-ups to specialized treatments, we offer a full range of medical services designed to keep you healthy and well.',
    'services.learnMore': 'Learn More',
    'services.schedule': 'Schedule Consultation',
    
    // About Section
    'about.title': 'Your Health is Our',
    'about.subtitle': 'Priority',
    'about.description': 'With over 15 years of experience in modern medicine, I am dedicated to providing exceptional healthcare services that combine advanced medical technology with personalized patient care.',
    'about.viewCredentials': 'View Credentials',
    
    // Contact Section  
    'contact.title': 'Ready to Start Your',
    'contact.subtitle': 'Health Journey?',
    'contact.description': 'Take the first step towards better health. Schedule your consultation today and experience personalized medical care that puts you first.',
    'contact.bookAppointment': 'Book Appointment',
    'contact.callNow': 'Call Now: (555) 123-4567',
    'contact.quickContact': 'Quick Contact',
    'contact.fullName': 'Full Name',
    'contact.emailAddress': 'Email Address', 
    'contact.phoneNumber': 'Phone Number',
    'contact.message': 'Message',
    'contact.placeholder': 'Tell us about your health concerns or questions',
    'contact.sendMessage': 'Send Message',
    'contact.responseTime': "We'll respond within 24 hours to schedule your appointment.",
    'contact.officeHours': 'Office Hours',
    'contact.emergencyCare': 'Emergency Care',
    
    // Pages
    'pages.services.title': 'Our Services',
    'pages.services.subtitle': 'Comprehensive medical care tailored to your needs',
    'pages.about.title': 'About Our Clinic',
    'pages.about.subtitle': 'Excellence in healthcare with a personal touch',
    'pages.pricing.title': 'Transparent Pricing',
    'pages.pricing.subtitle': 'Quality healthcare at affordable rates',
    'pages.faqs.title': 'Frequently Asked Questions',
    'pages.faqs.subtitle': 'Find answers to common questions about our services',
    'pages.contact.title': 'Contact Us',
    'pages.contact.subtitle': 'Get in touch with our healthcare team',
  },
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.about': 'عنا',
    'nav.services': 'الخدمات',
    'nav.blog': 'المدونة',
    'nav.contact': 'اتصل بنا',
    'nav.admin': 'الإدارة',
    'nav.pricing': 'الأسعار',
    'nav.faqs': 'الأسئلة الشائعة',
    
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
    
    // Services Section
    'services.title': 'خدمات',
    'services.subtitle': 'طبية شاملة', 
    'services.description': 'من الفحوصات الروتينية إلى العلاجات المتخصصة، نقدم مجموعة كاملة من الخدمات الطبية المصممة للحفاظ على صحتك.',
    'services.learnMore': 'اعرف المزيد',
    'services.schedule': 'حدد موعد استشارة',
    
    // About Section
    'about.title': 'صحتك هي',
    'about.subtitle': 'أولويتنا',
    'about.description': 'مع أكثر من 15 عامًا من الخبرة في الطب الحديث، أنا ملتزم بتقديم خدمات رعاية صحية استثنائية تجمع بين التكنولوجيا الطبية المتقدمة والرعاية الشخصية للمرضى.',
    'about.viewCredentials': 'عرض الشهادات',
    
    // Contact Section  
    'contact.title': 'هل أنت مستعد لبدء',
    'contact.subtitle': 'رحلتك الصحية؟',
    'contact.description': 'اتخذ الخطوة الأولى نحو صحة أفضل. احجز استشارتك اليوم واختبر الرعاية الطبية الشخصية التي تضعك في المقدمة.',
    'contact.bookAppointment': 'احجز موعد',
    'contact.callNow': 'اتصل الآن: (555) 123-4567',
    'contact.quickContact': 'اتصال سريع',
    'contact.fullName': 'الاسم الكامل',
    'contact.emailAddress': 'عنوان البريد الإلكتروني', 
    'contact.phoneNumber': 'رقم الهاتف',
    'contact.message': 'الرسالة',
    'contact.placeholder': 'أخبرنا عن مشاكلك الصحية أو أسئلتك',
    'contact.sendMessage': 'إرسال الرسالة',
    'contact.responseTime': 'سنرد في غضون 24 ساعة لجدولة موعدك.',
    'contact.officeHours': 'ساعات العمل',
    'contact.emergencyCare': 'الرعاية الطارئة',
    
    // Blog
    'blog.title': 'مدونتنا',
    'blog.readMore': 'اقرأ المزيد',
    'blog.categories': 'الفئات',
    'blog.search': 'البحث في المقالات...',
    'blog.backToBlog': 'العودة للمدونة',
    'blog.allCategories': 'جميع الفئات',
    'blog.noPosts': 'لم يتم العثور على مقالات.',
    'blog.subtitle': 'ابق على اطلاع بأحدث النصائح الصحية وأخبار العيادة',
    'blog.blendShowcase': 'معرض المزج',
    'blog.filterByTag': 'تصفية بواسطة العلامة',
  },
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.about': 'À propos',
    'nav.services': 'Services',
    'nav.blog': 'Blog',
    'nav.contact': 'Contact',
    'nav.admin': 'Admin',
    'nav.pricing': 'Tarifs',
    'nav.faqs': 'FAQ',
    
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
    
    // Services Section
    'services.title': 'Services',
    'services.subtitle': 'Médicaux Complets', 
    'services.description': 'Des consultations de routine aux traitements spécialisés, nous offrons une gamme complète de services médicaux conçus pour vous maintenir en bonne santé.',
    'services.learnMore': 'En Savoir Plus',
    'services.schedule': 'Programmer une Consultation',
    
    // About Section
    'about.title': 'Votre Santé est Notre',
    'about.subtitle': 'Priorité',
    'about.description': 'Avec plus de 15 ans d\'expérience en médecine moderne, je me consacre à fournir des services de soins de santé exceptionnels qui combinent une technologie médicale avancée avec des soins personnalisés aux patients.',
    'about.viewCredentials': 'Voir les Références',
    
    // Contact Section  
    'contact.title': 'Prêt à Commencer Votre',
    'contact.subtitle': 'Parcours de Santé?',
    'contact.description': 'Faites le premier pas vers une meilleure santé. Planifiez votre consultation aujourd\'hui et découvrez des soins médicaux personnalisés qui vous mettent en premier.',
    'contact.bookAppointment': 'Réserver un Rendez-vous',
    'contact.callNow': 'Appelez Maintenant: (555) 123-4567',
    'contact.quickContact': 'Contact Rapide',
    'contact.fullName': 'Nom Complet',
    'contact.emailAddress': 'Adresse E-mail', 
    'contact.phoneNumber': 'Numéro de Téléphone',
    'contact.message': 'Message',
    'contact.placeholder': 'Parlez-nous de vos préoccupations de santé ou questions',
    'contact.sendMessage': 'Envoyer le Message',
    'contact.responseTime': 'Nous répondrons dans les 24 heures pour programmer votre rendez-vous.',
    'contact.officeHours': 'Heures de Bureau',
    'contact.emergencyCare': 'Soins d\'Urgence',
    
    // Blog
    'blog.title': 'Notre Blog',
    'blog.readMore': 'Lire la suite',
    'blog.categories': 'Catégories',
    'blog.search': 'Rechercher des articles...',
    'blog.backToBlog': 'Retour au Blog',
    'blog.allCategories': 'Toutes les catégories',
    'blog.noPosts': 'Aucun article de blog trouvé.',
    'blog.subtitle': 'Restez informé des derniers conseils de santé et actualités de la clinique',
    'blog.blendShowcase': 'Vitrine des Mélanges',
    'blog.filterByTag': 'Filtrer par tag',
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