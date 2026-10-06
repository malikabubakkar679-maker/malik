import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

function resendApiPlugin() {
  return {
    name: 'resend-api-proxy',
    configureServer(server) {
      server.middlewares.use('/api/send-email', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405
          res.end(JSON.stringify({ error: 'Method Not Allowed' }))
          return
        }

        let body = ''
        req.on('data', (chunk) => {
          body += chunk
        })
        req.on('end', async () => {
          try {
            const data = JSON.parse(body || '{}')
            const env = loadEnv('development', process.cwd(), '')
            const RESEND_API_KEY =
              data.apiKey ||
              env.RESEND_API_KEY ||
              env.VITE_RESEND_API_KEY ||
              process.env.RESEND_API_KEY ||
              process.env.VITE_RESEND_API_KEY

            const emailPayload = {
              from: 'Portfolio Contact <onboarding@resend.dev>',
              to: [data.to || 'malikabubakkar523@gmail.com'],
              reply_to: data.email || undefined,
              subject:
                data.subject ||
                `New Inquiry: ${data.projectType || 'Project'} from ${data.name || 'Client'}`,
              html:
                data.html ||
                `
                <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; padding: 28px; color: #121214; max-width: 600px; margin: 0 auto; border: 1px solid #e7d8c5; border-radius: 12px; background: #FAF8F5;">
                  <div style="border-bottom: 2px solid #c5832b; padding-bottom: 12px; margin-bottom: 20px;">
                    <span style="font-size: 11px; font-weight: 700; letter-spacing: 0.1em; color: #c5832b; text-transform: uppercase;">Malik Abubakkar Portfolio</span>
                    <h2 style="color: #121214; margin: 6px 0 0 0; font-size: 22px;">New Project Transmission</h2>
                  </div>
                  
                  <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                    <tr>
                      <td style="padding: 8px 0; color: #737373; font-size: 13px; width: 140px;">Client Name:</td>
                      <td style="padding: 8px 0; font-weight: 600; color: #121214; font-size: 14px;">${data.name || 'N/A'}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; color: #737373; font-size: 13px;">Email Address:</td>
                      <td style="padding: 8px 0; font-weight: 600; color: #c5832b; font-size: 14px;"><a href="mailto:${data.email}" style="color: #c5832b; text-decoration: none;">${data.email || 'N/A'}</a></td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; color: #737373; font-size: 13px;">Project Category:</td>
                      <td style="padding: 8px 0; font-weight: 600; color: #121214; font-size: 14px;"><span style="background: #eedec7; color: #784407; padding: 3px 8px; border-radius: 6px; font-size: 12px;">${data.projectType || data.service || 'Website / App'}</span></td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; color: #737373; font-size: 13px;">Estimated Budget:</td>
                      <td style="padding: 8px 0; font-weight: 600; color: #121214; font-size: 14px;">${data.budget || 'Flexible'}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; color: #737373; font-size: 13px;">Timeline:</td>
                      <td style="padding: 8px 0; font-weight: 600; color: #121214; font-size: 14px;">${data.timeline || 'Flexible'}</td>
                    </tr>
                  </table>
                  
                  <div style="background: #ffffff; padding: 18px; border-radius: 8px; border: 1px solid #e5e0d8; margin-top: 15px;">
                    <p style="margin: 0 0 8px 0; font-size: 12px; font-weight: 700; color: #737373; text-transform: uppercase;">Message & Project Details:</p>
                    <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #2e2e33; white-space: pre-wrap;">${data.message || 'No additional details provided.'}</p>
                  </div>
                  
                  <div style="margin-top: 24px; padding-top: 15px; border-top: 1px solid #ece7df; text-align: center; color: #888894; font-size: 11px;">
                    Sent automatically via Malik Abubakkar Digital Portfolio • Powered by Resend API
                  </div>
                </div>
              `,
            }

            const response = await fetch('https://api.resend.com/emails', {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${RESEND_API_KEY}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(emailPayload),
            })

            const resData = await response.json()
            res.setHeader('Content-Type', 'application/json')
            res.statusCode = response.status
            res.end(JSON.stringify(resData))
          } catch (err) {
            res.setHeader('Content-Type', 'application/json')
            res.statusCode = 500
            res.end(JSON.stringify({ error: err.message }))
          }
        })
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), resendApiPlugin()],
})

