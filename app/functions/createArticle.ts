// export const createArticle = async (content: string) => {
//   const response = await fetch("/api/articles/create-articles", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ content }),
//   });
//   const data = await response.json();
//   if (!response.ok) throw new Error(data.error);
//   return data.result;
// };
"use server";
export const createArticle = async (content: string, title: string) => {
  const response = await fetch("/api/articles/create-articles", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content, title }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error);
  return data;
};
