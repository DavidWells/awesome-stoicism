module.exports.handler = async (event, context) => {
  console.log(JSON.stringify(event))

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'success' })
  }
}
