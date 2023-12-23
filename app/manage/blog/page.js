import { headers } from "next/headers";
import Link from "next/link";

async function getBlogs() {
  const response = await fetch(
    "https://657b2bba394ca9e4af13e738.mockapi.io/api/blog"
  );

  if (!response.ok) {
    throw new Error("cannot get blog");
  }

  return response.json();
}

export default async function Page() {
  const headerRequest = headers();
  const user = JSON.parse(headerRequest.get("user"));
  const blogs = await getBlogs();

  return (
    <div>
      <div>Manage Blog: {user.email}</div>
      <div>
        Blog List:
        {blogs.map((blog, index) => (
          <div key={index}>
            {blog.id} {blog.name}
            <Link href={`/manage/blog/${blog.id}`} className="bg-blue-400 px-2">
              Edit
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
