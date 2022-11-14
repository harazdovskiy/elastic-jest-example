export const readHandler = async (request) => {
  console.log(request.params)
  return request.params.id
}
