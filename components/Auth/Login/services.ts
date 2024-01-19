export async function loginUser(payload: any) {
  const response = await fetch("http://localhost:5000/login", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
}
