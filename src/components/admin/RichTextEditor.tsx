'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { ImageSelector } from './ImageSelector';
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Link as LinkIcon,
  Unlink,
  Image as ImageIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Undo,
  Redo,
  Code,
  Minus,
  Eraser,
  Eye,
  Maximize2,
  Minimize2,
  Info,
  AlertTriangle,
  Clock,
  Sparkles,
  Check,
  X
} from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  minHeight?: string;
  onEstimateReadTime?: (enTime: string, bnTime: string) => void;
}

export function RichTextEditor({
  value,
  onChange,
  placeholder = 'Write your article content here...',
  label,
  minHeight = '280px',
  onEstimateReadTime,
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isCodeView, setIsCodeView] = useState(false);
  const [codeValue, setCodeValue] = useState(value || '');
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Link dialog state
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [linkText, setLinkText] = useState('');
  const savedSelectionRef = useRef<Range | null>(null);

  // Image dialog state
  const [showImageModal, setShowImageModal] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [imageAlt, setImageAlt] = useState('');

  // Active toolbar formats
  const [activeFormats, setActiveFormats] = useState<{ [key: string]: boolean }>({});

  // Sync editor content with incoming value when not focused
  useEffect(() => {
    if (!editorRef.current) return;
    if (editorRef.current.innerHTML !== (value || '')) {
      // Only set if different to avoid cursor position resetting while typing
      if (document.activeElement !== editorRef.current) {
        editorRef.current.innerHTML = value || '';
      }
    }
    setCodeValue(value || '');
  }, [value]);

  // Update active formatting states
  const updateToolbarState = useCallback(() => {
    if (typeof document === 'undefined') return;
    try {
      setActiveFormats({
        bold: document.queryCommandState('bold'),
        italic: document.queryCommandState('italic'),
        underline: document.queryCommandState('underline'),
        strikethrough: document.queryCommandState('strikeThrough'),
        insertUnorderedList: document.queryCommandState('insertUnorderedList'),
        insertOrderedList: document.queryCommandState('insertOrderedList'),
        justifyLeft: document.queryCommandState('justifyLeft'),
        justifyCenter: document.queryCommandState('justifyCenter'),
        justifyRight: document.queryCommandState('justifyRight'),
      });
    } catch {
      // safe fallback
    }
  }, []);

  useEffect(() => {
    const handleSelectionChange = () => {
      if (editorRef.current && editorRef.current.contains(document.getSelection()?.anchorNode || null)) {
        updateToolbarState();
      }
    };
    document.addEventListener('selectionchange', handleSelectionChange);
    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange);
    };
  }, [updateToolbarState]);

  // Command runner
  const executeCommand = (command: string, arg: string | undefined = undefined) => {
    if (isCodeView) return;
    if (!editorRef.current) return;
    editorRef.current.focus();

    if (command === 'formatBlock') {
      document.execCommand('formatBlock', false, arg);
    } else {
      document.execCommand(command, false, arg);
    }

    const newHtml = editorRef.current.innerHTML;
    onChange(newHtml);
    setCodeValue(newHtml);
    updateToolbarState();
  };

  const handleEditorInput = () => {
    if (!editorRef.current) return;
    const newHtml = editorRef.current.innerHTML;
    onChange(newHtml);
    setCodeValue(newHtml);
    updateToolbarState();
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setCodeValue(val);
    onChange(val);
    if (editorRef.current) {
      editorRef.current.innerHTML = val;
    }
  };

  // Save current cursor selection for dialogs
  const saveCurrentSelection = () => {
    if (typeof window === 'undefined') return;
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      savedSelectionRef.current = sel.getRangeAt(0).cloneRange();
      const selectedText = sel.toString();
      if (selectedText) {
        setLinkText(selectedText);
      }
    }
  };

  const restoreSavedSelection = () => {
    if (typeof window === 'undefined' || !savedSelectionRef.current) return;
    const sel = window.getSelection();
    if (sel) {
      sel.removeAllRanges();
      sel.addRange(savedSelectionRef.current);
    }
  };

  // Open link modal
  const openLinkModal = () => {
    saveCurrentSelection();
    setLinkUrl('');
    setShowLinkModal(true);
  };

  const applyLink = () => {
    setShowLinkModal(false);
    if (!linkUrl) return;
    if (editorRef.current) {
      editorRef.current.focus();
      restoreSavedSelection();

      let targetUrl = linkUrl.trim();
      if (!/^https?:\/\//i.test(targetUrl) && !targetUrl.startsWith('/')) {
        targetUrl = 'https://' + targetUrl;
      }

      if (linkText && savedSelectionRef.current && savedSelectionRef.current.collapsed) {
        document.execCommand(
          'insertHTML',
          false,
          `<a href="${targetUrl}" target="_blank" rel="noopener noreferrer" class="text-medical-teal font-semibold underline">${linkText}</a>`
        );
      } else {
        document.execCommand('createLink', false, targetUrl);
      }

      handleEditorInput();
    }
  };

  // Open image modal
  const openImageModal = () => {
    saveCurrentSelection();
    setImageUrl('');
    setImageAlt('');
    setShowImageModal(true);
  };

  const applyImage = () => {
    setShowImageModal(false);
    if (!imageUrl) return;
    if (editorRef.current) {
      editorRef.current.focus();
      restoreSavedSelection();

      const imgHtml = `<figure class="my-4 text-center">
        <img src="${imageUrl}" alt="${imageAlt || 'Article illustration'}" class="rounded-2xl max-w-full mx-auto shadow-sm border border-slate-200 max-h-[380px] object-cover" />
        ${imageAlt ? `<figcaption class="text-xs text-slate-500 mt-2 italic">${imageAlt}</figcaption>` : ''}
      </figure><p><br></p>`;

      document.execCommand('insertHTML', false, imgHtml);
      handleEditorInput();
    }
  };

  // Insert Special Callout Blocks
  const insertCallout = (type: 'info' | 'warning' | 'quote') => {
    if (!editorRef.current) return;
    editorRef.current.focus();

    let htmlSnippet = '';
    if (type === 'info') {
      htmlSnippet = `<div class="callout-box bg-blue-50/80 border-l-4 border-medical-teal p-4 rounded-r-xl my-4 text-slate-800">
        <strong class="text-medical-teal block mb-1">💡 Doctor's Clinical Tip:</strong>
        <p>Enter helpful clinical advice or patient guidance here...</p>
      </div><p><br></p>`;
    } else if (type === 'warning') {
      htmlSnippet = `<div class="warning-box bg-amber-50/80 border-l-4 border-amber-500 p-4 rounded-r-xl my-4 text-slate-800">
        <strong class="text-amber-600 block mb-1">⚠️ Important Patient Precaution:</strong>
        <p>Avoid chewing hard foods on the treated side for the first 24 hours...</p>
      </div><p><br></p>`;
    } else if (type === 'quote') {
      htmlSnippet = `<blockquote class="border-l-4 border-medical-mint bg-emerald-50/50 pl-4 py-2 my-4 rounded-r-xl italic text-slate-700 font-medium">
        "Early dental prevention preserves natural smile longevity far better than extraction."
      </blockquote><p><br></p>`;
    }

    document.execCommand('insertHTML', false, htmlSnippet);
    handleEditorInput();
  };

  // Word & Reading Time stats
  const textOnly = (value || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  const wordCount = textOnly ? textOnly.split(/\s+/).length : 0;
  const charCount = textOnly.length;
  const estimatedMins = Math.max(1, Math.ceil(wordCount / 180));

  const handleApplyReadTime = () => {
    if (onEstimateReadTime) {
      const bnNumbers = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
      const bnMins = String(estimatedMins)
        .split('')
        .map((d) => bnNumbers[parseInt(d, 10)] || d)
        .join('');
      onEstimateReadTime(`${estimatedMins} min read`, `${bnMins} মিনিট পড়ার সময়`);
    }
  };

  return (
    <div
      className={`flex flex-col bg-white rounded-2xl border border-slate-200 shadow-2xs transition-all overflow-hidden ${
        isFullscreen
          ? 'fixed inset-4 z-50 shadow-2xl flex flex-col max-h-[calc(100vh-2rem)]'
          : 'relative w-full'
      }`}
    >
      {/* Editor Header / Label */}
      {label && (
        <div className="px-4 py-2.5 bg-slate-50/80 border-b border-slate-200/80 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-700 tracking-wide flex items-center gap-2">
            <span>{label}</span>
          </span>
          <div className="flex items-center gap-3 text-[11px] text-slate-500 font-medium">
            <span>{wordCount} words</span>
            <span>•</span>
            <span>{charCount} chars</span>
            {onEstimateReadTime && wordCount > 20 && (
              <button
                type="button"
                onClick={handleApplyReadTime}
                className="inline-flex items-center gap-1 text-[11px] font-bold text-navy-primary hover:text-medical-teal transition-colors px-2 py-0.5 rounded-md bg-white border border-slate-200 shadow-2xs hover:bg-slate-50 cursor-pointer"
                title="Automatically calculate read time and apply to form fields"
              >
                <Sparkles className="w-3 h-3 text-amber-500" />
                <span>Auto Read Time ({estimatedMins}m)</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Modern Toolbar */}
      <div className="p-2 bg-slate-50/90 border-b border-slate-200 flex flex-wrap items-center gap-1 text-slate-700 text-xs select-none">
        {/* Headings */}
        <div className="flex items-center bg-white border border-slate-200 rounded-lg p-0.5 shadow-2xs mr-1">
          <button
            type="button"
            onClick={() => executeCommand('formatBlock', '<h2>')}
            title="Heading 2 (Section Title)"
            className="p-1.5 rounded hover:bg-slate-100 font-bold flex items-center gap-0.5 text-xs text-slate-700 cursor-pointer"
          >
            <Heading2 className="w-4 h-4 text-navy-primary" />
            <span className="hidden sm:inline text-[10px]">H2</span>
          </button>
          <button
            type="button"
            onClick={() => executeCommand('formatBlock', '<h3>')}
            title="Heading 3 (Sub-heading)"
            className="p-1.5 rounded hover:bg-slate-100 font-bold flex items-center gap-0.5 text-xs text-slate-700 cursor-pointer"
          >
            <Heading3 className="w-4 h-4 text-navy-primary" />
            <span className="hidden sm:inline text-[10px]">H3</span>
          </button>
          <button
            type="button"
            onClick={() => executeCommand('formatBlock', '<p>')}
            title="Regular Paragraph"
            className="p-1.5 rounded hover:bg-slate-100 font-medium text-xs text-slate-600 cursor-pointer"
          >
            <span className="text-[11px] font-bold px-1">P</span>
          </button>
        </div>

        {/* Inline styles: Bold, Italic, Underline, Strike */}
        <div className="flex items-center bg-white border border-slate-200 rounded-lg p-0.5 shadow-2xs mr-1">
          <button
            type="button"
            onClick={() => executeCommand('bold')}
            title="Bold (Ctrl+B)"
            className={`p-1.5 rounded hover:bg-slate-100 cursor-pointer transition-colors ${
              activeFormats.bold ? 'bg-navy-primary text-white hover:bg-navy-primary' : 'text-slate-700'
            }`}
          >
            <Bold className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => executeCommand('italic')}
            title="Italic (Ctrl+I)"
            className={`p-1.5 rounded hover:bg-slate-100 cursor-pointer transition-colors ${
              activeFormats.italic ? 'bg-navy-primary text-white hover:bg-navy-primary' : 'text-slate-700'
            }`}
          >
            <Italic className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => executeCommand('underline')}
            title="Underline (Ctrl+U)"
            className={`p-1.5 rounded hover:bg-slate-100 cursor-pointer transition-colors ${
              activeFormats.underline ? 'bg-navy-primary text-white hover:bg-navy-primary' : 'text-slate-700'
            }`}
          >
            <Underline className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => executeCommand('strikeThrough')}
            title="Strikethrough"
            className={`p-1.5 rounded hover:bg-slate-100 cursor-pointer transition-colors ${
              activeFormats.strikethrough ? 'bg-navy-primary text-white hover:bg-navy-primary' : 'text-slate-700'
            }`}
          >
            <Strikethrough className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Lists & Quotes */}
        <div className="flex items-center bg-white border border-slate-200 rounded-lg p-0.5 shadow-2xs mr-1">
          <button
            type="button"
            onClick={() => executeCommand('insertUnorderedList')}
            title="Bullet List"
            className={`p-1.5 rounded hover:bg-slate-100 cursor-pointer transition-colors ${
              activeFormats.insertUnorderedList ? 'bg-navy-primary text-white hover:bg-navy-primary' : 'text-slate-700'
            }`}
          >
            <List className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => executeCommand('insertOrderedList')}
            title="Numbered List"
            className={`p-1.5 rounded hover:bg-slate-100 cursor-pointer transition-colors ${
              activeFormats.insertOrderedList ? 'bg-navy-primary text-white hover:bg-navy-primary' : 'text-slate-700'
            }`}
          >
            <ListOrdered className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => insertCallout('quote')}
            title="Blockquote"
            className="p-1.5 rounded hover:bg-slate-100 text-slate-700 cursor-pointer"
          >
            <Quote className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Alignment */}
        <div className="hidden sm:flex items-center bg-white border border-slate-200 rounded-lg p-0.5 shadow-2xs mr-1">
          <button
            type="button"
            onClick={() => executeCommand('justifyLeft')}
            title="Align Left"
            className={`p-1.5 rounded hover:bg-slate-100 cursor-pointer ${
              activeFormats.justifyLeft ? 'bg-navy-primary text-white' : 'text-slate-700'
            }`}
          >
            <AlignLeft className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => executeCommand('justifyCenter')}
            title="Align Center"
            className={`p-1.5 rounded hover:bg-slate-100 cursor-pointer ${
              activeFormats.justifyCenter ? 'bg-navy-primary text-white' : 'text-slate-700'
            }`}
          >
            <AlignCenter className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => executeCommand('justifyRight')}
            title="Align Right"
            className={`p-1.5 rounded hover:bg-slate-100 cursor-pointer ${
              activeFormats.justifyRight ? 'bg-navy-primary text-white' : 'text-slate-700'
            }`}
          >
            <AlignRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Media & Links */}
        <div className="flex items-center bg-white border border-slate-200 rounded-lg p-0.5 shadow-2xs mr-1">
          <button
            type="button"
            onClick={openLinkModal}
            title="Insert Hyperlink"
            className="p-1.5 rounded hover:bg-slate-100 text-slate-700 cursor-pointer"
          >
            <LinkIcon className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => executeCommand('unlink')}
            title="Remove Hyperlink"
            className="p-1.5 rounded hover:bg-slate-100 text-slate-700 cursor-pointer"
          >
            <Unlink className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={openImageModal}
            title="Insert Image"
            className="p-1.5 rounded hover:bg-slate-100 text-slate-700 cursor-pointer"
          >
            <ImageIcon className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => executeCommand('insertHorizontalRule')}
            title="Horizontal Divider"
            className="p-1.5 rounded hover:bg-slate-100 text-slate-700 cursor-pointer"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Special Clinical Blocks */}
        <div className="flex items-center bg-white border border-slate-200 rounded-lg p-0.5 shadow-2xs mr-1">
          <button
            type="button"
            onClick={() => insertCallout('info')}
            title="Insert Clinical Advice Box"
            className="p-1.5 rounded hover:bg-blue-50 text-medical-teal font-medium flex items-center gap-1 cursor-pointer"
          >
            <Info className="w-3.5 h-3.5" />
            <span className="hidden md:inline text-[10px] font-bold">Tip</span>
          </button>
          <button
            type="button"
            onClick={() => insertCallout('warning')}
            title="Insert Caution / Warning Box"
            className="p-1.5 rounded hover:bg-amber-50 text-amber-600 font-medium flex items-center gap-1 cursor-pointer"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span className="hidden md:inline text-[10px] font-bold">Caution</span>
          </button>
        </div>

        {/* Undo / Redo / Clear */}
        <div className="flex items-center bg-white border border-slate-200 rounded-lg p-0.5 shadow-2xs mr-1">
          <button
            type="button"
            onClick={() => executeCommand('undo')}
            title="Undo"
            className="p-1.5 rounded hover:bg-slate-100 text-slate-700 cursor-pointer"
          >
            <Undo className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => executeCommand('redo')}
            title="Redo"
            className="p-1.5 rounded hover:bg-slate-100 text-slate-700 cursor-pointer"
          >
            <Redo className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => executeCommand('removeFormat')}
            title="Clear Formatting"
            className="p-1.5 rounded hover:bg-slate-100 text-slate-700 cursor-pointer"
          >
            <Eraser className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Toggle Code / Fullscreen View */}
        <div className="ml-auto flex items-center gap-1">
          <button
            type="button"
            onClick={() => setIsCodeView(!isCodeView)}
            title={isCodeView ? 'Visual WYSIWYG Mode' : 'HTML Code Mode'}
            className={`p-1.5 rounded-lg border font-bold flex items-center gap-1 text-[11px] cursor-pointer transition-colors ${
              isCodeView
                ? 'bg-navy-primary text-white border-navy-primary'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            {isCodeView ? <Eye className="w-3.5 h-3.5" /> : <Code className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{isCodeView ? 'Visual' : 'HTML Code'}</span>
          </button>

          <button
            type="button"
            onClick={() => setIsFullscreen(!isFullscreen)}
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen Editor'}
            className="p-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 cursor-pointer transition-colors"
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Editor Content Area */}
      <div className="relative flex-1 bg-white overflow-y-auto">
        {isCodeView ? (
          <textarea
            value={codeValue}
            onChange={handleCodeChange}
            placeholder="Paste or write HTML code directly here..."
            className="w-full h-full p-4 font-mono text-xs text-slate-800 bg-slate-900/5 focus:outline-none resize-none leading-relaxed"
            style={{ minHeight }}
          />
        ) : (
          <div
            ref={editorRef}
            contentEditable
            onInput={handleEditorInput}
            onBlur={handleEditorInput}
            data-placeholder={placeholder}
            className="rich-editor-content w-full p-4 sm:p-6 text-slate-800 focus:outline-none leading-relaxed text-sm sm:text-base prose max-w-none empty:before:content-[attr(data-placeholder)] empty:before:text-slate-400 empty:before:pointer-events-none"
            style={{ minHeight }}
          />
        )}
      </div>

      {/* Footer Info */}
      <div className="px-4 py-2 bg-slate-50 border-t border-slate-200/80 text-[11px] text-slate-500 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Rich Text Editor Active</span>
        </div>
        <div className="flex items-center gap-3">
          <span>Est. Reading Time: ~{estimatedMins} min</span>
          {isFullscreen && (
            <button
              type="button"
              onClick={() => setIsFullscreen(false)}
              className="text-navy-primary font-bold hover:underline"
            >
              Exit Fullscreen
            </button>
          )}
        </div>
      </div>

      {/* Link Inserter Modal */}
      {showLinkModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-60">
          <div className="bg-white rounded-2xl p-5 max-w-md w-full shadow-2xl border border-slate-200 space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h4 className="text-sm font-bold text-navy-primary flex items-center gap-2">
                <LinkIcon className="w-4 h-4 text-medical-teal" />
                <span>Insert Link</span>
              </h4>
              <button
                type="button"
                onClick={() => setShowLinkModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Link URL</label>
                <input
                  type="text"
                  placeholder="https://example.com or /contact"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-navy-primary/20 focus:outline-none"
                  autoFocus
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Display Text (optional)</label>
                <input
                  type="text"
                  placeholder="Text to display"
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-navy-primary/20 focus:outline-none"
                />
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowLinkModal(false)}
                className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={applyLink}
                className="px-4 py-1.5 rounded-xl bg-navy-primary hover:bg-navy-light text-white text-xs font-bold shadow-xs cursor-pointer"
              >
                Insert Link
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Image Inserter Modal */}
      {showImageModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-60">
          <div className="bg-white rounded-2xl p-5 max-w-md w-full shadow-2xl border border-slate-200 space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h4 className="text-sm font-bold text-navy-primary flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-medical-teal" />
                <span>Insert Article Image</span>
              </h4>
              <button
                type="button"
                onClick={() => setShowImageModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3 text-xs">
              <ImageSelector
                label="Article Image Source"
                value={imageUrl}
                onChange={(url) => setImageUrl(url)}
                placeholder="https://... or /images/..."
                helperText="Upload image from computer/phone, choose from gallery, or paste a URL"
              />
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Caption / Alt Text (Optional)</label>
                <input
                  type="text"
                  placeholder="E.g., Ultrasonic scaler in operation"
                  value={imageAlt}
                  onChange={(e) => setImageAlt(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-navy-primary/20 focus:outline-none"
                />
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowImageModal(false)}
                className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={applyImage}
                className="px-4 py-1.5 rounded-xl bg-navy-primary hover:bg-navy-light text-white text-xs font-bold shadow-xs cursor-pointer"
              >
                Insert Image
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
