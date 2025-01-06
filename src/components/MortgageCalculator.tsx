import React, { useState, useEffect } from 'react';
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";

const MortgageCalculator = () => {
  const [propertyValue, setPropertyValue] = useState(1000000);
  const [downPayment, setDownPayment] = useState(200000);
  const [duration, setDuration] = useState(25);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  // Calculate results
  const calculateResults = () => {
    const loanAmount = propertyValue - downPayment;
    const interestRate = 0.035; // 3.5% annual interest rate
    const monthlyRate = interestRate / 12;
    const numberOfPayments = duration * 12;
    
    const monthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
                          (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    
    const totalPayment = monthlyPayment * numberOfPayments;
    const adminFees = loanAmount * 0.01; // 1% admin fee
    const totalProfit = totalPayment - loanAmount;

    return {
      monthlyPayment,
      totalPayment,
      adminFees,
      totalProfit,
      eligibleAmount: loanAmount,
    };
  };

  const results = calculateResults();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-SA', {
      style: 'currency',
      currency: 'SAR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap -mx-4">
          {/* Right side - Input Fields */}
          <div className="w-full lg:w-1/2 px-4 mb-8 lg:mb-0">
            <div className="bg-[#F8F9FA] p-6 rounded-lg">
              <div className="mb-8">
                <label className="block text-lg font-semibold mb-4 text-right">قيمة العقار</label>
                <div className="flex items-center gap-4 mb-4">
                  <Input
                    type="number"
                    value={propertyValue}
                    onChange={(e) => setPropertyValue(Number(e.target.value))}
                    className="text-left dir-ltr"
                  />
                  <Slider
                    value={[propertyValue]}
                    onValueChange={(value) => setPropertyValue(value[0])}
                    max={10000000}
                    min={100000}
                    step={10000}
                    className="flex-grow"
                  />
                </div>
              </div>

              <div className="mb-8">
                <label className="block text-lg font-semibold mb-4 text-right">الدفعة الأولى</label>
                <div className="flex items-center gap-4 mb-4">
                  <Input
                    type="number"
                    value={downPayment}
                    onChange={(e) => setDownPayment(Number(e.target.value))}
                    className="text-left dir-ltr"
                  />
                  <Slider
                    value={[downPayment]}
                    onValueChange={(value) => setDownPayment(value[0])}
                    max={propertyValue * 0.9}
                    min={propertyValue * 0.1}
                    step={10000}
                    className="flex-grow"
                  />
                </div>
              </div>

              <div className="mb-8">
                <label className="block text-lg font-semibold mb-4 text-right">مدة التمويل (بالأعوام)</label>
                <div className="flex items-center gap-4 mb-4">
                  <Input
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    className="text-left dir-ltr"
                  />
                  <Slider
                    value={[duration]}
                    onValueChange={(value) => setDuration(value[0])}
                    max={30}
                    min={5}
                    step={1}
                    className="flex-grow"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Left side - Results */}
          <div className="w-full lg:w-1/2 px-4">
            <div className="bg-[#F8F9FA] p-6 rounded-lg">
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-2 text-right">المبلغ الإجمالي المؤهل</h3>
                <p className="text-3xl font-bold text-darkBlue text-right">
                  {formatCurrency(results.eligibleAmount)}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-bold mb-2 text-right">الأقساط الشهرية</h3>
                <p className="text-3xl font-bold text-darkBlue text-right">
                  {formatCurrency(results.monthlyPayment)}
                </p>
              </div>

              <Collapsible open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
                <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-white rounded-lg mb-4">
                  <ChevronDown className={`transition-transform ${isDetailsOpen ? 'transform rotate-180' : ''}`} />
                  <span className="font-semibold">تفاصيل التمويل</span>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="space-y-4 p-4 bg-white rounded-lg">
                    <div className="flex justify-between">
                      <span className="font-bold">{formatCurrency(results.totalPayment)}</span>
                      <span>الإجمالي للسداد</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-bold">{formatCurrency(results.adminFees)}</span>
                      <span>الرسوم الإدارية</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-bold">{formatCurrency(results.totalProfit)}</span>
                      <span>الأرباح المضافة</span>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>

              <Button 
                className="w-full bg-darkBlue hover:bg-darkBlue/90 text-white py-3 rounded-lg mt-6"
              >
                تقدم بطلبك الآن
              </Button>

              <div className="mt-6 text-sm text-gray-600 text-right">
                <p>* هذه الحاسبة تقديرية فقط والنتائج قد تختلف حسب دراسة الطلب</p>
                <p>* معدل الربح السنوي 3.5% قابل للتغيير</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MortgageCalculator;