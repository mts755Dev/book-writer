export async function getUsers() {
  const response = await fetch("http://localhost:5000/users", {
    method: "GET",
  });
  return await response.json();
}

export async function updateUserPermission(payload: any) {
  const response = await fetch(`http://localhost:5000/users/${payload.id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
}
