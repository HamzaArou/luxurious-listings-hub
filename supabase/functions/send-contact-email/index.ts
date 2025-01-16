import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, phone, message, selectedProject } = await req.json();

    // Format email content
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        service_id: 'service_vsb08u9',
        template_id: 'template_31x8lw5',
        user_id: 'DJX_dy28zAjctAAIj',
        template_params: {
          to_email: 'pr@wtd.com.sa',
          from_name: name,
          phone: phone,
          project: selectedProject || 'Not specified',
          message: message || 'No message provided',
        },
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send email');
    }

    const data = await response.json();
    console.log('Email sent successfully:', data);

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});