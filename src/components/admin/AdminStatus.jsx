import React, { useState } from 'react';
import { CheckCircle2, Database, RefreshCw, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cms } from '@/api/cmsService';
import { getSupabaseConfigStatus } from '@/api/supabaseClient';
import { DEFAULT_BUCKET } from '@/api/storageService';

export default function AdminStatus() {
  const [checking, setChecking] = useState(false);
  const [result, setResult] = useState(null);
  const config = getSupabaseConfigStatus();

  const runCheck = async () => {
    setChecking(true);
    const next = {
      config,
      bucket: DEFAULT_BUCKET,
      tables: {},
      write: null,
    };

    try {
      next.tables = await cms.testTables();
      await cms.testSupabaseWrite();
      next.write = { ok: true };
    } catch (error) {
      next.write = { ok: false, error: error.message };
    } finally {
      setResult(next);
      setChecking(false);
    }
  };

  const tables = result?.tables || {};
  const tableItems = Object.entries(tables);
  const allTablesOk = tableItems.length > 0 && tableItems.every(([, value]) => value.ok);
  const writeOk = result?.write?.ok;

  return (
    <div className="bg-card border border-border rounded-2xl p-5 mb-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-semibold text-foreground">Status do Supabase</h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              Use este teste quando algo nao salvar. Ele confirma variaveis, tabelas e gravacao real.
            </p>
          </div>
        </div>
        <Button onClick={runCheck} disabled={checking} variant="outline" className="rounded-full gap-2">
          <RefreshCw className={`w-4 h-4 ${checking ? 'animate-spin' : ''}`} />
          {checking ? 'Testando...' : 'Testar conexao'}
        </Button>
      </div>

      <div className="grid sm:grid-cols-3 gap-3 mt-5">
        <StatusPill ok={config.configured} label="Variaveis Vercel" detail={config.configured ? 'OK' : 'Faltam URL ou ANON KEY'} />
        <StatusPill ok={result ? allTablesOk : null} label="Tabelas" detail={result ? (allTablesOk ? 'OK' : 'Com erro') : 'Nao testado'} />
        <StatusPill ok={result ? writeOk : null} label="Salvar no banco" detail={result ? (writeOk ? 'OK' : 'Com erro') : 'Nao testado'} />
      </div>

      {result?.write?.error && (
        <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {result.write.error}
        </div>
      )}

      {tableItems.some(([, value]) => !value.ok) && (
        <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800 space-y-1">
          {tableItems.filter(([, value]) => !value.ok).map(([name, value]) => (
            <p key={name}><strong>{value.table}:</strong> {value.error}</p>
          ))}
        </div>
      )}
    </div>
  );
}

function StatusPill({ ok, label, detail }) {
  const Icon = ok === false ? XCircle : CheckCircle2;
  const color = ok === true ? 'text-emerald-700 bg-emerald-50 border-emerald-200' : ok === false ? 'text-red-700 bg-red-50 border-red-200' : 'text-muted-foreground bg-secondary border-border';
  return (
    <div className={`rounded-xl border p-3 ${color}`}>
      <div className="flex items-center gap-2 font-medium text-sm">
        <Icon className="w-4 h-4" />
        {label}
      </div>
      <p className="text-xs mt-1 opacity-80">{detail}</p>
    </div>
  );
}
