import React, { useState } from 'react';
import { Star, ShieldCheck, Quote, MessageSquare, CheckCircle2 } from 'lucide-react';
import { REVIEWS_DATA } from '../data/reviews';

export const Reviews: React.FC = () => {
  const [reviewList, setReviewList] = useState(REVIEWS_DATA);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);

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
    <section id="reviews" className="py-20 bg-[#050505] relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/40 text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.3em]">
            Client Testimonials
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-white uppercase tracking-wider">
            Loved By Women Across <span className="text-gold-gradient italic font-serif-accent">Gwalior</span>
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm font-light">
            Real feedback from verified home salon appointments in City Centre, Morar, Lashkar & Thatipur.
          </p>

          <div className="flex items-center justify-center gap-2 pt-2">
            <div className="flex items-center text-[#D4AF37]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-[#D4AF37] text-[#D4AF37]" />
              ))}
            </div>
            <span className="font-serif-luxury text-xl font-bold text-white">4.9 / 5.0</span>
            <span className="text-xs text-gray-400 uppercase tracking-wider">(250+ Happy Women Clients)</span>
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {reviewList.map((rev) => (
            <div
              key={rev.id}
              className="glass-card rounded-2xl p-6 border border-white/10 relative flex flex-col justify-between hover:border-[#D4AF37]/50 transition-all shadow-xl"
            >
              <Quote className="w-8 h-8 text-[#D4AF37]/20 absolute top-4 right-4" />

              <div className="space-y-3">
                <div className="flex items-center gap-1 text-[#D4AF37]">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
                  ))}
                </div>

                <p className="text-xs text-gray-300 leading-relaxed font-light italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-xs text-white uppercase tracking-wider flex items-center gap-1.5">
                      <span>{rev.name}</span>
                      {rev.verified && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37]" title="Verified Client" />
                      )}
                    </h4>
                    <p className="text-[10px] text-gray-400">{rev.location} • {rev.date}</p>
                  </div>
                </div>

                {rev.servicesUsed && rev.servicesUsed.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {rev.servicesUsed.map((srv, i) => (
                      <span key={i} className="text-[9px] px-2 py-0.5 bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30 font-semibold uppercase tracking-wider">
                        {srv}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Add Review Action */}
        <div className="text-center">
          <button
            onClick={() => setShowAddModal(true)}
            className="px-6 py-3 bg-white/5 border border-white/20 text-[#D4AF37] text-xs font-bold uppercase tracking-widest hover:bg-[#D4AF37] hover:text-black transition-all inline-flex items-center gap-2"
          >
            <MessageSquare className="w-4 h-4 text-[#D4AF37]" />
            <span>Leave A Review</span>
          </button>
        </div>

      </div>

      {/* Leave Review Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-card rounded-2xl p-6 sm:p-8 max-w-md w-full border border-white/20 space-y-4 animate-in zoom-in-95 duration-200">
            <h3 className="font-serif-luxury text-xl font-bold text-white text-center uppercase tracking-wider">
              Share Your Experience
            </h3>

            <form onSubmit={handleAddReview} className="space-y-3 text-xs">
              <div>
                <label className="block text-gray-300 font-semibold mb-1 uppercase tracking-wider text-[10px]">Your Name *</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Meenakshi Sharma"
                  className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1 uppercase tracking-wider text-[10px]">Locality in Gwalior</label>
                <input
                  type="text"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  placeholder="e.g. City Centre, Gwalior"
                  className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1 uppercase tracking-wider text-[10px]">Rating</label>
                <select
                  value={newRating}
                  onChange={(e) => setNewRating(Number(e.target.value))}
                  className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#D4AF37]"
                >
                  <option value={5}>⭐⭐⭐⭐⭐ 5 Stars - Excellent</option>
                  <option value={4}>⭐⭐⭐⭐ 4 Stars - Very Good</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1 uppercase tracking-wider text-[10px]">Your Review *</label>
                <textarea
                  required
                  rows={3}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Tell us about the beautician service, hygiene, products..."
                  className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2.5 bg-white/5 border border-white/10 text-gray-300 font-bold uppercase tracking-wider hover:bg-white/10"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#D4AF37] text-black font-extrabold uppercase tracking-wider hover:bg-white"
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
