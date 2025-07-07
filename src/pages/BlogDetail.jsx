
import React from "react";
import { useParams, Link } from "react-router-dom";
import PublicLayout from "../components/layout/PublicLayout/PublicLayout";
import Button from "../components/ui/Button/Button";
import Divider from "../components/ui/Divider/Divider";
import { blogPosts } from "../data/blogData";

const BlogDetail = () => {
  const { id } = useParams();
  const blogId = parseInt(id, 10);
  const blogDetail = blogPosts.find((b) => b.id === blogId);
  // Other blogs: exclude current
  const otherBlogs = blogPosts.filter((b) => b.id !== blogId).slice(0, 3);

  if (!blogDetail) {
    return (
      <PublicLayout>
        <div className="container max-w-3xl mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Blog Not Found</h2>
          <Button as={Link} to="/blog" variant="primary" size="medium">Back to Blog</Button>
        </div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <section className="py-8 sm:py-12 bg-white">
        <div className="container max-w-6xl mx-auto px-4 py-4 md:py-6">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
            {/* Blog Content Left */}
            <div className="w-full lg:w-2/3">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-raleway font-bold text-tertiary mb-2">{blogDetail.title}</h1>
              <div className="text-neutral-500 text-sm mb-8">{blogDetail.author}, {blogDetail.date}</div>
              <div className="mb-8">
                <img
                  src={blogDetail.image}
                  alt={blogDetail.title}
                  className="w-full max-w-2xl h-64 sm:h-80 md:h-96 object-cover rounded-3xl shadow-md"
                  style={{ objectPosition: 'center' }}
                />
              </div>
              <div className="text-tertiary text-base font-raleway leading-relaxed whitespace-pre-line">
                {blogDetail.content}
              </div>
            </div>
            {/* Other Blog Right */}
            <div className="w-full lg:w-1/3">
              <h2 className="text-lg sm:text-xl md:text-2xl font-raleway font-semibold text-primary mb-6">Other Blog</h2>
              <div className="flex flex-col gap-6">
                {otherBlogs.map((blog) => (
                  <div key={blog.id} className="flex items-center gap-4 bg-transparent">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-32 h-32 sm:w-36 sm:h-36 object-cover rounded-2xl flex-shrink-0"
                    />
                    <div className="flex flex-col flex-1 justify-between h-full">
                      <div className="text-tertiary text-base font-raleway font-semibold mb-2 text-left">
                        {blog.title}
                      </div>
                      <Button variant="primary" size="medium" as={Link} to={`/blog/${blog.id}`}>
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
}

export default BlogDetail;
