import React, { useState } from 'react';
import { Award, Plus, Trash2, Edit3, CheckCircle2, Star, Users, Layers, ShieldCheck, Phone, Mail } from 'lucide-react';
import { SiteConfig, TeamMember, AboutConfig } from '../../types';
import { LaptopImageUploader } from '../LaptopImageUploader';

interface AboutTabProps {
  config: SiteConfig;
  onChangeConfig: (updated: SiteConfig) => void;
  teamMembers: TeamMember[];
  onUpdateTeamMembers: (updated: TeamMember[]) => void;
  onSave: () => void;
}

export const AboutTab: React.FC<AboutTabProps> = ({
  config,
  onChangeConfig,
  teamMembers,
  onUpdateTeamMembers,
  onSave
}) => {
  const about: AboutConfig = config.about || {
    badge: 'About Kaabsan Real Estate • Telesom Group Affiliate',
    title: 'Shaping Somaliland’s Urban Landscape & Communities',
    subtitle: 'Somaliland’s premier master developer of gated communities and modern infrastructure.',
    description: 'As a proud member of the Telesom Group ecosystem, Kaabsan Real Estate is dedicated to creating sustainable, master-planned residential communities, state-of-the-art commercial complexes, and world-class civil infrastructure across Somaliland.',
    vision: 'To be the most trusted, innovative, and sustainable master community developer in the Horn of Africa.',
    mission: 'To deliver superior quality housing with transparent Islamic financing, guaranteed freehold title deeds, and enduring engineering standards.',
    concretePlantTitle: 'Kaabsan Modern Ready-Mix & Batching Plant',
    concretePlantDesc: 'We operate an automated, German-engineered concrete batching facility in Hargeisa delivering lab-tested ready-mix concrete for all residential and civic builds.'
  };

  // Team Member editing state
  const [editingMemberId, setEditingMemberId] = useState<string | null>(null);
  const [isAddingMember, setIsAddingMember] = useState(false);
  const [memberForm, setMemberForm] = useState<Partial<TeamMember>>({
    name: '',
    role: '',
    bio: '',
    photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
    accolades: ['Telesom Group Leadership', 'Over 10 Years Real Estate Experience'],
    email: 'info@kaabsan.com',
    phone: '+252 63 6100090'
  });

  const handleUpdateAboutField = (field: keyof AboutConfig, val: string) => {
    const updatedAbout = { ...about, [field]: val };
    onChangeConfig({ ...config, about: updatedAbout });
  };

  const handleSaveMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!memberForm.name || !memberForm.role) return;

    if (editingMemberId) {
      const updated = teamMembers.map((m) =>
        m.id === editingMemberId ? ({ ...m, ...memberForm } as TeamMember) : m
      );
      onUpdateTeamMembers(updated);
      setEditingMemberId(null);
    } else {
      const newMember: TeamMember = {
        id: `team-${Date.now()}`,
        name: memberForm.name || 'Leadership Member',
        role: memberForm.role || 'Executive',
        bio: memberForm.bio || '',
        photo: memberForm.photo || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
        accolades: memberForm.accolades || ['Executive Leadership'],
        email: memberForm.email || 'info@kaabsan.com',
        phone: memberForm.phone || '+252 63 6100090',
        languages: ['Somali', 'English']
      };
      onUpdateTeamMembers([...teamMembers, newMember]);
      setIsAddingMember(false);
    }

    setMemberForm({
      name: '',
      role: '',
      bio: '',
      photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
      accolades: ['Telesom Group Leadership'],
      email: 'info@kaabsan.com',
      phone: '+252 63 6100090'
    });
  };

  const handleDeleteMember = (id: string) => {
    if (confirm('Are you sure you want to remove this executive team member?')) {
      onUpdateTeamMembers(teamMembers.filter((m) => m.id !== id));
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Award className="w-5 h-5 text-[#C2A55D]" />
            About Page & Executive Leadership Management
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Configure company history, corporate narrative, mission, vision, automated ready-mix batching facility, and leadership roster with direct laptop image uploads.
          </p>
        </div>

        <button
          type="button"
          onClick={onSave}
          className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer flex items-center gap-1.5 transition-colors"
        >
          <CheckCircle2 className="w-4 h-4" /> Save About Configuration
        </button>
      </div>

      {/* 1. Main About Story & Identity */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#C2A55D]" /> Corporate Story & Positioning
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Top Badge / Tagline</label>
            <input
              type="text"
              value={about.badge}
              onChange={(e) => handleUpdateAboutField('badge', e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 outline-none focus:bg-white focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Main Heading</label>
            <input
              type="text"
              value={about.title}
              onChange={(e) => handleUpdateAboutField('title', e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 outline-none focus:bg-white focus:border-indigo-500 font-bold"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">Company Narrative (Full Story Description)</label>
          <textarea
            rows={3}
            value={about.description}
            onChange={(e) => handleUpdateAboutField('description', e.target.value)}
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 outline-none focus:bg-white focus:border-indigo-500 leading-relaxed"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Corporate Mission</label>
            <textarea
              rows={2}
              value={about.mission}
              onChange={(e) => handleUpdateAboutField('mission', e.target.value)}
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 outline-none focus:bg-white focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Corporate Vision</label>
            <textarea
              rows={2}
              value={about.vision}
              onChange={(e) => handleUpdateAboutField('vision', e.target.value)}
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 outline-none focus:bg-white focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Concrete Plant */}
        <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-3 mt-3">
          <h4 className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-blue-600" /> Industrial Ready-Mix Concrete Batching Plant
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-gray-600 mb-1">Facility Title</label>
              <input
                type="text"
                value={about.concretePlantTitle}
                onChange={(e) => handleUpdateAboutField('concretePlantTitle', e.target.value)}
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs text-gray-900 outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-gray-600 mb-1">Technical Specifications & Quality Assurance</label>
              <input
                type="text"
                value={about.concretePlantDesc}
                onChange={(e) => handleUpdateAboutField('concretePlantDesc', e.target.value)}
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs text-gray-900 outline-none focus:border-indigo-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Leadership Team Members Manager */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-600" /> Executive & Engineering Leadership ({teamMembers.length})
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Manage executive profiles with custom credentials and direct laptop photo uploads.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setIsAddingMember(true);
              setEditingMemberId(null);
              setMemberForm({
                name: '',
                role: '',
                bio: '',
                photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
                accolades: ['Telesom Group Leadership'],
                email: 'info@kaabsan.com',
                phone: '+252 63 6100090'
              });
            }}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Add Team Member
          </button>
        </div>

        {/* Add / Edit Member Form */}
        {(isAddingMember || editingMemberId) && (
          <form onSubmit={handleSaveMember} className="p-6 bg-blue-50/50 rounded-2xl border-2 border-blue-500 space-y-4">
            <h4 className="font-bold text-sm text-gray-900">
              {editingMemberId ? 'Edit Team Member Profile' : 'Add New Executive Team Member'}
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={memberForm.name || ''}
                  onChange={(e) => setMemberForm({ ...memberForm, name: e.target.value })}
                  placeholder="e.g. Eng. Ahmed Mohamed"
                  className="w-full px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs text-gray-900 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Role / Executive Title</label>
                <input
                  type="text"
                  required
                  value={memberForm.role || ''}
                  onChange={(e) => setMemberForm({ ...memberForm, role: e.target.value })}
                  placeholder="Executive Managing Director"
                  className="w-full px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs text-gray-900 outline-none"
                />
              </div>
            </div>

            {/* Laptop Image Uploader for Leadership Member */}
            <LaptopImageUploader
              currentValue={memberForm.photo}
              onImageSelected={(img) => setMemberForm({ ...memberForm, photo: img })}
              label="Member Photo (Upload from Laptop or Web URL)"
              helperText="High resolution portrait photograph"
              aspectRatio="square"
            />

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Professional Bio</label>
              <textarea
                rows={3}
                value={memberForm.bio || ''}
                onChange={(e) => setMemberForm({ ...memberForm, bio: e.target.value })}
                placeholder="Brief professional background, engineering qualifications, and leadership tenure..."
                className="w-full px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs text-gray-900 outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Direct Phone</label>
                <input
                  type="text"
                  value={memberForm.phone || ''}
                  onChange={(e) => setMemberForm({ ...memberForm, phone: e.target.value })}
                  className="w-full px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs text-gray-900 outline-none font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Direct Email</label>
                <input
                  type="email"
                  value={memberForm.email || ''}
                  onChange={(e) => setMemberForm({ ...memberForm, email: e.target.value })}
                  className="w-full px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs text-gray-900 outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setIsAddingMember(false);
                  setEditingMemberId(null);
                }}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold cursor-pointer"
              >
                Save Member
              </button>
            </div>
          </form>
        )}

        {/* Team Members List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="p-4 bg-gray-50 rounded-2xl border border-gray-200 flex items-start gap-4 hover:border-gray-300 transition-colors"
            >
              <img
                src={member.photo}
                alt={member.name}
                className="w-16 h-20 rounded-xl object-cover border border-gray-200 flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-sm text-gray-900 truncate">{member.name}</h4>
                <p className="text-xs text-blue-600 font-medium truncate mb-1">{member.role}</p>
                <p className="text-[11px] text-gray-600 line-clamp-2 leading-relaxed mb-2">{member.bio}</p>
                <div className="text-[10px] text-gray-500 flex items-center gap-2">
                  <span>{member.phone}</span> • <span>{member.email}</span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => {
                    setEditingMemberId(member.id);
                    setIsAddingMember(false);
                    setMemberForm(member);
                  }}
                  className="p-1.5 hover:bg-white text-gray-600 hover:text-blue-600 rounded-lg transition-colors cursor-pointer"
                  title="Edit Profile"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteMember(member.id)}
                  className="p-1.5 hover:bg-white text-gray-400 hover:text-red-600 rounded-lg transition-colors cursor-pointer"
                  title="Delete Profile"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
