import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, Settings, FileText, Clock, Phone, Mail, CheckCircle, XCircle, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import AdminLogin from "@/components/AdminLogin";
import BlogManager from "@/components/BlogManager";
import DoctorManager from "@/components/DoctorManager";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Appointment {
  id: string;
  name: string;
  phone: string;
  email: string;
  preferred_date: string;
  preferred_time: string;
  status: string;
  created_at: string;
  appointment_types?: {
    name_en: string;
    color: string;
  } | null;
  doctors?: {
    name: string;
  } | null;
}

interface ClinicSettings {
  id: string;
  multi_doctor_mode: boolean;
  require_national_id: boolean;
  notifications_enabled: boolean;
  working_hours_start: string;
  working_hours_end: string;
  break_start: string;
  break_end: string;
}

const Admin = () => {
  const { toast } = useToast();
  const { user, isLoading, logout } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [settings, setSettings] = useState<ClinicSettings | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchAppointments();
      fetchSettings();
    }
  }, [user]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <AdminLogin />;
  }

  const fetchAppointments = async () => {
    try {
      const { data, error } = await supabase
        .from('consultations')
        .select(`
          *,
          appointment_types (name_en, color),
          doctors (name)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAppointments((data as any) || []);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      toast({
        title: "Error",
        description: "Failed to fetch appointments",
        variant: "destructive",
      });
    }
  };

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('clinic_settings')
        .select('*')
        .single();

      if (error) throw error;
      setSettings(data);
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  };

  const updateAppointmentStatus = async (appointmentId: string, status: string, attended?: boolean) => {
    try {
      const updateData: any = { status };
      if (attended !== undefined) {
        updateData.attended = attended;
      }

      const { error } = await supabase
        .from('consultations')
        .update(updateData)
        .eq('id', appointmentId);

      if (error) throw error;

      // If marking as no-show, update patient's no-show count
      if (attended === false) {
        const appointment = appointments.find(a => a.id === appointmentId);
        if (appointment) {
          // Get current patient data and increment no-show count
          const { data: existingPatient } = await supabase
            .from('patients')
            .select('no_show_count')
            .eq('phone', appointment.phone)
            .single();
          
          if (existingPatient) {
            const { error: patientError } = await supabase
              .from('patients')
              .update({ no_show_count: (existingPatient.no_show_count || 0) + 1 })
              .eq('phone', appointment.phone);
            
            if (patientError) console.error('Error updating no-show count:', patientError);
          }
        }
      }

      fetchAppointments();
      toast({
        title: "Success",
        description: "Appointment status updated",
      });
    } catch (error) {
      console.error('Error updating appointment:', error);
      toast({
        title: "Error",
        description: "Failed to update appointment",
        variant: "destructive",
      });
    }
  };

  const updateSettings = async (newSettings: Partial<ClinicSettings>) => {
    if (!settings) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('clinic_settings')
        .update(newSettings)
        .eq('id', settings.id);

      if (error) throw error;

      setSettings({ ...settings, ...newSettings });
      toast({
        title: "Success",
        description: "Settings updated successfully",
      });
    } catch (error) {
      console.error('Error updating settings:', error);
      toast({
        title: "Error",
        description: "Failed to update settings",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, any> = {
      pending: { variant: "secondary", label: "Pending" },
      confirmed: { variant: "default", label: "Confirmed" },
      completed: { variant: "default", label: "Completed" },
      cancelled: { variant: "destructive", label: "Cancelled" },
      no_show: { variant: "destructive", label: "No Show" }
    };

    const config = variants[status] || variants.pending;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {user.name}</p>
          </div>
          <Button variant="outline" onClick={logout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        <Tabs defaultValue="appointments" className="space-y-6">
          <div className="overflow-x-auto">
            <TabsList className="grid w-full grid-cols-5 min-w-fit">
              <TabsTrigger value="appointments" className="flex items-center gap-2 whitespace-nowrap">
                <Calendar className="w-4 h-4" />
                <span className="hidden sm:inline">Appointments</span>
              </TabsTrigger>
              <TabsTrigger value="doctors" className="flex items-center gap-2 whitespace-nowrap">
                <Users className="w-4 h-4" />
                <span className="hidden sm:inline">Doctors</span>
              </TabsTrigger>
              <TabsTrigger value="blog" className="flex items-center gap-2 whitespace-nowrap">
                <FileText className="w-4 h-4" />
                <span className="hidden sm:inline">Blog</span>
              </TabsTrigger>
              <TabsTrigger value="patients" className="flex items-center gap-2 whitespace-nowrap">
                <Users className="w-4 h-4" />
                <span className="hidden sm:inline">Patients</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2 whitespace-nowrap">
                <Settings className="w-4 h-4" />
                <span className="hidden sm:inline">Settings</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="appointments">
            <Card>
              <CardHeader>
                <CardTitle>Recent Appointments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="min-w-[150px]">Patient</TableHead>
                        <TableHead className="min-w-[120px]">Contact</TableHead>
                        <TableHead className="min-w-[150px]">Appointment</TableHead>
                        <TableHead className="min-w-[150px]">Date & Time</TableHead>
                        <TableHead className="min-w-[100px]">Status</TableHead>
                        <TableHead className="min-w-[200px]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                  <TableBody>
                    {appointments.map((appointment) => (
                      <TableRow key={appointment.id}>
                        <TableCell className="font-medium">{appointment.name}</TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center gap-1 text-sm">
                              <Phone className="w-3 h-3" />
                              {appointment.phone}
                            </div>
                            {appointment.email && (
                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <Mail className="w-3 h-3" />
                                {appointment.email}
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {appointment.appointment_types && (
                              <>
                                <div 
                                  className="w-3 h-3 rounded-full" 
                                  style={{ backgroundColor: appointment.appointment_types.color }}
                                />
                                {appointment.appointment_types.name_en}
                              </>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-sm">
                            <Clock className="w-3 h-3" />
                            {appointment.preferred_date} at {appointment.preferred_time}
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(appointment.status)}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Select
                              value={appointment.status}
                              onValueChange={(value) => updateAppointmentStatus(appointment.id, value)}
                            >
                              <SelectTrigger className="w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="confirmed">Confirmed</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                                <SelectItem value="cancelled">Cancelled</SelectItem>
                                <SelectItem value="no_show">No Show</SelectItem>
                              </SelectContent>
                            </Select>
                            {appointment.status === 'confirmed' && (
                              <div className="flex gap-1">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => updateAppointmentStatus(appointment.id, 'completed', true)}
                                >
                                  <CheckCircle className="w-4 h-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => updateAppointmentStatus(appointment.id, 'no_show', false)}
                                >
                                  <XCircle className="w-4 h-4" />
                                </Button>
                              </div>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="doctors">
            <DoctorManager />
          </TabsContent>

          <TabsContent value="blog">
            <BlogManager />
          </TabsContent>

          <TabsContent value="patients">
            <Card>
              <CardHeader>
                <CardTitle>Patient Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Patient management features coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            {settings && (
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Clinic Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Multi-Doctor Mode</Label>
                        <p className="text-sm text-muted-foreground">
                          Allow patients to select from multiple doctors
                        </p>
                      </div>
                      <Switch
                        checked={settings.multi_doctor_mode}
                        onCheckedChange={(checked) => updateSettings({ multi_doctor_mode: checked })}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Require National ID</Label>
                        <p className="text-sm text-muted-foreground">
                          Make national ID field mandatory for booking
                        </p>
                      </div>
                      <Switch
                        checked={settings.require_national_id}
                        onCheckedChange={(checked) => updateSettings({ require_national_id: checked })}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Enable Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Allow sending manual notifications to patients
                        </p>
                      </div>
                      <Switch
                        checked={settings.notifications_enabled}
                        onCheckedChange={(checked) => updateSettings({ notifications_enabled: checked })}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Working Hours Start</Label>
                        <Input
                          type="time"
                          value={settings.working_hours_start}
                          onChange={(e) => updateSettings({ working_hours_start: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label>Working Hours End</Label>
                        <Input
                          type="time"
                          value={settings.working_hours_end}
                          onChange={(e) => updateSettings({ working_hours_end: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Break Start</Label>
                        <Input
                          type="time"
                          value={settings.break_start}
                          onChange={(e) => updateSettings({ break_start: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label>Break End</Label>
                        <Input
                          type="time"
                          value={settings.break_end}
                          onChange={(e) => updateSettings({ break_end: e.target.value })}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>

        </Tabs>
      </div>
    </div>
  );
};

export default Admin;