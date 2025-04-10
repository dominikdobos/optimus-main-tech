
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
  recipientEmail: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData: ContactFormData = await req.json();
    const { name, company, email, phone, service, message, recipientEmail } = formData;

    console.log("Sending email with form data:", formData);

    // Format service type for readability
    const serviceType = service || "Nem választott szolgáltatást";
    
    // Company is optional
    const companyInfo = company ? `<p><strong>Cég:</strong> ${company}</p>` : "";

    // Send detailed form data to the selected recipient
    const emailToRecipient = await resend.emails.send({
      from: "Optimus MainTech <info@omtkft.hu>", // Change this to your verified domain
      to: recipientEmail, // Use the selected recipient email
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
    });

    // Send confirmation email to the form submitter
    const confirmationEmail = await resend.emails.send({
      from: "Optimus MainTech <info@omtkft.hu>", // Change this to your verified domain
      to: email, // Send to the person who filled out the form
      subject: "Köszönjük megkeresését - Optimus MainTech",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #2563eb;">Köszönjük megkeresését!</h1>
          <hr style="border: 1px solid #e5e7eb; margin: 20px 0;" />
          
          <p>Kedves ${name}!</p>
          
          <p>Köszönjük, hogy felvette velünk a kapcsolatot. Megkaptuk üzenetét, és hamarosan válaszolunk rá.</p>
          
          <p>Az Ön által választott szolgáltatás: ${serviceType}</p>
          
          <p>Üdvözlettel,<br>Az Optimus MainTech csapata</p>
          
          <hr style="border: 1px solid #e5e7eb; margin: 20px 0;" />
          <p style="color: #6b7280; font-size: 14px;">
            Ez egy automatikus visszaigazoló email, kérjük, ne válaszoljon rá.
          </p>
        </div>
      `,
    });

    console.log("Emails sent successfully:", {
      recipient: emailToRecipient,
      confirmation: confirmationEmail
    });

    return new Response(JSON.stringify({ 
      success: true, 
      data: {
        recipientEmail: emailToRecipient,
        confirmationEmail: confirmationEmail
      }
    }), {
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
