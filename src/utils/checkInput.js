const checkInput = (value, counter) => {
    if (value.trim().length < counter) return false
    return true
}
export default checkInput;