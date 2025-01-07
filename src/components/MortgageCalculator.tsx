import { useState } from "react";
import { Slider } from "./ui/slider";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { ChevronDown } from "lucide-react";

const MortgageCalculator = () => {
  const [propertyValue, setPropertyValue] = useState(10000);
  const [downPayment, setDownPayment] = useState(3000);
  const [duration, setDuration] = useState(19);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  // Calculate values
  const totalEligibleAmount = propertyValue - downPayment;
  const monthlyInstallment = (totalEligibleAmount / (duration * 12)).toFixed(2);
  const adminFees = 70;
  const addedProfits = 5320;
  const annualRate = 6.62;
  const totalPayment = 12320;

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-darkBlue inline-block bg-darkBlue px-4 py-2 rounded-tl-[100px] rounded-tr-[5px] rounded-br-[100px] rounded-bl-[5px] text-white">
            حاسبة التمويل العقاري
          </h2>
        </div>

        <div className="max-w-[960px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Results Box */}
            <div className="bg-gradient-to-br from-darkBlue to-darkBlue/90 text-white p-8 rounded-lg order-2 lg:order-1">
              <div className="text-center mb-8">
                <h3 className="text-lg mb-2">المبلغ الإجمالي المؤهل</h3>
                <p className="text-4xl font-bold mb-4">
                  {totalEligibleAmount.toLocaleString()}
                  <span className="text-lg mr-1">SR</span>
                </p>
                <div className="border-t border-white/20 pt-4">
                  <h4 className="text-lg mb-2">الأقساط الشهرية</h4>
                  <p className="text-3xl font-bold">
                    {monthlyInstallment}
                    <span className="text-lg mr-1">SR</span>
                  </p>
                </div>
              </div>

              <Collapsible 
                open={isDetailsOpen} 
                onOpenChange={setIsDetailsOpen}
                className="transition-all duration-300 ease-in-out"
              >
                <CollapsibleTrigger className="w-full text-center mt-6 flex items-center justify-center gap-2 hover:text-gold transition-colors">
                  <span>{isDetailsOpen ? 'إخفاء التفاصيل' : 'توسيع القائمة لعرض التفاصيل'}</span>
                  <ChevronDown className={`transform transition-transform duration-300 ${isDetailsOpen ? 'rotate-180' : ''}`} />
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-4 space-y-4 data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up">
                  <div className="space-y-4 border-t border-white/20 pt-4">
                    <div className="flex justify-between">
                      <span>الرسوم الإدارية</span>
                      <span>{adminFees} <span className="text-sm">SR</span></span>
                    </div>
                    <div className="flex justify-between">
                      <span>الأرباح المضافة</span>
                      <span>{addedProfits} <span className="text-sm">SR</span></span>
                    </div>
                    <div className="flex justify-between">
                      <span>معدل النسبة السنوي</span>
                      <span>{annualRate}%</span>
                    </div>
                    <div className="flex justify-between font-bold">
                      <span>إجمالي السداد</span>
                      <span>{totalPayment} <span className="text-sm">SR</span></span>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>

              <Button className="w-full mt-6 bg-gold hover:bg-gold/90 text-white">
                تقدم بطلبك الآن
              </Button>

              <div className="mt-4 text-sm opacity-75 text-center">
                <p>تطبق الشروط والأحكام. تختلف أسعار المرابحة حسب المدة وتخضع لسياسة البنك</p>
                <p className="mt-2">معدل النسبة السنوي المحتسب هو تقريبي و قد يختلف بناءً على اعتماده على جدول السداد النهائي المتفق عليه</p>
              </div>
            </div>

            {/* Input Fields */}
            <div className="space-y-8 order-1 lg:order-2">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="text-xl font-bold text-gray-800">قيمة العقار</label>
                  <div className="relative">
                    <div className="flex items-center gap-2 bg-white border-2 border-[#004bad] rounded-full px-4 py-2">
                      <Input
                        type="number"
                        value={propertyValue}
                        onChange={(e) => setPropertyValue(Number(e.target.value))}
                        className="w-24 text-left border-none p-0 text-lg font-bold focus-visible:ring-0"
                      />
                      <span className="text-sm font-medium text-gray-600">SR</span>
                    </div>
                  </div>
                </div>
                <Slider
                  value={[propertyValue]}
                  onValueChange={([value]) => setPropertyValue(value)}
                  max={100000}
                  step={1000}
                  className="my-4"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <label className="text-xl font-bold text-gray-800 block">الدفعة الأولى</label>
                    <span className="text-sm text-gray-500 mt-1 block">*5% - 30% كحد أقصى من قيمة العقار</span>
                  </div>
                  <div className="relative">
                    <div className="flex items-center gap-2 bg-white border-2 border-[#004bad] rounded-full px-4 py-2">
                      <Input
                        type="number"
                        value={downPayment}
                        onChange={(e) => setDownPayment(Number(e.target.value))}
                        className="w-24 text-left border-none p-0 text-lg font-bold focus-visible:ring-0"
                      />
                      <span className="text-sm font-medium text-gray-600">SR</span>
                    </div>
                  </div>
                </div>
                <Slider
                  value={[downPayment]}
                  onValueChange={([value]) => setDownPayment(value)}
                  max={propertyValue * 0.3}
                  step={1000}
                  className="my-4"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="text-xl font-bold text-gray-800">مدة التمويل (بالأعوام)</label>
                  <div className="relative">
                    <div className="flex items-center gap-2 bg-white border-2 border-[#004bad] rounded-full px-4 py-2">
                      <Input
                        type="number"
                        value={duration}
                        onChange={(e) => setDuration(Number(e.target.value))}
                        className="w-24 text-left border-none p-0 text-lg font-bold focus-visible:ring-0"
                      />
                    </div>
                  </div>
                </div>
                <Slider
                  value={[duration]}
                  onValueChange={([value]) => setDuration(value)}
                  max={30}
                  min={1}
                  step={1}
                  className="my-4"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MortgageCalculator;
