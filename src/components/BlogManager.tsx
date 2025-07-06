import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Edit, Trash2, Eye, Calendar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { format } from "date-fns";

interface BlogPost {
  id: string;
  title_en: string;
  title_ar: string;
  title_fr: string;
  content_en: string;
  content_ar: string;
  content_fr: string;
  excerpt_en: string;
  excerpt_ar: string;
  excerpt_fr: string;
  slug: string;
  status: string;
  featured_image?: string;
  category_id?: string;
  tags?: string[];
  meta_title_en?: string;
  meta_title_ar?: string;
  meta_title_fr?: string;
  meta_description_en?: string;
  meta_description_ar?: string;
  meta_description_fr?: string;
  published_at?: string;
  scheduled_at?: string;
  created_at: string;
  blog_categories?: {
    name_en: string;
    name_ar: string;
    name_fr: string;
  };
}

interface BlogCategory {
  id: string;
  name_en: string;
  name_ar: string;
  name_fr: string;
  slug: string;
}

const BlogManager = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title_en: '',
    title_ar: '',
    title_fr: '',
    content_en: '',
    content_ar: '',
    content_fr: '',
    excerpt_en: '',
    excerpt_ar: '',
    excerpt_fr: '',
    slug: '',
    status: 'draft',
    featured_image: '',
    category_id: '',
    tags: [] as string[],
    meta_title_en: '',
    meta_title_ar: '',
    meta_title_fr: '',
    meta_description_en: '',
    meta_description_ar: '',
    meta_description_fr: '',
    scheduled_at: ''
  });

  useEffect(() => {
    fetchPosts();
    fetchCategories();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select(`
          *,
          blog_categories (name_en, name_ar, name_fr)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast({
        title: "Error",
        description: "Failed to fetch blog posts",
        variant: "destructive",
      });
    }
  };

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_categories')
        .select('*')
        .eq('is_active', true);

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const postData = {
        ...formData,
        published_at: formData.status === 'published' ? new Date().toISOString() : null,
        scheduled_at: formData.scheduled_at || null,
      };

      if (editingPost) {
        const { error } = await supabase
          .from('blog_posts')
          .update(postData)
          .eq('id', editingPost.id);

        if (error) throw error;
        toast({ title: "Success", description: "Blog post updated successfully" });
      } else {
        const { error } = await supabase
          .from('blog_posts')
          .insert([postData]);

        if (error) throw error;
        toast({ title: "Success", description: "Blog post created successfully" });
      }

      setIsDialogOpen(false);
      resetForm();
      fetchPosts();
    } catch (error) {
      console.error('Error saving post:', error);
      toast({
        title: "Error",
        description: "Failed to save blog post",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      title_en: post.title_en || '',
      title_ar: post.title_ar || '',
      title_fr: post.title_fr || '',
      content_en: post.content_en || '',
      content_ar: post.content_ar || '',
      content_fr: post.content_fr || '',
      excerpt_en: post.excerpt_en || '',
      excerpt_ar: post.excerpt_ar || '',
      excerpt_fr: post.excerpt_fr || '',
      slug: post.slug || '',
      status: post.status || 'draft',
      featured_image: post.featured_image || '',
      category_id: post.category_id || '',
      tags: post.tags || [],
      meta_title_en: post.meta_title_en || '',
      meta_title_ar: post.meta_title_ar || '',
      meta_title_fr: post.meta_title_fr || '',
      meta_description_en: post.meta_description_en || '',
      meta_description_ar: post.meta_description_ar || '',
      meta_description_fr: post.meta_description_fr || '',
      scheduled_at: post.scheduled_at ? format(new Date(post.scheduled_at), 'yyyy-MM-dd\'T\'HH:mm') : ''
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast({ title: "Success", description: "Blog post deleted successfully" });
      fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
      toast({
        title: "Error",
        description: "Failed to delete blog post",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setEditingPost(null);
    setFormData({
      title_en: '',
      title_ar: '',
      title_fr: '',
      content_en: '',
      content_ar: '',
      content_fr: '',
      excerpt_en: '',
      excerpt_ar: '',
      excerpt_fr: '',
      slug: '',
      status: 'draft',
      featured_image: '',
      category_id: '',
      tags: [],
      meta_title_en: '',
      meta_title_ar: '',
      meta_title_fr: '',
      meta_description_en: '',
      meta_description_ar: '',
      meta_description_fr: '',
      scheduled_at: ''
    });
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, any> = {
      draft: { variant: "secondary", label: "Draft" },
      published: { variant: "default", label: "Published" },
      scheduled: { variant: "outline", label: "Scheduled" }
    };
    const config = variants[status] || variants.draft;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Blog Management</h2>
          <p className="text-muted-foreground">Create and manage blog posts</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="w-4 h-4 mr-2" />
              New Post
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingPost ? 'Edit Post' : 'Create New Post'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Tabs defaultValue="content" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="content">Content</TabsTrigger>
                  <TabsTrigger value="seo">SEO</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>
                
                <TabsContent value="content" className="space-y-4">
                  <Tabs defaultValue="en" className="w-full">
                    <TabsList>
                      <TabsTrigger value="en">English</TabsTrigger>
                      <TabsTrigger value="ar">العربية</TabsTrigger>
                      <TabsTrigger value="fr">Français</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="en" className="space-y-4">
                      <div>
                        <Label htmlFor="title_en">Title (English)</Label>
                        <Input
                          id="title_en"
                          value={formData.title_en}
                          onChange={(e) => setFormData(prev => ({ ...prev, title_en: e.target.value }))}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="excerpt_en">Excerpt (English)</Label>
                        <Textarea
                          id="excerpt_en"
                          value={formData.excerpt_en}
                          onChange={(e) => setFormData(prev => ({ ...prev, excerpt_en: e.target.value }))}
                          rows={3}
                        />
                      </div>
                      <div>
                        <Label htmlFor="content_en">Content (English)</Label>
                        <Textarea
                          id="content_en"
                          value={formData.content_en}
                          onChange={(e) => setFormData(prev => ({ ...prev, content_en: e.target.value }))}
                          rows={10}
                          required
                        />
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="ar" className="space-y-4">
                      <div>
                        <Label htmlFor="title_ar">Title (Arabic)</Label>
                        <Input
                          id="title_ar"
                          value={formData.title_ar}
                          onChange={(e) => setFormData(prev => ({ ...prev, title_ar: e.target.value }))}
                          dir="rtl"
                        />
                      </div>
                      <div>
                        <Label htmlFor="excerpt_ar">Excerpt (Arabic)</Label>
                        <Textarea
                          id="excerpt_ar"
                          value={formData.excerpt_ar}
                          onChange={(e) => setFormData(prev => ({ ...prev, excerpt_ar: e.target.value }))}
                          rows={3}
                          dir="rtl"
                        />
                      </div>
                      <div>
                        <Label htmlFor="content_ar">Content (Arabic)</Label>
                        <Textarea
                          id="content_ar"
                          value={formData.content_ar}
                          onChange={(e) => setFormData(prev => ({ ...prev, content_ar: e.target.value }))}
                          rows={10}
                          dir="rtl"
                        />
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="fr" className="space-y-4">
                      <div>
                        <Label htmlFor="title_fr">Title (French)</Label>
                        <Input
                          id="title_fr"
                          value={formData.title_fr}
                          onChange={(e) => setFormData(prev => ({ ...prev, title_fr: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="excerpt_fr">Excerpt (French)</Label>
                        <Textarea
                          id="excerpt_fr"
                          value={formData.excerpt_fr}
                          onChange={(e) => setFormData(prev => ({ ...prev, excerpt_fr: e.target.value }))}
                          rows={3}
                        />
                      </div>
                      <div>
                        <Label htmlFor="content_fr">Content (French)</Label>
                        <Textarea
                          id="content_fr"
                          value={formData.content_fr}
                          onChange={(e) => setFormData(prev => ({ ...prev, content_fr: e.target.value }))}
                          rows={10}
                        />
                      </div>
                    </TabsContent>
                  </Tabs>
                </TabsContent>
                
                <TabsContent value="seo" className="space-y-4">
                  <div>
                    <Label htmlFor="slug">URL Slug</Label>
                    <Input
                      id="slug"
                      value={formData.slug}
                      onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                      placeholder="blog-post-url"
                      required
                    />
                  </div>
                  <Tabs defaultValue="en" className="w-full">
                    <TabsList>
                      <TabsTrigger value="en">English SEO</TabsTrigger>
                      <TabsTrigger value="ar">Arabic SEO</TabsTrigger>
                      <TabsTrigger value="fr">French SEO</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="en" className="space-y-4">
                      <div>
                        <Label htmlFor="meta_title_en">Meta Title</Label>
                        <Input
                          id="meta_title_en"
                          value={formData.meta_title_en}
                          onChange={(e) => setFormData(prev => ({ ...prev, meta_title_en: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="meta_description_en">Meta Description</Label>
                        <Textarea
                          id="meta_description_en"
                          value={formData.meta_description_en}
                          onChange={(e) => setFormData(prev => ({ ...prev, meta_description_en: e.target.value }))}
                          rows={3}
                        />
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="ar" className="space-y-4">
                      <div>
                        <Label htmlFor="meta_title_ar">Meta Title (Arabic)</Label>
                        <Input
                          id="meta_title_ar"
                          value={formData.meta_title_ar}
                          onChange={(e) => setFormData(prev => ({ ...prev, meta_title_ar: e.target.value }))}
                          dir="rtl"
                        />
                      </div>
                      <div>
                        <Label htmlFor="meta_description_ar">Meta Description (Arabic)</Label>
                        <Textarea
                          id="meta_description_ar"
                          value={formData.meta_description_ar}
                          onChange={(e) => setFormData(prev => ({ ...prev, meta_description_ar: e.target.value }))}
                          rows={3}
                          dir="rtl"
                        />
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="fr" className="space-y-4">
                      <div>
                        <Label htmlFor="meta_title_fr">Meta Title (French)</Label>
                        <Input
                          id="meta_title_fr"
                          value={formData.meta_title_fr}
                          onChange={(e) => setFormData(prev => ({ ...prev, meta_title_fr: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="meta_description_fr">Meta Description (French)</Label>
                        <Textarea
                          id="meta_description_fr"
                          value={formData.meta_description_fr}
                          onChange={(e) => setFormData(prev => ({ ...prev, meta_description_fr: e.target.value }))}
                          rows={3}
                        />
                      </div>
                    </TabsContent>
                  </Tabs>
                </TabsContent>
                
                <TabsContent value="settings" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="status">Status</Label>
                      <Select value={formData.status} onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="published">Published</SelectItem>
                          <SelectItem value="scheduled">Scheduled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="category_id">Category</Label>
                      <Select value={formData.category_id} onValueChange={(value) => setFormData(prev => ({ ...prev, category_id: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name_en}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  {formData.status === 'scheduled' && (
                    <div>
                      <Label htmlFor="scheduled_at">Scheduled Date & Time</Label>
                      <Input
                        id="scheduled_at"
                        type="datetime-local"
                        value={formData.scheduled_at}
                        onChange={(e) => setFormData(prev => ({ ...prev, scheduled_at: e.target.value }))}
                      />
                    </div>
                  )}
                  
                  <div>
                    <Label htmlFor="featured_image">Featured Image URL</Label>
                    <Input
                      id="featured_image"
                      value={formData.featured_image}
                      onChange={(e) => setFormData(prev => ({ ...prev, featured_image: e.target.value }))}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                </TabsContent>
              </Tabs>
              
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? 'Saving...' : (editingPost ? 'Update' : 'Create')}
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
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell className="font-medium">{post.title_en}</TableCell>
                  <TableCell>
                    {post.blog_categories ? post.blog_categories.name_en : 'Uncategorized'}
                  </TableCell>
                  <TableCell>{getStatusBadge(post.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <Calendar className="w-3 h-3" />
                      {format(new Date(post.created_at), 'MMM dd, yyyy')}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(post)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleDelete(post.id)}>
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

export default BlogManager;