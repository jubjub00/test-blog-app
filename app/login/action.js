"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import axios from "axios";

export async function login(prevState, formData) {
  try {
    const email = formData.get("email");
    const password = formData.get("password");

    const response = await axios.post(`${process.env.API_URL}/api/auth/local`, {
      identifier: email,
      password,
    });

    if (!response?.data?.jwt) throw new Error();

    const token = response.data.jwt;

    cookies().set("token", token);
  } catch (error) {
    console.error(error);
    return { message: error?.response?.data?.error?.message || "Login Failed" };
  }
  redirect("/special-blogs");
}
