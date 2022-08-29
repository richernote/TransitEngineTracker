window.addEventListener('load', () =>{
    const table: HTMLTableSectionElement | null = document.querySelector("tbody");

    // table?.addEventListener("click", getID)

    const deletes = document.querySelectorAll(".delete")

    deletes.forEach(element => {
        element.addEventListener("click", deleteEntry)
    })


    function getID():void {

        const row = event?.target as Element

        console.log(row.parentElement?.id)
    }


    function deleteEntry(): void {

        const deleteConfirm = confirm("Are you sure you want to delete?")

        if(deleteConfirm === true) {
            const rowID = getID()

            fetch('/delete', {
                method: 'delete',
                body: JSON.stringify({
                    id: rowID
                })
            }).then(res => {
                if(res.ok) return res.json()
            }).then(okay => {
                // Refresh to show deletion
                window.location.reload()
                alert(okay)
            })
        }
    }
})