import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

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
    const requestData: MortgageRequest = await req.json()
    console.log('Received mortgage request:', requestData)
    
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

    console.log('Attempting to send email via Resend...')
    
    // Send email using Resend
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Deno.env.get('RESEND_API_KEY')}`,
      },
      body: JSON.stringify({
        from: 'Alfaisal Real Estate <onboarding@resend.dev>',
        to: ['info@alfaisal.com.sa'],
        subject: 'طلب تمويل عقاري جديد - ' + requestData.full_name,
        html: emailContent,
      }),
    })

    if (!emailResponse.ok) {
      const errorData = await emailResponse.text()
      console.error('Resend API error:', errorData)
      throw new Error(`Failed to send email: ${errorData}`)
    }

    const emailResult = await emailResponse.json()
    console.log('Email sent successfully:', emailResult)

    return new Response(
      JSON.stringify({ message: 'Email sent successfully' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    console.error('Error in send-mortgage-email function:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})