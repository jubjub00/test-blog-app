import axios from "axios";

async function getBlog(id) {
  try {
    const response = await axios.get(`${process.env.API_URL}/api/blogs/${id}?populate=thumbnail,author`);
    console.log("response.data.data", response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("getBlogs", error);

    return [];
  }
}

export default async function Page({ params }) {
  const blog = await getBlog(params.slug);
  return (
    <div>
      ID: {params.slug}
      <div>Name: {blog.attributes.title}</div>
      <div>Description: {blog.attributes.description}</div>
      <img width='100px' src={`${process.env.API_URL}${blog.attributes.thumbnail.data.attributes.url}`}/>
      <div>
        Author by: {blog.attributes.author.data.attributes.name}
      </div>
    </div>
  );
}
