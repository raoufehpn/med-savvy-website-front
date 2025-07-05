export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      appointment_types: {
        Row: {
          color: string | null
          created_at: string
          duration_minutes: number
          id: string
          is_active: boolean | null
          name_ar: string | null
          name_en: string
          name_fr: string | null
          updated_at: string
        }
        Insert: {
          color?: string | null
          created_at?: string
          duration_minutes?: number
          id?: string
          is_active?: boolean | null
          name_ar?: string | null
          name_en: string
          name_fr?: string | null
          updated_at?: string
        }
        Update: {
          color?: string | null
          created_at?: string
          duration_minutes?: number
          id?: string
          is_active?: boolean | null
          name_ar?: string | null
          name_en?: string
          name_fr?: string | null
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
          published_at: string | null
          scheduled_at: string | null
          slug: string
          status: string | null
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
          published_at?: string | null
          scheduled_at?: string | null
          slug: string
          status?: string | null
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
          published_at?: string | null
          scheduled_at?: string | null
          slug?: string
          status?: string | null
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
          break_end: string | null
          break_start: string | null
          id: string
          multi_doctor_mode: boolean | null
          notifications_enabled: boolean | null
          require_national_id: boolean | null
          updated_at: string
          working_days: number[] | null
          working_hours_end: string | null
          working_hours_start: string | null
        }
        Insert: {
          break_end?: string | null
          break_start?: string | null
          id?: string
          multi_doctor_mode?: boolean | null
          notifications_enabled?: boolean | null
          require_national_id?: boolean | null
          updated_at?: string
          working_days?: number[] | null
          working_hours_end?: string | null
          working_hours_start?: string | null
        }
        Update: {
          break_end?: string | null
          break_start?: string | null
          id?: string
          multi_doctor_mode?: boolean | null
          notifications_enabled?: boolean | null
          require_national_id?: boolean | null
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
          phone: string
          practice_area: string
          preferred_date: string | null
          preferred_time: string | null
          scheduled_at: string | null
          status: string | null
          updated_at: string
        }
        Insert: {
          admin_notes?: string | null
          appointment_type_id?: string | null
          attended?: boolean | null
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
          phone: string
          practice_area: string
          preferred_date?: string | null
          preferred_time?: string | null
          scheduled_at?: string | null
          status?: string | null
          updated_at?: string
        }
        Update: {
          admin_notes?: string | null
          appointment_type_id?: string | null
          attended?: boolean | null
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
          phone?: string
          practice_area?: string
          preferred_date?: string | null
          preferred_time?: string | null
          scheduled_at?: string | null
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
        ]
      }
      doctors: {
        Row: {
          created_at: string
          email: string | null
          id: string
          is_active: boolean | null
          name: string
          phone: string | null
          specialization: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          phone?: string | null
          specialization?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          phone?: string | null
          specialization?: string | null
          updated_at?: string
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
