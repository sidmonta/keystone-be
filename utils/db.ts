

export const checkIfExist = async (query: any, coll: string, where: unknown) => {
  const collection = query[coll]

  const count = await collection.count({
    where
  })

  return count > 0
}

export const getDocById = async (query: any, coll: string, id: string, project: string[]) => {
  const collection = query[coll]

  const result = await collection.findOne({
    where: { id },
    query: "id " + project.join(" ")
  })
  console.log(JSON.stringify(result))
  return result
}