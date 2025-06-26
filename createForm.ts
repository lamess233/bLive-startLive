export function createForm(data: Record<string, string>) {
    const form = new FormData()
    for (const key in data) {
        form.append(key, data[key])
    }
    return form
}