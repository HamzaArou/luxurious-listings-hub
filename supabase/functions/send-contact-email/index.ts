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
    console.log('Received form data:', { name, phone, message, selectedProject });

    // Format email content with proper headers for server-side requests
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'origin': 'http://localhost',  // Required for server-side calls
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
        accessToken: 'DJX_dy28zAjctAAIj', // Add access token for server-side authentication
      }),
    });

    const responseText = await response.text();
    console.log('EmailJS response:', response.status, responseText);

    if (!response.ok) {
      throw new Error(`EmailJS error: ${response.status} ${responseText}`);
    }

    try {
      const data = JSON.parse(responseText);
      console.log('Email sent successfully:', data);
    } catch (e) {
      console.log('Could not parse response as JSON:', responseText);
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in send-contact-email function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: error.stack 
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});