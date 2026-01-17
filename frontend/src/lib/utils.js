export function formatDate(date) {
    return date.toLocaleDateString('en-US', {
        month: "numeric",
        day: "numeric",
        year: "numeric"
    })
}