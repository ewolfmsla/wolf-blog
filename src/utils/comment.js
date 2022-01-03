const setOrHideComment = (comments, comId, hide = false, text = undefined) => {
  console.log(comId, hide)
  console.log({comments})
  Object.keys(comments).forEach(k => {
    console.log(k)
    if (comments[k] && k === 'replies') {
      Object.keys(comments[k]).forEach(i => {
        setOrHideComment(comments[k][i], comId, hide, text)
      })
      return setOrHideComment(comments[k], comId, hide, text)
    }
    if (k === "comId" && comments[k] === comId) {
      console.log("********")
      if (hide) {
        comments[k] = "hide"
      } else if (text) {
        comments["text"] = text
      }
    }
  })
}

export default setOrHideComment
