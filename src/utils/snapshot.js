export const postsSnapshotToArray = (snapshot) => {
  const snapshotVal = snapshot.val()

  const truncatedContent = (content) => {
    const words = content.split(' ')
    if (words.length > 75) {
      const truncated = words.slice(0, 75).join(' ')
      return `${truncated}...`
    }
    return content
  }

  const newStatePosts = []
  for (let post in snapshotVal) {
    newStatePosts.push({
      key: post,
      createdOn: snapshotVal[post].createdOn,
      title: snapshotVal[post].title,
      content: truncatedContent(snapshotVal[post].content)
    })
  }
  return newStatePosts
}

export const postSnapshotToPost = (snapshot) => {
  const post = snapshot.val()
  return {
    key: post?.key,
    createdOn: post?.createdOn,
    title: post?.title,
    content: post?.content
  }
}