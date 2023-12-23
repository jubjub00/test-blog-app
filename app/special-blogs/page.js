import axios from "axios";
import { cookies, headers } from "next/headers";
import Link from "next/link";

async function getSpecialBlogs() {
  try {
    const token = cookies().get("token");
    const response = await axios.get(
      `${process.env.API_URL}/api/special-blogs`,
      {
        headers: {
          Authorization: `Bearer ${token?.value}`,
        },
      }
    );
    console.log("response.data.data", response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("getBlogs", error);

    return [];
  }
}

export default async function Page() {
  const specialBlogs = await getSpecialBlogs();
  const headerList = headers();
  const user = JSON.parse(headerList.get("user"));
  console.log("user", user);

  return (
    <div>
        <div>User: {user.email}</div>
      Blog List:
      {specialBlogs.map((blog, index) => (
        <div key={index}>
          {blog.id} {blog.attributes.title}
          <Link href={`/special-blogs/${blog.id}`} className="bg-blue-400 px-2">
            Read
          </Link>
        </div>
      ))}
    </div>
  );
}
