function uniqueEmails(array) {
  const uniqueEmails = array.filter(function (currentElement, index, arr) {
    return (
      index ===
      arr.findIndex(arrElement => currentElement.email === arrElement.email)
    )
  })

  return uniqueEmails
}

export default uniqueEmails
