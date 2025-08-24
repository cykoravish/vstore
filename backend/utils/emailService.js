import nodemailer from "nodemailer"

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.EMAIL_HOST || "smtp.gmail.com",
    port: process.env.EMAIL_PORT || 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })
}

// Send OTP email
export const sendOTPEmail = async (email, otp) => {
  try {
    // For demo purposes, just log the OTP
    console.log(`OTP for ${email}: ${otp}`)

    // In production, uncomment the following code to send actual emails
    /*
    const transporter = createTransporter()
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your VStore Verification Code',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #ea580c, #f97316); padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">VStore</h1>
          </div>
          <div style="padding: 30px; background: #f9f9f9;">
            <h2 style="color: #333; margin-bottom: 20px;">Your Verification Code</h2>
            <p style="color: #666; font-size: 16px; line-height: 1.5;">
              Use the following code to complete your sign-in:
            </p>
            <div style="background: white; padding: 20px; text-align: center; margin: 20px 0; border-radius: 8px; border: 2px solid #ea580c;">
              <span style="font-size: 32px; font-weight: bold; color: #ea580c; letter-spacing: 5px;">${otp}</span>
            </div>
            <p style="color: #666; font-size: 14px;">
              This code will expire in 5 minutes. If you didn't request this code, please ignore this email.
            </p>
          </div>
          <div style="background: #333; color: white; text-align: center; padding: 20px;">
            <p style="margin: 0; font-size: 14px;">© 2024 VStore. All rights reserved.</p>
          </div>
        </div>
      `
    }

    await transporter.sendMail(mailOptions)
    */

    return true
  } catch (error) {
    console.error("Email sending error:", error)
    throw error
  }
}

// Send order confirmation email
export const sendOrderConfirmationEmail = async (email, orderDetails) => {
  try {
    console.log(`Order confirmation for ${email}:`, orderDetails)

    // In production, implement actual email sending
    return true
  } catch (error) {
    console.error("Order confirmation email error:", error)
    throw error
  }
}
