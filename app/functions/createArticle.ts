export const createArticle = async (content: string) => {
  const response = await fetch("/api/suggest-food", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error);
  return data.result;
};
