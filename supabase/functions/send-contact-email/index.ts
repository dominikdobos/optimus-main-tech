
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactFormData {
  name: string;
  company?: string;
  email: string;
  phone: string;
  service?: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData: ContactFormData = await req.json();
    const { name, company, email, phone, service, message } = formData;

    console.log("Sending email with form data:", formData);

    // Format service type for readability
    const serviceType = service || "Nem választott szolgáltatást";
    
    // Company is optional
    const companyInfo = company ? `<p><strong>Cég:</strong> ${company}</p>` : "";

    const emailResponse = await resend.emails.send({
      from: "Optimus MainTech <info@omtkft.hu>", // Change this to your verified domain
      to: "info@omtkft.hu", // Default receiver
      subject: "Új kapcsolatfelvételi űrlap - Optimus MainTech",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #2563eb;">Új üzenet érkezett a weboldalról</h1>
          <hr style="border: 1px solid #e5e7eb; margin: 20px 0;" />
          
          <h2 style="color: #4b5563;">Kapcsolatfelvételi adatok:</h2>
          <p><strong>Név:</strong> ${name}</p>
          ${companyInfo}
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Telefonszám:</strong> ${phone}</p>
          <p><strong>Szolgáltatás:</strong> ${serviceType}</p>
          
          <h3 style="color: #4b5563; margin-top: 20px;">Üzenet:</h3>
          <div style="background-color: #f9fafb; padding: 15px; border-radius: 5px;">
            ${message.replace(/\n/g, "<br>")}
          </div>
          
          <hr style="border: 1px solid #e5e7eb; margin: 20px 0;" />
          <p style="color: #6b7280; font-size: 14px;">
            Ez az email automatikusan lett elküldve az Optimus MainTech weboldali űrlapról.
          </p>
        </div>
      `,
      // Send a confirmation to the person who filled out the form
      cc: [email],
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, data: emailResponse }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error sending email:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
