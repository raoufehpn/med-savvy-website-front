import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Calendar, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
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
  published_at: string;
  featured_image: string;
  blog_categories: {
    id: string;
    name_en: string;
    name_ar: string;
    name_fr: string;
    slug: string;
  };
}

interface BlogCategory {
  id: string;
  name_en: string;
  name_ar: string;
  name_fr: string;
  slug: string;
}

const Blog = () => {
  const { t, language } = useLanguage();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [loading, setLoading] = useState(true);

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
          blog_categories (id, name_en, name_ar, name_fr, slug)
        `)
        .eq('status', 'published')
        .order('published_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
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

  const getPostTitle = (post: BlogPost) => {
    switch (language) {
      case 'ar': return post.title_ar || post.title_en;
      case 'fr': return post.title_fr || post.title_en;
      default: return post.title_en;
    }
  };

  const getPostExcerpt = (post: BlogPost) => {
    switch (language) {
      case 'ar': return post.excerpt_ar || post.excerpt_en;
      case 'fr': return post.excerpt_fr || post.excerpt_en;
      default: return post.excerpt_en;
    }
  };

  const getCategoryName = (category: BlogCategory) => {
    switch (language) {
      case 'ar': return category.name_ar || category.name_en;
      case 'fr': return category.name_fr || category.name_en;
      default: return category.name_en;
    }
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = getPostTitle(post).toLowerCase().includes(searchTerm.toLowerCase()) ||
                         getPostExcerpt(post).toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || post.blog_categories?.slug === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading blog posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">{t('blog.title')}</h1>
            <p className="text-lg text-muted-foreground">
              Stay updated with the latest health tips and clinic news
            </p>
          </div>

          {/* Search and Filter */}
          <div className="mb-8 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder={t('blog.search')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedCategory === '' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory('')}
              >
                All Categories
              </Button>
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.slug ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category.slug)}
                >
                  {getCategoryName(category)}
                </Button>
              ))}
            </div>
          </div>

          {/* Blog Posts */}
          <div className="grid gap-8">
            {filteredPosts.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">No blog posts found.</p>
                </CardContent>
              </Card>
            ) : (
              filteredPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="md:flex">
                    {post.featured_image && (
                      <div className="md:w-1/3">
                        <img
                          src={post.featured_image}
                          alt={getPostTitle(post)}
                          className="w-full h-48 md:h-full object-cover"
                        />
                      </div>
                    )}
                    <div className={post.featured_image ? 'md:w-2/3' : 'w-full'}>
                      <CardHeader>
                        <div className="flex items-center gap-2 mb-2">
                          {post.blog_categories && (
                            <Badge variant="secondary">
                              {getCategoryName(post.blog_categories)}
                            </Badge>
                          )}
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Calendar className="w-4 h-4 mr-1" />
                            {format(new Date(post.published_at), 'MMM dd, yyyy')}
                          </div>
                        </div>
                        <CardTitle className="text-xl hover:text-primary transition-colors cursor-pointer">
                          {getPostTitle(post)}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground mb-4 line-clamp-3">
                          {getPostExcerpt(post)}
                        </p>
                        <Button variant="outline" size="sm">
                          {t('blog.readMore')}
                        </Button>
                      </CardContent>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;