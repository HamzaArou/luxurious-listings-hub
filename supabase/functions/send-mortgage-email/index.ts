import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const requestData = await req.json()
    console.log('Received mortgage request:', requestData)
    
    // Format email content in Arabic
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

    // Send email using EmailJS
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'origin': 'http://localhost',
      },
      body: JSON.stringify({
        service_id: 'service_vsb08u9',
        template_id: 'template_31x8lw5',
        user_id: 'DJX_dy28zAjctAAIj',
        template_params: {
          to_email: 'pr@wtd.com.sa',
          from_name: requestData.full_name,
          phone: requestData.phone,
          message: emailContent,
        },
        accessToken: 'DJX_dy28zAjctAAIj',
      }),
    })

    if (!response.ok) {
      throw new Error(`EmailJS error: ${response.status} ${await response.text()}`)
    }

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error in send-mortgage-email function:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})