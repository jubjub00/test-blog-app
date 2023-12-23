import axios from "axios";
import Link from "next/link";

async function getBlogs() {
  try {
    const response = await axios.get(`${process.env.API_URL}/api/blogs`);
    console.log('response.data.data',response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("getBlogs", error);

    return [];
  }
}

export default async function Page() {
  const blogs = await getBlogs();

  return (
    <div>
      Blog List:
      {blogs.map((blog, index) => (
        <div key={index}>
          {blog.id} {blog.attributes.title}
          <Link href={`/blog/${blog.id}`} className="bg-blue-400 px-2">
            Read
          </Link>
        </div>
      ))}
    </div>
  );
}
