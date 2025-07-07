import React, { useState } from "react";
import { Link } from "react-router-dom";
import PublicLayout from "../../../components/layout/PublicLayout/PublicLayout";
import HeroSection from "../../../components/ui/HeroSection";
import Button from "../../../components/ui/Button/Button";

import { blogPosts } from "../../../data/blogData";
import { banner1, banner2 } from "../../../utils/assets";

const Blog = () => {
  const [category, setCategory] = useState("all");

  // Data blog diambil dari file data/blogData.js

  const filteredPosts =
    category === "all"
      ? blogPosts
      : blogPosts.filter((post) => post.category === category);

  return (
    <PublicLayout>
      <HeroSection
        title1="Our"
        title2="Blog"
        image={banner1}
      />
      <section className="py-8 sm:py-12 bg-white">
      <div className="container max-w-6xl mx-auto px-4 py-4 md:py-6">
          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                className="transition-transform hover:-translate-y-1"
              >
                <div className="mb-4">
                  <img
                    src={post.image}
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
                    {post.description}
                  </p>
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

          
        </div>
      </section>
    </PublicLayout>
  );
};

export default Blog;
