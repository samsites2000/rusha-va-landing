import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { contactFormSchema } from '@/lib/validations/contact'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate the form data
    const validatedData = contactFormSchema.parse(body)

    // Email to business owner
    const businessEmail = {
      from: 'noreply@rushava.co.uk',
      to: ['hello@rushava.co.uk'],
      subject: `New Contact Form Submission from ${validatedData.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #F97316; border-bottom: 2px solid #F97316; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>

          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #333;">Contact Information</h3>
            <p><strong>Name:</strong> ${validatedData.name}</p>
            <p><strong>Email:</strong> ${validatedData.email}</p>
            ${validatedData.phone ? `<p><strong>Phone:</strong> ${validatedData.phone}</p>` : ''}
            ${validatedData.company ? `<p><strong>Company:</strong> ${validatedData.company}</p>` : ''}
          </div>

          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #333;">Project Details</h3>
            <p><strong>Service Needed:</strong> ${validatedData.service}</p>
            ${validatedData.budget ? `<p><strong>Budget:</strong> ${validatedData.budget}</p>` : ''}
            <div style="margin-top: 15px;">
              <strong>Message:</strong>
              <div style="background: white; padding: 15px; border-radius: 4px; margin-top: 5px; border-left: 4px solid #F97316;">
                ${validatedData.message.replace(/\n/g, '<br>')}
              </div>
            </div>
          </div>

          <div style="background: #e1f5fe; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #0277bd;">
              <strong>Action Required:</strong> Reply to this email or contact ${validatedData.name} directly at ${validatedData.email}
              ${validatedData.phone ? ` or ${validatedData.phone}` : ''}.
            </p>
          </div>

          <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">

          <p style="color: #666; font-size: 12px;">
            This email was sent from the Rusha VA contact form at ${new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' })} GMT.
          </p>
        </div>
      `,
    }

    // Auto-reply email to customer
    const customerEmail = {
      from: 'hello@rushava.co.uk',
      to: [validatedData.email],
      subject: 'Thank you for contacting Rusha VA - We\'ll be in touch soon!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #F97316, #F97316); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Thank You, ${validatedData.name}!</h1>
            <p style="color: white; margin: 10px 0 0 0; font-size: 16px;">Your message has been received</p>
          </div>

          <div style="background: white; padding: 30px; border-radius: 0 0 8px 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <p style="color: #333; font-size: 16px; line-height: 1.6;">
              Hi ${validatedData.name},
            </p>

            <p style="color: #333; font-size: 16px; line-height: 1.6;">
              Thank you for getting in touch with Rusha VA! We've received your inquiry about <strong>${validatedData.service}</strong>
              and we're excited to learn more about your project.
            </p>

            <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #F97316;">
              <h3 style="color: #F97316; margin-top: 0;">What happens next?</h3>
              <ul style="color: #333; margin: 0; padding-left: 20px;">
                <li>We'll review your requirements within the next 2 hours</li>
                <li>A member of our expert team will contact you directly</li>
                <li>We'll schedule a free consultation to discuss your needs</li>
                <li>You'll receive a custom quote tailored to your project</li>
              </ul>
            </div>

            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 25px 0;">
              <h3 style="color: #333; margin-top: 0;">Your submission summary:</h3>
              <p style="color: #666; margin: 5px 0;"><strong>Service:</strong> ${validatedData.service}</p>
              ${validatedData.budget ? `<p style="color: #666; margin: 5px 0;"><strong>Budget:</strong> ${validatedData.budget}</p>` : ''}
              ${validatedData.company ? `<p style="color: #666; margin: 5px 0;"><strong>Company:</strong> ${validatedData.company}</p>` : ''}
            </div>

            <p style="color: #333; font-size: 16px; line-height: 1.6;">
              In the meantime, feel free to explore our services or call us directly at
              <a href="tel:+442071234567" style="color: #F97316; text-decoration: none;">+44 20 7123 4567</a>
              if you have any urgent questions.
            </p>

            <div style="text-align: center; margin: 30px 0;">
              <a href="https://rushava.co.uk/services"
                 style="background: linear-gradient(135deg, #F97316, #F97316); color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
                Explore Our Services
              </a>
            </div>

            <p style="color: #333; font-size: 16px; line-height: 1.6;">
              Best regards,<br>
              <strong>The Rusha VA Team</strong><br>
              <a href="mailto:hello@rushava.co.uk" style="color: #F97316;">hello@rushava.co.uk</a>
            </p>
          </div>

          <div style="text-align: center; padding: 20px; color: #666; font-size: 12px;">
            <p>© 2024 Rusha VA. All rights reserved.</p>
            <p>This email was sent to ${validatedData.email} because you contacted us through our website.</p>
          </div>
        </div>
      `,
    }

    // Send both emails
    const [businessEmailResult, customerEmailResult] = await Promise.all([
      resend.emails.send(businessEmail),
      resend.emails.send(customerEmail),
    ])

    console.log('Emails sent:', { businessEmailResult, customerEmailResult })

    return NextResponse.json(
      {
        message: 'Email sent successfully',
        emailIds: {
          business: businessEmailResult.data?.id,
          customer: customerEmailResult.data?.id,
        }
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Contact form error:', error)

    if (error instanceof Error) {
      return NextResponse.json(
        { error: 'Failed to send email', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}