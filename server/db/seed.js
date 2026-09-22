const bcrypt = require('bcryptjs');

function seedData(db) {
  const userCount = db.prepare('SELECT COUNT(*) as count FROM users').get().count;
  
  if (userCount === 0) {
    const insertUser = db.prepare(`
      INSERT INTO users (name, email, password_hash, role, university, major, study_year)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    const adminHash = bcrypt.hashSync('Admin@Afuq2024', 10);
    insertUser.run('مدير النظام', 'admin@afuq-platform.com', adminHash, 'admin', null, null, null);

    const supervisorHash = bcrypt.hashSync('Doctor@Afuq2024', 10);
    insertUser.run('د. أحمد الخالدي', 'dr.ahmad@afuq-platform.com', supervisorHash, 'supervisor', 'الجامعة الهاشمية', null, null);

    const studentHash = bcrypt.hashSync('Student@2024', 10);
    insertUser.run('سارة المحمود', 'student@afuq-platform.com', studentHash, 'student', 'الجامعة الهاشمية', 'اللغة الإنجليزية وآدابها', 'الثالث');
  }

  const positionCount = db.prepare('SELECT COUNT(*) as count FROM positions').get().count;
  if (positionCount === 0) {
    const positions = [
      {
        title_ar: 'مترجم محتوى رقمي', title_en: 'Digital Content Translator',
        department_ar: 'قسم الترجمة الرقمية',
        description_ar: 'ترجمة محتوى الويب والتطبيقات مع مراعاة ثقافة الجمهور المستهدف.',
        requirements_ar: 'إجادة اللغتين العربية والإنجليزية، مهارات بحث ممتازة.',
        language_required: 'english', is_available: 1, available_for_languages: JSON.stringify(['english'])
      },
      {
        title_ar: 'مدقق لغوي', title_en: 'Language Proofreader',
        department_ar: 'قسم ضمان الجودة',
        description_ar: 'مراجعة وتدقيق النصوص المترجمة لغوياً وإملائياً.',
        requirements_ar: 'إلمام تام بقواعد اللغة العربية، دقة وقوة ملاحظة.',
        language_required: 'english', is_available: 1, available_for_languages: JSON.stringify(['english'])
      },
      {
        title_ar: 'مترجم قانوني', title_en: 'Legal Translator',
        department_ar: 'قسم الترجمة القانونية',
        description_ar: 'ترجمة العقود والوثائق القانونية بدقة عالية.',
        requirements_ar: 'معرفة بالمصطلحات القانونية باللغتين.',
        language_required: 'english', is_available: 1, available_for_languages: JSON.stringify(['english'])
      },
      {
        title_ar: 'مترجم تقني', title_en: 'Technical Translator',
        department_ar: 'قسم الترجمة التقنية',
        description_ar: 'ترجمة أدلة المستخدم والمستندات التقنية.',
        requirements_ar: 'فهم جيد للمصطلحات التقنية والتكنولوجية.',
        language_required: 'english', is_available: 0, available_for_languages: JSON.stringify(['english'])
      },
      {
        title_ar: 'متخصص تعريب', title_en: 'Localization Specialist',
        department_ar: 'قسم التعريب',
        description_ar: 'تعريب البرمجيات والألعاب بما يتناسب مع السوق العربي.',
        requirements_ar: 'شغف بالتكنولوجيا وفهم عميق للثقافة المحلية.',
        language_required: 'english', is_available: 0, available_for_languages: JSON.stringify(['english'])
      },
      {
        title_ar: 'مترجم فوري', title_en: 'Interpreter',
        department_ar: 'قسم الترجمة الفورية',
        description_ar: 'ترجمة فورية للاجتماعات والمؤتمرات.',
        requirements_ar: 'سرعة بديهة، طلاقة لغوية، قدرة على تحمل الضغط.',
        language_required: 'english', is_available: 0, available_for_languages: JSON.stringify(['english'])
      },
      {
        title_ar: 'ترجمة اللغة الفرنسية', title_en: 'French Language Track',
        department_ar: 'متعدد الأقسام',
        description_ar: 'مسار مخصص لطلبة قسم اللغة الفرنسية لتطوير مهارات الترجمة.',
        requirements_ar: 'إجادة اللغة الفرنسية.',
        language_required: 'french', is_available: 0, available_for_languages: JSON.stringify(['french'])
      },
      {
        title_ar: 'ترجمة اللغة الألمانية', title_en: 'German Language Track',
        department_ar: 'متعدد الأقسام',
        description_ar: 'مسار مخصص لطلبة قسم اللغة الألمانية لتطوير مهارات الترجمة.',
        requirements_ar: 'إجادة اللغة الألمانية.',
        language_required: 'german', is_available: 0, available_for_languages: JSON.stringify(['german'])
      },
      {
        title_ar: 'ترجمة اللغة الإسبانية', title_en: 'Spanish Language Track',
        department_ar: 'متعدد الأقسام',
        description_ar: 'مسار مخصص لطلبة قسم اللغة الإسبانية لتطوير مهارات الترجمة.',
        requirements_ar: 'إجادة اللغة الإسبانية.',
        language_required: 'spanish', is_available: 0, available_for_languages: JSON.stringify(['spanish'])
      },
      {
        title_ar: 'ترجمة اللغة الصينية', title_en: 'Chinese Language Track',
        department_ar: 'متعدد الأقسام',
        description_ar: 'مسار مخصص لطلبة قسم اللغة الصينية لتطوير مهارات الترجمة.',
        requirements_ar: 'إجادة اللغة الصينية.',
        language_required: 'chinese', is_available: 0, available_for_languages: JSON.stringify(['chinese'])
      }
    ];

    const insertPosition = db.prepare(`
      INSERT INTO positions (title_ar, title_en, department_ar, description_ar, requirements_ar, language_required, is_available, available_for_languages, order_index)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    positions.forEach((pos, index) => {
      insertPosition.run(
        pos.title_ar, pos.title_en, pos.department_ar, pos.description_ar, pos.requirements_ar,
        pos.language_required, pos.is_available, pos.available_for_languages, index
      );
    });
  }
}

module.exports = { seedData };
