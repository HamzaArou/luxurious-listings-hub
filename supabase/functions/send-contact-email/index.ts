import { serve } from "https://deno.fresh.runtime.dev";

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
    const emailContent = `
      New Contact Form Submission:
      
      Name: ${name}
      Phone: ${phone}
      Project: ${selectedProject || 'Not specified'}
      Message: ${message || 'No message provided'}
    `;

    // Send to a free email forwarding service
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        service_id: 'default_service',
        template_id: 'template_default',
        user_id: 'user_your_user_id',
        template_params: {
          to_email: 'hamzaaroussi22@gmail.com',
          from_name: name,
          message: emailContent,
        },
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send email');
    }

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