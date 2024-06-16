export async function handleFetchApiResponse(
  promiseResponse: Promise<Response>,
): Promise<unknown> {
  const response = await promiseResponse;

  const contentType = response.headers.get('Content-Type');

  if (contentType?.includes('application/json')) {
    return await response.json();
  } else if (contentType?.includes('text')) {
    return await response.text();
  } else {
    return await response.blob();
  }
}
