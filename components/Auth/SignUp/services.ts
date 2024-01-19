export async function signUpUser(payload: any) {
  const response = await fetch("http://localhost:5000/register", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
}
