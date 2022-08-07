try {
    fetch('../engines', {
        method: "get"
    }).then(res => res.json())
    .then(data => console.log(data))
}
catch(err: any) {
    console.log(err)
}