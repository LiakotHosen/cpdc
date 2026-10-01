'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '@/lib/types';
import { saveBlogPost, deleteBlogPost, getBlogPosts } from '@/lib/data/api';
import { RichTextEditor } from '@/components/admin/RichTextEditor';
import { ImageSelector } from '@/components/admin/ImageSelector';
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
  Sparkles,
  Columns2,
  Image as ImageIcon,
  Languages,
  X,
  FileText
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
  const [contentTab, setContentTab] = useState<'en' | 'bn' | 'split'>('en');

  // Hydrate from client storage / DB on mount
  useEffect(() => {
    getBlogPosts().then((data) => {
      if (data && data.length > 0) {
        setPosts(data);
      }
    });
  }, []);

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
    setContentTab('en');
    setIsModalOpen(true);
  };

  const openEditModal = (p: BlogPost) => {
    setEditingPost({ ...p });
    setContentTab('en');
    setIsModalOpen(true);
  };

  const generateSlugFromTitle = () => {
    if (!editingPost?.title_en) return;
    const generated = editingPost.title_en
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
    setEditingPost({ ...editingPost, slug: generated });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost) return;
    setSaving(true);
    try {
      const slug =
        editingPost.slug?.trim() ||
        editingPost.title_en?.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-') ||
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
      setSuccessMsg('Blog post saved successfully! It is now live on the website.');
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err) {
      console.error('Failed to save blog post:', err);
      alert('Failed to save post. Please check your inputs and try again.');
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

  const handleTogglePublish = async (post: BlogPost) => {
    const updated = { ...post, is_published: !post.is_published };
    try {
      const saved = await saveBlogPost(updated);
      setPosts((prev) => prev.map((p) => (p.id === saved.id ? saved : p)));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-primary/10 text-navy-primary text-xs font-bold mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>SEO Clinical CMS</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-navy-primary">
            Dental Health Articles & Patient Guides
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Write evidence-based educational articles with modern rich text editing, bilingual support, and live publishing.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-navy-primary hover:bg-navy-light text-white text-xs font-bold rounded-2xl shadow-xs transition-all cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Write New Article</span>
        </button>
      </div>

      {successMsg && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-2xl text-xs font-semibold flex items-center gap-2 animate-in fade-in">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Post List */}
      <div className="space-y-4">
        {posts.length === 0 && (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-navy-primary">No Articles Yet</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Start publishing patient education guides to improve Google rankings and patient trust.
            </p>
            <button
              onClick={openCreateModal}
              className="px-4 py-2 bg-navy-primary text-white text-xs font-bold rounded-xl"
            >
              Write First Article
            </button>
          </div>
        )}

        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-slate-300 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xs"
          >
            <div className="space-y-1.5 flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1 ${
                    post.is_published
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-amber-100 text-amber-700'
                  }`}
                >
                  {post.is_published ? (
                    <>
                      <Eye className="w-3 h-3" /> Published
                    </>
                  ) : (
                    <>
                      <EyeOff className="w-3 h-3" /> Draft
                    </>
                  )}
                </span>
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {new Date(post.published_at).toLocaleDateString()}
                </span>
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {post.read_time_en}
                </span>
              </div>

              <h3 className="text-sm sm:text-base font-bold text-navy-primary truncate">
                {post.title_en}
              </h3>
              <p className="text-xs text-slate-500 font-bangla truncate">
                {post.title_bn}
              </p>
              <p className="text-xs text-slate-400 line-clamp-1 italic">
                {post.excerpt_en}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
              <Link
                href={`/blog/${post.slug}`}
                target="_blank"
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-navy-primary transition-colors"
                title="View on live website"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
              <button
                onClick={() => handleTogglePublish(post)}
                className={`p-2 rounded-xl transition-colors ${
                  post.is_published
                    ? 'bg-amber-50 hover:bg-amber-100 text-amber-600'
                    : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-600'
                }`}
                title={post.is_published ? 'Unpublish post' : 'Publish post'}
              >
                {post.is_published ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={() => openEditModal(post)}
                className="p-2 rounded-xl bg-navy-primary/10 hover:bg-navy-primary/20 text-navy-primary"
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

      {/* Article Create / Edit Modal with Rich Text Editor */}
      {isModalOpen && editingPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-5xl w-full my-auto max-h-[94vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95">
            {/* Modal Header */}
            <div className="p-4 sm:p-6 border-b border-slate-100 flex items-center justify-between shrink-0 bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-navy-primary/10 text-navy-primary flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-navy-primary">
                    {editingPost.id ? 'Edit Dental Article' : 'Write New Article'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Bilingual rich text editor with instant preview and live publishing.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body (Scrollable) */}
            <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 text-xs">
              {/* Titles Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block font-bold text-slate-700">
                    Title (English) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Root Canal Treatment Cost & Painless Care"
                    value={editingPost.title_en || ''}
                    onChange={(e) =>
                      setEditingPost({ ...editingPost, title_en: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-navy-primary/20 focus:outline-none text-xs sm:text-sm font-semibold text-slate-800"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block font-bold text-slate-700 font-bangla">
                    শিরোনাম (বাংলা) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="যেমন: রুট ক্যানেল চিকিৎসা ও ব্যথামুক্ত সমাধান"
                    value={editingPost.title_bn || ''}
                    onChange={(e) =>
                      setEditingPost({ ...editingPost, title_bn: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-navy-primary/20 focus:outline-none text-xs sm:text-sm font-semibold text-slate-800 font-bangla"
                  />
                </div>
              </div>

              {/* URL Slug & Reading Times */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-50/80 p-3.5 rounded-2xl border border-slate-200/80">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="block font-bold text-slate-700">URL Slug</label>
                    {editingPost.title_en && (
                      <button
                        type="button"
                        onClick={generateSlugFromTitle}
                        className="text-[10px] text-medical-teal hover:underline font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <Sparkles className="w-3 h-3 text-amber-500" />
                        <span>Auto Slug</span>
                      </button>
                    )}
                  </div>
                  <input
                    type="text"
                    value={editingPost.slug || ''}
                    onChange={(e) =>
                      setEditingPost({ ...editingPost, slug: e.target.value })
                    }
                    placeholder="my-article-slug"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl bg-white font-mono text-xs focus:ring-2 focus:ring-navy-primary/20 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block font-bold text-slate-700">Read Time (EN)</label>
                  <input
                    type="text"
                    value={editingPost.read_time_en || ''}
                    onChange={(e) =>
                      setEditingPost({ ...editingPost, read_time_en: e.target.value })
                    }
                    placeholder="4 min read"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-navy-primary/20 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block font-bold text-slate-700 font-bangla">পড়ার সময় (BN)</label>
                  <input
                    type="text"
                    value={editingPost.read_time_bn || ''}
                    onChange={(e) =>
                      setEditingPost({ ...editingPost, read_time_bn: e.target.value })
                    }
                    placeholder="৪ মিনিট পড়ার সময়"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl bg-white font-bangla focus:ring-2 focus:ring-navy-primary/20 focus:outline-none"
                  />
                </div>
              </div>

              {/* Short Excerpts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block font-bold text-slate-700">
                    Short Excerpt (English)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Brief 1-2 sentence overview for cards and meta descriptions..."
                    value={editingPost.excerpt_en || ''}
                    onChange={(e) =>
                      setEditingPost({ ...editingPost, excerpt_en: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-navy-primary/20 focus:outline-none leading-relaxed"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block font-bold text-slate-700 font-bangla">
                    সংক্ষিপ্ত সারসংক্ষেপ (বাংলা)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="আর্টিকেলের মূল বক্তব্য ১-২ লাইনে..."
                    value={editingPost.excerpt_bn || ''}
                    onChange={(e) =>
                      setEditingPost({ ...editingPost, excerpt_bn: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-bangla focus:ring-2 focus:ring-navy-primary/20 focus:outline-none leading-relaxed"
                  />
                </div>
              </div>

              {/* Article Content Tabs & View Switcher */}
              <div className="space-y-3 pt-2">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-2">
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setContentTab('en')}
                      className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                        contentTab === 'en'
                          ? 'bg-navy-primary text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      <span>🇬🇧</span>
                      <span>English Content *</span>
                      {editingPost.content_en && (
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setContentTab('bn')}
                      className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer font-bangla ${
                        contentTab === 'bn'
                          ? 'bg-navy-primary text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      <span>🇧🇩</span>
                      <span>বাংলা বিষয়বস্তু *</span>
                      {editingPost.content_bn && (
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setContentTab('split')}
                      className={`hidden lg:flex px-3 py-1.5 rounded-xl font-bold text-xs items-center gap-1.5 transition-all cursor-pointer ${
                        contentTab === 'split'
                          ? 'bg-navy-primary text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                      title="View both English and Bengali editors side by side"
                    >
                      <Columns2 className="w-3.5 h-3.5" />
                      <span>Side-by-Side</span>
                    </button>
                  </div>

                  <span className="text-[11px] text-slate-400 italic hidden sm:inline">
                    Format with H2, H3, bold, lists, quotes, medical callouts, and links.
                  </span>
                </div>

                {/* Rich Text Editor Instances */}
                {contentTab === 'en' && (
                  <div className="space-y-1">
                    <RichTextEditor
                      label="Article Full Content (English)"
                      value={editingPost.content_en || ''}
                      onChange={(val) => setEditingPost({ ...editingPost, content_en: val })}
                      placeholder="Write your comprehensive English article here. Use toolbar for headings, bullet points, advice boxes, etc..."
                      minHeight="280px"
                      onEstimateReadTime={(en, bn) => {
                        setEditingPost((prev) =>
                          prev ? { ...prev, read_time_en: en, read_time_bn: bn } : prev
                        );
                      }}
                    />
                  </div>
                )}

                {contentTab === 'bn' && (
                  <div className="space-y-1">
                    <RichTextEditor
                      label="আর্টিকেলের বিস্তারিত বিষয়বস্তু (বাংলা)"
                      value={editingPost.content_bn || ''}
                      onChange={(val) => setEditingPost({ ...editingPost, content_bn: val })}
                      placeholder="এখানে বাংলায় বিস্তারিত স্বাস্থ্য তথ্য ও পরামর্শ লিখুন। টুলবার দিয়ে হেডিং, লিস্ট, ডাক্তারের পরামর্শ বক্স যুক্ত করুন..."
                      minHeight="280px"
                      onEstimateReadTime={(en, bn) => {
                        setEditingPost((prev) =>
                          prev ? { ...prev, read_time_en: en, read_time_bn: bn } : prev
                        );
                      }}
                    />
                  </div>
                )}

                {contentTab === 'split' && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                      <RichTextEditor
                        label="Article Full Content (English)"
                        value={editingPost.content_en || ''}
                        onChange={(val) => setEditingPost({ ...editingPost, content_en: val })}
                        placeholder="Write English content here..."
                        minHeight="260px"
                        onEstimateReadTime={(en, bn) => {
                          setEditingPost((prev) =>
                            prev ? { ...prev, read_time_en: en, read_time_bn: bn } : prev
                          );
                        }}
                      />
                    </div>
                    <div>
                      <RichTextEditor
                        label="আর্টিকেলের বিস্তারিত বিষয়বস্তু (বাংলা)"
                        value={editingPost.content_bn || ''}
                        onChange={(val) => setEditingPost({ ...editingPost, content_bn: val })}
                        placeholder="বাংলা বিষয়বস্তু এখানে লিখুন..."
                        minHeight="260px"
                        onEstimateReadTime={(en, bn) => {
                          setEditingPost((prev) =>
                            prev ? { ...prev, read_time_en: en, read_time_bn: bn } : prev
                          );
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Cover Image & SEO Keywords */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50/60 p-4 rounded-2xl border border-slate-200/80">
                <div>
                  <ImageSelector
                    label="Featured Cover Image"
                    value={editingPost.cover_image || ''}
                    onChange={(url) => setEditingPost({ ...editingPost, cover_image: url })}
                    placeholder="/images/logo.jpeg or https://..."
                    helperText="Upload from your computer/device or choose from clinic gallery"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block font-bold text-slate-700">
                    SEO Keywords (comma separated)
                  </label>
                  <input
                    type="text"
                    value={editingPost.target_keywords_en || ''}
                    onChange={(e) =>
                      setEditingPost({ ...editingPost, target_keywords_en: e.target.value })
                    }
                    placeholder="dentist ashulia, root canal savar, tooth scaling"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl bg-white text-xs focus:ring-2 focus:ring-navy-primary/20 focus:outline-none"
                  />
                </div>
              </div>

              {/* Publish Toggle Checkbox */}
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <input
                  type="checkbox"
                  id="isPublished"
                  checked={editingPost.is_published ?? true}
                  onChange={(e) =>
                    setEditingPost({ ...editingPost, is_published: e.target.checked })
                  }
                  className="w-4 h-4 rounded text-navy-primary focus:ring-navy-primary/30 cursor-pointer accent-navy-primary"
                />
                <label htmlFor="isPublished" className="font-bold text-slate-700 cursor-pointer text-xs">
                  Publish article on live website (visible to public at /blog)
                </label>
              </div>

              {/* Modal Actions */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-xl font-bold cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-7 py-2.5 bg-navy-primary hover:bg-navy-light text-white rounded-xl font-bold cursor-pointer transition-all shadow-md disabled:opacity-50 flex items-center gap-2"
                >
                  {saving ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Saving to Database...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      <span>Save Article</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
