import React, { useState } from 'react';
import { LogOut, Image, List, HelpCircle, Package, Briefcase, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AdminHeroSlides from './AdminHeroSlides';
import AdminServices from './AdminServices';
import AdminPlans from './AdminPlans';
import AdminFaq from './AdminFaq';
import AdminSiteSettings from './AdminSiteSettings';
import AdminStatus from './AdminStatus';

const TABS = [
  { id: 'hero', label: 'Carrossel Hero', icon: Image },
  { id: 'services', label: 'Serviços', icon: Briefcase },
  { id: 'plans', label: 'Planos', icon: Package },
  { id: 'faq', label: 'FAQ', icon: HelpCircle },
  { id: 'settings', label: 'Config. Gerais', icon: Settings },
];

export default function AdminDashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState('hero');

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="bg-card border-b border-border px-4 sm:px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-3">
          <img
            src="/assets/logo-nexor.svg"
            alt="NEXOR"
            className="h-9 w-9 rounded-full object-cover"
          />
          <div>
            <h1 className="font-playfair font-bold text-foreground text-lg leading-tight">Painel Admin</h1>
            <p className="text-xs text-muted-foreground">NEXOR Digital Group</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <a href="/" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="sm" className="rounded-full text-xs">Ver site</Button>
          </a>
          <Button variant="ghost" size="sm" onClick={onLogout} className="text-muted-foreground hover:text-foreground gap-1.5">
            <LogOut className="w-4 h-4" />
            Sair
          </Button>
        </div>
      </header>

      <div className="flex flex-col md:flex-row min-h-[calc(100vh-65px)]">
        {/* Sidebar */}
        <aside className="md:w-56 bg-card border-b md:border-b-0 md:border-r border-border p-4 flex md:flex-col gap-1">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all w-full text-left ${
                activeTab === tab.id
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
              }`}
            >
              <tab.icon className="w-4 h-4 flex-shrink-0" />
              <span className="hidden md:block">{tab.label}</span>
            </button>
          ))}
        </aside>

        {/* Content */}
        <main className="flex-1 p-4 sm:p-6 overflow-auto">
          <AdminStatus />
          {activeTab === 'hero' && <AdminHeroSlides />}
          {activeTab === 'services' && <AdminServices />}
          {activeTab === 'plans' && <AdminPlans />}
          {activeTab === 'faq' && <AdminFaq />}
          {activeTab === 'settings' && <AdminSiteSettings />}
        </main>
      </div>
    </div>
  );
}