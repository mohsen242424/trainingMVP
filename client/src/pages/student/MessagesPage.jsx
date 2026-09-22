import React from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import EmptyState from '../../components/ui/EmptyState';

export default function MessagesPage() {
  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-120px)] bg-white rounded-xl shadow-sm border border-border flex overflow-hidden">
        
        {/* Left Sidebar */}
        <div className="w-[30%] border-l border-border flex flex-col bg-primary">
          <div className="p-4 border-b border-border bg-white">
            <h2 className="font-bold text-dark text-lg">الرسائل</h2>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {/* Active Conversation */}
            <div className="p-4 bg-accent-gold-light/20 border-b border-border flex gap-3 cursor-pointer hover:bg-accent-gold-light/40 transition-colors">
              <div className="w-12 h-12 rounded-full bg-dark text-white flex items-center justify-center font-bold relative">
                ر
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-success rounded-full border-2 border-white"></div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-dark text-sm truncate">رنا حداد (المشرفة)</span>
                  <span className="text-xs text-text-secondary">١٠:٣٠ ص</span>
                </div>
                <p className="text-xs text-text-secondary truncate">ممتاز، شكراً لالتزامك بالموعد.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-[#E5DDD5]/10 relative">
          {/* Pattern bg */}
          <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#0D1F35 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
          
          {/* Header */}
          <div className="p-4 border-b border-border bg-white flex items-center gap-3 z-10">
            <div className="w-10 h-10 rounded-full bg-dark text-white flex items-center justify-center font-bold">ر</div>
            <div>
              <div className="font-bold text-dark text-sm">رنا حداد</div>
              <div className="text-xs text-success">متصل الآن</div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4 z-10">
            <div className="text-center mb-4">
              <span className="bg-white px-3 py-1 rounded-full text-xs text-text-secondary shadow-sm">اليوم</span>
            </div>

            <div className="self-end max-w-[70%] bg-accent-gold-light p-3 rounded-xl rounded-tr-none shadow-sm">
              <p className="text-dark text-sm leading-relaxed">السلام عليكم أستاذة رنا، هل يمكنني الاستفسار عن مصطلح 'Simulation' في سياق الشركة؟</p>
              <div className="text-left text-[10px] text-text-secondary mt-1 flex justify-end gap-1 items-center">
                <span>١٠:١٥ ص</span>
                <span className="text-info">✓✓</span>
              </div>
            </div>

            <div className="self-start max-w-[70%] bg-white p-3 rounded-xl rounded-tl-none shadow-sm border border-border/50">
              <p className="text-dark text-sm leading-relaxed">وعليكم السلام، بالتأكيد. نفضل ترجمتها إلى "محاكاة" في هذا السياق لتبدو أكثر احترافية.</p>
              <div className="text-left text-[10px] text-text-secondary mt-1">
                <span>١٠:٢٠ ص</span>
              </div>
            </div>

            <div className="self-end max-w-[70%] bg-accent-gold-light p-3 rounded-xl rounded-tr-none shadow-sm">
              <p className="text-dark text-sm leading-relaxed">علم، شكراً جزيلاً. سأقوم بتسليم المهمة خلال ساعة.</p>
              <div className="text-left text-[10px] text-text-secondary mt-1 flex justify-end gap-1 items-center">
                <span>١٠:٢٥ ص</span>
                <span className="text-info">✓✓</span>
              </div>
            </div>

            <div className="self-start max-w-[70%] bg-white p-3 rounded-xl rounded-tl-none shadow-sm border border-border/50">
              <p className="text-dark text-sm leading-relaxed">ممتاز، شكراً لالتزامك بالموعد.</p>
              <div className="text-left text-[10px] text-text-secondary mt-1">
                <span>١٠:٣٠ ص</span>
              </div>
            </div>
          </div>

          {/* Input */}
          <div className="p-4 bg-primary border-t border-border z-10 flex gap-3">
            <input 
              type="text" 
              placeholder="اكتب رسالة..." 
              className="flex-1 rounded-full border border-border px-5 py-3 focus:outline-none focus:border-accent-gold focus:ring-1 focus:ring-accent-gold"
            />
            <button className="w-12 h-12 rounded-full bg-accent-gold text-dark flex items-center justify-center shadow-md hover:bg-accent-gold/90 transition-colors">
              <svg className="w-5 h-5 rtl:-scale-x-100 transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
