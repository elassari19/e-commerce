export const postMethod = async (path: string, body: any) => {
  const responses = await fetch(path, {
    method: "POST",
    headers: {
      "content-Type": "Application/json"
    },
    body: JSON.stringify(body)
  })

  return responses
}