import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import PublicLayout from "../../../components/layout/PublicLayout/PublicLayout";
import Button from "../../../components/ui/Button/Button";
import Divider from "../../../components/ui/Divider/Divider";
import Loading from "../../../components/ui/Loading";
import { blogAPI } from "../../Admin/Website/api/websiteAPI";
import { usePublicBlogs } from "../../Admin/Website/api/useWebsite";

const BlogDetail = () => {
  const { id } = useParams();
  const [blogDetail, setBlogDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { blogs } = usePublicBlogs();

  // Get image URL for display
  const getImageUrl = (imagePath) => {
    if (!imagePath) return null
    return `${import.meta.env.VITE_API_BASE_URL || 'http://34.101.143.2:3020'}/uploads/blogs/${imagePath}`
  }

  // Fetch blog detail
  useEffect(() => {
    const fetchBlogDetail = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await blogAPI.getById(id);
        
        if (response.success) {
          // Handle nested data structure
          const blogData = response.data.data || response.data;
          setBlogDetail(blogData);
        } else {
          setError(response.message || 'Failed to fetch blog detail');
        }
      } catch (err) {
        setError(err.message || 'An error occurred while fetching blog detail');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBlogDetail();
    }
  }, [id]);

  // Other blogs: exclude current
  const otherBlogs = blogs.filter((b) => b.id !== id).slice(0, 3);

  // Loading state
  if (loading) {
    return (
      <PublicLayout>
        <div className="container max-w-3xl mx-auto px-4 py-16 text-center">
          <Loading />
          <p className="mt-4 text-gray-600">Loading blog post...</p>
        </div>
      </PublicLayout>
    );
  }

  // Error state
  if (error) {
    return (
      <PublicLayout>
        <div className="container max-w-3xl mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Failed to Load Blog</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Button as={Link} to="/blog" variant="primary" size="medium">
            Back to Blog
          </Button>
        </div>
      </PublicLayout>
    );
  }

  if (!blogDetail) {
    return (
      <PublicLayout>
        <div className="container max-w-3xl mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Blog Not Found</h2>
          <Button as={Link} to="/blog" variant="primary" size="medium">
            Back to Blog
          </Button>
        </div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <section className="py-8 sm:py-12 bg-white">
        <div className="container w-full max-w-none sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 py-4 md:py-6">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
            {/* Blog Content Left */}
            <div className="w-full lg:w-2/3">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-raleway font-bold text-tertiary mb-2">
                {blogDetail.title}
              </h1>
              <div className="text-neutral-500 text-sm mb-8">
                Published on {new Date(blogDetail.createdAt).toLocaleDateString()}
              </div>
              <div className="mb-8">
                <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
                <img
                  src={getImageUrl(blogDetail.picture)}
                  alt={blogDetail.title}
                    className="w-full h-full object-cover rounded-3xl shadow-md"
                  style={{ objectPosition: "center" }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                  <div className="hidden absolute inset-0 bg-gray-200 rounded-3xl shadow-md flex items-center justify-center text-gray-500">
                  [Blog Image]
                  </div>
                </div>
              </div>
              <div className="text-tertiary text-base font-raleway leading-relaxed whitespace-pre-line">
                {blogDetail.content}
              </div>
            </div>
            {/* Other Blog Right */}
            <div className="w-full lg:w-1/3">
              <h2 className="text-lg sm:text-xl md:text-2xl font-raleway font-semibold text-primary mb-6">
                Other Blog
              </h2>
              <div className="flex flex-col gap-6">
                {otherBlogs.map((blog) => (
                  <div
                    key={blog.id}
                    className="flex items-center gap-4 bg-transparent"
                  >
                    <div className="relative w-32 sm:w-36 flex-shrink-0" style={{ aspectRatio: '4/3' }}>
                    <img
                      src={getImageUrl(blog.picture)}
                      alt={blog.title}
                        className="w-full h-full object-cover rounded-2xl"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'block';
                      }}
                    />
                      <div className="hidden absolute inset-0 bg-gray-200 rounded-2xl flex items-center justify-center text-gray-500 text-xs">
                      [Image]
                      </div>
                    </div>
                    <div className="flex flex-col flex-1 justify-between h-full">
                      <div className="text-tertiary text-base font-raleway font-semibold mb-2 text-left">
                        {blog.title}
                      </div>
                      <Button
                        variant="primary"
                        size="medium"
                        as={Link}
                        to={`/blog/${blog.id}`}
                      >
                        Read More
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default BlogDetail;
