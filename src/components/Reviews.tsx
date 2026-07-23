import React, { useState } from 'react';
import { Star, ShieldCheck, Quote, MessageSquare, CheckCircle2 } from 'lucide-react';
import { REVIEWS_DATA } from '../data/reviews';

export const Reviews: React.FC = () => {
  const [reviewList, setReviewList] = useState(REVIEWS_DATA);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);

  const displayedReviews = showAllReviews ? reviewList : reviewList.slice(0, 3);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newComment) return;

    const addedRev = {
      id: `rev-${Date.now()}`,
      name: newName,
      location: newLocation || 'Gwalior',
      rating: newRating,
      date: 'Just now',
      comment: newComment,
      servicesUsed: ['Home Salon Service'],
      verified: true
    };

    setReviewList([addedRev, ...reviewList]);
    setShowAddModal(false);
    setNewName('');
    setNewLocation('');
    setNewComment('');
  };

  return (
    <section id="reviews" className="py-8 sm:py-10 bg-gradient-to-b from-sky-50/50 via-white to-sky-100/40 relative border-t border-sky-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-6">
          <span className="inline-block px-3 py-0.5 rounded-full bg-sky-100 border border-sky-300 text-[#0284C7] text-[10px] font-extrabold uppercase tracking-[0.25em] shadow-xs">
            Client Testimonials
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#1E3A5F]">
            Loved By Women Across <span className="text-[#0284C7] italic font-normal">Gwalior</span>
          </h2>

          <div className="flex items-center justify-center gap-2 pt-1">
            <div className="flex items-center text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="font-serif text-base font-extrabold text-[#1E3A5F]">4.9 / 5.0</span>
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">(250+ Verified Reviews)</span>
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {displayedReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-2xl p-4 border border-sky-100 shadow-xs hover:border-[#0284C7] transition-all duration-300 relative flex flex-col justify-between"
            >
              <Quote className="w-6 h-6 text-[#0284C7]/15 absolute top-3 right-3" />

              <div className="space-y-2">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-xs text-slate-700 leading-relaxed font-normal italic line-clamp-4">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-sky-100 space-y-1.5">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-extrabold text-xs text-[#1E3A5F] flex items-center gap-1">
                      <span>{rev.name}</span>
                      {rev.verified && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0284C7]" title="Verified Client" />
                      )}
                    </h4>
                    <p className="text-[10px] text-slate-500 font-medium">{rev.location} • {rev.date}</p>
                  </div>
                </div>

                {rev.servicesUsed && rev.servicesUsed.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {rev.servicesUsed.map((srv, i) => (
                      <span key={i} className="text-[8px] px-1.5 py-0.5 bg-sky-50 text-[#0284C7] border border-sky-200 font-extrabold uppercase tracking-wider rounded-md">
                        {srv}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* View More Reviews / Add Review Actions */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {!showAllReviews && reviewList.length > 3 && (
            <button
              onClick={() => setShowAllReviews(true)}
              className="px-5 py-2.5 bg-white border border-sky-300 text-[#0284C7] hover:bg-sky-50 text-xs font-extrabold uppercase tracking-wider rounded-xl transition-all shadow-xs"
            >
              View More Reviews ({reviewList.length - 3})
            </button>
          )}

          <button
            onClick={() => setShowAddModal(true)}
            className="px-5 py-2.5 bg-[#0284C7] text-white text-xs font-extrabold uppercase tracking-wider rounded-xl hover:bg-[#0369A1] transition-all shadow-sm inline-flex items-center gap-1.5"
          >
            <MessageSquare className="w-3.5 h-3.5 text-sky-200" />
            <span>Leave A Review</span>
          </button>
        </div>

      </div>

      {/* Leave Review Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-[#1E3A5F]/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[22px] p-6 sm:p-8 max-w-md w-full border border-sky-200 space-y-4 shadow-2xl animate-in zoom-in-95 duration-200">
            <h3 className="font-serif text-xl font-extrabold text-[#1E3A5F] text-center uppercase tracking-wider">
              Share Your Experience
            </h3>

            <form onSubmit={handleAddReview} className="space-y-3 text-xs">
              <div>
                <label className="block text-[#1E3A5F] font-extrabold mb-1 uppercase tracking-wider text-[10px]">Your Name *</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Meenakshi Sharma"
                  className="w-full bg-sky-50/50 border border-sky-200 rounded-xl px-3 py-2 text-[#1E3A5F] focus:outline-none focus:border-[#0284C7] font-medium"
                />
              </div>

              <div>
                <label className="block text-[#1E3A5F] font-extrabold mb-1 uppercase tracking-wider text-[10px]">Locality in Gwalior</label>
                <input
                  type="text"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  placeholder="e.g. City Centre, Gwalior"
                  className="w-full bg-sky-50/50 border border-sky-200 rounded-xl px-3 py-2 text-[#1E3A5F] focus:outline-none focus:border-[#0284C7] font-medium"
                />
              </div>

              <div>
                <label className="block text-[#1E3A5F] font-extrabold mb-1 uppercase tracking-wider text-[10px]">Rating</label>
                <select
                  value={newRating}
                  onChange={(e) => setNewRating(Number(e.target.value))}
                  className="w-full bg-sky-50/50 border border-sky-200 rounded-xl px-3 py-2 text-[#1E3A5F] focus:outline-none focus:border-[#0284C7] font-medium"
                >
                  <option value={5}>⭐⭐⭐⭐⭐ 5 Stars - Excellent</option>
                  <option value={4}>⭐⭐⭐⭐ 4 Stars - Very Good</option>
                </select>
              </div>

              <div>
                <label className="block text-[#1E3A5F] font-extrabold mb-1 uppercase tracking-wider text-[10px]">Your Review *</label>
                <textarea
                  required
                  rows={3}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Tell us about the beautician service, hygiene, products..."
                  className="w-full bg-sky-50/50 border border-sky-200 rounded-xl px-3 py-2 text-[#1E3A5F] focus:outline-none focus:border-[#0284C7] font-medium"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2.5 bg-slate-100 text-slate-700 font-extrabold rounded-xl uppercase tracking-wider hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#0284C7] text-white font-extrabold rounded-xl uppercase tracking-wider hover:bg-[#0369A1]"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

