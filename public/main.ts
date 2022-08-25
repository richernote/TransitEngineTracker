interface Engine {
    busNumber: number;
    engineNumber: number;
}

try {
    fetch('../engines', {
        method: "get"
    }).then(res => res.json())
    .then(data => {
        const table = document.querySelector("#table")
        data.forEach((item: Engine) => {
            const newRow = document.createElement("tr")
            const busNum = document.createElement("td")

            busNum.appendChild(document.createTextNode(item.busNumber.toString()))
            newRow.appendChild(busNum)

            const engineNum = document.createElement("td")
            engineNum.appendChild(document.createTextNode(item.engineNumber.toString()))
            
            newRow.appendChild(engineNum)
            table?.appendChild(newRow)

            console.log(newRow)
        })
    })
}
catch(err: any) {
    console.log(err)
}