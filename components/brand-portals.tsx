'use client';

import { ArrowRight, Copy, FileArchive, FileImage, FileText, KeyRound, Lock, LogOut, ShieldCheck, Trash2, Upload, Wand2 } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';

type PortalMaterial = {
  id: string;
  fileName: string;
  label: string;
  note: string;
  contentType: string;
  size: number;
  uploadedAt: string;
  viewUrl?: string;
};

type ChatSession = {
  id: string;
  status: string;
  pageUrl: string;
  visitorName: string;
  visitorEmail: string;
  visitorPhone: string;
  need: string;
  lastMessage: string;
  lastSender: string;
  createdAt: string;
  updatedAt: string;
};

type ChatMessage = {
  id: string;
  sender: 'visitor' | 'rep';
  text: string;
  createdAt: string;
};

type ApiResult<T> = T & { error?: string };

function cleanApiError(path: string, data: ApiResult<unknown>) {
  const raw = data.error || '';
  if (!raw) return 'Something did not go through.';
  if (raw.includes('ResourceNotFound') || raw.includes('odata.error')) {
    if (path === 'portal-login') {
      return 'That one-time access code was not found. Generate a fresh portal link from admin and try again.';
    }
    return 'That protected portal resource was not found.';
  }
  return raw;
}

function portalCodeFromInput(value: string) {
  const trimmed = value.trim();
  try {
    return new URL(trimmed).searchParams.get('token') || trimmed;
  } catch {
    return trimmed;
  }
}

async function api<T>(path: string, init?: RequestInit) {
  const res = await fetch(`/api/${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers || {})
    }
  });
  const contentType = res.headers.get('content-type') || '';
  const data = contentType.includes('application/json')
    ? ((await res.json().catch(() => ({}))) as ApiResult<T>)
    : ({ error: 'The brand portal API is not responding. Check that /api traffic is routed to the portal backend.' } as ApiResult<T>);
  if (!res.ok) throw new Error(cleanApiError(path, data));
  if (!contentType.includes('application/json')) throw new Error(cleanApiError(path, data));
  return data;
}

function bytes(size: number) {
  if (!Number.isFinite(size)) return 'Unknown size';
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  return `${(size / 1024 / 1024).toFixed(1)} MB`;
}

function materialIcon(contentType: string) {
  if (contentType.startsWith('image/')) return FileImage;
  if (contentType.includes('pdf') || contentType.startsWith('text/')) return FileText;
  return FileArchive;
}

function readFile(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(',')[1] || '');
    reader.onerror = () => reject(new Error('Could not read that file.'));
    reader.readAsDataURL(file);
  });
}

function PdfPreview({ title, url }: { title: string; url: string }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [status, setStatus] = useState('Loading PDF preview...');

  useEffect(() => {
    let cancelled = false;
    const container = containerRef.current;
    if (!container) return;

    container.replaceChildren();
    setStatus('Loading PDF preview...');

    async function renderPdf() {
      try {
        const [pdfjs, response] = await Promise.all([
          import('pdfjs-dist'),
          fetch(url, { cache: 'no-store' })
        ]);
        if (!response.ok) throw new Error('PDF preview could not be loaded.');

        pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
        const data = await response.arrayBuffer();
        const documentTask = pdfjs.getDocument({ data });
        const pdf = await documentTask.promise;
        const pageLimit = Math.min(pdf.numPages, 8);
        const targetWidth = Math.max(260, Math.min(container.clientWidth || 560, 700));

        for (let pageNumber = 1; pageNumber <= pageLimit; pageNumber += 1) {
          if (cancelled) return;
          const page = await pdf.getPage(pageNumber);
          const baseViewport = page.getViewport({ scale: 1 });
          const scale = targetWidth / baseViewport.width;
          const viewport = page.getViewport({ scale });
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          if (!context) throw new Error('PDF preview is not supported in this browser.');

          const outputScale = window.devicePixelRatio || 1;
          canvas.width = Math.floor(viewport.width * outputScale);
          canvas.height = Math.floor(viewport.height * outputScale);
          canvas.style.width = `${Math.floor(viewport.width)}px`;
          canvas.style.height = `${Math.floor(viewport.height)}px`;
          canvas.className = 'mx-auto block border border-white/10 bg-white shadow-lg';
          canvas.draggable = false;
          canvas.setAttribute('aria-label', `${title}, page ${pageNumber}`);

          container.appendChild(canvas);
          await page.render({
            canvas,
            canvasContext: context,
            viewport,
            transform: outputScale !== 1 ? [outputScale, 0, 0, outputScale, 0, 0] : undefined
          }).promise;
        }

        if (cancelled) return;
        setStatus(pdf.numPages > pageLimit ? `Showing first ${pageLimit} of ${pdf.numPages} pages.` : '');
      } catch (error) {
        if (!cancelled) setStatus(error instanceof Error ? error.message : 'PDF preview could not be loaded.');
      }
    }

    renderPdf();
    return () => {
      cancelled = true;
      container.replaceChildren();
    };
  }, [title, url]);

  return (
    <div
      className="h-72 w-full overflow-y-auto bg-black/80 px-3 py-4"
      aria-label={title}
      onContextMenu={(event) => event.preventDefault()}
      onCopy={(event) => event.preventDefault()}
      onCut={(event) => event.preventDefault()}
      onDragStart={(event) => event.preventDefault()}
    >
      <div ref={containerRef} className="grid gap-4" />
      {status ? <p className="mt-3 text-center text-sm text-white/55">{status}</p> : null}
    </div>
  );
}

export function AdminPortal() {
  const [password, setPassword] = useState('');
  const [adminKey, setAdminKey] = useState('');
  const [materials, setMaterials] = useState<PortalMaterial[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [label, setLabel] = useState('');
  const [note, setNote] = useState('');
  const [clientName, setClientName] = useState('');
  const [expiresHours, setExpiresHours] = useState(48);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [portalLink, setPortalLink] = useState('');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');

  async function loadMaterials(key = adminKey) {
    const data = await api<{ materials: PortalMaterial[] }>('admin-materials', {
      headers: { 'x-admin-password': key }
    });
    setMaterials(data.materials);
  }

  async function login(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setMessage('');
    try {
      await api('admin-login', {
        method: 'POST',
        body: JSON.stringify({ password })
      });
      setAdminKey(password);
      sessionStorage.setItem('emc-admin-key', password);
      await loadMaterials(password);
      setMessage('Admin access confirmed.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Login failed.');
    } finally {
      setBusy(false);
    }
  }

  async function upload(event: React.FormEvent) {
    event.preventDefault();
    if (!selectedFiles?.length) return;
    setBusy(true);
    setMessage('');
    try {
      const files = await Promise.all(
        Array.from(selectedFiles).map(async (file) => ({
          fileName: file.name,
          contentType: file.type || 'application/octet-stream',
          size: file.size,
          data: await readFile(file)
        }))
      );
      await api('admin-upload', {
        method: 'POST',
        headers: { 'x-admin-password': adminKey },
        body: JSON.stringify({ label, note, files })
      });
      setSelectedFiles(null);
      setLabel('');
      setNote('');
      await loadMaterials();
      setPortalLink('');
      setMessage('New brand material uploaded. Previous files and customer access were cleared.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Upload failed.');
    } finally {
      setBusy(false);
    }
  }

  async function clearPortal() {
    if (!window.confirm('Clear every brand file and revoke all active customer links and sessions? This cannot be undone.')) return;
    setBusy(true);
    setMessage('');
    try {
      const data = await api<{ deletedMaterials: number; message: string }>('admin-clear-portal', {
        method: 'POST',
        headers: { 'x-admin-password': adminKey }
      });
      setMaterials([]);
      setPortalLink('');
      setMessage(`${data.message} ${data.deletedMaterials} file${data.deletedMaterials === 1 ? '' : 's'} removed.`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Could not clear the brand portal.');
    } finally {
      setBusy(false);
    }
  }

  async function createToken(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setMessage('');
    try {
      const data = await api<{ token: string; expiresAt: string }>('admin-create-token', {
        method: 'POST',
        headers: { 'x-admin-password': adminKey },
        body: JSON.stringify({ clientName, expiresHours })
      });
      const link = `${window.location.origin}/brand-portal/?token=${encodeURIComponent(data.token)}`;
      setPortalLink(link);
      setMessage(`One-time portal link created. It expires ${new Date(data.expiresAt).toLocaleString()}.`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Could not create portal login.');
    } finally {
      setBusy(false);
    }
  }

  async function changePassword(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setMessage('');
    try {
      if (newPassword.length < 12) {
        throw new Error('Use at least 12 characters for the new admin password.');
      }
      if (newPassword !== confirmPassword) {
        throw new Error('The new passwords do not match.');
      }
      await api('admin-change-password', {
        method: 'POST',
        headers: { 'x-admin-password': adminKey },
        body: JSON.stringify({ nextPassword: newPassword })
      });
      setAdminKey(newPassword);
      setPassword(newPassword);
      sessionStorage.setItem('emc-admin-key', newPassword);
      setNewPassword('');
      setConfirmPassword('');
      setMessage('Admin password changed. Use the new password next time.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Could not change admin password.');
    } finally {
      setBusy(false);
    }
  }

  function copyLink() {
    if (!portalLink) return;
    navigator.clipboard.writeText(portalLink);
    setMessage('Portal link copied.');
  }

  function logout() {
    setAdminKey('');
    setPassword('');
    setMaterials([]);
    sessionStorage.removeItem('emc-admin-key');
  }

  useEffect(() => {
    const saved = sessionStorage.getItem('emc-admin-key') || '';
    if (saved) {
      setAdminKey(saved);
      loadMaterials(saved).catch(() => sessionStorage.removeItem('emc-admin-key'));
    }
  }, []);

  return (
    <section className="min-h-screen bg-black px-4 py-16 text-white md:px-6 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div>
            <p className="kicker">Owner access</p>
            <h1 className="hero-title mt-4 font-black uppercase leading-[.8]">Brand portal admin.</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/68">
              Upload client brand materials, generate one-time review access, and manage the portal library.
            </p>
          </div>
          {adminKey ? (
            <button className="btn-ghost" onClick={logout}>
              <LogOut size={17} /> Log out
            </button>
          ) : null}
        </div>

        {message ? <p className="mt-8 border border-white/15 bg-white/[.04] p-4 text-sm text-white/78">{message}</p> : null}

        {!adminKey ? (
          <form onSubmit={login} className="mt-10 max-w-xl border border-white/15 bg-white/[.04] p-6">
            <label className="grid gap-2">
              <span className="form-label">Admin password</span>
              <input className="form-input" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
            </label>
            <button className="btn-acid mt-5" disabled={busy}>
              <Lock size={17} /> Enter admin
            </button>
          </form>
        ) : (
          <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_.9fr]">
            <form onSubmit={upload} className="border border-white/15 bg-white/[.04] p-6">
              <p className="kicker">Protected assets</p>
              <h2 className="mt-3 text-3xl font-black uppercase">Upload brand material.</h2>
              <div className="mt-6 grid gap-4">
                <label className="grid gap-2">
                  <span className="form-label">Label</span>
                  <input className="form-input" value={label} onChange={(event) => setLabel(event.target.value)} placeholder="Client logo package, brand guide, campaign proof..." />
                </label>
                <label className="grid gap-2">
                  <span className="form-label">Owner note</span>
                  <textarea className="form-input resize-y" rows={4} value={note} onChange={(event) => setNote(event.target.value)} placeholder="Usage note, context, or review instructions." />
                </label>
                <label className="grid gap-2">
                  <span className="form-label">Files</span>
                  <input className="form-input" type="file" multiple onChange={(event) => setSelectedFiles(event.target.files)} />
                </label>
              </div>
              <button className="btn-acid mt-5" disabled={busy || !selectedFiles?.length}>
                <Upload size={17} /> Upload files
              </button>
            </form>

            <form onSubmit={createToken} className="border border-[var(--acid)] bg-[var(--acid)] p-6 text-black">
              <p className="text-sm font-black uppercase tracking-[.2em] text-black/55">Client review</p>
              <h2 className="mt-3 text-3xl font-black uppercase leading-none">Generate review access.</h2>
              <div className="mt-6 grid gap-4">
                <label className="grid gap-2">
                  <span className="text-xs font-black uppercase tracking-[.18em] text-black/60">Client name</span>
                  <input className="rounded-sm border border-black/20 bg-white px-4 py-3 text-black outline-none" value={clientName} onChange={(event) => setClientName(event.target.value)} required />
                </label>
                <label className="grid gap-2">
                  <span className="text-xs font-black uppercase tracking-[.18em] text-black/60">Link expires in hours</span>
                  <input className="rounded-sm border border-black/20 bg-white px-4 py-3 text-black outline-none" type="number" min={1} max={168} value={expiresHours} onChange={(event) => setExpiresHours(Number(event.target.value))} />
                </label>
              </div>
              <button className="btn-dark mt-5" disabled={busy}>
                <Wand2 size={17} /> Generate one-time login
              </button>
              {portalLink ? (
                <div className="mt-5 rounded-sm bg-black p-4 text-white">
                  <p className="break-all text-sm text-white/78">{portalLink}</p>
                  <button type="button" className="btn-ghost mt-4" onClick={copyLink}>
                    <Copy size={17} /> Copy link
                  </button>
                </div>
              ) : null}
            </form>

            <form onSubmit={changePassword} className="border border-white/15 bg-white/[.04] p-6 lg:col-span-2">
              <p className="kicker">Owner security</p>
              <h2 className="mt-3 text-3xl font-black uppercase">Change admin password.</h2>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <label className="grid gap-2">
                  <span className="form-label">New password</span>
                  <input className="form-input" type="password" minLength={12} value={newPassword} onChange={(event) => setNewPassword(event.target.value)} required />
                </label>
                <label className="grid gap-2">
                  <span className="form-label">Confirm new password</span>
                  <input className="form-input" type="password" minLength={12} value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} required />
                </label>
              </div>
              <button className="btn-ghost mt-5" disabled={busy || !newPassword || !confirmPassword}>
                <KeyRound size={17} /> Update password
              </button>
            </form>
          </div>
        )}

        {adminKey ? (
          <LiveChatAdmin adminKey={adminKey} />
        ) : null}

        {adminKey ? (
          <div className="mt-10">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="kicker">Current library</p>
                <h2 className="mt-3 text-4xl font-black uppercase">Uploaded material.</h2>
              </div>
              <div className="flex flex-wrap gap-3">
                <button className="btn-ghost" onClick={() => loadMaterials()} disabled={busy}>
                  Refresh
                </button>
                <button className="btn-ghost" onClick={clearPortal} disabled={busy}>
                  <Trash2 size={17} /> Clear portal
                </button>
              </div>
            </div>
            <MaterialGrid materials={materials} admin adminKey={adminKey} />
          </div>
        ) : null}
      </div>
    </section>
  );
}

export function BrandPortal() {
  const [token, setToken] = useState('');
  const [sessionId, setSessionId] = useState('');
  const [materials, setMaterials] = useState<PortalMaterial[]>([]);
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const incomingToken = params.get('token') || '';
    const savedSession = sessionStorage.getItem('emc-brand-session') || '';
    if (incomingToken) setToken(incomingToken);
    if (savedSession) {
      setSessionId(savedSession);
      loadMaterials(savedSession).catch(() => sessionStorage.removeItem('emc-brand-session'));
    }
  }, []);

  async function loadMaterials(session = sessionId) {
    const data = await api<{ materials: PortalMaterial[] }>('portal-materials', {
      headers: { 'x-portal-session': session }
    });
    setMaterials(data.materials);
  }

  async function enter(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setMessage('');
    try {
      const data = await api<{ sessionId: string; expiresAt: string }>('portal-login', {
        method: 'POST',
        body: JSON.stringify({ token: portalCodeFromInput(token) })
      });
      setSessionId(data.sessionId);
      sessionStorage.setItem('emc-brand-session', data.sessionId);
      await loadMaterials(data.sessionId);
      window.history.replaceState(null, '', '/brand-portal/');
      setMessage(`Access opened. This viewing session expires ${new Date(data.expiresAt).toLocaleString()}.`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Portal access failed.');
    } finally {
      setBusy(false);
    }
  }

  const locked = !sessionId;
  const accessMessage = useMemo(
    () => (locked ? 'One-time client login required.' : 'Review session active.'),
    [locked]
  );

  return (
    <section className="min-h-screen bg-black px-4 py-16 text-white md:px-6 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
          <div>
            <p className="kicker">Client brand portal</p>
            <h1 className="hero-title mt-4 font-black uppercase leading-[.8]">Protected brand shelf.</h1>
            <p className="mt-5 text-lg leading-8 text-white/68">
              A private review space for brand files, proofs, and campaign materials shared by EMC Marketing.
            </p>
          </div>
          <div className="border border-[var(--acid)] bg-white/[.04] p-5">
            <div className="flex gap-4">
              <ShieldCheck className="mt-1 text-[var(--acid)]" />
              <div>
                <h2 className="text-xl font-black uppercase">{accessMessage}</h2>
                <p className="mt-2 text-sm leading-6 text-white/60">
                  Files are presented for client review in the browser. For downloadable files, final delivery, or permission changes, contact EMC Marketing.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5 flex justify-end">
          <Link href="/admin/" className="text-xs font-black uppercase tracking-[.18em] text-white/45 transition hover:text-[var(--acid)]">
            Owner access
          </Link>
        </div>

        {message ? <p className="mt-8 border border-white/15 bg-white/[.04] p-4 text-sm text-white/78">{message}</p> : null}

        {locked ? (
          <form onSubmit={enter} className="mt-10 max-w-2xl border border-white/15 bg-white/[.04] p-6">
            <label className="grid gap-2">
              <span className="form-label">One-time access code</span>
              <input className="form-input" value={token} onChange={(event) => setToken(event.target.value)} required />
            </label>
            <button className="btn-acid mt-5" disabled={busy}>
              <KeyRound size={17} /> Enter portal
            </button>
          </form>
        ) : (
          <div className="mt-10">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="kicker">View-only library</p>
                <h2 className="mt-3 text-4xl font-black uppercase">Brand material.</h2>
              </div>
              <button className="btn-ghost" onClick={() => loadMaterials()}>
                Refresh
              </button>
            </div>
            <MaterialGrid materials={materials} />
          </div>
        )}
      </div>
    </section>
  );
}

function LiveChatAdmin({ adminKey }: { adminKey: string }) {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activeId, setActiveId] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [reply, setReply] = useState('');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);

  async function loadSessions() {
    const data = await api<{ sessions: ChatSession[] }>('admin-chat-sessions', {
      headers: { 'x-admin-password': adminKey }
    });
    setSessions(data.sessions);
    const requestedChat = new URLSearchParams(window.location.search).get('chat') || '';
    if (requestedChat && data.sessions.some((session) => session.id === requestedChat)) {
      setActiveId(requestedChat);
      return;
    }
    if (!activeId && data.sessions[0]) setActiveId(data.sessions[0].id);
  }

  async function loadMessages(sessionId = activeId) {
    if (!sessionId) return;
    const data = await api<{ messages: ChatMessage[] }>(`chat-messages?sessionId=${encodeURIComponent(sessionId)}`);
    setMessages(data.messages);
  }

  async function sendReply(event: React.FormEvent) {
    event.preventDefault();
    if (!activeId || !reply.trim()) return;
    setBusy(true);
    setMessage('');
    try {
      await api('admin-chat-message', {
        method: 'POST',
        headers: { 'x-admin-password': adminKey },
        body: JSON.stringify({ sessionId: activeId, text: reply })
      });
      setReply('');
      await Promise.all([loadSessions(), loadMessages(activeId)]);
      setMessage('Reply sent to the visitor chat.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Could not send reply.');
    } finally {
      setBusy(false);
    }
  }

  useEffect(() => {
    loadSessions().catch((error) => setMessage(error instanceof Error ? error.message : 'Could not load chats.'));
  }, [adminKey]);

  useEffect(() => {
    if (!activeId) return;
    loadMessages(activeId).catch(() => undefined);
    const interval = window.setInterval(() => {
      loadSessions().catch(() => undefined);
      loadMessages(activeId).catch(() => undefined);
    }, 5000);
    return () => window.clearInterval(interval);
  }, [activeId, adminKey]);

  const activeSession = sessions.find((session) => session.id === activeId);

  return (
    <section className="mt-10 border border-[var(--acid)] bg-white/[.04] p-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="kicker">Live website chat</p>
          <h2 className="mt-3 text-4xl font-black uppercase">Visitor threads.</h2>
        </div>
        <button className="btn-ghost" onClick={() => loadSessions()}>
          Refresh
        </button>
      </div>
      {message ? <p className="mt-5 border border-white/15 bg-black/30 p-3 text-sm text-white/70">{message}</p> : null}
      <div className="mt-6 grid gap-5 lg:grid-cols-[.8fr_1.2fr]">
        <div className="grid max-h-[32rem] gap-3 overflow-y-auto">
          {sessions.length ? (
            sessions.map((session) => (
              <button
                key={session.id}
                className={`border p-4 text-left transition ${
                  session.id === activeId ? 'border-[var(--acid)] bg-[var(--acid)] text-black' : 'border-white/15 bg-black/30 text-white hover:border-[var(--acid)]'
                }`}
                onClick={() => setActiveId(session.id)}
              >
                <p className="text-sm font-black uppercase tracking-[.16em]">{session.visitorName || 'Website visitor'}</p>
                <p className="mt-2 line-clamp-2 text-sm opacity-75">{session.lastMessage || session.need || 'New chat started.'}</p>
                <p className="mt-3 text-xs uppercase tracking-[.14em] opacity-60">{new Date(session.updatedAt).toLocaleString()}</p>
              </button>
            ))
          ) : (
            <p className="border border-white/15 bg-black/30 p-4 text-sm text-white/60">No live chat sessions yet.</p>
          )}
        </div>
        <div className="border border-white/15 bg-black/40">
          {activeSession ? (
            <>
              <div className="border-b border-white/10 p-4">
                <h3 className="text-xl font-black">{activeSession.visitorName || 'Website visitor'}</h3>
                <p className="mt-1 text-sm text-white/55">
                  {[activeSession.visitorEmail, activeSession.visitorPhone, activeSession.need].filter(Boolean).join(' | ') || 'Contact details pending'}
                </p>
              </div>
              <div className="grid max-h-80 gap-3 overflow-y-auto p-4">
                {messages.length ? (
                  messages.map((chatMessage) => (
                    <div
                      key={chatMessage.id}
                      className={`max-w-[84%] rounded-sm p-3 text-sm leading-6 ${
                        chatMessage.sender === 'rep' ? 'justify-self-end bg-[var(--acid)] text-black' : 'justify-self-start bg-white/10 text-white'
                      }`}
                    >
                      {chatMessage.text}
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-white/55">No messages in this thread yet.</p>
                )}
              </div>
              <form onSubmit={sendReply} className="grid gap-3 border-t border-white/10 p-4">
                <textarea className="form-input resize-y" rows={3} value={reply} onChange={(event) => setReply(event.target.value)} placeholder="Reply to this visitor..." required />
                <button className="btn-acid justify-center" disabled={busy || !reply.trim()}>
                  Send reply
                </button>
              </form>
            </>
          ) : (
            <p className="p-5 text-sm text-white/60">Select a chat to reply.</p>
          )}
        </div>
      </div>
    </section>
  );
}

function MaterialGrid({ materials, admin = false, adminKey = '' }: { materials: PortalMaterial[]; admin?: boolean; adminKey?: string }) {
  if (!materials.length) {
    return <p className="mt-6 border border-white/15 bg-white/[.04] p-5 text-white/65">No brand materials are available yet.</p>;
  }

  return (
    <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {materials.map((material) => {
        const Icon = materialIcon(material.contentType);
        const viewUrl = material.viewUrl || `/api/admin-material?id=${encodeURIComponent(material.id)}&adminKey=${encodeURIComponent(adminKey)}`;
        return (
          <article key={material.id} className="overflow-hidden border border-white/15 bg-white/[.04]">
            <div className="grid min-h-52 place-items-center bg-black/70">
              {material.contentType.startsWith('image/') ? (
                <img src={viewUrl} alt={material.label || material.fileName} draggable={false} className="max-h-72 w-full object-contain" />
              ) : material.contentType === 'application/pdf' ? (
                admin ? (
                  <iframe src={viewUrl} title={material.label || material.fileName} className="h-72 w-full border-0" />
                ) : (
                  <PdfPreview title={material.label || material.fileName} url={viewUrl} />
                )
              ) : (
                <Icon className="text-[var(--acid)]" size={52} />
              )}
            </div>
            <div className="p-5">
              <h3 className="text-xl font-black">{material.label || material.fileName}</h3>
              <p className="mt-2 text-sm text-white/55">{material.fileName}</p>
              {material.note ? <p className="mt-3 text-sm leading-6 text-white/68">{material.note}</p> : null}
              <p className="mt-4 text-xs uppercase tracking-[.16em] text-white/45">
                {bytes(material.size)} · {new Date(material.uploadedAt).toLocaleDateString()}
              </p>
              {admin ? (
                <a href={viewUrl} target="_blank" rel="noreferrer" className="btn-ghost mt-4 inline-flex">
                  Open <ArrowRight size={17} />
                </a>
              ) : null}
            </div>
          </article>
        );
      })}
    </div>
  );
}
