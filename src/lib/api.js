import axios from "axios";

export async function queryAPI(text, includeArabic = false) {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/run/query`,
    {
      data: [text, includeArabic]
    },
    {
      headers: { "Content-Type": "application/json" }
    }
  );

  return JSON.parse(res.data.data[0]);
}
