import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowLeft, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { format } from "date-fns";
import Navigation from "@/components/Navigation";

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

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      fetchPost(slug);
    }
  }, [slug]);

  const fetchPost = async (slug: string) => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select(`
          *,
          blog_categories (id, name_en, name_ar, name_fr, slug)
        `)
        .eq('slug', slug)
        .eq('status', 'published')
        .single();

      if (error) throw error;
      setPost(data);
    } catch (error) {
      console.error('Error fetching post:', error);
    } finally {
      setLoading(false);
    }
  };

  const getPostTitle = (post: BlogPost) => {
    switch (language) {
      case 'ar': return post.title_ar || post.title_en;
      case 'fr': return post.title_fr || post.title_en;
      default: return post.title_en;
    }
  };

  const getPostContent = (post: BlogPost) => {
    switch (language) {
      case 'ar': return post.content_ar || post.content_en;
      case 'fr': return post.content_fr || post.content_en;
      default: return post.content_en;
    }
  };

  const getCategoryName = (category: any) => {
    switch (language) {
      case 'ar': return category.name_ar || category.name_en;
      case 'fr': return category.name_fr || category.name_en;
      default: return category.name_en;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Post Not Found</h1>
            <Button onClick={() => navigate('/blog')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <Button 
            variant="outline" 
            onClick={() => navigate('/blog')}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('blog.backToBlog')}
          </Button>

          <article className="space-y-6">
            {post.featured_image && (
              <div className="w-full h-64 md:h-96 rounded-lg overflow-hidden">
                <img
                  src={post.featured_image}
                  alt={getPostTitle(post)}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                {post.blog_categories && (
                  <Badge variant="secondary">
                    {getCategoryName(post.blog_categories)}
                  </Badge>
                )}
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4 mr-1" />
                  {format(new Date(post.published_at), 'MMMM dd, yyyy')}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="w-4 h-4 mr-1" />
                  {Math.ceil(getPostContent(post).length / 1000)} min read
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
                {getPostTitle(post)}
              </h1>
            </div>

            <Card>
              <CardContent className="pt-6">
                <div 
                  className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary"
                  dangerouslySetInnerHTML={{ __html: getPostContent(post) }}
                />
              </CardContent>
            </Card>

            <div className="pt-8">
              <Button 
                variant="outline" 
                onClick={() => navigate('/blog')}
                className="w-full sm:w-auto"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t('blog.backToBlog')}
              </Button>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;