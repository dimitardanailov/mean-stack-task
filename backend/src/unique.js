function uniqueEmails(array) {
  const emails = array.filter(function (currentElement, index, arr) {
    return (
      index ===
      arr.findIndex(arrElement => currentElement.email === arrElement.email)
    )
  })

  return emails
}

export default uniqueEmails
