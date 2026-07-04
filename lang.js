var currentLang = 'ar';

var translations = {
  'nav-home': { ar: 'الرئيسية', en: 'Home' },
  'nav-about': { ar: 'من نحن', en: 'About Us' },
  'nav-achievements': { ar: 'الإنجازات', en: 'Achievements' },
  'nav-events': { ar: 'الفعاليات', en: 'Events' },
  'nav-profile': { ar: 'الملف الشخصي', en: 'Profile' },
  'nav-login': { ar: 'تسجيل الدخول', en: 'Login' },
  'nav-logout': { ar: 'تسجيل الخروج', en: 'Logout' },
  'nav-signin-btn': { ar: 'تسجيل / اشتراك', en: 'Sign In/Up' },
  'lang-toggle': { ar: 'English', en: 'العربية' },

  'hero-eyebrow': { ar: 'قلعة الكشافة · قليوبية', en: 'Scout Castle · Qalyubia' },
  'hero-title': { ar: 'مرحباً بكم في مجموعة ناصر الكشفية والإرشادية', en: 'Welcome to Nasser Scouts and Guides Groups' },
  'hero-sub': { ar: 'نبني قادة الغد من خلال المغامرة والعمل الجماعي وخدمة المجتمع.', en: "Building tomorrow's leaders through adventure, teamwork, and service to the community." },
  'hero-join': { ar: 'انضم إلينا', en: 'Join Us' },
  'hero-badge-title': { ar: 'نخدم بفخر', en: 'Proudly serving' },
  'hero-badge-text': { ar: 'المئات من الكشافة في محافظة قليوبية، مصر.', en: 'Hundreds of scouts across Qalyubia Governorate, Egypt.' },

  'about-title': { ar: 'من نحن', en: 'ABOUT US' },
  'about-p1': { ar: 'بدأت مجموعة ناصر الكشفية كمبادرة مجتمعية في وسط قليوبية، بهدف مساعدة الشباب على اكتشاف إمكاناتهم من خلال المغامرات الحقيقية والقيادة المدنية والعمل الجماعي التعاوني. سرعان ما أصبح واضحاً أن مهمتنا يمكن أن تتوسع لتشمل أكثر من مجرد البقاء في الهواء الطلق لتنمية مهارات القيادة الأساسية.', en: 'Nasser Scouts Groups started as a community initiative in downtown Qalyubia, aiming to help youth discover their potential through real-world adventures, civic leadership, and collaborative teamwork.' },
  'about-p2': { ar: 'نقدم حالياً التدريب الكشفي ومشاريع تطوير المجتمع وأطر الاستكشاف في الهواء الطلق بهدف بناء الشخصية والمرونة وروح الخدمة الدائمة. نحن نقدر قوانيننا الكشفية الأساسية قبل كل شيء، مما يعني أننا لا نتوقف أبداً عن توجيه الأفراد لبذل قصارى جهدهم.', en: 'Currently, we offer scout training, community development projects, and outdoor exploration frameworks in order to build character, resilience, and a lasting spirit of service.' },
  'about-img-alt': { ar: 'عن مجموعة ناصر الكشفية', en: 'About Nasser Scouts' },

  'join-title': { ar: 'انضم إلينا', en: 'Join Us' },
  'join-member-label': { ar: 'أنا عضو كشفي', en: "I'm a Scout Member" },
  'join-member-desc': { ar: 'انضم كعضو كشفي واخضغ لمغامرات حقيقية، وابنِ مهارات حياتية، وكن جزءاً من مجتمع يدوم مدى الحياة.', en: 'Join as a scout member and embark on real adventures, build life skills, and become part of a community that lasts a lifetime.' },
  'join-member-btn': { ar: 'تقديم الآن', en: 'Apply Now' },
  'join-leader-label': { ar: 'أنا قائد كشفي', en: "I'm a scout leader" },
  'join-leader-desc': { ar: 'تولى دوراً قيادياً وساعد في تشكيل الجيل القادم من الكشافة من خلال التوجيه والتدريب وخدمة المجتمع.', en: 'Step into a leadership role and help shape the next generation of scouts through mentorship, training, and community service.' },
  'join-leader-btn': { ar: 'تقديم الآن', en: 'Apply Now' },
  'join-parent-label': { ar: 'أنا ولي أمر', en: "I'm a Parent" },
  'join-parent-desc': { ar: 'ادعم نمو طفلك من خلال تسجيله في كشافة ناصر. كن على اطلاع وشاهدهم يزدهرون.', en: "Support your child's growth by enrolling them in Nasser Scouts. Stay involved, stay informed, and watch them thrive." },
  'join-parent-btn': { ar: 'تقديم الآن', en: 'Apply Now' },
  'join-member-img-alt': { ar: 'عضو كشفي', en: 'Member' },
  'join-leader-img-alt': { ar: 'قائد كشفي', en: 'Leader' },
  'join-parent-img-alt': { ar: 'ولي أمر', en: 'Parent' },

  'footer-sitemap': { ar: 'خريطة الموقع', en: 'Site Map' },
  'footer-home': { ar: 'الرئيسية', en: 'Home' },
  'footer-about': { ar: 'من نحن', en: 'About Us' },
  'footer-join': { ar: 'انضم إلينا', en: 'Join Us' },
  'footer-achievements': { ar: 'الإنجازات', en: 'Achievements' },
  'footer-events': { ar: 'الفعاليات', en: 'Events' },
  'footer-contact': { ar: 'اتصل بنا', en: 'Contact Us' },
  'footer-about-title': { ar: 'من نحن', en: 'About Us' },
  'footer-brand-name': { ar: 'مجموعة ناصر الكشفية', en: 'Nasser Scouts Groups' },
  'footer-brand-desc': { ar: 'منظمة كشفية مجتمعية مقرها قليوبية، مصر، مكرسة لبناء قادة الغد من خلال المغامرة والعمل الجماعي والخدمة.', en: 'A community-driven scout organization based in Qalyubia, Egypt, dedicated to building tomorrow leaders through adventure, teamwork, and service.' },
  'footer-location': { ar: 'قلعة الكشافة، محافظة قليوبية، مصر', en: 'Scout Castle, Qalyubia Governorate, Egypt' },
  'footer-copyright': { ar: 'حقوق النشر © 2026 مجموعة ناصر الكشفية. جميع الحقوق محفوظة.', en: 'Copyright © 2026 Nasser Scouts Groups. All Rights Reserved.' },
  'footer-credit': { ar: 'محافظة قليوبية، مصر', en: 'Qalyubia Governorate, Egypt' },
  'footer-tiktok': { ar: 'تيك توك', en: 'TikTok' },
  'footer-instagram': { ar: 'إنستغرام', en: 'Instagram' },
  'footer-facebook': { ar: 'فيسبوك', en: 'Facebook' },

  'signin-title': { ar: 'تسجيل جديد', en: 'Sign In' },
  'signin-fullname-placeholder': { ar: 'الاسم الكامل', en: 'Full Name' },
  'signin-email-placeholder': { ar: 'البريد الإلكتروني', en: 'Email' },
  'signin-password-placeholder': { ar: 'كلمة المرور', en: 'Password' },
  'signin-terms': { ar: 'أوافق على الشروط والأحكام', en: 'I agree to the terms & conditions' },
  'signin-btn': { ar: 'تسجيل', en: 'Register' },
  'signin-login-link': { ar: 'لديك حساب بالفعل؟ ', en: 'Already have an account? ' },
  'signin-login-link-text': { ar: 'تسجيل الدخول', en: 'Login' },
  'signin-title-tag': { ar: 'تسجيل جديد - كشافة ناصر', en: 'Sign In - Nasser Scouts' },

  'login-title': { ar: 'مرحباً بعودتك', en: 'Welcome Back' },
  'login-email-placeholder': { ar: 'البريد الإلكتروني', en: 'Email Address' },
  'login-password-placeholder': { ar: 'كلمة المرور', en: 'Password' },
  'login-remember': { ar: 'تذكرني', en: 'Remember me' },
  'login-btn': { ar: 'تسجيل الدخول', en: 'Login' },
  'login-signup-link': { ar: 'ليس لديك حساب؟ ', en: "Don't have an account? " },
  'login-signup-link-text': { ar: 'إنشاء حساب', en: 'Create Account' },
  'login-title-tag': { ar: 'تسجيل الدخول - كشافة ناصر', en: 'Login - Nasser Scouts' },

  'profile-title-tag': { ar: 'الملف الشخصي - كشافة ناصر', en: 'Profile Dashboard - Nasser Scouts' },
  'profile-label': { ar: 'عضو كشفي', en: 'Scout Member' },
  'profile-name-loading': { ar: 'جارٍ تحميل الاسم...', en: 'Loading name...' },
  'profile-nationalid-label': { ar: 'الرقم القومي:', en: 'National ID:' },
  'profile-phone-label': { ar: 'الهاتف:', en: 'Phone:' },
  'profile-stage-label': { ar: 'المرحلة الكشفية:', en: 'Scouting Stage:' },
  'profile-fines-label': { ar: 'الغرامات المستحقة', en: 'Outstanding Fines' },
  'profile-achievements-label': { ar: 'الإنجازات', en: 'Achievements' },
  'profile-achievements-section-title': { ar: 'الإنجازات', en: 'Achievements' },
  'profile-achievements-section-desc': { ar: 'تتبع الشارات والجوائز والتحديات الكشفية المكتسبة.', en: 'Track earned badges, awards and scout challenges.' },
  'profile-fines-section-title': { ar: 'الغرامات المستحقة', en: 'Outstanding Fines' },
  'profile-fines-section-desc': { ar: 'سجل الغرامات الأخيرة والمبلغ المستحق.', en: 'Recent fine history and amount due.' },
  'profile-avatar-alt': { ar: 'الصورة الشخصية', en: 'Personal Photo' },

  'achi-title-tag': { ar: 'الإنجازات - كشافة ناصر', en: 'Achievements - Nasser Scouts' },
  'achi-page-title': { ar: 'الإنجازات الكشفية', en: 'Scout Achievements' },
  'achi-page-desc': { ar: 'المعالم والتكريمات التي حصل عليها أعضاؤنا الكشافة', en: 'Milestones and recognitions earned by our scout members' },
  'achi-card1-title': { ar: 'شارة الكشافة', en: 'Scout Badge' },
  'achi-card1-desc': { ar: 'تقديراً لإكمال المهارات الأساسية', en: 'Recognition for completing foundational skills' },
  'achi-card2-title': { ar: 'جائزة القيادة', en: 'Leadership Award' },
  'achi-card2-desc': { ar: 'إظهار صفات قيادية استثنائية', en: 'Demonstrated exceptional leadership qualities' },
  'achi-card3-title': { ar: 'خدمة المجتمع', en: 'Community Service' },
  'achi-card3-desc': { ar: 'أكثر من ٥٠ ساعة من العمل التطوعي المجتمعي', en: '50+ hours of community volunteer work' },
  'achi-card4-title': { ar: 'التفوق الأكاديمي', en: 'Academic Excellence' },
  'achi-card4-desc': { ar: 'تحقيق أداء أكاديمي متميز', en: 'Achieved outstanding academic performance' },
  'achi-card5-title': { ar: 'بطل رياضي', en: 'Sports Champion' },
  'achi-card5-desc': { ar: 'المركز الأول في المسابقات الكشفية الإقليمية', en: 'First place in regional scout competitions' },
  'achi-card6-title': { ar: 'عضو مدى الحياة', en: 'Lifetime Member' },
  'achi-card6-desc': { ar: 'أكثر من ٥ سنوات من المشاركة الكشفية المخلصة', en: '5+ years of dedicated scout participation' },

  'event-title-tag': { ar: 'الفعاليات - كشافة ناصر', en: 'Events - Nasser Scouts' },
  'event-page-title': { ar: 'الفعاليات الكشفية', en: 'Scout Events' },
  'event-page-desc': { ar: 'انضم إلينا في أنشطة مثيرة ومشاركة مجتمعية', en: 'Join us for exciting activities and community engagement' },
  'event-upcoming-title': { ar: 'الفعاليات القادمة', en: 'Upcoming Events' },
  'event-card1-title': { ar: 'مغامرة المخيم الصيفي', en: 'Summer Camp Adventure' },
  'event-card1-desc': { ar: 'رحلة تخييم لمدة ثلاثة أيام في الهواء الطلق مع تدريب على مهارات البقاء وأنشطة بناء الفريق.', en: 'Three-day outdoor camping expedition with survival skills training and team-building activities.' },
  'event-card1-date': { ar: '١٥-١٧ يوليو ٢٠٢٦', en: 'July 15-17, 2026' },
  'event-card1-btn': { ar: 'سجل الآن', en: 'Register Now' },
  'event-card2-title': { ar: 'مسابقة الكشافة الإقليمية', en: 'Regional Scout Competition' },
  'event-card2-desc': { ar: 'تنافس في الرماية والتوجيه والتحديات التكتيكية ضد كشافة المناطق المجاورة.', en: 'Compete in archery, orienteering, and tactical challenges against scouts from neighboring regions.' },
  'event-card2-date': { ar: '٥ أغسطس ٢٠٢٦', en: 'August 5, 2026' },
  'event-card2-btn': { ar: 'سجل الآن', en: 'Register Now' },
  'event-card3-title': { ar: 'يوم خدمة المجتمع', en: 'Community Service Day' },
  'event-card3-desc': { ar: 'انضم إلينا في تنظيف المجتمع وبرنامج توجيه الشباب في الأحياء المحلية.', en: 'Join us for a community cleanup and youth mentorship program in local neighborhoods.' },
  'event-card3-date': { ar: '٢٠ أغسطس ٢٠٢٦', en: 'August 20, 2026' },
  'event-card3-btn': { ar: 'سجل الآن', en: 'Register Now' },
  'event-past-title': { ar: 'الأنشطة السابقة', en: 'Past Activities' },
  'event-past1-title': { ar: 'حفل التكريم السنوي', en: 'Annual Gala Ceremony' },
  'event-past1-desc': { ar: 'احتفلنا بإنجازات أعضائنا ورحبنا بالكشافة الجدد في منظمتنا.', en: 'Celebrated our members achievements and welcomed new scouts to our organization.' },
  'event-past1-date': { ar: '١٠ يونيو ٢٠٢٦', en: 'June 10, 2026' },
  'event-past1-btn': { ar: 'فعالية سابقة', en: 'Past Event' },
  'event-past2-title': { ar: 'تنظيف البيئة', en: 'Environmental Cleanup' },
  'event-past2-desc': { ar: 'نظمنا حملة توعية بيئية ناجحة مع جهود ترميم الحدائق المحلية.', en: 'Organized a successful environmental awareness campaign with local park restoration efforts.' },
  'event-past2-date': { ar: '٢٢ مايو ٢٠٢٦', en: 'May 22, 2026' },
  'event-past2-btn': { ar: 'فعالية سابقة', en: 'Past Event' },
  'event-past3-title': { ar: 'ورشة القيادة', en: 'Leadership Workshop' },
  'event-past3-desc': { ar: 'دورة تدريبية مكثفة حول مهارات القيادة واتخاذ القرار للكشافة المتقدمين.', en: 'Intensive training session on leadership skills and decision-making for senior scouts.' },
  'event-past3-date': { ar: '١٨ أبريل ٢٠٢٦', en: 'April 18, 2026' },
  'event-past3-btn': { ar: 'فعالية سابقة', en: 'Past Event' },

  'member-title-tag': { ar: 'تقديم عضو - كشافة ناصر', en: 'Member Application - Nasser Scouts' },
  'member-page-title': { ar: 'تقديم طلب العضوية', en: 'Apply to Join' },
  'member-page-desc': { ar: 'أكمل نموذج تسجيل العضو وأرفق المستندات الداعمة لتقديم طلبك.', en: 'Complete the member registration form and attach your supporting documents to submit your application.' },
  'member-fullname-label': { ar: 'الاسم الكامل', en: 'Full Name' },
  'member-fullname-placeholder': { ar: 'أدخل اسمك الكامل', en: 'Enter your full name' },
  'member-nationalid-label': { ar: 'الرقم القومي', en: 'National ID' },
  'member-nationalid-placeholder': { ar: 'أدخل الرقم القومي', en: 'Enter national ID' },
  'member-phone-label': { ar: 'الهاتف', en: 'Telephone' },
  'member-phone-placeholder': { ar: 'أدخل رقم الهاتف', en: 'Enter phone number' },
  'member-email-label': { ar: 'البريد الإلكتروني', en: 'Email Address' },
  'member-email-placeholder': { ar: 'أدخل البريد الإلكتروني', en: 'Enter email address' },
  'member-birth-year-label': { ar: 'سنة الميلاد', en: 'Birth Year' },
  'member-birth-month-label': { ar: 'شهر الميلاد', en: 'Birth Month' },
  'member-birth-day-label': { ar: 'يوم الميلاد', en: 'Birth Day' },
  'member-stage-label': { ar: 'المرحلة الكشفية المحسوبة', en: 'Calculated Scouting Stage' },
  'member-stage-placeholder': { ar: 'سيتم تقييم المرحلة تلقائياً', en: 'Stage will auto-evaluate' },
  'member-photo-label': { ar: 'الصورة الشخصية', en: 'Personal Photo' },
  'member-photo-prompt': { ar: 'اسحب وأفلت الصورة أو تصفح', en: 'Drag & drop a photo or browse' },
  'member-doc-label': { ar: 'الرقم القومي / المستند', en: 'ID / Document' },
  'member-doc-prompt': { ar: 'حمّل صورة البطاقة أو الشهادة', en: 'Upload ID card or certificate' },
  'member-terms': { ar: 'أوافق على أنني قرأت سياسات الأمان واللوائح الداخلية للمجموعة.', en: 'I agree that I have read the Safe from Harm policies and group bylaws.' },
  'member-submit': { ar: 'تقديم الطلب', en: 'Submit Application' },
  'member-back': { ar: '→ رجوع', en: '← Back' },

  'leader-title-tag': { ar: 'تقديم قائد - كشافة ناصر', en: 'Leader Application - Nasser Scouts' },
  'leader-page-title': { ar: 'تسجيل القادة', en: 'Leader Registration' },
  'leader-page-desc': { ar: 'تقدم لخدمة كقائد كشفي. أرسل بياناتك وملفات التحقق أدناه.', en: 'Apply to serve as a Scout Leader. Submit your details and verification files below.' },
  'leader-fullname-label': { ar: 'الاسم الكامل', en: 'Full Name' },
  'leader-fullname-placeholder': { ar: 'أدخل اسمك الكامل', en: 'Enter your full name' },
  'leader-nationalid-label': { ar: 'الرقم القومي', en: 'National ID' },
  'leader-nationalid-placeholder': { ar: 'أدخل الرقم القومي', en: 'Enter National ID' },
  'leader-phone-label': { ar: 'رقم الهاتف', en: 'Telephone Number' },
  'leader-phone-placeholder': { ar: 'أدخل رقم الهاتف', en: 'Enter telephone number' },
  'leader-email-label': { ar: 'البريد الإلكتروني', en: 'Email Address' },
  'leader-email-placeholder': { ar: 'أدخل البريد الإلكتروني', en: 'Enter email address' },
  'leader-dob-label': { ar: 'تاريخ الميلاد', en: 'Date of Birth' },
  'leader-photo-prompt': { ar: '📷 اسحب وأفلت الصورة أو تصفح', en: '📷 Drag & drop a photo or browse' },
  'leader-doc-prompt': { ar: '📄 اسحب وأفلت صورة البطاقة أو تصفح', en: '📄 Drag & drop an ID card copy or browse' },
  'leader-submit': { ar: 'تقديم الطلب', en: 'Submit Application' },
  'leader-back': { ar: '→ رجوع', en: '← Back' },

  'parent-title-tag': { ar: 'تقديم ولي أمر - كشافة ناصر', en: 'Parent Application - Nasser Scouts' },
  'parent-page-title': { ar: 'تسجيل أولياء الأمور', en: 'Parent Registration' },
  'parent-page-desc': { ar: 'أخبرنا عن عائلتك وكم عدد الأطفال المنضمين إلى كشافة ناصر.', en: 'Tell us about your family and how many children are joining Nasser Scouts.' },
  'parent-name-label': { ar: 'اسم ولي الأمر الكامل', en: 'Parent Full Name' },
  'parent-name-placeholder': { ar: 'أدخل اسم ولي الأمر الكامل', en: 'Enter parent full name' },
  'parent-id-label': { ar: 'الرقم القومي', en: 'National ID' },
  'parent-id-placeholder': { ar: 'أدخل الرقم القومي', en: 'Enter national ID' },
  'parent-phone-label': { ar: 'رقم الهاتف', en: 'Telephone Number' },
  'parent-phone-placeholder': { ar: 'أدخل رقم الهاتف', en: 'Enter telephone number' },
  'parent-email-label': { ar: 'البريد الإلكتروني', en: 'Email Address' },
  'parent-email-placeholder': { ar: 'أدخل البريد الإلكتروني', en: 'Enter email address' },
  'parent-children-label': { ar: 'عدد الأطفال', en: 'How Many Children' },
  'parent-children-placeholder': { ar: 'كم عدد الأطفال الراغبين في الانضمام؟', en: 'How many children want to join?' },
  'parent-terms': { ar: 'أوافق على أنني قرأت سياسات الأمان واللوائح الداخلية للمجموعة.', en: 'I agree that I have read the Safe from Harm policies and group bylaws.' },
  'parent-submit': { ar: 'تقديم الطلب', en: 'Submit Application' },
  'parent-back': { ar: '→ رجوع', en: '← Back' }
};

function applyLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('nscout_lang', lang);

  // Update html tag direction
  var html = document.documentElement;
  html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
  html.setAttribute('lang', lang);

  // Toggle lang button text
  var langBtn = document.getElementById('lang-toggle');
  if (langBtn) {
    langBtn.textContent = translations['lang-toggle'][lang];
  }

  // Update all data-i18n elements
  var elements = document.querySelectorAll('[data-i18n]');
  for (var i = 0; i < elements.length; i++) {
    var el = elements[i];
    var key = el.getAttribute('data-i18n');
    var attr = el.getAttribute('data-i18n-attr');
    if (translations[key]) {
      if (attr) {
        el.setAttribute(attr, translations[key][lang]);
      } else {
        el.textContent = translations[key][lang];
      }
    }
  }

  // Update placeholders for inputs
  var inputs = document.querySelectorAll('[data-i18n-placeholder]');
  for (var j = 0; j < inputs.length; j++) {
    var inp = inputs[j];
    var pkey = inp.getAttribute('data-i18n-placeholder');
    if (translations[pkey]) {
      inp.placeholder = translations[pkey][lang];
    }
  }

  // Update document title
  var titleEl = document.querySelector('title');
  if (titleEl) {
    var tkey = titleEl.getAttribute('data-i18n');
    if (tkey && translations[tkey]) {
      titleEl.textContent = translations[tkey][lang];
    }
  }
}

function switchLanguage() {
  var newLang = currentLang === 'ar' ? 'en' : 'ar';
  applyLanguage(newLang);
}

// Auto-initialize language on page load
(function() {
  var saved = localStorage.getItem('nscout_lang');
  var lang = saved || 'ar';
  // Wait for DOM ready then apply
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() { applyLanguage(lang); });
  } else {
    applyLanguage(lang);
  }
})();

// Wire up lang-toggle button clicks
document.addEventListener('click', function(e) {
  if (e.target.id === 'lang-toggle') {
    switchLanguage();
  }
});
