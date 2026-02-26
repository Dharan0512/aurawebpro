"use client";

import React, { useState, useEffect, useRef } from "react";
import { profileService } from "@/services/profileService";
import {
  X,
  Camera,
  User,
  Briefcase,
  Home,
  Heart,
  MapPin,
  LogOut,
  Edit2,
  Trash2,
} from "lucide-react";
import "./ProfileModal.css";
import EditProfileForm from "../../features/profile/EditProfileForm";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId?: string;
}

export default function ProfileModal({
  isOpen,
  onClose,
  userId,
}: ProfileModalProps) {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("about");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const BACKEND_URL =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

  const calculateAge = (dob: string) => {
    if (!dob) return "";
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const getPhotoUrl = (url: any) => {
    if (!url || typeof url !== "string") return "";
    if (url.startsWith("http")) return url;
    return `${BACKEND_URL}${url}`;
  };

  useEffect(() => {
    if (isOpen) {
      fetchProfile();
    }
  }, [isOpen]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const data = await profileService.getMyProfile();
      setProfile(data);
    } catch (error) {
      console.error("Fetch profile error", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePhoto = async (photoId: number) => {
    if (!window.confirm("Are you sure you want to delete this photo?")) return;
    try {
      await profileService.deletePhoto(photoId);
      // Refresh profile data
      fetchProfile();
    } catch (error) {
      console.error("Failed to delete photo", error);
      alert("Failed to delete photo. Please try again.");
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;

    const formData = new FormData();
    formData.append("photo", e.target.files[0]);

    try {
      await profileService.uploadPhotos(formData);
      fetchProfile(); // Refresh profile to show new photo
    } catch (error) {
      console.error("Upload failed", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="profile-modal-overlay" onClick={onClose}>
      <div
        className="profile-modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="profile-modal-close" onClick={onClose}>
          <X size={24} />
        </button>

        {loading ? (
          <div className="flex items-center justify-center flex-1">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D4AF37]"></div>
          </div>
        ) : profile && isEditing ? (
          <EditProfileForm
            profile={profile}
            onSave={() => {
              setIsEditing(false);
              fetchProfile();
            }}
            onCancel={() => setIsEditing(false)}
          />
        ) : profile ? (
          <>
            {/* Hero Section */}
            <div className="profile-hero">
              <img
                src={
                  getPhotoUrl(profile.photos?.[0]) ||
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop"
                }
                alt={profile.basicDetails?.name}
                className="profile-hero-image"
              />
              <div className="profile-hero-gradient"></div>
              <div className="profile-hero-info">
                <h2 className="profile-name">
                  {profile.user?.firstName} {profile.user?.lastName}
                </h2>
                <div className="profile-badges">
                  <span className="badge">
                    {profile.user?.gender},{" "}
                    {profile.profile?.dob
                      ? calculateAge(profile.profile.dob)
                      : "28"}{" "}
                    yrs
                  </span>
                  <span className="badge">
                    {profile.profile?.City?.name || "Global"}
                  </span>
                  <span className="badge">
                    {profile.profile?.Religion?.name}
                  </span>
                </div>
              </div>
              <button
                className="absolute bottom-6 right-8 premium-btn flex items-center gap-2"
                onClick={() => fileInputRef.current?.click()}
              >
                <Camera size={18} />
                Add Photo
              </button>
              <input
                type="file"
                hidden
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept="image/*"
              />
            </div>

            {/* Content Tabs */}
            <div className="profile-content">
              {/* Photo Gallery */}
              <div className="section-title">
                <Camera size={20} /> Photo Gallery
              </div>
              <div className="photo-gallery">
                {profile.photos && profile.photos.length > 0 ? (
                  profile.photos.map((photo: any, idx: number) => (
                    <div key={idx} className="gallery-item">
                      <img
                        src={getPhotoUrl(photo.url)}
                        alt={`Gallery ${idx}`}
                      />
                      <button
                        className="delete-photo-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (photo.id) handleDeletePhoto(photo.id);
                        }}
                        title="Delete photo"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="text-slate-500 italic text-sm py-4">
                    No gallery photos yet. Add some to stand out!
                  </div>
                )}
                <div
                  className="add-photo-btn"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Camera size={24} />
                  <span className="text-xs">Add photo</span>
                </div>
              </div>

              {/* Basic Details */}
              <div className="section-title">
                <User size={20} /> Personal Information
              </div>
              <div className="details-grid">
                <div className="detail-item">
                  <span className="detail-label">Full Name</span>
                  <span className="detail-value">
                    {profile.user?.firstName} {profile.user?.lastName}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Gender</span>
                  <span className="detail-value">{profile.user?.gender}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Date of Birth</span>
                  <span className="detail-value">{profile.profile?.dob}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Mother Tongue</span>
                  <span className="detail-value">
                    {profile.profile?.MotherTongue?.name || "English"}
                  </span>
                </div>
              </div>

              {/* Professional Section */}
              <div className="section-title">
                <Briefcase size={20} /> Education & Career
              </div>
              <div className="details-grid">
                <div className="detail-item">
                  <span className="detail-label">Highest Education</span>
                  <span className="detail-value">
                    {profile.profile?.Education?.name}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Profession</span>
                  <span className="detail-value">
                    {profile.profile?.Occupation?.name || "Not specified"}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Annual Income</span>
                  <span className="detail-value">
                    {profile.profile?.IncomeRange?.displayLabel ||
                      "Confidential"}
                  </span>
                </div>
              </div>

              {/* Religion Section */}
              <div className="section-title">
                <Heart size={20} /> Religion & Ethnicity
              </div>
              <div className="details-grid">
                <div className="detail-item">
                  <span className="detail-label">Religion</span>
                  <span className="detail-value">
                    {profile.profile?.Religion?.name}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Caste / Sub-caste</span>
                  <span className="detail-value">
                    {profile.profile?.Caste?.name || "Open"} /{" "}
                    {profile.profile?.subcaste || "Open"}
                  </span>
                </div>
              </div>

              {/* Preferences Section */}
              <div className="section-title">
                <Heart size={20} className="text-[#D4AF37] fill-[#D4AF37]/20" />{" "}
                Partner Preferences
              </div>
              <div className="details-grid">
                <div className="detail-item">
                  <span className="detail-label">Age Range</span>
                  <span className="detail-value">
                    {profile.preferences?.minAge} -{" "}
                    {profile.preferences?.maxAge} years
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Religion Preference</span>
                  <span className="detail-value">
                    {profile.preferences?.Religion?.name || "Any"}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Preferred Location</span>
                  <span className="detail-value">
                    {profile.preferences?.City?.name || "Open to any"}
                  </span>
                </div>
              </div>

              <div className="mt-8 flex justify-center">
                <button
                  className="premium-btn px-12 py-4 text-lg"
                  onClick={() => setIsEditing(true)}
                >
                  Edit My Profile
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center flex-1 p-8 text-center bg-slate-900/40">
            <User size={64} className="text-slate-700 mb-6" />
            <h3 className="text-2xl font-serif font-bold text-white">
              Profile Not Found
            </h3>
            <p className="text-slate-500 mt-2 max-w-xs">
              We couldn't load your profile. Please try logging in again to
              refresh your session.
            </p>
            <button
              className="mt-8 premium-btn"
              onClick={() => window.location.reload()}
            >
              Retry
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
