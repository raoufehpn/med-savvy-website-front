import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, UserCheck, UserX } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Doctor {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  specialization?: string;
  bio?: string;
  photo_url?: string;
  is_active: boolean;
  working_hours?: any;
  created_at: string;
}

interface WorkingHours {
  [key: string]: {
    start: string;
    end: string;
  };
}

const defaultWorkingHours: WorkingHours = {
  monday: { start: '09:00', end: '17:00' },
  tuesday: { start: '09:00', end: '17:00' },
  wednesday: { start: '09:00', end: '17:00' },
  thursday: { start: '09:00', end: '17:00' },
  friday: { start: '09:00', end: '17:00' },
  saturday: { start: '09:00', end: '13:00' },
  sunday: { start: '', end: '' }
};

const DoctorManager = () => {
  const { toast } = useToast();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    specialization: '',
    bio: '',
    photo_url: '',
    is_active: true,
    working_hours: defaultWorkingHours
  });

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const { data, error } = await supabase
        .from('doctors')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDoctors(data || []);
    } catch (error) {
      console.error('Error fetching doctors:', error);
      toast({
        title: "Error",
        description: "Failed to fetch doctors",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const doctorData = {
        ...formData,
        working_hours: JSON.stringify(formData.working_hours)
      };

      if (editingDoctor) {
        const { error } = await supabase
          .from('doctors')
          .update(doctorData)
          .eq('id', editingDoctor.id);

        if (error) throw error;
        toast({ title: "Success", description: "Doctor updated successfully" });
      } else {
        const { error } = await supabase
          .from('doctors')
          .insert([doctorData]);

        if (error) throw error;
        toast({ title: "Success", description: "Doctor added successfully" });
      }

      setIsDialogOpen(false);
      resetForm();
      fetchDoctors();
    } catch (error) {
      console.error('Error saving doctor:', error);
      toast({
        title: "Error",
        description: "Failed to save doctor",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (doctor: Doctor) => {
    setEditingDoctor(doctor);
    setFormData({
      name: doctor.name || '',
      email: doctor.email || '',
      phone: doctor.phone || '',
      specialization: doctor.specialization || '',
      bio: doctor.bio || '',
      photo_url: doctor.photo_url || '',
      is_active: doctor.is_active,
      working_hours: doctor.working_hours ? JSON.parse(doctor.working_hours) : defaultWorkingHours
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this doctor?')) return;

    try {
      const { error } = await supabase
        .from('doctors')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast({ title: "Success", description: "Doctor deleted successfully" });
      fetchDoctors();
    } catch (error) {
      console.error('Error deleting doctor:', error);
      toast({
        title: "Error",
        description: "Failed to delete doctor",
        variant: "destructive",
      });
    }
  };

  const toggleDoctorStatus = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('doctors')
        .update({ is_active: !currentStatus })
        .eq('id', id);

      if (error) throw error;
      toast({ 
        title: "Success", 
        description: `Doctor ${!currentStatus ? 'activated' : 'deactivated'} successfully` 
      });
      fetchDoctors();
    } catch (error) {
      console.error('Error updating doctor status:', error);
      toast({
        title: "Error",
        description: "Failed to update doctor status",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setEditingDoctor(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      specialization: '',
      bio: '',
      photo_url: '',
      is_active: true,
      working_hours: defaultWorkingHours
    });
  };

  const updateWorkingHours = (day: string, field: 'start' | 'end', value: string) => {
    setFormData(prev => ({
      ...prev,
      working_hours: {
        ...prev.working_hours,
        [day]: {
          ...prev.working_hours[day],
          [field]: value
        }
      }
    }));
  };

  const daysOfWeek = [
    { key: 'monday', label: 'Monday' },
    { key: 'tuesday', label: 'Tuesday' },
    { key: 'wednesday', label: 'Wednesday' },
    { key: 'thursday', label: 'Thursday' },
    { key: 'friday', label: 'Friday' },
    { key: 'saturday', label: 'Saturday' },
    { key: 'sunday', label: 'Sunday' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Doctor Management</h2>
          <p className="text-muted-foreground">Manage doctors and their schedules</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="w-4 h-4 mr-2" />
              Add Doctor
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingDoctor ? 'Edit Doctor' : 'Add New Doctor'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="specialization">Specialization</Label>
                  <Input
                    id="specialization"
                    value={formData.specialization}
                    onChange={(e) => setFormData(prev => ({ ...prev, specialization: e.target.value }))}
                    placeholder="e.g., General Dentist, Orthodontist"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                  rows={3}
                  placeholder="Brief description about the doctor..."
                />
              </div>

              <div>
                <Label htmlFor="photo_url">Photo URL</Label>
                <Input
                  id="photo_url"
                  value={formData.photo_url}
                  onChange={(e) => setFormData(prev => ({ ...prev, photo_url: e.target.value }))}
                  placeholder="https://example.com/doctor-photo.jpg"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="is_active"
                  checked={formData.is_active}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_active: checked }))}
                />
                <Label htmlFor="is_active">Active Doctor</Label>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Working Hours</h3>
                <div className="grid gap-3">
                  {daysOfWeek.map((day) => (
                    <div key={day.key} className="grid grid-cols-4 gap-2 items-center">
                      <Label className="text-sm font-medium">{day.label}</Label>
                      <Input
                        type="time"
                        value={formData.working_hours[day.key]?.start || ''}
                        onChange={(e) => updateWorkingHours(day.key, 'start', e.target.value)}
                        placeholder="Start"
                      />
                      <Input
                        type="time"
                        value={formData.working_hours[day.key]?.end || ''}
                        onChange={(e) => updateWorkingHours(day.key, 'end', e.target.value)}
                        placeholder="End"
                      />
                      <span className="text-xs text-muted-foreground">
                        {!formData.working_hours[day.key]?.start || !formData.working_hours[day.key]?.end ? 'Closed' : 'Open'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? 'Saving...' : (editingDoctor ? 'Update' : 'Add Doctor')}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Specialization</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {doctors.map((doctor) => (
                <TableRow key={doctor.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {doctor.photo_url && (
                        <img
                          src={doctor.photo_url}
                          alt={doctor.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      )}
                      <div>
                        <div className="font-medium">{doctor.name}</div>
                        {doctor.bio && (
                          <div className="text-sm text-muted-foreground line-clamp-1">
                            {doctor.bio}
                          </div>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{doctor.specialization || 'General'}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {doctor.email && (
                        <div className="text-sm">{doctor.email}</div>
                      )}
                      {doctor.phone && (
                        <div className="text-sm text-muted-foreground">{doctor.phone}</div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={doctor.is_active ? "default" : "secondary"}>
                      {doctor.is_active ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(doctor)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => toggleDoctorStatus(doctor.id, doctor.is_active)}
                      >
                        {doctor.is_active ? <UserX className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => handleDelete(doctor.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default DoctorManager;