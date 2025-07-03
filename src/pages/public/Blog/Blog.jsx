import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PublicLayout } from "../../../components/layout";

const Blog = () => {
  const [category, setCategory] = useState("all");

  // Sample blog data
  const blogPosts = [
    {
      id: 1,
      title: "The Benefits of Regular Pilates Practice",
      excerpt:
        "Discover how consistent Pilates sessions can transform your body and mind over time.",
      category: "wellness",
      author: "Sarah Johnson",
      date: "June 15, 2023",
      readTime: "5 min read",
      image: "placeholder-1.jpg",
    },
    {
      id: 2,
      title: "Pilates vs. Yoga: Understanding the Key Differences",
      excerpt:
        "While both focus on mind-body connection, these practices have distinct approaches and benefits.",
      category: "techniques",
      author: "Michael Chen",
      date: "May 28, 2023",
      readTime: "7 min read",
      image: "placeholder-2.jpg",
    },
    {
      id: 3,
      title: "How Pilates Can Improve Your Posture in Just 30 Days",
      excerpt:
        "Poor posture affects more than just appearance—it impacts your overall health. Here's how Pilates can help.",
      category: "wellness",
      author: "Aisha Patel",
      date: "May 12, 2023",
      readTime: "6 min read",
      image: "placeholder-3.jpg",
    },
    {
      id: 4,
      title: "5 Essential Pilates Exercises for Beginners",
      excerpt:
        "New to Pilates? Start with these foundational movements to build strength and stability.",
      category: "techniques",
      author: "David Rodriguez",
      date: "April 30, 2023",
      readTime: "4 min read",
      image: "placeholder-4.jpg",
    },
    {
      id: 5,
      title:
        "The History of Pilates: From Rehabilitation to Mainstream Fitness",
      excerpt:
        "Learn how Joseph Pilates developed this method and how it evolved over the decades.",
      category: "history",
      author: "Sarah Johnson",
      date: "April 15, 2023",
      readTime: "8 min read",
      image: "placeholder-5.jpg",
    },
    {
      id: 6,
      title: "Pilates for Pregnancy: Safe Exercises for Each Trimester",
      excerpt:
        "Staying active during pregnancy is important, and Pilates offers safe, effective options.",
      category: "wellness",
      author: "Aisha Patel",
      date: "March 22, 2023",
      readTime: "7 min read",
      image: "placeholder-6.jpg",
    },
  ];

  const filteredPosts =
    category === "all"
      ? blogPosts
      : blogPosts.filter((post) => post.category === category);

  return (
    <PublicLayout>
      <div className="py-12">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-fraunces font-bold mb-2 text-secondary">
            Pilates Blog
          </h1>
          <p className="text-lg text-gray-600 mb-8 font-montserrat">
            Insights, tips, and stories from the world of Pilates
          </p>

          {/* Featured Post */}
          <div className="bg-gray-50 rounded-lg overflow-hidden mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="bg-gray-200 h-64 md:h-auto flex items-center justify-center">
                [Featured Post Image]
              </div>
              <div className="p-8">
                <div className="flex items-center mb-4">
                  <span className="bg-primary text-white text-xs px-3 py-1 rounded-full font-montserrat">
                    FEATURED
                  </span>
                  <span className="mx-2 text-gray-400">•</span>
                  <span className="text-gray-500 text-sm font-montserrat">
                    June 20, 2023
                  </span>
                </div>
                <h2 className="text-3xl font-fraunces font-bold mb-4 text-secondary">
                  The Complete Guide to Pilates Equipment
                </h2>
                <p className="text-gray-700 font-montserrat mb-6">
                  From reformers to Cadillacs, explore the various apparatus
                  used in Pilates studios and how each one can enhance your
                  practice. Whether you're a beginner or advanced practitioner,
                  understanding these tools can take your workout to the next
                  level.
                </p>
                <Link
                  to="/blog/complete-guide-to-pilates-equipment"
                  className="inline-flex items-center text-primary font-montserrat font-medium hover:underline"
                >
                  Read Full Article
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* Category Filter */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setCategory("all")}
                className={`px-4 py-2 rounded-full font-montserrat text-sm ${
                  category === "all"
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                All Posts
              </button>
              <button
                onClick={() => setCategory("wellness")}
                className={`px-4 py-2 rounded-full font-montserrat text-sm ${
                  category === "wellness"
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                Wellness
              </button>
              <button
                onClick={() => setCategory("techniques")}
                className={`px-4 py-2 rounded-full font-montserrat text-sm ${
                  category === "techniques"
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                Techniques
              </button>
              <button
                onClick={() => setCategory("history")}
                className={`px-4 py-2 rounded-full font-montserrat text-sm ${
                  category === "history"
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                History
              </button>
            </div>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-lg overflow-hidden shadow-md transition-transform hover:shadow-lg hover:-translate-y-1"
              >
                <div className="bg-gray-200 h-48 flex items-center justify-center">
                  [Blog Image]
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <span className="text-primary text-xs px-3 py-1 bg-primary bg-opacity-10 rounded-full font-montserrat capitalize">
                      {post.category}
                    </span>
                    <span className="ml-2 text-gray-500 text-sm font-montserrat">
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="text-xl font-fraunces font-bold mb-2 text-secondary">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 font-montserrat mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gray-300 rounded-full mr-2"></div>
                      <span className="text-sm font-montserrat text-gray-700">
                        {post.author}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500 font-montserrat">
                      {post.date}
                    </span>
                  </div>
                </div>
                <div className="px-6 pb-6">
                  <Link
                    to={`/blog/${post.id}`}
                    className="text-primary font-montserrat font-medium hover:underline text-sm flex items-center"
                  >
                    Read More
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Newsletter */}
          <div className="mt-16 bg-gray-50 p-8 rounded-lg">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl font-fraunces font-semibold mb-3 text-secondary">
                Subscribe to Our Newsletter
              </h2>
              <p className="text-gray-700 font-montserrat mb-6">
                Get the latest Pilates tips, class updates, and wellness
                insights delivered to your inbox.
              </p>
              <form className="flex flex-col md:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-grow p-3 border border-gray-300 rounded-full font-montserrat focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                  type="submit"
                  className="bg-primary hover:bg-opacity-80 text-white rounded-full px-6 py-3 transition-colors font-montserrat font-medium"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

export default Blog;
