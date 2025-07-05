import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon, Clock } from "lucide-react";
import { format } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

interface AppointmentType {
  id: string;
  name_en: string;
  name_ar: string;
  name_fr: string;
  duration_minutes: number;
  color: string;
}

interface Doctor {
  id: string;
  name: string;
  specialization: string;
}

interface ClinicSettings {
  multi_doctor_mode: boolean;
  require_national_id: boolean;
  working_hours_start: string;
  working_hours_end: string;
  break_start: string;
  break_end: string;
}

const AppointmentBooking = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [appointmentTypes, setAppointmentTypes] = useState<AppointmentType[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [clinicSettings, setClinicSettings] = useState<ClinicSettings | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    national_id: '',
    appointment_type_id: '',
    doctor_id: '',
    preferred_date: '',
    preferred_time: '',
    message: ''
  });

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      // Fetch appointment types
      const { data: types } = await supabase
        .from('appointment_types')
        .select('*')
        .eq('is_active', true);
      
      if (types) setAppointmentTypes(types);

      // Fetch doctors
      const { data: doctorsData } = await supabase
        .from('doctors')
        .select('*')
        .eq('is_active', true);
      
      if (doctorsData) setDoctors(doctorsData);

      // Fetch clinic settings
      const { data: settings } = await supabase
        .from('clinic_settings')
        .select('*')
        .single();
      
      if (settings) setClinicSettings(settings);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const generateTimeSlots = (date: Date) => {
    if (!clinicSettings) return [];
    
    const slots = [];
    const startTime = new Date(`${format(date, 'yyyy-MM-dd')}T${clinicSettings.working_hours_start}`);
    const endTime = new Date(`${format(date, 'yyyy-MM-dd')}T${clinicSettings.working_hours_end}`);
    const breakStart = new Date(`${format(date, 'yyyy-MM-dd')}T${clinicSettings.break_start}`);
    const breakEnd = new Date(`${format(date, 'yyyy-MM-dd')}T${clinicSettings.break_end}`);
    
    let currentTime = new Date(startTime);
    
    while (currentTime < endTime) {
      // Skip break time
      if (currentTime >= breakStart && currentTime < breakEnd) {
        currentTime = new Date(breakEnd);
        continue;
      }
      
      slots.push(format(currentTime, 'HH:mm'));
      currentTime.setMinutes(currentTime.getMinutes() + 30);
    }
    
    return slots;
  };

  useEffect(() => {
    if (selectedDate) {
      const slots = generateTimeSlots(selectedDate);
      setAvailableSlots(slots);
      setFormData(prev => ({ ...prev, preferred_date: format(selectedDate, 'yyyy-MM-dd') }));
    }
  }, [selectedDate, clinicSettings]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // First, create or update patient record
      const { data: existingPatient } = await supabase
        .from('patients')
        .select('*')
        .eq('phone', formData.phone)
        .single();

      let patientId = existingPatient?.id;

      if (!existingPatient) {
        const { data: newPatient, error: patientError } = await supabase
          .from('patients')
          .insert({
            name: formData.name,
            phone: formData.phone,
            email: formData.email || null,
            national_id: formData.national_id || null
          })
          .select()
          .single();

        if (patientError) throw patientError;
        patientId = newPatient.id;
      }

      // Create appointment
      const selectedType = appointmentTypes.find(t => t.id === formData.appointment_type_id);
      
      const { error: appointmentError } = await supabase
        .from('consultations')
        .insert({
          name: formData.name,
          phone: formData.phone,
          email: formData.email || null,
          practice_area: selectedType?.name_en || 'General',
          appointment_type_id: formData.appointment_type_id,
          doctor_id: formData.doctor_id || null,
          national_id: formData.national_id || null,
          preferred_date: formData.preferred_date,
          preferred_time: formData.preferred_time,
          message: formData.message || null,
          duration_minutes: selectedType?.duration_minutes || 30,
          language: language,
          status: 'pending'
        });

      if (appointmentError) throw appointmentError;

      toast({
        title: "Success",
        description: t('booking.success'),
      });

      // Reset form
      setFormData({
        name: '',
        phone: '',
        email: '',
        national_id: '',
        appointment_type_id: '',
        doctor_id: '',
        preferred_date: '',
        preferred_time: '',
        message: ''
      });
      setSelectedDate(undefined);

    } catch (error) {
      console.error('Error booking appointment:', error);
      toast({
        title: "Error",
        description: t('booking.error'),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getAppointmentTypeName = (type: AppointmentType) => {
    switch (language) {
      case 'ar': return type.name_ar || type.name_en;
      case 'fr': return type.name_fr || type.name_en;
      default: return type.name_en;
    }
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl text-center">{t('booking.title')}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">{t('booking.name')} *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">{t('booking.phone')} *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">{t('booking.email')}</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
                {clinicSettings?.require_national_id && (
                  <div>
                    <Label htmlFor="national_id">{t('booking.nationalId')} *</Label>
                    <Input
                      id="national_id"
                      value={formData.national_id}
                      onChange={(e) => setFormData(prev => ({ ...prev, national_id: e.target.value }))}
                      required={clinicSettings.require_national_id}
                    />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>{t('booking.appointmentType')} *</Label>
                  <Select 
                    value={formData.appointment_type_id} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, appointment_type_id: value }))}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t('booking.appointmentType')} />
                    </SelectTrigger>
                    <SelectContent>
                      {appointmentTypes.map((type) => (
                        <SelectItem key={type.id} value={type.id}>
                          <div className="flex items-center gap-2">
                            <div 
                              className="w-3 h-3 rounded-full" 
                              style={{ backgroundColor: type.color }}
                            />
                            {getAppointmentTypeName(type)} ({type.duration_minutes}min)
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {clinicSettings?.multi_doctor_mode && (
                  <div>
                    <Label>{t('booking.doctor')}</Label>
                    <Select 
                      value={formData.doctor_id} 
                      onValueChange={(value) => setFormData(prev => ({ ...prev, doctor_id: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={t('booking.doctor')} />
                      </SelectTrigger>
                      <SelectContent>
                        {doctors.map((doctor) => (
                          <SelectItem key={doctor.id} value={doctor.id}>
                            {doctor.name} - {doctor.specialization}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>{t('booking.date')} *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, "PPP") : t('booking.date')}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <Label>{t('booking.time')} *</Label>
                  <Select 
                    value={formData.preferred_time} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, preferred_time: value }))}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t('booking.time')} />
                    </SelectTrigger>
                    <SelectContent>
                      {availableSlots.map((slot) => (
                        <SelectItem key={slot} value={slot}>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            {slot}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="message">{t('booking.message')}</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  rows={3}
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Loading...' : t('booking.submit')}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AppointmentBooking;