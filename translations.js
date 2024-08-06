export default function getTranslation(key, lang) {
  const translations = {
    yourPhoneNumber: {
      uz: "Telefon raqamingiz",
      ru: "Ваш номер телефона",
      en: "Your phone number"
    },
    enterPhoneNumber: {
      uz: "Telefon raqamini kiriting",
      ru: "Введите номер телефона",
      en: "Enter phone number"
    },
    weWillSendVerificationCode: {
      uz: "Biz tasdiqlash kodini yuboramiz",
      ru: "Мы отправим код подтверждения",
      en: "We will send a verification code"
    },
    byChecking: {
      uz: "Belgilash orqali siz rozisiz",
      ru: "Отмечая, вы соглашаетесь с",
      en: "By checking, you agree to our"
    },
    termsOfUse: {
      uz: "Foydalanish shartlari",
      ru: "Условия использования",
      en: "Terms of Use"
    },
    and: {
      uz: "va",
      ru: "и",
      en: "and"
    },
    privacyPolicy: {
      uz: "Maxfiylik siyosati",
      ru: "Политика конфиденциальности",
      en: "Privacy Policy"
    },
    register: {
      uz: "Ro'yxatdan o'tish",
      ru: "Зарегистрироваться",
      en: "Register"
    },
    alreadyHaveAccount: {
      uz: "Hisobingiz bormi? Kiring",
      ru: "Уже есть аккаунт? Войти",
      en: "Already have an account? Log in"
    },
    selectLanguage: {
      uz: "Tilni tanlang",
      ru: "Выберите язык",
      en: "Select language"
    }
  };
  
  return translations[key]?.[lang] || translations[key]?.['en'] || key;
}