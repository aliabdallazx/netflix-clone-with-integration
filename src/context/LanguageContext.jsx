import { createContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

const translations = {
  en: {
    // Navigation
    home: 'Home',
    tvShows: 'TV Shows',
    movies: 'Movies',
    newPopular: 'New & Popular',
    myList: 'My List',
    browseGenre: 'Browse by Genre',
    signIn: 'Sign In',
    signUp: 'Sign Up',
    signOut: 'Sign Out',
    settings: 'Settings',
    profile: 'Profile',
    account: 'Account',
    helpCenter: 'Help Center',
    notifications: 'Notifications',
    language: 'Language',

    // Search
    searchPlaceholder: 'Search movies, shows...',
    search: 'Search',
    searchResults: 'Search Results',
    noResults: 'No results found',

    // Auth Pages
    login: 'Sign In',
    signup: 'Sign Up',
    or: 'or',
    email: 'Email',
    username: 'Username',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    firstName: 'First Name',
    lastName: 'Last Name',
    createAccount: 'Create Account',
    alreadyHaveAccount: 'Already have an account?',
    dontHaveAccount: "Don't have an account?",
    demoAccount: 'Try Demo Account',
    uploadPhoto: 'Upload Photo',
    choosePhoto: 'Choose Photo',
    photoSelected: 'Photo selected',
    changePhoto: 'Change Photo',

    // Validation
    emailRequired: 'Email is required',
    emailInvalid: 'Please enter a valid email',
    usernameRequired: 'Username is required',
    usernameTooShort: 'Username must be at least 3 characters',
    passwordRequired: 'Password is required',
    passwordTooShort: 'Password must be at least 6 characters',
    passwordMismatch: 'Passwords do not match',
    firstNameRequired: 'First name is required',
    lastNameRequired: 'Last name is required',
    accountCreated: 'Account created successfully!',
    loginSuccess: 'Login successful!',
    loginFailed: 'Invalid email/username or password',
    error: 'Error',

    // Profile
    profileSettings: 'Profile Settings',
    editProfile: 'Edit Profile',
    changePassword: 'Change Password',
    notificationPreferences: 'Notification Preferences',
    currentPassword: 'Current Password',
    newPassword: 'New Password',
    saveChanges: 'Save Changes',
    updateSuccess: 'Profile updated successfully!',
    passwordChangeSuccess: 'Password changed successfully!',
    emailNotifications: 'Email Notifications',
    newArrivals: 'New Arrivals',
    recommendations: 'Recommendations',
    enabled: 'Enabled',
    disabled: 'Disabled',

    // Movie Cards
    play: 'Play',
    addToList: 'Add to List',
    like: 'Like',
    moreInfo: 'More Info',
    addedToList: 'Added to favorites',
    removedFromList: 'Removed from favorites',
    rating: 'Rating',
    year: 'Year',

    // MyList
    myFavorites: 'My Favorites',
    emptyList: 'No favorites yet',
    removeFromList: 'Remove from Favorites',

    // Browse
    allGenres: 'All Genres',
    action: 'Action',
    comedy: 'Comedy',
    horror: 'Horror',
    romance: 'Romance',
    documentary: 'Documentary',
    drama: 'Drama',
    scifi: 'Sci-Fi',
    adventure: 'Adventure',

    // Footer
    product: 'Product',
    company: 'Company',
    support: 'Support',
    legal: 'Legal',
    aboutUs: 'About Us',
    careers: 'Careers',
    faq: 'FAQ',
    privacyPolicy: 'Privacy Policy',
    designedBy: 'Designed & Developed by',

    // Messages
    loading: 'Loading...',
    noImage: 'No Image',
    watchNow: 'Watch Now',
    viewMore: 'View More',
    seeAll: 'See All',
  },
  ar: {
    // Navigation
    home: 'الصفحة الرئيسية',
    tvShows: 'برامج تلفزيونية',
    movies: 'أفلام',
    newPopular: 'جديد وشهير',
    myList: 'قائمتي',
    browseGenre: 'تصفح حسب النوع',
    signIn: 'تسجيل الدخول',
    signUp: 'إنشاء حساب',
    signOut: 'تسجيل الخروج',
    settings: 'الإعدادات',
    profile: 'الملف الشخصي',
    account: 'الحساب',
    helpCenter: 'مركز المساعدة',
    notifications: 'إشعارات',
    language: 'اللغة',

    // Search
    searchPlaceholder: 'ابحث عن أفلام وبرامج...',
    search: 'بحث',
    searchResults: 'نتائج البحث',
    noResults: 'لم يتم العثور على نتائج',

    // Auth Pages
    login: 'تسجيل الدخول',
    signup: 'إنشاء حساب',
    or: 'أو',
    email: 'البريد الإلكتروني',
    username: 'اسم المستخدم',
    password: 'كلمة المرور',
    confirmPassword: 'تأكيد كلمة المرور',
    firstName: 'الاسم الأول',
    lastName: 'الاسم الأخير',
    createAccount: 'إنشاء حساب',
    alreadyHaveAccount: 'هل لديك حساب بالفعل؟',
    dontHaveAccount: 'ليس لديك حساب؟',
    demoAccount: 'جرب حساب توضيحي',
    uploadPhoto: 'رفع صورة',
    choosePhoto: 'اختر صورة',
    photoSelected: 'تم اختيار الصورة',
    changePhoto: 'تغيير الصورة',

    // Validation
    emailRequired: 'البريد الإلكتروني مطلوب',
    emailInvalid: 'يرجى إدخال بريد إلكتروني صحيح',
    usernameRequired: 'اسم المستخدم مطلوب',
    usernameTooShort: 'يجب أن يكون اسم المستخدم 3 أحرف على الأقل',
    passwordRequired: 'كلمة المرور مطلوبة',
    passwordTooShort: 'يجب أن تكون كلمة المرور 6 أحرف على الأقل',
    passwordMismatch: 'كلمات المرور غير متطابقة',
    firstNameRequired: 'الاسم الأول مطلوب',
    lastNameRequired: 'الاسم الأخير مطلوب',
    accountCreated: 'تم إنشاء الحساب بنجاح!',
    loginSuccess: 'تم تسجيل الدخول بنجاح!',
    loginFailed: 'بريد إلكتروني / اسم مستخدم أو كلمة مرور غير صحيحة',
    error: 'خطأ',

    // Profile
    profileSettings: 'إعدادات الملف الشخصي',
    editProfile: 'تعديل الملف الشخصي',
    changePassword: 'تغيير كلمة المرور',
    notificationPreferences: 'تفضيلات الإشعارات',
    currentPassword: 'كلمة المرور الحالية',
    newPassword: 'كلمة المرور الجديدة',
    saveChanges: 'حفظ التغييرات',
    updateSuccess: 'تم تحديث الملف الشخصي بنجاح!',
    passwordChangeSuccess: 'تم تغيير كلمة المرور بنجاح!',
    emailNotifications: 'إشعارات البريد الإلكتروني',
    newArrivals: 'الوصول الجديد',
    recommendations: 'التوصيات',
    enabled: 'مفعل',
    disabled: 'معطل',

    // Movie Cards
    play: 'تشغيل',
    addToList: 'أضف إلى القائمة',
    like: 'أعجبني',
    moreInfo: 'مزيد من المعلومات',
    addedToList: 'تم الإضافة إلى المفضلة',
    removedFromList: 'تم الحذف من المفضلة',
    rating: 'التقييم',
    year: 'السنة',

    // MyList
    myFavorites: 'مفضلاتي',
    emptyList: 'لا توجد مفضلات حتى الآن',
    removeFromList: 'إزالة من المفضلة',

    // Browse
    allGenres: 'جميع الأنواع',
    action: 'حركة',
    comedy: 'كوميديا',
    horror: 'رعب',
    romance: 'رومانسية',
    documentary: 'وثائقي',
    drama: 'دراما',
    scifi: 'خيال علمي',
    adventure: 'مغامرة',

    // Footer
    product: 'المنتج',
    company: 'الشركة',
    support: 'الدعم',
    legal: 'القانوني',
    aboutUs: 'من نحن',
    careers: 'الوظائف',
    faq: 'الأسئلة الشائعة',
    privacyPolicy: 'سياسة الخصوصية',
    designedBy: 'صمم وطور بواسطة',

    // Messages
    loading: 'جاري التحميل...',
    noImage: 'لا توجد صورة',
    watchNow: 'شاهد الآن',
    viewMore: 'عرض المزيد',
    seeAll: 'عرض الكل',
  },
  fr: {
    // Navigation
    home: 'Accueil',
    tvShows: 'Séries',
    movies: 'Films',
    newPopular: 'Nouveautés & Tendances',
    myList: 'Ma liste',
    browseGenre: 'Parcourir par genre',
    signIn: 'Se connecter',
    signUp: "S'inscrire",
    signOut: 'Se déconnecter',
    settings: 'Paramètres',
    profile: 'Profil',
    account: 'Compte',
    helpCenter: 'Centre d\'aide',
    notifications: 'Notifications',
    language: 'Langue',

    // Search
    searchPlaceholder: 'Rechercher des films, des séries...',
    search: 'Recherche',
    searchResults: 'Résultats de recherche',
    noResults: 'Aucun résultat trouvé',

    // Auth Pages
    login: 'Se connecter',
    signup: "S'inscrire",
    or: 'ou',
    email: 'E-mail',
    username: 'Nom d\'utilisateur',
    password: 'Mot de passe',
    confirmPassword: 'Confirmer le mot de passe',
    firstName: 'Prénom',
    lastName: 'Nom de famille',
    createAccount: 'Créer un compte',
    alreadyHaveAccount: 'Vous avez déjà un compte?',
    dontHaveAccount: "Vous n'avez pas de compte?",
    demoAccount: 'Essayer un compte de démonstration',
    uploadPhoto: 'Télécharger une photo',
    choosePhoto: 'Choisir une photo',
    photoSelected: 'Photo sélectionnée',
    changePhoto: 'Changer la photo',

    // Validation
    emailRequired: 'L\'e-mail est requis',
    emailInvalid: 'Veuillez entrer une adresse e-mail valide',
    usernameRequired: 'Le nom d\'utilisateur est requis',
    usernameTooShort: 'Le nom d\'utilisateur doit contenir au moins 3 caractères',
    passwordRequired: 'Le mot de passe est requis',
    passwordTooShort: 'Le mot de passe doit contenir au moins 6 caractères',
    passwordMismatch: 'Les mots de passe ne correspondent pas',
    firstNameRequired: 'Le prénom est requis',
    lastNameRequired: 'Le nom de famille est requis',
    accountCreated: 'Compte créé avec succès!',
    loginSuccess: 'Connexion réussie!',
    loginFailed: 'E-mail / nom d\'utilisateur ou mot de passe invalide',
    error: 'Erreur',

    // Profile
    profileSettings: 'Paramètres de profil',
    editProfile: 'Modifier le profil',
    changePassword: 'Changer le mot de passe',
    notificationPreferences: 'Préférences de notification',
    currentPassword: 'Mot de passe actuel',
    newPassword: 'Nouveau mot de passe',
    saveChanges: 'Enregistrer les modifications',
    updateSuccess: 'Profil mis à jour avec succès!',
    passwordChangeSuccess: 'Mot de passe modifié avec succès!',
    emailNotifications: 'Notifications par e-mail',
    newArrivals: 'Nouvelles arrivées',
    recommendations: 'Recommandations',
    enabled: 'Activé',
    disabled: 'Désactivé',

    // Movie Cards
    play: 'Lire',
    addToList: 'Ajouter à la liste',
    like: 'J\'aime',
    moreInfo: 'Plus d\'infos',
    addedToList: 'Ajouté aux favoris',
    removedFromList: 'Supprimé des favoris',
    rating: 'Note',
    year: 'Année',

    // MyList
    myFavorites: 'Mes favoris',
    emptyList: 'Aucun favori pour le moment',
    removeFromList: 'Supprimer des favoris',

    // Browse
    allGenres: 'Tous les genres',
    action: 'Action',
    comedy: 'Comédie',
    horror: 'Horreur',
    romance: 'Romance',
    documentary: 'Documentaire',
    drama: 'Drame',
    scifi: 'Science-fiction',
    adventure: 'Aventure',

    // Footer
    product: 'Produit',
    company: 'Entreprise',
    support: 'Support',
    legal: 'Légal',
    aboutUs: 'À propos de nous',
    careers: 'Carrières',
    faq: 'FAQ',
    privacyPolicy: 'Politique de confidentialité',
    designedBy: 'Conçu et développé par',

    // Messages
    loading: 'Chargement...',
    noImage: 'Pas d\'image',
    watchNow: 'Regarder maintenant',
    viewMore: 'Voir plus',
    seeAll: 'Voir tout',
  },
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('netflix-language');
    return saved || 'en';
  });

  useEffect(() => {
    localStorage.setItem('netflix-language', language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const t = (key) => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  const changeLanguage = (lang) => {
    if (translations[lang]) {
      setLanguage(lang);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, direction: language === 'ar' ? 'rtl' : 'ltr', t, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext;
