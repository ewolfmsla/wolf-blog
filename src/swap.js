console.log('starting...')


const setOrHideComment = (comments, comId, hide = false, text = undefined) => {
  Object.keys(comments).forEach(k => {
    if (comments[k] && k === 'replies') {
      Object.keys(comments[k]).forEach(i => {
        const x = comments[k][i]
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


const arr = [
  {
    text: "a", comId: "aa", replies: [
      {
        text: "a-1", comId: "aa-1", replies:
          [{text: "a-2", comId: "aa-2", replies: []}]
      },
      {
        text: "b-1", comId: "bb-1", replies:
          [{
            text: "hello, eric", comId: "bb-2", replies: [
              {
                text: "spur was here", comId: "bb-3", replies: [
                  {text: "pizza time!", comId: "bb-4", replies: []}
                ]
              },
              {
                text: "good god", comId: "xxx", replies: [
                  {text: "almighty", comId: "xxx-1", replies: []}
                ]
              },
              {
                text: "i'm starving!", comId: "yyy", replies: [
                  {text: "me, too!", comId: "yyy-1", replies: []}
                ]
              }
            ]
          }]
      },
      {
        text: "c-1", comId: "bb-1", replies:
          [{text: "voila!", comId: "cc-2", replies: []}]
      }
    ]
  },
  {text: "Yowzer!", comId: "xxx", replies: []}
]

const eric = arr[0]

setOrHideComment(eric, "bb-4", false, "time to go to bed")

console.log("======")

console.log({eric})

const x = eric.replies[1].replies[0].replies[2].replies
console.log({x})

const y = eric.replies[1].replies[0].replies[0].replies[0]
console.log({y})
