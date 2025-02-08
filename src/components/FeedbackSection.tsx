import React, { useState, useEffect } from 'react';
import { Star, MessageCircle, Youtube, ExternalLink } from 'lucide-react';
import { YOUTUBE_API_KEY } from '../config';

interface Feedback {
  id: number;
  rating: number;
  comment: string;
  author: string;
  date: string;
  youtubeHandle: string;
  profileImage?: string;
}

const feedbacks: Feedback[] = [
  {
    id: 1,
    rating: 5,
    comment: '',
    author: 'Yash and Hass',
    date: '2025-02-01',
    youtubeHandle: '@yashandhass',
  },
  {
    id: 2,
    rating: 5,
    comment: '',
    author: 'Hassa',
    date: '2025-02-03',
    youtubeHandle: '@gaminghassa',
  },
  {
    id: 3,
    rating: 5,
    comment: '',
    author: 'PradMaz',
    date: '2025-02-05',
    youtubeHandle: '@pradmaz',
  },
  {
    id: 4,
    rating: 5,
    comment: '',
    author: 'Lucifer Streams',
    date: '2025-02-05',
    youtubeHandle: '@sllucifer69',
  },
  {
    id: 5,
    rating: 5,
    comment: '',
    author: 'Teminas',
    date: '2025-02-05',
    youtubeHandle: '@Teminasglobal',
  },
];

export function FeedbackSection() {
  const [feedbacksWithProfiles, setFeedbacksWithProfiles] =
    useState<Feedback[]>(feedbacks);

  useEffect(() => {
    const fetchYouTubeProfiles = async () => {
      const updatedFeedbacks = await Promise.all(
        feedbacks.map(async (feedback) => {
          try {
            const response = await fetch(
              `https://youtube.googleapis.com/youtube/v3/channels?part=snippet&forHandle=${feedback.youtubeHandle.substring(
                1
              )}&key=${YOUTUBE_API_KEY}`
            );
            const data = await response.json();

            if (data.items && data.items[0]) {
              return {
                ...feedback,
                profileImage: data.items[0].snippet.thumbnails.default.url,
              };
            }
            return feedback;
          } catch (error) {
            console.error(
              `Error fetching profile for ${feedback.youtubeHandle}:`,
              error
            );
            return feedback;
          }
        })
      );

      setFeedbacksWithProfiles(updatedFeedbacks);
    };

    fetchYouTubeProfiles();
  }, []);

  const handleCardClick = (youtubeHandle: string) => {
    window.open(
      `https://youtube.com/${youtubeHandle}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <div className="w-full py-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 mb-4">
            What Our Users Say
          </h2>
          <p className="text-white/70 text-lg">Before choosing me</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {feedbacksWithProfiles.map((feedback) => (
            <button
              key={feedback.id}
              onClick={() => handleCardClick(feedback.youtubeHandle)}
              className="group relative rounded-2xl transition-all duration-500 text-left cursor-pointer hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            >
              {/* Card glass effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 to-pink-900/10 rounded-2xl backdrop-blur-xl border border-white/10 transition-all duration-500 group-hover:border-purple-500/50" />

              {/* Hover glow effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-fuchsia-500/20 to-pink-500/20 rounded-2xl blur-xl" />
              </div>

              {/* YouTube icon overlay on hover */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
                <div className="p-3 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 transform scale-0 group-hover:scale-100 transition-transform duration-500">
                  <ExternalLink className="w-6 h-6 text-white" />
                </div>
              </div>

              {/* Content */}
              <div className="relative z-10 p-6 group-hover:opacity-80 transition-opacity duration-500">
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative">
                    {feedback.profileImage ? (
                      <div className="relative group/image">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
                        <img
                          src={feedback.profileImage}
                          alt={feedback.author}
                          className="w-12 h-12 rounded-full object-cover border-2 border-white/20 group-hover:border-purple-400/50 transition-all duration-500 relative z-10"
                          loading="lazy"
                        />
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                        <Youtube className="w-6 h-6 text-white/70" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-white font-medium">
                      {feedback.author}
                    </h3>
                    <span className="text-sm text-purple-300 group-hover:text-pink-300 transition-colors duration-300">
                      {feedback.youtubeHandle}
                    </span>
                  </div>
                </div>
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < feedback.rating
                          ? 'text-purple-400 fill-purple-400 group-hover:text-pink-400 group-hover:fill-pink-400'
                          : 'text-gray-600'
                      } transition-colors duration-300`}
                    />
                  ))}
                </div>
                <p className="text-white/90 mb-4 line-clamp-3 group-hover:text-white transition-colors duration-300">
                  {feedback.comment}
                </p>
                <div className="flex justify-end text-sm">
                  <span className="text-purple-300/70 group-hover:text-pink-300/70 transition-colors duration-300">
                    {new Date(feedback.date).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}