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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      announcements: {
        Row: {
          body: string
          created_at: string
          id: string
          kind: string
          pinned: boolean
          title: string
        }
        Insert: {
          body: string
          created_at?: string
          id?: string
          kind?: string
          pinned?: boolean
          title: string
        }
        Update: {
          body?: string
          created_at?: string
          id?: string
          kind?: string
          pinned?: boolean
          title?: string
        }
        Relationships: []
      }
      mission_completions: {
        Row: {
          created_at: string
          day: number
          id: string
          mission_key: string
          note: string | null
          user_id: string
          xp: number
        }
        Insert: {
          created_at?: string
          day?: number
          id?: string
          mission_key: string
          note?: string | null
          user_id: string
          xp?: number
        }
        Update: {
          created_at?: string
          day?: number
          id?: string
          mission_key?: string
          note?: string | null
          user_id?: string
          xp?: number
        }
        Relationships: []
      }
      notifications: {
        Row: {
          body: string
          created_at: string
          id: string
          kind: string
          read_at: string | null
          title: string
          user_id: string
        }
        Insert: {
          body?: string
          created_at?: string
          id?: string
          kind?: string
          read_at?: string | null
          title: string
          user_id: string
        }
        Update: {
          body?: string
          created_at?: string
          id?: string
          kind?: string
          read_at?: string | null
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          ca_level: string
          city: string | null
          created_at: string
          email: string | null
          favourite_memory: string | null
          full_name: string
          id: string
          participant_id: string
          season: string
          streak: number
          updated_at: string
          xp: number
        }
        Insert: {
          avatar_url?: string | null
          ca_level?: string
          city?: string | null
          created_at?: string
          email?: string | null
          favourite_memory?: string | null
          full_name?: string
          id: string
          participant_id?: string
          season?: string
          streak?: number
          updated_at?: string
          xp?: number
        }
        Update: {
          avatar_url?: string | null
          ca_level?: string
          city?: string | null
          created_at?: string
          email?: string | null
          favourite_memory?: string | null
          full_name?: string
          id?: string
          participant_id?: string
          season?: string
          streak?: number
          updated_at?: string
          xp?: number
        }
        Relationships: []
      }
      public_profiles: {
        Row: {
          avatar_url: string | null
          ca_level: string
          city: string | null
          full_name: string
          id: string
          participant_id: string
          streak: number
          xp: number
        }
        Insert: {
          avatar_url?: string | null
          ca_level?: string
          city?: string | null
          full_name?: string
          id: string
          participant_id?: string
          streak?: number
          xp?: number
        }
        Update: {
          avatar_url?: string | null
          ca_level?: string
          city?: string | null
          full_name?: string
          id?: string
          participant_id?: string
          streak?: number
          xp?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      registrations: {
        Row: {
          admin_note: string | null
          ca_level: string | null
          city: string | null
          college: string | null
          consent: boolean
          created_at: string
          email: string
          full_name: string
          id: string
          phone: string | null
          registration_no: string
          source: string
          status: string
          updated_at: string
          user_id: string | null
          verified: boolean
        }
        Insert: {
          admin_note?: string | null
          ca_level?: string | null
          city?: string | null
          college?: string | null
          consent?: boolean
          created_at?: string
          email: string
          full_name: string
          id?: string
          phone?: string | null
          registration_no?: string
          source?: string
          status?: string
          updated_at?: string
          user_id?: string | null
          verified?: boolean
        }
        Update: {
          admin_note?: string | null
          ca_level?: string | null
          city?: string | null
          college?: string | null
          consent?: boolean
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          phone?: string | null
          registration_no?: string
          source?: string
          status?: string
          updated_at?: string
          user_id?: string | null
          verified?: boolean
        }
        Relationships: []
      }
      seasons: {
        Row: {
          active: boolean
          created_at: string
          default_hashtag: string
          description: string
          ends_at: string
          id: string
          instagram_handle: string
          name: string
          slug: string
          starts_at: string
          story_instructions: string
          tagline: string
          theme: string
          timezone: string
          total_days: number
          updated_at: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          default_hashtag?: string
          description?: string
          ends_at?: string
          id?: string
          instagram_handle?: string
          name: string
          slug: string
          starts_at?: string
          story_instructions?: string
          tagline?: string
          theme?: string
          timezone?: string
          total_days?: number
          updated_at?: string
        }
        Update: {
          active?: boolean
          created_at?: string
          default_hashtag?: string
          description?: string
          ends_at?: string
          id?: string
          instagram_handle?: string
          name?: string
          slug?: string
          starts_at?: string
          story_instructions?: string
          tagline?: string
          theme?: string
          timezone?: string
          total_days?: number
          updated_at?: string
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          banner_cta_href: string
          banner_cta_label: string
          banner_enabled: boolean
          banner_text: string
          contact_email: string
          contact_phone: string
          countdown_label: string
          countdown_target: string | null
          created_at: string
          cta_primary_label: string
          cta_primary_to: string
          cta_secondary_label: string
          cta_secondary_to: string
          event_description: string
          event_ends_at: string | null
          event_name: string
          event_starts_at: string | null
          event_status: string
          featured_note: string
          footer_note: string
          hero_eyebrow: string
          hero_heading: string
          hero_highlight: string
          hero_subheading: string
          hero_tagline: string
          id: string
          important_instructions: string
          instagram_url: string
          linkedin_url: string
          notices: string[]
          registration_button_label: string
          registration_button_visible: boolean
          registration_closes_at: string | null
          registration_limit: number
          registration_opens_at: string | null
          registration_status: string
          registration_url: string | null
          season_name: string
          stats: Json
          updated_at: string
          venue_info: string
          whatsapp_url: string
          youtube_url: string
        }
        Insert: {
          banner_cta_href?: string
          banner_cta_label?: string
          banner_enabled?: boolean
          banner_text?: string
          contact_email?: string
          contact_phone?: string
          countdown_label?: string
          countdown_target?: string | null
          created_at?: string
          cta_primary_label?: string
          cta_primary_to?: string
          cta_secondary_label?: string
          cta_secondary_to?: string
          event_description?: string
          event_ends_at?: string | null
          event_name?: string
          event_starts_at?: string | null
          event_status?: string
          featured_note?: string
          footer_note?: string
          hero_eyebrow?: string
          hero_heading?: string
          hero_highlight?: string
          hero_subheading?: string
          hero_tagline?: string
          id?: string
          important_instructions?: string
          instagram_url?: string
          linkedin_url?: string
          notices?: string[]
          registration_button_label?: string
          registration_button_visible?: boolean
          registration_closes_at?: string | null
          registration_limit?: number
          registration_opens_at?: string | null
          registration_status?: string
          registration_url?: string | null
          season_name?: string
          stats?: Json
          updated_at?: string
          venue_info?: string
          whatsapp_url?: string
          youtube_url?: string
        }
        Update: {
          banner_cta_href?: string
          banner_cta_label?: string
          banner_enabled?: boolean
          banner_text?: string
          contact_email?: string
          contact_phone?: string
          countdown_label?: string
          countdown_target?: string | null
          created_at?: string
          cta_primary_label?: string
          cta_primary_to?: string
          cta_secondary_label?: string
          cta_secondary_to?: string
          event_description?: string
          event_ends_at?: string | null
          event_name?: string
          event_starts_at?: string | null
          event_status?: string
          featured_note?: string
          footer_note?: string
          hero_eyebrow?: string
          hero_heading?: string
          hero_highlight?: string
          hero_subheading?: string
          hero_tagline?: string
          id?: string
          important_instructions?: string
          instagram_url?: string
          linkedin_url?: string
          notices?: string[]
          registration_button_label?: string
          registration_button_visible?: boolean
          registration_closes_at?: string | null
          registration_limit?: number
          registration_opens_at?: string | null
          registration_status?: string
          registration_url?: string | null
          season_name?: string
          stats?: Json
          updated_at?: string
          venue_info?: string
          whatsapp_url?: string
          youtube_url?: string
        }
        Relationships: []
      }
      submission_vote_counts: {
        Row: {
          submission_id: string
          vote_count: number
        }
        Insert: {
          submission_id: string
          vote_count?: number
        }
        Update: {
          submission_id?: string
          vote_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "submission_vote_counts_submission_id_fkey"
            columns: ["submission_id"]
            isOneToOne: true
            referencedRelation: "submissions"
            referencedColumns: ["id"]
          },
        ]
      }
      submissions: {
        Row: {
          category: string
          challenge_key: string
          created_at: string
          featured: boolean
          id: string
          media_kind: string
          media_url: string | null
          review_note: string | null
          status: string
          story: string | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          category?: string
          challenge_key?: string
          created_at?: string
          featured?: boolean
          id?: string
          media_kind?: string
          media_url?: string | null
          review_note?: string | null
          status?: string
          story?: string | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          category?: string
          challenge_key?: string
          created_at?: string
          featured?: boolean
          id?: string
          media_kind?: string
          media_url?: string | null
          review_note?: string | null
          status?: string
          story?: string | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      unwind_activities: {
        Row: {
          accent: string
          active: boolean
          bulk_approvable: boolean
          caption_template: string
          closes_at: string | null
          created_at: string
          day: number
          difficulty: string
          estimated_minutes: number
          extra_requirements: string | null
          feed_post_accepted: boolean
          hashtag: string
          icon: string
          id: string
          instructions: string
          intro: string
          kind: string
          link_required: boolean
          mission_key: string
          opens_at: string | null
          outcome: string
          platform: string
          reel_accepted: boolean
          rules: string[]
          season_id: string | null
          sort_order: number
          story_required: boolean
          story_template_url: string | null
          submission_type: string
          tag_account: string
          title: string | null
          updated_at: string
          why_it_exists: string
          xp: number
          xp_override: number | null
        }
        Insert: {
          accent?: string
          active?: boolean
          bulk_approvable?: boolean
          caption_template?: string
          closes_at?: string | null
          created_at?: string
          day: number
          difficulty?: string
          estimated_minutes?: number
          extra_requirements?: string | null
          feed_post_accepted?: boolean
          hashtag?: string
          icon?: string
          id?: string
          instructions?: string
          intro?: string
          kind?: string
          link_required?: boolean
          mission_key: string
          opens_at?: string | null
          outcome?: string
          platform?: string
          reel_accepted?: boolean
          rules?: string[]
          season_id?: string | null
          sort_order?: number
          story_required?: boolean
          story_template_url?: string | null
          submission_type?: string
          tag_account?: string
          title?: string | null
          updated_at?: string
          why_it_exists?: string
          xp?: number
          xp_override?: number | null
        }
        Update: {
          accent?: string
          active?: boolean
          bulk_approvable?: boolean
          caption_template?: string
          closes_at?: string | null
          created_at?: string
          day?: number
          difficulty?: string
          estimated_minutes?: number
          extra_requirements?: string | null
          feed_post_accepted?: boolean
          hashtag?: string
          icon?: string
          id?: string
          instructions?: string
          intro?: string
          kind?: string
          link_required?: boolean
          mission_key?: string
          opens_at?: string | null
          outcome?: string
          platform?: string
          reel_accepted?: boolean
          rules?: string[]
          season_id?: string | null
          sort_order?: number
          story_required?: boolean
          story_template_url?: string | null
          submission_type?: string
          tag_account?: string
          title?: string | null
          updated_at?: string
          why_it_exists?: string
          xp?: number
          xp_override?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "unwind_activities_season_id_fkey"
            columns: ["season_id"]
            isOneToOne: false
            referencedRelation: "seasons"
            referencedColumns: ["id"]
          },
        ]
      }
      unwind_submissions: {
        Row: {
          created_at: string
          day: number
          id: string
          mission_key: string
          mission_title: string
          note: string | null
          platform: string
          proof_path: string | null
          review_note: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          status: string
          story_link: string | null
          updated_at: string
          user_id: string
          xp: number
        }
        Insert: {
          created_at?: string
          day: number
          id?: string
          mission_key: string
          mission_title?: string
          note?: string | null
          platform?: string
          proof_path?: string | null
          review_note?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
          story_link?: string | null
          updated_at?: string
          user_id: string
          xp?: number
        }
        Update: {
          created_at?: string
          day?: number
          id?: string
          mission_key?: string
          mission_title?: string
          note?: string | null
          platform?: string
          proof_path?: string | null
          review_note?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
          story_link?: string | null
          updated_at?: string
          user_id?: string
          xp?: number
        }
        Relationships: []
      }
      user_badges: {
        Row: {
          badge_key: string
          earned_at: string
          id: string
          user_id: string
        }
        Insert: {
          badge_key: string
          earned_at?: string
          id?: string
          user_id: string
        }
        Update: {
          badge_key?: string
          earned_at?: string
          id?: string
          user_id?: string
        }
        Relationships: []
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
      votes: {
        Row: {
          created_at: string
          id: string
          submission_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          submission_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          submission_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "votes_submission_id_fkey"
            columns: ["submission_id"]
            isOneToOne: false
            referencedRelation: "submissions"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      register_participant: {
        Args: {
          _ca_level?: string
          _city?: string
          _college?: string
          _consent?: boolean
          _email: string
          _full_name: string
          _phone?: string
        }
        Returns: Json
      }
      registration_count: { Args: never; Returns: number }
    }
    Enums: {
      app_role: "admin" | "team" | "participant"
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
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
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
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
      app_role: ["admin", "team", "participant"],
    },
  },
} as const
