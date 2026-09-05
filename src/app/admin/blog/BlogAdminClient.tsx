'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BlogPost } from '@/lib/types';
import { saveBlogPost, deleteBlogPost } from '@/lib/data/api';
import {
  BookOpen,
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  ExternalLink,
  Eye,
  EyeOff,
  Clock,
  Calendar,
} from 'lucide-react';

interface BlogAdminClientProps {
  initialPosts: BlogPost[];
}

export function BlogAdminClient({ initialPosts }: BlogAdminClientProps) {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Partial<BlogPost> | null>(null);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const openCreateModal = () => {
    setEditingPost({
      title_en: '',
      title_bn: '',
      slug: '',
      excerpt_en: '',
      excerpt_bn: '',
      content_en: '',
      content_bn: '',
      read_time_en: '4 min read',
      read_time_bn: '৪ মিনিট পড়ার সময়',
      cover_image: '/images/logo.jpeg',
      target_keywords_en: 'dentist ashulia, root canal savar',
      target_keywords_bn: 'আশুলিয়া ডেন্টাল, দাঁতের ডাক্তার',
      is_published: true,
      published_at: new Date().toISOString(),
    });
    setIsModalOpen(true);
  };

  const openEditModal = (p: BlogPost) => {
    setEditingPost({ ...p });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost) return;
    setSaving(true);
    try {
      const slug =
        editingPost.slug ||
        editingPost.title_en?.toLowerCase().replace(/[^a-z0-9]+/g, '-') ||
        'blog-' + Date.now();

      const payload: Partial<BlogPost> = {
        ...editingPost,
        slug,
      };

      const saved = await saveBlogPost(payload);
      setPosts((prev) => {
        const exists = prev.some((p) => p.id === saved.id);
        if (exists) {
          return prev.map((p) => (p.id === saved.id ? saved : p));
        }
        return [saved, ...prev];
      });
      setIsModalOpen(false);
      setEditingPost(null);
      setSuccessMsg('Blog post saved successfully!');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this article?')) return;
    try {
      await deleteBlogPost(id);
      setPosts((prev) => prev.filter((p) => p.id !== id));
      setSuccessMsg('Article deleted.');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <h1 className="text-2xl font-black text-navy-primary tracking-tight">
            Dental Blog & Patient Education CMS
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Author SEO-optimized articles, root canal explanations, and hygiene advice.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-4 py-2.5 bg-navy-primary hover:bg-navy-light text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Write New Article</span>
        </button>
      </div>

      {successMsg && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Posts List */}
      <div className="space-y-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-3 flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center gap-2 text-xs text-slate-400 font-semibold">
                <span>{post.read_time_en}</span>
                <span>•</span>
                <span>{new Date(post.published_at).toLocaleDateString()}</span>
                {post.is_published ? (
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                    Published
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-bold">
                    Draft
                  </span>
                )}
              </div>

              <h3 className="text-base font-bold text-navy-primary">
                {post.title_en}
              </h3>
              <p className="text-xs font-semibold text-slate-600">{post.title_bn}</p>
              <p className="text-xs text-slate-500 line-clamp-2">{post.excerpt_en}</p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Link
                href={`/blog/${post.slug}`}
                target="_blank"
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-navy-primary text-xs font-bold flex items-center gap-1"
                title="View published article"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>View</span>
              </Link>
              <button
                onClick={() => openEditModal(post)}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-navy-primary"
                title="Edit article"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleDelete(post.id)}
                className="p-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-500 hover:text-red-700"
                title="Delete article"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Article Create / Edit Modal */}
      {isModalOpen && editingPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-3xl w-full my-8 space-y-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-lg font-bold text-navy-primary">
                {editingPost.id ? 'Edit Dental Article' : 'Write New Article'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Title (English) *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingPost.title_en || ''}
                    onChange={(e) =>
                      setEditingPost({ ...editingPost, title_en: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    শিরোনাম (বাংলা) *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingPost.title_bn || ''}
                    onChange={(e) =>
                      setEditingPost({ ...editingPost, title_bn: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    URL Slug
                  </label>
                  <input
                    type="text"
                    value={editingPost.slug || ''}
                    onChange={(e) =>
                      setEditingPost({ ...editingPost, slug: e.target.value })
                    }
                    placeholder="my-article-slug"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Read Time (EN)
                  </label>
                  <input
                    type="text"
                    value={editingPost.read_time_en || ''}
                    onChange={(e) =>
                      setEditingPost({ ...editingPost, read_time_en: e.target.value })
                    }
                    placeholder="4 min read"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    পড়ার সময় (BN)
                  </label>
                  <input
                    type="text"
                    value={editingPost.read_time_bn || ''}
                    onChange={(e) =>
                      setEditingPost({ ...editingPost, read_time_bn: e.target.value })
                    }
                    placeholder="৪ মিনিট পড়ার সময়"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Short Excerpt (English)
                  </label>
                  <textarea
                    rows={2}
                    value={editingPost.excerpt_en || ''}
                    onChange={(e) =>
                      setEditingPost({ ...editingPost, excerpt_en: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    সংক্ষিপ্ত সারসংক্ষেপ (বাংলা)
                  </label>
                  <textarea
                    rows={2}
                    value={editingPost.excerpt_bn || ''}
                    onChange={(e) =>
                      setEditingPost({ ...editingPost, excerpt_bn: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Article Full Content (English) *
                  </label>
                  <textarea
                    rows={8}
                    required
                    value={editingPost.content_en || ''}
                    onChange={(e) =>
                      setEditingPost({ ...editingPost, content_en: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl font-mono text-xs"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    আর্টিকেলের বিস্তারিত বিষয়বস্তু (বাংলা) *
                  </label>
                  <textarea
                    rows={8}
                    required
                    value={editingPost.content_bn || ''}
                    onChange={(e) =>
                      setEditingPost({ ...editingPost, content_bn: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl font-mono text-xs"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isPublished"
                  checked={editingPost.is_published ?? true}
                  onChange={(e) =>
                    setEditingPost({ ...editingPost, is_published: e.target.checked })
                  }
                  className="rounded text-navy-primary"
                />
                <label htmlFor="isPublished" className="font-semibold text-slate-700">
                  Publish article on live website
                </label>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 rounded-xl font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2 bg-navy-primary hover:bg-navy-light text-white rounded-xl font-bold cursor-pointer transition-all disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save Article'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
