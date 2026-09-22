import React from 'react';

const AuthLayout = ({ children, variant = 'centered' }) => {
  if (variant === 'split') {
    return (
      <div className="flex min-h-screen bg-bg-primary">
        <div className="hidden lg:flex w-[40%] bg-bg-dark relative overflow-hidden flex-col justify-between p-12 text-white">
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-12">
              <div className="w-12 h-12 rounded-full bg-accent-gold flex items-center justify-center text-white font-bold text-2xl shadow-gold">
                أ
              </div>
              <h1 className="text-3xl font-bold text-white tracking-wide">أفق</h1>
            </div>
            <h2 className="text-3xl font-bold leading-tight mb-4">انطلق في مسيرتك المهنية بثقة</h2>
            <p className="text-text-muted text-lg max-w-md">
              منصة محاكاة بيئة العمل الأولى التي تمنحك خبرة عملية حقيقية تحت إشراف خبراء متخصصين.
            </p>
          </div>
          <div className="relative z-10">
            <div className="bg-bg-dark-2/50 backdrop-blur-sm p-6 rounded-xl border border-border-dark">
              <p className="italic text-sm text-text-muted mb-4">"أفق كانت بوابتي لفهم بيئة العمل الحقيقية قبل التخرج. المهام والملاحظات التي تلقيتها من المشرفين ساعدتني كثيراً."</p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-accent-gold text-white flex items-center justify-center text-xs">س</div>
                <div>
                  <p className="text-sm font-bold">سارة أحمد</p>
                  <p className="text-xs text-text-muted">متدربة سابقة، ترجمة</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col justify-center items-center p-6 sm:p-12">
          <div className="w-full max-w-md animate-[slideUp_0.4s_ease-out]">
            {children}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-bg-primary flex-col justify-center items-center p-6">
      <div className="mb-8 flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-accent-gold flex items-center justify-center text-white font-bold text-2xl shadow-gold">
          أ
        </div>
        <h1 className="text-3xl font-bold text-bg-dark tracking-wide">أفق</h1>
      </div>
      <div className="bg-surface w-full max-w-[420px] rounded-xl shadow-lg border border-border p-8 animate-[slideUp_0.4s_ease-out]">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
