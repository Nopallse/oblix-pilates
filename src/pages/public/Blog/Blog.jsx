import React, { useState } from "react";
import { Link } from "react-router-dom";
import PublicLayout from "../../../components/layout/PublicLayout/PublicLayout";
import HeroSection from "../../../components/ui/HeroSection";
import Button from "../../../components/ui/Button/Button";
import Loading from "../../../components/ui/Loading";
import { usePublicBlogs } from "../../Admin/Website/api/useWebsite";
import { banner1 } from "../../../shared/utils/assets";

const Blog = () => {
  const { blogs, loading, error } = usePublicBlogs();

  // Get image URL for display
  const getImageUrl = (imagePath) => {
    if (!imagePath) return null
    return `${import.meta.env.VITE_API_BASE_URL || 'http://34.101.143.2:3020'}/uploads/blogs/${imagePath}`
  }

  // Loading state
  if (loading) {
    return (
      <PublicLayout>
        <HeroSection
          title1="Our"
          title2="Blog"
          image={banner1}
        />
        <section className="py-8 sm:py-12 bg-white">
          <div className="container w-full max-w-none sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 py-4 md:py-6">
          <div className="text-center py-12">
            <Loading />
            <p className="mt-4 text-gray-600">Loading blog posts...</p>
          </div>
          </div>
        </section>
      </PublicLayout>
    );
  }

  // Error state
  if (error) {
    return (
      <PublicLayout>
        <HeroSection
          title1="Our"
          title2="Blog"
          image={banner1}
        />
        <section className="py-8 sm:py-12 bg-white">
          <div className="container w-full max-w-none sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 py-4 md:py-6">
          <div className="text-center py-12">
            <div className="text-red-500 text-lg mb-4">
              <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <p>Failed to load blog posts</p>
              <p className="text-sm text-gray-500 mt-2">{error}</p>
            </div>
          </div>
          </div>
        </section>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <HeroSection
        title1="Our"
        title2="Blog"
        image={banner1}
      />
      <section className="py-8 sm:py-12 bg-white">
      <div className="container w-full max-w-none sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 py-4 md:py-6">
          {/* Blog Posts Grid */}
          {blogs.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg mb-4">
                <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p>No blog posts available yet</p>
                <p className="text-sm text-gray-400 mt-2">Check back later for new content</p>
              </div>
            </div>
          ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((post, index) => (
              <div
                key={post.id}
                className="transition-transform hover:-translate-y-1"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="mb-4">
                  <img
                      src={getImageUrl(post.picture)}
                    alt={post.title}
                    className="w-full h-56 object-cover rounded-3xl"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block';
                    }}
                  />
                  <div className="hidden w-full h-56 bg-gray-200 rounded-3xl flex items-center justify-center text-gray-500 font-montserrat">
                    [Blog Image]
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-raleway font-bold mb-3 text-tertiary">
                    {post.title}
                  </h3>
                  <p className="text-tertiary font-raleway mb-4 line-clamp-2">
                      {post.content}
                  </p>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-gray-500">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  <div className="pt-2">
                    <Button
                      to={`/blog/${post.id}`}
                      variant="primary"
                      size="medium"
                    >
                      Read More
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          )}
        </div>
      </section>
    </PublicLayout>
  );
};

export default Blog;
