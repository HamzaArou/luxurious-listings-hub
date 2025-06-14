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
      interest_forms: {
        Row: {
          created_at: string
          email: string
          full_name: string
          id: string
          phone: string
          project_id: string | null
        }
        Insert: {
          created_at?: string
          email: string
          full_name: string
          id?: string
          phone: string
          project_id?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          phone?: string
          project_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "interest_forms_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      login_attempts: {
        Row: {
          attempt_time: string
          email: string
          id: string
          ip_address: string
        }
        Insert: {
          attempt_time?: string
          email: string
          id?: string
          ip_address: string
        }
        Update: {
          attempt_time?: string
          email?: string
          id?: string
          ip_address?: string
        }
        Relationships: []
      }
      news: {
        Row: {
          created_at: string
          description: string
          id: string
          image: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          image: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          image?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string
          username: string
        }
        Insert: {
          created_at?: string
          id: string
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
          username: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
          username?: string
        }
        Relationships: []
      }
      project_360_views: {
        Row: {
          created_at: string
          id: string
          project_id: string | null
          title: string
          url: string
        }
        Insert: {
          created_at?: string
          id?: string
          project_id?: string | null
          title: string
          url: string
        }
        Update: {
          created_at?: string
          id?: string
          project_id?: string | null
          title?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_360_views_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_details: {
        Row: {
          created_at: string
          description: string | null
          features: string[] | null
          guarantees: string[] | null
          id: string
          project_id: string | null
          specifications: string[] | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          features?: string[] | null
          guarantees?: string[] | null
          id?: string
          project_id?: string | null
          specifications?: string[] | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          features?: string[] | null
          guarantees?: string[] | null
          id?: string
          project_id?: string | null
          specifications?: string[] | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_details_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_images: {
        Row: {
          content_type: string
          created_at: string
          id: string
          media_type: string
          media_url: string
          project_id: string | null
        }
        Insert: {
          content_type: string
          created_at?: string
          id?: string
          media_type?: string
          media_url: string
          project_id?: string | null
        }
        Update: {
          content_type?: string
          created_at?: string
          id?: string
          media_type?: string
          media_url?: string
          project_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "project_images_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_plans: {
        Row: {
          created_at: string
          file_url: string
          id: string
          project_id: string | null
        }
        Insert: {
          created_at?: string
          file_url: string
          id?: string
          project_id?: string | null
        }
        Update: {
          created_at?: string
          file_url?: string
          id?: string
          project_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "project_plans_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_units: {
        Row: {
          area: number
          bathrooms: number | null
          bedrooms: number | null
          created_at: string
          details: Json | null
          floor_number: number | null
          id: string
          name: string
          price: number | null
          project_id: string | null
          rooms: number | null
          side: string | null
          status: string | null
          unit_number: number | null
          unit_type: string | null
          updated_at: string
        }
        Insert: {
          area: number
          bathrooms?: number | null
          bedrooms?: number | null
          created_at?: string
          details?: Json | null
          floor_number?: number | null
          id?: string
          name: string
          price?: number | null
          project_id?: string | null
          rooms?: number | null
          side?: string | null
          status?: string | null
          unit_number?: number | null
          unit_type?: string | null
          updated_at?: string
        }
        Update: {
          area?: number
          bathrooms?: number | null
          bedrooms?: number | null
          created_at?: string
          details?: Json | null
          floor_number?: number | null
          id?: string
          name?: string
          price?: number | null
          project_id?: string | null
          rooms?: number | null
          side?: string | null
          status?: string | null
          unit_number?: number | null
          unit_type?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_units_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_updates: {
        Row: {
          created_at: string
          id: string
          project_id: string | null
          status: string
          unit_number: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          project_id?: string | null
          status: string
          unit_number: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          project_id?: string | null
          status?: string
          unit_number?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_updates_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          address: string | null
          created_at: string
          floors: number
          id: string
          lat: number | null
          lng: number | null
          location: string
          name: string
          price: number | null
          price_roof: number | null
          price_single_street: number | null
          side: string | null
          status: Database["public"]["Enums"]["project_status"]
          thumbnail_url: string
          units: number
          updated_at: string
        }
        Insert: {
          address?: string | null
          created_at?: string
          floors: number
          id?: string
          lat?: number | null
          lng?: number | null
          location: string
          name: string
          price?: number | null
          price_roof?: number | null
          price_single_street?: number | null
          side?: string | null
          status?: Database["public"]["Enums"]["project_status"]
          thumbnail_url: string
          units: number
          updated_at?: string
        }
        Update: {
          address?: string | null
          created_at?: string
          floors?: number
          id?: string
          lat?: number | null
          lng?: number | null
          location?: string
          name?: string
          price?: number | null
          price_roof?: number | null
          price_single_street?: number | null
          side?: string | null
          status?: Database["public"]["Enums"]["project_status"]
          thumbnail_url?: string
          units?: number
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: {
        Args: {
          user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      project_status: "بدأ البيع" | "تم البيع بالكامل" | "قريباً"
      user_role: "admin" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
