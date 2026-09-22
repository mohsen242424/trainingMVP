import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Textarea from '../../components/ui/Textarea';
import { useToast } from '../../contexts/ToastContext';

export default function TaskView() {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  
  const [translation, setTranslation] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiReview, setAiReview] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const minWords = 100;
  const wordCount = translation.trim() === '' ? 0 : translation.trim().split(/\s+/).length;
  const canSubmit = wordCount >= minWords;

  const mockSourceText = `Afuq platform is an innovative internship simulation environment designed to bridge the gap between academic studies and professional real-world requirements.

We aim to provide students with hands-on experience by placing them inside virtual companies where they can receive practical tasks, communicate with supervisors, and get AI-powered feedback on their performance.

Our core values include continuous learning, quality, and dedication. Joining our team means you are ready to take on challenges and grow your skills in a professional setting.`;

  const handleAiReview = () => {
    if (wordCount < 10) {
      showToast('يرجى كتابة نص كافٍ للمراجعة', 'warning');
      return;
    }
    setAiLoading(true);
    // Simulate AI delay
    setTimeout(() => {
      setAiReview({
        score: 78,
        dimensions: [
          { label: 'الدقة اللغوية', value: 85 },
          { label: 'سلاسة الأسلوب', value: 70 },
          { label: 'الحفاظ على المعنى', value: 90 },
          { label: 'المصطلحات', value: 65 }
        ],
        strengths: ['نقل المعنى العام بشكل ممتاز', 'استخدام قواعد نحوية صحيحة في الجملة الأولى'],
        improvements: ['بعض المصطلحات التقنية تحتاج لترجمة أدق', 'ربط الجمل في المقطع الأخير غير سلس'],
        note: 'ترجمة جيدة بشكل عام، لكن ركز أكثر على استخدام مصطلحات الأعمال الاحترافية بدلاً من الترجمة الحرفية.'
      });
      setAiLoading(false);
    }, 2500);
  };

  const handleSubmit = () => {
    setSubmitted(true);
    showToast('تم إرسال عملك للمشرف بنجاح!', 'success');
    setTimeout(() => {
      navigate('/dashboard/student');
    }, 2000);
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-100px)]">
        
        {/* Left Panel - Task Brief (55%) */}
        <div className="w-full lg:w-[55%] flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar">
          <div className="flex items-center gap-3 mb-2">
            <Badge variant="outline" className="bg-white">المهمة #١</Badge>
            <Badge className="bg-warning-bg text-warning">الموعد: اليوم ١١:٥٩ م</Badge>
          </div>
          <h1 className="text-2xl font-bold text-dark">ترجمة مقال تعريفي للشركة</h1>
          
          <Card className="p-6 border-t-4 border-t-dark bg-white shadow-sm mt-2">
            <div className="border-b border-border pb-4 mb-4 text-sm">
              <div className="flex mb-2"><span className="text-text-secondary w-16">من:</span><span className="font-bold text-dark">رنا حداد — محررة المحتوى الرقمي</span></div>
              <div className="flex mb-2"><span className="text-text-secondary w-16">إلى:</span><span className="font-bold text-dark">المتدربين - قسم الترجمة</span></div>
              <div className="flex"><span className="text-text-secondary w-16">الموضوع:</span><span className="font-bold text-dark">ترجمة المقال التعريفي المرفق</span></div>
            </div>
            <div className="text-text-primary leading-relaxed prose prose-sm max-w-none">
              <p>أهلاً بك في فريق أفق،</p>
              <p>نعمل حالياً على تحديث الموقع الإلكتروني للشركة، ونحتاج إلى ترجمة النص التعريفي المرفق لصفحة "من نحن".</p>
              <p><strong>المطلوب:</strong> ترجمة النص من الإنجليزية إلى العربية.</p>
              <p><strong>ملاحظات هامة:</strong></p>
              <ul>
                <li>تجنب الترجمة الحرفية وركز على إيصال المعنى بأسلوب تسويقي سلس.</li>
                <li>استخدم مصطلح "محاكاة مهنية" لترجمة "internship simulation".</li>
              </ul>
              <p>بالتوفيق.</p>
            </div>
          </Card>

          <h3 className="font-bold text-dark mt-4">النص المصدر (إنجليزي)</h3>
          <Card className="p-6 bg-[#FAFBFC] border border-border font-serif text-left flex-1 min-h-[200px]" dir="ltr">
            <div className="text-text-primary whitespace-pre-wrap leading-relaxed">
              {mockSourceText}
            </div>
          </Card>
        </div>

        {/* Right Panel - Editor & AI (45%) */}
        <div className="w-full lg:w-[45%] flex flex-col bg-white rounded-xl shadow-sm border border-border overflow-hidden">
          <div className="bg-dark text-white px-6 py-4 flex justify-between items-center">
            <h2 className="font-bold text-lg">منطقة العمل</h2>
            <div className={`text-xs px-2 py-1 rounded ${wordCount >= minWords ? 'bg-success/20 text-green-300' : 'bg-white/20 text-gray-300'}`}>
              الكلمات: {wordCount} / {minWords}
            </div>
          </div>
          
          <div className="flex-1 p-6 flex flex-col overflow-y-auto">
            {!aiReview ? (
              <div className="flex-1 flex flex-col">
                <label className="font-bold text-dark mb-2 block">ترجمتك:</label>
                <textarea
                  className="flex-1 w-full border border-border rounded-lg p-4 focus:ring-2 focus:ring-accent-gold focus:border-accent-gold outline-none resize-none"
                  placeholder="ابدأ الكتابة هنا..."
                  value={translation}
                  onChange={(e) => setTranslation(e.target.value)}
                  disabled={aiLoading || submitted}
                ></textarea>
                
                <div className="mt-6 flex flex-col gap-3">
                  {aiLoading ? (
                    <div className="bg-primary p-4 rounded-lg text-center animate-pulse">
                      جاري تحليل ترجمتك باستخدام الذكاء الاصطناعي...
                    </div>
                  ) : (
                    <Button variant="outline" fullWidth onClick={handleAiReview} disabled={submitted}>
                      احصل على مراجعة أولية من الذكاء الاصطناعي
                    </Button>
                  )}
                  <Button 
                    fullWidth 
                    className="bg-accent-gold text-dark font-bold" 
                    disabled={!canSubmit || aiLoading || submitted}
                    onClick={handleSubmit}
                  >
                    أرسل العمل للمشرف
                  </Button>
                  {!canSubmit && !submitted && (
                    <p className="text-xs text-center text-text-secondary">يجب كتابة {minWords} كلمة على الأقل لإرسال العمل</p>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col animate-fadeIn">
                <div className="flex justify-between items-start mb-6 border-b border-border pb-6">
                  <div>
                    <h3 className="text-xl font-bold text-dark mb-1">نتيجة التقييم الآلي</h3>
                    <p className="text-sm text-text-secondary">هذه مراجعة مبدئية، سيقوم المشرف بتقييمك لاحقاً</p>
                  </div>
                  <div className="w-16 h-16 rounded-full border-4 border-accent-gold flex items-center justify-center text-xl font-bold text-dark">
                    {aiReview.score}%
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  {aiReview.dimensions.map((dim, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-dark font-medium">{dim.label}</span>
                        <span className="text-text-secondary">{dim.value}%</span>
                      </div>
                      <div className="w-full h-2 bg-primary rounded-full overflow-hidden">
                        <div className="h-full bg-accent-gold" style={{ width: `${dim.value}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-success-bg/30 p-4 rounded-lg border border-success/20">
                    <h4 className="font-bold text-success mb-2 text-sm">نقاط القوة</h4>
                    <ul className="text-sm space-y-1 list-disc list-inside text-dark">
                      {aiReview.strengths.map((s, i) => <li key={i}>{s}</li>)}
                    </ul>
                  </div>
                  <div className="bg-warning-bg/30 p-4 rounded-lg border border-warning/20">
                    <h4 className="font-bold text-warning mb-2 text-sm">تحتاج تحسين</h4>
                    <ul className="text-sm space-y-1 list-disc list-inside text-dark">
                      {aiReview.improvements.map((s, i) => <li key={i}>{s}</li>)}
                    </ul>
                  </div>
                </div>

                <div className="bg-primary p-4 rounded-lg text-sm text-text-secondary mb-8">
                  <strong>ملاحظة عامة:</strong> {aiReview.note}
                </div>

                <div className="mt-auto flex gap-3">
                  <Button variant="outline" className="flex-1" onClick={() => setAiReview(null)}>
                    تحديث الترجمة
                  </Button>
                  <Button className="flex-1 bg-accent-gold text-dark font-bold" disabled={!canSubmit} onClick={handleSubmit}>
                    إرسال للمشرف
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
