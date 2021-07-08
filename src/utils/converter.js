function converter (bytes) {
    /** 1024 bytes = 1kb, 1024kv = 1MB */
    return (bytes / pow(2)).toFixed(2)
}

function pow(num){
    return Math.pow(1024, num)
}
export default converter