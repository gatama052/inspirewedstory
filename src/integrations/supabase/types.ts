export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.15"
  }
  public: {
    Tables: {
      clients: {
        Row: {
          auth_user_id: string
          created_at: string
          email: string
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          auth_user_id: string
          created_at?: string
          email: string
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          auth_user_id?: string
          created_at?: string
          email?: string
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      guests: {
        Row: {
          code: string
          created_at: string
          id: string
          invitation_id: string
          name: string
        }
        Insert: {
          code: string
          created_at?: string
          id?: string
          invitation_id: string
          name: string
        }
        Update: {
          code?: string
          created_at?: string
          id?: string
          invitation_id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "guests_invitation_id_fkey"
            columns: ["invitation_id"]
            isOneToOne: false
            referencedRelation: "invitations"
            referencedColumns: ["id"]
          },
        ]
      }
      invitation_content: {
        Row: {
          akad_address: string
          akad_date: string
          akad_day: string
          akad_maps_url: string
          akad_month: string
          akad_place: string
          akad_time: string
          akad_title: string
          bride_father: string
          bride_full_name: string
          bride_mother: string
          bride_name: string
          bride_photo_url: string
          couple_photo_url: string
          created_at: string
          gift_account: string
          gift_address: string
          gift_address_name: string
          gift_bank: string
          gift_holder: string
          groom_father: string
          groom_full_name: string
          groom_mother: string
          groom_name: string
          groom_photo_url: string
          id: string
          invitation_id: string
          love_story: Json
          opening_date_label: string
          opening_greeting: string
          opening_title: string
          qris_url: string
          quote_arabic: string
          quote_source: string
          quote_translation: string
          reception_address: string
          reception_date: string
          reception_day: string
          reception_maps_url: string
          reception_month: string
          reception_place: string
          reception_time: string
          reception_title: string
          updated_at: string
          wedding_date: string
        }
        Insert: {
          akad_address?: string
          akad_date?: string
          akad_day?: string
          akad_maps_url?: string
          akad_month?: string
          akad_place?: string
          akad_time?: string
          akad_title?: string
          bride_father?: string
          bride_full_name?: string
          bride_mother?: string
          bride_name?: string
          bride_photo_url?: string
          couple_photo_url?: string
          created_at?: string
          gift_account?: string
          gift_address?: string
          gift_address_name?: string
          gift_bank?: string
          gift_holder?: string
          groom_father?: string
          groom_full_name?: string
          groom_mother?: string
          groom_name?: string
          groom_photo_url?: string
          id?: string
          invitation_id: string
          love_story?: Json
          opening_date_label?: string
          opening_greeting?: string
          opening_title?: string
          qris_url?: string
          quote_arabic?: string
          quote_source?: string
          quote_translation?: string
          reception_address?: string
          reception_date?: string
          reception_day?: string
          reception_maps_url?: string
          reception_month?: string
          reception_place?: string
          reception_time?: string
          reception_title?: string
          updated_at?: string
          wedding_date?: string
        }
        Update: {
          akad_address?: string
          akad_date?: string
          akad_day?: string
          akad_maps_url?: string
          akad_month?: string
          akad_place?: string
          akad_time?: string
          akad_title?: string
          bride_father?: string
          bride_full_name?: string
          bride_mother?: string
          bride_name?: string
          bride_photo_url?: string
          couple_photo_url?: string
          created_at?: string
          gift_account?: string
          gift_address?: string
          gift_address_name?: string
          gift_bank?: string
          gift_holder?: string
          groom_father?: string
          groom_full_name?: string
          groom_mother?: string
          groom_name?: string
          groom_photo_url?: string
          id?: string
          invitation_id?: string
          love_story?: Json
          opening_date_label?: string
          opening_greeting?: string
          opening_title?: string
          qris_url?: string
          quote_arabic?: string
          quote_source?: string
          quote_translation?: string
          reception_address?: string
          reception_date?: string
          reception_day?: string
          reception_maps_url?: string
          reception_month?: string
          reception_place?: string
          reception_time?: string
          reception_title?: string
          updated_at?: string
          wedding_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "invitation_content_invitation_id_fkey"
            columns: ["invitation_id"]
            isOneToOne: true
            referencedRelation: "invitations"
            referencedColumns: ["id"]
          },
        ]
      }
      invitation_photos: {
        Row: {
          created_at: string
          id: string
          image_url: string
          invitation_id: string
          sort_order: number
          type: string
        }
        Insert: {
          created_at?: string
          id?: string
          image_url: string
          invitation_id: string
          sort_order?: number
          type?: string
        }
        Update: {
          created_at?: string
          id?: string
          image_url?: string
          invitation_id?: string
          sort_order?: number
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "invitation_photos_invitation_id_fkey"
            columns: ["invitation_id"]
            isOneToOne: false
            referencedRelation: "invitations"
            referencedColumns: ["id"]
          },
        ]
      }
      invitations: {
        Row: {
          client_id: string
          created_at: string
          id: string
          music_url: string
          slug: string
          theme: string
          updated_at: string
        }
        Insert: {
          client_id: string
          created_at?: string
          id?: string
          music_url?: string
          slug: string
          theme?: string
          updated_at?: string
        }
        Update: {
          client_id?: string
          created_at?: string
          id?: string
          music_url?: string
          slug?: string
          theme?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "invitations_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      rsvps: {
        Row: {
          attendance: string
          created_at: string
          guest_count: number
          guest_id: string
          guest_name: string
          id: string
          invitation_id: string
          message: string
        }
        Insert: {
          attendance: string
          created_at?: string
          guest_count?: number
          guest_id: string
          guest_name?: string
          id?: string
          invitation_id: string
          message?: string
        }
        Update: {
          attendance?: string
          created_at?: string
          guest_count?: number
          guest_id?: string
          guest_name?: string
          id?: string
          invitation_id?: string
          message?: string
        }
        Relationships: [
          {
            foreignKeyName: "rsvps_guest_id_fkey"
            columns: ["guest_id"]
            isOneToOne: false
            referencedRelation: "guests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rsvps_invitation_id_fkey"
            columns: ["invitation_id"]
            isOneToOne: false
            referencedRelation: "invitations"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_guest_by_code: {
        Args: { _code: string; _slug: string }
        Returns: {
          id: string
          invitation_id: string
          name: string
        }[]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      owns_invitation: { Args: { _invitation_id: string }; Returns: boolean }
    }
    Enums: {
      app_role: "admin"
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
    Enums: {
      app_role: ["admin"],
    },
  },
} as const
