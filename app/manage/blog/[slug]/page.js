"use client";

import { useState, useEffect } from "react";

async function getBlog(id) {
  const response = await fetch(
    "https://657b2bba394ca9e4af13e738.mockapi.io/api/blog/" + id
  );

  if (!response.ok) {
    throw new Error("cannot get blog");
  }

  return response.json();
}

export default function Page({ params }) {
  const [blogState, setBlogState] = useState({
    name: "",
  });

  const initBlog = async () => {
    try {
      const result = await getBlog(params.slug);
      setBlogState(result);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setBlogState((prevState) => ({
      ...prevState,
      name: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        "https://657b2bba394ca9e4af13e738.mockapi.io/api/blog/" + params.slug,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(blogState),
        }
      );

      if (!response.ok) {
        throw new Error("Network Error");
      }

      const responseData = await response.json();
      console.log("update ok");
      return responseData;
    } catch (error) {
      console.error("error updating", error);
    }
  };

  useEffect(() => {
    initBlog();
  }, []);
  return (
    <div>
      ID: {params.slug}
      <div>
        Name: {blogState.name}
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            className="text-[red]"
            type="text"
            value={blogState.name}
            onChange={handleChange}
          />
          <button>Update</button>
        </form>
      </div>
    </div>
  );
}
