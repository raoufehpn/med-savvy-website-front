import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

const supabaseUrl = Deno.env.get('SUPABASE_URL')!
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: 'Email and password are required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Get admin user
    const { data: adminUser, error: userError } = await supabase
      .from('admin_users')
      .select('*')
      .eq('email', email)
      .eq('is_active', true)
      .single()

    if (userError || !adminUser) {
      return new Response(
        JSON.stringify({ error: 'Invalid credentials' }),
        { 
          status: 401, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Check if account is locked
    if (adminUser.locked_until && new Date(adminUser.locked_until) > new Date()) {
      return new Response(
        JSON.stringify({ error: 'Account is temporarily locked' }),
        { 
          status: 423, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // For demo purposes, check if password_hash is empty (first time setup)
    if (!adminUser.password_hash) {
      // Hash the password using Web Crypto API
      const encoder = new TextEncoder()
      const data = encoder.encode(password + adminUser.email) // Simple salt
      const hashBuffer = await crypto.subtle.digest('SHA-256', data)
      const hashArray = Array.from(new Uint8Array(hashBuffer))
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')

      // Update the password hash
      await supabase
        .from('admin_users')
        .update({ password_hash: hashHex })
        .eq('id', adminUser.id)

      adminUser.password_hash = hashHex
    }

    // Verify password
    const encoder = new TextEncoder()
    const data = encoder.encode(password + adminUser.email)
    const hashBuffer = await crypto.subtle.digest('SHA-256', data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')

    if (hashHex !== adminUser.password_hash) {
      // Increment failed attempts
      const failedAttempts = (adminUser.failed_login_attempts || 0) + 1
      const updateData: any = { failed_login_attempts: failedAttempts }

      // Lock account after 5 failed attempts for 30 minutes
      if (failedAttempts >= 5) {
        const lockUntil = new Date()
        lockUntil.setMinutes(lockUntil.getMinutes() + 30)
        updateData.locked_until = lockUntil.toISOString()
      }

      await supabase
        .from('admin_users')
        .update(updateData)
        .eq('id', adminUser.id)

      return new Response(
        JSON.stringify({ error: 'Invalid credentials' }),
        { 
          status: 401, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Reset failed attempts and update last login
    await supabase
      .from('admin_users')
      .update({ 
        failed_login_attempts: 0, 
        locked_until: null,
        last_login_at: new Date().toISOString()
      })
      .eq('id', adminUser.id)

    // Generate JWT token (simple implementation)
    const token = btoa(JSON.stringify({
      userId: adminUser.id,
      email: adminUser.email,
      exp: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
    }))

    return new Response(
      JSON.stringify({
        token,
        user: {
          id: adminUser.id,
          email: adminUser.email,
          name: adminUser.name,
          is_active: adminUser.is_active
        }
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Login error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})