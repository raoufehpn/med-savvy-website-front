export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      admin_auth: {
        Row: {
          created_at: string | null
          email: string
          id: string
          is_active: boolean | null
          last_login_at: string | null
          name: string | null
          password_hash: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          is_active?: boolean | null
          last_login_at?: string | null
          name?: string | null
          password_hash: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          is_active?: boolean | null
          last_login_at?: string | null
          name?: string | null
          password_hash?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      admin_users: {
        Row: {
          created_at: string
          email: string
          failed_login_attempts: number | null
          id: string
          is_active: boolean | null
          last_login_at: string | null
          locked_until: string | null
          name: string | null
          password_hash: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          failed_login_attempts?: number | null
          id?: string
          is_active?: boolean | null
          last_login_at?: string | null
          locked_until?: string | null
          name?: string | null
          password_hash: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          failed_login_attempts?: number | null
          id?: string
          is_active?: boolean | null
          last_login_at?: string | null
          locked_until?: string | null
          name?: string | null
          password_hash?: string
          updated_at?: string
        }
        Relationships: []
      }
      appointment_types: {
        Row: {
          color: string | null
          created_at: string
          description_ar: string | null
          description_en: string | null
          duration_minutes: number
          id: string
          is_active: boolean | null
          is_free: boolean | null
          name_ar: string | null
          name_en: string
          name_fr: string | null
          price: number | null
          updated_at: string
        }
        Insert: {
          color?: string | null
          created_at?: string
          description_ar?: string | null
          description_en?: string | null
          duration_minutes?: number
          id?: string
          is_active?: boolean | null
          is_free?: boolean | null
          name_ar?: string | null
          name_en: string
          name_fr?: string | null
          price?: number | null
          updated_at?: string
        }
        Update: {
          color?: string | null
          created_at?: string
          description_ar?: string | null
          description_en?: string | null
          duration_minutes?: number
          id?: string
          is_active?: boolean | null
          is_free?: boolean | null
          name_ar?: string | null
          name_en?: string
          name_fr?: string | null
          price?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      availability_blocks: {
        Row: {
          created_at: string
          doctor_id: string | null
          end_time: string
          id: string
          reason: string | null
          start_time: string
          type: string | null
        }
        Insert: {
          created_at?: string
          doctor_id?: string | null
          end_time: string
          id?: string
          reason?: string | null
          start_time: string
          type?: string | null
        }
        Update: {
          created_at?: string
          doctor_id?: string | null
          end_time?: string
          id?: string
          reason?: string | null
          start_time?: string
          type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "availability_blocks_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "doctors"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_categories: {
        Row: {
          created_at: string
          id: string
          is_active: boolean | null
          name_ar: string | null
          name_en: string
          name_fr: string | null
          slug: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean | null
          name_ar?: string | null
          name_en: string
          name_fr?: string | null
          slug: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean | null
          name_ar?: string | null
          name_en?: string
          name_fr?: string | null
          slug?: string
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          category_id: string | null
          content_ar: string | null
          content_en: string
          content_fr: string | null
          created_at: string
          excerpt_ar: string | null
          excerpt_en: string | null
          excerpt_fr: string | null
          featured_image: string | null
          id: string
          meta_description_ar: string | null
          meta_description_en: string | null
          meta_description_fr: string | null
          meta_title_ar: string | null
          meta_title_en: string | null
          meta_title_fr: string | null
          published_at: string | null
          scheduled_at: string | null
          slug: string
          status: string | null
          tags: string[] | null
          title_ar: string | null
          title_en: string
          title_fr: string | null
          updated_at: string
        }
        Insert: {
          category_id?: string | null
          content_ar?: string | null
          content_en: string
          content_fr?: string | null
          created_at?: string
          excerpt_ar?: string | null
          excerpt_en?: string | null
          excerpt_fr?: string | null
          featured_image?: string | null
          id?: string
          meta_description_ar?: string | null
          meta_description_en?: string | null
          meta_description_fr?: string | null
          meta_title_ar?: string | null
          meta_title_en?: string | null
          meta_title_fr?: string | null
          published_at?: string | null
          scheduled_at?: string | null
          slug: string
          status?: string | null
          tags?: string[] | null
          title_ar?: string | null
          title_en: string
          title_fr?: string | null
          updated_at?: string
        }
        Update: {
          category_id?: string | null
          content_ar?: string | null
          content_en?: string
          content_fr?: string | null
          created_at?: string
          excerpt_ar?: string | null
          excerpt_en?: string | null
          excerpt_fr?: string | null
          featured_image?: string | null
          id?: string
          meta_description_ar?: string | null
          meta_description_en?: string | null
          meta_description_fr?: string | null
          meta_title_ar?: string | null
          meta_title_en?: string | null
          meta_title_fr?: string | null
          published_at?: string | null
          scheduled_at?: string | null
          slug?: string
          status?: string | null
          tags?: string[] | null
          title_ar?: string | null
          title_en?: string
          title_fr?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "blog_posts_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "blog_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      clinic_settings: {
        Row: {
          allow_lawyer_selection: boolean | null
          break_end: string | null
          break_start: string | null
          default_appointment_price: number | null
          free_booking_enabled: boolean | null
          id: string
          multi_doctor_mode: boolean | null
          notifications_enabled: boolean | null
          payment_enabled: boolean | null
          require_national_id: boolean | null
          require_payment: boolean | null
          stripe_enabled: boolean | null
          updated_at: string
          working_days: number[] | null
          working_hours_end: string | null
          working_hours_start: string | null
        }
        Insert: {
          allow_lawyer_selection?: boolean | null
          break_end?: string | null
          break_start?: string | null
          default_appointment_price?: number | null
          free_booking_enabled?: boolean | null
          id?: string
          multi_doctor_mode?: boolean | null
          notifications_enabled?: boolean | null
          payment_enabled?: boolean | null
          require_national_id?: boolean | null
          require_payment?: boolean | null
          stripe_enabled?: boolean | null
          updated_at?: string
          working_days?: number[] | null
          working_hours_end?: string | null
          working_hours_start?: string | null
        }
        Update: {
          allow_lawyer_selection?: boolean | null
          break_end?: string | null
          break_start?: string | null
          default_appointment_price?: number | null
          free_booking_enabled?: boolean | null
          id?: string
          multi_doctor_mode?: boolean | null
          notifications_enabled?: boolean | null
          payment_enabled?: boolean | null
          require_national_id?: boolean | null
          require_payment?: boolean | null
          stripe_enabled?: boolean | null
          updated_at?: string
          working_days?: number[] | null
          working_hours_end?: string | null
          working_hours_start?: string | null
        }
        Relationships: []
      }
      consultations: {
        Row: {
          admin_notes: string | null
          appointment_type_id: string | null
          attended: boolean | null
          booking_notes: string | null
          client_language: string | null
          created_at: string
          doctor_id: string | null
          duration_minutes: number | null
          email: string
          id: string
          is_blocked: boolean | null
          language: string | null
          message: string | null
          name: string
          national_id: string | null
          no_show_count: number | null
          payment_amount: number | null
          payment_status: string | null
          phone: string
          practice_area: string
          preferred_date: string | null
          preferred_time: string | null
          scheduled_at: string | null
          selected_lawyer_id: string | null
          status: string | null
          updated_at: string
        }
        Insert: {
          admin_notes?: string | null
          appointment_type_id?: string | null
          attended?: boolean | null
          booking_notes?: string | null
          client_language?: string | null
          created_at?: string
          doctor_id?: string | null
          duration_minutes?: number | null
          email: string
          id?: string
          is_blocked?: boolean | null
          language?: string | null
          message?: string | null
          name: string
          national_id?: string | null
          no_show_count?: number | null
          payment_amount?: number | null
          payment_status?: string | null
          phone: string
          practice_area: string
          preferred_date?: string | null
          preferred_time?: string | null
          scheduled_at?: string | null
          selected_lawyer_id?: string | null
          status?: string | null
          updated_at?: string
        }
        Update: {
          admin_notes?: string | null
          appointment_type_id?: string | null
          attended?: boolean | null
          booking_notes?: string | null
          client_language?: string | null
          created_at?: string
          doctor_id?: string | null
          duration_minutes?: number | null
          email?: string
          id?: string
          is_blocked?: boolean | null
          language?: string | null
          message?: string | null
          name?: string
          national_id?: string | null
          no_show_count?: number | null
          payment_amount?: number | null
          payment_status?: string | null
          phone?: string
          practice_area?: string
          preferred_date?: string | null
          preferred_time?: string | null
          scheduled_at?: string | null
          selected_lawyer_id?: string | null
          status?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "consultations_appointment_type_id_fkey"
            columns: ["appointment_type_id"]
            isOneToOne: false
            referencedRelation: "appointment_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "consultations_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "doctors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "consultations_selected_lawyer_id_fkey"
            columns: ["selected_lawyer_id"]
            isOneToOne: false
            referencedRelation: "doctors"
            referencedColumns: ["id"]
          },
        ]
      }
      doctors: {
        Row: {
          bio: string | null
          created_at: string
          email: string | null
          id: string
          is_active: boolean | null
          name: string
          phone: string | null
          photo_url: string | null
          specialization: string | null
          updated_at: string
          working_hours: Json | null
        }
        Insert: {
          bio?: string | null
          created_at?: string
          email?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          phone?: string | null
          photo_url?: string | null
          specialization?: string | null
          updated_at?: string
          working_hours?: Json | null
        }
        Update: {
          bio?: string | null
          created_at?: string
          email?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          phone?: string | null
          photo_url?: string | null
          specialization?: string | null
          updated_at?: string
          working_hours?: Json | null
        }
        Relationships: []
      }
      patients: {
        Row: {
          created_at: string
          email: string | null
          id: string
          is_blocked: boolean | null
          name: string
          national_id: string | null
          no_show_count: number | null
          phone: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: string
          is_blocked?: boolean | null
          name: string
          national_id?: string | null
          no_show_count?: number | null
          phone: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          is_blocked?: boolean | null
          name?: string
          national_id?: string | null
          no_show_count?: number | null
          phone?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
