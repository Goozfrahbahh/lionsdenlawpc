import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';



export type IntakeLeadInsert = {
  first_name: string;
  last_name: string;
  phone_number: string;
  zip_code: string | null;
  email: string;
  case_type: string | null;
  description: string | null;
  consent: boolean;
};

@Injectable({ providedIn: 'root' })
export class SupabaseService {
  private supabase: SupabaseClient;

  // ✅ Put your PUBLIC anon key here (safe in frontend)
  private supabaseUrl = environment.supabaseUrl;
  private supabaseKey = environment.supabaseKey;

  constructor() {
    this.supabase = createClient(this.supabaseUrl, this.supabaseKey);
  }

  async createLead(payload: IntakeLeadInsert) {
    const { data, error } = await this.supabase
      .from('intake_leads')
      .insert([payload])
      .select('id')
      .single();

    if (error) throw error;
    return data; // { id: ... }
  }
}
