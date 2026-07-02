'use client';

import { ArrowRight, Copy, FileArchive, FileImage, FileText, KeyRound, Lock, LogOut, ShieldCheck, Upload, Wand2 } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

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

type ApiResult<T> = T & { error?: string };

async function api<T>(path: string, init?: RequestInit) {
  const res = await fetch(`/api/${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers || {})
    }
  });
  const data = (await res.json().catch(() => ({}))) as ApiResult<T>;
  if (!res.ok) throw new Error(data.error || 'Something did not go through.');
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
      setMessage('Brand material uploaded.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Upload failed.');
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
              Upload protected brand materials, generate one-time client access, and keep the customer-facing portal locked down.
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
              <p className="text-sm font-black uppercase tracking-[.2em] text-black/55">One-time login</p>
              <h2 className="mt-3 text-3xl font-black uppercase leading-none">Generate client access.</h2>
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
          <div className="mt-10">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="kicker">Current library</p>
                <h2 className="mt-3 text-4xl font-black uppercase">Uploaded material.</h2>
              </div>
              <button className="btn-ghost" onClick={() => loadMaterials()}>
                Refresh
              </button>
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
        body: JSON.stringify({ token })
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
  const protectedMessage = useMemo(
    () => (locked ? 'One-time client login required.' : 'Protected viewing session active. Direct saving is intentionally limited.'),
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
              View-only access for approved brand material. The login can be used once; after that, only the active viewing session remains.
            </p>
          </div>
          <div className="border border-[var(--acid)] bg-white/[.04] p-5">
            <div className="flex gap-4">
              <ShieldCheck className="mt-1 text-[var(--acid)]" />
              <div>
                <h2 className="text-xl font-black uppercase">{protectedMessage}</h2>
                <p className="mt-2 text-sm leading-6 text-white/60">
                  Right-click, copy, print, drag-save, and common save shortcuts are disabled here. This reduces casual theft, but does not replace watermarking or legal controls.
                </p>
              </div>
            </div>
          </div>
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
                <iframe src={viewUrl} title={material.label || material.fileName} className="h-72 w-full border-0" />
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
