'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import CourseCard from '@/components/CourseCard';
import { BookOpen, CheckCircle2, Clock, ArrowRight, Sparkles, Award } from 'lucide-react';

export default function MyLearningPage() {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/courses')
      .then((res) => res.json())
      .then((data) => {
        if (data.courses) setCourses(data.courses);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const inProgressCourses = courses.filter((c) => c.progressPercent > 0 && c.progressPercent < 100);
  const completedCourses = courses.filter((c) => c.progressPercent === 100);
  const notStartedCourses = courses.filter((c) => !c.progressPercent || c.progressPercent === 0);

  return (
    <div className="space-y-8">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
          Personalized Trajectory
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight mt-2">
          My Learning Curriculum
        </h2>
        <p className="text-xs sm:text-sm text-txt-secondary mt-1">
          Review in-progress modules, completed certifications, and upcoming topics.
        </p>
      </div>

      {/* In Progress Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-navy-900">
            In Progress ({inProgressCourses.length})
          </h3>
          <span className="text-xs text-brand-600 font-semibold">Active focus</span>
        </div>

        {inProgressCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {inProgressCourses.map((c) => (
              <CourseCard key={c.id} course={c} showProgress={true} />
            ))}
          </div>
        ) : (
          <div className="p-8 bg-white rounded-3xl border border-surface-border text-center">
            <p className="text-xs text-txt-secondary">No courses currently in progress. Start one below!</p>
          </div>
        )}
      </div>

      {/* Completed Section */}
      {completedCourses.length > 0 && (
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-navy-900">
              Completed Masterclasses ({completedCourses.length})
            </h3>
            <Link href="/dashboard/certificate" className="text-xs font-bold text-growth-green hover:underline">
              View Certificate →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {completedCourses.map((c) => (
              <CourseCard key={c.id} course={c} showProgress={true} />
            ))}
          </div>
        </div>
      )}

      {/* Up Next Section */}
      <div className="space-y-4 pt-4">
        <h3 className="text-base font-bold text-navy-900">
          Up Next in Your Path ({notStartedCourses.length})
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notStartedCourses.map((c) => (
            <CourseCard key={c.id} course={c} showProgress={true} />
          ))}
        </div>
      </div>
    </div>
  );
}
