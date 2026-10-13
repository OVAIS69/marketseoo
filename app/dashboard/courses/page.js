'use client';

import React, { useState, useEffect } from 'react';
import CourseCard from '@/components/CourseCard';
import { Search, Filter, Sparkles, BookOpen } from 'lucide-react';

export default function CoursesCatalogPage() {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
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

  const categories = ['All', 'Fundamentals', 'Social', 'SEO', 'Content', 'Advertising', 'Analytics'];
  const difficulties = ['All', 'Beginner', 'Intermediate'];

  const filtered = courses.filter((c) => {
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCategory === 'All' || c.category === selectedCategory;
    const matchesDiff = selectedDifficulty === 'All' || c.difficulty === selectedDifficulty;
    return matchesSearch && matchesCat && matchesDiff;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
            Curriculum Library
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight mt-2">
            Digital Marketing Courses
          </h2>
          <p className="text-xs sm:text-sm text-txt-secondary mt-1">
            Practical, bite-sized training built to immediately attract customers and grow sales.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-surface-border bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-navy-900"
          />
        </div>
      </div>

      {/* Category Pills & Filters */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-surface-border pb-4">
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-navy-900 text-white shadow-sm'
                  : 'bg-white text-txt-secondary hover:text-navy-900 hover:bg-surface-subtle border border-surface-border'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-txt-secondary font-medium">Difficulty:</span>
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="px-2.5 py-1 text-xs font-semibold rounded-lg border border-surface-border bg-white text-navy-900 focus:outline-none"
          >
            {difficulties.map((diff) => (
              <option key={diff} value={diff}>
                {diff}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Course Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-72 bg-white rounded-2xl border border-surface-border animate-pulse p-6" />
          ))}
        </div>
      ) : filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((course) => (
            <CourseCard key={course.id} course={course} showProgress={true} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-3xl border border-surface-border p-8">
          <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-navy-900">No courses found</h3>
          <p className="text-xs text-txt-secondary mt-1">
            Try adjusting your search query or category filters.
          </p>
        </div>
      )}
    </div>
  );
}
