import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface MortgageRequest {
  full_name: string;
  email: string;
  phone: string;
  propertyValue: number;
  downPayment: number;
  duration: number;
  monthlyInstallment: string;
  totalEligibleAmount: number;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const requestData: MortgageRequest = await req.json()
    
    // Validate input data
    if (!requestData.email || !requestData.full_name || !requestData.phone) {
      throw new Error('Missing required fields')
    }

    // Create email content in Arabic
    const emailContent = `
      <div dir="rtl" style="text-align: right; font-family: Arial, sans-serif;">
        <h2>طلب تمويل عقاري جديد</h2>
        <p>تم استلام طلب تمويل عقاري جديد من موقع الشركة:</p>
        
        <h3>معلومات مقدم الطلب:</h3>
        <ul style="list-style: none; padding: 0;">
          <li>الاسم: ${requestData.full_name}</li>
          <li>البريد الإلكتروني: ${requestData.email}</li>
          <li>رقم الجوال: ${requestData.phone}</li>
        </ul>

        <h3>تفاصيل التمويل المطلوب:</h3>
        <ul style="list-style: none; padding: 0;">
          <li>قيمة العقار: ${requestData.propertyValue.toLocaleString()} ريال</li>
          <li>الدفعة الأولى: ${requestData.downPayment.toLocaleString()} ريال</li>
          <li>مدة التمويل: ${requestData.duration} سنة</li>
          <li>القسط الشهري: ${requestData.monthlyInstallment} ريال</li>
          <li>إجمالي مبلغ التمويل: ${requestData.totalEligibleAmount.toLocaleString()} ريال</li>
        </ul>

        <p>تم إرسال هذا البريد تلقائياً من نظام الموقع الإلكتروني.</p>
      </div>
    `

    // Send email using fetch to an SMTP service or email API
    const emailResponse = await fetch('https://api.emailprovider.com/v1/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Deno.env.get('EMAIL_API_KEY')}`,
      },
      body: JSON.stringify({
        to: 'info@alfaisal.com.sa',
        from: 'noreply@alfaisal.com.sa',
        subject: 'طلب تمويل عقاري جديد - ' + requestData.full_name,
        html: emailContent,
      }),
    });

    if (!emailResponse.ok) {
      throw new Error('Failed to send email');
    }

    return new Response(
      JSON.stringify({ message: 'Email sent successfully' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    console.error('Error:', error.message)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})